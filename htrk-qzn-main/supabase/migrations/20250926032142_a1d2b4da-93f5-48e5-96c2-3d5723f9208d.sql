-- Create content management tables for municipal website

-- News and announcements table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  publish_date TIMESTAMP WITH TIME ZONE,
  category TEXT,
  tags TEXT[],
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Documents and forms table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  category TEXT NOT NULL,
  department TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact messages/inquiries table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  department TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Events and activities table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  featured_image_url TEXT,
  category TEXT,
  organizer TEXT,
  registration_required BOOLEAN NOT NULL DEFAULT false,
  max_participants INTEGER,
  current_participants INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news (public read, admin write)
CREATE POLICY "Anyone can view published news" ON public.news
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage news" ON public.news
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for documents (public read for active documents)
CREATE POLICY "Anyone can view active documents" ON public.documents
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage documents" ON public.documents
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for contact messages (users can create, admin can manage)
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view and manage contact messages" ON public.contact_messages
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for events (public read)
CREATE POLICY "Anyone can view events" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage events" ON public.events
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for municipal assets
INSERT INTO storage.buckets (id, name, public) VALUES ('municipal-assets', 'municipal-assets', true);

-- Storage policies for public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'municipal-assets');

-- Admin can upload/manage assets
CREATE POLICY "Admin can upload assets" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'municipal-assets' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can update assets" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'municipal-assets' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can delete assets" ON storage.objects 
  FOR DELETE USING (bucket_id = 'municipal-assets' AND auth.jwt() ->> 'role' = 'admin');

-- Insert sample data
INSERT INTO public.news (title, content, excerpt, status, publish_date, category, tags) VALUES
('Welcome to the New Municipal Website', 'We are excited to announce the launch of our new responsive municipal website featuring improved accessibility and user experience.', 'New website launch with enhanced features and accessibility.', 'published', now(), 'announcements', ARRAY['website', 'technology', 'accessibility']),
('ANQ 2025 Nutrition Program Launch', 'The Annual Nutrition Caravan 2025 will begin visiting all 31 barangays starting January 15, 2025. This comprehensive program focuses on community health and nutrition education.', 'ANQ 2025 nutrition program starts January 15, covering all barangays.', 'published', now(), 'health', ARRAY['nutrition', 'health', 'community']),
('4K Development Agenda Update', 'Progress report on our four-pillar development framework: Kalinaw, Kahigayunan, Kahimsog, and Kalipay.', 'Latest updates on the 4K Development Agenda implementation.', 'published', now(), 'development', ARRAY['4k-agenda', 'development', 'progress']);

INSERT INTO public.documents (title, description, file_url, file_type, category, department) VALUES
('Business Permit Application Form', 'Complete application form for new business registration', '/forms/business-permit-application.pdf', 'PDF', 'business', 'Business License Office'),
('Building Permit Requirements', 'Checklist and requirements for building permit applications', '/forms/building-permit-requirements.pdf', 'PDF', 'construction', 'Engineering Office'),
('Social Assistance Application', 'Application form for municipal social assistance programs', '/forms/social-assistance-form.pdf', 'PDF', 'social', 'Social Services Office'),
('Civil Registry Request Form', 'Form for requesting birth, death, and marriage certificates', '/forms/civil-registry-request.pdf', 'PDF', 'civil', 'Civil Registry Office');

INSERT INTO public.events (title, description, event_date, location, category, organizer, status) VALUES
('ANQ 2025 Barangay Coverage', 'Annual Nutrition Caravan visiting rural barangays', '2025-01-15 08:00:00+08', 'Various Barangays', 'health', 'Municipal Health Office', 'upcoming'),
('Municipal Council Regular Session', 'Monthly regular session of the Sangguniang Bayan', '2025-01-20 09:00:00+08', 'Municipal Hall Session Hall', 'governance', 'Sangguniang Bayan', 'upcoming'),
('4K Development Forum', 'Community forum on the implementation of 4K Development Agenda', '2025-02-01 14:00:00+08', 'Municipal Gymnasium', 'development', 'Municipal Planning Office', 'upcoming');