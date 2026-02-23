import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload, Trash2, Image as ImageIcon, File, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface MediaItem {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  description: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export function MediaManager() {
  const { user } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; mediaId: string | null }>({
    open: false,
    mediaId: null
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [description, setDescription] = useState('');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch media",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      setAltText(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `media/${fileName}`;

      // Upload to storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error('Failed to get public URL');

      // Save to media table
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          filename: fileName,
          original_filename: selectedFile.name,
          file_path: filePath,
          file_url: urlData.publicUrl,
          file_type: fileExt || null,
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
          alt_text: altText || null,
          description: description || null,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully"
      });

      setSelectedFile(null);
      setAltText('');
      setDescription('');
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId: string) => {
    try {
      const item = media.find(m => m.id === mediaId);
      if (!item) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([item.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully"
      });
      setDeleteDialog({ open: false, mediaId: null });
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "URL copied to clipboard"
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const isImage = (mimeType: string | null) => {
    return mimeType?.startsWith('image/') || false;
  };

  if (loading) {
    return <div className="text-center py-8">Loading media...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            Upload and manage images, documents, and other media files. Maximum file size: 10MB
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*,application/pdf,.doc,.docx"
                />
              </div>
              {selectedFile && (
                <>
                  <div>
                    <Label htmlFor="alt-text">Alt Text</Label>
                    <Input
                      id="alt-text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Descriptive text for accessibility"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="File description"
                      rows={2}
                    />
                  </div>
                  <Button onClick={handleUpload} disabled={uploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Media Files</CardTitle>
          <CardDescription>{media.length} file(s) in library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No media files uploaded yet
              </div>
            ) : (
              media.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center relative group">
                    {isImage(item.mime_type) ? (
                      <img
                        src={item.file_url}
                        alt={item.alt_text || item.original_filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <File className="h-12 w-12 text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(item.file_url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteDialog({ open: true, mediaId: item.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate" title={item.original_filename}>
                      {item.original_filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.file_size)}
                    </p>
                    {item.alt_text && (
                      <p className="text-xs text-muted-foreground mt-1 truncate" title={item.alt_text}>
                        {item.alt_text}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, mediaId: deleteDialog.mediaId })}
        onConfirm={() => deleteDialog.mediaId && handleDelete(deleteDialog.mediaId)}
        title="Delete Media"
        description="Are you sure you want to delete this file? This action cannot be undone."
      />
    </div>
  );
}
