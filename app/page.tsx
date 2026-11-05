import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { DatPlanSection } from "@/components/landing/home/DatPlanSection";
import { GuidesSection } from "@/components/landing/home/GuidesSection";
import { HomeFaq } from "@/components/landing/home/HomeFaq";
import { HomeReviews } from "@/components/landing/home/HomeReviews";
import { HomeTeam } from "@/components/landing/home/HomeTeam";
import { HomeVideoLibrary } from "@/components/landing/home/HomeVideoLibrary";
import { HowItWorks } from "@/components/landing/home/HowItWorks";
import { PricingTabs } from "@/components/landing/home/PricingTabs";
import { ServiceOverview } from "@/components/landing/home/ServiceOverview";
import { StatsStrip } from "@/components/landing/home/StatsStrip";
import { TimelineCta } from "@/components/landing/home/TimelineCta";
import { ToolsGrid } from "@/components/landing/home/ToolsGrid";
import { OG_IMAGE } from "@/lib/og-image";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: {
    absolute: "DAT Tutoring & Dental School Admissions Consulting | FDP",
  },
  description:
    "Dental school admissions consulting for the personal statement, secondaries, school list, and interviews, plus 1-on-1 DAT tutoring. Schedule a free call.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: [OG_IMAGE],
    title:
      "DAT Tutoring & Dental School Admissions Consulting | Future Dental Prep",
    description:
      "Dental school admissions consulting for the personal statement, secondaries, school list, and interviews, plus 1-on-1 DAT tutoring. Schedule a free call.",
    url: "https://futuredentalprep.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <ServiceOverview />
        <DatPlanSection />
        <ToolsGrid />
        <HowItWorks />
        <PricingTabs />
        <HomeTeam />
        <HomeReviews />
        <GuidesSection />
        <HomeVideoLibrary />
        <HomeFaq />
        <TimelineCta />
      </main>
      <Footer />
    </div>
  );
}
