import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  CANADA_DESCRIPTION,
  CANADA_TITLE,
  CanadaPage,
} from "@/components/canada/CanadaPage";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: { absolute: CANADA_TITLE },
  description: CANADA_DESCRIPTION,
  alternates: { canonical: "/canada" },
  openGraph: {
    title: CANADA_TITLE,
    description: CANADA_DESCRIPTION,
    url: "/canada",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CANADA_TITLE,
    description: CANADA_DESCRIPTION,
  },
};

export default function CanadaRoute() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <CanadaPage />
      </main>
      <Footer />
    </div>
  );
}
