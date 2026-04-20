import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ScheduleCallSection } from "@/components/landing/ScheduleCallSection";

export const metadata: Metadata = {
  title: "Schedule a Free Call | DentalPath",
  description:
    "Book a free call with a DentalPath admissions specialist. No obligation—get personalized guidance on dental school applications and your timeline.",
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
