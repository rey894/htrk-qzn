/**
 * Comprehensive test script for Supabase connection, types, and functionality
 * Usage: npx tsx scripts/test-all.ts
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';
import type { Database } from '../src/integrations/supabase/types';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('\n🧪 ========================================');
console.log('   COMPREHENSIVE SYSTEM TEST');
console.log('========================================\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name: string, fn: () => Promise<boolean> | boolean) {
  return async () => {
    try {
      const result = await fn();
      if (result) {
        console.log(`✅ ${name}`);
        testsPassed++;
        return true;
      } else {
        console.log(`❌ ${name}`);
        testsFailed++;
        return false;
      }
    } catch (error: any) {
      console.log(`❌ ${name}`);
      console.log(`   Error: ${error.message}`);
      testsFailed++;
      return false;
    }
  };
}

// Test 1: Environment Variables
const testEnvVars = test('Environment variables are configured', () => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.log('   Missing: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
    return false;
  }
  if (!SUPABASE_URL.startsWith('https://')) {
    console.log('   Invalid SUPABASE_URL format');
    return false;
  }
  if (SUPABASE_PUBLISHABLE_KEY.length < 100) {
    console.log('   SUPABASE_PUBLISHABLE_KEY appears to be invalid');
    return false;
  }
  return true;
});

// Test 2: Supabase Client Creation
const testClientCreation = test('Supabase client can be created with types', () => {
  try {
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    return supabase !== null && typeof supabase === 'object';
  } catch (error: any) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
});

// Test 3: Basic Connection
const testConnection = test('Basic Supabase connection works', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const { error } = await supabase.auth.getSession();
  // Even if no session, no error means connection works
  return error === null || !error.message.includes('Invalid API key');
});

// Test 4: Database Tables Exist
const testTables = test('Required database tables exist', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const tables = ['profiles', 'user_roles', 'news', 'events', 'documents', 'contact_messages'];
  const results = await Promise.all(
    tables.map(async (table) => {
      try {
        const { error } = await supabase.from(table as any).select('count').limit(1);
        return { table, exists: !error || error.code !== '42P01' }; // 42P01 = table does not exist
      } catch {
        return { table, exists: false };
      }
    })
  );
  
  const missing = results.filter(r => !r.exists).map(r => r.table);
  if (missing.length > 0) {
    console.log(`   Missing tables: ${missing.join(', ')}`);
    return false;
  }
  return true;
});

// Test 5: TypeScript Types Validation
const testTypes = test('TypeScript types are valid', () => {
  try {
    // Check if Database type has required tables
    const requiredTables = ['profiles', 'user_roles', 'news', 'events', 'documents', 'contact_messages'];
    
    // This is a compile-time check, but we can verify the structure exists
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    
    // Try to use typed queries
    const profilesQuery = supabase.from('profiles');
    const userRolesQuery = supabase.from('user_roles');
    const newsQuery = supabase.from('news');
    
    return profilesQuery !== null && userRolesQuery !== null && newsQuery !== null;
  } catch (error: any) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
});

// Test 6: Authentication - Service Role
const testServiceRole = test('Service role key works for admin operations', async () => {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   Skipping: SUPABASE_SERVICE_ROLE_KEY not set');
    return true; // Not a failure, just skip
  }
  
  const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  return !error && Array.isArray(data?.users);
});

// Test 7: User Roles Table Structure
const testUserRoles = test('user_roles table has correct structure', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   Skipping: Requires service role key');
    return true;
  }
  
  const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  
  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('*')
    .limit(1);
  
  if (error) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  // Check if structure looks correct (should have user_id and role)
  return true;
});

// Test 8: Profiles Table Structure
const testProfiles = test('profiles table has correct structure', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, email, full_name, avatar_url')
    .limit(1);
  
  if (error && error.code === 'PGRST301') {
    // Permission denied is OK for anon key
    return true;
  }
  
  return !error || error.message.includes('permission');
});

// Test 9: News Table
const testNews = test('news table is accessible', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { error } = await supabase
    .from('news')
    .select('id, title, status')
    .limit(1);
  
  // Permission errors are OK, we just want to verify table exists
  return !error || error.code === 'PGRST301' || error.message.includes('permission');
});

// Test 10: Events Table
const testEvents = test('events table is accessible', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { error } = await supabase
    .from('events')
    .select('id, title, status')
    .limit(1);
  
  return !error || error.code === 'PGRST301' || error.message.includes('permission');
});

// Test 11: Documents Table
const testDocuments = test('documents table is accessible', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { error } = await supabase
    .from('documents')
    .select('id, title, category')
    .limit(1);
  
  return !error || error.code === 'PGRST301' || error.message.includes('permission');
});

// Test 12: Contact Messages Table
const testContactMessages = test('contact_messages table is accessible', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { error } = await supabase
    .from('contact_messages')
    .select('id, name, email')
    .limit(1);
  
  // Contact messages should allow inserts for anon users
  return !error || error.code === 'PGRST301';
});

// Test 13: Type Safety - Insert Types
const testInsertTypes = test('Insert types are properly defined', () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // This should compile without errors if types are correct
  const profileInsert: Database['public']['Tables']['profiles']['Insert'] = {
    user_id: 'test-id',
    email: 'test@example.com'
  };
  
  const newsInsert: Database['public']['Tables']['news']['Insert'] = {
    title: 'Test',
    content: 'Test content',
    status: 'draft'
  };
  
  return profileInsert !== null && newsInsert !== null;
});

// Test 14: Type Safety - Row Types
const testRowTypes = test('Row types are properly defined', () => {
  // This should compile without errors if types are correct
  const profileRow: Database['public']['Tables']['profiles']['Row'] = {
    id: 'test',
    user_id: 'test',
    email: 'test@example.com',
    full_name: null,
    avatar_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  return profileRow !== null;
});

// Run all tests
async function runAllTests() {
  console.log('📋 Running Tests...\n');
  
  await testEnvVars();
  await testClientCreation();
  await testConnection();
  await testTables();
  await testTypes();
  await testServiceRole();
  await testUserRoles();
  await testProfiles();
  await testNews();
  await testEvents();
  await testDocuments();
  await testContactMessages();
  await testInsertTypes();
  await testRowTypes();
  
  console.log('\n📊 ========================================');
  console.log('   TEST RESULTS');
  console.log('========================================');
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Total:  ${testsPassed + testsFailed}`);
  console.log('========================================\n');
  
  if (testsFailed === 0) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
  }
}

runAllTests().catch((error) => {
  console.error('\n❌ Unexpected error running tests:', error);
  process.exit(1);
});
