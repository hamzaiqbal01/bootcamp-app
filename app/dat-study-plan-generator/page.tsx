import type { Metadata } from "next";
import { DatStudyPlanExperience } from "@/components/dat-study-plan/DatStudyPlanExperience";
import { SeoContent, studyPlanFaqJsonLd } from "@/components/dat-study-plan/SeoContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

export const metadata: Metadata = {
  title: {
    absolute: "Free DAT Study Plan Generator | Personalized DAT Study Schedule",
  },
  description:
    "Create a personalized DAT study plan based on your test date, current scores, target score, weak subjects, and weekly availability.",
  alternates: {
    canonical: "/dat-study-plan-generator",
  },
};

export default function DatStudyPlanPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studyPlanFaqJsonLd()) }}
      />
      <main>
        <DatStudyPlanExperience />
        <SeoContent />
      </main>
      <Footer />
    </>
  );
}
