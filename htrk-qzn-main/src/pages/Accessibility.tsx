import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone } from "lucide-react";

export default function Accessibility() {
  return (
    <>
      <SEOHelmet
        title="Web Accessibility Statement"
        description="Accessibility features and compliance information for the Municipality of Quezon, Bukidnon website."
        keywords="accessibility, WCAG, Quezon Bukidnon, inclusive design"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/accessibility`}
      />

      <Header />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Web Accessibility Statement</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Our Commitment to Accessibility</h2>
                <p className="mb-4">
                  The Municipality of Quezon, Bukidnon is committed to ensuring digital accessibility for people 
                  with disabilities. We are continually improving the user experience for everyone and applying 
                  the relevant accessibility standards in compliance with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>NCDA-ICTO Joint Circular No. 1-2010 "Accessible Website Design Guidelines"</li>
                  <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                  <li>Philippine Web Accessibility Group (PWAG) recommendations</li>
                  <li>UN Convention on the Rights of Persons with Disabilities (UNCRPD)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Accessibility Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Navigation Features</h3>
                    <ul className="list-disc pl-6">
                      <li>Skip to main content links</li>
                      <li>Descriptive link text</li>
                      <li>Keyboard navigation support</li>
                      <li>Consistent navigation structure</li>
                      <li>Site map for easy navigation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Content Features</h3>
                    <ul className="list-disc pl-6">
                      <li>Alternative text for images</li>
                      <li>High color contrast ratios</li>
                      <li>Resizable text up to 200%</li>
                      <li>Clear and simple language</li>
                      <li>No auto-playing content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Accessibility Shortcuts</h2>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold mb-2">Keyboard Shortcuts (Access Keys):</p>
                  <ul className="list-disc pl-6">
                    <li><kbd className="bg-muted px-2 py-1 rounded text-sm">Alt + 1</kbd> - Skip to main content</li>
                    <li><kbd className="bg-muted px-2 py-1 rounded text-sm">Alt + 2</kbd> - Skip to navigation</li>
                    <li><kbd className="bg-muted px-2 py-1 rounded text-sm">Alt + 3</kbd> - Skip to search</li>
                    <li><kbd className="bg-muted px-2 py-1 rounded text-sm">Alt + 4</kbd> - Go to homepage</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Supported Assistive Technologies</h2>
                <p className="mb-4">This website is designed to work with:</p>
                <ul className="list-disc pl-6">
                  <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                  <li>Voice recognition software</li>
                  <li>Keyboard navigation</li>
                  <li>Screen magnification software</li>
                  <li>Switch navigation devices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Known Issues and Limitations</h2>
                <p className="mb-4">
                  We are continuously working to improve accessibility. If you encounter any barriers 
                  while using our website, please let us know so we can address them.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Feedback and Contact</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    We welcome your feedback on the accessibility of this website. Please let us know 
                    if you encounter accessibility barriers:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>
                        <strong>Email:</strong> 
                        <a href="mailto:accessibility@quezonbukidnon.gov.ph" className="text-primary hover:underline ml-1">
                          accessibility@quezonbukidnon.gov.ph
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span><strong>Phone:</strong> (088) 123-4567</span>
                    </div>
                    <div>
                      <strong>Subject Line:</strong> Website Accessibility Issue
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    We aim to respond to accessibility feedback within 5 business days.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Compliance Status</h2>
                <p className="mb-4">
                  This website is partially compliant with WCAG 2.1 Level AA and NCDA-ICTO Joint Circular 
                  guidelines. We are actively working toward full compliance.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-PH', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}