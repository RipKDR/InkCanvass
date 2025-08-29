import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";
import { studio } from "@/content/studio";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/artists", label: "Artists" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-zinc-950/95 backdrop-blur-md py-4' 
        : 'bg-zinc-950/85 backdrop-blur-sm py-6'
    } border-b border-red-900/20`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-cinzel text-2xl tracking-wider text-zinc-50 hover:text-red-800 transition-colors">
            BERSERK
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm uppercase tracking-wider transition-colors relative group ${
                  location === href ? 'text-red-800' : 'text-zinc-50 hover:text-red-800'
                }`}
                aria-current={location === href ? 'page' : undefined}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-px bg-red-800 transition-all duration-300 ${
                  location === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            <a href={studio.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-red-800 hover:bg-red-700 text-zinc-50 px-8 py-3 text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
                Book Now
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-zinc-50" />
            ) : (
              <Menu className="w-6 h-6 text-zinc-50" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-zinc-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    location === href ? 'text-red-800' : 'text-zinc-50 hover:text-red-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <a href={studio.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-red-800 hover:bg-red-700 text-zinc-50 w-full text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2">
                  Book Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
