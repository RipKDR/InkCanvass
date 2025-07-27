import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist, GalleryItem } from "@shared/schema";

export default function ArtistProfile() {
  const [match, params] = useRoute("/artists/:id");
  const artistId = params?.id;

  const { data: artist, isLoading: artistLoading } = useQuery<Artist>({
    queryKey: ['/api/artists', artistId],
    enabled: !!artistId,
  });

  const { data: galleryItems = [], isLoading: galleryLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery', { artist: artistId }],
    enabled: !!artistId,
  });

  if (artistLoading || galleryLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-16">
            <Skeleton className="h-96 w-full" />
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Artist Not Found</h1>
          <Link href="/artists">
            <Button variant="outline">Back to Artists</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <Link href="/artists" className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-800 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Artists
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Artist Info */}
            <div className="space-y-8">
              <Card className="bg-zinc-800/50 border border-zinc-700/50 p-8" style={{borderColor: `${artist.themeColor}50`}}>
                <div 
                  className="w-full h-1 mb-6"
                  style={{backgroundColor: artist.themeColor}}
                ></div>
                
                <div className="w-48 h-48 bg-zinc-700 rounded-full mx-auto mb-6 relative overflow-hidden">
                  <img 
                    src={artist.profileImage} 
                    alt={`${artist.name} - ${artist.specialty}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <h1 className="text-cinzel text-3xl text-center mb-2">{artist.name}</h1>
                <p className="text-center opacity-70 mb-6 text-lg">{artist.specialty}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-zinc-800/50 border border-zinc-700/50">
                    <div className="text-cinzel text-2xl" style={{color: artist.themeColor}}>{artist.yearsExperience}+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/50 border border-zinc-700/50">
                    <div className="text-cinzel text-2xl" style={{color: artist.themeColor}}>{artist.totalPieces}+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Pieces</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.skills.map((skill) => (
                    <span key={skill} className="px-3 py-2 text-sm border border-opacity-30 uppercase tracking-wider" style={{borderColor: artist.themeColor}}>
                      {skill}
                    </span>
                  ))}
                </div>
                
                <Link href="/booking">
                  <Button 
                    className="w-full py-3 uppercase tracking-wider text-sm transition-all duration-300"
                    style={{
                      backgroundColor: artist.themeColor,
                      borderColor: artist.themeColor,
                    }}
                  >
                    Book with {artist.name.split(' ')[0]}
                  </Button>
                </Link>
              </Card>
            </div>
            
            {/* Artist Bio & Portfolio */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-cinzel text-4xl mb-6 relative inline-block">
                  About {artist.name.split(' ')[0]}
                  <span className="absolute bottom-0 left-0 w-16 h-1" style={{backgroundColor: artist.themeColor}}></span>
                </h2>
                <p className="text-lg opacity-80 leading-relaxed">
                  {artist.bio}
                </p>
              </div>
              
              <div>
                <h2 className="text-cinzel text-4xl mb-6 relative inline-block">
                  Portfolio
                  <span className="absolute bottom-0 left-0 w-16 h-1" style={{backgroundColor: artist.themeColor}}></span>
                </h2>
                
                {galleryItems.length > 0 ? (
                  <div className="gallery-masonry">
                    {galleryItems.map((item) => (
                      <Card key={item.id} className="gallery-item bg-zinc-800 overflow-hidden hover:transform hover:scale-105 transition-all duration-500 group cursor-pointer border-zinc-700">
                        <div className="relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 text-zinc-50">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm opacity-80">{item.style}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-zinc-800/30 border border-zinc-700/50">
                    <p className="text-zinc-400">No portfolio items available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
