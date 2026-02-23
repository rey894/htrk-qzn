-- Create pages table for storing page content
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Everyone can view published pages
DROP POLICY IF EXISTS "Published pages are viewable by everyone" ON public.pages;
CREATE POLICY "Published pages are viewable by everyone"
ON public.pages
FOR SELECT
USING (status = 'published');

-- Admins can manage all pages
DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;
CREATE POLICY "Admins can manage pages"
ON public.pages
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_pages_updated_at ON public.pages;
CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pages
INSERT INTO public.pages (slug, title, content, hero_title, hero_subtitle, status)
VALUES 
  ('about', 'About Quezon', 'About page content - Edit this in the admin dashboard', 'About Quezon, Bukidnon', 'Gateway to Adventure & Agricultural Excellence', 'published'),
  ('tourism', 'Tourism', 'Tourism page content - Edit this in the admin dashboard', 'Explore Quezon', 'Discover our natural wonders and cultural heritage', 'published'),
  ('investment', 'Investment', 'Investment page content - Edit this in the admin dashboard', 'Invest in Quezon', 'Business opportunities in Quezon, Bukidnon', 'published'),
  ('services', 'Services', 'Services page content - Edit this in the admin dashboard', 'Municipal Services', 'Government services for residents and businesses', 'published'),
  ('travel-guide', 'Travel Guide', 'Travel guide content - Edit this in the admin dashboard', 'Travel Guide', 'Complete guide to visiting Quezon', 'published')
ON CONFLICT (slug) DO NOTHING;
