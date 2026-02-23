import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsAndEvents } from "@/components/NewsAndEvents";
import { Badge } from "@/components/ui/badge";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Newspaper } from "lucide-react";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import { HeroPlaceholder } from "@/components/HeroPlaceholder";

const News = () => {
  return (
    <>
      <SEOHelmet
        title="Latest News"
        description="Stay updated with the latest news, announcements, and events from the Municipality of Quezon, Bukidnon. Get informed about local government initiatives and community happenings."
        keywords="Quezon Bukidnon news, local government announcements, municipal updates, community events, Quezon news"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/news`}
      />

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section - Lightweight placeholder (no images) */}
        <section className="relative h-[75vh] sm:h-[80vh] bg-gradient-to-br from-primary/10 to-accent/8 overflow-hidden">
          <div className="absolute inset-0">
            <HeroPlaceholder />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="container mx-auto px-4 relative h-full flex items-center z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)] flex items-center justify-center gap-4">
                <Newspaper className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white/90" />
                Latest News
              </h1>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>

        {/* News Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <NewsAndEvents />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default News;
