import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { BreadcrumbSchema, EventSchema } from "@/components/seo/StructuredData";
import { Calendar, MapPin, Clock, Users, Music, Sparkles, Heart, Trophy } from "lucide-react";
import { tourismContent } from "@/content/tourism";

const FestivalCalendar = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <SEOHelmet
        title="Festivals & Events Calendar - Quezon, Bukidnon"
        description="Experience vibrant festivals and cultural events in Quezon, Bukidnon. From Sunggod Teh Kamanga Festival to Christmas Lights Display. Plan your visit around our year-round celebrations."
        keywords="Quezon Bukidnon festivals, Sunggod Teh Kamanga Festival, Araw ng Quezon, Pulangi Oktoberfest, Christmas lights Bukidnon, Bukidnon events, Manobo festival"
        ogImage="/assets/quezon-manobo-cultural-festival-dance.jpg"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: window.location.origin },
          { name: "Tourism", url: `${window.location.origin}/tourism` },
          { name: "Festivals & Events", url: window.location.href }
        ]}
      />

      {/* Event Schema for each festival */}
      {tourismContent.festivals.map((festival, index) => (
        <EventSchema
          key={index}
          name={festival.name}
          description={festival.description}
          startDate={`${getCurrentYear()}-${festival.month === "February" ? "02" : festival.month === "June" ? "06" : festival.month === "July-August" ? "07" : festival.month === "October 1" ? "10" : festival.month === "October" ? "10" : "12"}-01`}
          location={{
            name: "Quezon, Bukidnon",
            address: "Poblacion, Quezon, Bukidnon"
          }}
          organizer="Municipality of Quezon, Bukidnon"
        />
      ))}
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                Annual Events
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Festivals & Events Calendar
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the vibrant culture and celebrations of Quezon, Bukidnon throughout the year
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg">
              {tourismContent.intro}
            </p>
          </div>
        </section>

        {/* Festivals Timeline */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Year-Round Celebrations</h2>
            
            <div className="space-y-8">
              {tourismContent.festivals.map((festival, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-semibold">
                            <Calendar className="w-3 h-3 mr-1" />
                            {festival.month}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{festival.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {index === 0 && <Sparkles className="w-8 h-8 text-primary" />}
                        {index === 1 && <Trophy className="w-8 h-8 text-primary" />}
                        {index === 4 && <Music className="w-8 h-8 text-primary" />}
                        {index === 3 && <Heart className="w-8 h-8 text-primary" />}
                        {index === 5 && <Sparkles className="w-8 h-8 text-primary" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">{festival.description}</p>
                    
                    {/* Highlights for major festivals */}
                    {index === 0 && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Festival Highlights
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm">
                          <li>• Cultural rituals and ceremonies</li>
                          <li>• Traditional Manobo games</li>
                          <li>• IPMR pageant competition</li>
                          <li>• Indigenous cultural showcase</li>
                          <li>• Traditional music and dance</li>
                          <li>• Local crafts and products</li>
                        </ul>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Festival Highlights
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm">
                          <li>• Laga Teh Quezon pageant</li>
                          <li>• Pista sa Nayon celebration</li>
                          <li>• Grand float parade</li>
                          <li>• Pasundayag concert</li>
                          <li>• Sports competitions</li>
                          <li>• Cultural performances</li>
                        </ul>
                      </div>
                    )}

                    {index === 4 && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          Festival Highlights
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm">
                          <li>• Live concerts and performances</li>
                          <li>• Spectacular fireworks display</li>
                          <li>• Sports tournaments</li>
                          <li>• Pasigarbo showcase</li>
                          <li>• Food festival and night market</li>
                          <li>• Trade fair and exhibits</li>
                        </ul>
                      </div>
                    )}

                    {index === 5 && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Display Features
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm">
                          <li>• Spectacular light installations</li>
                          <li>• Giant Christmas trees</li>
                          <li>• Animated light displays</li>
                          <li>• Photo opportunity areas</li>
                          <li>• Holiday market vendors</li>
                          <li>• Family-friendly activities</li>
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 mt-6">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Quezon, Bukidnon</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Open to all visitors</span>
                      </div>
                      {(index === 0 || index === 1 || index === 4) && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Multi-day celebration</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Your Visit */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Plan Your Festival Visit</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book early during major festivals, especially October and December. Hotels and homestays fill up quickly.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/travel-guide">View Travel Guide</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Getting There</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    3-4 hours from Davao City via BuDa Road. Public buses and private vehicles available.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/travel-guide">View Directions</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What to Bring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comfortable clothing, camera, cash for local purchases, and an open mind for cultural experiences.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/travel-guide">Packing List</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cultural Respect Notice */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Cultural Respect & Etiquette</CardTitle>
                <CardDescription>
                  Help us preserve and honor our cultural heritage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>The Sunggod Teh Kamanga Festival features sacred indigenous rituals. Please observe respectfully and follow guide instructions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ask permission before photographing indigenous people, especially during ceremonies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Support local artisans by purchasing authentic handmade crafts and products.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Dispose of waste properly and keep festival venues clean.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Respect local customs, dress modestly, and be mindful of cultural sensitivities.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Quezon's Festivals</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Immerse yourself in the rich cultural heritage and vibrant celebrations of Southern Bukidnon
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/tourism">Explore Destinations</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Tourism Office</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FestivalCalendar;