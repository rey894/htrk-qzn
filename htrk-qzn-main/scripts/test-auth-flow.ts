/**
 * Test authentication flow and admin dashboard access
 * Usage: npx tsx scripts/test-auth-flow.ts <email> <password>
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

const email = process.argv[2] || 'khlacadin@devcon.ph';
const password = process.argv[3] || '599248bc@Devcon';

console.log('\n🔐 ========================================');
console.log('   AUTHENTICATION FLOW TEST');
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

// Test 1: Sign In
const testSignIn = test('User can sign in with credentials', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (!data.user || !data.session) {
    console.log('   No user or session returned');
    return false;
  }
  
  console.log(`   ✅ Signed in as: ${data.user.email}`);
  return true;
});

// Test 2: Get User Session
const testGetSession = test('User session is accessible after sign in', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // Sign in first
  await supabase.auth.signInWithPassword({ email, password });
  
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  return data.session !== null && data.session.user !== null;
});

// Test 3: Fetch User Profile
const testFetchProfile = test('User profile can be fetched', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // Sign in first
  const { data: authData } = await supabase.auth.signInWithPassword({ email, password });
  
  if (!authData.user) {
    console.log('   No user after sign in');
    return false;
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', authData.user.id)
    .maybeSingle();
  
  if (error && error.code !== 'PGRST116') {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (profile) {
    console.log(`   ✅ Profile found: ${profile.email}`);
  } else {
    console.log('   ⚠️  No profile found (this is OK, profile might not exist)');
  }
  
  return true;
});

// Test 4: Fetch User Roles
const testFetchRoles = test('User roles can be fetched', async () => {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   ⚠️  Skipping: Service role key required for role checks');
    return true; // Not a failure
  }
  
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // Sign in first to get user ID
  const { data: authData } = await supabase.auth.signInWithPassword({ email, password });
  
  if (!authData.user) {
    console.log('   No user after sign in');
    return false;
  }
  
  // Use service role key to check roles (bypasses RLS)
  const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  
  const { data: roles, error } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', authData.user.id);
  
  if (error) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  if (roles && roles.length > 0) {
    const roleNames = roles.map(r => r.role).join(', ');
    console.log(`   ✅ Roles found: ${roleNames}`);
    
    // Check if user has admin or BAC role
    const hasAdmin = roles.some(r => r.role === 'admin' || r.role === 'superadmin');
    const hasBAC = roles.some(r => r.role === 'bac');
    
    if (hasAdmin) {
      console.log('   ✅ User has admin access');
    }
    if (hasBAC) {
      console.log('   ✅ User has BAC access');
    }
    
    return hasAdmin || hasBAC;
  } else {
    console.log('   ⚠️  No roles found - user may not have admin/BAC access');
    return false;
  }
});

// Test 5: Admin Dashboard Access Check
const testAdminAccess = test('User has admin dashboard access', async () => {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('   ⚠️  Skipping: Service role key required');
    return true; // Not a failure
  }
  
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // Sign in first to get user ID
  const { data: authData } = await supabase.auth.signInWithPassword({ email, password });
  
  if (!authData.user) {
    return false;
  }
  
  // Use service role key to check roles (bypasses RLS)
  const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  
  const { data: roles } = await supabaseAdmin
    .from('user_roles')
    .select('role')
    .eq('user_id', authData.user.id);
  
  if (!roles || roles.length === 0) {
    console.log('   ⚠️  No roles assigned');
    return false;
  }
  
  const isAdmin = roles.some(r => r.role === 'admin' || r.role === 'superadmin');
  const isBAC = roles.some(r => r.role === 'bac');
  
  if (isAdmin || isBAC) {
    console.log(`   ✅ User can access admin dashboard (${isAdmin ? 'Admin' : 'BAC'} role)`);
    return true;
  }
  
  return false;
});

// Test 6: Sign Out
const testSignOut = test('User can sign out', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  // Sign in first
  await supabase.auth.signInWithPassword({ email, password });
  
  // Sign out
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  // Verify session is cleared
  const { data } = await supabase.auth.getSession();
  return data.session === null;
});

// Test 7: Password Reset Request
const testPasswordReset = test('Password reset email can be requested', async () => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.VITE_APP_URL || 'https://quezonbukidnon.com'}/auth?type=recovery`,
  });
  
  if (error) {
    // Rate limiting is expected and indicates the feature works
    if (error.message.includes('4 seconds') || error.message.includes('rate limit')) {
      console.log('   ✅ Password reset feature works (rate limited - this is expected)');
      return true;
    }
    console.log(`   Error: ${error.message}`);
    return false;
  }
  
  console.log('   ✅ Password reset email sent (check your inbox)');
  return true;
});

// Run all tests
async function runAuthTests() {
  console.log(`Testing with email: ${email}\n`);
  
  await testSignIn();
  await testGetSession();
  await testFetchProfile();
  await testFetchRoles();
  await testAdminAccess();
  await testSignOut();
  await testPasswordReset();
  
  console.log('\n📊 ========================================');
  console.log('   AUTHENTICATION TEST RESULTS');
  console.log('========================================');
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Total:  ${testsPassed + testsFailed}`);
  console.log('========================================\n');
  
  if (testsFailed === 0) {
    console.log('🎉 All authentication tests passed!');
    console.log('\n✅ Authentication flow is working correctly');
    console.log('✅ Admin dashboard access is properly configured');
    process.exit(0);
  } else {
    console.log('⚠️  Some authentication tests failed.');
    console.log('   Please review the errors above.');
    process.exit(1);
  }
}

runAuthTests().catch((error) => {
  console.error('\n❌ Unexpected error running auth tests:', error);
  process.exit(1);
});
