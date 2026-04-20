import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ContactSection } from "@/components/landing/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | DentalPath",
  description:
    "Get in touch with the DentalPath team. We're here to answer your questions about dental school admissions and DAT tutoring.",
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
