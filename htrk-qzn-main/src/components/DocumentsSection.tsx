import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Download, FileText, Briefcase, Building2, Heart, Users } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';

const categoryIcons = {
  business: Briefcase,
  construction: Building2,
  social: Heart,
  civil: Users,
  default: FileText
};

const categories = [
  { value: '', label: 'All Documents' },
  { value: 'business', label: 'Business & Commerce' },
  { value: 'construction', label: 'Construction & Engineering' },
  { value: 'social', label: 'Social Services' },
  { value: 'civil', label: 'Civil Registry' }
];

export function DocumentsSection() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { documents, loading, downloadDocument } = useDocuments(selectedCategory || undefined);

  const handleDownload = async (document: any) => {
    await downloadDocument(document.id);
    // In a real implementation, you would also trigger the actual file download
    window.open(document.file_url, '_blank');
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Download Center
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Forms & Documents
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access essential municipal forms, requirements, and documentation for various services
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-md mx-auto mb-12">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Documents - Carousel on mobile, Grid on desktop */}
        <div className="block md:hidden">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-2 basis-full">
                    <Card className="shadow-card">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-8 w-8 rounded-lg" />
                          <Skeleton className="h-4 w-10" />
                        </div>
                        <Skeleton className="h-6 w-full" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-12 w-full mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                documents.map((document) => {
                  const IconComponent = categoryIcons[document.category as keyof typeof categoryIcons] || categoryIcons.default;
                  
                  return (
                    <CarouselItem key={document.id} className="pl-2 basis-full">
                      <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 group h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform">
                              <IconComponent className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {document.file_type}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {document.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-3">
                            {document.description}
                          </CardDescription>
                          
                          {document.department && (
                            <div className="text-xs text-muted-foreground mb-2">
                              Department: {document.department}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            {document.file_size && (
                              <span>Size: {formatFileSize(document.file_size)}</span>
                            )}
                            <span>Downloads: {document.download_count}</span>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                            onClick={() => handleDownload(document)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })
              )}
            </CarouselContent>
            <CarouselPrevious className="left-0 hidden sm:flex" />
            <CarouselNext className="right-0 hidden sm:flex" />
          </Carousel>
        </div>

        {/* Grid on desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            documents.map((document) => {
              const IconComponent = categoryIcons[document.category as keyof typeof categoryIcons] || categoryIcons.default;
              
              return (
                <Card key={document.id} className="shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform">
                        <IconComponent className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {document.file_type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {document.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-3">
                      {document.description}
                    </CardDescription>
                    
                    {document.department && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Department: {document.department}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      {document.file_size && (
                        <span>Size: {formatFileSize(document.file_size)}</span>
                      )}
                      <span>Downloads: {document.download_count}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => handleDownload(document)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {!loading && documents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No documents found
            </h3>
            <p className="text-muted-foreground">
              {selectedCategory 
                ? 'No documents available in this category.' 
                : 'No documents are currently available for download.'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}