import { ContactSection } from "@/components/landing/ContactSection";
import { ExpertsSection } from "@/components/landing/ExpertsSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { VideoLibrarySection } from "@/components/landing/VideoLibrarySection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ExpertsSection />
        <ReviewsSection />
        <VideoLibrarySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
