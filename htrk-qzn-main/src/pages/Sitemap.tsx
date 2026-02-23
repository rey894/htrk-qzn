import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";
import { formatPhoneForTel } from "@/lib/utils";

export default function Sitemap() {
  const { contactInfo } = useContactInfo();

  return (
    <>
      <SEOHelmet
        title="Site Map"
        description="Complete site navigation map for the Municipality of Quezon, Bukidnon website."
        keywords="sitemap, navigation, Quezon Bukidnon website"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/sitemap`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Site Map</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Main Navigation</h2>
                <ul className="space-y-2">
                  <li><a href="/" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Home</a></li>
                  <li><a href="/about" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />About</a></li>
                  <li><a href="/governance" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Governance</a></li>
                  <li><a href="/services" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Services</a></li>
                  <li><a href="/investment" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Investment</a></li>
                  <li><a href="/tourism" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Tourism</a></li>
                  <li><a href="/transparency" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Transparency</a></li>
                </ul>
                
                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">About Sections</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Town Profile with Interactive Map</li>
                  <li>• Geographic Coordinates & Entry Points</li>
                  <li>• Municipal History</li>
                  <li>• Official Municipal Seal</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Governance</h2>
                <ul className="space-y-2">
                  <li><a href="/governance" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Mission and Vision</a></li>
                  <li><a href="/governance/mayor" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />The Mayor</a></li>
                  <li><a href="/governance/sangguniang-bayan" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Sangguniang Bayan</a></li>
                  <li><a href="/governance/department-heads" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Department Heads</a></li>
                  <li><a href="/governance/development-agenda" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Our Goals</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Our Goals</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Kalinaw (Peace & Order)</li>
                  <li>• Kahigayunan (Opportunities)</li>
                  <li>• Kahimsog (Health)</li>
                  <li>• Kalipay (Civic Unity & Pride)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Tourism</h2>
                <ul className="space-y-2">
                  <li><a href="/tourism" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Tourism Overview</a></li>
                  <li><a href="/tourism/civic-activities" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Civic Activities</a></li>
                  <li><a href="/tourism/what-to-do" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />What to Do in Quezon</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Tourism Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Major Events & Festivals</li>
                  <li>• Destinations & Attractions</li>
                  <li>• Hotels & Restaurants</li>
                  <li>• Travel Information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Services</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Business Permits</li>
                  <li>• Civil Registry</li>
                  <li>• Building Permits</li>
                  <li>• Social Assistance</li>
                  <li>• Downloadable Forms</li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Homepage Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Hero Carousel</li>
                  <li>• Quezon At A Glance</li>
                  <li>• Our Goals</li>
                  <li>• Latest Updates & News</li>
                  <li>• Contact Form</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Transparency</h2>
                <ul className="space-y-2">
                  <li><a href="/transparency" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Transparency Overview</a></li>
                  <li><a href="/transparency/full-disclosure" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Full Disclosure</a></li>
                  <li><a href="/transparency/lgsf" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Local Government Support Fund</a></li>
                  <li><a href="/transparency/bayanihan-grant" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Bayanihan Grant</a></li>
                  <li><a href="/transparency/invitation-to-bid" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Invitation to Bid</a></li>
                  <li><a href="/transparency/notice-of-award" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Notice of Award</a></li>
                  <li><a href="/transparency/notice-to-proceed" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Notice to Proceed</a></li>
                  <li><a href="/transparency/contract-agreement" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Contract Agreement</a></li>
                  <li><a href="/transparency/sagip-saka" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Sagip Saka</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary mb-4">Accessibility & Support</h2>
                <ul className="space-y-2">
                  <li><a href="/accessibility" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Accessibility Statement</a></li>
                  <li><a href="/sitemap" className="text-primary hover:underline flex items-center"><ExternalLink className="h-4 w-4 mr-2" />Site Map</a></li>
                </ul>

                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>General:</strong> <a href={`tel:${formatPhoneForTel(contactInfo.phone)}`} className="text-primary hover:underline">{contactInfo.phone}</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">{contactInfo.email}</a></p>
                  <p><strong>Police:</strong> <a href={`tel:${formatPhoneForTel(contactInfo.policeNumber)}`} className="text-primary hover:underline">{contactInfo.policeNumber}</a></p>
                  <p><strong>Fire:</strong> <a href={`tel:${formatPhoneForTel(contactInfo.fireNumber)}`} className="text-primary hover:underline">{contactInfo.fireNumber}</a></p>
                </div>
              </section>
            </div>

            <div className="mt-12 p-6 bg-secondary rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Need Help Finding Something?</h2>
              <p className="mb-4">
                If you can't find what you're looking for on this site map, please contact us:
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">{contactInfo.email}</a><br />
                <strong>Phone:</strong> <a href={`tel:${formatPhoneForTel(contactInfo.phone)}`} className="text-primary hover:underline">{contactInfo.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}