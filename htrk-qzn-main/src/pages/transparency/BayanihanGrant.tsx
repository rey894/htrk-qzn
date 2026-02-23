import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download } from "lucide-react";

export default function BayanihanGrant() {
  return (
    <>
      <SEOHelmet
        title="Bayanihan Grant"
        description="Bayanihan Grant information and reports for the Municipality of Quezon, Bukidnon."
        keywords="Bayanihan Grant, Quezon Bukidnon, transparency"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/bayanihan-grant`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Bayanihan Grant</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">About Bayanihan Grant</h2>
                <p className="mb-4">
                  The Bayanihan Grant provides funding support for community-driven development projects 
                  that promote unity, cooperation, and sustainable development in our municipality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Available Documents</h2>
                <div className="grid gap-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">Bayanihan Grant Report 2024</h3>
                          <p className="text-sm text-muted-foreground">Annual report on grant utilization and projects</p>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">Grant Guidelines and Requirements</h3>
                          <p className="text-sm text-muted-foreground">Application guidelines and eligibility requirements</p>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    For inquiries regarding Bayanihan Grant programs:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> bayanihan@quezonbukidnon.gov.ph</p>
                    <p><strong>Phone:</strong> (088) 123-4567</p>
                    <p><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}