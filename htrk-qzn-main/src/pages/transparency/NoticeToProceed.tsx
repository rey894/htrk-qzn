import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, Play } from "lucide-react";

export default function NoticeToProceed() {
  return (
    <>
      <SEOHelmet
        title="Notice to Proceed"
        description="Notice to proceed documents for approved projects in the Municipality of Quezon, Bukidnon."
        keywords="notice to proceed, procurement, Quezon Bukidnon, transparency"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/notice-to-proceed`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Notice to Proceed</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Recent Notices</h2>
                
                <div className="grid gap-6">
                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Play className="h-8 w-8 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Barangay Road Concreting Phase 1</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contractor:</strong> General Construction Corp.
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Project Duration:</strong> 180 Calendar Days
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Date Issued:</strong> March 1, 2025
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Expected Completion:</strong> August 28, 2025
                        </p>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download Notice</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Play className="h-8 w-8 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Municipal Health Center Equipment Installation</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contractor:</strong> HealthTech Solutions Inc.
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Project Duration:</strong> 60 Calendar Days
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Date Issued:</strong> March 5, 2025
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Expected Completion:</strong> May 4, 2025
                        </p>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download Notice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Archive</h2>
                <div className="grid gap-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">2024 Notice to Proceed Archive</h3>
                          <p className="text-sm text-muted-foreground">Complete collection of 2024 proceed notices</p>
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
                          <h3 className="font-semibold">2023 Notice to Proceed Archive</h3>
                          <p className="text-sm text-muted-foreground">Complete collection of 2023 proceed notices</p>
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
                    For inquiries regarding notices to proceed:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Project Management Office</strong></p>
                    <p><strong>Email:</strong> pmo@quezonbukidnon.gov.ph</p>
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