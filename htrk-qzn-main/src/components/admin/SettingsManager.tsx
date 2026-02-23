import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Setting {
  id: string;
  key: string;
  value: string | null;
  type: string;
  label: string | null;
  description: string | null;
  category: string | null;
}

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, Setting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, Setting> = {};
        data.forEach(setting => {
          settingsMap[setting.key] = setting;
        });
        setSettings(settingsMap);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.values(settings).map(setting => ({
        key: setting.key,
        value: setting.value
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value })
          .eq('key', update.key);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value
      }
    }));
  };

  const getSettingsByCategory = (category: string) => {
    return Object.values(settings).filter(s => s.category === category);
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  const categories = ['general', 'contact', 'social', 'services'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Site Settings</span>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save All Changes'}
            </Button>
          </CardTitle>
          <CardDescription>
            Manage website configuration and settings. Changes take effect immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4 mt-6">
                {getSettingsByCategory(category).map(setting => (
                  <div key={setting.id} className="space-y-2">
                    <Label htmlFor={setting.key}>
                      {setting.label || setting.key}
                    </Label>
                    {setting.description && (
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    )}
                    {setting.type === 'textarea' ? (
                      <Textarea
                        id={setting.key}
                        value={setting.value || ''}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <Input
                        id={setting.key}
                        type={setting.type === 'email' ? 'email' : setting.type === 'url' ? 'url' : 'text'}
                        value={setting.value || ''}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                {getSettingsByCategory(category).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No settings in this category</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
