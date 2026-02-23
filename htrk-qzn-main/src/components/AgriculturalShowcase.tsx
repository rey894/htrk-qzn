import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wheat, 
  Beef, 
  Grape, 
  TreePine,
  Flower2,
  Apple,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react";

const agriculturalProducts = [
  {
    name: "Sugar Cane",
    icon: Wheat,
    production: "850,000 MT annually",
    description: "Primary crop driving economic growth in our diverse agricultural economy",
    marketValue: "₱2.8 Billion",
    farmersInvolved: "12,500+",
    color: "bg-municipal-sage-green",
    gradient: "from-municipal-sage-green to-municipal-soft-green"
  },
  {
    name: "Livestock (Cattle)",
    icon: Beef,
    production: "45,000 head",
    description: "Premium cattle farming with modern breeding practices",
    marketValue: "₱1.2 Billion", 
    farmersInvolved: "3,200+",
    color: "bg-municipal-rust",
    gradient: "from-municipal-rust to-municipal-earth-brown"
  },
  {
    name: "Corn",
    icon: Grape,
    production: "125,000 MT annually",
    description: "High-yield corn varieties for food and feed production",
    marketValue: "₱580 Million",
    farmersInvolved: "8,900+",
    color: "bg-municipal-cream",
    gradient: "from-municipal-cream to-municipal-warm-beige"
  },
  {
    name: "Rice",
    icon: TreePine,
    production: "89,000 MT annually", 
    description: "Premium rice varieties serving regional food security",
    marketValue: "₱720 Million",
    farmersInvolved: "6,700+",
    color: "bg-municipal-deep-green",
    gradient: "from-municipal-deep-green to-municipal-sage-green"
  },
  {
    name: "High-Value Crops",
    icon: Flower2,
    production: "Mixed varieties",
    description: "Vegetables, fruits, and specialty crops for premium markets",
    marketValue: "₱450 Million",
    farmersInvolved: "4,100+", 
    color: "bg-municipal-soft-green",
    gradient: "from-municipal-soft-green to-municipal-cream"
  },
  {
    name: "Coconut",
    icon: Apple,
    production: "38,000 MT annually",
    description: "Traditional coconut farming with value-added processing",
    marketValue: "₱320 Million",
    farmersInvolved: "2,800+",
    color: "bg-municipal-earth-brown",
    gradient: "from-municipal-earth-brown to-municipal-brown"
  }
];

const ProductCard = ({ product, index }: { product: typeof agriculturalProducts[0], index: number }) => (
  <Card className="group hover:shadow-card-hover transition-all duration-300 border-none shadow-card bg-gradient-to-br from-background to-muted/20">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient} shadow-elegant`}>
          <product.icon className="h-8 w-8 text-white" />
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          #{index + 1}
        </Badge>
      </div>
      <CardTitle className="text-xl font-heading text-foreground group-hover:text-primary transition-colors">
        {product.name}
      </CardTitle>
      <CardDescription className="text-muted-foreground leading-relaxed">
        {product.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Production
          </p>
          <p className="font-semibold text-foreground">{product.production}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Farmers
          </p>
          <p className="font-semibold text-foreground">{product.farmersInvolved}</p>
        </div>
      </div>
      <div className="pt-2 border-t border-border/50">
        <p className="text-sm font-medium text-muted-foreground">Market Value</p>
        <p className="text-lg font-bold text-primary">{product.marketValue}</p>
      </div>
    </CardContent>
  </Card>
);

export const AgriculturalShowcase = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Agricultural Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-balance">
            Pride of <span className="text-primary">Quezon's Fields</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover Quezon's diverse agricultural wealth and stunning tourism attractions like the Kiokong White Rock Wall, 
            where traditional farming meets modern innovation in a land of natural wonders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agriculturalProducts.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
            <MapPin className="mr-2 h-5 w-5" />
            Explore Agricultural Map
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};