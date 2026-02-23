import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Factory, Sprout, Users, Mountain, Droplets, MapPin, Calendar, Building2 } from "lucide-react";

const motherTongueData = [
  { name: "Binukid", value: 68009, fill: "hsl(95 38% 42%)" },
  { name: "Hiligaynon", value: 6498, fill: "hsl(95 38% 55%)" },
  { name: "Ilocano", value: 1338, fill: "hsl(95 38% 65%)" },
  { name: "Maranao", value: 1060, fill: "hsl(95 38% 70%)" },
  { name: "Tagalog", value: 471, fill: "hsl(95 38% 75%)" },
  { name: "Manobo", value: 735, fill: "hsl(95 38% 80%)" },
];

interface AgriculturalPowerhouseInfographicProps {
  /** Reduce padding when embedded in About Town Profile */
  embedded?: boolean;
}

export function AgriculturalPowerhouseInfographic({ embedded }: AgriculturalPowerhouseInfographicProps) {
  return (
    <section className={embedded ? "py-6 sm:py-8 bg-background" : "py-12 sm:py-16 bg-background"}>
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground uppercase tracking-tight text-center mb-10">
          Quezon, Bukidnon: The Sugar Capital of the South
        </h2>

        {/* Economic Powerhouse */}
        <div className="mb-10">
          <div className="h-px bg-primary/30 mb-6" />
          <h3 className="text-lg font-semibold text-foreground mb-6">Economic Powerhouse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="h-6 w-6 text-accent" />
                <span className="font-semibold">The Sugar Capital of Bukidnon</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The economy is driven by the BUSCO Sugar Milling Company, which provides thousands of jobs and supports a vast network of sugarcane growers.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Sprout className="h-6 w-6 text-accent" />
                <span className="font-semibold">Diversified Agribusiness</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Beyond sugar, the town hosts major pineapple operations by Del Monte Philippines and DAVCO, established cattle ranches like Ranchu Montalvan.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="text-xl font-bold text-primary mb-2">73.92%</div>
              <div className="font-semibold text-foreground mb-2">Labor Force Participation</div>
              <p className="text-sm text-muted-foreground">
                The majority of the workforce (85.36%) is engaged in farming, forestry, and fishing, reflecting the town&apos;s agricultural roots.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-card border border-border rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold text-foreground mb-4">Population by Mother Tongue</h4>
            <ChartContainer config={{}} className="h-[220px] w-full">
              <BarChart data={motherTongueData} layout="vertical" margin={{ left: 60, right: 24 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={56} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {motherTongueData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Demographic Profile */}
        <div className="mb-10">
          <div className="h-px bg-primary/30 mb-6" />
          <h3 className="text-lg font-semibold text-foreground mb-6">Demographic Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-accent" />
                <span className="font-semibold">A Youthful and Growing Community</span>
              </div>
              <p className="text-sm text-muted-foreground">
                85% of the population is below the age of 30, indicating significant potential for future labor and development.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="text-xl font-bold text-primary mb-2">31.96%</div>
              <div className="font-semibold text-foreground mb-2">Poverty Incidence (2021)</div>
              <p className="text-sm text-muted-foreground">
                While a decrease from previous decades (peaking at 50% in 2015), poverty remains a key challenge for local governance.
              </p>
            </div>
          </div>
        </div>

        {/* Tourism & Natural Wonders */}
        <div className="mb-10">
          <div className="h-px bg-primary/30 mb-6" />
          <h3 className="text-lg font-semibold text-foreground mb-6">Tourism & Natural Wonders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mountain className="h-6 w-6 text-accent" />
                <span className="font-semibold">Kiokong White Rock Wall</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A premier destination for extreme adventure, offering the first &quot;vertical bivouac&quot; experience in the Philippines on a 560-foot rock face.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-6 w-6 text-accent" />
                <span className="font-semibold">Blue Water Cave</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A natural scenic spot located along the Pulangi River, known for its distinct water color and geological formations.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-accent" />
                <span className="font-semibold">Overview Nature and Culture Park</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Located in Palacapao, this park provides a panoramic view of the entire municipality and its neighboring towns.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Milestones */}
        <div>
          <div className="h-px bg-primary/30 mb-6" />
          <h3 className="text-lg font-semibold text-foreground mb-6">Historical Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">1966</span>
              </div>
              <div className="font-semibold text-foreground mb-2">Official Birth of the Municipality</div>
              <p className="text-sm text-muted-foreground">
                Originally known as Barangay Kiokong under Maramag. It was officially recognized as the Municipality of Quezon via R.A. 4802.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">1974</span>
              </div>
              <div className="font-semibold text-foreground mb-2">The Rise of Sugar</div>
              <p className="text-sm text-muted-foreground">
                The construction of the Bukidnon Sugar Milling Company (BUSCO) transformed the local economy and introduced the town&apos;s first banking institutions.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <Sprout className="h-6 w-6 text-accent" />
                <span className="font-bold text-primary">2008</span>
              </div>
              <div className="font-semibold text-foreground mb-2">Expansion into Pineapples</div>
              <p className="text-sm text-muted-foreground">
                Del Monte Philippines established a fresh fruit packing house in Barangay San Jose, marking a new era of multinational investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
