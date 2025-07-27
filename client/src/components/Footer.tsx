import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-cinzel text-2xl tracking-wider mb-4">BERSERK</div>
            <p className="opacity-80 leading-relaxed">
              Melbourne's premier tattoo studio, crafting exceptional art since 2010.
            </p>
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
              <div>33 Southern Road</div>
              <div>Heidelberg Heights VIC 3081</div>
              <div>+61 478 128 212</div>
              <div>hello@berserktattoos.com.au</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-red-900/20 pt-8 mt-8 text-center opacity-60">
          <p>&copy; 2024 Berserk Tattoos. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
