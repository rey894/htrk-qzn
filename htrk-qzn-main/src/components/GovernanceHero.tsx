import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import { HeroPlaceholder } from "@/components/HeroPlaceholder";

/**
 * Main Governance hero section - used consistently across all governance pages.
 * Uses lightweight placeholder (no images) to keep bundle small.
 */
export function GovernanceHero() {
  return (
    <section className="relative h-[75vh] sm:h-[80vh] bg-gradient-to-br from-primary/10 to-accent/8 overflow-hidden">
      <div className="absolute inset-0">
        <HeroPlaceholder />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="container mx-auto px-4 relative h-full flex items-center z-10">
        <div className="max-w-4xl mx-auto text-center text-white w-full">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)]">
            Governance
          </h1>
        </div>
      </div>
      <ScrollDownIndicator />
    </section>
  );
}
