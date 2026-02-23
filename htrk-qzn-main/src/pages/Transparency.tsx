import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Eye, 
  Download, 
  Calendar, 
  Search, 
  ExternalLink,
  Shield,
  DollarSign,
  Award,
  Gavel,
  Bell,
  Scroll,
  Sprout
} from "lucide-react";
import { SEOHelmet } from "@/components/seo/SEOHelmet";
import { Link } from "react-router-dom";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator";

const Transparency = () => {
  const fullDisclosureReports = [
    {
      title: "Full Disclosure Policy Report 2024",
      type: "Annual Report",
      date: "January 2024",
      size: "3.2 MB",
      downloads: 1547
    },
    {
      title: "Budget Transparency Report Q4 2023",
      type: "Quarterly",
      date: "December 2023",
      size: "1.8 MB", 
      downloads: 892
    },
    {
      title: "Financial Transparency Statement 2023",
      type: "Annual Report",
      date: "February 2024",
      size: "2.4 MB",
      downloads: 1203
    }
  ];

  const lgsfReports = [
    {
      title: "Local Government Support Fund Utilization 2023",
      type: "Annual Report",
      date: "March 2024",
      size: "2.1 MB",
      downloads: 743
    },
    {
      title: "LGSF Projects Implementation Report",
      type: "Project Report",
      date: "February 2024",
      size: "1.6 MB",
      downloads: 564
    }
  ];

  const bayanihanGrants = [
    {
      title: "Bayanihan Grant Program Report 2023",
      type: "Program Report",
      date: "January 2024",
      size: "1.9 MB",
      downloads: 687
    },
    {
      title: "Bayanihan Emergency Assistance Summary",
      type: "Summary Report",
      date: "December 2023",
      size: "1.2 MB",
      downloads: 445
    }
  ];

  const procurementDocuments = [
    {
      title: "Infrastructure Development Project Bid",
      category: "Infrastructure",
      budget: "₱25,000,000",
      deadline: "March 25, 2024",
      status: "Open"
    },
    {
      title: "IT Equipment and Software Procurement",
      category: "Technology",
      budget: "₱5,500,000",
      deadline: "March 20, 2024",
      status: "Pre-bid"
    },
    {
      title: "Medical Equipment for Health Centers",
      category: "Healthcare",
      budget: "₱8,750,000",
      deadline: "March 30, 2024",
      status: "Open"
    }
  ];

  const awards = [
    {
      title: "Infrastructure Development Project - Award Notice",
      contractor: "ABC Construction Corp.",
      amount: "₱18,500,000",
      date: "February 15, 2024"
    },
    {
      title: "School Building Construction - Award Notice",
      contractor: "XYZ Builders Inc.",
      amount: "₱12,300,000",
      date: "February 10, 2024"
    }
  ];

  const contracts = [
    {
      title: "Road Maintenance Services Contract",
      contractor: "Highway Solutions Ltd.",
      duration: "12 months",
      amount: "₱15,200,000",
      date: "March 1, 2024"
    },
    {
      title: "Waste Management Services Agreement",
      contractor: "EcoClean Services",
      duration: "24 months", 
      amount: "₱9,800,000",
      date: "February 28, 2024"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Transparency"
        description="Access transparency reports, full disclosure documents, LGSF reports, Bayanihan grants, procurement notices, and contract agreements for Quezon, Bukidnon."
        keywords="transparency, full disclosure, LGSF, Bayanihan grant, procurement, contracts, awards, Quezon Bukidnon"
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/transparency`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Open Government
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold">
                Transparency
              </h1>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>

        {/* Navigation Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="disclosure" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-1 mb-8 p-0 rounded-none min-h-0">
                <TabsTrigger value="disclosure" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Full Disclosure
                </TabsTrigger>
                <TabsTrigger value="lgsf" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  LGSF
                </TabsTrigger>
                <TabsTrigger value="bayanihan" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Bayanihan Grant
                </TabsTrigger>
                <TabsTrigger value="bid" className="flex items-center gap-2">
                  <Gavel className="h-4 w-4" />
                  Invitation to Bid
                </TabsTrigger>
                <TabsTrigger value="award" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notice of Award
                </TabsTrigger>
                <TabsTrigger value="contracts" className="flex items-center gap-2">
                  <Scroll className="h-4 w-4" />
                  Contract Agreements
                </TabsTrigger>
                <TabsTrigger value="sagip-saka" className="flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  Sagip Saka
                </TabsTrigger>
              </TabsList>

              {/* Full Disclosure Tab */}
              <TabsContent value="disclosure" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Full Disclosure Policy</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Access comprehensive reports on municipal finances, projects, and governance practices
                  </p>
                </div>

                <div className="grid gap-6">
                  {fullDisclosureReports.map((report, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{report.title}</h3>
                              <Badge variant="outline">{report.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {report.date}
                              </span>
                              <span>Size: {report.size}</span>
                              <span>{report.downloads} downloads</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* LGSF Tab */}
              <TabsContent value="lgsf" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Local Government Support Fund</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Reports and documentation on LGSF utilization and project implementation
                  </p>
                </div>

                <div className="grid gap-6">
                  {lgsfReports.map((report, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{report.title}</h3>
                              <Badge variant="outline">{report.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {report.date}
                              </span>
                              <span>Size: {report.size}</span>
                              <span>{report.downloads} downloads</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Bayanihan Grant Tab */}
              <TabsContent value="bayanihan" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Bayanihan Grant</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Documentation of Bayanihan Grant programs and emergency assistance initiatives
                  </p>
                </div>

                <div className="grid gap-6">
                  {bayanihanGrants.map((report, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{report.title}</h3>
                              <Badge variant="outline">{report.type}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {report.date}
                              </span>
                              <span>Size: {report.size}</span>
                              <span>{report.downloads} downloads</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Invitation to Bid Tab */}
              <TabsContent value="bid" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Invitation to Bid</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Current procurement opportunities and bidding announcements
                  </p>
                </div>

                <div className="grid gap-6">
                  {procurementDocuments.map((notice, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{notice.title}</h3>
                              <Badge 
                                variant={notice.status === 'Open' ? 'default' : 'secondary'}
                                className={notice.status === 'Open' ? 'bg-green-500' : ''}
                              >
                                {notice.status}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Category: </span>
                                <span className="font-medium">{notice.category}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Budget: </span>
                                <span className="font-medium text-primary">{notice.budget}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deadline: </span>
                                <span className="font-medium">{notice.deadline}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">
                              Download Documents
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Notice of Award Tab */}
              <TabsContent value="award" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Notice of Award</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Published awards and successful bidders for municipal projects
                  </p>
                </div>

                <div className="grid gap-6">
                  {awards.map((award, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-3">{award.title}</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Contractor: </span>
                                <span className="font-medium">{award.contractor}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount: </span>
                                <span className="font-medium text-primary">{award.amount}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Award Date: </span>
                                <span className="font-medium">{award.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Notice
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contract Agreements Tab */}
              <TabsContent value="contracts" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Contract Agreements</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Executed contracts and agreements for municipal projects and services
                  </p>
                </div>

                <div className="grid gap-6">
                  {contracts.map((contract, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-3">{contract.title}</h3>
                            <div className="grid md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Contractor: </span>
                                <span className="font-medium">{contract.contractor}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Duration: </span>
                                <span className="font-medium">{contract.duration}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount: </span>
                                <span className="font-medium text-primary">{contract.amount}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Date: </span>
                                <span className="font-medium">{contract.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Contract
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sagip Saka Tab */}
              <TabsContent value="sagip-saka" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Sagip Saka</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Program supporting local farmers and fisherfolk under Republic Act 11321
                  </p>
                  <Button asChild className="mt-6">
                    <Link to="/transparency/sagip-saka">View Sagip Saka Page</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Transparency;