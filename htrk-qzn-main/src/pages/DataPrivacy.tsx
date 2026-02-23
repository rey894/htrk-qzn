import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { ExternalLink } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";

const DataPrivacy = () => {
  const { contactInfo } = useContactInfo();

  return (
    <>
      <SEOHelmet
        title="Data Privacy Policy"
        description="Read the Data Privacy Policy of the Municipality of Quezon, Bukidnon."
        keywords="data privacy, Quezon Bukidnon, privacy policy, RA 10173"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/data-privacy`}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-20">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">Data Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>
                The Municipality of Quezon, Bukidnon is committed to protecting your privacy and personal data.
                Our Data Privacy Policy outlines how we collect, use, store, and protect your information in compliance
                with the Data Privacy Act of 2012 (Republic Act No. 10173).
              </p>
              <p>
                For the full details of our Data Privacy Policy, please refer to the official document:
              </p>
              <a
                href="https://docs.google.com/document/d/1oyqwPp8iNNp-RG_2Orh1hBz7y8KlIYhKGVO9seODBYY/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View Official Data Privacy Policy Document <ExternalLink className="h-4 w-4" />
              </a>
              <p>
                By using this website and our services, you agree to the terms outlined in our Data Privacy Policy.
              </p>
              <div className="pt-6 border-t">
                <h3 className="text-xl font-semibold text-primary mb-4">Contact Information</h3>
                <p className="mb-2">
                  For questions, concerns, or requests regarding your personal information, please contact:
                </p>
                <p className="font-medium text-foreground">
                  Municipality of Quezon, Bukidnon<br />
                  Email: <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">{contactInfo.email}</a><br />
                  Phone: <a href={`tel:${formatPhoneForTel(contactInfo.phone)}`} className="text-primary hover:underline">{contactInfo.phone}</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DataPrivacy;
