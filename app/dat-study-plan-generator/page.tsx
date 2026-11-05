import type { Metadata } from "next";
import { DatPlanner } from "@/components/fdp-dat/DatPlanner";
import { SeoContent, studyPlanFaqJsonLd } from "@/components/dat-study-plan/SeoContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Breadcrumbs } from "@/components/seo/JsonLd";

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
      <Breadcrumbs
        trail={[{ name: "DAT Study Plan Generator", path: "/dat-study-plan-generator" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studyPlanFaqJsonLd()) }}
      />
      <main>
        <DatPlanner />
        <SeoContent />
      </main>
      <Footer />
    </>
  );
}
