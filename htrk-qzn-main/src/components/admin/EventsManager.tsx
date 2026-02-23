import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  end_date: string;
  location: string;
  venue: string;
  featured_image_url: string;
  category: string;
  organizer: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  registration_required: boolean;
  registration_link: string;
  registration_deadline: string;
  max_participants: number | null;
  event_fee: number | null;
  event_fee_currency: string;
  status: string;
}

export function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    event_date: '',
    end_date: '',
    location: '',
    venue: '',
    featured_image_url: '',
    category: '',
    organizer: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    registration_required: false,
    registration_link: '',
    registration_deadline: '',
    max_participants: null,
    event_fee: null,
    event_fee_currency: 'PHP',
    status: 'upcoming'
  });

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      event_date: '',
      end_date: '',
      location: '',
      venue: '',
      featured_image_url: '',
      category: '',
      organizer: '',
      contact_person: '',
      contact_email: '',
      contact_phone: '',
      registration_required: false,
      registration_link: '',
      registration_deadline: '',
      max_participants: null,
      event_fee: null,
      event_fee_currency: 'PHP',
      status: 'upcoming'
    });
  };

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.event_date) {
      toast({
        title: "Error",
        description: "Title, description, and event date are required",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('events')
      .insert(form);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Event created successfully"
      });
      setIsCreating(false);
      resetForm();
      fetchEvents();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .update(form)
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Event updated successfully"
      });
      setEditingId(null);
      resetForm();
      fetchEvents();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully"
      });
      fetchEvents();
    }
  };

  const startEdit = (event: any) => {
    setForm({
      title: event.title,
      description: event.description,
      event_date: event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '',
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
      location: event.location || '',
      venue: event.venue || '',
      featured_image_url: event.featured_image_url || '',
      category: event.category || '',
      organizer: event.organizer || '',
      contact_person: event.contact_person || '',
      contact_email: event.contact_email || '',
      contact_phone: event.contact_phone || '',
      registration_required: event.registration_required || false,
      registration_link: event.registration_link || '',
      registration_deadline: event.registration_deadline ? new Date(event.registration_deadline).toISOString().slice(0, 16) : '',
      max_participants: event.max_participants,
      event_fee: event.event_fee,
      event_fee_currency: event.event_fee_currency || 'PHP',
      status: event.status
    });
    setEditingId(event.id);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Event */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Events</span>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              New Event
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
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Event description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event_date">Start Date & Time</Label>
                  <Input
                    id="event_date"
                    type="datetime-local"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date & Time (Optional)</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location/City</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Quezon, Bukidnon"
                  />
                </div>
                <div>
                  <Label htmlFor="venue">Venue/Address</Label>
                  <Input
                    id="venue"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="Specific venue or address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    value={form.organizer}
                    onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                    placeholder="Event organizer"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    id="contact_person"
                    value={form.contact_person}
                    onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                    placeholder="Contact person name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={form.contact_email}
                    onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registration_required">Registration Required</Label>
                  <Select 
                    value={form.registration_required ? 'yes' : 'no'} 
                    onValueChange={(value) => setForm({ ...form, registration_required: value === 'yes' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.registration_required && (
                  <div>
                    <Label htmlFor="registration_deadline">Registration Deadline</Label>
                    <Input
                      id="registration_deadline"
                      type="datetime-local"
                      value={form.registration_deadline}
                      onChange={(e) => setForm({ ...form, registration_deadline: e.target.value })}
                    />
                  </div>
                )}
              </div>
              {form.registration_required && (
                <div>
                  <Label htmlFor="registration_link">Registration Link</Label>
                  <Input
                    id="registration_link"
                    type="url"
                    value={form.registration_link}
                    onChange={(e) => setForm({ ...form, registration_link: e.target.value })}
                    placeholder="https://example.com/register"
                  />
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="max_participants">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={form.max_participants || ''}
                    onChange={(e) => setForm({ ...form, max_participants: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="event_fee">Event Fee</Label>
                  <Input
                    id="event_fee"
                    type="number"
                    step="0.01"
                    value={form.event_fee || ''}
                    onChange={(e) => setForm({ ...form, event_fee: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="event_fee_currency">Currency</Label>
                  <Select 
                    value={form.event_fee_currency} 
                    onValueChange={(value) => setForm({ ...form, event_fee_currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHP">PHP (₱)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g., Community, Government"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreate}>
                <Save className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); resetForm(); }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{event.title}</span>
                  </CardTitle>
                  <CardDescription>
                    {event.category && <Badge variant="secondary">{event.category}</Badge>}
                    <Badge variant={event.status === 'upcoming' ? 'default' : 'outline'} className="ml-2">
                      {event.status}
                    </Badge>
                    {event.location && <span className="ml-2">📍 {event.location}</span>}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {editingId === event.id && (
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`title-${event.id}`}>Title</Label>
                    <Input
                      id={`title-${event.id}`}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${event.id}`}>Description</Label>
                    <Textarea
                      id={`description-${event.id}`}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`event_date-${event.id}`}>Start Date & Time</Label>
                      <Input
                        id={`event_date-${event.id}`}
                        type="datetime-local"
                        value={form.event_date}
                        onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end_date-${event.id}`}>End Date & Time</Label>
                      <Input
                        id={`end_date-${event.id}`}
                        type="datetime-local"
                        value={form.end_date}
                        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`location-${event.id}`}>Location/City</Label>
                      <Input
                        id={`location-${event.id}`}
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`venue-${event.id}`}>Venue/Address</Label>
                      <Input
                        id={`venue-${event.id}`}
                        value={form.venue}
                        onChange={(e) => setForm({ ...form, venue: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`organizer-${event.id}`}>Organizer</Label>
                      <Input
                        id={`organizer-${event.id}`}
                        value={form.organizer}
                        onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`contact_person-${event.id}`}>Contact Person</Label>
                      <Input
                        id={`contact_person-${event.id}`}
                        value={form.contact_person}
                        onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`contact_email-${event.id}`}>Contact Email</Label>
                      <Input
                        id={`contact_email-${event.id}`}
                        type="email"
                        value={form.contact_email}
                        onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`contact_phone-${event.id}`}>Contact Phone</Label>
                      <Input
                        id={`contact_phone-${event.id}`}
                        type="tel"
                        value={form.contact_phone}
                        onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`registration_required-${event.id}`}>Registration Required</Label>
                      <Select 
                        value={form.registration_required ? 'yes' : 'no'} 
                        onValueChange={(value) => setForm({ ...form, registration_required: value === 'yes' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {form.registration_required && (
                      <div>
                        <Label htmlFor={`registration_deadline-${event.id}`}>Registration Deadline</Label>
                        <Input
                          id={`registration_deadline-${event.id}`}
                          type="datetime-local"
                          value={form.registration_deadline}
                          onChange={(e) => setForm({ ...form, registration_deadline: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  {form.registration_required && (
                    <div>
                      <Label htmlFor={`registration_link-${event.id}`}>Registration Link</Label>
                      <Input
                        id={`registration_link-${event.id}`}
                        type="url"
                        value={form.registration_link}
                        onChange={(e) => setForm({ ...form, registration_link: e.target.value })}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`max_participants-${event.id}`}>Max Participants</Label>
                      <Input
                        id={`max_participants-${event.id}`}
                        type="number"
                        value={form.max_participants || ''}
                        onChange={(e) => setForm({ ...form, max_participants: e.target.value ? parseInt(e.target.value) : null })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`event_fee-${event.id}`}>Event Fee</Label>
                      <Input
                        id={`event_fee-${event.id}`}
                        type="number"
                        step="0.01"
                        value={form.event_fee || ''}
                        onChange={(e) => setForm({ ...form, event_fee: e.target.value ? parseFloat(e.target.value) : null })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`event_fee_currency-${event.id}`}>Currency</Label>
                      <Select 
                        value={form.event_fee_currency} 
                        onValueChange={(value) => setForm({ ...form, event_fee_currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PHP">PHP (₱)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`category-${event.id}`}>Category</Label>
                      <Input
                        id={`category-${event.id}`}
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`status-${event.id}`}>Status</Label>
                      <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleUpdate(event.id)}>
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