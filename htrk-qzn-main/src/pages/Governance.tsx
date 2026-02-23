import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GovernanceTabs } from "@/components/GovernanceTabs";
import { GovernanceNavLinks } from "@/components/GovernanceNavLinks";
import { GovernanceHero } from "@/components/GovernanceHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Eye,
  Target,
  Award,
  Building2,
  Calendar,
  Shield,
  Heart,
  TrendingUp,
  GraduationCap,
  Play,
  ExternalLink,
  User,
  MapPin
} from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Link, useLocation } from "react-router-dom";
import mayorPabloLorenzo from "@/assets/mayor-pablo-lorenzo.png";
import vmJosephDurotan from "@/assets/vm-joseph-durotan.png";
import sbClydeBaguio from "@/assets/sb-clyde-baguio.png";
import sbArnoldPastor from "@/assets/sb-arnold-pastor.png";
import sbTeresitaLeonardo from "@/assets/sb-teresita-leonardo.png";
import sbNiloBardon from "@/assets/sb-nilo-bardon.png";
import sbFloridoPerpetua from "@/assets/sb-florido-perpetua.png";
import sbReynanteYoro from "@/assets/sb-reynante-yoro.png";
import sbLezeDensing from "@/assets/sb-leze-densing.png";
import sbMyrnaRepalda from "@/assets/sb-myrna-repalda.png";

const Governance = () => {
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === '/governance/sangguniang-bayan') return 'council';
    if (location.pathname === '/governance/offices') return 'departments';
    if (location.pathname === '/governance/mayor') return 'mayor';
    if (location.pathname === '/governance/development-agenda') return 'agenda';
    return 'mission';
  };

  const activeTab = getActiveTab();

  return (
    <>
      <SEOHelmet
        title="Governance"
        description="Learn about the governance structure, mission & vision, mayor, sangguniang bayan, department heads, and development agenda of Quezon, Bukidnon."
        keywords="governance, mayor, sangguniang bayan, development agenda, Kalinaw, Kahigayunan, Kahimsog, Kalipay, Quezon Bukidnon"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/governance`}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <GovernanceHero />
        <GovernanceTabs />

        {/* Tab Content Section - Only show for /governance main page */}
        {location.pathname === '/governance' && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} className="w-full">

              {/* Mission and Vision Tab */}
              <TabsContent value="mission" className="space-y-6 sm:space-y-8" id="mission">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[hsl(35_45%_25%)]">
                      <Target className="h-6 w-6 text-[hsl(35_45%_28%)]" />
                      Mission and Vision
                    </CardTitle>
                    <CardDescription>
                      Our guiding principles and aspirations for the municipality
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col gap-4 sm:gap-6">
                      <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[hsl(35_25%_95%)] to-[hsl(35_20%_98%)] rounded-lg border-2 border-[hsl(35_45%_40%)] shadow-lg">
                        <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-[hsl(35_45%_28%)] mx-auto mb-3" />
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[hsl(35_45%_25%)]">Vision</h3>
                        <p className="text-[hsl(35_25%_30%)] leading-relaxed font-semibold text-sm sm:text-base">
                          We envision Quezon, Bukidnon as a peaceful and prosperous community where residents are healthy, happy,
                          and have boundless opportunities for social and economic development within a well-nurtured ecological
                          environment; giving its youth the competitive advantage to be better prepared for life; a modern, lively,
                          and also beautiful, pleasant place we can all be proud to call our home.
                        </p>
                      </div>
                      <div className="text-center p-4 sm:p-5 bg-gradient-to-br from-[hsl(35_25%_95%)] to-[hsl(35_20%_98%)] rounded-lg border-2 border-[hsl(35_45%_40%)] shadow-lg">
                        <Target className="h-10 w-10 sm:h-12 sm:w-12 text-[hsl(35_45%_28%)] mx-auto mb-3" />
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[hsl(35_45%_25%)]">Mission</h3>
                        <div className="text-left text-[hsl(35_25%_30%)] leading-relaxed text-sm sm:text-base font-semibold">
                          <p className="mb-2 font-bold text-[hsl(35_45%_25%)]">We are committed to:</p>
                          <ul className="space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Have competent and dedicated civil servants rendering exceptional, effective, timely, and streamlined public services</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Take the necessary measures to ensure peace and order</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Provide the vital, modern and resilient infrastructure and access to public facilities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Foster a pro-enterprise atmosphere that attracts investments, encourages businesses, and generates jobs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Bolster agriculture for food security and sustainable economic development</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Assure holistic development of children through high-quality and accessible education, essential nutrition programs, sports and physical development, and skills training</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Deliver a comprehensive and reliable healthcare system for all</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Conserve our environment and sustainably utilize natural resources</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Offer avenues for leisure, recreation and tourism for the enjoyment of everyone</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[hsl(35_45%_35%)] mt-1 flex-shrink-0">•</span>
                              <span>Nurture our people's diverse cultures and heritage</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <GovernanceNavLinks compact />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* The Mayor Tab */}
              <TabsContent value="mayor" className="space-y-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      The Mayor
                    </CardTitle>
                    <CardDescription>
                      Leadership and vision for Quezon, Bukidnon
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                      <div className="text-center">
                        <img
                          src={mayorPabloLorenzo}
                          alt="Mayor Pablo M. Lorenzo III - Municipal Mayor of Quezon Bukidnon"
                          className="w-64 h-80 object-contain rounded-lg mx-auto mb-4 ring-4 ring-primary/20 bg-secondary/30 p-2"
                          style={{ objectPosition: 'center' }}
                          loading="lazy"
                        />
                        <p className="text-sm font-semibold text-[hsl(35_25%_35%)]">Pablo &quot;Poling&quot; M. Lorenzo III</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-4">Pablo &quot;Poling&quot; M. Lorenzo III</h3>
                        <div className="space-y-4 text-[hsl(35_25%_30%)] font-medium leading-relaxed">
                          <p>
                            Mayor Pablo M. Lorenzo III, known to everyone as "Mayor Poling," has spent years working to make Quezon
                            a better place for its people. He believes in building peace, creating opportunities, and helping families thrive.
                          </p>
                          <p>
                            Before entering politics, he founded the Associated Bukidnon Sugarcane Farmers, Inc. (ABSFI), where he
                            continues to serve as Chairman Emeritus. Through ABSFI, he's helped countless sugarcane farmers across
                            Southern Bukidnon improve their livelihoods and strengthen their communities.
                          </p>
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Our Goals</h4>
                            <p className="text-sm">Kalinaw • Kahigayunan • Kahimsog • Kalipay</p>
                          </div>
                        </div>
                        <Link to="/governance/mayor">
                          <Button className="mt-6">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Full Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sangguniang Bayan Tab */}
              <TabsContent value="council" className="space-y-8">
                <div className="space-y-8">
                  {/* Vice Mayor Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-6 w-6" />
                        Municipal Vice Mayor
                      </CardTitle>
                      <CardDescription>
                        Presiding officer of the 16th Sangguniang Bayan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="text-center">
                          <img
                            src={vmJosephDurotan}
                            alt="Vice Mayor Joseph T. Durotan Sr. - Vice Mayor of Quezon Bukidnon"
                            className="w-48 h-60 object-contain rounded-lg mx-auto mb-4 ring-4 ring-primary/20 bg-secondary/30 p-2"
                            style={{ objectPosition: 'center' }}
                            loading="lazy"
                          />
                          <p className="text-sm font-bold text-[hsl(35_45%_28%)]">Joseph T. Durotan Sr.</p>
                        </div>
                        <div>
                        <h3 className="text-xl font-semibold mb-4">Joseph T. Durotan Sr.</h3>
                        <div className="space-y-3 text-[hsl(35_25%_30%)] font-medium text-sm leading-relaxed">
                            <p>
                              Vice Mayor Joseph Durotan Sr. began his political career in 1994 as the Treasurer of Barangay Minsalirac.
                              He later served as Barangay Captain from 1992 to 2002 and was elected as President of the Association of
                              Barangay Councils (ABC).
                            </p>
                            <p>
                              He holds a degree in Aircraft Mechanical Engineering from the Cebu Aeronautical Technical
                              School and a degree in Public Administration from Bukidnon State University.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sanggunian Members Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Elected Councilors</CardTitle>
                      <CardDescription>
                        Council members of the 16th Sangguniang Bayan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { name: "Clyde Joseph A. Baguio, CPA", image: sbClydeBaguio },
                          { name: "Arnold L. Pastor, MD", image: sbArnoldPastor },
                          { name: "Teresita B. Leonardo, DMD", image: sbTeresitaLeonardo },
                          { name: "Nilo P. Bardon", image: sbNiloBardon },
                          { name: "Florido E. Perpetua", image: sbFloridoPerpetua },
                          { name: "Reynante Nelson Y. Yoro, GE", image: sbReynanteYoro },
                          { name: "Leze John Adam A. Densing, EE", image: sbLezeDensing },
                          { name: "Myrna D. Repalda", image: sbMyrnaRepalda }
                        ].map((member, index) => (
                          <div key={index} className="text-center">
                            <img
                              src={member.image}
                              alt={`${member.name} - Sangguniang Bayan of Quezon Bukidnon`}
                              className="w-24 h-32 object-contain rounded-lg mx-auto mb-3 ring-2 ring-primary/20 bg-secondary/30 p-1"
                              style={{ objectPosition: 'center center' }}
                              loading="lazy"
                            />
                            <h4 className="font-semibold text-sm leading-tight">{member.name}</h4>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-6">
                        <a href="/governance/sangguniang-bayan">
                          <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View All Members & Committees
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Department Heads Tab */}
              <TabsContent value="departments" className="space-y-8">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Municipal Trial Court
                    </CardTitle>
                    <CardDescription>
                      Presiding Judge of the Municipal Trial Court
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/30 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">Hon. Krystine B. Geronimo-Peloton</h3>
                      <p className="text-sm text-muted-foreground mb-4">MTC Presiding Judge</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Appointed in March 2020, Judge Krystine B. Geronimo-Peloton is a licensed attorney with a Bachelor of Science
                        in Accountancy and a Law Degree from Ateneo de Davao University. She passed the Bar Examination in 2009 and
                        began her legal career at the Public Attorney's Office (PAO), serving in Panabo City and the municipalities of
                        Carmen, Sto. Tomas, and Braulio E. Dujali in Davao del Norte.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Municipal Office Directory
                    </CardTitle>
                    <CardDescription>
                      Department heads and officers serving the municipality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Atty. Michael L. Cutor, CPA", position: "Municipal Administrator I", office: "Office of the Municipal Mayor" },
                        { name: "Queeny Pearl C. Vargas", position: "Executive Assistant II", office: "MEMO" },
                        { name: "Maria Aherma L. Baylomo, CPA", position: "Municipal Treasurer", office: "Treasurer's Office" },
                        { name: "Ronald T. Ramao, MPA, REB, REA", position: "MASSO-OIC", office: "Assessor's Office" },
                        { name: "Jaireh James U. Pahalla, ME", position: "MPDO-OIC", office: "Planning Office" },
                        { name: "Lea Paula P. Catalan-Densing, MD", position: "Municipal Health Officer", office: "Health Office" },
                        { name: "Wena B. Pagayon, RSW", position: "MSWDO I", office: "Social Welfare Office" },
                        { name: "Roy N. Niones, CE", position: "Municipal Engineer", office: "Engineer's Office" },
                        { name: "Roque S. Pepito, ABE", position: "Municipal Agriculturist", office: "Agriculture Office" }
                      ].map((official, index) => (
                        <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-[hsl(35_45%_28%_/_0.1)] rounded-full">
                              <User className="h-5 w-5 text-[hsl(35_45%_28%)]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[hsl(35_45%_25%)]">{official.name}</h4>
                              <p className="text-xs font-medium text-[hsl(35_25%_35%)]">{official.position}</p>
                              <p className="text-xs font-semibold text-[hsl(35_45%_30%)]">{official.office}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <Link to="/governance/offices">
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View All Offices & Contact Info
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Development Agenda Tab */}
              <TabsContent value="agenda" className="space-y-8">
                <div className="space-y-8">
                  {/* Kalinaw Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        Kalinaw (Peace and Order)
                      </CardTitle>
                      <CardDescription>
                        Anti-insurgency and anti-crime efforts, coordination with security forces
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Peace and Order initiatives including anti-insurgency and anti-crime efforts,
                          support and coordination with army, police, and firemen, creation of Municipal
                          Public Safety Office (MPSO), and formation of Barangay Justice System.
                        </p>
                        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <Play className="h-8 w-8 text-[hsl(35_45%_28%)]" />
                          <div>
                            <h4 className="font-semibold">Embed YouTube Video (Kalinaw)</h4>
                            <p className="text-sm font-medium text-[hsl(35_25%_35%)]">Video content about peace and order programs</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Kahigayunan Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        Kahigayunan (Opportunities)
                      </CardTitle>
                      <CardDescription>
                        Infrastructure, education, livelihood skills training, and market development
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Opportunities through infrastructure development, education enhancement,
                          livelihood skills training programs, and market development initiatives.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src="https://www.youtube.com/embed/kLFkDRX5CHE"
                              title="Dalan - Road Infrastructure"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src="https://www.youtube.com/embed/JMbQtgbdICI"
                              title="Skwelahan - Education Programs"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src="https://www.youtube.com/embed/2-Iw54cLz3s"
                              title="Livelihood Skills Training"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <a href="https://www.youtube.com/@municipalityofquezonbukidn9015" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Watch More on YouTube
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Kahimsog Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-6 w-6" />
                        Kahimsog (Health)
                      </CardTitle>
                      <CardDescription>
                        Health care initiatives including QHCI, nutrition, and pito-puto programs
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          The Municipality of Quezon is dedicated to ensuring the health and well-being of its constituents through a robust set of programs and initiatives. These include:
                        </p>
                        <ul className="list-disc list-inside text-[hsl(35_25%_30%)] font-medium space-y-2 ml-4 leading-relaxed">
                          <li>Quezon Health Care Initiative (QHCI)</li>
                          <li>Comprehensive nutrition programs</li>
                          <li>Pito-Puto nutrition intervention</li>
                          <li>Maternal and child health services</li>
                          <li>Disease prevention and control</li>
                          <li>Mental health and wellness programs</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                          Our Annual Nutrition Caravan (ANQ 2025) represents a comprehensive approach to community health, reaching all 31 barangays from January to February. This initiative provides essential health screenings, nutritional education, and supplement distribution to ensure every resident has access to quality healthcare services.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Kalipay Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-6 w-6" />
                        Kalipay (Joy and Unity)
                      </CardTitle>
                      <CardDescription>
                        Civic unity, pride, and cultural events at key municipal venues
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Themes of civic unity and pride through various events including Sunggod Teh Kamanga,
                          October events, Araw ng Quezon, Summer Sports Festival (SSF), and Christmas Lights Display.
                          Key locations include Civic Arena, Hawkers' Hub, and Freedom Park Complex.
                        </p>
                        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                          <Play className="h-8 w-8 text-[hsl(35_45%_28%)]" />
                          <div>
                            <h4 className="font-semibold">Embed YouTube Video (Kalipay)</h4>
                            <p className="text-sm font-medium text-[hsl(35_25%_35%)]">Video content about cultural events and unity</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Governance;