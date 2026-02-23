import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BACDocument {
  id: string;
  title: string;
  description: string | null;
  document_type: string;
  file_url: string;
  file_size: number | null;
  file_type: string;
  created_at: string;
  updated_at: string;
}

export function useBACDocuments() {
  const [documents, setDocuments] = useState<BACDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('bac_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setDocuments(data || []);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching BAC documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    refetch: fetchDocuments
  };
}
