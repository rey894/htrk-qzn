import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, TrendingUp } from "lucide-react";
import { destinations } from "@/content/destinations";

const WhatToDo = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="What to Do"
        description="Discover amazing destinations and activities in Quezon, Bukidnon"
        keywords="Quezon Bukidnon activities, tourism destinations, things to do, Kiokong White Rock Wall"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/tourism/what-to-do`}
      />

      <Header />

      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">What to Do in Quezon</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Destinations</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <Card key={dest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={dest.images[0]} alt={dest.name} className="w-full h-64 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{dest.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge>{dest.type}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {dest.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{dest.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{dest.rating} ({dest.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">{dest.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{dest.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to={`/tourism/destination/${dest.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatToDo;
