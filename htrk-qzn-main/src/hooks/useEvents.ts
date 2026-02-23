import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  end_date: string | null;
  location: string | null;
  featured_image_url: string | null;
  category: string | null;
  organizer: string | null;
  registration_required: boolean;
  max_participants: number | null;
  current_participants: number;
  status: string;
  created_at: string;
}

export function useEvents(limit?: number, status: string = 'upcoming') {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        let query = supabase
          .from('events')
          .select('*')
          .eq('status', status)
          .order('event_date', { ascending: true });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: `status=eq.${status}`
        },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit, status]);

  return { events, loading, error };
}