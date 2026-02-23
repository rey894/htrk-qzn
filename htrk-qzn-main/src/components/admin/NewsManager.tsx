import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { newsSchema, sanitizeHtml, type NewsFormData } from '@/lib/validation';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

type NewsForm = NewsFormData;

export function NewsManager() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('publish_date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch news articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
  const [form, setForm] = useState<NewsForm>({
    title: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    category: '',
    status: 'draft'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewsForm, string>>>({});
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; articleId: string | null }>({
    open: false,
    articleId: null
  });

  const resetForm = () => {
    setForm({
      title: '',
      content: '',
      excerpt: '',
      featured_image_url: '',
      category: '',
      status: 'draft'
    });
    setErrors({});
  };

  const handleCreate = async () => {
    if (!form.title || !form.content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('news')
      .insert({
        ...form,
        publish_date: form.status === 'published' ? new Date().toISOString() : null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create news article",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "News article created successfully"
      });
      setIsCreating(false);
      resetForm();
      fetchNews();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('news')
      .update({
        ...form,
        publish_date: form.status === 'published' ? new Date().toISOString() : null
      })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update news article",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "News article updated successfully"
      });
      setEditingId(null);
      resetForm();
      fetchNews();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete news article",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "News article deleted successfully"
      });
      fetchNews();
    }
  };

  const handleDeleteClick = (articleId: string) => {
    setDeleteDialog({ open: true, articleId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.articleId) {
      await handleDelete(deleteDialog.articleId);
      setDeleteDialog({ open: false, articleId: null });
    }
  };

  const startEdit = (article: any) => {
    setForm({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      featured_image_url: article.featured_image_url || '',
      category: article.category || '',
      status: article.status
    });
    setEditingId(article.id);
  };

  if (loading) {
    return <div>Loading news articles...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Article */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>News Articles</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </CardTitle>
        </CardHeader>
        {isCreating && (
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter article title"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief description"
                />
              </div>
              <div>
                <RichTextEditor
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                  placeholder="Write your article content here..."
                  label="Content"
                  height="400px"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g., Government, Events"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as 'draft' | 'published' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  id="image"
                  value={form.featured_image_url}
                  onChange={(e) => setForm({ ...form, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreate}>
                <Save className="h-4 w-4 mr-2" />
                Create Article
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); resetForm(); }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Articles List */}
      <div className="space-y-4">
        {news.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>
                    {article.category && <Badge variant="secondary">{article.category}</Badge>}
                    <Badge variant={article.status === 'published' ? 'default' : 'outline'} className="ml-2">
                      {article.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(article)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(article.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {editingId === article.id && (
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`title-${article.id}`}>Title</Label>
                    <Input
                      id={`title-${article.id}`}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`excerpt-${article.id}`}>Excerpt</Label>
                    <Input
                      id={`excerpt-${article.id}`}
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    />
                  </div>
                  <div>
                    <RichTextEditor
                      value={form.content}
                      onChange={(value) => setForm({ ...form, content: value })}
                      placeholder="Write your article content here..."
                      label="Content"
                      height="400px"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`category-${article.id}`}>Category</Label>
                      <Input
                        id={`category-${article.id}`}
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`status-${article.id}`}>Status</Label>
                      <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as 'draft' | 'published' })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleUpdate(article.id)}>
                    <Save className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                  <Button variant="outline" onClick={() => { setEditingId(null); resetForm(); }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}