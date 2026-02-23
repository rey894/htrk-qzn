-- Create get_user_roles RPC function for frontend to fetch user roles
-- This function allows users to query their own roles without RLS blocking

-- Drop existing functions if they exist (with different signatures)
DROP FUNCTION IF EXISTS public.get_user_roles(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_roles() CASCADE;

CREATE OR REPLACE FUNCTION public.get_user_roles(p_user_id UUID)
RETURNS TABLE(role TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow users to query their own roles, or admins to query any user's roles
  IF p_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'superadmin')
  ) THEN
    RETURN QUERY
    SELECT ur.role::TEXT
    FROM public.user_roles ur
    WHERE ur.user_id = p_user_id;
  ELSE
    RAISE EXCEPTION 'Access denied. You can only view your own roles.';
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_roles(UUID) TO authenticated;

-- Create a simpler version that returns the current user's roles (used by useAuth hook)
CREATE OR REPLACE FUNCTION public.get_user_roles()
RETURNS TABLE(role TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  -- Return current user's roles
  RETURN QUERY
  SELECT ur.role::TEXT
  FROM public.user_roles ur
  WHERE ur.user_id = auth.uid();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_roles() TO authenticated;
