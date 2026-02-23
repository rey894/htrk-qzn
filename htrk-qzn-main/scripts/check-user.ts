/**
 * Script to check user account status
 * Usage: npx tsx scripts/check-user.ts <email>
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://coiyzrbwfexbgpndsfdq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Create admin client with service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkUser(email: string) {
  try {
    console.log(`\n🔍 Checking user account: ${email}...\n`);

    // Get the user by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log(`❌ User not found!`);
      return false;
    }

    console.log(`✅ User found!\n`);
    console.log(`User Details:`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Email Confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`);
    console.log(`  Created: ${user.created_at}`);
    console.log(`  Last Sign In: ${user.last_sign_in_at || 'Never'}`);
    console.log(`  Confirmed At: ${user.email_confirmed_at || 'Not confirmed'}`);
    console.log(`  Phone: ${user.phone || 'None'}`);
    console.log(`  Banned: ${user.banned_until ? 'Yes' : 'No'}`);
    
    // Check user roles
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id);
    
    if (rolesError) {
      console.log(`\n⚠️  Error fetching roles: ${rolesError.message}`);
    } else {
      console.log(`\nRoles:`);
      if (roles && roles.length > 0) {
        roles.forEach(role => {
          console.log(`  - ${role.role}`);
        });
      } else {
        console.log(`  No roles assigned`);
      }
    }

    // Check profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) {
      console.log(`\n⚠️  Error fetching profile: ${profileError.message}`);
    } else if (profile) {
      console.log(`\nProfile:`);
      console.log(`  Full Name: ${profile.full_name || 'Not set'}`);
      console.log(`  Email: ${profile.email}`);
    }

    // Try to test login with service role
    console.log(`\n🔐 Testing authentication...`);
    const testClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: testAuth, error: testError } = await testClient.auth.signInWithPassword({
      email: email,
      password: '599248bc@Devcon'
    });

    if (testError) {
      console.log(`❌ Authentication test failed: ${testError.message}`);
      console.log(`\nPossible issues:`);
      if (!user.email_confirmed_at) {
        console.log(`  - Email not confirmed (but should be auto-confirmed)`);
      }
      console.log(`  - Password might not be set correctly`);
      console.log(`  - Account might be disabled`);
    } else {
      console.log(`✅ Authentication test successful!`);
      console.log(`  Session User ID: ${testAuth.user?.id}`);
    }

    return true;
  } catch (error: any) {
    console.error(`\n❌ Error checking user:`, error.message);
    return false;
  }
}

// Main execution
const email = process.argv[2] || 'khlacadin@devcon.ph';

console.log('\n=== Check User Account ===\n');

checkUser(email)
  .then((success) => {
    if (success) {
      console.log('\n✅ Check completed!');
    } else {
      console.log('\n❌ Check failed.');
      process.exit(1);
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  });
