import { Link } from "wouter";
import { useTitle } from "@/lib/useTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Services() {
  useTitle("Berserk Tattoos | Services");
  return (
    <div className="min-h-screen">
      {/* Services Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          SERVICES
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10 text-center">
          <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-6">
            Our Services
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed mb-12">
            From concept to completion, we offer comprehensive tattoo services designed to bring your vision to life 
            with exceptional artistry and professional care.
          </p>
          
          {/* Service Categories */}
          <div className="flex justify-center items-center gap-12 pt-12 border-t border-[rgba(242,242,242,0.1)]">
            <div className="text-center">
              <div className="font-cinzel text-3xl text-[#7B1113]">Custom</div>
              <div className="text-sm opacity-60 uppercase tracking-wider">Design</div>
            </div>
            <div className="text-center">
              <div className="font-cinzel text-3xl text-[#7B1113]">Touch-Up</div>
              <div className="text-sm opacity-60 uppercase tracking-wider">Services</div>
            </div>
            <div className="text-center">
              <div className="font-cinzel text-3xl text-[#7B1113]">Cover-Up</div>
              <div className="text-sm opacity-60 uppercase tracking-wider">Specialists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Custom Tattoos */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-12 hover:border-[#7B1113] transition-all duration-500 group">
              <div className="w-0 h-1 group-hover:w-full transition-all duration-500 bg-[#7B1113] mb-8"></div>
              
              <h2 className="font-cinzel text-[clamp(2rem,5vw,3.5rem)] font-normal mb-6 relative">
                Custom Tattoos
                <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <p className="text-lg opacity-80 leading-relaxed mb-8">
                Our signature service - completely custom tattoo designs created specifically for you. 
                From initial consultation to final touch-up, we guide you through every step of creating 
                a unique piece of art that tells your story.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Personal Consultation</h4>
                    <p className="text-sm opacity-70">One-on-one discussion about your vision, style preferences, and placement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Custom Design Creation</h4>
                    <p className="text-sm opacity-70">Original artwork designed specifically for your body and aesthetic</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Professional Application</h4>
                    <p className="text-sm opacity-70">Expert tattooing in a sterile, comfortable environment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Aftercare Support</h4>
                    <p className="text-sm opacity-70">Comprehensive healing guidance and complimentary touch-ups</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-8 border-t border-[rgba(242,242,242,0.1)]">
                <div className="text-sm opacity-60 uppercase tracking-wider mb-2">Starting From</div>
                <div className="font-cinzel text-2xl text-[#7B1113]">$200</div>
              </div>
            </div>

            {/* Touch-Up & Restoration */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-12 hover:border-[#7B1113] transition-all duration-500 group">
              <div className="w-0 h-1 group-hover:w-full transition-all duration-500 bg-[#7B1113] mb-8"></div>
              
              <h2 className="font-cinzel text-[clamp(2rem,5vw,3.5rem)] font-normal mb-6 relative">
                Touch-Up & Restoration
                <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <p className="text-lg opacity-80 leading-relaxed mb-8">
                Breathe new life into existing tattoos with our professional touch-up and restoration services. 
                Whether your tattoo has faded over time or needs color refreshing, we'll restore its original vibrancy.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Color Restoration</h4>
                    <p className="text-sm opacity-70">Refresh faded colors and enhance vibrancy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Line Work Enhancement</h4>
                    <p className="text-sm opacity-70">Sharpen and define existing line work</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Detail Addition</h4>
                    <p className="text-sm opacity-70">Add new elements to enhance existing pieces</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#7B1113] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-2">Style Updates</h4>
                    <p className="text-sm opacity-70">Modernize older tattoos with contemporary techniques</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-8 border-t border-[rgba(242,242,242,0.1)]">
                <div className="text-sm opacity-60 uppercase tracking-wider mb-2">Starting From</div>
                <div className="font-cinzel text-2xl text-[#7B1113]">$150</div>
              </div>
            </div>
          </div>

          {/* Cover-Up Specialists */}
          <div className="bg-[rgba(123,17,19,0.05)] border border-[rgba(123,17,19,0.2)] p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-cinzel text-[clamp(2rem,5vw,3.5rem)] font-normal mb-6 relative inline-block">
                Cover-Up Specialists
                <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <p className="text-xl opacity-80 leading-relaxed mb-12">
                Transform unwanted tattoos into stunning new artwork. Our cover-up specialists are masters at 
                designing beautiful pieces that completely conceal old tattoos while creating something you'll love.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-medium mb-2">Creative Solutions</h4>
                  <p className="text-sm opacity-70">Innovative designs that work with your existing tattoo</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-medium mb-2">Complete Coverage</h4>
                  <p className="text-sm opacity-70">Expertly conceal old tattoos with new artwork</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h4 className="font-medium mb-2">Fresh Start</h4>
                  <p className="text-sm opacity-70">Turn regrets into beautiful new memories</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm opacity-60 uppercase tracking-wider mb-2">Consultation Required</div>
                <div className="font-cinzel text-2xl text-[#7B1113] mb-6">Free Assessment</div>
                <Link href="/booking">
                  <button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300">
                    Book Assessment
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Consultation */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8 text-center hover:border-[#7B1113] transition-all duration-300">
              <h3 className="font-cinzel text-xl mb-4">Consultation</h3>
              <p className="text-sm opacity-70 mb-6">Discuss your ideas and get professional advice</p>
              <div className="font-cinzel text-lg text-[#7B1113]">Free</div>
            </div>

            {/* Design Only */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8 text-center hover:border-[#7B1113] transition-all duration-300">
              <h3 className="font-cinzel text-xl mb-4">Design Only</h3>
              <p className="text-sm opacity-70 mb-6">Custom artwork for tattoos elsewhere</p>
              <div className="font-cinzel text-lg text-[#7B1113]">$100+</div>
            </div>

            {/* Piercing */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8 text-center hover:border-[#7B1113] transition-all duration-300">
              <h3 className="font-cinzel text-xl mb-4">Piercing</h3>
              <p className="text-sm opacity-70 mb-6">Professional body piercing services</p>
              <div className="font-cinzel text-lg text-[#7B1113]">$50+</div>
            </div>

            {/* Aftercare */}
            <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8 text-center hover:border-[#7B1113] transition-all duration-300">
              <h3 className="font-cinzel text-xl mb-4">Aftercare</h3>
              <p className="text-sm opacity-70 mb-6">Premium healing products and guidance</p>
              <div className="font-cinzel text-lg text-[#7B1113]">$25+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              Our Process
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final touch-up, we ensure every step of your tattoo journey 
              is professional, comfortable, and results in exceptional art.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-[rgba(123,17,19,0.1)] border-2 border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7B1113] transition-all duration-300">
                <span className="font-cinzel text-2xl text-[#7B1113] group-hover:text-[#F2F2F2]">1</span>
              </div>
              <h3 className="font-cinzel text-xl mb-4">Consultation</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Meet with your artist to discuss ideas, placement, sizing, and style preferences. 
                This is where we bring your vision to life.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-[rgba(123,17,19,0.1)] border-2 border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7B1113] transition-all duration-300">
                <span className="font-cinzel text-2xl text-[#7B1113] group-hover:text-[#F2F2F2]">2</span>
              </div>
              <h3 className="font-cinzel text-xl mb-4">Design</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Your artist creates a custom design based on your consultation. We'll refine it 
                until it's perfect before moving forward.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-[rgba(123,17,19,0.1)] border-2 border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7B1113] transition-all duration-300">
                <span className="font-cinzel text-2xl text-[#7B1113] group-hover:text-[#F2F2F2]">3</span>
              </div>
              <h3 className="font-cinzel text-xl mb-4">Tattooing</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                The magic happens. Your artist carefully applies the tattoo using professional 
                techniques in our sterile, comfortable studio.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-[rgba(123,17,19,0.1)] border-2 border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7B1113] transition-all duration-300">
                <span className="font-cinzel text-2xl text-[#7B1113] group-hover:text-[#F2F2F2]">4</span>
              </div>
              <h3 className="font-cinzel text-xl mb-4">Aftercare</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Comprehensive aftercare instructions and follow-up support to ensure optimal 
                healing and long-lasting results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#111111] text-center">
        <div className="max-w-4xl mx-auto px-[5%]">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            Ready to Start?
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 mb-12 leading-relaxed">
            Book your consultation today and take the first step towards exceptional tattoo artistry. 
            Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/booking">
              <button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1">
                Book Consultation
              </button>
            </Link>
            <Link href="/artists">
              <button className="border border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] text-[#F2F2F2] px-10 py-4 text-lg uppercase tracking-wider transition-all duration-300">
                Meet Our Artists
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-[900px] mx-auto px-[5%]">
          <h2 className="font-cinzel text-[clamp(2rem,5vw,3rem)] font-normal mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="text-left">
            <AccordionItem value="q1">
              <AccordionTrigger>How do I book a consultation?</AccordionTrigger>
              <AccordionContent>
                You can book online via our HeyGoldie link or use the booking form on our site. For complex pieces, include style, size, placement, and reference images.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Do you require a deposit?</AccordionTrigger>
              <AccordionContent>
                Yes. Deposits secure your appointment and are deducted from the final cost. Deposits are non‑refundable but transferable with 48 hours notice.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>What are the age requirements?</AccordionTrigger>
              <AccordionContent>
                We only tattoo clients 18+ with valid photo ID. No exceptions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>How painful is it?</AccordionTrigger>
              <AccordionContent>
                Pain varies by placement and individual tolerance. We take breaks and use professional techniques to keep you comfortable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>How should I care for my new tattoo?</AccordionTrigger>
              <AccordionContent>
                Keep it clean and moisturized, avoid soaking and direct sun while healing. We’ll provide tailored aftercare instructions before you leave.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: 'How do I book a consultation?', acceptedAnswer: { '@type': 'Answer', text: 'Book online via HeyGoldie or our booking form. Include style, size, placement, and references.' } },
                  { '@type': 'Question', name: 'Do you require a deposit?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Deposits secure your appointment and count toward your total. Non‑refundable; transferable with 48 hours notice.' } },
                  { '@type': 'Question', name: 'What are the age requirements?', acceptedAnswer: { '@type': 'Answer', text: 'We only tattoo clients 18+ with valid photo ID.' } },
                  { '@type': 'Question', name: 'How painful is it?', acceptedAnswer: { '@type': 'Answer', text: 'Pain varies by placement and tolerance. We work to keep you comfortable.' } },
                  { '@type': 'Question', name: 'How should I care for my new tattoo?', acceptedAnswer: { '@type': 'Answer', text: 'Keep it clean and moisturized, avoid soaking/sun while healing. Aftercare provided in studio.' } }
                ]
              })
            }}
          />
        </div>
      </section>
    </div>
  );
}
