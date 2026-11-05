import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: {
    absolute: "Dental School Admissions Services | Future Dental Prep",
  },
  description:
    "Personal Statement Express, Gold, and Platinum, plus application review, interview coaching, school selection, and the complete application package.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[{ name: "Admissions Services", path: "/services" }]}
      />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
