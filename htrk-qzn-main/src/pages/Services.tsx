import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import { HeroPlaceholder } from "@/components/HeroPlaceholder";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Building2,
  FileText,
  Briefcase,
  Heart,
  Download,
  Clock,
  MapPin,
  Phone,
  Users,
  CheckCircle
} from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";

const services = [
  {
    id: "business",
    title: "Business Permit & Licensing",
    description: "Complete business registration and permit services",
    icon: Briefcase,
    color: "bg-primary",
    requirements: [
      "DTI/SEC/CDA Registration",
      "Barangay Clearance",
      "Location Clearance",
      "Fire Safety Inspection Certificate",
      "Environmental Compliance Certificate"
    ],
    processingTime: "15-20 working days",
    fee: "Varies by business type"
  },
  {
    id: "civil",
    title: "Civil Registry Services",
    description: "Birth, death, marriage certificates and related services",
    icon: FileText,
    color: "bg-accent",
    requirements: [
      "Valid ID of requestor",
      "Proof of relationship (if not direct)",
      "Payment of required fees",
      "Properly filled application form"
    ],
    processingTime: "1-3 working days",
    fee: "₱140 per copy"
  },
  {
    id: "building",
    title: "Building Permit",
    description: "Construction permits and building clearances",
    icon: Building2,
    color: "bg-success",
    requirements: [
      "Building plans (3 sets)",
      "Lot plan and title",
      "Structural analysis",
      "Electrical/Plumbing plans",
      "Environmental clearance"
    ],
    processingTime: "20-30 working days",
    fee: "Based on project cost"
  },
  {
    id: "social",
    title: "Social Assistance",
    description: "Social services and assistance programs",
    icon: Heart,
    color: "bg-warning",
    requirements: [
      "Barangay indigency certificate",
      "Medical certificate (if applicable)",
      "Valid ID",
      "Proof of residence",
      "Income statement"
    ],
    processingTime: "5-10 working days",
    fee: "Free"
  }
];

const forms = [
  {
    title: "Building Permit Form",
    description: "Application form for building permit",
    category: "Construction",
    fileType: "PDF",
    fileUrl: "/forms/01-BUILDING-PERMIT-FORM.pdf"
  },
  {
    title: "Building Permit Requirements",
    description: "Complete list of requirements for building permit application",
    category: "Construction",
    fileType: "PDF",
    fileUrl: "/forms/01-LIST-OF-REQUIREMENTS-FOR-BUILDING-PERMIT.pdf"
  },
  {
    title: "Certificate of Occupancy",
    description: "Application for certificate of occupancy",
    category: "Construction",
    fileType: "PDF",
    fileUrl: "/forms/01-APPLICATION-FOR-OCCUPANCY.pdf"
  },
  {
    title: "Citizens Charter 2021",
    description: "Municipality of Quezon Bukidnon Updated Citizens Charter 2021",
    category: "General",
    fileType: "PDF",
    fileUrl: "/forms/Municipality-of-Quezon-Bukidnon-Updated-Citizens-Charter-2021.pdf"
  }
];

export default function Services() {
  const { contactInfo } = useContactInfo();

  return (
    <>
      <SEOHelmet
        title="Municipal Services"
        description="Access comprehensive municipal services including business permits, civil registry, building permits, and social assistance programs in Quezon, Bukidnon."
        keywords="business permits, civil registry, building permits, social assistance, Quezon Bukidnon municipal services"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/services`}
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
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)]">
                  Municipal Services
                </h1>
              </div>
            </div>
            <ScrollDownIndicator />
          </section>

          {/* Services Section */}
          <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Available Services</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${service.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {service.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground">Processing Time:</p>
                        <p className="text-muted-foreground">{service.processingTime}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Fee:</p>
                        <p className="text-muted-foreground">{service.fee}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-3">Transaction Process</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span> Submit complete requirements to the concerned office</li>
                        <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span> Pay required fees (if applicable) at the Municipal Treasurer&apos;s Office</li>
                        <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span> Await processing within the stated timeframe</li>
                        <li className="flex gap-2"><span className="font-bold text-primary shrink-0">4.</span> Claim your document or permit upon release</li>
                      </ol>
                      <p className="mt-3 text-sm text-muted-foreground">
                        <strong className="text-foreground">Office:</strong> Municipal Hall, 2/F • <strong className="text-foreground">Hours:</strong> Mon–Fri 8:00 AM – 5:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

          {/* Office Hours and Contact */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <Card className="text-center shadow-card">
                  <CardContent className="pt-6">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday<br />8:00 AM - 5:00 PM</p>
                  </CardContent>
                </Card>

                <Card 
                  className="text-center shadow-card cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Quezon,+Bukidnon,+Philippines', '_blank')}
                >
                  <CardContent className="pt-6">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground">Capitol Site, Quezon<br />Bukidnon 8707</p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card">
                  <CardContent className="pt-6">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                    <p className="text-muted-foreground">
                      <a href={`tel:${formatPhoneForTel(contactInfo.phone)}`} className="hover:text-primary hover:underline">{contactInfo.phone}</a><br />
                      MDRRMO: <a href={`tel:${formatPhoneForTel(contactInfo.mdrrmoNumber)}`} className="hover:text-primary hover:underline">{contactInfo.mdrrmoNumber}</a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

      {/* Forms and Downloads */}
      <section id="forms" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Forms & Downloads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download the required forms and documents to streamline your application process
          </p>
        </div>

        {/* Carousel on mobile, grid on desktop */}
        <div className="block md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {forms.map((form, index) => (
                <CarouselItem key={index} className="pl-2 basis-full">
                  <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <Badge variant="secondary">{form.fileType}</Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {form.title}
                      </CardTitle>
                      <CardDescription>{form.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {form.category}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="group-hover:bg-primary group-hover:text-primary-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (form.fileUrl) {
                              window.open(form.fileUrl, '_blank');
                            }
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hidden sm:flex" />
            <CarouselNext className="right-0 hidden sm:flex" />
          </Carousel>
        </div>

        {/* Grid on desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forms.map((form, index) => (
            <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{form.fileType}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {form.title}
                </CardTitle>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {form.category}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (form.fileUrl) {
                        window.open(form.fileUrl, '_blank');
                      }
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
        </main>

        <Footer />
      </div>
    </>
  );
}