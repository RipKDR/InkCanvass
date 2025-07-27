import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
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
              <div key={i} className="p-8">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
                <Skeleton className="h-8 w-48 mx-auto mb-4" />
                <Skeleton className="h-4 w-32 mx-auto mb-6" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Artists Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          ARTISTS
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10 text-center">
          <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-6">
            Master Artists
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed mb-12">
            Meet the exceptional talents behind Berserk Tattoos. Each master artist brings years of experience, 
            unique vision, and unparalleled skill to create extraordinary tattoo artistry.
          </p>
          
          {/* Philosophy Section */}
          <div className="max-w-4xl mx-auto border-t border-[rgba(242,242,242,0.1)] pt-12">
            <h2 className="font-cinzel text-3xl mb-6 text-[#7B1113]">Our Philosophy</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              At Berserk Tattoos, we believe that every tattoo is a collaboration between artist and client. 
              Our masters don't just create art; they craft personal stories, meaningful symbols, and 
              timeless pieces that become part of who you are.
            </p>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="grid lg:grid-cols-3 gap-12">
            {artists.map((artist, index) => (
              <div key={artist.id} className="group">
                {/* Artist Card */}
                <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] overflow-hidden hover:border-opacity-100 hover:-translate-y-2 transition-all duration-500" style={{borderColor: `${artist.themeColor}30`}}>
                  {/* Color Accent */}
                  <div 
                    className="w-0 h-1 group-hover:w-full transition-all duration-500"
                    style={{backgroundColor: artist.themeColor}}
                  ></div>
                  
                  {/* Artist Image */}
                  <div className="p-8">
                    <div className="relative w-48 h-48 mx-auto mb-8">
                      <div className="w-full h-full bg-[#333] rounded-full overflow-hidden border-2 border-[rgba(242,242,242,0.1)] group-hover:border-opacity-100 transition-all duration-300" style={{borderColor: `${artist.themeColor}50`}}>
                        <img 
                          src={artist.profileImage} 
                          alt={`${artist.name} - Master Tattoo Artist`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      
                      {/* Artist Badge */}
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#111111] border border-[rgba(242,242,242,0.2)] px-4 py-2 text-xs uppercase tracking-wider" style={{color: artist.themeColor}}>
                        Master Artist
                      </div>
                    </div>
                    
                    {/* Artist Info */}
                    <div className="text-center mb-8">
                      <h3 className="font-cinzel text-3xl mb-2">{artist.name}</h3>
                      <p className="text-lg opacity-70 mb-4" style={{color: artist.themeColor}}>{artist.specialty}</p>
                      <p className="text-sm opacity-80 leading-relaxed max-w-md mx-auto">{artist.bio}</p>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)]">
                        <div className="font-cinzel text-2xl mb-1" style={{color: artist.themeColor}}>{artist.yearsExperience}+</div>
                        <div className="text-xs opacity-60 uppercase tracking-wider">Years</div>
                      </div>
                      <div className="text-center p-4 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)]">
                        <div className="font-cinzel text-2xl mb-1" style={{color: artist.themeColor}}>{artist.totalPieces}+</div>
                        <div className="text-xs opacity-60 uppercase tracking-wider">Pieces</div>
                      </div>
                      <div className="text-center p-4 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)]">
                        <div className="font-cinzel text-2xl mb-1" style={{color: artist.themeColor}}>★★★★★</div>
                        <div className="text-xs opacity-60 uppercase tracking-wider">Rating</div>
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium opacity-70 uppercase tracking-wider mb-4">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {artist.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-3 py-1 text-xs border border-opacity-30 uppercase tracking-wider hover:bg-opacity-10 transition-all duration-300" 
                            style={{
                              borderColor: artist.themeColor,
                              color: artist.themeColor,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <Link href={`/artists/${artist.id}`} className="flex-1">
                        <button 
                          className="w-full py-3 text-sm uppercase tracking-wider transition-all duration-300 border hover:bg-opacity-10"
                          style={{
                            borderColor: artist.themeColor,
                            color: artist.themeColor,
                          }}
                        >
                          View Portfolio
                        </button>
                      </Link>
                      <Link href="/booking" className="flex-1">
                        <button 
                          className="w-full py-3 text-sm uppercase tracking-wider transition-all duration-300 hover:bg-opacity-90"
                          style={{
                            backgroundColor: artist.themeColor,
                            color: '#F2F2F2',
                          }}
                        >
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Quote/Testimonial */}
                <div className="mt-8 p-6 bg-[rgba(242,242,242,0.02)] border-l-4" style={{borderColor: artist.themeColor}}>
                  <blockquote className="text-sm italic opacity-80 leading-relaxed mb-4">
                    "Every tattoo is a story waiting to be told. My role is to help you tell yours with the artistry it deserves."
                  </blockquote>
                  <cite className="text-xs opacity-60 uppercase tracking-wider">— {artist.name}</cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#0a0a0a] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(123,17,19,0.1)] to-transparent rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-[5%] relative z-10">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            Ready to Begin?
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 mb-12 leading-relaxed">
            Choose your artist and start your journey towards exceptional tattoo artistry. 
            Each consultation is an opportunity to create something truly extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                Book Consultation
              </button>
            </Link>
            <Link href="/gallery">
              <button className="border border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                View Gallery
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}