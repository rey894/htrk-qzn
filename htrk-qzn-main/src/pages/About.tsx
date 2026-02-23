import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Building, Landmark, Award, ArrowRight, Download, TreePine, Sprout, Factory, TrendingUp, AlertTriangle, Sparkles, Mountain, Wheat, Heart, Route } from "lucide-react";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { usePage } from "@/hooks/usePage";
import { HeroPlaceholder } from "@/components/HeroPlaceholder";
import { AgriculturalPowerhouseInfographic } from "@/components/AgriculturalPowerhouseInfographic";

const About = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("town-profile");
  const { page, loading: pageLoading } = usePage('about');

  useEffect(() => {
    // Handle hash navigation for tabs
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (["town-profile", "history", "municipal-seal"].includes(hash)) {
        setActiveTab(hash);
      }
    }
  }, [location.hash]);

  // Use database content if available, otherwise fall back to static content
  const heroTitle = page?.hero_title || "About Quezon, Bukidnon";
  const pageTitle = page?.title || "About Quezon, Bukidnon - History, Profile & Municipal Information";
  const metaDescription = page?.meta_description || "Learn about Quezon, Bukidnon. Discover our rich history, Kiokong White Rock Wall, diverse agriculture, and development agenda.";
  const metaKeywords = page?.meta_keywords || "Quezon Bukidnon, municipality history, Kiokong White Rock Wall, tourism attractions, agricultural excellence, development agenda";

  return (
    <>
      <SEOHelmet
        title={pageTitle}
        description={metaDescription}
        keywords={metaKeywords}
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/about`}
        ogImage="/assets/quezon-at-a-glance.png"
      />

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section - Lightweight placeholder (no images) */}
        <section className="relative h-[75vh] sm:h-[80vh] bg-gradient-to-br from-primary/10 to-accent/8 overflow-hidden">
          <div className="absolute inset-0">
            <HeroPlaceholder />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="container mx-auto px-4 relative h-full flex items-center z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)]">
                {heroTitle}
              </h1>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>

        {/* Navigation Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="town-profile" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Town Profile
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="municipal-seal" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Municipal Seal
                </TabsTrigger>
              </TabsList>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Landmark className="h-6 w-6" />
                      History of Quezon Bukidnon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative space-y-0">
                      {/* Timeline line */}
                      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-primary/20 hidden md:block" aria-hidden />

                      {[
                        { icon: TreePine, era: "Early 1900s", title: "Indigenous Life and Early Settlers", color: "text-[hsl(95_38%_35%)]", bg: "bg-primary/5", content: <><p>Prior to the arrival of settlers, Quezon was a vast landscape of forests and grasslands inhabited by the nomadic Manobo tribes. They lived along riverbanks and forest edges, sustaining themselves through hunting, gathering, and bartering forest products such as abaca, beeswax, and dried meat for salt, cloth, and other basic necessities. By the early 1900s, settlers began to arrive, taking advantage of the wide grasslands to raise cattle.</p></> },
                        { icon: Sprout, era: "Post-World War II", title: "Migration and Agricultural Growth", color: "text-[hsl(95_38%_35%)]", bg: "bg-primary/5", content: <><p>Following World War II, migrants from Misamis Oriental, Bohol, Cebu, and Ilocos settled in Quezon. Coexisting peacefully with the indigenous Manobos, they engaged in farming—cultivating rice, corn, coffee, vegetables, and coconut. Due to the absence of roads, goods were transported using rafts along the Pulangi River.</p></> },
                        { icon: Factory, era: "Mid-20th Century", title: "Economic Development", color: "text-[hsl(35_45%_28%)]", bg: "bg-amber-500/5", content: <><p>As Barangay Kiokong under the municipality of Maramag, Quezon experienced its first major economic development in the 1950s when Don Jose Fortich established the largest rice and corn mill in the area. The construction of a bailey bridge over the Pulangi River in 1957 improved access and drew more settlers. Logging companies such as Bida Timber Corporation and NAREDICO flourished, clearing land for agriculture. NAREDICO also operated the region's largest sawmill before the decline of the logging industry, which coincided with the construction of the Bukidnon–Davao Road.</p></> },
                        { icon: Landmark, era: "1965–1966", title: "Establishment as a Municipality", color: "text-primary", bg: "bg-primary/10", content: <><p>The area was officially organized into a municipality through Executive Order No. 199, signed by President Diosdado Macapagal on November 18, 1965, establishing the Municipality of Pulangi. This new municipality combined several barrios from neighboring towns:</p><ul className="list-disc pl-6 space-y-1 my-3"><li>From Dangcagan: Nanapan, Sta. Cruz, Dilapa, Kiburiao, and Mibantang</li><li>From Maramag: Salawagan, Manoto, San Jose, Kiokong, Lagaan, Paitan, Lumintao, and Kulaman</li><li>From Valencia: Dagat-Kidavao</li></ul><p>Barrio Salawagan was initially designated as the seat of government.</p><p>On June 18, 1966, the municipality was officially renamed Quezon through Republic Act No. 4802, which also clarified its territorial jurisdiction:</p><ul className="list-disc pl-6 space-y-1 my-3"><li>The barrios and sitios of Nanapan (Pontian), Sta. Cruz, Dilapa, Kiburiao, Mibantang, and Cebole, previously part of Maramag and later annexed to Dangcagan</li><li>The barrios of Salawagan, Manoto, San Jose, Kiokong, Paitan, Lumintao, and Kulaman from Maramag</li></ul><p>Barrio Kiokong (now Poblacion) was designated as the new seat of government.</p><p>This reorganization aimed to improve local governance and bring public services closer to the people. Since then, Quezon has grown into a progressive municipality composed of 31 barangays.</p></> },
                        { icon: TrendingUp, era: "1970s", title: "Sugar Industry and Continued Migration", color: "text-[hsl(95_38%_35%)]", bg: "bg-primary/5", content: <><p>The opening of the Bukidnon-Davao Road facilitated further migration, particularly from Davao and Lanao. Many Christian settlers from Lanao, fleeing religious conflicts, found refuge in Quezon.</p><p>In 1974, the local economy was boosted by the establishment of the Bukidnon Sugar Milling Company (BUSCO), now simply known as Busco. The arrival of Traders Royal Bank, the municipality's first bank, marked another milestone in economic development.</p></> },
                        { icon: AlertTriangle, era: "1980s", title: "Period of Unrest", color: "text-amber-700", bg: "bg-amber-500/5", content: <><p>The relative peace and prosperity of the 1960s and 1970s were disrupted in the 1980s. Political unrest and violence, particularly after the ratification of the 1987 Constitution, posed challenges to local stability and progress, impacting security and slowing development.</p></> },
                        { icon: Sparkles, era: "2000s–Present", title: "Modernization and Sustainable Growth", color: "text-primary", bg: "bg-primary/10", content: <><p>Sugar remained the main economic driver until the early 2000s, when the pineapple industry began to flourish through companies such as Davao Agri-Ventures Corporation (DAVCO) and Del Monte Philippines. Improvements in infrastructure, modern agricultural practices, and technological advancements gradually transformed the municipality.</p><p>Throughout the 2000s and early 2010s, the lingering presence of communist insurgents and rampant criminal activity stifled the economic growth of the town. The threat of violence, extortion, and crime led to slow investments, ultimately hampering progress.</p><p>The administration of Mayor Pablo "Poling" Lorenzo III, aided by the national government's whole-of-nation approach to solving the insurgency through the End Local Communist Armed Conflict (ELCAC) Program, secured the peace and order situation in Quezon. Members of the insurgency surrendered, crime dwindled, and investor confidence steadily flourished, paving the way for a prosperous community.</p><p>The local government has since focused on Kalinaw (peace and order), Kahigayunan (opportunities), Kahimsog (health), and Kalipay (happiness), employing a practical, astute, and strategic method of governance that delivers results.</p><p>Today, the Municipality of Quezon stands as a thriving and resilient community—rich in history, strengthened by diversity, and committed to building a peaceful and progressive future.</p></> },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="relative flex gap-4 md:gap-6 pb-8 last:pb-0">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${item.bg} border-2 border-primary/20 flex items-center justify-center ${item.color} z-10`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className={`flex-1 min-w-0 rounded-xl border border-border/50 p-5 ${item.bg}`}>
                              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                                <Badge variant="outline" className="text-xs font-semibold">{item.era}</Badge>
                                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                              </div>
                              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                                {item.content}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Town Profile Tab */}
              <TabsContent value="town-profile" className="space-y-8">
                {/* Demographic & Economic Responsive Infographic */}
                <AgriculturalPowerhouseInfographic embedded />

                {/* Geographic Overview - Location, Climate, Boundaries in vertical order + Map */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-6 w-6" />
                      Geographic Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Location</h4>
                          <p className="text-sm text-muted-foreground">
                            Southern Bukidnon. 7°35′-7°50′N, 125°00′-125°20′E. 145km from Davao City, 75km from Malaybalay City
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                        <Building className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Climate</h4>
                          <p className="text-sm text-muted-foreground">
                            Type IV climate - no distinct dry and wet seasons, ideal for agriculture
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                        <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Boundaries</h4>
                          <p className="text-sm text-muted-foreground">
                            North: Valencia City | East: San Fernando | South: Kitaotao | West: Maramag
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h4 className="font-semibold mb-3">Interactive Map</h4>
                      <InteractiveMap embedded={true} interactive={false} />
                    </div>
                  </CardContent>
                </Card>

                {/* Economic Data with Income Class - Visual Infographics */}
                <Card id="economic-data" className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-6 w-6" />
                      Economic Data
                    </CardTitle>
                    <CardDescription>Income Class: 1st Class Municipality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">1st Class</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Income Class</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">₱600M+</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Annual Revenue</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">Agriculture</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Primary Industry</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">45%</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Sugar (Bukidnon)</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center col-span-2 sm:col-span-1">
                        <div className="text-2xl font-bold text-primary">1,886</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Businesses (2025)</div>
                      </div>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center col-span-2 sm:col-span-1">
                        <div className="text-2xl font-bold text-primary">Sugar, Rice, Corn</div>
                        <div className="text-xs font-medium text-muted-foreground mt-1">Major Crops</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Visual infographics - Demographics & Economic */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Population Pyramid</CardTitle>
                      <CardDescription>Age distribution (illustrative, per PSA census structure)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{}} className="h-[220px] w-full overflow-x-auto min-w-0">
                        <BarChart data={[
                          { age: "0-14", male: -12, female: 11 },
                          { age: "15-24", male: -9, female: 9 },
                          { age: "25-34", male: -10, female: 10 },
                          { age: "35-44", male: -8, female: 8 },
                          { age: "45-54", male: -6, female: 6 },
                          { age: "55-64", male: -4, female: 4 },
                          { age: "65+", male: -3, female: 3 }
                        ]} layout="vertical" margin={{ left: 32, right: 32 }} barCategoryGap={4}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[-15, 15]} tickFormatter={(v) => Math.abs(v).toString()} />
                          <YAxis type="category" dataKey="age" width={48} tick={{ fontSize: 11 }} />
                          <ChartTooltip content={<ChartTooltipContent />} formatter={(v: number) => [Math.abs(v), ""]} />
                          <Bar dataKey="male" fill="hsl(95 38% 42%)" radius={[4, 0, 0, 4]} name="Male" />
                          <Bar dataKey="female" fill="hsl(95 38% 55%)" radius={[0, 4, 4, 0]} name="Female" />
                        </BarChart>
                      </ChartContainer>
                      <p className="text-xs text-muted-foreground mt-2 text-center">Total: 114,521 (2024 PSA)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Major Crops Distribution</CardTitle>
                      <CardDescription>Illustrative share of primary agricultural output</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{ sugar: { label: "Sugar", color: "hsl(95 38% 42%)" }, rice: { label: "Rice", color: "hsl(45 80% 50%)" }, corn: { label: "Corn", color: "hsl(35 90% 55%)" } }} className="h-[200px] w-full">
                        <PieChart>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Pie data={[{ name: "sugar", value: 50, fill: "hsl(95 38% 42%)" }, { name: "rice", value: 30, fill: "hsl(45 80% 50%)" }, { name: "corn", value: 20, fill: "hsl(35 90% 55%)" }]} dataKey="value" nameKey="name" innerRadius={50} strokeWidth={2} />
                        </PieChart>
                      </ChartContainer>
                      <p className="text-xs text-muted-foreground mt-2 text-center">Sugar leads provincial production; municipal breakdown to be updated</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Municipal Metrics</CardTitle>
                      <CardDescription>At-a-glance overview (hover for details)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{ population: { label: "Population", color: "hsl(95 38% 42%)" }, revenue: { label: "Annual Revenue", color: "hsl(95 38% 52%)" }, barangays: { label: "Barangays", color: "hsl(95 38% 62%)" } }} className="h-[200px] w-full">
                        <BarChart data={[{ name: "population", label: "Population", value: 100, display: "114,521" }, { name: "revenue", label: "Annual Revenue", value: 100, display: "₱600M+" }, { name: "barangays", label: "Barangays", value: 100, display: "31" }]} layout="vertical" margin={{ left: 12, right: 12 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="label" width={100} tick={{ fontSize: 11 }} />
                          <ChartTooltip content={<ChartTooltipContent />} formatter={(_, __, item) => [item.payload.display, item.payload.label]} />
                          <Bar dataKey="value" fill="hsl(95 38% 42%)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ChartContainer>
                      <p className="text-xs text-muted-foreground mt-2 text-center">Population 114,521 • Revenue ₱600M+ • 31 barangays</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Municipal Seal & Values Tab */}
              <TabsContent value="municipal-seal" className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-[hsl(35_45%_28%)]" />
                        Municipal Seal
                      </CardTitle>
                      <CardDescription>
                        Symbol of our identity and aspirations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6 py-8">
                        <img
                          src="/images/47f5d21c-299d-4311-9f15-583dfc7476ee.png"
                          alt="Official Municipal Seal of Quezon, Bukidnon"
                          className="h-48 w-48 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-bold text-[hsl(35_45%_25%)]">Official Municipal Seal</h3>
                        <p className="text-sm font-semibold text-[hsl(35_25%_35%)] mb-2">
                          Based on Sangguniang Bayan Resolution No. 62, Series of 1989
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-[hsl(35_45%_25%)] mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Official Description
                        </h4>
                        <div className="space-y-4">
                          {[
                            { icon: Mountain, title: "The green mountains, valleys and plateaus", text: "represent the terrain of the municipality. The spattering of red, such as the truck and the frame of the head of a deer, is a symbol of the courage of the people in meeting the challenges of everyday life common in a frontier municipality such as Quezon." },
                            { icon: Wheat, title: "The major products", text: "such as rice, corn, sugarcane, cattle and logging industry could also be seen. The flock of birds at the peak of the mountain represents the people constantly migrating to Quezon to share the abundant wealth that are hidden in its womb." },
                            { icon: Heart, title: "The framed deer's head", text: "symbolizes the presence of the Bukidnon's cultural community – and the round frame symbolizes the desire of the people to integrate with the tribe." },
                            { icon: Route, title: "The narrow winding road", text: "is unending as the wealth and challenges of this Municipality is unending. It winds around the mountains and finally, vision fails – but the road continues through eternity. This symbolizes the unending potentials of Quezon waiting to be transformed into economic reality." },
                          ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <div key={idx} className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                                  <Icon className="h-5 w-5" />
                                </div>
                                <p className="text-base text-[hsl(35_25%_30%)] leading-relaxed font-medium">
                                  <strong className="font-bold text-[hsl(35_45%_22%)]">{item.title}</strong> {item.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </TabsContent>

              {/* Development Agenda Tab */}
              <TabsContent value="agenda" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-6 w-6" />
                      Municipal Development Agenda 2022-2025
                    </CardTitle>
                    <CardDescription>
                      Strategic roadmap for sustainable growth and development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Development Theme</h3>
                        <p className="text-muted-foreground mb-4">
                          "Quezon, Bukidnon: Echoes of Resilience | Transcending Boundaries"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Our development agenda focuses on building a resilient, sustainable,
                          and progressive municipality that serves as a model for rural development in Mindanao.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          className="bg-municipal-blue hover:bg-municipal-navy"
                          onClick={() => window.open('/governance/development-agenda', '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View Our Goals
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="border-l-4 border-l-municipal-blue">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Kalinaw</CardTitle>
                          <CardDescription>Peace & Order</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Enhanced security systems</li>
                            <li>• Community policing</li>
                            <li>• Drug prevention programs</li>
                            <li>• Disaster preparedness</li>
                          </ul>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 p-0 h-auto"
                            onClick={() => window.location.href = '/governance/development-agenda'}
                          >
                            Learn more <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-municipal-gold">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Kahigayunan</CardTitle>
                          <CardDescription>Economic Growth</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Agricultural modernization</li>
                            <li>• Investment promotion</li>
                            <li>• MSME development</li>
                            <li>• Infrastructure projects</li>
                          </ul>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 p-0 h-auto"
                            onClick={() => window.location.href = '/governance/development-agenda'}
                          >
                            Learn more <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-municipal-red">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Kahimsog</CardTitle>
                          <CardDescription>Health & Wellness</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Healthcare facility upgrades</li>
                            <li>• Public health programs</li>
                            <li>• Nutrition initiatives</li>
                            <li>• Mental health support</li>
                          </ul>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 p-0 h-auto"
                            onClick={() => window.location.href = '/governance/development-agenda'}
                          >
                            Learn more <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-primary">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Kalipay</CardTitle>
                          <CardDescription>Youth & Culture</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Youth development programs</li>
                            <li>• Cultural preservation</li>
                            <li>• Sports facilities</li>
                            <li>• Arts & education</li>
                          </ul>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 p-0 h-auto"
                            onClick={() => window.location.href = '/governance/development-agenda'}
                          >
                            Learn more <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;