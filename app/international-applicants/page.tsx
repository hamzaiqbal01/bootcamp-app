import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  INTL_DESCRIPTION,
  INTL_TITLE,
  InternationalPage,
} from "@/components/international/InternationalPage";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: { absolute: INTL_TITLE },
  description: INTL_DESCRIPTION,
  alternates: { canonical: "/international-applicants" },
  openGraph: {
    title: INTL_TITLE,
    description: INTL_DESCRIPTION,
    url: "/international-applicants",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: INTL_TITLE,
    description: INTL_DESCRIPTION,
  },
};

export default function InternationalApplicantsRoute() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <InternationalPage />
      </main>
      <Footer />
    </div>
  );
}
