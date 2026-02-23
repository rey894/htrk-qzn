import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, AlertCircle, Calendar, Users, Target, Zap, Download, Presentation, FileText, TrendingUp } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";

const ProjectPresentation = () => {
  const projectOverview = {
    title: "Quezon, Bukidnon Municipal Website",
    subtitle: "Echoes of Resilience | Transcending Boundaries",
    budget: "₱330,000.00",
    duration: "4-6 months",
    status: "Phase 2 - Development & Integration",
    completion: 75
  };

  const deliverables = [
    {
      phase: "Phase 1: Groundwork & Foundation",
      status: "completed",
      completion: 100,
      items: [
        { name: "Discovery workshops & stakeholder alignment", status: "completed" },
        { name: "Content strategy & editorial standards", status: "completed" },
        { name: "Hosting & infrastructure setup", status: "completed" },
        { name: "SEO foundation & technical setup", status: "completed" },
        { name: "CMS training sessions delivered", status: "completed" }
      ]
    },
    {
      phase: "Phase 2: Build & Development",
      status: "in-progress",
      completion: 85,
      items: [
        { name: "UX/UI design & prototyping", status: "completed" },
        { name: "Core page development", status: "completed" },
        { name: "Template integration", status: "completed" },
        { name: "Accessibility compliance testing", status: "in-progress" },
        { name: "Final QA & optimization", status: "pending" }
      ]
    },
    {
      phase: "Phase 3: Launch & Handover",
      status: "pending",
      completion: 0,
      items: [
        { name: "Pre-launch testing & review", status: "pending" },
        { name: "Content migration & finalization", status: "pending" },
        { name: "Staff training & documentation", status: "pending" },
        { name: "Public launch & awareness campaign", status: "pending" },
        { name: "12-month SEO monitoring setup", status: "pending" }
      ]
    }
  ];

  const keyFeatures = [
    {
      category: "Core Pages",
      features: [
        "Home page with carousel & quick access",
        "About Quezon (History, Profile, Seal, Agenda)",
        "Governance & Transparency portal",
        "Industries & Investment opportunities",
        "Tourism & Culture showcase",
        "Youth Corner programs & stories"
      ]
    },
    {
      category: "Technical Features",
      features: [
        "Mobile-first responsive design",
        "SEO optimized with meta tags",
        "WCAG 2.0 accessibility compliance",
        "Schema markup for search engines",
        "Logo-inspired design system",
        "Fast loading & optimized performance"
      ]
    },
    {
      category: "Governance Features",
      features: [
        "FOI request portal",
        "Transparency reports section",
        "Procurement opportunities",
        "Public documents access",
        "Citizens charter download",
        "Contact information & services"
      ]
    }
  ];

  const timeline = [
    {
      milestone: "Project Kickoff",
      date: "Month 1",
      description: "Stakeholder workshops, requirements gathering, infrastructure setup",
      status: "completed"
    },
    {
      milestone: "Design & Content Strategy",
      date: "Month 1-2",
      description: "UI/UX design, content strategy, editorial guidelines",
      status: "completed"
    },
    {
      milestone: "Core Development",
      date: "Month 2-3",
      description: "Page development, template creation, feature implementation",
      status: "completed"
    },
    {
      milestone: "Testing & Optimization",
      date: "Month 3-4",
      description: "QA testing, accessibility compliance, performance optimization",
      status: "in-progress"
    },
    {
      milestone: "Launch Preparation",
      date: "Month 4",
      description: "Final testing, content migration, staff training",
      status: "pending"
    },
    {
      milestone: "Public Launch",
      date: "Month 4-5",
      description: "Website launch, awareness campaign, monitoring setup",
      status: "pending"
    }
  ];

  const metrics = [
    { label: "Pages Delivered", value: "6", target: "6", unit: "pages" },
    { label: "Design Components", value: "45+", target: "40+", unit: "components" },
    { label: "Accessibility Score", value: "95%", target: "90%", unit: "compliance" },
    { label: "Performance Score", value: "92%", target: "85%", unit: "optimization" }
  ];

  return (
    <>
      <SEOHelmet
        title="Project Presentation"
        description="Comprehensive project presentation and work breakdown schedule for Quezon, Bukidnon municipal website development."
        keywords="project presentation, municipal website, Quezon Bukidnon development"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/project-presentation`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-municipal-blue to-municipal-navy text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4 bg-municipal-gold text-municipal-navy">
                    Project Presentation
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {projectOverview.title}
                  </h1>
                  <p className="text-xl text-municipal-white/90 mb-6">
                    {projectOverview.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{projectOverview.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{projectOverview.budget}</span>
                    </div>
                  </div>
                </div>
                
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Project Status</h3>
                      <Badge className="bg-municipal-gold text-municipal-navy">
                        {projectOverview.completion}% Complete
                      </Badge>
                    </div>
                    <Progress value={projectOverview.completion} className="h-3 mb-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Phase:</span>
                        <span className="font-medium">{projectOverview.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Milestone:</span>
                        <span className="font-medium">QA & Testing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Presentation className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="deliverables" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Deliverables
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Metrics
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8 mt-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {keyFeatures.map((category, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {category.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Strategic Alignment</CardTitle>
                      <CardDescription>
                        How this project supports municipal objectives and national policies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-3">Four Development Pillars</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-municipal-blue rounded-full"></div>
                              <span className="text-sm"><strong>Kalinaw</strong> - Peace & Order transparency</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-municipal-gold rounded-full"></div>
                              <span className="text-sm"><strong>Kahigayunan</strong> - Economic growth promotion</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-municipal-red rounded-full"></div>
                              <span className="text-sm"><strong>Kahimsog</strong> - Health & wellness programs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm"><strong>Kalipay</strong> - Youth & cultural development</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Policy Compliance</h4>
                          <div className="space-y-1 text-sm">
                            <div>• RA 11032 - Ease of Doing Business</div>
                            <div>• RA 10844 - ICT Development</div>
                            <div>• Ambisyon Natin 2040</div>
                            <div>• Philippine Development Plan 2023-2028</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Deliverables Tab */}
                <TabsContent value="deliverables" className="space-y-6 mt-8">
                  {deliverables.map((phase, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-3">
                              {phase.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : phase.status === 'in-progress' ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-gray-400" />
                              )}
                              {phase.phase}
                            </CardTitle>
                          </div>
                          <Badge 
                            variant={phase.status === 'completed' ? 'default' : phase.status === 'in-progress' ? 'secondary' : 'outline'}
                            className={
                              phase.status === 'completed' ? 'bg-green-500' :
                              phase.status === 'in-progress' ? 'bg-yellow-500' : ''
                            }
                          >
                            {phase.completion}% Complete
                          </Badge>
                        </div>
                        <Progress value={phase.completion} className="mt-2" />
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phase.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
                              {item.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : item.status === 'in-progress' ? (
                                <Clock className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-gray-400" />
                              )}
                              <span className={`text-sm ${item.status === 'completed' ? 'text-green-700' : ''}`}>
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* Timeline Tab */}
                <TabsContent value="timeline" className="space-y-6 mt-8">
                  <div className="space-y-4">
                    {timeline.map((milestone, index) => (
                      <Card key={index} className={`border-l-4 ${
                        milestone.status === 'completed' ? 'border-l-green-500' :
                        milestone.status === 'in-progress' ? 'border-l-yellow-500' :
                        'border-l-gray-300'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">{milestone.milestone}</h3>
                                <Badge variant="outline">{milestone.date}</Badge>
                                {milestone.status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : milestone.status === 'in-progress' ? (
                                  <Clock className="h-4 w-4 text-yellow-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              <p className="text-muted-foreground">{milestone.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-secondary/50">
                    <CardHeader>
                      <CardTitle>Next Steps & Immediate Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Immediate (Next 2 weeks)</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              Complete accessibility compliance testing
                            </li>
                            <li className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              Final QA and bug fixes
                            </li>
                            <li className="flex items-center gap-2">
                              <Zap className="h-3 w-3 text-yellow-500" />
                              Content review and finalization
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Short-term (Next month)</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-blue-500" />
                              Staff training sessions
                            </li>
                            <li className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-blue-500" />
                              Pre-launch testing
                            </li>
                            <li className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-blue-500" />
                              Public launch preparation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Metrics Tab */}
                <TabsContent value="metrics" className="space-y-8 mt-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold text-primary mb-2">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {metric.label}
                          </div>
                          <div className="text-xs text-green-600">
                            Target: {metric.target}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Technical Specifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Framework</span>
                          <Badge variant="outline">React + TypeScript</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Styling</span>
                          <Badge variant="outline">Tailwind CSS</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Build Tool</span>
                          <Badge variant="outline">Vite</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Accessibility</span>
                          <Badge className="bg-green-500">WCAG 2.0 AA</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SEO Ready</span>
                          <Badge className="bg-green-500">Optimized</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mobile Ready</span>
                          <Badge className="bg-green-500">Responsive</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quality Assurance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Code Quality</span>
                          <Progress value={95} className="w-20 h-2" />
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Performance</span>
                          <Progress value={92} className="w-20 h-2" />
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Accessibility</span>
                          <Progress value={95} className="w-20 h-2" />
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SEO Score</span>
                          <Progress value={88} className="w-20 h-2" />
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Security</span>
                          <Progress value={98} className="w-20 h-2" />
                          <span className="text-sm font-medium">98%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Action Items */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Project Documentation</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Button size="lg" className="h-auto p-6 flex-col gap-3">
                  <Download className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Download Presentation</div>
                    <div className="text-xs opacity-80">Complete project overview</div>
                  </div>
                </Button>
                
                <Button size="lg" variant="outline" className="h-auto p-6 flex-col gap-3">
                  <FileText className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Technical Documentation</div>
                    <div className="text-xs opacity-80">Implementation guides</div>
                  </div>
                </Button>
                
                <Button size="lg" variant="outline" className="h-auto p-6 flex-col gap-3">
                  <Users className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Training Materials</div>
                    <div className="text-xs opacity-80">Staff handover resources</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProjectPresentation;