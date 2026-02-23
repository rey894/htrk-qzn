import { useParams, useNavigate, Link } from "react-router-dom";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { destinations } from "@/content/destinations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  DollarSign,
  AlertCircle,
  Lightbulb,
  Navigation,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
          <Button onClick={() => navigate("/tourism/what-to-do")}>
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  const relatedDestinations = destinations
    .filter((d) => d.id !== destination.id && d.type === destination.type)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title={`${destination.name} - Tourism`}
        description={destination.description}
        keywords={`${destination.name}, Quezon Bukidnon tourism, ${destination.type}`}
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/tourism/destination/${destination.id}`}
        ogImage={destination.images?.[0]}
      />

      <Header />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img
          src={destination.images[selectedImage]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/tourism/what-to-do")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-white/90">
              <Badge variant="secondary" className="text-sm">
                {destination.type}
              </Badge>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{destination.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{destination.rating}</span>
                <span className="text-sm">({destination.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Thumbnails */}
      {destination.images.length > 1 && (
        <div className="bg-muted py-4">
          <div className="container mx-auto">
            <div className="flex gap-4 overflow-x-auto">
              {destination.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-primary scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Destination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Highlights
                </h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Activities & Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="activities" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="safety">Safety Tips</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activities" className="mt-6">
                    <h3 className="font-semibold mb-3">Things You Can Do</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, index) => (
                        <Badge key={index} variant="outline">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="safety" className="mt-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Safety Guidelines
                    </h3>
                    <ul className="space-y-2">
                      {destination.safetyTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="facilities" className="mt-6">
                    <h3 className="font-semibold mb-3">Available Facilities</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {destination.facilities.map((facility, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Directions & Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Navigation className="h-6 w-6 text-primary" />
                  How to Get There
                </h2>
                <p className="text-muted-foreground mb-4">{destination.directions}</p>
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Visitor Reviews</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(destination.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold">{destination.rating}</span>
                      <span className="text-muted-foreground">
                        ({destination.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-6">
                  {/* Sample reviews - in a real app, these would come from a database */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-semibold">John Doe</span>
                      <span className="text-sm text-muted-foreground">• 2 weeks ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Amazing experience! The natural beauty is breathtaking. Highly recommend
                      visiting during the dry season for the best experience.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-semibold">Maria Santos</span>
                      <span className="text-sm text-muted-foreground">• 1 month ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Beautiful destination! The facilities could use some improvement, but
                      the natural scenery more than makes up for it.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Quick Information</h3>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Difficulty</p>
                      <p className="text-sm text-muted-foreground">
                        {destination.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {destination.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Best Time to Visit</p>
                      <p className="text-sm text-muted-foreground">
                        {destination.bestTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-sm">Fees</p>
                      <p className="text-sm text-muted-foreground">{destination.fees}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Book a Tour
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Contact Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Tourism Office */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Need Assistance?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Tourism Office</p>
                      <p className="text-sm text-muted-foreground">(088) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">
                        tourism@quezonbukidnon.gov.ph
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">More {destination.type}s</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedDestinations.map((related) => (
                <Link key={related.id} to={`/tourism/destination/${related.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <img
                      src={related.images[0]}
                      alt={related.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{related.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {related.description}
                      </p>
                      <div className="flex items-center gap-1 mt-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{related.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({related.reviewCount})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
