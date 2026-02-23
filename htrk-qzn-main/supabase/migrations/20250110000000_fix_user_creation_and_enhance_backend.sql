-- Fix user creation trigger and enhance backend functionality
-- This migration fixes the database error when saving new users

-- Step 1: Fix the handle_new_user function to work with the new schema (no role column)
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
  
  -- Create default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE 
      WHEN NEW.email = 'admin@quezonbukidnon.gov.ph' THEN 'admin'::app_role
      ELSE 'user'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 2: Create app_role enum if it doesn't exist, then add 'bac' role
DO $$ 
DECLARE
  _enum_exists BOOLEAN;
  _bac_exists BOOLEAN;
BEGIN
  -- Check if enum type exists
  SELECT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'app_role' AND n.nspname = 'public'
  ) INTO _enum_exists;
  
  IF NOT _enum_exists THEN
    -- Create enum type with all values including 'bac' and 'superadmin'
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'bac', 'superadmin');
  ELSE
    -- Enum exists, check if 'bac' value exists
    SELECT EXISTS (
      SELECT 1 FROM pg_enum e
      JOIN pg_type t ON t.oid = e.enumtypid
      JOIN pg_namespace n ON n.oid = t.typnamespace
      WHERE e.enumlabel = 'bac' 
      AND t.typname = 'app_role' 
      AND n.nspname = 'public'
    ) INTO _bac_exists;
    
    -- Add 'bac' value if it doesn't exist
    IF NOT _bac_exists THEN
      ALTER TYPE public.app_role ADD VALUE 'bac';
    END IF;
    
    -- Add 'superadmin' value if it doesn't exist (needed for BAC documents policies)
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum e
      JOIN pg_type t ON t.oid = e.enumtypid
      JOIN pg_namespace n ON n.oid = t.typnamespace
      WHERE e.enumlabel = 'superadmin' 
      AND t.typname = 'app_role' 
      AND n.nspname = 'public'
    ) THEN
      ALTER TYPE public.app_role ADD VALUE 'superadmin';
    END IF;
  END IF;
END $$;

-- Step 2.5: Create profiles table if it doesn't exist (needed before policies)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'profiles'
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  END IF;
  
  -- Remove role column if it exists (roles are now in user_roles table)
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles DROP COLUMN role;
  END IF;
END $$;

-- Step 2.6: Create user_roles table if it doesn't exist (needed before handle_new_user function)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'user_roles'
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create has_role function if it doesn't exist (needed for policies)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Step 3: Fix profiles RLS to allow trigger to insert
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile creation via trigger" ON public.profiles;

-- Allow trigger to insert profiles (SECURITY DEFINER should handle this, but ensure RLS doesn't block)
CREATE POLICY "Allow profile creation via trigger"
ON public.profiles
FOR INSERT
WITH CHECK (true);

-- Keep existing policies (drop first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile except role" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Step 4: Fix user_roles RLS to allow trigger to insert
DROP POLICY IF EXISTS "Only service role can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow role creation via trigger" ON public.user_roles;

-- Allow trigger to insert roles
CREATE POLICY "Allow role creation via trigger"
ON public.user_roles
FOR INSERT
WITH CHECK (true);

-- Keep other policies (drop first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Only service role can update roles" ON public.user_roles;
CREATE POLICY "Only service role can update roles"
ON public.user_roles
FOR UPDATE
USING (false);

DROP POLICY IF EXISTS "Only service role can delete roles" ON public.user_roles;
CREATE POLICY "Only service role can delete roles"
ON public.user_roles
FOR DELETE
USING (false);

-- Step 5: Create settings table for WordPress-like configuration management
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  type TEXT NOT NULL DEFAULT 'text',
  label TEXT,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can view settings
DROP POLICY IF EXISTS "Public can view settings" ON public.site_settings;
CREATE POLICY "Public can view settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can manage settings
DROP POLICY IF EXISTS "Admins can manage settings" ON public.site_settings;
CREATE POLICY "Admins can manage settings"
ON public.site_settings
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for settings updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value, type, label, description, category)
VALUES
  ('site_name', 'Municipality of Quezon, Bukidnon', 'text', 'Site Name', 'The name of the website', 'general'),
  ('site_description', 'Official website of the Municipality of Quezon, Bukidnon', 'text', 'Site Description', 'Brief description of the website', 'general'),
  ('contact_email', 'info@quezonbukidnon.gov.ph', 'email', 'Contact Email', 'Main contact email address', 'contact'),
  ('contact_phone', '', 'text', 'Contact Phone', 'Main contact phone number', 'contact'),
  ('contact_address', '', 'text', 'Contact Address', 'Municipal office address', 'contact'),
  ('facebook_url', '', 'url', 'Facebook Page URL', 'Link to official Facebook page', 'social'),
  ('twitter_url', '', 'url', 'Twitter URL', 'Link to official Twitter account', 'social'),
  ('instagram_url', '', 'url', 'Instagram URL', 'Link to official Instagram account', 'social'),
  ('youtube_url', '', 'url', 'YouTube URL', 'Link to official YouTube channel', 'social')
ON CONFLICT (key) DO NOTHING;

-- Step 6: Create media/uploads table for better file management
CREATE TABLE IF NOT EXISTS public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  mime_type TEXT,
  alt_text TEXT,
  description TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Public can view media
DROP POLICY IF EXISTS "Public can view media" ON public.media;
CREATE POLICY "Public can view media"
ON public.media
FOR SELECT
USING (true);

-- Only admins can manage media
DROP POLICY IF EXISTS "Admins can manage media" ON public.media;
CREATE POLICY "Admins can manage media"
ON public.media
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for media updated_at
DROP TRIGGER IF EXISTS update_media_updated_at ON public.media;
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON public.media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Step 7: Create admin function to create users (for admin panel)
CREATE OR REPLACE FUNCTION public.admin_create_user(
  _email TEXT,
  _password TEXT,
  _full_name TEXT,
  _role app_role DEFAULT 'user'::app_role
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  _user_id UUID;
BEGIN
  -- Check if current user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can create users';
  END IF;

  -- Create auth user (this will trigger handle_new_user)
  -- Note: We can't directly create auth.users from a function, so we'll need to use
  -- Supabase's admin API or create a simpler approach
  
  -- For now, return a placeholder - actual user creation should be done via Supabase Admin API
  -- or through the signup flow, then role can be updated
  RAISE EXCEPTION 'User creation must be done through Supabase Admin API. Please use the signup flow and then update roles.';
END;
$$;

-- Step 8: Create function for admins to update user roles
CREATE OR REPLACE FUNCTION public.admin_update_user_role(
  _user_id UUID,
  _role app_role
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can update user roles';
  END IF;

  -- Delete existing roles for this user
  DELETE FROM public.user_roles WHERE user_id = _user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Step 9: Grant execute permissions (RLS will handle access control)
GRANT EXECUTE ON FUNCTION public.admin_update_user_role TO authenticated;

-- Step 10: Fix BAC documents policies now that user_roles table exists
-- Only update policies if bac_documents table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bac_documents') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Admin and BAC can manage BAC documents" ON public.bac_documents';
    EXECUTE '
    CREATE POLICY "Admin and BAC can manage BAC documents"
    ON public.bac_documents
    FOR ALL
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN (''admin'', ''superadmin'', ''bac'')
      )
    )';
  END IF;
END $$;

-- Fix storage policies for BAC documents (storage.objects always exists)
DROP POLICY IF EXISTS "Admin and BAC can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin and BAC can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin and BAC can delete documents" ON storage.objects;

CREATE POLICY "Admin and BAC can upload documents"
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'superadmin', 'bac')
  )
);

CREATE POLICY "Admin and BAC can update documents"
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'superadmin', 'bac')
  )
);

CREATE POLICY "Admin and BAC can delete documents"
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'superadmin', 'bac')
  )
);

-- Step 11: Add indexes for better performance (only if tables exist)
DO $$
BEGIN
  -- Indexes for profiles
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
    CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
  END IF;
  
  -- Indexes for user_roles
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
    CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
  END IF;
  
  -- Indexes for news (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'news') THEN
    CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
    CREATE INDEX IF NOT EXISTS idx_news_publish_date ON public.news(publish_date);
  END IF;
  
  -- Indexes for events (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'events') THEN
    CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
    CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date);
  END IF;
  
  -- Indexes for documents (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'documents') THEN
    CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
  END IF;
  
  -- Indexes for contact_messages (if table exists)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'contact_messages') THEN
    CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
  END IF;
  
  -- Indexes for media (table created in this migration, so it should exist)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'media') THEN
    CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media(uploaded_by);
  END IF;
END $$;
