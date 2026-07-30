import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PrivateDatTutoring } from "@/components/landing/PrivateDatTutoring";

export const metadata: Metadata = {
  title: {
    absolute: "DAT Tutoring | Private 1-on-1 Prep",
  },
  description:
    "Looking for DAT tutoring? Private 1-on-1 DAT tutoring from 99th percentile tutors — study plans, weak-section drills, packages from 10–20 hours.",
  alternates: {
    canonical: "/private-dat-tutoring",
  },
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
