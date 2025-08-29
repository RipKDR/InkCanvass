import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryItem, Artist } from "@shared/schema";
import useGalleryQuickView from "@/components/GalleryQuickView";
import { useTitle } from "@/lib/useTitle";
import { Search } from "lucide-react";
import InstagramFeed from "@/components/InstagramFeed";
import { studio } from "@/content/studio";

export default function Gallery() {
  useTitle("Berserk Tattoos | Gallery");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const filters = ["All", "Realism", "Fine Line", "Blackwork", "Traditional"];
  
  const filteredItems = galleryItems.filter(item => {
    const matchesFilter = activeFilter === "All" || item.style === activeFilter;
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.style.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const { openItem, QuickView } = useGalleryQuickView({ items: filteredItems, artists });

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
    <div className="min-h-screen">
      {/* Gallery Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.5em] select-none whitespace-nowrap">
          GALLERY
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10">
          <div className="text-center">
            <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-4">
              Our Gallery
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto leading-relaxed mb-12">
              Discover our finest tattoo artistry across multiple styles and techniques, 
              each piece telling a unique story through ink.
            </p>
            
            {/* Gallery Stats */}
            <div className="flex justify-center gap-16 pt-8 border-t border-[rgba(242,242,242,0.1)]">
              <div className="text-center">
                <div className="font-cinzel text-3xl text-[#7B1113]">{galleryItems.length}+</div>
                <div className="text-sm opacity-60 uppercase tracking-wider">Artworks</div>
              </div>
              <div className="text-center">
                <div className="font-cinzel text-3xl text-[#7B1113]">{filters.length - 1}</div>
                <div className="text-sm opacity-60 uppercase tracking-wider">Styles</div>
              </div>
              <div className="text-center">
                <div className="font-cinzel text-3xl text-[#7B1113]">{artists.length}</div>
                <div className="text-sm opacity-60 uppercase tracking-wider">Artists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#111111] sticky top-20 z-40 border-b border-[rgba(123,17,19,0.2)]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 pr-12 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm tracking-wide focus:outline-none focus:border-[#7B1113] focus:bg-[rgba(123,17,19,0.05)] transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg opacity-50">
                <Search className="w-5 h-5" />
              </div>
            </div>

            {/* View Modes */}
            <div className="flex gap-2">
              <button className="px-4 py-3 bg-[#7B1113] border border-[#7B1113] text-[#F2F2F2] text-sm transition-all duration-300">
                Grid
              </button>
              <button className="px-4 py-3 border border-[rgba(242,242,242,0.2)] text-[#F2F2F2] text-sm hover:border-[#7B1113] transition-all duration-300">
                List
              </button>
            </div>
          </div>
          
          {/* Filter Options */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#7B1113] text-[#F2F2F2] border border-[#7B1113]"
                    : "border border-[rgba(242,242,242,0.2)] text-[#F2F2F2] hover:border-[#7B1113] hover:text-[#7B1113]"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          {filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] overflow-hidden hover:border-[#7B1113] hover:transform hover:scale-105 transition-all duration-500 group cursor-pointer" onClick={() => openItem(item)}>
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={320}
                    />
                    <div className="absolute inset-0 bg-[rgba(123,17,19,0.9)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                      <h4 className="text-[#F2F2F2] font-medium text-lg mb-2">{item.title}</h4>
                      <p className="text-[#F2F2F2] opacity-80 text-sm mb-4">By {getArtistName(item.artistId)}</p>
                      <span className="text-[#F2F2F2] text-sm uppercase tracking-wider border border-[#F2F2F2] px-3 py-1">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      <span className="text-xs bg-[rgba(123,17,19,0.2)] text-[#7B1113] px-2 py-1 uppercase tracking-wider">
                        {item.style}
                      </span>
                    </div>
                    <p className="text-sm opacity-60 mb-4">By {getArtistName(item.artistId)}</p>
                    {item.description && (
                      <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="font-cinzel text-2xl mb-4">No Artworks Found</h3>
              <p className="text-lg opacity-60 mb-8">
                {searchTerm 
                  ? `No results found for "${searchTerm}" in ${activeFilter === "All" ? "all categories" : activeFilter}`
                  : `No artworks found in ${activeFilter} category`
                }
              </p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchTerm("");
                }}
                className="border border-[#7B1113] text-[#7B1113] hover:bg-[#7B1113] hover:text-[#F2F2F2] px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300"
              >
                View All Artworks
              </button>
            </div>
          )}
          {QuickView}
        </div>
      </section>

      {/* Latest from Instagram */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              Latest from Instagram
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              Fresh work from our artists’ Instagram profiles.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12">
            {studio.artists.map((a) => {
              const insta = a.socials.find((s) => s.label.toLowerCase().includes('instagram'));
              if (!insta) return null;
              const match = insta.url.match(/instagram\.com\/(.+?)(\/|$)/i);
              const handle = match ? match[1] : undefined;
              if (!handle) return null;
              return (
                <div key={a.name}>
                  <h3 className="font-cinzel text-2xl mb-4">{a.name.split(' ')[0]}'s Feed</h3>
                  <InstagramFeed title="" handle={handle} profileUrl={insta.url} limit={6} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
