-- Step 1: Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: RLS policies for user_roles (strict - users can only read their own roles)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only service role can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only service role can update roles"
ON public.user_roles FOR UPDATE
USING (false);

CREATE POLICY "Only service role can delete roles"
ON public.user_roles FOR DELETE
USING (false);

-- Step 4: Create security definer function for role checks
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

-- Step 5: Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, role::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Step 6: Update profiles RLS policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Step 7: Update contact_messages RLS policies
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_messages;

CREATE POLICY "Admins can view all messages"
ON public.contact_messages
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update messages"
ON public.contact_messages
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete messages"
ON public.contact_messages
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Step 8: Update documents RLS policies
DROP POLICY IF EXISTS "Admins can manage documents" ON public.documents;

CREATE POLICY "Admins can insert documents"
ON public.documents
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update documents"
ON public.documents
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete documents"
ON public.documents
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can select all documents"
ON public.documents
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Step 9: Update news RLS policies
DROP POLICY IF EXISTS "Admins can manage news" ON public.news;

CREATE POLICY "Admins can insert news"
ON public.news
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news"
ON public.news
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news"
ON public.news
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can select all news"
ON public.news
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Step 10: Update events RLS policies
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

CREATE POLICY "Admins can insert events"
ON public.events
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update events"
ON public.events
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can select all events"
ON public.events
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Step 11: Remove role column from profiles (after migration)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;