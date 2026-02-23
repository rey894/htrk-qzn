import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  parent_id: string | null;
  menu_group: string;
  display_order: number;
  is_active: boolean;
  opens_in_new_tab: boolean;
  icon_name: string | null;
  description: string | null;
  submenu?: NavigationItem[];
}

export function useNavigation(menuGroup: string = 'main') {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('navigation_menu_items')
          .select('*')
          .eq('menu_group', menuGroup)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (fetchError) {
          console.error('Error fetching navigation:', fetchError);
          setError(fetchError.message);
          return;
        }

        if (data) {
          // Build hierarchical structure
          const itemsMap = new Map<string, NavigationItem>();
          const rootItems: NavigationItem[] = [];

          // First pass: create all items
          data.forEach((item) => {
            itemsMap.set(item.id, { ...item, submenu: [] });
          });

          // Second pass: build hierarchy
          data.forEach((item) => {
            const navItem = itemsMap.get(item.id)!;
            if (item.parent_id) {
              const parent = itemsMap.get(item.parent_id);
              if (parent) {
                if (!parent.submenu) {
                  parent.submenu = [];
                }
                parent.submenu.push(navItem);
              }
            } else {
              rootItems.push(navItem);
            }
          });

          // Sort root items and submenus
          rootItems.sort((a, b) => a.display_order - b.display_order);
          rootItems.forEach((item) => {
            if (item.submenu) {
              item.submenu.sort((a, b) => a.display_order - b.display_order);
            }
          });

          setNavigation(rootItems);
        }
      } catch (err) {
        console.error('Error fetching navigation:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();

    // Subscribe to changes
    const channel = supabase
      .channel('navigation_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'navigation_menu_items',
          filter: `menu_group=eq.${menuGroup}`,
        },
        () => {
          fetchNavigation();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [menuGroup]);

  return { navigation, loading, error };
}
