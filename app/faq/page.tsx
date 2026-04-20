import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { FaqSection } from "@/components/landing/FaqSection";
import { ConsultSection } from "@/components/landing/ConsultSection";

export const metadata: Metadata = {
  title: "FAQ | DentalPath",
  description:
    "Find answers to common questions about our dental school admissions consulting and DAT tutoring services.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqSection />
        <ConsultSection />
      </main>
      <Footer />
    </>
  );
}
