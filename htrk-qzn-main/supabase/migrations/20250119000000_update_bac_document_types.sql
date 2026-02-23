-- Update BAC documents table to include all Philippine Government Procurement document types
-- Based on Republic Act 9184 (Government Procurement Reform Act)

-- First, drop the existing constraint
ALTER TABLE public.bac_documents 
DROP CONSTRAINT IF EXISTS bac_documents_document_type_check;

-- Add new constraint with comprehensive procurement document types
ALTER TABLE public.bac_documents
ADD CONSTRAINT bac_documents_document_type_check 
CHECK (document_type IN (
  -- Pre-Procurement
  'invitation_to_bid',
  'request_for_quotation',
  'request_for_proposal',
  'prequalification_bids_and_awards_committee',
  
  -- Procurement Process
  'notice_of_award',
  'notice_to_proceed',
  'purchase_order',
  'job_order',
  
  -- Post-Procurement
  'contract_agreement',
  'supplemental_agreement',
  'notice_of_completion',
  'acceptance_and_inspection_report',
  
  -- Other Procurement Documents
  'abstract_of_bids',
  'bid_evaluation_report',
  'post_qualification_evaluation',
  'resolution_recommending_award',
  'notice_of_disqualification',
  'notice_of_postponement',
  'notice_of_cancellation',
  'other'
));

-- Add additional fields for better procurement document management
ALTER TABLE public.bac_documents
ADD COLUMN IF NOT EXISTS procurement_number TEXT,
ADD COLUMN IF NOT EXISTS reference_number TEXT,
ADD COLUMN IF NOT EXISTS project_name TEXT,
ADD COLUMN IF NOT EXISTS supplier_contractor TEXT,
ADD COLUMN IF NOT EXISTS contract_amount DECIMAL(15, 2),
ADD COLUMN IF NOT EXISTS procurement_date DATE,
ADD COLUMN IF NOT EXISTS contract_start_date DATE,
ADD COLUMN IF NOT EXISTS contract_end_date DATE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_bac_documents_document_type ON public.bac_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_bac_documents_procurement_number ON public.bac_documents(procurement_number);
CREATE INDEX IF NOT EXISTS idx_bac_documents_procurement_date ON public.bac_documents(procurement_date);
