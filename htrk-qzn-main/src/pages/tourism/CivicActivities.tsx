import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Camera, Users, Star } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";

const CivicActivities = () => {
  const majorEvents = [
    {
      name: "Sunggod Teh Kamanga Festival",
      date: "February (Annual)",
      venue: "Civic Arena",
      description: "The premier cultural celebration of Quezon showcasing local traditions, unity, and community spirit. This festival brings together all barangays in a spectacular display of culture, arts, and heritage.",
      highlights: [
        "Traditional Cultural Performances",
        "Street Dancing Competition", 
        "Local Arts & Crafts Exhibition",
        "Community Parade",
        "Traditional Food Festival",
        "Unity Ceremonies"
      ],
      image: "/assets/sugar-fields.jpg",
      status: "Annual Highlight"
    },
    {
      name: "October Events Series",
      date: "Throughout October",
      venue: "Various Venues",
      description: "A month-long celebration featuring multiple community events, competitions, and cultural activities that celebrate our achievements and strengthen community bonds.",
      highlights: [
        "Sports Competitions & Tournaments",
        "Cultural Shows & Performances", 
        "Food Festivals & Culinary Events",
        "Trade Fairs & Local Products",
        "Educational Workshops",
        "Community Recognition Awards"
      ],
      image: "/assets/bukidnon-hero.jpg",
      status: "Month-long Celebration"
    },
    {
      name: "Araw ng Quezon",
      date: "August 19 (Annual)",
      venue: "Civic Arena & Freedom Park",
      description: "The municipality's anniversary celebration commemorating the founding of Quezon with patriotic activities, community recognition, and cultural events.",
      highlights: [
        "Grand Parade & Procession",
        "Cultural Shows & Performances",
        "Sports Events & Competitions", 
        "Community Recognition Ceremony",
        "Historical Exhibits",
        "Youth Programs"
      ],
      image: "/assets/sugar-fields.jpg",
      status: "Anniversary Celebration"
    },
    {
      name: "Summer Sports Festival (SSF)",
      date: "April - May",
      venue: "Various Sports Facilities",
      description: "Annual comprehensive sports competition promoting health, wellness, and community spirit among all age groups and skill levels.",
      highlights: [
        "Basketball Tournaments",
        "Volleyball Competitions",
        "Athletics & Track Events",
        "Swimming Competitions",
        "Youth Sports Programs",
        "Community Sports Clinics"
      ],
      image: "/assets/bukidnon-hero.jpg",
      status: "Sports Festival"
    },
    {
      name: "Christmas Lights Display",
      date: "December (Holiday Season)",
      venue: "Freedom Park Complex",
      description: "Spectacular holiday light display and Christmas celebration bringing joy, unity, and festive spirit to the entire community during the holiday season.",
      highlights: [
        "Grand Light Shows & Displays",
        "Holiday Markets & Shopping",
        "Family Activities & Games",
        "Christmas Concerts & Performances",
        "Community Christmas Tree",
        "Holiday Food Festival"
      ],
      image: "/assets/sugar-fields.jpg",
      status: "Holiday Celebration"
    }
  ];

  const venues = [
    {
      name: "Civic Arena",
      description: "Main venue for major events, sports competitions, and large community gatherings",
      capacity: "Large-scale events",
      facilities: ["Main stage", "Sports courts", "Seating areas", "Sound system"]
    },
    {
      name: "Hawkers' Hub", 
      description: "Community gathering space for smaller events, markets, and social activities",
      capacity: "Medium-scale events",
      facilities: ["Vendor stalls", "Community tables", "Food court area", "Performance space"]
    },
    {
      name: "Freedom Park Complex",
      description: "Multi-purpose recreational area for outdoor events, festivals, and community activities",
      capacity: "Various event sizes",
      facilities: ["Open spaces", "Pavilions", "Walking paths", "Playground areas"]
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Civic Activities"
        description="Discover major civic events and cultural celebrations in Quezon, Bukidnon including Sunggod Teh Kamanga Festival, Araw ng Quezon, and community activities."
        keywords="Sunggod Teh Kamanga Festival, Araw ng Quezon, civic activities, cultural events, Quezon Bukidnon festivals"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/tourism/civic-activities`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-r from-primary to-primary/80">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/assets/sugar-fields.jpg')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/70"></div>
          </div>
          <div className="container mx-auto px-4 relative h-full flex items-center">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <Badge variant="secondary" className="mb-4">
                Community Celebrations
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                Civic Activities
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <Calendar className="h-5 w-5 mr-2" />
                  View Event Calendar
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Camera className="h-5 w-5 mr-2" />
                  Event Gallery
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Major Events */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Major Events & Celebrations</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join us in celebrating our rich culture, community achievements, and shared traditions throughout the year
              </p>
            </div>

            <div className="space-y-8">
              {majorEvents.map((event, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-auto bg-secondary">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline">{event.status}</Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-primary mb-3">{event.name}</h3>
                          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary" />
                            Event Highlights
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {event.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="text-sm text-muted-foreground">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <div className="aspect-video max-w-xs rounded-lg bg-secondary/50 border border-dashed border-muted-foreground/25 flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <span className="text-sm">Photo placeholder</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Venues */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Venues</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                State-of-the-art facilities that host our community celebrations and cultural events
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {venues.map((venue, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full w-16 h-16 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{venue.name}</CardTitle>
                    <Badge variant="outline" className="mx-auto">{venue.capacity}</Badge>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{venue.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Facilities</h4>
                        <div className="space-y-1">
                          {venue.facilities.map((facility, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              • {facility}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our community celebrations and be part of preserving and celebrating our rich cultural heritage
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Users className="h-5 w-5 mr-2" />
                  Volunteer for Events
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="h-5 w-5 mr-2" />
                  Event Notifications
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CivicActivities;