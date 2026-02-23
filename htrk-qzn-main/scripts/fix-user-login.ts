/**
 * Script to fix user login issues - recreate user with proper settings
 * Usage: npx tsx scripts/fix-user-login.ts
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

async function fixUserLogin(email: string, password: string) {
  try {
    console.log(`\n🔧 Fixing user login for ${email}...\n`);

    // Get the user by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error(`User not found`);
    }

    console.log(`✅ Found user: ${user.id}`);

    // Delete the user and recreate
    console.log(`\n🗑️  Deleting existing user...`);
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    
    if (deleteError) {
      console.log(`⚠️  Could not delete user: ${deleteError.message}`);
      console.log(`   Trying to update instead...`);
    } else {
      console.log(`✅ User deleted`);
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Create new user with proper settings
    console.log(`\n➕ Creating new user...`);
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: 'Super Admin'
      }
    });

    if (createError) {
      throw createError;
    }

    if (!newUser.user) {
      throw new Error('Failed to create user');
    }

    console.log(`✅ User created: ${newUser.user.id}`);
    console.log(`   Email confirmed: ${newUser.user.email_confirmed_at ? 'Yes' : 'No'}`);

    // Wait for profile creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add admin role
    console.log(`\n🔐 Adding admin role...`);
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .upsert({
        user_id: newUser.user.id,
        role: 'admin'
      }, {
        onConflict: 'user_id,role'
      });

    if (roleError) {
      console.log(`⚠️  Could not add role: ${roleError.message}`);
    } else {
      console.log(`✅ Admin role added`);
    }

    // Test login
    console.log(`\n🧪 Testing login...`);
    const testClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: testAuth, error: testError } = await testClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (testError) {
      console.log(`❌ Login test failed: ${testError.message}`);
      throw testError;
    } else {
      console.log(`✅ Login test successful!`);
      console.log(`   Session User ID: ${testAuth.user?.id}`);
    }

    console.log(`\n✅ User account fixed successfully!`);
    console.log(`\nLogin credentials:`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    
    return true;
  } catch (error: any) {
    console.error(`\n❌ Error fixing user:`, error.message);
    return false;
  }
}

// Main execution
const email = 'khlacadin@devcon.ph';
const password = '599248bc@Devcon';

console.log('\n=== Fix User Login ===\n');

fixUserLogin(email, password)
  .then((success) => {
    if (success) {
      console.log('\n✅ Script completed successfully!');
      console.log('\nYou can now log in at: https://quezonbukidnon.com/auth');
    } else {
      console.log('\n❌ Script failed. Please check the error messages above.');
      process.exit(1);
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  });
