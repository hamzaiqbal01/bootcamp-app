import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PrivateDatTutoring } from "@/components/landing/PrivateDatTutoring";

export const metadata: Metadata = {
  title: "Private DAT Tutoring | DentalPath",
  description:
    "One-on-one DAT tutoring from 99th percentile tutors. Packages from 10–20 hours with personalized study plans and expert educators.",
};

export default function PrivateDatTutoringPage() {
  return (
    <>
      <Header />
      <main>
        <PrivateDatTutoring />
      </main>
      <Footer />
    </>
  );
}
