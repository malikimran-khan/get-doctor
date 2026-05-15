import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SmartSearchDemo } from "@/components/sections/SmartSearchDemo";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Listings, CTA } from "@/components/sections/Listings";
import { Testimonials, FAQ } from "@/components/sections/Feedback";
import { ContactSection } from "@/components/sections/ContactSection";
import { AIBot } from "@/components/ui/AIBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Landing Page Content */}
      <Hero />
      <SmartSearchDemo />
      <Features />
      <HowItWorks />
      <Listings />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <CTA />

      <Footer />
      
      {/* Floating AI Assistant */}
      <AIBot />
    </main>
  );
}
