import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist } from "@shared/schema";

export default function Artists() {
  const { data: artists = [], isLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-16 w-64 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="hero-bg-text absolute top-1/2 right-0 transform -translate-y-1/2 rotate-90 select-none">
          ARTISTS
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Our Artists
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h1>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              Meet the master artists behind Berserk Tattoos, each bringing years of experience 
              and unique specializations to create exceptional tattoo art.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Card key={artist.id} className="bg-zinc-800/50 border border-zinc-700/50 p-8 hover:border-opacity-100 hover:-translate-y-2 transition-all duration-500 group" style={{borderColor: `${artist.themeColor}50`}}>
                <div 
                  className="w-0 h-1 group-hover:w-full transition-all duration-300 mb-6"
                  style={{backgroundColor: artist.themeColor}}
                ></div>
                
                <div className="w-32 h-32 bg-zinc-700 rounded-full mx-auto mb-6 relative overflow-hidden">
                  <img 
                    src={artist.profileImage} 
                    alt={`${artist.name} - ${artist.specialty}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <h2 className="text-cinzel text-2xl text-center mb-2">{artist.name}</h2>
                <p className="text-center opacity-70 mb-4">{artist.specialty}</p>
                
                <p className="text-sm opacity-80 text-center mb-6 leading-relaxed">
                  {artist.bio}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-zinc-800/50 border border-zinc-700/50">
                    <div className="text-cinzel text-xl" style={{color: artist.themeColor}}>{artist.yearsExperience}+</div>
                    <div className="text-xs opacity-60 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="text-center p-3 bg-zinc-800/50 border border-zinc-700/50">
                    <div className="text-cinzel text-xl" style={{color: artist.themeColor}}>{artist.totalPieces}+</div>
                    <div className="text-xs opacity-60 uppercase tracking-wider">Pieces</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-xs border border-opacity-30 uppercase tracking-wider" style={{borderColor: artist.themeColor}}>
                      {skill}
                    </span>
                  ))}
                </div>
                
                <Link href={`/artists/${artist.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full py-3 uppercase tracking-wider text-sm transition-all duration-300"
                    style={{
                      borderColor: artist.themeColor,
                      color: artist.themeColor,
                    }}
                  >
                    View Profile
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
