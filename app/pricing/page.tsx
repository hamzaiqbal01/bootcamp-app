import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PricingTabs } from "@/components/landing/home/PricingTabs";
import { Breadcrumbs } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "Admissions Package Pricing | Future Dental Prep",
  },
  description:
    "Prices for personal statement, application review, interview coaching, and the complete dental school application package.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <Breadcrumbs
        trail={[{ name: "Pricing", path: "/pricing" }]}
      />
      <main>
        <PricingTabs titleAs="h1" />
      </main>
      <Footer />
    </>
  );
}
