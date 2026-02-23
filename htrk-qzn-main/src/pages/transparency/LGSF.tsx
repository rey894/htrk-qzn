import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download } from "lucide-react";

export default function LGSF() {
  return (
    <>
      <SEOHelmet
        title="Local Government Support Fund"
        description="Local Government Support Fund information and reports for the Municipality of Quezon, Bukidnon."
        keywords="LGSF, Local Government Support Fund, Quezon Bukidnon, transparency"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/lgsf`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Local Government Support Fund (LGSF)</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">About LGSF</h2>
                <p className="mb-4">
                  The Local Government Support Fund (LGSF) is a special fund created to provide financial assistance 
                  to local government units for various development projects and programs that benefit the community.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Available Reports</h2>
                <div className="grid gap-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">LGSF Utilization Report 2024</h3>
                          <p className="text-sm text-muted-foreground">Annual report on LGSF utilization and projects</p>
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
                          <h3 className="font-semibold">LGSF Allocation Summary</h3>
                          <p className="text-sm text-muted-foreground">Summary of fund allocations by project category</p>
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
                    For inquiries regarding LGSF reports and documentation:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> lgsf@quezonbukidnon.gov.ph</p>
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