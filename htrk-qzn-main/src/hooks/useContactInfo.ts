import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  policeNumber: string;
  policeEmail: string;
  fireNumber: string;
  fireEmail: string;
  mdrrmoNumber: string;
  mdrrmoEmail: string;
  healthPhone: string;
  healthEmail: string;
}

const defaultContactInfo: ContactInfo = {
  email: 'lgu.quezon.bukidnon@gmail.com',
  phone: '(088) 356-0130',
  address: 'Municipal Hall Complex, Poblacion, Quezon, Bukidnon',
  policeNumber: '0953 044 3399',
  policeEmail: 'lgu.quezon.bukidnon@gmail.com',
  fireNumber: '0905 751 1711',
  fireEmail: 'lgu.quezon.bukidnon@gmail.com',
  mdrrmoNumber: '0970 621 9407',
  mdrrmoEmail: 'ldrrmoquezon@gmail.com',
  healthPhone: '(088) 356-0130',
  healthEmail: 'lgu.quezon.bukidnon@gmail.com'
};

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', [
            'contact_email',
            'contact_phone',
            'contact_address',
            'emergency_police_number',
            'emergency_police_email',
            'emergency_fire_number',
            'emergency_fire_email',
            'emergency_mdrrmo_number',
            'emergency_mdrrmo_email',
            'office_health_phone',
            'office_health_email'
          ]);

        if (error) {
          console.error('Error fetching contact info:', error);
          return;
        }

        if (data) {
          const info: ContactInfo = { ...defaultContactInfo };
          data.forEach(setting => {
            switch (setting.key) {
              case 'contact_email':
                info.email = setting.value || defaultContactInfo.email;
                break;
              case 'contact_phone':
                info.phone = setting.value || defaultContactInfo.phone;
                break;
              case 'contact_address':
                info.address = setting.value || defaultContactInfo.address;
                break;
              case 'emergency_police_number':
                info.policeNumber = setting.value || defaultContactInfo.policeNumber;
                break;
              case 'emergency_police_email':
                info.policeEmail = setting.value || defaultContactInfo.policeEmail;
                break;
              case 'emergency_fire_number':
                info.fireNumber = setting.value || defaultContactInfo.fireNumber;
                break;
              case 'emergency_fire_email':
                info.fireEmail = setting.value || defaultContactInfo.fireEmail;
                break;
              case 'emergency_mdrrmo_number':
                info.mdrrmoNumber = setting.value || defaultContactInfo.mdrrmoNumber;
                break;
              case 'emergency_mdrrmo_email':
                info.mdrrmoEmail = setting.value || defaultContactInfo.mdrrmoEmail;
                break;
              case 'office_health_phone':
                info.healthPhone = setting.value || defaultContactInfo.healthPhone;
                break;
              case 'office_health_email':
                info.healthEmail = setting.value || defaultContactInfo.healthEmail;
                break;
            }
          });
          setContactInfo(info);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading };
}
