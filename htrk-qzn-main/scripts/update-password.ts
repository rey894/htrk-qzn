/**
 * Script to update admin password in Supabase
 * Usage: npx tsx scripts/update-password.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function updatePassword(email: string, newPassword: string) {
  try {
    console.log(`\n🔄 Updating password for ${email}...`);

    // First, get the user by email
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    console.log(`✅ Found user: ${user.id}`);

    // Update the user's password
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      throw error;
    }

    console.log(`\n✅ Password updated successfully for ${email}!`);
    console.log(`\nUser details:`);
    console.log(`  Email: ${data.user.email}`);
    console.log(`  User ID: ${data.user.id}`);
    console.log(`  Updated at: ${data.user.updated_at}`);
    
    return true;
  } catch (error: any) {
    console.error(`\n❌ Error updating password:`, error.message);
    return false;
  }
}

// Main execution
const email = 'khlacadin@gmail.com';
const newPassword = process.argv[2] || '8b3aafdd0c38c22193b811f7a1f6adcd';

console.log('\n=== Supabase Password Update Script ===\n');
console.log(`Email: ${email}`);
console.log(`New Password: ${newPassword.replace(/./g, '*')}`);
console.log('\n⚠️  Note: Supabase will hash this password internally');
console.log('The password value you provide should be plain text.\n');

updatePassword(email, newPassword)
  .then((success) => {
    if (success) {
      console.log('\n✅ Script completed successfully!');
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
