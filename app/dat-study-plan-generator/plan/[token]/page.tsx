import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudyPlanResults } from "@/components/dat-study-plan/StudyPlanResults";
import { TrackFullView } from "@/components/dat-study-plan/TrackFullView";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getPublicStudyPlan } from "@/lib/dat-study-plan/server";

export const metadata: Metadata = {
  title: "Your DAT Study Plan",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ sent?: string }>;
};

export default async function SavedStudyPlanPage({ params, searchParams }: Props) {
  const { token } = await params;
  const { sent } = await searchParams;
  const view = await getPublicStudyPlan(token);
  if (!view) notFound();

  return (
    <>
      <Header />
      <main>
        <TrackFullView
          weeksUntilExam={view.plan.weeksUntilExam}
          preparationIntensity={view.plan.preparationIntensity}
          primaryPriority={view.plan.primaryPriority}
        />
        <StudyPlanResults view={view} emailSent={sent !== "0"} />
      </main>
      <Footer />
    </>
  );
}
