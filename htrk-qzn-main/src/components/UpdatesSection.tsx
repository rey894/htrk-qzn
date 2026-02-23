import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, ExternalLink, Facebook, Play, Eye, Heart, Share2 } from "lucide-react";
import { useNews } from "@/hooks/useNews";
import { useEvents } from "@/hooks/useEvents";
import { useFacebookPosts } from "@/hooks/useFacebookPosts";
import { format } from "date-fns";

const featuredStories = [
  {
    id: 1,
    title: "WAKIS",
    subtitle: "Pagmamahal sa mga bata at mga batang nagdudurusa sa kahirapan at labis na mga pagkakasakit",
    category: "Community Outreach",
    type: "video",
    thumbnail: "/images/8dd7427d-1393-4131-9442-3d8a2e974f88.png",
    duration: "0:22",
    views: "2.5K",
    likes: "145",
    shares: "34",
    date: "2024-12-20"
  },
  {
    id: 2,
    title: "PANAMPULOT",
    subtitle: "Pagtulong sa mga kapatid na nangangailangan ng assistance",
    category: "Social Services",
    type: "video", 
    thumbnail: "/assets/sugar-fields.jpg",
    duration: "1:15",
    views: "1.8K",
    likes: "98",
    shares: "22",
    date: "2024-12-18"
  },
  {
    id: 3,
    title: "KASABEKAAN NE SAYAW",
    subtitle: "Cultural preservation through traditional dance",
    category: "Cultural Heritage",
    type: "video",
    thumbnail: "/assets/bukidnon-hero.jpg", 
    duration: "2:30",
    views: "3.2K",
    likes: "256",
    shares: "67",
    date: "2024-12-15"
  }
];

const formatStoryDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export function UpdatesSection() {
  const { news, loading: newsLoading } = useNews(3);
  const { events, loading: eventsLoading } = useEvents(3);
  const { posts: facebookPosts, loading: facebookLoading } = useFacebookPosts(3);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Auto-play for carousel
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselApi]);

  // Latest Headlines - primarily from Facebook
  const latestHeadlines = facebookPosts.length > 0 
    ? facebookPosts.map(post => ({
        id: post.id,
        title: post.message.substring(0, 100) + (post.message.length > 100 ? '...' : ''),
        content: post.message,
        excerpt: post.message.substring(0, 200) + (post.message.length > 200 ? '...' : ''),
        featured_image_url: post.full_picture,
        status: 'published',
        publish_date: post.created_time,
        category: 'Social Media',
        tags: ['facebook'],
        created_at: post.created_time,
        updated_at: post.created_time,
        permalink_url: post.permalink_url
      }))
    : [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Latest Updates
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            News & Updates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest news, announcements, and developments in our municipality
          </p>
        </div>

        <Tabs defaultValue="headlines" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="headlines">Latest Headlines</TabsTrigger>
            <TabsTrigger value="stories">Featured Stories</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          {/* Latest Headlines Tab */}
          <TabsContent value="headlines" className="space-y-6">
            {facebookLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="shadow-card">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <Skeleton className="w-full h-48 md:h-full" />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-6 w-full" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-16 w-full mb-4" />
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-20" />
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : latestHeadlines.length > 0 ? (
              <div className="space-y-6">
                {latestHeadlines.map((item, index) => (
                  <Card key={item.id || index} className="shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        {item.featured_image_url ? (
                          <img 
                            src={item.featured_image_url}
                            alt={item.title}
                            className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 md:h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                            <Facebook className="h-16 w-16 text-primary/30" />
                          </div>
                        )}
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Facebook className="h-3 w-3" />
                              {item.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-muted-foreground mb-4">
                            {item.excerpt}
                          </CardDescription>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              {item.publish_date ? format(new Date(item.publish_date), 'MMM dd, yyyy') : ''}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="group-hover:text-primary"
                              onClick={() => {
                                window.open(item.permalink_url || 'https://www.facebook.com/MunicipalityOfQuezonBukidnon', '_blank');
                              }}
                            >
                              View on Facebook
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Facebook className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                    <p className="font-medium mb-2">No headlines available</p>
                    <p className="text-sm">Check back later for the latest updates.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Featured Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredStories.map((story) => (
                  <CarouselItem key={story.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                          <img 
                            src={story.thumbnail} 
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                              <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                            </div>
                          </div>
                          
                          {/* Duration Badge */}
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                            {story.duration}
                          </div>
                          
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
                          
                          {/* Engagement Stats */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {story.views}
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {story.likes}
                              </div>
                              <div className="flex items-center">
                                <Share2 className="h-3 w-3 mr-1" />
                                {story.shares}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatStoryDate(story.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 hidden sm:flex" />
              <CarouselNext className="right-0 hidden sm:flex" />
            </Carousel>
          </TabsContent>

          {/* Upcoming Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {eventsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-5 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-12 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                          {event.category || 'Event'}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {format(new Date(event.event_date), 'h:mm a')}
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(new Date(event.event_date), 'MMM dd, yyyy')}
                        </div>
                        {event.location && (
                          <div className="text-muted-foreground">
                            📍 {event.location}
                          </div>
                        )}
                        <p className="text-muted-foreground text-xs mt-2">
                          {event.description.substring(0, 100)}...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                    <p className="font-medium mb-2">No upcoming events</p>
                    <p className="text-sm">Check back later for new events and announcements.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
