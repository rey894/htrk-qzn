import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { 
  TrendingUp, 
  Shield,
  Heart,
  GraduationCap,
  Play
} from "lucide-react";

import { QuezonAtAGlance } from "@/components/QuezonAtAGlance";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";
import banner4K from "@/assets/banner-4k.png";
import emergencyHotlines from "@/assets/emergency-hotlines.png";
import anq25Schedule from "@/assets/anq25-schedule.png";
import quezonMunicipalBg from "@/assets/quezon-municipal-bg.jpg";
import quezonFlag from "@/assets/quezon-flag.png";
import quezonSeal from "@/assets/quezon-official-seal.png";
// DRRM images for emergency slideshow
import drrmImage1 from "@/assets/drrm/drrm-1.jpg";
import drrmImage2 from "@/assets/drrm/drrm-2.jpg";
import drrmImage3 from "@/assets/drrm/drrm-3.jpg";
import drrmImage4 from "@/assets/drrm/drrm-4.jpg";
import drrmImage5 from "@/assets/drrm/drrm-5.jpg";
// Emergency hotline logos
import policeLogo from "@/assets/logos/police-logo.png";
import fireLogo from "@/assets/logos/fire-logo.png";
import mdrrmoLogo from "@/assets/logos/mdrrmo-logo.svg";
import whiteRockFormation from "@/assets/quezon-white-rock-formation-bukidnon.jpg";
import pineapplePlantationAerial from "@/assets/quezon-pineapple-plantation-aerial-view.jpg";
import agriculturalFields from "@/assets/quezon-agricultural-pineapple-fields.jpg";
import whiteRockClimbing from "@/assets/quezon-white-rock-climbing-wall.jpg";
import manoboFestivalDance from "@/assets/quezon-manobo-cultural-festival-dance.jpg";
import manoboElder from "@/assets/quezon-indigenous-manobo-elder-traditional-costume.jpg";
import manoboRitual from "@/assets/quezon-manobo-rice-pounding-ritual.jpg";
import heroVideo from "@/assets/10s website.mp4";

const VideoPopup = lazy(async () => ({ default: (await import("@/components/VideoPopup")).VideoPopup }));
const InteractiveMap = lazy(async () => ({ default: (await import("@/components/InteractiveMap")).InteractiveMap }));

interface HeroSlide {
  image?: string;
  images?: string[]; // For slideshow
  title: string;
  subtitle: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  cta1?: string;
  cta1Link?: string;
  cta2?: string;
  cta2Link?: string;
  cta2Video?: string;
  showHotlines?: boolean;
  alt?: string;
  videoId?: string;
  videoSrc?: string; // Local video path (e.g. import)
  videoStartTime?: number; // Start time in seconds
  hasVideo?: boolean;
}

const heroSlide: HeroSlide = {
  image: quezonMunicipalBg,
  title: "We Are Quezon",
  subtitle: "",
  description: "",
  cta1: "About",
  cta1Link: "/about",
  cta2: "Watch the Video",
  cta2Video: "/assets/we-are-quezon.mp4",
  videoSrc: heroVideo,
  hasVideo: true,
  alt: "We Are Quezon - Discover our municipality"
};

const developmentPillars = [
  {
    title: "Kalinaw",
    subtitle: "Peace and Order",
    description: "Ensuring safety and security for all residents through comprehensive peace and order programs",
    icon: Shield,
    color: "bg-primary"
  },
  {
    title: "Kahigayunan", 
    subtitle: "Economic Growth & Investment",
    description: "Creating opportunities for prosperity through infrastructure, education, and livelihood programs",
    icon: TrendingUp,
    color: "bg-accent"
  },
  {
    title: "Kahimsog",
    subtitle: "Health and Wellness", 
    description: "A reliable, affordable, and effective healthcare system to support citizens",
    icon: Heart,
    color: "bg-success"
  },
  {
    title: "Kalipay",
    subtitle: "Youth, Sports & Culture",
    description: "Civic events and spaces that promote collective joy, unity, and pride",
    icon: GraduationCap,
    color: "bg-warning"
  }
];

// Component for Emergency Hotlines with Slow Sliding Carousel
function EmergencyHotlinesCarousel() {
  const hotlines = [
    {
      name: "Police",
      number: "0953 044 3399",
      logo: policeLogo,
      bgColor: "bg-[hsl(95_38%_42%)]/30",
      borderColor: "border-[hsl(95_38%_42%)]/40",
      textColor: "text-white font-bold",
      gradient: "from-[hsl(95_38%_42%)]/10"
    },
    {
      name: "Fire",
      number: "0905 751 1711",
      logo: fireLogo,
      bgColor: "bg-[hsl(42_75%_48%)]/30",
      borderColor: "border-[hsl(42_75%_48%)]/40",
      textColor: "text-white font-bold",
      gradient: "from-[hsl(42_75%_48%)]/10"
    },
    {
      name: "MDRRMO",
      number: "0970 621 9407",
      logo: mdrrmoLogo,
      bgColor: "bg-[hsl(35_45%_28%)]/30",
      borderColor: "border-[hsl(35_45%_28%)]/40",
      textColor: "text-white font-bold",
      gradient: "from-[hsl(35_45%_28%)]/10"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % hotlines.length);
    }, 5000); // Change every 5 seconds (slow slide)

    return () => clearInterval(interval);
  }, [hotlines.length]);

  return (
    <div className="bg-white/25 backdrop-blur-2xl rounded-2xl p-5 md:p-6 mb-6 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative z-40 overflow-hidden">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_6px_rgb(0_0_0_/_90%)] tracking-tight">Emergency Hotlines</h3>
      <div className="relative h-24 md:h-28 overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {hotlines.map((hotline, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex items-center gap-3 bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/30 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              style={{ minWidth: '100%' }}
            >
              <div className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-2xl overflow-hidden ${hotline.bgColor} border border-white/40 flex items-center justify-center p-2`}>
                <img 
                  src={hotline.logo}
                  alt={`${hotline.name} Logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${hotline.gradient} to-transparent pointer-events-none`} />
              </div>
              <div>
                <div className={`text-xs md:text-sm font-bold ${hotline.textColor} mb-1 uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_80%)]`}>{hotline.name}</div>
                <div className="text-lg md:text-xl font-extrabold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_5px_rgb(0_0_0_/_90%),_0_0_8px_rgb(0_0_0_/_60%)]">{hotline.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {hotlines.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-white/80' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Component for Video/Image Looping Background (like "WE ARE QUEZON")
function VideoImageLoopSlide({ slide, index }: { slide: HeroSlide, index: number }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const videoSrc = slide.videoSrc;
  const videoId = slide.videoId || '';
  const videoStartTime = slide.videoStartTime || 0;
  const image = slide.image || '';

  useEffect(() => {
    if (typeof window === "undefined") {
      setVideoEnabled(true);
      return;
    }

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const navigatorWithConnection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const saveData = Boolean(navigatorWithConnection.connection?.saveData);
    const reducedMotion = Boolean(mediaQuery?.matches);

    if (saveData || reducedMotion) {
      setVideoEnabled(false);
      setShowVideo(false);
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const enableVideo = () => {
      if (cancelled) return;
      setVideoEnabled(true);
      setShowVideo(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = (window as Window & {
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback(enableVideo, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(enableVideo, 1200);
    }

    return () => {
      cancelled = true;
      if (typeof timeoutId === "number") window.clearTimeout(timeoutId);
      if (typeof idleId === "number" && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!videoEnabled) return;

    // Loop between video and image every 15 seconds, but only after video is enabled.
    const interval = window.setInterval(() => {
      setShowVideo((prev) => !prev);
    }, 15000);

    return () => window.clearInterval(interval);
  }, [videoEnabled]);

  return (
    <>
      {/* Video Background */}
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${
          videoEnabled && showVideo ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        {videoEnabled && (
          videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={image || undefined}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
              title="We Are Quezon Video Background"
              aria-hidden="true"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[200%] min-h-[200%] w-[200%] h-[200%]"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&start=${videoStartTime}&modestbranding=1&iv_load_policy=3`}
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
              allowFullScreen={false}
              style={{ pointerEvents: 'none', border: 'none' }}
              title="We Are Quezon Video Background"
            />
          )
        )}
        {/* Darker seal color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(95_38%_42%)]/60 via-[hsl(95_35%_45%)]/55 to-[hsl(95_38%_42%)]/60" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Image Background */}
      {image && (
        <div 
          className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ${
            !videoEnabled || !showVideo ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={image}
            alt={slide.alt || slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
          {/* Darker seal color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(95_38%_42%)]/60 via-[hsl(95_35%_45%)]/55 to-[hsl(95_38%_42%)]/60" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
      )}
    </>
  );
}

// Component for Emergency Hero Slide with Auto-transitioning Background
function EmergencyHeroSlide({ images, slide, index }: { images: string[], slide: HeroSlide, index: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    // Fallback if no images
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(35_45%_18%)]/90 via-[hsl(35_40%_22%)]/85 to-[hsl(95_35%_25%)]/90" />
      </>
    );
  }

  return (
    <>
      {/* Image slideshow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {images.map((img, imgIndex) => (
          <div
            key={imgIndex}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              imgIndex === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={img}
              alt={`${slide.alt || slide.title} - Image ${imgIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
              loading={index === 0 && imgIndex === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>
      {/* Elegant overlay - Seal colors with opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(35_45%_18%)]/70 via-[hsl(35_40%_22%)]/65 to-[hsl(95_35%_25%)]/70 z-20" />
      {/* Additional overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-20" />
      {/* Natural-themed pattern overlay - subtle organic pattern */}
      <div className="absolute inset-0 opacity-12 z-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      {/* Subtle seal color accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(95_35%_25%)]/40 via-[hsl(95_38%_42%)]/20 to-transparent z-20" />
    </>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapVisible) return;
    if (typeof IntersectionObserver === "undefined") {
      setMapVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" }
    );

    const node = mapSectionRef.current;
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [mapVisible]);

  const handleNavigate = (link: string) => {
    if (link.startsWith('/#')) {
      const hash = link.substring(1);
      if (hash === 'contact') {
        navigate('/');
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          contactSection?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        navigate(hash);
      }
    } else if (link.startsWith('/')) {
      navigate(link);
    } else {
      window.location.href = link;
    }
  };

  const slide = heroSlide;

  return (
    <main>
      {/* Section 1: Hero - Single image with optional video overlay */}
      <section className="relative">
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden">
          {/* Background - Video/Image Loop */}
          {slide.hasVideo && (slide.videoSrc || slide.videoId) && slide.image ? (
            <VideoImageLoopSlide slide={slide} index={0} />
          ) : slide.image ? (
            <>
              <img 
                src={slide.image}
                alt={slide.alt || slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(35_45%_18%)]/85 via-[hsl(35_40%_22%)]/80 to-[hsl(95_35%_25%)]/85" />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
          )}
          
          <div className="absolute inset-0 flex flex-col justify-between z-30 opacity-95">
            <div className="flex-1 flex items-center justify-center min-h-0 py-4">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-4xl backdrop-blur-sm bg-black/10 rounded-2xl p-6 md:p-8">
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 text-center lg:text-left text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] [text-shadow:_4px_4px_12px_rgb(0_0_0_/_70%),_2px_2px_6px_rgb(0_0_0_/_90%),_0_0_24px_rgb(0_0_0_/_40%)] tracking-tight leading-[1.1] ${slide.cta1Link ? 'cursor-pointer hover:scale-105 transition-transform duration-300' : ''}`}
                  onClick={slide.cta1Link ? () => handleNavigate(slide.cta1Link!) : undefined}
                >
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 text-center lg:text-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] [text-shadow:_3px_3px_8px_rgb(0_0_0_/_80%),_0_0_18px_rgb(0_0_0_/_35%)] tracking-tight text-white/95">
                    {slide.subtitle}
                  </h2>
                )}
              
                {slide.showHotlines && (
                  <div className="relative z-40">
                    <EmergencyHotlinesCarousel />
                  </div>
                )}
              
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
                  {slide.cta1Link && (
                    <Button 
                      size="lg" 
                      variant="hero"
                      className="bg-gradient-to-r from-primary via-primary/95 to-primary text-white font-semibold shadow-[0_8px_32px_hsl(95_38%_42%_/_0.4),0_4px_16px_hsl(95_38%_42%_/_0.3)] hover:shadow-[0_12px_48px_hsl(95_38%_42%_/_0.45),0_6px_24px_hsl(95_38%_42%_/_0.35)] border-2 border-white/30 px-8 py-6 text-base sm:text-lg transition-all duration-300 hover:scale-[1.05] hover:border-white/50 backdrop-blur-xl"
                      onClick={() => handleNavigate(slide.cta1Link!)}
                    >
                      {slide.cta1}
                    </Button>
                  )}
                  {(slide.cta2Video || slide.cta2Link) && (
                    <Button 
                      size="lg" 
                      variant="heroSecondary"
                      className="bg-white/95 backdrop-blur-2xl hover:bg-white text-primary font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.14)] border-2 border-primary/50 hover:border-primary/70 px-8 py-6 text-base sm:text-lg transition-all duration-300 hover:scale-[1.05] flex items-center gap-2.5"
                      onClick={() => slide.cta2Video ? setVideoPopupOpen(true) : handleNavigate(slide.cta2Link!)}
                    >
                      <Play className="h-5 w-5" />
                      {slide.cta2}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center pb-4">
              <ScrollDownIndicator />
            </div>
          </div>
        </div>
        {videoPopupOpen && (
          <Suspense fallback={null}>
            <VideoPopup
              open={videoPopupOpen}
              onOpenChange={setVideoPopupOpen}
              src="/assets/we-are-quezon.mp4"
              title="We Are Quezon"
            />
          </Suspense>
        )}
      </section>

      {/* Section 2: Quezon At A Glance */}
      <section className="bg-secondary/30">
        <QuezonAtAGlance />

        {/* Discover Quezon - Interactive Map */}
        <div className="container mx-auto px-4 sm:px-6 mt-12 pb-16" ref={mapSectionRef}>
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Discover Quezon</h3>
          </div>
          {mapVisible ? (
            <Suspense
              fallback={
                <div
                  className="w-full min-h-[420px] rounded-xl border border-primary/10 bg-muted/20 animate-pulse"
                  aria-hidden="true"
                />
              }
            >
              <InteractiveMap embedded={true} />
            </Suspense>
          ) : (
            <div
              className="w-full min-h-[420px] rounded-xl border border-primary/10 bg-muted/20 animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>
      </section>

      {/* Section 3: Our Goals (4K Development Pillars) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Our Goals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kalinaw, Kahigayunan, Kahimsog, Kalipay — our four-point agenda in building a town we can be proud to call home.
            </p>
          </div>

          {/* 2x2 grid on mobile/tablet, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {developmentPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <Card key={index} className="text-center shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer h-full min-h-[260px] flex flex-col">
                  <CardHeader className="pb-2">
                    <div className={`p-2 sm:p-4 rounded-full w-fit mx-auto mb-2 sm:mb-4 ${pillar.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm font-medium text-accent mb-2 sm:mb-3">
                      {pillar.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0 sm:pt-6">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-1">
                      {pillar.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate('/governance/development-agenda')}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
