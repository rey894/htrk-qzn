import { Header } from "@/components/Header";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import { HeroPlaceholder } from "@/components/HeroPlaceholder";
import { Footer } from "@/components/Footer";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { socioeconomicProfile } from "@/content/socioeconomic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Factory,
  Truck,
  Sprout,
  Users,
  MapPin,
  DollarSign,
  Building2,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import { AgriculturalPowerhouseInfographic } from "@/components/AgriculturalPowerhouseInfographic";

const investmentOpportunities = [
  {
    title: "Agricultural Processing",
    description: "Value-adding facilities for rice, corn, and other agricultural products",
    icon: Factory,
    potential: "High",
    investment: "₱50M - ₱200M",
    advantages: [
      "Abundant raw materials",
      "Strategic location",
      "Government support",
      "Skilled workforce"
    ]
  },
  {
    title: "Agri-Tourism",
    description: "Farm tourism and eco-tourism development projects",
    icon: Globe,
    potential: "High",
    investment: "₱20M - ₱100M",
    advantages: [
      "Natural attractions",
      "Rich cultural heritage",
      "Growing tourism market",
      "Infrastructure support"
    ]
  },
  {
    title: "Logistics & Transportation",
    description: "Warehousing and distribution facilities",
    icon: Truck,
    potential: "Medium",
    investment: "₱30M - ₱150M",
    advantages: [
      "Strategic highway access",
      "Growing trade volume",
      "Regional hub potential",
      "Government incentives"
    ]
  },
  {
    title: "Renewable Energy",
    description: "Solar and hydroelectric power projects",
    icon: Zap,
    potential: "High",
    investment: "₱100M - ₱500M",
    advantages: [
      "Abundant natural resources",
      "Energy demand growth",
      "Government incentives",
      "Environmental benefits"
    ]
  }
];

const businessIncentives = [
  {
    title: "Tax Incentives",
    description: "Reduced local taxes for qualifying investments",
    icon: DollarSign
  },
  {
    title: "Streamlined Permits",
    description: "One-stop-shop for business registration",
    icon: Building2
  },
  {
    title: "Infrastructure Support",
    description: "Access to roads, utilities, and facilities",
    icon: MapPin
  },
  {
    title: "Skilled Workforce",
    description: "Access to educated and trained personnel",
    icon: Users
  }
];

const keyData = [
  {
    label: "Strategic Location",
    value: "Highway Access",
    description: "Direct connection to major highways",
    icon: MapPin
  },
  {
    label: "Population",
    value: "114,521",
    description: "Potential workforce and market",
    icon: Users
  },
  {
    label: "Agricultural Output",
    value: "₱5.2B+",
    description: "Annual agricultural production",
    icon: Sprout
  },
  {
    label: "Economic Growth",
    value: "8.5%",
    description: "Average annual GDP growth",
    icon: TrendingUp
  }
];

export default function Investment() {
  return (
    <>
      <SEOHelmet
        title="Invest in Quezon, Bukidnon - Business Opportunities & Incentives"
        description="Discover investment opportunities in Quezon, Bukidnon - a 1st Class Municipality with ₱625M annual revenue. Agriculture, tourism, renewable energy, and logistics."
        keywords="Quezon Bukidnon investment, business opportunities Bukidnon, invest in Quezon, agribusiness Bukidnon"
        ogImage="/assets/quezon-agricultural-pineapple-fields.jpg"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: window.location.origin },
          { name: "Investment", url: window.location.href }
        ]}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section - Lightweight placeholder (no images) */}
          <section className="relative h-[75vh] sm:h-[80vh] bg-gradient-to-br from-primary/10 to-accent/8 overflow-hidden">
            <div className="absolute inset-0">
              <HeroPlaceholder />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="container mx-auto px-6 relative h-full flex items-center z-10">
              <div className="text-center mb-16 max-w-4xl mx-auto text-white">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)]">
                  Invest in Quezon
                </h1>
              </div>
            </div>
            <ScrollDownIndicator />
          </section>

          {/* Demographic & Economic Visuals */}
          <AgriculturalPowerhouseInfographic />

          {/* Business Confidence Video */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-card">
                <CardContent className="p-8">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/JMbQtgbdICI"
                      title="Invest in Quezon"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold">Invest in Quezon</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Investment Data */}
          <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Why Choose Quezon?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {keyData.map((data, index) => {
              const IconComponent = data.icon;
              return (
                <Card key={index} className="text-center shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="pt-6">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-2xl font-bold text-primary mb-2">{data.value}</div>
                    <div className="font-semibold text-foreground mb-1">{data.label}</div>
                    <div className="text-sm text-muted-foreground">{data.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Business Incentives */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessIncentives.map((incentive, index) => {
              const IconComponent = incentive.icon;
              return (
                <Card key={index} className="text-center shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-gradient-primary w-fit mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{incentive.title}</CardTitle>
                    <CardDescription>{incentive.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
          </section>

          {/* Investment Opportunities */}
          <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Investment Opportunities</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {investmentOpportunities.map((opportunity, index) => {
            const IconComponent = opportunity.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                      <CardDescription>{opportunity.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Badge variant="outline" className="text-success border-success">
                      {opportunity.potential} Potential
                    </Badge>
                    <Badge variant="secondary">
                      {opportunity.investment}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <h4 className="font-semibold text-foreground mb-3">Key Advantages:</h4>
                  <ul className="space-y-2 mb-6">
                    {opportunity.advantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = '/investment'}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
          </section>

          {/* Investment Inquiry Form */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">Investment Inquiry</h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="shadow-card">
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="investor-name" className="text-sm font-medium">Full Name *</label>
                          <input
                            id="investor-name"
                            type="text"
                            required
                            placeholder="Your full name"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="investor-email" className="text-sm font-medium">Email Address *</label>
                          <input
                            id="investor-email"
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="investor-phone" className="text-sm font-medium">Phone Number</label>
                          <input
                            id="investor-phone"
                            type="tel"
                            placeholder="+63 XXX XXX XXXX"
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="business-size" className="text-sm font-medium">Business Size *</label>
                          <select
                            id="business-size"
                            required
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select business size</option>
                            <option value="micro">Micro (Assets up to ₱3M)</option>
                            <option value="small">Small (Assets ₱3M - ₱15M)</option>
                            <option value="medium">Medium (Assets ₱15M - ₱100M)</option>
                            <option value="large">Large (Assets above ₱100M)</option>
                            <option value="multinational">Multinational Corporation</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="investment-sector" className="text-sm font-medium">Investment Sector Interest *</label>
                        <select
                          id="investment-sector"
                          required
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select sector</option>
                          <option value="agricultural-processing">Agricultural Processing</option>
                          <option value="agri-tourism">Agri-Tourism</option>
                          <option value="logistics-transportation">Logistics & Transportation</option>
                          <option value="renewable-energy">Renewable Energy</option>
                          <option value="real-estate">Real Estate Development</option>
                          <option value="retail">Retail & Commercial</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="investment-amount" className="text-sm font-medium">Estimated Investment Amount</label>
                        <select
                          id="investment-amount"
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select range</option>
                          <option value="under-10m">Under ₱10M</option>
                          <option value="10m-50m">₱10M - ₱50M</option>
                          <option value="50m-100m">₱50M - ₱100M</option>
                          <option value="100m-500m">₱100M - ₱500M</option>
                          <option value="above-500m">Above ₱500M</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="inquiry-message" className="text-sm font-medium">Message / Inquiry *</label>
                        <textarea
                          id="inquiry-message"
                          required
                          rows={5}
                          placeholder="Please provide details about your investment interest, questions, or specific requirements..."
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        ></textarea>
                      </div>
                      <Button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Submit Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}