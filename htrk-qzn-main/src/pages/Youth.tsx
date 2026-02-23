import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Users, Trophy, BookOpen, Heart, Send, GraduationCap, Briefcase, Award, Calendar, MapPin, Star } from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";

const Youth = () => {
  const programs = [
    {
      title: "Scholarship Program",
      category: "Education",
      description: "Financial assistance for deserving students pursuing higher education",
      eligibility: "Grade 11-12 & College students, 85% average, income requirements",
      benefits: ["Full tuition coverage", "Monthly allowance", "Book allowance", "Mentorship program"],
      icon: GraduationCap,
      color: "bg-municipal-blue",
      applications: 245,
      beneficiaries: 89
    },
    {
      title: "Skills Development Training",
      category: "Career",
      description: "Technical and vocational training programs for employment readiness",
      eligibility: "Ages 15-30, out-of-school youth priority",
      benefits: ["Free training", "Certification", "Job placement assistance", "Starter kits"],
      icon: Briefcase,
      color: "bg-municipal-gold",
      applications: 186,
      beneficiaries: 156
    },
    {
      title: "Youth Leadership Academy",
      category: "Leadership",
      description: "Developing young leaders through comprehensive leadership training",
      eligibility: "Ages 18-25, active community involvement",
      benefits: ["Leadership seminars", "Project funding", "Network building", "Certificate"],
      icon: Award,
      color: "bg-municipal-red",
      applications: 98,
      beneficiaries: 45
    },
    {
      title: "Sports Development Program",
      category: "Sports",
      description: "Athletic training and sports facilities for youth athletes",
      eligibility: "Ages 12-21, basic sports aptitude test",
      benefits: ["Free training", "Equipment provision", "Competition support", "Coaching"],
      icon: Trophy,
      color: "bg-green-500",
      applications: 312,
      beneficiaries: 178
    }
  ];

  const successStories = [
    {
      name: "Maria Santos",
      age: 22,
      program: "Scholarship Program",
      achievement: "Graduated Cum Laude in Engineering",
      story: "Thanks to the scholarship program, I was able to pursue my dream of becoming an engineer. Now I'm working as a project engineer in a major construction company.",
      image: "/placeholder.svg"
    },
    {
      name: "Juan Carlos",
      age: 24,
      program: "Skills Development",
      achievement: "Started Own Automotive Shop",
      story: "The automotive repair training gave me the skills I needed. I now own a successful auto repair shop and employ 8 people from our community.",
      image: "/placeholder.svg"
    },
    {
      name: "Sarah Mae",
      age: 20,
      program: "Youth Leadership Academy",
      achievement: "Founded Environmental NGO",
      story: "The leadership program inspired me to start an environmental organization. We've planted over 5,000 trees and cleaned 15 rivers in Bukidnon.",
      image: "/placeholder.svg"
    }
  ];

  const events = [
    {
      title: "Youth Summit 2024",
      date: "March 15-17, 2024",
      location: "Municipal Convention Center",
      description: "Annual gathering of young leaders from across Bukidnon",
      attendees: 500
    },
    {
      title: "Skills Fair",
      date: "April 8-10, 2024",
      location: "Town Plaza",
      description: "Showcase of youth talents and technical skills",
      attendees: 300
    },
    {
      title: "Inter-Barangay Sports Festival",
      date: "May 20-25, 2024",
      location: "Municipal Sports Complex",
      description: "Annual sports competition among all barangays",
      attendees: 800
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Youth Corner"
        description="Discover youth programs, scholarships, skills training, and opportunities in Quezon, Bukidnon. Empowering the next generation of leaders and achievers."
        keywords="youth programs, scholarships, skills training, youth development, Quezon Bukidnon, student opportunities, leadership training"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/youth`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-municipal-blue to-municipal-navy text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-municipal-gold text-municipal-navy">
                Empowering Young Leaders
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                Youth Corner
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-municipal-gold text-municipal-navy hover:bg-municipal-gold/90">
                  <Users className="h-5 w-5 mr-2" />
                  Join Our Programs
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-municipal-navy">
                  <Heart className="h-5 w-5 mr-2" />
                  Share Your Story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1,250+</div>
                <div className="text-muted-foreground">Youth Beneficiaries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15</div>
                <div className="text-muted-foreground">Active Programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">₱12M</div>
                <div className="text-muted-foreground">Annual Investment</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Youth Programs</h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive programs designed to develop your potential and skills
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {programs.map((program, index) => {
                  const IconComponent = program.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${program.color}`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-xl">{program.title}</CardTitle>
                              <Badge variant="outline">{program.category}</Badge>
                            </div>
                            <CardDescription>{program.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Eligibility:</h4>
                          <p className="text-sm text-muted-foreground">{program.eligibility}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                          <div className="flex flex-wrap gap-1">
                            {program.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{program.applications}</span> applications • 
                            <span className="font-medium"> {program.beneficiaries}</span> beneficiaries
                          </div>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                <p className="text-xl text-muted-foreground">
                  Inspiring journeys of young Quezonians who achieved their dreams
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">{story.name}</h3>
                        <div className="text-sm text-muted-foreground">Age {story.age} • {story.program}</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-center">
                          <Badge className="bg-municipal-gold text-municipal-navy">
                            <Star className="h-3 w-3 mr-1" />
                            {story.achievement}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground italic">
                          "{story.story}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Submit Your Success Story
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-xl text-muted-foreground">
                  Join us in these exciting youth activities and programs
                </p>
              </div>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <Badge variant="outline">{event.date}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.attendees} expected attendees
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Learn More</Button>
                          <Button>Register Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Share Your Story Section */}
        <section className="py-16 bg-gradient-to-r from-municipal-blue to-municipal-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="text-center text-white">
                  <CardTitle className="text-2xl md:text-3xl">Share Your Story</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    Inspire other young Quezonians with your achievements and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input id="name" placeholder="Your full name" className="bg-white/20 border-white/30 text-white placeholder:text-white/60" />
                    </div>
                    <div>
                      <Label htmlFor="program" className="text-white">Program/Achievement</Label>
                      <Input id="program" placeholder="Program you joined or achievement" className="bg-white/20 border-white/30 text-white placeholder:text-white/60" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="story" className="text-white">Your Story</Label>
                    <Textarea 
                      id="story" 
                      placeholder="Tell us about your journey, challenges overcome, and how our programs helped you..."
                      rows={4}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="text-center">
                    <Button size="lg" className="bg-municipal-gold text-municipal-navy hover:bg-municipal-gold/90">
                      <Send className="h-5 w-5 mr-2" />
                      Submit Story
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

export default Youth;