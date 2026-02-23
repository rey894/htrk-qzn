import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GovernanceTabs } from "@/components/GovernanceTabs";
import { GovernanceNavLinks } from "@/components/GovernanceNavLinks";
import { GovernanceHero } from "@/components/GovernanceHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Briefcase, FileText, Building2, Landmark, DollarSign, Calculator, BookOpen, Wallet, Wrench, Heart, Sprout, Leaf, Stethoscope, Shield, Users, Target } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";
import { offices } from "@/content/offices";

const Offices = () => {
  const { contactInfo } = useContactInfo();

  // Function to get appropriate icon for each office
  const getOfficeIcon = (officeName: string) => {
    const name = officeName.toLowerCase();
    if (name.includes("municipal administrator")) return Landmark;
    if (name.includes("sangguniang")) return Building2;
    if (name.includes("treasurer")) return DollarSign;
    if (name.includes("assessor")) return Calculator;
    if (name.includes("accountant") || name.includes("accounting")) return Wallet;
    if (name.includes("budget")) return BookOpen;
    if (name.includes("planning") || name.includes("development")) return Target;
    if (name.includes("civil registrar") || name.includes("civil registry")) return FileText;
    if (name.includes("public safety") || name.includes("safety")) return Shield;
    if (name.includes("human resource") || name.includes("hr")) return Users;
    if (name.includes("health")) return Stethoscope;
    if (name.includes("social welfare") || name.includes("welfare")) return Heart;
    if (name.includes("engineer") || name.includes("engineering")) return Wrench;
    if (name.includes("agriculture") || name.includes("agriculturist")) return Sprout;
    if (name.includes("enterprise") || name.includes("business")) return Briefcase;
    if (name.includes("environment") || name.includes("natural resources")) return Leaf;
    return Building2; // Default icon
  };

  return (
    <>
      <SEOHelmet
        title="Municipal Offices"
        description="Directory of municipal offices and their heads in Quezon, Bukidnon. Find contact information and office locations for government services."
        keywords="municipal offices Quezon Bukidnon, government offices, department directory, local administration"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/governance/offices`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <GovernanceHero />
        <GovernanceTabs />

        {/* Offices Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Municipal Office Directory</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional administrators and technical experts ensuring efficient delivery of municipal services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices.map((office, index) => {
                const OfficeIcon = getOfficeIcon(office.office);
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="mb-2.5 p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-fit">
                        <OfficeIcon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold leading-tight mb-1 uppercase tracking-wide">
                        {office.office}
                      </CardTitle>
                      <p className="text-sm font-semibold text-primary mb-3">({office.acronym})</p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{office.headLabel}:</span> {office.headName}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Location:</span> {office.location}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary text-center">
                    <Phone className="h-6 w-6" />
                    Contact Municipal Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">General Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span>Municipal Hall: <a href={`tel:${formatPhoneForTel(contactInfo.phone)}`} className="text-primary hover:underline">{contactInfo.phone}</a></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span><a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">{contactInfo.email}</a></span>
                        </div>
                        <p className="text-muted-foreground">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Office Hours</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                        <p><strong>Lunch Break:</strong> 12:00 PM - 1:00 PM</p>
                        <p><strong>Saturday:</strong> 8:00 AM - 12:00 PM (Selected Services)</p>
                        <p className="text-muted-foreground">
                          Some offices may have extended hours for citizen services
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <GovernanceNavLinks />
        <Footer />
      </div>
    </>
  );
};

export default Offices;
