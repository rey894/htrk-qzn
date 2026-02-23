import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, Calendar } from "lucide-react";

export default function InvitationToBid() {
  return (
    <>
      <SEOHelmet
        title="Invitation to Bid"
        description="Current and archived invitation to bid notices for the Municipality of Quezon, Bukidnon."
        keywords="invitation to bid, procurement, bidding, Quezon Bukidnon, transparency"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/invitation-to-bid`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Invitation to Bid</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Current Bidding Opportunities</h2>
                
                <div className="grid gap-6">
                  <div className="border border-border rounded-lg p-6 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Road Infrastructure Improvement Project</h3>
                        <p className="text-muted-foreground mb-3">
                          Construction and improvement of municipal roads in various barangays
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: March 15, 2025</span>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Open</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80 ml-4">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-6 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Municipal Building Renovation</h3>
                        <p className="text-muted-foreground mb-3">
                          Renovation and modernization of municipal government facilities
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: April 20, 2025</span>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Open</span>
                        </div>
                      </div>
                      <button className="flex items-center space-x-2 text-primary hover:text-primary/80 ml-4">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Archived Bids</h2>
                <div className="grid gap-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">2024 Bidding Documents Archive</h3>
                          <p className="text-sm text-muted-foreground">Complete collection of 2024 bidding documents</p>
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
                <h2 className="text-2xl font-semibold text-primary mb-4">Bidding Guidelines</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">How to Participate</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Review the complete bidding documents</li>
                    <li>Ensure compliance with eligibility requirements</li>
                    <li>Submit all required documents before the deadline</li>
                    <li>Attend the bid opening ceremony</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    For inquiries regarding bidding opportunities:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Bids and Awards Committee</strong></p>
                    <p><strong>Email:</strong> bac@quezonbukidnon.gov.ph</p>
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