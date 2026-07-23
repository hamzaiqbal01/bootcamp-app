import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ContactSection } from "@/components/landing/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Future Dentist Prep team about dental school admissions consulting and DAT tutoring.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
