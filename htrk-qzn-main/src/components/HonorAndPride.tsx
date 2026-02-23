import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Crown, 
  Star, 
  Trophy,
  Medal,
  Flag,
  Heart,
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  Shield
} from "lucide-react";

const achievements = [
  {
    title: "Gateway to Adventure & Agricultural Excellence",
    description: "Home to the stunning Kiokong White Rock Wall and diverse agricultural industries driving economic growth",
    icon: Crown,
    year: "Established 1966",
    color: "bg-municipal-sage-green",
    gradient: "from-municipal-sage-green to-municipal-soft-green"
  },
  {
    title: "1st Class Municipality", 
    description: "Achieved 1st class status with consistent revenue growth and excellent public services",
    icon: Star,
    year: "Maintained Since 2010",
    color: "bg-municipal-rust",
    gradient: "from-municipal-rust to-municipal-earth-brown"
  },
  {
    title: "Seal of Good Local Governance",
    description: "Awarded for transparency, accountability, and excellence in public service delivery",
    icon: Award,
    year: "2023-2024",
    color: "bg-municipal-deep-green", 
    gradient: "from-municipal-deep-green to-municipal-sage-green"
  },
  {
    title: "Outstanding Agricultural Municipality",
    description: "Provincial recognition for innovative farming practices and agricultural development",
    icon: Trophy,
    year: "2024",
    color: "bg-municipal-earth-brown",
    gradient: "from-municipal-earth-brown to-municipal-brown"
  }
];

const culturalPride = [
  {
    title: "Bukidnon Heritage",
    description: "Preserving the rich cultural traditions of indigenous communities while embracing modern progress",
    icon: Shield,
    highlights: ["Traditional Festivals", "Indigenous Arts", "Cultural Preservation"]
  },
  {
    title: "Community Unity",
    description: "31 barangays working together as one, showcasing the Filipino spirit of bayanihan",
    icon: Users,
    highlights: ["Bayanihan Spirit", "Community Cooperation", "Shared Progress"]
  },
  {
    title: "Agricultural Legacy",
    description: "Generations of farmers passing down knowledge and dedication to feed the nation",
    icon: Heart,
    highlights: ["Family Farms", "Traditional Knowledge", "Modern Innovation"]
  }
];

const statistics = [
  {
    label: "Years of Progress",
    value: "58+",
    description: "Since municipality establishment",
    icon: Calendar
  },
  {
    label: "Proud Citizens",
    value: "114,521",
    description: "Residents calling Quezon home",
    icon: Users
  },
  {
    label: "Barangays United",
    value: "31", 
    description: "Communities working as one",
    icon: MapPin
  },
  {
    label: "Economic Growth",
    value: "₱5.2B+",
    description: "Annual agricultural output",
    icon: TrendingUp
  }
];

const StatCard = ({ stat }: { stat: typeof statistics[0] }) => (
  <Card className="text-center shadow-card hover:shadow-card-hover transition-all duration-300 group">
    <CardContent className="pt-6">
      <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-elegant mb-4 group-hover:scale-110 transition-transform">
        <stat.icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
      <div className="font-semibold text-foreground mb-1">{stat.label}</div>
      <div className="text-sm text-muted-foreground">{stat.description}</div>
    </CardContent>
  </Card>
);

const AchievementCard = ({ achievement }: { achievement: typeof achievements[0] }) => (
  <Card className="group hover:shadow-card-hover transition-all duration-300 border-none shadow-card bg-gradient-to-br from-background to-muted/20">
    <CardHeader className="pb-4">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.gradient} shadow-elegant group-hover:scale-110 transition-transform`}>
          <achievement.icon className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
              {achievement.title}
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {achievement.year}
            </Badge>
          </div>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {achievement.description}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  </Card>
);

const PrideCard = ({ pride }: { pride: typeof culturalPride[0] }) => (
  <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-xl font-heading">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <pride.icon className="h-6 w-6 text-primary-foreground" />
        </div>
        {pride.title}
      </CardTitle>
      <CardDescription className="leading-relaxed">
        {pride.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {pride.highlights.map((highlight, index) => (
          <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
            {highlight}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const HonorAndPride = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Municipal Honor
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-balance">
            Our <span className="text-primary">Pride & Legacy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Celebrating the achievements, culture, and unwavering spirit that makes 
            Quezon, Bukidnon a beacon of progress in Mindanao.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold font-heading text-center mb-8 flex items-center justify-center gap-3">
            <Medal className="h-8 w-8 text-primary" />
            Distinguished Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Cultural Pride Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold font-heading text-center mb-8 flex items-center justify-center gap-3">
            <Flag className="h-8 w-8 text-primary" />
            Cultural Heritage & Pride
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {culturalPride.map((pride, index) => (
              <PrideCard key={index} pride={pride} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-2xl font-bold font-heading mb-4">Join Our Legacy</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of Quezon's continued growth and prosperity. Whether as a resident, investor, 
            or visitor, you contribute to our shared success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
              <Users className="mr-2 h-5 w-5" />
              Become a Resident
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Heart className="mr-2 h-5 w-5" />
              Visit Quezon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};