import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Edit, Globe, FileText, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string | null;
  meta_keywords: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  status: string;
  updated_at: string;
}

export function PageManager() {
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Page>>({
    slug: '',
    title: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image_url: '',
    status: 'published'
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('slug', { ascending: true });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch pages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingId(page.id);
    setForm({
      slug: page.slug,
      title: page.title,
      content: page.content,
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || '',
      hero_title: page.hero_title || '',
      hero_subtitle: page.hero_subtitle || '',
      hero_image_url: page.hero_image_url || '',
      status: page.status
    });
  };

  const handleSave = async () => {
    if (!editingId || !form.title || !form.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('pages')
        .update({
          title: form.title,
          content: form.content,
          meta_description: form.meta_description || null,
          meta_keywords: form.meta_keywords || null,
          hero_title: form.hero_title || null,
          hero_subtitle: form.hero_subtitle || null,
          hero_image_url: form.hero_image_url || null,
          status: form.status,
          updated_by: user?.id
        })
        .eq('id', editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page updated successfully"
      });

      setEditingId(null);
      setForm({});
      fetchPages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update page",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#1d2327]">Page Management</h2>
          <p className="text-muted-foreground mt-1">
            Edit content for static pages like About, Tourism, Investment, etc.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      /{page.slug}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                    {page.status}
                  </Badge>
                  {editingId !== page.id && (
                    <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {editingId === page.id && (
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Page title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      value={form.hero_title}
                      onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
                      placeholder="Main heading on the page"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                    <Input
                      id="hero_subtitle"
                      value={form.hero_subtitle}
                      onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
                      placeholder="Subheading or description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero_image_url">Hero Image URL</Label>
                    <Input
                      id="hero_image_url"
                      value={form.hero_image_url}
                      onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Page content (supports HTML)"
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={form.meta_description}
                        onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                        placeholder="SEO meta description"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="meta_keywords">Meta Keywords</Label>
                      <Input
                        id="meta_keywords"
                        value={form.meta_keywords}
                        onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={form.status} 
                      onValueChange={(value) => setForm({ ...form, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            )}

            {editingId !== page.id && (
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Hero:</p>
                  <p>{page.hero_title || 'Not set'}</p>
                  <p className="text-xs mt-1">{page.hero_subtitle || ''}</p>
                  
                  <p className="font-medium mt-4 mb-2">Content Preview:</p>
                  <p className="line-clamp-3">{page.content.substring(0, 200)}...</p>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {new Date(page.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {pages.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No pages found. Create pages in the database.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
