-- Add Services page settings to site_settings table
-- This makes Services page content editable by admin without changing the design

INSERT INTO public.site_settings (key, value, type, label, description, category)
VALUES
  -- Office Hours
  ('services_office_hours_days', 'Monday - Friday', 'text', 'Office Hours - Days', 'Office operating days', 'services'),
  ('services_office_hours_time', '8:00 AM - 5:00 PM', 'text', 'Office Hours - Time', 'Office operating hours', 'services'),
  
  -- Location
  ('services_location_address', 'Capitol Site, Quezon', 'text', 'Location - Address', 'Municipal office address', 'services'),
  ('services_location_postal', 'Bukidnon 8707', 'text', 'Location - Postal Code', 'Postal code and province', 'services'),
  
  -- Contact
  ('services_contact_phone', '(088) 123-4567', 'text', 'Contact - Phone Number', 'Main contact phone number', 'services'),
  ('services_contact_mdrrmo', 'MDRRMO: 0970 621 9407', 'text', 'Contact - MDRRMO', 'MDRRMO emergency contact', 'services')
ON CONFLICT (key) DO NOTHING;
