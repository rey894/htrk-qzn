import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Wheat, Factory, TrendingUp, MapPin, Download, Phone, Mail, ExternalLink, Building2, Truck, Banknote } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";

const Industries = () => {
  const keyIndustries = [
    {
      name: "Sugar Industry",
      description: "Leading sugar producer in Mindanao with modern milling facilities",
      percentage: 45,
      investment: "₱2.5 Billion",
      jobs: "15,000+",
      icon: Wheat,
      color: "bg-municipal-gold"
    },
    {
      name: "Rice Production",
      description: "High-yield rice cultivation with irrigation systems",
      percentage: 25,
      investment: "₱850 Million",
      jobs: "8,500+",
      icon: Wheat,
      color: "bg-green-500"
    },
    {
      name: "Manufacturing",
      description: "Food processing and agricultural equipment manufacturing",
      percentage: 20,
      investment: "₱1.2 Billion",
      jobs: "3,200+",
      icon: Factory,
      color: "bg-municipal-blue"
    },
    {
      name: "Livestock & Poultry",
      description: "Commercial livestock and poultry operations",
      percentage: 10,
      investment: "₱400 Million",
      jobs: "2,100+",
      icon: Building2,
      color: "bg-municipal-red"
    }
  ];

  const investmentOpportunities = [
    {
      title: "Sugar Processing Modernization",
      sector: "Agriculture",
      investment: "₱500M - ₱1B",
      roi: "15-20%",
      timeline: "3-5 years",
      incentives: "Tax holidays, infrastructure support"
    },
    {
      title: "Logistics and Distribution Hub",
      sector: "Transportation",
      investment: "₱200M - ₱500M",
      roi: "12-18%",
      timeline: "2-3 years",
      incentives: "Land lease agreements, utility discounts"
    },
    {
      title: "Agri-Tech Innovation Center",
      sector: "Technology",
      investment: "₱100M - ₱300M",
      roi: "20-25%",
      timeline: "2-4 years",
      incentives: "R&D grants, training subsidies"
    },
    {
      title: "Renewable Energy Projects",
      sector: "Energy",
      investment: "₱1B - ₱3B",
      roi: "18-22%",
      timeline: "4-6 years",
      incentives: "Feed-in tariffs, accelerated depreciation"
    }
  ];

  const economicData = [
    { label: "Income Class", value: "1st Class", trend: "" },
    { label: "GDP Contribution to Bukidnon", value: "18.5%", trend: "+2.3%" },
    { label: "Annual Investment Inflow", value: "₱3.2B", trend: "+12.5%" },
    { label: "Employment Rate", value: "94.2%", trend: "+1.8%" },
    { label: "Export Value", value: "₱8.7B", trend: "+8.9%" }
  ];

  return (
    <>
      <SEOHelmet
        title="Industries & Investment"
        description="Discover investment opportunities in Quezon, Bukidnon - Gateway to Adventure & Agricultural Excellence. Explore our thriving agriculture, tourism, and emerging industries."
        keywords="investment opportunities, sugar industry, agriculture, manufacturing, Quezon Bukidnon, business investment, economic development"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/industries`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-municipal-blue to-municipal-navy text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-municipal-gold text-municipal-navy">
                Investment Destination
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                Industries & Investment
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-municipal-gold text-municipal-navy hover:bg-municipal-gold/90">
                  <Download className="h-5 w-5 mr-2" />
                  Investment Guide
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-municipal-navy">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Investment Office
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Data */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Economic Data</h2>
              <p className="text-muted-foreground mt-2">Key economic metrics for Quezon, Bukidnon</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {economicData.map((indicator, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                      {indicator.value}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {indicator.label}
                    </div>
                    {indicator.trend && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {indicator.trend}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Industries */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Industries</h2>
                <p className="text-xl text-muted-foreground">
                  Diverse economic sectors driving sustainable growth and development
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {keyIndustries.map((industry, index) => {
                  const IconComponent = industry.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${industry.color}`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{industry.name}</CardTitle>
                              <CardDescription>{industry.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-lg font-bold">
                            {industry.percentage}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Progress value={industry.percentage} className="h-2" />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Investment</div>
                              <div className="font-semibold text-primary">{industry.investment}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Employment</div>
                              <div className="font-semibold text-primary">{industry.jobs}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Opportunities</h2>
                <p className="text-xl text-muted-foreground">
                  High-potential projects ready for partnership and investment
                </p>
              </div>

              <div className="grid gap-6">
                {investmentOpportunities.map((opportunity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                            <Badge variant="outline">{opportunity.sector}</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investment Range: </span>
                              <span className="font-medium text-primary">{opportunity.investment}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expected ROI: </span>
                              <span className="font-medium text-green-600">{opportunity.roi}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline: </span>
                              <span className="font-medium">{opportunity.timeline}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Incentives Available</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {opportunity.incentives}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                          <Button size="sm">
                            Express Interest
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investment Advantages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest in Quezon?</h2>
                <p className="text-xl text-muted-foreground">
                  Strategic advantages that make us the preferred investment destination
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Strategic Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Prime location in Northern Bukidnon with excellent connectivity to major cities 
                      and transportation hubs. Gateway to Mindanao markets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Business-Friendly Environment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Streamlined business registration, competitive incentives, and dedicated 
                      investment facilitation services. One-stop-shop for permits.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Banknote className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Competitive Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Lower operational costs, affordable skilled workforce, and competitive 
                      utility rates. Maximum return on investment potential.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Investment Office */}
        <section className="py-16 bg-gradient-to-r from-municipal-blue to-municipal-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="text-center text-white">
                  <CardTitle className="text-2xl md:text-3xl">Ready to Invest?</CardTitle>
                  <CardDescription className="text-municipal-white/90 text-lg">
                    Our Investment Promotion Office is here to assist you every step of the way
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8 text-white">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Investment Hotline</div>
                            <div className="text-municipal-white/80">(088) 123-4567 ext. 200</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-municipal-white/80">invest@quezonbukidnon.gov.ph</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5" />
                          <div>
                            <div className="font-medium">Address</div>
                            <div className="text-municipal-white/80">Municipal Building, Quezon, Bukidnon</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20">
                          <Download className="h-4 w-4 mr-2" />
                          Download Investment Guide
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Business Registration Portal
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20">
                          <Truck className="h-4 w-4 mr-2" />
                          Logistics & Transportation Info
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="text-center">
                    <Button size="lg" className="bg-municipal-gold text-municipal-navy hover:bg-municipal-gold/90">
                      <Mail className="h-5 w-5 mr-2" />
                      Schedule Investment Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Industries;