import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBookButton from "@/components/FloatingBookButton";
import ScrollToTop from "@/components/ScrollToTop";
const Home = lazy(() => import("@/pages/Home"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Artists = lazy(() => import("@/pages/Artists"));
const ArtistProfile = lazy(() => import("@/pages/ArtistProfile"));
const Services = lazy(() => import("@/pages/Services"));
const Booking = lazy(() => import("@/pages/Booking"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/artists" component={Artists} />
        <Route path="/artists/:id" component={ArtistProfile} />
        <Route path="/services" component={Services} />
        <Route path="/booking" component={Booking} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-zinc-950 text-zinc-50">
          <Navigation />
          <main id="main">
            <Router />
          </main>
          <Footer />
          <Toaster />
          <FloatingBookButton />
          <ScrollToTop />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
