import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist } from "@shared/schema";
import { studio } from "@/content/studio";
import { useTitle } from "@/lib/useTitle";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredArtist: z.string().optional(),
  tattooStyle: z.string().min(1, "Please select a tattoo style"),
  tattooSize: z.string().min(1, "Please select tattoo size"),
  placement: z.string().min(1, "Please specify placement"),
  description: z.string().min(10, "Please provide more details about your tattoo idea"),
  hasAllergies: z.boolean(),
  allergies: z.string().optional(),
  hasTattoos: z.boolean(),
  budget: z.string().min(1, "Please select your budget range"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
});

type BookingForm = z.infer<typeof bookingSchema>;

export default function Booking() {
  useTitle("Berserk Tattoos | Book a Consultation");
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const { data: artists = [], isLoading } = useQuery<Artist[]>({
    queryKey: ['/api/artists'],
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      hasAllergies: false,
      hasTattoos: false,
    }
  });

  const hasAllergies = watch("hasAllergies");
  const hasTattoos = watch("hasTattoos");

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const [firstName, ...rest] = data.name.trim().split(/\s+/);
      const lastName = rest.join(" ") || "N/A";

      const descriptionExtras = [
        data.tattooSize ? `Size: ${data.tattooSize}` : null,
        data.placement ? `Placement: ${data.placement}` : null,
        data.preferredDate ? `Preferred Date: ${data.preferredDate}` : null,
        data.hasAllergies ? `Allergies: ${data.allergies || "Yes"}` : null,
        data.hasTattoos ? "Has previous tattoos" : null,
        data.budget ? `Budget: ${data.budget}` : null,
      ].filter(Boolean).join(" | ");

      const payload = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        preferredArtist: data.preferredArtist || null,
        styles: [data.tattooStyle],
        description: descriptionExtras
          ? `${data.description}\n\n---\n${descriptionExtras}`
          : data.description,
      };

      const res = await apiRequest("POST", "/api/bookings", payload);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you within 24 hours to confirm your consultation.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
      });
    },
  });

  const onSubmit = (data: BookingForm) => {
    bookingMutation.mutate(data);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8">
          <Skeleton className="h-16 w-64 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Booking Hero */}
      <section className="pt-40 pb-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-90 text-[15rem] opacity-[0.02] font-cinzel tracking-[0.3em] select-none whitespace-nowrap">
          BOOKING
        </div>
        
        <div className="max-w-[1600px] mx-auto px-[5%] relative z-10 text-center">
          <h1 className="font-cinzel text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.85] uppercase mb-6">
            Book Your Session
          </h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed mb-12">
            Ready to bring your vision to life? Complete our booking form to schedule your consultation 
            with one of our master artists. We'll work together to create something extraordinary.
          </p>
          <div className="text-sm opacity-80 -mt-8 mb-12">
            Prefer a quick booking? <a href={studio.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-[#7B1113] hover:underline">Book via HeyGoldie</a>.
          </div>
          
          {/* Process Steps */}
          <div className="flex justify-center items-center gap-8 pt-12 border-t border-[rgba(242,242,242,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#7B1113] text-[#F2F2F2] rounded-full flex items-center justify-center font-cinzel text-lg">1</div>
              <span className="text-sm uppercase tracking-wider">Consultation</span>
            </div>
            <div className="w-16 h-px bg-[rgba(242,242,242,0.2)]"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[rgba(242,242,242,0.1)] text-[#F2F2F2] rounded-full flex items-center justify-center font-cinzel text-lg">2</div>
              <span className="text-sm uppercase tracking-wider opacity-60">Design</span>
            </div>
            <div className="w-16 h-px bg-[rgba(242,242,242,0.2)]"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[rgba(242,242,242,0.1)] text-[#F2F2F2] rounded-full flex items-center justify-center font-cinzel text-lg">3</div>
              <span className="text-sm uppercase tracking-wider opacity-60">Session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-[5%]">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-cinzel text-2xl">Step {currentStep} of {totalSteps}</h2>
              <span className="text-sm opacity-60">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-[rgba(242,242,242,0.1)] h-2">
              <div 
                className="h-2 bg-[#7B1113] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-cinzel text-3xl mb-4 text-[#7B1113]">Personal Information</h3>
                  <p className="opacity-80">Let's start with the basics so we can contact you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                      placeholder="+61 XXX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      {...register("preferredDate")}
                      type="date"
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                    />
                    {errors.preferredDate && <p className="text-red-400 text-sm mt-1">{errors.preferredDate.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Tattoo Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-cinzel text-3xl mb-4 text-[#7B1113]">Tattoo Details</h3>
                  <p className="opacity-80">Tell us about your tattoo vision</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Preferred Artist
                    </label>
                    <select
                      {...register("preferredArtist")}
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                    >
                      <option value="">No preference</option>
                      {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                          {artist.name} - {artist.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Tattoo Style *
                    </label>
                    <select
                      {...register("tattooStyle")}
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                    >
                      <option value="">Select a style</option>
                      <option value="Realism">Realism</option>
                      <option value="Fine Line">Fine Line</option>
                      <option value="Blackwork">Blackwork</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Neo-Traditional">Neo-Traditional</option>
                      <option value="Geometric">Geometric</option>
                    </select>
                    {errors.tattooStyle && <p className="text-red-400 text-sm mt-1">{errors.tattooStyle.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Size *
                    </label>
                    <select
                      {...register("tattooSize")}
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                    >
                      <option value="">Select size</option>
                      <option value="Small (2-4 inches)">Small (2-4 inches)</option>
                      <option value="Medium (4-8 inches)">Medium (4-8 inches)</option>
                      <option value="Large (8+ inches)">Large (8+ inches)</option>
                      <option value="Full sleeve/back">Full sleeve/back</option>
                    </select>
                    {errors.tattooSize && <p className="text-red-400 text-sm mt-1">{errors.tattooSize.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Placement *
                    </label>
                    <input
                      {...register("placement")}
                      type="text"
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                      placeholder="e.g., forearm, shoulder, back"
                    />
                    {errors.placement && <p className="text-red-400 text-sm mt-1">{errors.placement.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300 resize-none"
                    placeholder="Describe your tattoo idea in detail..."
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Health & Experience */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-cinzel text-3xl mb-4 text-[#7B1113]">Health & Experience</h3>
                  <p className="opacity-80">This helps us provide the best care during your session</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        {...register("hasAllergies")}
                        type="checkbox"
                        className="w-4 h-4 text-[#7B1113] bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] focus:ring-[#7B1113]"
                      />
                      <span>I have allergies or skin sensitivities</span>
                    </label>
                  </div>

                  {hasAllergies && (
                    <div>
                      <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                        Please specify your allergies
                      </label>
                      <textarea
                        {...register("allergies")}
                        rows={3}
                        className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300 resize-none"
                        placeholder="List any allergies or skin conditions..."
                      />
                    </div>
                  )}

                  <div>
                    <label className="flex items-center gap-3 text-sm">
                      <input
                        {...register("hasTattoos")}
                        type="checkbox"
                        className="w-4 h-4 text-[#7B1113] bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] focus:ring-[#7B1113]"
                      />
                      <span>I have previous tattoos</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium opacity-70 uppercase tracking-wider mb-2">
                      Budget Range *
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full px-4 py-3 bg-[rgba(242,242,242,0.05)] border border-[rgba(242,242,242,0.1)] text-[#F2F2F2] text-sm focus:outline-none focus:border-[#7B1113] transition-all duration-300"
                    >
                      <option value="">Select your budget</option>
                      <option value="$200-500">$200 - $500</option>
                      <option value="$500-1000">$500 - $1,000</option>
                      <option value="$1000-2000">$1,000 - $2,000</option>
                      <option value="$2000+">$2,000+</option>
                    </select>
                    {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="font-cinzel text-3xl mb-4 text-[#7B1113]">Review & Submit</h3>
                  <p className="opacity-80">Please review your booking details before submitting</p>
                </div>

                <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-6 space-y-4">
                  <h4 className="font-cinzel text-xl mb-4">Booking Summary</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="opacity-60">Name:</span>
                      <span className="ml-2">{watch("name")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Email:</span>
                      <span className="ml-2">{watch("email")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Phone:</span>
                      <span className="ml-2">{watch("phone")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Preferred Date:</span>
                      <span className="ml-2">{watch("preferredDate")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Style:</span>
                      <span className="ml-2">{watch("tattooStyle")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Size:</span>
                      <span className="ml-2">{watch("tattooSize")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Placement:</span>
                      <span className="ml-2">{watch("placement")}</span>
                    </div>
                    <div>
                      <span className="opacity-60">Budget:</span>
                      <span className="ml-2">{watch("budget")}</span>
                    </div>
                  </div>

                  {watch("description") && (
                    <div className="pt-4 border-t border-[rgba(242,242,242,0.1)]">
                      <span className="opacity-60 block mb-2">Description:</span>
                      <p className="text-sm leading-relaxed">{watch("description")}</p>
                    </div>
                  )}
                </div>

                <div className="bg-[rgba(123,17,19,0.1)] border border-[rgba(123,17,19,0.2)] p-6">
                  <h4 className="font-medium mb-2 text-[#7B1113]">What happens next?</h4>
                  <ul className="text-sm space-y-2 opacity-80">
                    <li>• We'll review your booking and contact you within 24 hours</li>
                    <li>• A consultation will be scheduled to discuss your design</li>
                    <li>• Your artist will create a custom design for approval</li>
                    <li>• We'll schedule your tattoo session once everything is finalized</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-3 border border-[rgba(242,242,242,0.2)] text-[#F2F2F2] text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#7B1113]"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] text-sm uppercase tracking-wider transition-all duration-300"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || bookingMutation.isPending}
                  className="px-8 py-3 bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2] text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-[#0a0a0a] text-center">
        <div className="max-w-4xl mx-auto px-[5%]">
          <h3 className="font-cinzel text-2xl mb-6">Prefer to call or visit?</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div>
              <div className="text-[#7B1113] font-cinzel text-xl mb-2">Phone</div>
              <div className="text-lg">+61 478 128 212</div>
            </div>
            <div className="w-px h-12 bg-[rgba(242,242,242,0.2)] hidden md:block"></div>
            <div>
              <div className="text-[#7B1113] font-cinzel text-xl mb-2">Studio</div>
              <div className="text-lg">33 Southern Road<br />Heidelberg Heights, VIC 3081</div>
            </div>
            <div className="w-px h-12 bg-[rgba(242,242,242,0.2)] hidden md:block"></div>
            <div>
              <Link href="/contact">
                <button className="border border-[#7B1113] text-[#7B1113] hover:bg-[#7B1113] hover:text-[#F2F2F2] px-6 py-3 text-sm uppercase tracking-wider transition-all duration-300">
                  Contact Form
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
