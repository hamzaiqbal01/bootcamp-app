import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { FaqSection } from "@/components/landing/FaqSection";

export const metadata: Metadata = {
  title: {
    absolute: "Dental Admissions FAQ: GPA, DAT & Apps | FDP",
  },
  description:
    "Dental school admissions FAQ — GPA, DAT scores, personal statements, interviews, and tutoring. Clear answers for pre-dental students.",
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
