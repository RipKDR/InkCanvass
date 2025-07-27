import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen pt-40">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-2 gap-16">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
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
      <div className="min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-3xl mb-4">Artist Not Found</h1>
          <Link href="/artists">
            <Button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2]">Back to Artists</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Artist Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          ARTIST
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10">
          <Link href="/artists" className="inline-flex items-center gap-2 text-[#F2F2F2] opacity-70 hover:opacity-100 hover:text-[#7B1113] transition-all duration-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Artists
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Artist Portrait */}
            <div className="relative">
              <div className="bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] p-8 relative group hover:border-[#7B1113] transition-all duration-500">
                <div className="w-0 h-1 group-hover:w-full transition-all duration-500 bg-[#7B1113] mb-8"></div>
                
                <div className="aspect-square bg-[rgba(242,242,242,0.1)] relative overflow-hidden mb-6">
                  <img 
                    src={artist.profileImage} 
                    alt={`${artist.name} - ${artist.specialty}`}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Artist Badge */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-[#7B1113] px-4 py-2 text-sm uppercase tracking-wider">
                      {artist.specialty}
                    </div>
                  </div>
                </div>
                
                {/* Experience Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="font-cinzel text-3xl text-[#7B1113] mb-2">{artist.experienceYears}+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-cinzel text-3xl text-[#7B1113] mb-2">500+</div>
                    <div className="text-sm opacity-60 uppercase tracking-wider">Tattoos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Artist Info */}
            <div>
              <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-6">
                {artist.name}
              </h1>
              
              <h2 className="text-2xl opacity-80 mb-8 relative">
                {artist.specialty} Specialist
                <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-lg opacity-80 leading-relaxed">
                  {artist.bio}
                </p>
                
                {/* Specialties */}
                <div>
                  <h3 className="font-medium mb-4">Specialties & Techniques</h3>
                  <div className="flex flex-wrap gap-3">
                    {artist.specialty.split(' & ').map((specialty, index) => (
                      <span key={index} className="bg-[rgba(123,17,19,0.1)] border border-[rgba(123,17,19,0.3)] px-4 py-2 text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Awards/Recognition */}
                <div>
                  <h3 className="font-medium mb-4">Recognition</h3>
                  <div className="space-y-2 text-sm opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#7B1113] rounded-full"></div>
                      <span>Best Realism Artist - LA Tattoo Convention 2023</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#7B1113] rounded-full"></div>
                      <span>Featured in Inked Magazine</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#7B1113] rounded-full"></div>
                      <span>Guest artist at international conventions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Book with Artist */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                    Book with {artist.name.split(' ')[0]}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300"
                >
                  View Full Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              {artist.name.split(' ')[0]}'s Portfolio
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              Explore the artistry and craftsmanship that defines {artist.name}'s unique style and approach to tattooing.
            </p>
          </div>

          {/* Gallery Grid */}
          {galleryItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] overflow-hidden hover:border-[#7B1113] transition-all duration-500 group">
                  <div className="aspect-square bg-[rgba(242,242,242,0.1)] relative overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-500"></div>
                    
                    {/* Hover Info */}
                    <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="font-cinzel text-lg mb-2">{item.title}</h3>
                      <p className="text-sm opacity-70">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm opacity-70 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#7B1113]">{item.category}</span>
                      <span className="opacity-60">{new Date(item.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[rgba(123,17,19,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="font-cinzel text-xl mb-4">Portfolio Coming Soon</h3>
              <p className="opacity-70">Check back soon to see {artist.name}'s latest work.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Artist */}
      <section className="py-24 bg-[#0a0a0a] text-center">
        <div className="max-w-4xl mx-auto px-[5%]">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            Work with {artist.name.split(' ')[0]}
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 mb-12 leading-relaxed">
            Ready to bring your vision to life? Book a consultation with {artist.name} to discuss 
            your ideas and start planning your next tattoo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <Button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                Book Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                className="border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300"
              >
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
