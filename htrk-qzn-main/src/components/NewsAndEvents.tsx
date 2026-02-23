import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ExternalLink,
  Megaphone,
  Award,
  Users,
  Briefcase,
  Camera,
  Play,
  Eye,
  Heart,
  Share2,
  Newspaper
} from "lucide-react";
import { useNews } from "@/hooks/useNews";
import { useEvents } from "@/hooks/useEvents";
import { Link } from "react-router-dom";

export function NewsAndEvents() {
  const { news, loading: newsLoading } = useNews(6);
  const { events, loading: eventsLoading } = useEvents(4, 'upcoming');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Featured stories can be news items with featured images
  const featuredStories = news
    .filter(item => item.featured_image_url)
    .slice(0, 3)
    .map((item, index) => ({
      id: item.id,
      title: item.title,
      subtitle: item.excerpt || item.content.substring(0, 100) + '...',
      category: item.category || "News",
      type: "article",
      thumbnail: item.featured_image_url || "/api/placeholder/400/250",
      date: item.publish_date || item.created_at
    }));

  // Use database news items
  const newsItems = news.slice(0, 4).map(item => ({
    id: item.id,
    category: item.category || "News",
    title: item.title,
    excerpt: item.excerpt || item.content.substring(0, 150) + '...',
    date: item.publish_date || item.created_at,
    image: item.featured_image_url || "/api/placeholder/400/250",
    featured: false
  }));

  // Use database events
  const upcomingEvents = events.slice(0, 4).map(event => ({
    id: event.id,
    title: event.title,
    date: event.event_date,
    time: formatTime(event.event_date),
    location: event.location || "TBA",
    type: event.category || "Event"
  }));

  // Announcements can be news items marked as announcements
  const announcements = news
    .filter(item => item.category?.toLowerCase().includes('announcement'))
    .slice(0, 3)
    .map(item => ({
      id: item.id,
      title: item.title,
      content: item.excerpt || item.content.substring(0, 100) + '...',
      date: item.publish_date || item.created_at,
      urgent: item.tags?.includes('urgent') || false
    }));

  return (
    <section id="news-events" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            News & Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest updates, announcements, and upcoming events in Quezon
          </p>
        </div>

        {/* Featured Community Stories Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-primary">Featured Community Stories</h3>
            <Button variant="outline" size="sm">
              View All Stories
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {featuredStories.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredStories.map((story) => (
                  <CarouselItem key={story.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                          <img 
                            src={story.thumbnail || "/api/placeholder/400/250"} 
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="bg-white/90 text-primary">
                              {story.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {story.subtitle}
                          </p>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(story.date)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 bg-white shadow-lg border-primary/20" />
              <CarouselNext className="-right-12 bg-white shadow-lg border-primary/20" />
            </Carousel>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No featured stories available</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-primary">Latest News</h3>
              <Button variant="outline" size="sm">
                View All News
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {newsLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
                <p>Loading news...</p>
              </div>
            ) : newsItems.length > 0 ? (
              <div className="space-y-6">
                {newsItems.map((newsItem) => (
                  <Card key={newsItem.id} className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${newsItem.featured ? 'border-primary' : ''}`}>
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        {newsItem.image && newsItem.image !== "/api/placeholder/400/250" ? (
                          <img 
                            src={newsItem.image} 
                            alt={newsItem.title}
                            className="h-48 md:h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-48 md:h-full bg-muted flex items-center justify-center">
                            <Camera className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant={newsItem.featured ? "default" : "secondary"}>
                            {newsItem.category}
                          </Badge>
                          {newsItem.featured && (
                            <Badge variant="outline" className="text-warning border-warning">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-primary mb-3 hover:text-accent transition-colors cursor-pointer">
                          {newsItem.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4">
                          {newsItem.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(newsItem.date)}
                          </div>
                          <Link to={`/news#${newsItem.id}`}>
                            <Button variant="link" size="sm" className="text-xs">
                              Read More →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No news articles available</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold text-primary">Upcoming Events</h3>
              </div>
              {eventsLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                  <p className="text-xs">Loading events...</p>
                </div>
              ) : upcomingEvents.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-l-4 border-accent pl-4 py-2">
                        <h4 className="font-semibold text-primary text-sm mb-1">
                          {event.title}
                        </h4>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Link to="/events" className="block">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Events
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No upcoming events</p>
                </div>
              )}
            </Card>

            {/* Announcements */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Megaphone className="h-5 w-5 text-warning mr-2" />
                <h3 className="text-xl font-bold text-primary">Announcements</h3>
              </div>
              {announcements.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className={`p-3 rounded-lg ${announcement.urgent ? 'bg-warning/10 border border-warning/20' : 'bg-secondary/50'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-primary text-sm">
                            {announcement.title}
                          </h4>
                          {announcement.urgent && (
                            <Badge variant="outline" className="text-warning border-warning text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {announcement.content}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(announcement.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/news">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Announcements
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Megaphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No announcements</p>
                </div>
              )}
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-primary mb-6">Quick Links</h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Awards & Recognition
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Community Programs
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Business Opportunities
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  External Resources
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}