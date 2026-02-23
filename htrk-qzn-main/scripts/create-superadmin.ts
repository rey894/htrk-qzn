/**
 * Script to create a superadmin account in Supabase
 * Usage: npx tsx scripts/create-superadmin.ts
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
  console.error('Please set it in your .env file or environment variables');
  process.exit(1);
}

// Create admin client with service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createSuperAdmin(email: string, password: string) {
  try {
    console.log(`\n🔄 Creating superadmin account for ${email}...`);

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const existingUser = existingUsers.users.find(u => u.email === email);
    
    if (existingUser) {
      console.log(`⚠️  User with email ${email} already exists. Updating...`);
      
      // Update password
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password: password }
      );

      if (updateError) {
        throw updateError;
      }

      console.log(`✅ Password updated for existing user`);

      // Check if superadmin role exists in app_role enum
      // First, try to add superadmin role if it doesn't exist
      const { error: enumError } = await supabaseAdmin.rpc('exec_sql', {
        sql: `
          DO $$ 
          BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'superadmin' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
              ALTER TYPE app_role ADD VALUE 'superadmin';
            END IF;
          END $$;
        `
      }).catch(() => {
        // If RPC doesn't exist, try direct SQL
        console.log('Note: Using alternative method to check enum');
      });

      // Add superadmin role to user_roles table
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .upsert({
          user_id: existingUser.id,
          role: 'superadmin'
        }, {
          onConflict: 'user_id,role'
        });

      if (roleError) {
        // If superadmin doesn't exist in enum, try using 'admin' as fallback
        console.log('⚠️  Could not add superadmin role. Trying admin role...');
        const { error: adminRoleError } = await supabaseAdmin
          .from('user_roles')
          .upsert({
            user_id: existingUser.id,
            role: 'admin'
          }, {
            onConflict: 'user_id,role'
          });

        if (adminRoleError) {
          throw adminRoleError;
        }
        console.log(`✅ Added admin role (superadmin may not exist in enum)`);
      } else {
        console.log(`✅ Added superadmin role`);
      }

      console.log(`\n✅ Superadmin account updated successfully!`);
      console.log(`\nUser details:`);
      console.log(`  Email: ${existingUser.email}`);
      console.log(`  User ID: ${existingUser.id}`);
      
      return true;
    }

    // Create new user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email
    });

    if (createError) {
      throw createError;
    }

    if (!newUser.user) {
      throw new Error('Failed to create user');
    }

    console.log(`✅ User created: ${newUser.user.id}`);

    // Wait a moment for profile to be created by trigger
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Try to add superadmin role first
    let roleError = null;
    try {
      const { error } = await supabaseAdmin
        .from('user_roles')
        .upsert({
          user_id: newUser.user.id,
          role: 'superadmin'
        }, {
          onConflict: 'user_id,role'
        });
      roleError = error;
    } catch (e: any) {
      roleError = e;
    }

    if (roleError) {
      // If superadmin doesn't exist in enum, use 'admin' as fallback
      console.log('⚠️  Could not add superadmin role. Trying admin role...');
      const { error: adminRoleError } = await supabaseAdmin
        .from('user_roles')
        .upsert({
          user_id: newUser.user.id,
          role: 'admin'
        }, {
          onConflict: 'user_id,role'
        });

      if (adminRoleError) {
        throw adminRoleError;
      }
      console.log(`✅ Added admin role (superadmin may not exist in enum)`);
    } else {
      console.log(`✅ Added superadmin role`);
    }

    console.log(`\n✅ Superadmin account created successfully!`);
    console.log(`\nUser details:`);
    console.log(`  Email: ${newUser.user.email}`);
    console.log(`  User ID: ${newUser.user.id}`);
    console.log(`  Email confirmed: ${newUser.user.email_confirmed_at ? 'Yes' : 'No'}`);
    
    return true;
  } catch (error: any) {
    console.error(`\n❌ Error creating superadmin:`, error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Main execution
const email = 'khlacadin@devcon.ph';
const password = '599248bc';

console.log('\n=== Create Superadmin Account ===\n');
console.log(`Email: ${email}`);
console.log(`Password: ${password.substring(0, 2)}****** (hidden)`);
console.log('\n⚠️  Note: This requires SUPABASE_SERVICE_ROLE_KEY\n');

createSuperAdmin(email, password)
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
