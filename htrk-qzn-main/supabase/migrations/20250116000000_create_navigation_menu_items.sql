-- Create navigation_menu_items table for WordPress-like navigation management
-- Supports hierarchical menus, groups/categories, and ordering

CREATE TABLE IF NOT EXISTS public.navigation_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id UUID REFERENCES public.navigation_menu_items(id) ON DELETE CASCADE,
  menu_group TEXT DEFAULT 'main', -- Groups like 'main', 'footer', 'quick-links', etc.
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  opens_in_new_tab BOOLEAN DEFAULT false,
  icon_name TEXT, -- Optional icon identifier (e.g., 'home', 'info', 'services')
  description TEXT, -- Optional description/tooltip
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_navigation_menu_items_group ON public.navigation_menu_items(menu_group);
CREATE INDEX IF NOT EXISTS idx_navigation_menu_items_parent ON public.navigation_menu_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_navigation_menu_items_order ON public.navigation_menu_items(menu_group, display_order);

-- Enable RLS
ALTER TABLE public.navigation_menu_items ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active navigation items
CREATE POLICY "Navigation items are viewable by everyone"
  ON public.navigation_menu_items
  FOR SELECT
  USING (is_active = true);

-- Policy: Only authenticated admins can insert (flexible - works with user_roles or profiles)
CREATE POLICY "Admins can insert navigation items"
  ON public.navigation_menu_items
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND (
      -- Check user_roles table if it exists
      EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'superadmin')
      )
      OR
      -- Fall back to profiles.role if user_roles doesn't exist
      (NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.user_id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
      ))
    )
  );

-- Policy: Only authenticated admins can update
CREATE POLICY "Admins can update navigation items"
  ON public.navigation_menu_items
  FOR UPDATE
  USING (
    auth.uid() IS NOT NULL AND (
      EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'superadmin')
      )
      OR
      (NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.user_id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
      ))
    )
  );

-- Policy: Only authenticated admins can delete
CREATE POLICY "Admins can delete navigation items"
  ON public.navigation_menu_items
  FOR DELETE
  USING (
    auth.uid() IS NOT NULL AND (
      EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'superadmin')
      )
      OR
      (NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
      ) AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.user_id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
      ))
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_navigation_menu_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_navigation_menu_items_updated_at
  BEFORE UPDATE ON public.navigation_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_navigation_menu_items_updated_at();

-- Insert default navigation items (migrating from hardcoded navigation)
-- First insert parent items
INSERT INTO public.navigation_menu_items (label, href, menu_group, display_order, is_active) VALUES
  ('Home', '/', 'main', 1, true),
  ('About Quezon', '/about', 'main', 2, true),
  ('Governance', '/governance', 'main', 6, true),
  ('Services', '/services', 'main', 13, true),
  ('Investment', '/investment', 'main', 19, true),
  ('Tourism', '/tourism', 'main', 20, true),
  ('News', '/news', 'main', 26, true)
ON CONFLICT DO NOTHING;

-- Then insert child items with parent references
DO $$
DECLARE
  about_id UUID;
  governance_id UUID;
  services_id UUID;
  tourism_id UUID;
BEGIN
  -- Get parent IDs
  SELECT id INTO about_id FROM public.navigation_menu_items WHERE label = 'About Quezon' AND parent_id IS NULL LIMIT 1;
  SELECT id INTO governance_id FROM public.navigation_menu_items WHERE label = 'Governance' AND parent_id IS NULL LIMIT 1;
  SELECT id INTO services_id FROM public.navigation_menu_items WHERE label = 'Services' AND parent_id IS NULL LIMIT 1;
  SELECT id INTO tourism_id FROM public.navigation_menu_items WHERE label = 'Tourism' AND parent_id IS NULL LIMIT 1;

  -- Insert About Quezon submenu items
  IF about_id IS NOT NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, parent_id, menu_group, display_order, is_active) VALUES
      ('Town Profile', '/about#town-profile', about_id, 'main', 3, true),
      ('History', '/about#history', about_id, 'main', 4, true),
      ('Municipal Seal', '/about#municipal-seal', about_id, 'main', 5, true)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Insert Governance submenu items
  IF governance_id IS NOT NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, parent_id, menu_group, display_order, is_active) VALUES
      ('Mission & Vision', '/governance#mission', governance_id, 'main', 7, true),
      ('Development Agenda', '/governance/development-agenda', governance_id, 'main', 8, true),
      ('The Mayor', '/governance/mayor', governance_id, 'main', 9, true),
      ('Sangguniang Bayan', '/governance/sangguniang-bayan', governance_id, 'main', 10, true),
      ('Offices', '/governance/offices', governance_id, 'main', 11, true),
      ('Transparency', '/transparency', governance_id, 'main', 12, true)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Insert Services submenu items
  IF services_id IS NOT NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, parent_id, menu_group, display_order, is_active) VALUES
      ('Business Permits', '/services#business', services_id, 'main', 14, true),
      ('Civil Registry', '/services#civil', services_id, 'main', 15, true),
      ('Building Permits', '/services#building', services_id, 'main', 16, true),
      ('Social Assistance', '/services#social', services_id, 'main', 17, true),
      ('Forms & Downloads', '/services#forms', services_id, 'main', 18, true)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Insert Tourism submenu items
  IF tourism_id IS NOT NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, parent_id, menu_group, display_order, is_active) VALUES
      ('What to Do', '/tourism/what-to-do', tourism_id, 'main', 21, true),
      ('Civic Activities', '/tourism/civic-activities', tourism_id, 'main', 22, true),
      ('Festivals', '/tourism/festivals', tourism_id, 'main', 23, true),
      ('Travel Guide', '/travel-guide', tourism_id, 'main', 24, true),
      ('Destinations', '/tourism#destinations', tourism_id, 'main', 25, true)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
