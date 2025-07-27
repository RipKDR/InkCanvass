import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Contact Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          CONTACT
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10 text-center">
          <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-6">
            Get In Touch
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Ready to start your tattoo journey? We'd love to hear from you. Reach out to discuss your ideas, 
            book a consultation, or ask any questions about our services.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-cinzel text-[clamp(2rem,5vw,3.5rem)] font-normal mb-8 relative">
                Studio Information
                <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <div className="space-y-8 mb-12">
                {/* Location */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Studio Location</h3>
                    <p className="opacity-70 leading-relaxed">
                      1247 Ink Street<br />
                      Downtown Arts District<br />
                      Los Angeles, CA 90013
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Phone</h3>
                    <p className="opacity-70">
                      <a href="tel:+1-555-BERSERK" className="hover:text-[#7B1113] transition-colors">
                        (555) BERSERK<br />
                        (555) 237-7375
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email</h3>
                    <p className="opacity-70">
                      <a href="mailto:info@berserktattoos.com" className="hover:text-[#7B1113] transition-colors">
                        info@berserktattoos.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Studio Hours</h3>
                    <div className="opacity-70 space-y-1">
                      <p>Monday - Thursday: 12PM - 10PM</p>
                      <p>Friday - Saturday: 12PM - 12AM</p>
                      <p>Sunday: 12PM - 8PM</p>
                      <p className="text-sm text-[#7B1113] mt-2">By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-[rgba(242,242,242,0.1)]">
                <h3 className="font-cinzel text-xl mb-6">Follow Our Work</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] rounded-full flex items-center justify-center hover:border-[#7B1113] hover:bg-[rgba(123,17,19,0.1)] transition-all duration-300">
                    <span className="text-lg">📷</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] rounded-full flex items-center justify-center hover:border-[#7B1113] hover:bg-[rgba(123,17,19,0.1)] transition-all duration-300">
                    <span className="text-lg">📘</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] rounded-full flex items-center justify-center hover:border-[#7B1113] hover:bg-[rgba(123,17,19,0.1)] transition-all duration-300">
                    <span className="text-lg">🐦</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-cinzel text-[clamp(2rem,5vw,3.5rem)] font-normal mb-8 relative">
                Send us a Message
                <span className="absolute bottom-[-0.5rem] left-0 w-[60px] h-[3px] bg-[#7B1113]"></span>
              </h2>
              
              <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F2F2F2]">Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your full name" 
                                {...field}
                                className="bg-[rgba(242,242,242,0.05)] border-[rgba(242,242,242,0.1)] text-[#F2F2F2] placeholder:text-[rgba(242,242,242,0.5)] focus:border-[#7B1113]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#F2F2F2]">Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="your.email@example.com" 
                                {...field}
                                className="bg-[rgba(242,242,242,0.05)] border-[rgba(242,242,242,0.1)] text-[#F2F2F2] placeholder:text-[rgba(242,242,242,0.5)] focus:border-[#7B1113]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F2F2F2]">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(555) 123-4567" 
                              {...field}
                              className="bg-[rgba(242,242,242,0.05)] border-[rgba(242,242,242,0.1)] text-[#F2F2F2] placeholder:text-[rgba(242,242,242,0.5)] focus:border-[#7B1113]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F2F2F2]">Subject *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What's this about?" 
                              {...field}
                              className="bg-[rgba(242,242,242,0.05)] border-[rgba(242,242,242,0.1)] text-[#F2F2F2] placeholder:text-[rgba(242,242,242,0.5)] focus:border-[#7B1113]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#F2F2F2]">Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your tattoo ideas, questions, or how we can help you..."
                              rows={6}
                              {...field}
                              className="bg-[rgba(242,242,242,0.05)] border-[rgba(242,242,242,0.1)] text-[#F2F2F2] placeholder:text-[rgba(242,242,242,0.5)] focus:border-[#7B1113] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] py-3 text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(123,17,19,0.3)] hover:-translate-y-1"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
              Find Our Studio
              <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
              Located in the heart of Downtown LA's Arts District, our studio is easily accessible 
              by car or public transport. Street parking and nearby lots available.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="font-cinzel text-xl mb-2">Interactive Map</h3>
              <p className="opacity-70 text-sm">1247 Ink Street, Los Angeles, CA 90013</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h4 className="font-medium mb-2">Parking</h4>
              <p className="text-sm opacity-70">Street parking and nearby lots available</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚇</span>
              </div>
              <h4 className="font-medium mb-2">Public Transport</h4>
              <p className="text-sm opacity-70">Metro Gold Line - Little Tokyo/Arts District</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♿</span>
              </div>
              <h4 className="font-medium mb-2">Accessibility</h4>
              <p className="text-sm opacity-70">Wheelchair accessible entrance and facilities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}