-- Move Transparency to major section and add Sagip Saka
-- 1. Remove Transparency from Governance submenu
-- 2. Add Transparency as top-level nav item
-- 3. Add Transparency submenu with Sagip Saka

DO $$
DECLARE
  governance_id UUID;
  transparency_parent_id UUID;
  existing_transparency_child_id UUID;
BEGIN
  -- Get Governance parent ID
  SELECT id INTO governance_id
  FROM public.navigation_menu_items
  WHERE label = 'Governance' AND parent_id IS NULL AND menu_group = 'main'
  LIMIT 1;

  -- Delete Transparency from Governance submenu
  IF governance_id IS NOT NULL THEN
    DELETE FROM public.navigation_menu_items
    WHERE parent_id = governance_id AND label = 'Transparency' AND href = '/transparency';
  END IF;

  -- Check if Transparency already exists as top-level
  SELECT id INTO transparency_parent_id
  FROM public.navigation_menu_items
  WHERE label = 'Transparency' AND parent_id IS NULL AND menu_group = 'main'
  LIMIT 1;

  -- Insert Transparency as top-level if not exists
  IF transparency_parent_id IS NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, menu_group, display_order, is_active)
    VALUES ('Transparency', '/transparency', 'main', 22, true)
    RETURNING id INTO transparency_parent_id;
  END IF;

  -- Insert Transparency submenu items (only if we have parent)
  IF transparency_parent_id IS NOT NULL THEN
    INSERT INTO public.navigation_menu_items (label, href, parent_id, menu_group, display_order, is_active)
    VALUES
      ('Full Disclosure', '/transparency/full-disclosure', transparency_parent_id, 'main', 1, true),
      ('LGSF', '/transparency/lgsf', transparency_parent_id, 'main', 2, true),
      ('Bayanihan Grant', '/transparency/bayanihan-grant', transparency_parent_id, 'main', 3, true),
      ('Invitation to Bid', '/transparency/invitation-to-bid', transparency_parent_id, 'main', 4, true),
      ('Notice of Award', '/transparency/notice-of-award', transparency_parent_id, 'main', 5, true),
      ('Notice to Proceed', '/transparency/notice-to-proceed', transparency_parent_id, 'main', 6, true),
      ('Contract Agreement', '/transparency/contract-agreement', transparency_parent_id, 'main', 7, true),
      ('Sagip Saka', '/transparency/sagip-saka', transparency_parent_id, 'main', 8, true);
  END IF;
END $$;
