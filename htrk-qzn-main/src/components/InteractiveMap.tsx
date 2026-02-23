import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InteractiveMapProps {
  embedded?: boolean; // If true, remove the section wrapper and header
  /** When true (e.g. homepage), use interactive Google Maps focused on municipality only */
  interactive?: boolean;
}

// Quezon, Bukidnon municipality center - zoom 12 focuses on municipality
const QUEZON_CENTER = "7.7353,125.1013";
const QUEZON_ZOOM = 12;
const googleMapsEmbedUrl = `https://www.google.com/maps?q=${QUEZON_CENTER}&z=${QUEZON_ZOOM}&output=embed`;
const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Quezon,+Bukidnon,+Philippines";

export const InteractiveMap = ({ embedded = false, interactive = true }: InteractiveMapProps) => {
  const mapContent = (
    <div className="w-full relative">
      <Card className="relative overflow-hidden shadow-lg border border-primary/10 bg-white">
        {/* Info Card - Top Left */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs border border-primary/10">
          <CardTitle className="text-lg font-bold text-foreground mb-1">Quezon, Bukidnon</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {interactive
              ? "Interactive map of the municipality — pan, zoom, and explore"
              : "Administrative map showing 31 barangays and neighboring municipalities"}
          </CardDescription>
        </div>

        {/* Map: Interactive embed (homepage) or static image (About) */}
        <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          {interactive ? (
            <iframe
              src={googleMapsEmbedUrl}
              title="Interactive map of Quezon, Bukidnon municipality"
              className="w-full h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <img
              src="/assets/quezon-administrative-map.png"
              alt="Quezon, Bukidnon administrative map showing barangays and boundaries with Valencia, San Fernando, Kitaotao, and Don Carlos"
              className="w-full h-auto object-contain bg-white"
              loading="lazy"
            />
          )}
          {/* Overlay link to Google Maps for directions */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg"
          >
            View on Google Maps
          </a>
        </div>
      </Card>
    </div>
  );

  if (embedded) {
    return mapContent;
  }

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Interactive Exploration
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-balance">
            Discover <span className="text-primary">Quezon's Landscape</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Navigate through our rich agricultural zones, tourism destinations, and local businesses.
            Experience the diverse beauty and economic strength of our municipality.
          </p>
        </div>

        {mapContent}
      </div>
    </section>
  );
};

export default InteractiveMap;
