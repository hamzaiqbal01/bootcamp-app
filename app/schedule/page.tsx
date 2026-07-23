import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ScheduleCallSection } from "@/components/landing/ScheduleCallSection";

export const metadata: Metadata = {
  title: "Schedule a Free Call",
  description:
    "Book a free call with a Future Dentist Prep admissions specialist. No obligation — get personalized guidance on dental school applications and your timeline.",
  alternates: {
    canonical: "/schedule",
  },
};

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main>
        <ScheduleCallSection />
      </main>
      <Footer />
    </>
  );
}
