import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ContactSection } from "@/components/landing/ContactSection";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Future Dental Prep about DAT tutoring and dental school admissions consulting. Email us, send a message or book a free 15-minute call.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[{ name: "Contact", path: "/contact" }]}
      />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
