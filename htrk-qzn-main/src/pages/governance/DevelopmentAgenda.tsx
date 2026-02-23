import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GovernanceTabs } from "@/components/GovernanceTabs";
import { GovernanceNavLinks } from "@/components/GovernanceNavLinks";
import { GovernanceHero } from "@/components/GovernanceHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Heart, GraduationCap, Play, ExternalLink } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";

const DevelopmentAgenda = () => {
  const pillars = [
    {
      title: "Kalinaw",
      subtitle: "Peace and Order",
      icon: Shield,
      color: "bg-blue-600",
      description: "Comprehensive peace and order programs ensuring the safety and security of all residents",
      programs: "Our Kalinaw initiative focuses on anti-insurgency and anti-crime efforts through strong support and coordination with the army and police, as well as coordination with firefighters and emergency services. We have established the Municipal Peace and Security Office (MPSO) to centralize security operations, formed the Barangay Justice System for alternative dispute resolution, and implemented community-based security programs across all barangays.",
      videoTitle: "Kalinaw: Peace and Order Initiatives",
      videoDescription: "Watch how we're building a safer Quezon through comprehensive peace and security programs"
    },
    {
      title: "Kahigayunan",
      subtitle: "Economic Growth & Investment",
      icon: TrendingUp,
      color: "bg-green-600",
      description: "Creating opportunities for prosperity through infrastructure development, education, and livelihood programs",
      programs: "Our Kahigayunan agenda drives economic growth through infrastructure development and road improvements (Dalan), educational facility upgrades (Skwelahan), and comprehensive livelihood skills training programs. We are also advancing market development and trade promotion, implementing agricultural modernization initiatives, and developing tourism projects to boost local economic activity.",
      videos: [
        { id: "kLFkDRX5CHE", title: "Dalan - Road Infrastructure" },
        { id: "JMbQtgbdICI", title: "Skwelahan - Education Programs" },
        { id: "2-Iw54cLz3s", title: "Livelihood Skills Training" }
      ],
      channelUrl: "https://www.youtube.com/@municipalityofquezonbukidn9015"
    },
    {
      title: "Kahimsog",
      subtitle: "Health and Wellness",
      icon: Heart,
      color: "bg-red-600",
      description: "Promoting community health through comprehensive healthcare services and nutrition programs",
      programs: "Through our Kahimsog programs, we are implementing the Quezon Health Care Initiative (QHCI) along with comprehensive nutrition programs, including the Pito-Puto nutrition intervention. Our health agenda also encompasses maternal and child health services, disease prevention and control measures, and mental health and wellness programs to ensure holistic healthcare for all residents.",
      videoTitle: "Kahimsog: Health for All",
      videoDescription: "Comprehensive health and nutrition programs ensuring the wellbeing of every resident"
    },
    {
      title: "Kalipay",
      subtitle: "Youth, Sports & Culture",
      icon: GraduationCap,
      color: "bg-yellow-600",
      description: "Nurturing the next generation through civic unity, pride, cultural events, and sports development",
      programs: "Our Kalipay initiative celebrates community culture and youth development through the Sunggod Teh Kamanga Festival, October cultural events and celebrations, and the Araw ng Quezon anniversary celebration. We also host the Summer Sports Festival (SSF), the annual Christmas Lights Display, and various youth leadership development programs to foster civic unity and pride.",
      locations: [
        "Civic Arena - Major events and sports",
        "Hawkers' Hub - Community gatherings",
        "Freedom Park Complex - Cultural activities"
      ],
      videoTitle: "Kalipay: Celebrating Our Culture",
      videoDescription: "Cultural festivals, sports events, and youth programs building community pride and unity"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Our Goals"
        description="Learn about Quezon's development goals: Kalinaw (Peace), Kahigayunan (Opportunities), Kahimsog (Health), and Kalipay (Culture & Youth)."
        keywords="Our Goals, 4K Agenda, Kalinaw, Kahigayunan, Kahimsog, Kalipay, Quezon Bukidnon development"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/governance/development-agenda`}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <GovernanceHero />
        <GovernanceTabs />

        {/* Development Pillars */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={index} className="max-w-6xl mx-auto">
                    <Card className="overflow-hidden">
                      <div className={`${pillar.color} text-white p-5 sm:p-6 lg:p-8`}>
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="p-2 sm:p-3 bg-white/20 rounded-lg">
                            <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                          </div>
                          <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{pillar.title}</h2>
                            <p className="text-lg sm:text-xl opacity-90">{pillar.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-base sm:text-lg opacity-90 max-w-3xl">
                          {pillar.description}
                        </p>
                      </div>

                      <CardContent className="p-5 sm:p-6 lg:p-8">
                        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Key Programs & Initiatives</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {pillar.programs}
                            </p>

                            {pillar.locations && (
                              <div className="mt-4 sm:mt-6">
                                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Key Venues</h4>
                                <div className="space-y-2">
                                  {pillar.locations.map((location, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-muted-foreground">{location}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Program Showcase</h3>
                            {pillar.videos ? (
                              <div className="space-y-4">
                                {pillar.videos.map((video, vIdx) => (
                                  <div key={vIdx} className="aspect-video rounded-lg overflow-hidden">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${video.id}`}
                                      title={video.title}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                ))}
                                {pillar.channelUrl && (
                                  <a href={pillar.channelUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="w-full">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Watch More on YouTube
                                    </Button>
                                  </a>
                                )}
                              </div>
                            ) : (
                              <Card className="bg-gradient-to-br from-muted/50 to-muted/30">
                                <CardContent className="p-4 sm:p-6">
                                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                                    <div className="text-center text-muted-foreground">
                                      <Play className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-primary/60" />
                                      <p className="font-medium">Coming Soon</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <GovernanceNavLinks />
        <Footer />
      </div>
    </>
  );
};

export default DevelopmentAgenda;