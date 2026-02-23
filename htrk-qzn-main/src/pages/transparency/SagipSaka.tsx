import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, Sprout } from "lucide-react";

export default function SagipSaka() {
  return (
    <>
      <SEOHelmet
        title="Sagip Saka"
        description="Sagip Saka program documents and reports for Municipality of Quezon, Bukidnon - supporting local farmers and fisherfolk under RA 11321."
        keywords="Sagip Saka, RA 11321, farmers, fisherfolk, Quezon Bukidnon"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/sagip-saka`}
      />

      <Header />

      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Sagip Saka</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">About Sagip Saka</h2>
                <p className="mb-4">
                  The Sagip Saka Act (Republic Act 11321) institutionalizes direct purchase from farmers and fisherfolk
                  by national government agencies and local government units. The Municipality of Quezon is committed
                  to supporting our agricultural sector through this program.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Program Reports</h2>

                <div className="grid gap-6">
                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Sprout className="h-8 w-8 text-[hsl(95_38%_42%)] mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Sagip Saka Implementation Report</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>Period:</strong> 2024
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Status:</strong> <span className="text-green-600 font-semibold">Active</span>
                        </p>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download Report</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">Sagip Saka Program Guidelines</h3>
                          <p className="text-sm text-muted-foreground">RA 11321 implementation guidelines</p>
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
                <h2 className="text-2xl font-semibold text-primary mb-4">Transparency</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    In line with our commitment to transparency and good governance, all Sagip Saka program
                    documents, procurement activities, and reports are made available to the public in accordance
                    with applicable laws and regulations.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    For inquiries regarding the Sagip Saka program:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Municipal Agriculture Office</strong></p>
                    <p><strong>Email:</strong> agriculture@quezonbukidnon.gov.ph</p>
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
