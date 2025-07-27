import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScrollIndicator from "@/components/ScrollIndicator";
import type { Artist, GalleryItem } from "@shared/schema";

export default function Home() {
  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const { data: galleryItems = [] } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  const featuredItems = galleryItems.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
        <div className="hero-bg-text absolute top-1/2 right-0 transform -translate-y-1/2 rotate-90 select-none">
          TATTOO
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-cinzel text-6xl lg:text-8xl xl:text-9xl font-normal leading-none uppercase mb-6 animate-fade-in-up">
                <span className="block text-zinc-50">Ink</span>
                <span className="block text-red-800 ml-8 lg:ml-16">Your</span>
                <span className="block text-zinc-50">Story</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-80 max-w-2xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Melbourne's most respected tattoo studio, where artistry meets precision. Home to master artists specializing in realism, fine line, and blackwork.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <Link href="/gallery">
                  <Button className="bg-red-800 hover:bg-red-700 px-10 py-4 text-lg uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300">
                    View Gallery
                  </Button>
                </Link>
                <Link href="/artists">
                  <Button variant="outline" className="border-zinc-50/20 hover:border-red-800 hover:text-red-800 px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                    Meet Artists
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 lg:h-[600px] bg-zinc-800 relative overflow-hidden transform rotate-2 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern tattoo studio interior with professional equipment" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-zinc-950/90 backdrop-blur-sm border border-red-900/20 p-6">
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-cinzel text-3xl text-red-800">15+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cinzel text-3xl text-red-800">{artists.length}</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Artists</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cinzel text-3xl text-red-800">1K+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Pieces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="hero-bg-text absolute top-1/4 left-0 transform -rotate-90 select-none">
          GALLERY
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Our Work
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              A showcase of our finest tattoo artistry across multiple styles and techniques, 
              each piece telling a unique story through ink.
            </p>
          </div>
          
          <div className="gallery-masonry">
            {featuredItems.map((item) => (
              <Card key={item.id} className="gallery-item bg-zinc-800 overflow-hidden hover:transform hover:scale-105 transition-all duration-500 group cursor-pointer border-zinc-700">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="p-4">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm opacity-60">By {artists.find(a => a.id === item.artistId)?.name}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button variant="outline" className="border-red-800 text-red-800 hover:bg-red-800 hover:text-zinc-50 px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artists Preview */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="hero-bg-text absolute top-1/2 right-0 transform -translate-y-1/2 rotate-90 select-none">
          ARTISTS
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Our Artists
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h2>
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
                
                <h3 className="text-cinzel text-2xl text-center mb-2">{artist.name}</h3>
                <p className="text-center opacity-70 mb-6">{artist.specialty}</p>
                
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

      {/* CTA Section */}
      <section className="py-24 bg-zinc-950 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-red-800/10 to-transparent rounded-full animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <h2 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
            Ready to Start?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-800"></span>
          </h2>
          <p className="text-xl opacity-80 mb-8 leading-relaxed">
            Book your consultation today and begin your journey to exceptional tattoo artistry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <Button className="bg-red-800 hover:bg-red-700 px-10 py-4 text-lg uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300">
                Book Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-zinc-50/20 hover:border-red-800 hover:text-red-800 px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
