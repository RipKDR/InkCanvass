import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryItem, Artist } from "@shared/schema";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const filters = ["All", "Realism", "Fine Line", "Blackwork", "Traditional"];
  
  const filteredItems = activeFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.style === activeFilter);

  const getArtistName = (artistId: string) => {
    const artist = artists.find(a => a.id === artistId);
    return artist ? artist.name : "Unknown Artist";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-16 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="gallery-masonry">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-64 mb-6" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="hero-bg-text absolute top-1/4 left-0 transform -rotate-90 select-none">
          GALLERY
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Our Gallery
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h1>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              A showcase of our finest tattoo artistry across multiple styles and techniques, 
              each piece telling a unique story through ink.
            </p>
          </div>
          
          {/* Gallery Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-red-800 hover:bg-red-700"
                    : "border-zinc-500/20 hover:border-red-800 hover:text-red-800"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="gallery-masonry">
            {filteredItems.map((item) => (
              <Card key={item.id} className="gallery-item bg-zinc-800 overflow-hidden hover:transform hover:scale-105 transition-all duration-500 group cursor-pointer border-zinc-700">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-red-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-zinc-50 text-sm uppercase tracking-wider">View Project</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm opacity-60 mb-2">By {getArtistName(item.artistId)}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-red-800/20 text-red-400 rounded uppercase tracking-wider">
                    {item.style}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-24">
              <p className="text-xl opacity-60">No items found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
