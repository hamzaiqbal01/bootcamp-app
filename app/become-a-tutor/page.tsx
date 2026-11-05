import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { TutorApplySection } from "@/components/landing/TutorApplySection";
import { Breadcrumbs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Become a DAT Tutor",
  description:
    "Apply to tutor DAT biology, chemistry, PAT, QR, or RC with Future Dental Prep. We're adding a few tutors this cycle — 20+ AA, clear English, reliable Zoom.",
  alternates: {
    canonical: "/become-a-tutor",
  },
};

export default function BecomeATutorPage() {
  return (
    <>
      <Header />
      <Breadcrumbs
        trail={[{ name: "Become a DAT Tutor", path: "/become-a-tutor" }]}
      />
      <main>
        <TutorApplySection />
      </main>
      <Footer />
    </>
  );
}
