import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  department: string | null;
  status: string;
  created_at: string;
}

export function ContactManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; messageId: string | null }>({
    open: false,
    messageId: null
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, status } : msg
        )
      );

      toast({
        title: "Success",
        description: "Message status updated"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      });
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== id));

      toast({
        title: "Success",
        description: "Message deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    }
  };

  const handleDeleteClick = (messageId: string) => {
    setDeleteDialog({ open: true, messageId });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.messageId) {
      await deleteMessage(deleteDialog.messageId);
      setDeleteDialog({ open: false, messageId: null });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  if (loading) {
    return <div>Loading contact messages...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contact Messages ({filteredMessages.length})</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filter by status:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>{message.subject}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{message.email}</span>
                    </span>
                    {message.phone && (
                      <span className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{message.phone}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(message.created_at)}</span>
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    message.status === 'new' ? 'default' :
                    message.status === 'in_progress' ? 'secondary' : 'outline'
                  }>
                    {message.status.replace('_', ' ')}
                  </Badge>
                  <Select value={message.status} onValueChange={(value) => updateStatus(message.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">From: </span>
                  <span>{message.name}</span>
                  {message.department && (
                    <>
                      <span className="font-medium ml-4">Department: </span>
                      <span>{message.department}</span>
                    </>
                  )}
                </div>
                <div>
                  <span className="font-medium">Message:</span>
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredMessages.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filter === 'all' ? 'No contact messages found.' : `No ${filter.replace('_', ' ')} messages found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, messageId: null })}
        title="Delete Contact Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}