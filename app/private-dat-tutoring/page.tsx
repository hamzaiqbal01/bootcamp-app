import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PrivateDatTutoring } from "@/components/landing/PrivateDatTutoring";
import {
  Breadcrumbs,
  JsonLd,
  SITE_URL,
  organizationRef,
} from "@/components/seo/JsonLd";
import {
  privateDatTutoringFaq,
  privateDatTutoringPackages,
} from "@/lib/data/dat-private-tutoring";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: {
    absolute: "DAT Tutoring: Private 1-on-1 DAT Tutors | FDP",
  },
  description:
    "Private 1-on-1 DAT tutoring from 99th percentile tutors. Free guide to how many hours you need, help for every DAT section, and packages from a $500 4-hour starter to 20 hours.",
  alternates: {
    canonical: "/private-dat-tutoring",
  },
};

// Service + Offer markup built from the same package data the page shows, so prices never drift apart.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private 1-on-1 DAT Tutoring",
  serviceType: "DAT tutoring",
  url: `${SITE_URL}/private-dat-tutoring`,
  provider: organizationRef,
  areaServed: ["US", "CA"],
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_URL}/schedule`,
    name: "Online, 1-on-1",
  },
  offers: privateDatTutoringPackages.map((pkg) => ({
    "@type": "Offer",
    name: pkg.title,
    description: `${pkg.hours} hours of private 1-on-1 DAT tutoring`,
    price: pkg.priceNow,
    priceCurrency: "USD",
    url: `${SITE_URL}/private-dat-tutoring`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: privateDatTutoringFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function PrivateDatTutoringPage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[{ name: "DAT Tutoring", path: "/private-dat-tutoring" }]}
      />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <main>
        <PrivateDatTutoring />
      </main>
      <Footer />
    </div>
  );
}
