import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
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
      <section className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
        {/* Background Text */}
        <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          BERSERK
        </div>
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(123, 17, 19, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(123, 17, 19, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-[5%]">
          <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="font-cinzel text-[clamp(3.5rem,10vw,8rem)] font-normal leading-[0.85] uppercase mb-6">
                <span className="block text-[#F2F2F2]">WHERE</span>
                <span className="block text-[#7B1113]">REBELLION</span>
                <span className="block text-[#F2F2F2]">MEETS</span>
                <span className="block text-[#7B1113]">REFINEMENT</span>
              </h1>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-80 leading-relaxed">
                Melbourne's premier tattoo studio, where exceptional artistry meets uncompromising craftsmanship. 
                Home to award-winning artists specializing in fine line, realism, and bold blackwork.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
                <Link href="/gallery">
                  <button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                    Explore Gallery
                  </button>
                </Link>
                <Link href="/artists">
                  <button className="border border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                    Meet Artists
                  </button>
                </Link>
              </div>

              {/* Studio Stats */}
              <div className="flex justify-center lg:justify-start gap-12 pt-8 border-t border-[rgba(242,242,242,0.1)]">
                <div className="text-center">
                  <div className="font-cinzel text-3xl text-[#7B1113]">15+</div>
                  <div className="text-sm opacity-60 uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center">
                  <div className="font-cinzel text-3xl text-[#7B1113]">{artists.length}</div>
                  <div className="text-sm opacity-60 uppercase tracking-wider">Artists</div>
                </div>
                <div className="text-center">
                  <div className="font-cinzel text-3xl text-[#7B1113]">1000+</div>
                  <div className="text-sm opacity-60 uppercase tracking-wider">Pieces</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="w-full h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#222] relative overflow-hidden transform rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional tattoo studio interior" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-cinzel text-2xl mb-2">Professional Studio</h3>
                  <p className="opacity-80">State-of-the-art equipment in a sterile, comfortable environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>

      {/* Featured Work Section */}
      <section className="py-24 bg-[#111111] relative">
        <div className="absolute top-1/4 -left-20 transform -rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          GALLERY
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              Featured Work
              <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              A curated selection of our most exceptional pieces, showcasing the diverse styles and 
              extraordinary skill of our master artists.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] overflow-hidden hover:border-[#7B1113] hover:transform hover:scale-105 transition-all duration-500 group cursor-pointer">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[rgba(123,17,19,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[#F2F2F2] text-sm uppercase tracking-wider">View Project</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-medium mb-2 text-lg">{item.title}</h4>
                  <p className="text-sm opacity-60 mb-3">By {artists.find(a => a.id === item.artistId)?.name}</p>
                  <span className="inline-block px-3 py-1 text-xs bg-[rgba(123,17,19,0.2)] text-[#7B1113] uppercase tracking-wider">
                    {item.style}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/gallery">
              <button className="border border-[#7B1113] text-[#7B1113] hover:bg-[#7B1113] hover:text-[#F2F2F2] px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300">
                View Full Gallery
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          ARTISTS
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              Master Artists
              <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              Meet the exceptional artists behind Berserk Tattoos. Each master brings years of experience 
              and unique specializations to create truly extraordinary tattoo art.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <div key={artist.id} className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8 hover:border-opacity-100 hover:-translate-y-2 transition-all duration-500 group" style={{borderColor: `${artist.themeColor}50`}}>
                <div 
                  className="w-0 h-1 group-hover:w-full transition-all duration-300 mb-6"
                  style={{backgroundColor: artist.themeColor}}
                ></div>
                
                <div className="w-32 h-32 bg-[#333] rounded-full mx-auto mb-6 relative overflow-hidden">
                  <img 
                    src={artist.profileImage} 
                    alt={`${artist.name} - ${artist.specialty}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <h3 className="font-cinzel text-2xl text-center mb-2">{artist.name}</h3>
                <p className="text-center opacity-70 mb-6">{artist.specialty}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)]">
                    <div className="font-cinzel text-xl" style={{color: artist.themeColor}}>{artist.yearsExperience}+</div>
                    <div className="text-xs opacity-60 uppercase tracking-wider">Years</div>
                  </div>
                  <div className="text-center p-3 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)]">
                    <div className="font-cinzel text-xl" style={{color: artist.themeColor}}>{artist.totalPieces}+</div>
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
                  <button 
                    className="w-full py-3 uppercase tracking-wider text-sm transition-all duration-300 border"
                    style={{
                      borderColor: artist.themeColor,
                      color: artist.themeColor,
                    }}
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#111111] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-[rgba(123,17,19,0.1)] to-transparent rounded-full"></div>
        
        <div className="max-w-4xl mx-auto px-[5%] relative z-10">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            Ready to Begin?
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 mb-8 leading-relaxed">
            Take the first step towards exceptional tattoo artistry. Book your consultation today and 
            discover how we can bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                Book Consultation
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
