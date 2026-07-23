import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { FaqSection } from "@/components/landing/FaqSection";

export const metadata: Metadata = {
  title: "FAQ: Dental Admissions Consulting & DAT Tutoring Questions",
  description:
    "Get clear answers about Future Dentist Prep — DAT tutoring, personal statement help, interview prep, pricing basics, and how to book a free 15-minute consultation.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
