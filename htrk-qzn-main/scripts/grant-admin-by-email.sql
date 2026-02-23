-- Grant admin role to users by email
-- Run this in Supabase Dashboard > SQL Editor if the migration couldn't insert (e.g. if users signed up after migration)
-- Or run after the two users have signed up for the first time.

INSERT INTO public.user_roles (user_id, role)
SELECT au.id, 'admin'::public.app_role
FROM auth.users au
WHERE au.email IN (
  'admin@quezonbukidnon.gov.ph',
  'rey@haturiko.tech',
  'pio.quezonbukidnon@gmail.com'
)
ON CONFLICT (user_id, role) DO NOTHING;
