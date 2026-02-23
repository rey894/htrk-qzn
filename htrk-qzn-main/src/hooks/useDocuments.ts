import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Document {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  file_size: number | null;
  category: string;
  department: string | null;
  download_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useDocuments(category?: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        setLoading(true);
        let query = supabase
          .from('documents')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) throw error;
        setDocuments(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();

    // Subscribe to real-time changes
    const filter = category ? `status=eq.published&category=eq.${category}` : 'status=eq.published';
    const channel = supabase
      .channel('documents_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: 'status=eq.published'
        },
        () => {
          fetchDocuments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  const downloadDocument = async (documentId: string) => {
    try {
      // Update download count in the documents table
      const { error } = await supabase
        .from('documents')
        .update({ download_count: documents.find(d => d.id === documentId)?.download_count + 1 || 1 })
        .eq('id', documentId);
      
      if (error) console.error('Error updating download count:', error);
      
      // Refresh the documents list
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, download_count: doc.download_count + 1 }
          : doc
      ));
    } catch (err) {
      console.error('Error updating download count:', err);
    }
  };

  return { documents, loading, error, downloadDocument };
}