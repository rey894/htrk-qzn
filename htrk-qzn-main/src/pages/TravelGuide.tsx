import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { 
  Car, 
  Bus, 
  MapPin, 
  Clock, 
  Hotel, 
  Utensils, 
  Backpack, 
  Phone,
  AlertCircle,
  Navigation,
  Fuel,
  Mountain,
  Camera,
  ShoppingBag
} from "lucide-react";

const TravelGuide = () => {
  return (
    <>
      <SEOHelmet
        title="Complete Travel Guide to Quezon, Bukidnon"
        description="Everything you need to know about traveling to Quezon, Bukidnon. Directions from Davao and CDO, where to stay, what to bring, and travel tips for your visit."
        keywords="Quezon Bukidnon travel guide, how to go to Quezon Bukidnon, Davao to Quezon, CDO to Quezon, Bukidnon travel tips, where to stay in Quezon"
        ogImage="/assets/bukidnon-hero.jpg"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: window.location.origin },
          { name: "Travel Guide", url: window.location.href }
        ]}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Travel to Quezon, Bukidnon
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your comprehensive guide to visiting the Heart of Southern Bukidnon. 
                Plan your trip with detailed directions, accommodation options, and essential travel tips.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="directions" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="directions">
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </TabsTrigger>
                <TabsTrigger value="accommodation">
                  <Hotel className="w-4 h-4 mr-2" />
                  Where to Stay
                </TabsTrigger>
                <TabsTrigger value="essentials">
                  <Backpack className="w-4 h-4 mr-2" />
                  What to Bring
                </TabsTrigger>
                <TabsTrigger value="tips">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Travel Tips
                </TabsTrigger>
              </TabsList>

              {/* Directions Tab */}
              <TabsContent value="directions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      From Davao City
                    </CardTitle>
                    <CardDescription>Via Bukidnon-Davao Road (BuDa Highway)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Travel Time</p>
                          <p className="text-muted-foreground">3-4 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Distance</p>
                          <p className="text-muted-foreground">145 kilometers</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Bus className="w-4 h-4" />
                        By Bus
                      </h4>
                      <ol className="space-y-2 text-sm">
                        <li>1. Go to <strong>Ecoland Bus Terminal</strong> in Davao City</li>
                        <li>2. Take a bus heading to <strong>Malaybalay or Valencia via BuDa Road</strong></li>
                        <li>3. Tell the driver/conductor to drop you at <strong>Quezon, Bukidnon</strong></li>
                        <li>4. Bus fare: approximately ₱200-300 per person</li>
                      </ol>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        By Private Vehicle
                      </h4>
                      <ol className="space-y-2 text-sm">
                        <li>1. From Davao City, take the <strong>Bukidnon-Davao Road (BuDa Highway)</strong></li>
                        <li>2. Pass through <strong>Arakan</strong> and <strong>Kitaotao</strong></li>
                        <li>3. Continue north until you reach <strong>Quezon, Bukidnon</strong></li>
                        <li>4. Watch for road signs indicating Quezon</li>
                        <li>5. GPS Coordinates: 7.7353°N, 125.1013°E</li>
                      </ol>
                      <div className="flex items-start gap-2 mt-3 text-sm text-amber-600 dark:text-amber-500">
                        <Fuel className="w-4 h-4 mt-0.5" />
                        <p>Fill up your tank in Davao. Gas stations are available along the route.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="w-5 h-5" />
                      From Cagayan de Oro City
                    </CardTitle>
                    <CardDescription>Via Sayre Highway</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Travel Time</p>
                          <p className="text-muted-foreground">4-5 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Distance</p>
                          <p className="text-muted-foreground">162 kilometers</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Bus className="w-4 h-4" />
                        By Bus
                      </h4>
                      <ol className="space-y-2 text-sm">
                        <li>1. Go to <strong>Agora Bus Terminal</strong> or <strong>Bulua Terminal</strong> in CDO</li>
                        <li>2. Take a bus to <strong>Valencia or Malaybalay</strong></li>
                        <li>3. From Valencia/Malaybalay, take another bus or van to <strong>Quezon</strong></li>
                        <li>4. Total fare: approximately ₱300-400 per person</li>
                      </ol>
                    </div>

                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        By Private Vehicle
                      </h4>
                      <ol className="space-y-2 text-sm">
                        <li>1. From CDO, take the <strong>Sayre Highway</strong> going south</li>
                        <li>2. Pass through <strong>Malaybalay City</strong> and <strong>Valencia City</strong></li>
                        <li>3. Continue south on the highway</li>
                        <li>4. Turn at the junction to <strong>Quezon, Bukidnon</strong></li>
                        <li>5. Follow signs to Quezon town proper</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Entry Points to Quezon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <Badge className="mb-2">South Entry</Badge>
                        <p className="font-semibold">Palacapao via Kipolot</p>
                        <p className="text-sm text-muted-foreground">From Kitaotao/Davao direction</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <Badge className="mb-2">West Entry</Badge>
                        <p className="font-semibold">San Jose via Maramag</p>
                        <p className="text-sm text-muted-foreground">Via Brgy. Camp 1</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <Badge className="mb-2">North Entry</Badge>
                        <p className="font-semibold">Butong via Dologon</p>
                        <p className="text-sm text-muted-foreground">Dologon-Busco-Quezon Road</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accommodation Tab */}
              <TabsContent value="accommodation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Where to Stay in Quezon, Bukidnon</CardTitle>
                    <CardDescription>
                      Accommodation options for every budget and preference
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">Hotels & Lodges</h4>
                            <p className="text-sm text-muted-foreground">₱1,500 - ₱4,000/night</p>
                          </div>
                          <Hotel className="w-5 h-5 text-primary" />
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Air-conditioned rooms</li>
                          <li>• WiFi available</li>
                          <li>• Hot/cold shower</li>
                          <li>• Restaurant on-site</li>
                        </ul>
                        <p className="text-xs text-muted-foreground">
                          Located in Poblacion and major barangays
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">Homestays & Guesthouses</h4>
                            <p className="text-sm text-muted-foreground">₱800 - ₱2,000/night</p>
                          </div>
                          <Hotel className="w-5 h-5 text-primary" />
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Local family experience</li>
                          <li>• Home-cooked meals available</li>
                          <li>• Cultural immersion</li>
                          <li>• Tour guide assistance</li>
                        </ul>
                        <p className="text-xs text-muted-foreground">
                          Available in various barangays
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">Camping Sites</h4>
                            <p className="text-sm text-muted-foreground">Free - ₱500/night</p>
                          </div>
                          <Mountain className="w-5 h-5 text-primary" />
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Near major attractions</li>
                          <li>• Basic facilities</li>
                          <li>• Bring your own gear</li>
                          <li>• Permit may be required</li>
                        </ul>
                        <p className="text-xs text-muted-foreground">
                          At Mt. Tangulang, waterfalls areas
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">Resorts</h4>
                            <p className="text-sm text-muted-foreground">Day visit: ₱100-300</p>
                          </div>
                          <Hotel className="w-5 h-5 text-primary" />
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Lowan-Lowan Spring Resort</li>
                          <li>• Swimming pools</li>
                          <li>• Day use facilities</li>
                          <li>• Food services</li>
                        </ul>
                        <p className="text-xs text-muted-foreground">
                          Located in Poblacion
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Booking Information
                      </h4>
                      <p className="text-sm mb-2">
                        For accommodation inquiries and reservations, contact the Municipal Tourism Office:
                      </p>
                      <p className="text-sm font-mono">📞 Contact: (to be updated)</p>
                      <p className="text-sm font-mono">📧 Email: tourism@quezon.gov.ph</p>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Advance booking is recommended during peak season (October-December and Holy Week)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="w-5 h-5" />
                      Where to Eat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Local Eateries</h4>
                        <p className="text-sm text-muted-foreground">
                          Authentic Filipino and Bukidnon cuisine. Budget-friendly meals starting at ₱60-150.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Fast Food Chains</h4>
                        <p className="text-sm text-muted-foreground">
                          Available in Poblacion and major centers. Familiar menu options ₱100-250.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Restaurants</h4>
                        <p className="text-sm text-muted-foreground">
                          Variety of cuisines including local specialties. Meals ₱150-400 per person.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Essentials Tab */}
              <TabsContent value="essentials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Backpack className="w-5 h-5" />
                      What to Bring to Quezon, Bukidnon
                    </CardTitle>
                    <CardDescription>
                      Essential items for a comfortable and enjoyable visit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Mountain className="w-4 h-4" />
                            For Nature & Adventure
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Hiking boots/shoes</strong> - For mountain trails and waterfalls</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Comfortable clothing</strong> - Light, breathable fabrics</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Swimwear</strong> - For waterfalls and spring resort</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Jacket or hoodie</strong> - Cool mountain weather, especially mornings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Rain gear</strong> - Umbrella or raincoat (year-round possibility)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Trekking poles</strong> - For challenging mountain trails</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Dry bag</strong> - Protect electronics and valuables</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Photography & Electronics
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Camera/smartphone</strong> - Capture stunning landscapes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Power bank</strong> - Limited charging opportunities on trails</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Extra batteries</strong> - For cameras and devices</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Waterproof case</strong> - Protect devices near water</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">Health & Safety</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>First aid kit</strong> - Basic medicines and bandages</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Insect repellent</strong> - Protection from mosquitoes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Sunscreen</strong> - SPF 30+ for outdoor activities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Personal medications</strong> - Bring adequate supply</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Hand sanitizer</strong> - Keep hands clean on the go</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Flashlight/headlamp</strong> - For caves and early starts</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Other Essentials</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Reusable water bottle</strong> - Stay hydrated</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Snacks/trail food</strong> - Energy for hikes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Cash</strong> - Limited ATMs and card acceptance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Valid ID</strong> - Required for some activities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Reusable bags</strong> - Eco-friendly shopping</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              <span><strong>Travel documents</strong> - Bookings and permits</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Shopping in Quezon
                      </h4>
                      <p className="text-sm">
                        Basic supplies, snacks, and toiletries are available in Poblacion stores and sari-sari stores. 
                        However, specialized outdoor gear should be purchased before your trip in Davao or CDO.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tips Tab */}
              <TabsContent value="tips" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Important Travel Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Best Time to Visit</h4>
                        <p className="text-sm">
                          <strong>Dry Season:</strong> February to May - Best for hiking and outdoor activities
                        </p>
                        <p className="text-sm">
                          <strong>Wet Season:</strong> June to January - Waterfalls at full flow, bring rain gear
                        </p>
                        <p className="text-sm">
                          <strong>Peak Season:</strong> October (Oktoberfest), December (Christmas Lights), February (Festival)
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Weather & Temperature</h4>
                        <p className="text-sm">
                          <strong>Average:</strong> 20-28°C (cooler in mountains)
                        </p>
                        <p className="text-sm">
                          <strong>Mornings:</strong> Can be cool (15-18°C), bring layers
                        </p>
                        <p className="text-sm">
                          <strong>Afternoons:</strong> Warm, UV protection recommended
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Money Matters</h4>
                        <p className="text-sm">
                          • <strong>ATMs available</strong> in Poblacion - withdraw cash before heading to remote areas
                        </p>
                        <p className="text-sm">
                          • <strong>Cash preferred</strong> - Most establishments don't accept cards
                        </p>
                        <p className="text-sm">
                          • <strong>Budget:</strong> ₱1,500-3,000/day for accommodation, food, and activities
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Connectivity</h4>
                        <p className="text-sm">
                          • <strong>Mobile signal:</strong> Available in Poblacion and major barangays
                        </p>
                        <p className="text-sm">
                          • <strong>Limited/no signal</strong> in remote mountain areas and caves
                        </p>
                        <p className="text-sm">
                          • <strong>WiFi:</strong> Available in some hotels and restaurants
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Safety & Security</h4>
                        <p className="text-sm">
                          • Quezon is generally <strong>safe for tourists</strong>
                        </p>
                        <p className="text-sm">
                          • <strong>Hire local guides</strong> for mountain treks and cave exploration
                        </p>
                        <p className="text-sm">
                          • Register at barangay halls when visiting remote areas
                        </p>
                        <p className="text-sm">
                          • Contact Municipal Hall for emergencies
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Local Transportation</h4>
                        <p className="text-sm">
                          • <strong>Habal-habal (motorcycle)</strong> - Main transport to attractions (₱50-200)
                        </p>
                        <p className="text-sm">
                          • <strong>Tricycles</strong> - For short distances within town (₱10-50)
                        </p>
                        <p className="text-sm">
                          • <strong>Rental vehicles</strong> - Available for groups, arrange in advance
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Cultural Respect</h4>
                        <p className="text-sm">
                          • Quezon has <strong>indigenous Manobo communities</strong> - respect their customs
                        </p>
                        <p className="text-sm">
                          • <strong>Ask permission</strong> before taking photos of people or sacred sites
                        </p>
                        <p className="text-sm">
                          • Dress <strong>modestly</strong>, especially in rural areas
                        </p>
                        <p className="text-sm">
                          • <strong>Leave no trace</strong> - Take your trash with you
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg space-y-2">
                        <h4 className="font-semibold text-primary">Language</h4>
                        <p className="text-sm">
                          • <strong>Main languages:</strong> Cebuano, Filipino, English
                        </p>
                        <p className="text-sm">
                          • Most locals understand basic English
                        </p>
                        <p className="text-sm">
                          • Learn basic Cebuano phrases for better interaction
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Eco-Tourism Commitment</h4>
                      <p className="text-sm">
                        Quezon, Bukidnon is committed to sustainable tourism. Please help preserve our natural attractions:
                      </p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Dispose of waste properly - carry trash bags</li>
                        <li>• Stay on marked trails to protect flora</li>
                        <li>• Don't remove plants, rocks, or wildlife</li>
                        <li>• Use reef-safe sunscreen near water sources</li>
                        <li>• Support local businesses and communities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Municipal Hall:</strong> (Contact info)</p>
                        <p className="text-sm"><strong>PNP Quezon:</strong> (Contact info)</p>
                        <p className="text-sm"><strong>BFP Quezon:</strong> (Contact info)</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Tourism Office:</strong> (Contact info)</p>
                        <p className="text-sm"><strong>Health Center:</strong> (Contact info)</p>
                        <p className="text-sm"><strong>MDRRMO:</strong> 0970 621 9407 | <a href="mailto:ldrrmoquezon@gmail.com" className="text-primary hover:underline">ldrrmoquezon@gmail.com</a></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button asChild size="lg">
                    <a href="/tourism">Explore Tourism Destinations</a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TravelGuide;