-- Create profiles table for user management (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles (drop first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
-- Use user_roles table if it exists, otherwise fall back to profiles.role
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
    EXECUTE '
    CREATE POLICY "Admins can view all profiles" 
    ON public.profiles 
    FOR SELECT 
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = ''admin''
      )
    )';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    EXECUTE '
    CREATE POLICY "Admins can view all profiles" 
    ON public.profiles 
    FOR SELECT 
    USING (role = ''admin'')';
  END IF;
END $$;

DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
-- Use user_roles table if it exists, otherwise fall back to profiles.role
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
    EXECUTE '
    CREATE POLICY "Admins can manage all profiles" 
    ON public.profiles 
    FOR ALL 
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = ''admin''
      )
    )';
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    EXECUTE '
    CREATE POLICY "Admins can manage all profiles" 
    ON public.profiles 
    FOR ALL 
    USING (role = ''admin'')';
  END IF;
END $$;

-- Create function to handle new user registration (updated to work with or without role column)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _user_role TEXT;
BEGIN
  _user_role := CASE 
    WHEN NEW.email = 'admin@quezonbukidnon.gov.ph' THEN 'admin'
    ELSE 'user'
  END;
  
  -- Insert profile (with or without role column depending on schema)
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
      NEW.id, 
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
      _user_role
    );
  ELSE
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (
      NEW.id, 
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
    );
    
    -- If user_roles table exists, add role there
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (NEW.id, _user_role::app_role)
      ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add timestamp trigger for profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get current user role (to avoid RLS recursion)
-- Works with both old schema (profiles.role) and new schema (user_roles table)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  -- Try user_roles table first (new schema)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
    RETURN (SELECT role::TEXT FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1);
  -- Fall back to profiles.role (old schema)
  ELSIF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role') THEN
    RETURN (SELECT role FROM public.profiles WHERE user_id = auth.uid());
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update existing RLS policies to use the new function
DROP POLICY IF EXISTS "Admin can view and manage contact messages" ON public.contact_messages;
CREATE POLICY "Admin can view and manage contact messages" 
ON public.contact_messages 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admin can manage documents" ON public.documents;
CREATE POLICY "Admin can manage documents" 
ON public.documents 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admin can manage events" ON public.events;
CREATE POLICY "Admin can manage events" 
ON public.events 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admin can manage news" ON public.news;
CREATE POLICY "Admin can manage news" 
ON public.news 
FOR ALL 
USING (public.get_current_user_role() = 'admin');