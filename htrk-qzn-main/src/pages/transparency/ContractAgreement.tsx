import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Download, FileCheck } from "lucide-react";

export default function ContractAgreement() {
  return (
    <>
      <SEOHelmet
        title="Contract Agreement"
        description="Contract agreement documents for Municipality of Quezon, Bukidnon projects and services."
        keywords="contract agreement, procurement, Quezon Bukidnon, transparency"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency/contract-agreement`}
      />

      <Header />
      
      <main className="min-h-screen bg-background" id="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">Contract Agreement</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Active Contracts</h2>
                
                <div className="grid gap-6">
                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <FileCheck className="h-8 w-8 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Infrastructure Development Contract</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contractor:</strong> General Construction Corp.
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contract Value:</strong> ₱15,750,000.00
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contract Period:</strong> March 1, 2025 - August 28, 2025
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Status:</strong> <span className="text-green-600 font-semibold">Active</span>
                        </p>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download Contract</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <FileCheck className="h-8 w-8 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Medical Equipment Supply Contract</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contractor:</strong> HealthTech Solutions Inc.
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contract Value:</strong> ₱2,500,000.00
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Contract Period:</strong> March 5, 2025 - May 4, 2025
                        </p>
                        <p className="text-muted-foreground mb-3">
                          <strong>Status:</strong> <span className="text-green-600 font-semibold">Active</span>
                        </p>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary/80">
                          <Download className="h-4 w-4" />
                          <span className="text-sm">Download Contract</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Completed Contracts</h2>
                <div className="grid gap-4">
                  <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">2024 Completed Contracts</h3>
                          <p className="text-sm text-muted-foreground">Archive of all completed contracts in 2024</p>
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
                          <h3 className="font-semibold">2023 Completed Contracts</h3>
                          <p className="text-sm text-muted-foreground">Archive of all completed contracts in 2023</p>
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
                <h2 className="text-2xl font-semibold text-primary mb-4">Contract Information</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Transparency Policy</h3>
                  <p className="mb-4">
                    In line with our commitment to transparency and good governance, all contract agreements 
                    entered into by the Municipality of Quezon are made available to the public in accordance 
                    with applicable laws and regulations.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>All contracts above the threshold amount are published</li>
                    <li>Personal information is redacted to protect privacy</li>
                    <li>Contract modifications and amendments are also published</li>
                    <li>Regular monitoring reports are available upon request</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Contact Information</h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="mb-4">
                    For inquiries regarding contract agreements:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Contract Management Office</strong></p>
                    <p><strong>Email:</strong> contracts@quezonbukidnon.gov.ph</p>
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