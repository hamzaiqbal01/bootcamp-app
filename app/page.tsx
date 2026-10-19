import type { Metadata } from "next";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HomeSearchIntro } from "@/components/landing/HomeSearchIntro";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { VideoLibrarySection } from "@/components/landing/VideoLibrarySection";

export const metadata: Metadata = {
  title: {
    absolute: "Dental School Admissions Consulting | Future Dental Prep",
  },
  description:
    "Dental school admissions consulting for the personal statement, secondaries, school list, and interviews, plus 1-on-1 DAT tutoring. Schedule a free call.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dental School Admissions Consulting | Future Dental Prep",
    description:
      "Dental school admissions consulting for the personal statement, secondaries, school list, and interviews, plus 1-on-1 DAT tutoring. Schedule a free call.",
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
        <HomeSearchIntro />
      </main>
      <Footer />
    </>
  );
}
