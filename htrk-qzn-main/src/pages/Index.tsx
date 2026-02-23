import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Gallery } from "@/components/Gallery";
import { UpdatesSection } from "@/components/UpdatesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AnimateIn } from "@/components/AnimateIn";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { OrganizationSchema } from "@/components/seo/StructuredData";

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
        <AnimateIn>
          <Gallery />
        </AnimateIn>
        <AnimateIn delay={100}>
          <UpdatesSection />
        </AnimateIn>
        <AnimateIn delay={150}>
          <ContactSection />
        </AnimateIn>
        <Footer />
      </div>
    </>
  );
};

export default Index;
