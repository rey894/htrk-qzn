import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Import images from assets
import whiteRockImg from "@/assets/quezon-white-rock-formation-bukidnon.jpg";
import pineappleFieldsImg from "@/assets/quezon-agricultural-pineapple-fields.jpg";
import sugarFieldsImg from "@/assets/sugar-fields.jpg";
import manoboFestivalImg from "@/assets/quezon-manobo-cultural-festival-dance.jpg";
import manoboElderImg from "@/assets/quezon-indigenous-manobo-elder-traditional-costume.jpg";
import pulanguiCanyonImg from "@/assets/pulangui-river-canyon-1.jpg";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: whiteRockImg,
    alt: "Kiokong White Rock Wall - Natural limestone formation",
    caption: "Kiokong White Rock Wall - A stunning natural limestone formation unique to Quezon, Bukidnon"
  },
  {
    id: "2",
    src: pineappleFieldsImg,
    alt: "Vast pineapple plantations in Quezon",
    caption: "Expansive pineapple fields - Part of our thriving agricultural industry"
  },
  {
    id: "3",
    src: sugarFieldsImg,
    alt: "Sugarcane fields during harvest season",
    caption: "Golden sugarcane fields - Quezon produces 45% of Bukidnon's sugar"
  },
  {
    id: "4",
    src: manoboFestivalImg,
    alt: "Manobo cultural dance performance",
    caption: "Manobo Cultural Festival - Celebrating our indigenous heritage"
  },
  {
    id: "5",
    src: manoboElderImg,
    alt: "Manobo elder in traditional costume",
    caption: "Manobo elder in traditional attire - Preserving ancestral traditions"
  },
  {
    id: "6",
    src: pulanguiCanyonImg,
    alt: "Pulangui River Canyon scenic view",
    caption: "Pulangui River Canyon - Natural beauty along our historic river"
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item: GalleryItem) => {
    const index = galleryItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + galleryItems.length) % galleryItems.length
      : (currentIndex + 1) % galleryItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  return (
    <>
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Photo Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the natural beauty, rich culture, and vibrant community of our beloved municipality
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {galleryItems.map((item) => (
                  <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.caption}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 md:left-4" />
              <CarouselNext className="right-2 md:right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0" aria-describedby={undefined}>
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.alt || "Gallery Image"}</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            {selectedImage && (
              <div className="flex flex-col">
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>
                
                {/* Caption */}
                <div className="bg-black/80 text-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm md:text-base leading-relaxed">
                        {selectedImage.caption}
                      </p>
                    </div>
                    <div className="text-sm text-white/60 whitespace-nowrap">
                      {currentIndex + 1} / {galleryItems.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
