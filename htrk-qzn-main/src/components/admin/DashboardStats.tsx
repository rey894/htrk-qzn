import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Download, MessageSquare, ExternalLink, Plus, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface ContentStats {
  news: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  events: {
    total: number;
    upcoming: number;
    ongoing: number;
    completed: number;
  };
  documents: {
    total: number;
    published: number;
    draft: number;
    archived: number;
  };
  contacts: {
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
  };
}

export function DashboardStats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<ContentStats>({
    news: { total: 0, published: 0, draft: 0, archived: 0 },
    events: { total: 0, upcoming: 0, ongoing: 0, completed: 0 },
    documents: { total: 0, published: 0, draft: 0, archived: 0 },
    contacts: { total: 0, new: 0, in_progress: 0, resolved: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);

        // Fetch all news with status breakdown
        const { data: newsData } = await supabase
          .from('news')
          .select('status');

        // Fetch all events with status breakdown
        const { data: eventsData } = await supabase
          .from('events')
          .select('status');

        // Fetch all documents with status breakdown
        const { data: documentsData } = await supabase
          .from('documents')
          .select('status');

        // Fetch all contact messages with status breakdown
        const { data: contactsData } = await supabase
          .from('contact_messages')
          .select('status');

        // Calculate stats
        const newsStats = {
          total: newsData?.length || 0,
          published: newsData?.filter(n => n.status === 'published').length || 0,
          draft: newsData?.filter(n => n.status === 'draft').length || 0,
          archived: newsData?.filter(n => n.status === 'archived').length || 0
        };

        const eventsStats = {
          total: eventsData?.length || 0,
          upcoming: eventsData?.filter(e => e.status === 'upcoming').length || 0,
          ongoing: eventsData?.filter(e => e.status === 'ongoing').length || 0,
          completed: eventsData?.filter(e => e.status === 'completed').length || 0
        };

        const documentsStats = {
          total: documentsData?.length || 0,
          published: documentsData?.filter(d => d.status === 'published').length || 0,
          draft: documentsData?.filter(d => d.status === 'draft').length || 0,
          archived: documentsData?.filter(d => d.status === 'archived').length || 0
        };

        const contactsStats = {
          total: contactsData?.length || 0,
          new: contactsData?.filter(c => c.status === 'new').length || 0,
          in_progress: contactsData?.filter(c => c.status === 'in_progress').length || 0,
          resolved: contactsData?.filter(c => c.status === 'resolved' || c.status === 'closed').length || 0
        };

        setStats({
          news: newsStats,
          events: eventsStats,
          documents: documentsStats,
          contacts: contactsStats
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const contentCards = [
    {
      id: 'news',
      title: 'News Articles',
      icon: FileText,
      total: stats.news.total,
      primary: stats.news.published,
      primaryLabel: 'Published',
      secondary: stats.news.draft,
      secondaryLabel: 'Drafts',
      tertiary: stats.news.archived,
      tertiaryLabel: 'Archived',
      route: '/admin#news',
      color: 'text-blue-600'
    },
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      total: stats.events.total,
      primary: stats.events.upcoming,
      primaryLabel: 'Upcoming',
      secondary: stats.events.ongoing,
      secondaryLabel: 'Ongoing',
      tertiary: stats.events.completed,
      tertiaryLabel: 'Completed',
      route: '/admin#events',
      color: 'text-green-600'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: Download,
      total: stats.documents.total,
      primary: stats.documents.published,
      primaryLabel: 'Published',
      secondary: stats.documents.draft,
      secondaryLabel: 'Drafts',
      tertiary: stats.documents.archived,
      tertiaryLabel: 'Archived',
      route: '/admin#documents',
      color: 'text-purple-600'
    },
    {
      id: 'contacts',
      title: 'Contact Messages',
      icon: MessageSquare,
      total: stats.contacts.total,
      primary: stats.contacts.new,
      primaryLabel: 'New',
      secondary: stats.contacts.in_progress,
      secondaryLabel: 'In Progress',
      tertiary: stats.contacts.resolved,
      tertiaryLabel: 'Resolved',
      route: '/admin#contacts',
      color: 'text-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold">{card.total}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => navigate(card.route)}
                    >
                      Manage <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant={card.primary > 0 ? 'default' : 'secondary'} className="text-xs">
                      {card.primaryLabel}: {card.primary}
                    </Badge>
                    {card.secondary > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {card.secondaryLabel}: {card.secondary}
                      </Badge>
                    )}
                    {card.tertiary > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {card.tertiaryLabel}: {card.tertiary}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate('/admin#news')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate('/admin#events')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate('/admin#documents')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate('/admin#contacts')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
