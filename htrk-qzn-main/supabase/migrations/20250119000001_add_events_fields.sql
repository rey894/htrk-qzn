-- Add additional fields to events table for better event management
-- These fields support registration, contact information, and venue details

-- Add new columns if they don't exist
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS venue TEXT,
ADD COLUMN IF NOT EXISTS contact_person TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS registration_link TEXT,
ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS event_fee DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS event_fee_currency TEXT DEFAULT 'PHP';

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_registration_required ON public.events(registration_required);
CREATE INDEX IF NOT EXISTS idx_events_registration_deadline ON public.events(registration_deadline);
CREATE INDEX IF NOT EXISTS idx_events_contact_email ON public.events(contact_email);

-- Add check constraint for currency
ALTER TABLE public.events
DROP CONSTRAINT IF EXISTS events_event_fee_currency_check;

ALTER TABLE public.events
ADD CONSTRAINT events_event_fee_currency_check 
CHECK (event_fee_currency IN ('PHP', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SGD'));
