-- Diagnostic migration to check and fix user_roles RLS policies
-- This will verify the current state and ensure policies are correct

-- Step 1: Verify user_roles table exists and has correct structure
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_roles'
  ) THEN
    RAISE EXCEPTION 'user_roles table does not exist';
  END IF;
END $$;

-- Step 2: Verify RLS is enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'user_roles'
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    RAISE NOTICE 'RLS enabled on user_roles';
  END IF;
END $$;

-- Step 3: Drop all existing policies and recreate them correctly
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow role creation via trigger" ON public.user_roles;
DROP POLICY IF EXISTS "Only service role can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only service role can delete roles" ON public.user_roles;

-- Policy 1: Users can SELECT their own roles (CRITICAL for frontend)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy 2: Allow trigger to insert roles (SECURITY DEFINER function needs this)
CREATE POLICY "Allow role creation via trigger"
ON public.user_roles
FOR INSERT
WITH CHECK (true);

-- Policy 3: No updates allowed via RLS (only via SECURITY DEFINER functions)
CREATE POLICY "No updates via RLS"
ON public.user_roles
FOR UPDATE
USING (false);

-- Policy 4: No deletes allowed via RLS (only via SECURITY DEFINER functions)
CREATE POLICY "No deletes via RLS"
ON public.user_roles
FOR DELETE
USING (false);

-- Step 4: Verify policies were created
DO $$
DECLARE
  policy_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
  AND tablename = 'user_roles';
  
  IF policy_count < 4 THEN
    RAISE WARNING 'Expected 4 policies on user_roles, found %', policy_count;
  ELSE
    RAISE NOTICE 'All policies created successfully on user_roles';
  END IF;
END $$;
