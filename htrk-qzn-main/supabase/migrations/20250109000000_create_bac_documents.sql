-- Create BAC documents table for Invitation to Bid, Notice of Award, and Contract Agreements
CREATE TABLE IF NOT EXISTS public.bac_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  document_type TEXT NOT NULL CHECK (document_type IN ('invitation_to_bid', 'notice_of_award', 'contract_agreement')),
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bac_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public can view, Admin and BAC can manage
-- Note: Admin/BAC management policy will be created in later migration after user_roles table exists
DROP POLICY IF EXISTS "Anyone can view BAC documents" ON public.bac_documents;
CREATE POLICY "Anyone can view BAC documents"
ON public.bac_documents
FOR SELECT
USING (true);

-- Temporary policy - will be replaced in migration 20250110000000 after user_roles is created
DROP POLICY IF EXISTS "Admin and BAC can manage BAC documents" ON public.bac_documents;
CREATE POLICY "Admin and BAC can manage BAC documents"
ON public.bac_documents
FOR ALL
USING (false); -- Restrictive until proper policy is created

-- Create update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_bac_documents_updated_at ON public.bac_documents;
CREATE TRIGGER update_bac_documents_updated_at
  BEFORE UPDATE ON public.bac_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
-- Note: Admin/BAC management policies will be created in later migration after user_roles table exists
DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
CREATE POLICY "Public can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Temporary restrictive policies - will be replaced in migration 20250110000000
DROP POLICY IF EXISTS "Admin and BAC can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin and BAC can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin and BAC can delete documents" ON storage.objects;

CREATE POLICY "Admin and BAC can upload documents"
ON storage.objects 
FOR INSERT 
WITH CHECK (false); -- Restrictive until proper policy is created

CREATE POLICY "Admin and BAC can update documents"
ON storage.objects 
FOR UPDATE 
USING (false); -- Restrictive until proper policy is created

CREATE POLICY "Admin and BAC can delete documents"
ON storage.objects 
FOR DELETE 
USING (false); -- Restrictive until proper policy is created
