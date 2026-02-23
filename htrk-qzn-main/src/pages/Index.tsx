import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AnimateIn } from "@/components/AnimateIn";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { OrganizationSchema } from "@/components/seo/StructuredData";

const Gallery = lazy(async () => ({ default: (await import("@/components/Gallery")).Gallery }));
const UpdatesSection = lazy(async () => ({ default: (await import("@/components/UpdatesSection")).UpdatesSection }));
const ContactSection = lazy(async () => ({ default: (await import("@/components/ContactSection")).ContactSection }));
const Footer = lazy(async () => ({ default: (await import("@/components/Footer")).Footer }));

function SectionPlaceholder({ minHeight = 320 }: { minHeight?: number }) {
  return (
    <div
      className="w-full rounded-2xl bg-gradient-to-b from-muted/35 to-muted/10 border border-border/30 animate-pulse"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

function DeferredSection({
  children,
  minHeight = 320,
  rootMargin = "300px 0px",
}: {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const node = ref.current;
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref}>
      {visible ? children : <SectionPlaceholder minHeight={minHeight} />}
    </div>
  );
}

const Index = () => {
  return (
    <>
      <SEOHelmet
        title="Municipality of Quezon, Bukidnon - Official Website"
        description="Welcome to the official website of Quezon, Bukidnon - a 1st Class Municipality. Discover our 4K Agenda: Kalinaw, Kahigayunan, Kahimsog, Kalipay. Tourism, services, and governance information."
        keywords="Quezon Bukidnon, Municipality of Quezon, Mayor Pablo Lorenzo III, 4K Agenda, Bukidnon tourism, Southern Bukidnon, local government"
        ogType="website"
      />
      <OrganizationSchema
        name="Municipality of Quezon, Bukidnon"
        description="Official government website of the Municipality of Quezon, Bukidnon - a 1st Class Municipality in Southern Bukidnon Province, Philippines"
        url={typeof window !== 'undefined' ? window.location.origin : ''}
        logo={`${typeof window !== 'undefined' ? window.location.origin : ''}/images/quezon-seal.png`}
        address={{
          streetAddress: "Municipal Hall, Poblacion",
          addressLocality: "Quezon",
          addressRegion: "Bukidnon",
          postalCode: "8720",
          addressCountry: "PH"
        }}
        contactPoint={{
          telephone: "+63-xxx-xxx-xxxx",
          contactType: "customer service",
          email: "info@quezon.gov.ph"
        }}
        sameAs={[
          "https://www.facebook.com/MunicipalityOfQuezonBukidnon"
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <DeferredSection minHeight={520}>
          <AnimateIn>
            <Suspense fallback={<SectionPlaceholder minHeight={520} />}>
              <Gallery />
            </Suspense>
          </AnimateIn>
        </DeferredSection>
        <DeferredSection minHeight={560} rootMargin="400px 0px">
          <AnimateIn delay={100}>
            <Suspense fallback={<SectionPlaceholder minHeight={560} />}>
              <UpdatesSection />
            </Suspense>
          </AnimateIn>
        </DeferredSection>
        <DeferredSection minHeight={520} rootMargin="450px 0px">
          <AnimateIn delay={150}>
            <Suspense fallback={<SectionPlaceholder minHeight={520} />}>
              <ContactSection />
            </Suspense>
          </AnimateIn>
        </DeferredSection>
        <DeferredSection minHeight={220} rootMargin="500px 0px">
          <Suspense fallback={<SectionPlaceholder minHeight={220} />}>
            <Footer />
          </Suspense>
        </DeferredSection>
      </div>
    </>
  );
};

export default Index;
