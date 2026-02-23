import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string | null;
  meta_keywords: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  status: string;
  updated_at: string;
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching page:', error);
        }

        setPage(data || null);
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  return { page, loading };
}
