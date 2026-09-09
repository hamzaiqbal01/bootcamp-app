import type { Metadata } from "next";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { VideoLibrarySection } from "@/components/landing/VideoLibrarySection";

export const metadata: Metadata = {
  title: {
    absolute: "Future Dental Prep | DAT Tutoring & Admissions",
  },
  description:
    "Trusted by 10,000+ pre-dental students. Expert admissions consulting, DAT tutoring, personal statement coaching, and interview prep from practicing dentists and current dental students.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Future Dental Prep | DAT Tutoring & Admissions",
    description:
      "Trusted by 10,000+ pre-dental students. Expert admissions consulting, DAT tutoring, personal statement coaching, and interview prep from practicing dentists and current dental students.",
    url: "https://futuredentalprep.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ReviewsSection />
        <VideoLibrarySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
