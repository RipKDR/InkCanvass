import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: "🎨",
    title: "Custom Design",
    description: "Work directly with our artists to create unique, personalized designs that tell your story.",
    price: "From $200",
  },
  {
    icon: "✏️", 
    title: "Flash Tattoos",
    description: "Choose from our extensive collection of pre-designed flash pieces ready to ink.",
    price: "From $150",
  },
  {
    icon: "🔄",
    title: "Cover-ups",
    description: "Transform existing tattoos with expert cover-up work and creative redesign solutions.",
    price: "Consultation Required",
  },
  {
    icon: "👥",
    title: "Group Sessions",
    description: "Special group booking rates for friends or couples getting tattooed together.",
    price: "10% Discount",
  },
  {
    icon: "🩹",
    title: "Aftercare",
    description: "Comprehensive aftercare support and premium healing products to ensure perfect results.",
    price: "Included",
  },
  {
    icon: "💭",
    title: "Consultation",
    description: "Free consultation to discuss your ideas, placement, sizing, and pricing.",
    price: "Free",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h1>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              From consultation to completion, we offer comprehensive tattoo services 
              with the highest standards of artistry and safety.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.title} className="p-8 bg-zinc-800/50 border border-zinc-700/50 hover:border-red-800/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-red-800/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-800/30 transition-colors">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-cinzel text-xl mb-4">{service.title}</h3>
                <p className="opacity-80 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-red-400 font-medium">{service.price}</div>
              </Card>
            ))}
          </div>

          {/* Process Section */}
          <div className="bg-zinc-900/50 p-12 border border-zinc-700/50 mb-16">
            <h2 className="text-cinzel text-4xl text-center mb-12 relative inline-block">
              Our Process
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-800"></span>
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-cinzel">
                  1
                </div>
                <h4 className="text-lg font-semibold mb-2">Consultation</h4>
                <p className="opacity-80 text-sm">Discuss your vision, placement, and design ideas</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-cinzel">
                  2
                </div>
                <h4 className="text-lg font-semibold mb-2">Design</h4>
                <p className="opacity-80 text-sm">Custom artwork creation and refinement</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-cinzel">
                  3
                </div>
                <h4 className="text-lg font-semibold mb-2">Tattooing</h4>
                <p className="opacity-80 text-sm">Professional application with sterile equipment</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-cinzel">
                  4
                </div>
                <h4 className="text-lg font-semibold mb-2">Aftercare</h4>
                <p className="opacity-80 text-sm">Comprehensive healing guidance and support</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-cinzel text-4xl mb-6">Ready to Begin?</h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Start your tattoo journey with a free consultation. We'll discuss your ideas and create the perfect design for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/booking">
                <Button className="bg-red-800 hover:bg-red-700 px-10 py-4 text-lg uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-zinc-50/20 hover:border-red-800 hover:text-red-800 px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                  Ask Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
