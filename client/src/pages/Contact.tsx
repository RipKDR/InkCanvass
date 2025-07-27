import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";

type ContactForm = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest('POST', '/api/contacts', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error) => {
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<ContactForm>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
                Visit Us
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
              </h1>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-cinzel text-2xl mb-4">Studio Location</h3>
                  <p className="text-xl leading-relaxed opacity-80">
                    33 Southern Road<br/>
                    Heidelberg Heights VIC 3081<br/>
                    Australia
                  </p>
                </div>
                
                <div>
                  <h3 className="text-cinzel text-2xl mb-4">Opening Hours</h3>
                  <div className="space-y-2 opacity-80">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span>12:00 PM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span>12:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>12:00 PM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-cinzel text-2xl mb-4">Contact Info</h3>
                  <div className="space-y-2 opacity-80">
                    <div>Phone: +61 478 128 212</div>
                    <div>Email: hello@berserktattoos.com.au</div>
                    <div>Instagram: @berserk_tattoos</div>
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  <a href="#" className="text-zinc-50 hover:text-red-800 transition-colors duration-300">Instagram</a>
                  <a href="#" className="text-zinc-50 hover:text-red-800 transition-colors duration-300">Facebook</a>
                  <a href="mailto:hello@berserktattoos.com.au" className="text-zinc-50 hover:text-red-800 transition-colors duration-300">Email</a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-cinzel text-4xl mb-8 relative inline-block">
                Get In Touch
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
              </h2>
              
              <Card className="bg-zinc-800/50 border border-zinc-700/50 p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider opacity-80">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300"
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
                          <FormLabel className="text-sm uppercase tracking-wider opacity-80">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300"
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
                          <FormLabel className="text-sm uppercase tracking-wider opacity-80">Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300"
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
                          <FormLabel className="text-sm uppercase tracking-wider opacity-80">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300 resize-vertical"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-red-800 hover:bg-red-700 py-3 text-lg uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
              
              <div className="h-64 lg:h-80 bg-zinc-800 relative overflow-hidden mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Modern storefront of tattoo studio on city street" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-cinzel text-lg mb-1">Find Our Studio</h4>
                  <p className="opacity-80 text-sm">Located in Melbourne's Heidelberg Heights, easily accessible by public transport.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
