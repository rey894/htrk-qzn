-- Grant admin access to rey@haturiko.tech and pio.quezonbukidnon@gmail.com
-- and fix handle_new_user so future signups with these emails get admin

-- Step 1: Update handle_new_user to grant admin for the two new emails (and keep existing admin email)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile without role (role is now in user_roles table)
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Create default user role; grant admin for designated admin emails
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.email IN (
        'admin@quezonbukidnon.gov.ph',
        'rey@haturiko.tech',
        'pio.quezonbukidnon@gmail.com'
      ) THEN 'admin'::app_role
      ELSE 'user'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 2: Grant admin to existing auth users with these emails (if they already signed up)
-- Wrapped in DO block so migration doesn't fail if auth.users isn't readable by migration role
DO $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  SELECT au.id, 'admin'::public.app_role
  FROM auth.users au
  WHERE au.email IN ('rey@haturiko.tech', 'pio.quezonbukidnon@gmail.com')
  ON CONFLICT (user_id, role) DO NOTHING;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Could not grant admin to existing users from auth.users (%). Run scripts/grant-admin-by-email.sql in Supabase SQL Editor after users sign up.', SQLERRM;
END $$;
