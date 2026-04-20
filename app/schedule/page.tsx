import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ContactSection } from "@/components/landing/ContactSection";

export const metadata: Metadata = {
  title: "Schedule a Free Consultation | DentalPath",
  description:
    "Book a free 30-minute consultation with one of our dental school admissions experts.",
};

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
