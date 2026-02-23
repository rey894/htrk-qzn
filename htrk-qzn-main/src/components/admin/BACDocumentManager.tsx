import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X, Download, FileText, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useBACDocuments } from '@/hooks/useBACDocuments';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'];

interface BACDocumentForm {
  title: string;
  description: string;
  document_type: string;
  file: File | null;
  file_url: string;
  file_size: number | null;
  file_type: string;
}

export function BACDocumentManager() {
  const { documents, loading, refetch } = useBACDocuments();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<BACDocumentForm>({
    title: '',
    description: '',
    document_type: '',
    file: null,
    file_url: '',
    file_size: null,
    file_type: ''
  });

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / 1048576) + ' MB';
  };

  const getFileExtension = (filename: string): string => {
    return filename.substring(filename.lastIndexOf('.')).toLowerCase();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: `File size exceeds 5MB limit. Current size: ${formatFileSize(file.size)}`,
        variant: "destructive"
      });
      return;
    }

    // Check file type
    const extension = getFileExtension(file.name);
    if (!ALLOWED_FILE_TYPES.includes(extension)) {
      toast({
        title: "Invalid file type",
        description: `Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setFormData({
      ...formData,
      file,
      file_size: file.size,
      file_type: extension.substring(1).toUpperCase()
    });
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.document_type) {
      toast({
        title: "Error",
        description: "Title and document type are required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.file && !formData.file_url) {
      toast({
        title: "Error",
        description: "Please select a file or provide a file URL",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      let fileUrl = formData.file_url;

      // Upload file to Supabase Storage if a file is selected
      if (formData.file) {
        const fileExt = getFileExtension(formData.file.name);
        const fileName = `${Date.now()}_${formData.file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `bac-documents/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, formData.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        if (!urlData?.publicUrl) throw new Error('Failed to get public URL');
        fileUrl = urlData.publicUrl;
      }

      // Insert document record
      const { error } = await supabase
        .from('bac_documents')
        .insert({
          title: formData.title,
          description: formData.description || null,
          document_type: formData.document_type,
          file_url: fileUrl,
          file_size: formData.file_size,
          file_type: formData.file_type
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "BAC document uploaded successfully"
      });

      resetForm();
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.title || !formData.document_type) {
      toast({
        title: "Error",
        description: "Title and document type are required",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      let fileUrl = formData.file_url;

      // Upload new file if one is selected
      if (formData.file) {
        const fileExt = getFileExtension(formData.file.name);
        const fileName = `${Date.now()}_${formData.file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = `bac-documents/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, formData.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        if (!urlData?.publicUrl) throw new Error('Failed to get public URL');
        fileUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('bac_documents')
        .update({
          title: formData.title,
          description: formData.description || null,
          document_type: formData.document_type,
          file_url: fileUrl,
          file_size: formData.file_size,
          file_type: formData.file_type
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Document updated successfully"
      });

      setEditingId(null);
      resetForm();
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update document",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    const { error } = await supabase
      .from('bac_documents')
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
      refetch();
    }
  };

  const startEdit = (document: any) => {
    setFormData({
      title: document.title,
      description: document.description || '',
      document_type: document.document_type,
      file: null,
      file_url: document.file_url,
      file_size: document.file_size,
      file_type: document.file_type
    });
    setEditingId(document.id);
    setIsCreating(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      document_type: '',
      file: null,
      file_url: '',
      file_size: null,
      file_type: ''
    });
    setIsCreating(false);
    setEditingId(null);
  };

  if (loading) {
    return <div>Loading BAC documents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>BAC Documents</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingId}>
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </Button>
          </CardTitle>
          <CardDescription>
            Upload Invitation to Bid, Notice of Award, and Contract Agreement documents (Max 5MB)
          </CardDescription>
        </CardHeader>
        {(isCreating || editingId) && (
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Document title"
                />
              </div>
              <div>
                <Label htmlFor="document_type">Document Type *</Label>
                <Select 
                  value={formData.document_type} 
                  onValueChange={(value) => setFormData({ ...formData, document_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invitation_to_bid">Invitation to Bid (ITB)</SelectItem>
                    <SelectItem value="request_for_quotation">Request for Quotation (RFQ)</SelectItem>
                    <SelectItem value="request_for_proposal">Request for Proposal (RFP)</SelectItem>
                    <SelectItem value="prequalification_bids_and_awards_committee">Prequalification - Bids and Awards Committee</SelectItem>
                    <SelectItem value="notice_of_award">Notice of Award</SelectItem>
                    <SelectItem value="notice_to_proceed">Notice to Proceed</SelectItem>
                    <SelectItem value="purchase_order">Purchase Order</SelectItem>
                    <SelectItem value="job_order">Job Order</SelectItem>
                    <SelectItem value="contract_agreement">Contract Agreement</SelectItem>
                    <SelectItem value="supplemental_agreement">Supplemental Agreement</SelectItem>
                    <SelectItem value="notice_of_completion">Notice of Completion</SelectItem>
                    <SelectItem value="acceptance_and_inspection_report">Acceptance and Inspection Report</SelectItem>
                    <SelectItem value="abstract_of_bids">Abstract of Bids</SelectItem>
                    <SelectItem value="bid_evaluation_report">Bid Evaluation Report</SelectItem>
                    <SelectItem value="post_qualification_evaluation">Post-Qualification Evaluation</SelectItem>
                    <SelectItem value="resolution_recommending_award">Resolution Recommending Award</SelectItem>
                    <SelectItem value="notice_of_disqualification">Notice of Disqualification</SelectItem>
                    <SelectItem value="notice_of_postponement">Notice of Postponement</SelectItem>
                    <SelectItem value="notice_of_cancellation">Notice of Cancellation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Document description (optional)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="file">Upload File (Max 5MB) *</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  required
                />
                {formData.file && (
                  <div className="mt-2 text-sm">
                    {formData.file.size > MAX_FILE_SIZE ? (
                      <p className="text-destructive">File size exceeds 5MB limit.</p>
                    ) : (
                      <p className="text-muted-foreground">
                        Selected: {formData.file.name} ({formatFileSize(formData.file.size)})
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="file_url">Or Enter File URL</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={editingId ? () => handleUpdate(editingId) : handleUpload}
                disabled={uploading}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update' : 'Upload'} Document
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Uploaded Documents</h3>
        {documents.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No BAC documents uploaded yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">{document.title}</h4>
                        <Badge variant="outline">
                          {document.document_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      {document.description && (
                        <p className="text-sm text-muted-foreground mb-2">{document.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {document.file_size && <span>Size: {formatFileSize(document.file_size)}</span>}
                        {document.file_type && <span>Type: {document.file_type}</span>}
                        <span>Uploaded: {new Date(document.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(document.file_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(document)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
