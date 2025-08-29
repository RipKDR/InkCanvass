import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { studio } from "@/content/studio";
import { useTitle } from "@/lib/useTitle";

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
  useTitle("Berserk Tattoos | Contact");

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
      await apiRequest("POST", "/api/contacts", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: [
          data.message,
          data.phone ? `\n\nPhone: ${data.phone}` : "",
        ].join("")
      });

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
            Contact {studio.name}
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Ready to start your tattoo journey? Reach out with your ideas, book a consultation, or ask any questions.
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
                    <MapPin className="w-6 h-6 text-[#F2F2F2]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Studio Location</h3>
                    <p className="opacity-70 leading-relaxed">
                      <a href={studio.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#7B1113] transition-colors inline-flex items-center gap-2">
                        {studio.address}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#F2F2F2]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Phone</h3>
                    <p className="opacity-70">
                      <a href={`tel:${studio.phone.replace(/\s+/g, '')}`} className="hover:text-[#7B1113] transition-colors">
                        {studio.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#F2F2F2]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email</h3>
                    <p className="opacity-70">
                      <a href={`mailto:${studio.email}`} className="hover:text-[#7B1113] transition-colors">
                        {studio.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#7B1113] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#F2F2F2]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Hours</h3>
                    <div className="opacity-70 grid grid-cols-2 gap-x-6 gap-y-1">
                      {studio.hours.map((h) => (
                        <div key={h.day} className="flex justify-between">
                          <span className="opacity-80">{h.day}</span>
                          <span className="opacity-70">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div>
                  <h3 className="font-medium text-lg mb-3">Follow Us</h3>
                  <SocialLinks items={studio.socials} />
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
                              placeholder="e.g. 0478 128 212"
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
              Located in Heidelberg Heights, our studio is easily accessible by car and public transport. Street parking available nearby.
            </p>
          </div>

          {/* Map Embed */}
          <div className="bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] rounded-lg overflow-hidden h-[400px]">
            <iframe
              title="Berserk Tattoos Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(studio.address)}&output=embed`}
              className="w-full h-full border-0"
            />
          </div>

          {/* Quick Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#7B1113]" />
              </div>
              <h4 className="font-medium mb-2">Parking</h4>
              <p className="text-sm opacity-70">Street parking available nearby</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#7B1113]" />
              </div>
              <h4 className="font-medium mb-2">Walk-ins</h4>
              <p className="text-sm opacity-70">Subject to artist availability</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[rgba(123,17,19,0.1)] border border-[#7B1113] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#7B1113]" />
              </div>
              <h4 className="font-medium mb-2">Bookings</h4>
              <p className="text-sm opacity-70">
                <a href={studio.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#7B1113]">Book via HeyGoldie</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
