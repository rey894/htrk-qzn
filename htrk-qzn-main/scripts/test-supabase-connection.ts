/**
 * Script to test Supabase connection and API key validity
 * Usage: npx tsx scripts/test-supabase-connection.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Get environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

console.log('\n=== Testing Supabase Connection ===\n');

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('❌ Error: Missing environment variables');
  console.error('Required: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY');
  process.exit(1);
}

console.log('Configuration:');
console.log(`  URL: ${SUPABASE_URL}`);
console.log(`  Key Length: ${SUPABASE_PUBLISHABLE_KEY.length} characters`);
console.log(`  Key Preview: ${SUPABASE_PUBLISHABLE_KEY.substring(0, 50)}...\n`);

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testConnection() {
  try {
    console.log('Testing connection...\n');
    
    // Test 1: Get session (should work even without auth)
    console.log('1. Testing basic connection...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error(`❌ Session test failed: ${sessionError.message}`);
      if (sessionError.message.includes('Invalid API key')) {
        console.error('\n⚠️  The API key is invalid!');
        console.error('Please check:');
        console.error('1. The key in .env matches the one in Supabase dashboard');
        console.error('2. You\'re using the "anon" or "public" key, not the service_role key');
        console.error('3. The key hasn\'t been rotated/regenerated');
        console.error('\nGet the correct key from:');
        console.error('https://supabase.com/dashboard/project/coiyzrbwfexbgpndsfdq/settings/api');
      }
      return false;
    }
    
    console.log('✅ Basic connection successful\n');
    
    // Test 2: Try to query a public table (if exists)
    console.log('2. Testing database query...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (testError) {
      if (testError.code === 'PGRST301' || testError.message.includes('permission')) {
        console.log('⚠️  Query test: Permission denied (expected for anon key)');
        console.log('   This is normal - the key works but has restricted access\n');
      } else {
        console.error(`❌ Query test failed: ${testError.message}`);
        return false;
      }
    } else {
      console.log('✅ Database query successful\n');
    }
    
    // Test 3: Check if we can access auth
    console.log('3. Testing auth access...');
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (authError && authError.message.includes('Invalid API key')) {
      console.error(`❌ Auth test failed: ${authError.message}`);
      return false;
    }
    
    console.log('✅ Auth access successful\n');
    
    console.log('✅ All tests passed! The API key is valid.\n');
    return true;
    
  } catch (error: any) {
    console.error(`\n❌ Unexpected error: ${error.message}`);
    console.error(error);
    return false;
  }
}

testConnection()
  .then((success) => {
    if (success) {
      console.log('✅ Connection test completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ Connection test failed. Please check your API key.');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  });
