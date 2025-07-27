import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingSchema } from "@shared/schema";
import type { Artist } from "@shared/schema";

const bookingFormSchema = insertBookingSchema.extend({
  styles: z.array(z.string()).min(1, "Please select at least one style"),
});

type BookingForm = z.infer<typeof bookingFormSchema>;

const tattooStyles = ["Realism", "Fine Line", "Blackwork", "Traditional", "Color Work", "Geometric"];

export default function Booking() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const response = await apiRequest('POST', '/api/bookings', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We'll get back to you within 24 hours to confirm your appointment.",
      });
      form.reset();
      setSelectedStyles([]);
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredArtist: undefined,
      styles: [],
      description: "",
    },
  });

  const onSubmit = (data: BookingForm) => {
    bookingMutation.mutate({
      ...data,
      styles: selectedStyles,
    });
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    }
    form.setValue('styles', checked ? [...selectedStyles, style] : selectedStyles.filter(s => s !== style));
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-cinzel text-5xl lg:text-6xl mb-6 relative inline-block">
              Book Your Session
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-800"></span>
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              Ready to start your tattoo journey? Fill out our booking form and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <Card className="bg-zinc-800/50 border border-zinc-700/50 p-8 lg:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider opacity-80">First Name</FormLabel>
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider opacity-80">Last Name</FormLabel>
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
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider opacity-80">Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="preferredArtist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider opacity-80">Preferred Artist</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300">
                            <SelectValue placeholder="No Preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">No Preference</SelectItem>
                          {artists.map((artist) => (
                            <SelectItem key={artist.id} value={artist.id}>
                              {artist.name} - {artist.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="styles"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider opacity-80">Tattoo Style</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {tattooStyles.map((style) => (
                          <div key={style} className="flex items-center space-x-2">
                            <Checkbox
                              id={style}
                              checked={selectedStyles.includes(style)}
                              onCheckedChange={(checked) => handleStyleChange(style, !!checked)}
                              className="border-zinc-700/50 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
                            />
                            <label htmlFor={style} className="text-sm cursor-pointer">
                              {style}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm uppercase tracking-wider opacity-80">Design Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Describe your tattoo idea, placement, size, etc."
                          className="bg-zinc-800/50 border-zinc-700/50 text-zinc-50 focus:border-red-800 focus:bg-red-800/5 transition-all duration-300 resize-vertical"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full bg-red-800 hover:bg-red-700 py-4 text-lg uppercase tracking-wider hover:shadow-xl hover:shadow-red-800/30 hover:-translate-y-1 transition-all duration-300"
                >
                  {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
