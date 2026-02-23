import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  status: string;
  publish_date: string | null;
  category: string | null;
  tags: string[] | null;
  created_at: string;
}

export function useNews(limit?: number) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        let query = supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news',
          filter: 'status=eq.published'
        },
        () => {
          fetchNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return { news, loading, error };
}