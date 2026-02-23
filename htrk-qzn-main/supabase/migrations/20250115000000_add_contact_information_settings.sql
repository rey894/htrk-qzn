-- Add comprehensive contact information settings to site_settings table
-- This makes all contact information editable by admin and ensures consistency across the website

INSERT INTO public.site_settings (key, value, type, label, description, category)
VALUES
  -- Main Contact Information
  ('contact_email', 'lgu.quezon.bukidnon@gmail.com', 'email', 'Main Contact Email', 'Primary email address for general inquiries', 'contact'),
  ('contact_phone', '(088) 356-0130', 'text', 'Main Contact Phone', 'Primary phone number for municipal hall', 'contact'),
  ('contact_address', 'Municipal Hall Complex, Poblacion, Quezon, Bukidnon', 'text', 'Main Contact Address', 'Municipal office address', 'contact'),
  
  -- Emergency Hotlines
  ('emergency_police_number', '0953 044 3399', 'text', 'Police Emergency Number', 'Police station emergency hotline', 'contact'),
  ('emergency_police_email', 'lgu.quezon.bukidnon@gmail.com', 'email', 'Police Email', 'Police station email address', 'contact'),
  ('emergency_fire_number', '0905 751 1711', 'text', 'Fire Emergency Number', 'Fire station emergency hotline', 'contact'),
  ('emergency_fire_email', 'lgu.quezon.bukidnon@gmail.com', 'email', 'Fire Email', 'Fire station email address', 'contact'),
  ('emergency_mdrrmo_number', '0970 621 9407', 'text', 'MDRRMO Emergency Number', 'MDRRMO emergency hotline', 'contact'),
  ('emergency_mdrrmo_email', 'ldrrmoquezon@gmail.com', 'email', 'MDRRMO Email', 'MDRRMO email address', 'contact'),
  
  -- Office-Specific Contact Information
  ('office_health_phone', '(088) 356-0130', 'text', 'Health Center Phone', 'Municipal Health Office phone number', 'contact'),
  ('office_health_email', 'lgu.quezon.bukidnon@gmail.com', 'email', 'Health Center Email', 'Municipal Health Office email address', 'contact')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  category = EXCLUDED.category;
