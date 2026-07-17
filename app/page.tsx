import type { Metadata } from "next";
import { ContactSection } from "@/components/landing/ContactSection";
import { ExpertsSection } from "@/components/landing/ExpertsSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { VideoLibrarySection } from "@/components/landing/VideoLibrarySection";

export const metadata: Metadata = {
  title: "Future Dentist Prep | Dental School Admissions Consulting & DAT Tutoring",
  description:
    "Trusted by 10,000+ pre-dental students. Expert admissions consulting, DAT tutoring, personal statement coaching, and interview prep from Dr. Alexander Takshyn and a team of top dental professionals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Future Dentist Prep | Dental School Admissions Consulting & DAT Tutoring",
    description:
      "Trusted by 10,000+ pre-dental students. Expert admissions consulting, DAT tutoring, personal statement coaching, and interview prep from Dr. Alexander Takshyn.",
    url: "https://futuredentistprep.com",
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
        <ExpertsSection />
        <ReviewsSection />
        <VideoLibrarySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
