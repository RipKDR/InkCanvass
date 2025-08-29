import { Link } from "wouter";
import SocialLinks from "@/components/SocialLinks";
import { studio } from "@/content/studio";

export default function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-cinzel text-2xl tracking-wider mb-4">{studio.name.toUpperCase()}</div>
            <p className="opacity-80 leading-relaxed">
              Melbourne's premier tattoo studio. Exceptional artistry. Professional care.
            </p>
            <div className="mt-4">
              <SocialLinks items={studio.socials} />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/gallery" className="block opacity-80 hover:opacity-100 hover:text-red-800 transition-all duration-300">
                Gallery
              </Link>
              <Link href="/artists" className="block opacity-80 hover:opacity-100 hover:text-red-800 transition-all duration-300">
                Artists
              </Link>
              <Link href="/services" className="block opacity-80 hover:opacity-100 hover:text-red-800 transition-all duration-300">
                Services
              </Link>
              <Link href="/booking" className="block opacity-80 hover:opacity-100 hover:text-red-800 transition-all duration-300">
                Booking
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <div className="space-y-2">
              <div className="opacity-80">Custom Tattoos</div>
              <div className="opacity-80">Cover-ups</div>
              <div className="opacity-80">Flash Designs</div>
              <div className="opacity-80">Consultations</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-2 opacity-80">
              <a href={studio.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-red-800 transition-colors">
                {studio.address}
              </a>
              <a href={`tel:${studio.phone.replace(/\s+/g, '')}`} className="block hover:text-red-800 transition-colors">
                {studio.phone}
              </a>
              <a href={`mailto:${studio.email}`} className="block hover:text-red-800 transition-colors">
                {studio.email}
              </a>
              <div className="pt-2">
                <div className="text-sm opacity-60">Hours</div>
                {studio.hours.map((h) => (
                  <div key={h.day} className="text-sm opacity-70">{h.day}: {h.time}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-red-900/20 pt-8 mt-8 text-center opacity-60">
          <p>&copy; 2024 {studio.name}. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
