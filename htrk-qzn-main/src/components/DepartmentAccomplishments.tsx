import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Sprout, 
  GraduationCap, 
  Heart,
  Shield,
  Wrench,
  Users,
  Target,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const departments = [
  {
    id: "agriculture",
    name: "Agriculture Department",
    icon: Sprout,
    color: "bg-municipal-sage-green",
    accomplishments: [
      {
        title: "Sugar Production Increase",
        description: "Achieved 15% increase in sugar cane yield through modern farming techniques",
        progress: 100,
        year: "2024"
      },
      {
        title: "Farmer Training Programs", 
        description: "Trained 2,500+ farmers in sustainable agriculture practices",
        progress: 95,
        year: "2024"
      },
      {
        title: "Farm-to-Market Roads",
        description: "Completed 45km of farm-to-market road construction",
        progress: 100,
        year: "2023"
      }
    ],
    plans: [
      {
        title: "Smart Agriculture Initiative",
        description: "Implement IoT sensors and data analytics in 500 farms",
        timeline: "2025-2026",
        budget: "₱50M"
      },
      {
        title: "Organic Certification Program",
        description: "Support 200 farmers to achieve organic certification",
        timeline: "2025",
        budget: "₱15M"
      }
    ]
  },
  {
    id: "education",
    name: "Education Department",
    icon: GraduationCap,
    color: "bg-municipal-rust",
    accomplishments: [
      {
        title: "School Infrastructure",
        description: "Built 12 new classrooms and renovated 25 existing facilities",
        progress: 100,
        year: "2024"
      },
      {
        title: "Digital Learning Program",
        description: "Equipped all 31 schools with digital learning tools",
        progress: 90,
        year: "2024"
      },
      {
        title: "Teacher Development",
        description: "300+ teachers received advanced training and certification",
        progress: 100,
        year: "2024"
      }
    ],
    plans: [
      {
        title: "STEM Excellence Centers",
        description: "Establish 5 STEM excellence centers across the municipality",
        timeline: "2025-2027",
        budget: "₱75M"
      },
      {
        title: "Scholarship Expansion",
        description: "Increase scholarship grants to 1,000 deserving students",
        timeline: "2025",
        budget: "₱25M"
      }
    ]
  },
  {
    id: "health",
    name: "Health Department",
    icon: Heart,
    color: "bg-municipal-deep-green",
    accomplishments: [
      {
        title: "Healthcare Coverage",
        description: "Achieved 98% healthcare coverage for all residents",
        progress: 98,
        year: "2024"
      },
      {
        title: "Medical Facilities",
        description: "Upgraded 8 barangay health centers with modern equipment",
        progress: 100,
        year: "2024"
      },
      {
        title: "Immunization Program",
        description: "Achieved 95% vaccination rate for children under 5",
        progress: 95,
        year: "2024"
      }
    ],
    plans: [
      {
        title: "Tertiary Hospital Construction",
        description: "Build a 200-bed tertiary hospital to serve Northern Bukidnon",
        timeline: "2025-2028",
        budget: "₱800M"
      },
      {
        title: "Telemedicine Network",
        description: "Connect all health centers to specialist doctors via telemedicine",
        timeline: "2025",
        budget: "₱30M"
      }
    ]
  },
  {
    id: "infrastructure",
    name: "Public Works",
    icon: Wrench,
    color: "bg-municipal-earth-brown",
    accomplishments: [
      {
        title: "Road Networks",
        description: "Completed 78km of concrete road construction and rehabilitation",
        progress: 100,
        year: "2024"
      },
      {
        title: "Water Systems",
        description: "Expanded water coverage to 85% of all households",
        progress: 85,
        year: "2024"
      },
      {
        title: "Bridge Construction",
        description: "Built 6 new bridges connecting remote barangays",
        progress: 100,
        year: "2024"
      }
    ],
    plans: [
      {
        title: "Highway Widening Project",
        description: "Widen the Quezon-Maramag highway to 4 lanes",
        timeline: "2025-2027",
        budget: "₱500M"
      },
      {
        title: "Flood Control System",
        description: "Construct comprehensive flood control infrastructure",
        timeline: "2025-2026",
        budget: "₱200M"
      }
    ]
  }
];

const AccomplishmentCard = ({ accomplishment }: { accomplishment: any }) => (
  <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-lg font-heading mb-2">{accomplishment.title}</CardTitle>
          <CardDescription className="text-sm">{accomplishment.description}</CardDescription>
        </div>
        <Badge variant="outline" className="ml-2 shrink-0">
          {accomplishment.year}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{accomplishment.progress}%</span>
        </div>
        <Progress value={accomplishment.progress} className="h-2" />
      </div>
    </CardContent>
  </Card>
);

const PlanCard = ({ plan }: { plan: any }) => (
  <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 border-l-4 border-l-primary">
    <CardHeader>
      <CardTitle className="text-lg font-heading flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        {plan.title}
      </CardTitle>
      <CardDescription>{plan.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Timeline:</span>
          <span className="font-medium">{plan.timeline}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Budget:</span>
          <span className="font-medium text-primary">{plan.budget}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const DepartmentAccomplishments = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Municipal Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-balance">
            Accomplishments & <span className="text-primary">Future Plans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Witness the remarkable achievements of our dedicated departments and the ambitious plans 
            that will shape Quezon's prosperous future.
          </p>
        </div>

        <Tabs defaultValue="agriculture" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50">
            {departments.map((dept) => (
              <TabsTrigger 
                key={dept.id} 
                value={dept.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <dept.icon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{dept.name}</span>
                <span className="sm:hidden">{dept.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {departments.map((dept) => (
            <TabsContent key={dept.id} value={dept.id} className="space-y-8">
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-2xl ${dept.color} mb-4 shadow-elegant`}>
                  <dept.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">{dept.name}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold font-heading mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    2024 Accomplishments
                  </h4>
                  <div className="space-y-4">
                    {dept.accomplishments.map((accomplishment, index) => (
                      <AccomplishmentCard key={index} accomplishment={accomplishment} />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold font-heading mb-6 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Upcoming Plans
                  </h4>
                  <div className="space-y-4">
                    {dept.plans.map((plan, index) => (
                      <PlanCard key={index} plan={plan} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};