import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X, Download, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface DocumentForm {
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  category: string;
  department: string;
  status: string;
}

export function DocumentsManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DocumentForm>({
    title: '',
    description: '',
    file_url: '',
    file_type: '',
    file_size: null,
    category: '',
    department: '',
    status: 'published'
  });

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      file_url: '',
      file_type: '',
      file_size: null,
      category: '',
      department: '',
      status: 'published'
    });
  };

  const handleCreate = async () => {
    if (!form.title || !form.file_url || !form.category) {
      toast({
        title: "Error",
        description: "Title, file URL, and category are required",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('documents')
      .insert(form);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create document",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Document created successfully"
      });
      setIsCreating(false);
      resetForm();
      fetchDocuments();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('documents')
      .update(form)
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Document updated successfully"
      });
      setEditingId(null);
      resetForm();
      fetchDocuments();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Document deleted successfully"
      });
      fetchDocuments();
    }
  };

  const startEdit = (document: any) => {
    setForm({
      title: document.title,
      description: document.description || '',
      file_url: document.file_url,
      file_type: document.file_type || '',
      file_size: document.file_size,
      category: document.category,
      department: document.department || '',
      status: document.status || 'published'
    });
    setEditingId(document.id);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576) + ' MB';
  };

  if (loading) {
    return <div>Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Documents</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              New Document
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
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Document description"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="file_url">File URL</Label>
                <Input
                  id="file_url"
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forms">Forms</SelectItem>
                      <SelectItem value="ordinances">Ordinances</SelectItem>
                      <SelectItem value="resolutions">Resolutions</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                      <SelectItem value="bidding">Bidding</SelectItem>
                      <SelectItem value="transparency">Transparency</SelectItem>
                      <SelectItem value="civil">Civil Registration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file_type">File Type</Label>
                  <Input
                    id="file_type"
                    value={form.file_type}
                    onChange={(e) => setForm({ ...form, file_type: e.target.value })}
                    placeholder="PDF, DOC, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Issuing department"
                  />
                </div>
                <div>
                  <Label htmlFor="file_size">File Size (bytes)</Label>
                  <Input
                    id="file_size"
                    type="number"
                    value={form.file_size || ''}
                    onChange={(e) => setForm({ ...form, file_size: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreate}>
                <Save className="h-4 w-4 mr-2" />
                Create Document
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); resetForm(); }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{document.title}</span>
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{document.category}</Badge>
                    <Badge variant={document.status === 'published' ? 'default' : 'outline'} className="ml-2">
                      {document.status}
                    </Badge>
                    {document.file_type && <Badge variant="outline" className="ml-2">{document.file_type}</Badge>}
                    {document.file_size && <span className="ml-2">{formatFileSize(document.file_size)}</span>}
                    <span className="ml-2">Downloads: {document.download_count || 0}</span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={document.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => startEdit(document)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(document.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {editingId === document.id && (
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`title-${document.id}`}>Title</Label>
                    <Input
                      id={`title-${document.id}`}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${document.id}`}>Description</Label>
                    <Textarea
                      id={`description-${document.id}`}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`file_url-${document.id}`}>File URL</Label>
                    <Input
                      id={`file_url-${document.id}`}
                      value={form.file_url}
                      onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`category-${document.id}`}>Category</Label>
                      <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forms">Forms</SelectItem>
                          <SelectItem value="ordinances">Ordinances</SelectItem>
                          <SelectItem value="resolutions">Resolutions</SelectItem>
                          <SelectItem value="reports">Reports</SelectItem>
                          <SelectItem value="bidding">Bidding</SelectItem>
                          <SelectItem value="transparency">Transparency</SelectItem>
                          <SelectItem value="civil">Civil Registration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`department-${document.id}`}>Department</Label>
                      <Input
                        id={`department-${document.id}`}
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`status-${document.id}`}>Status</Label>
                    <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleUpdate(document.id)}>
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