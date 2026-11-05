import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { DatSectionTutorPage } from "@/components/services/DatSectionTutorPage";
import {
  datSectionPages,
  getDatSectionPage,
} from "@/lib/data/dat-section-tutors";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

type Props = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return datSectionPages.map((page) => ({ section: page.slug }));
}

// Only the six DAT section pages exist; any other /private-dat-tutoring/* URL is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const page = getDatSectionPage(section);
  if (!page) return {};
  const url = `/private-dat-tutoring/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function DatSectionTutorRoute({ params }: Props) {
  const { section } = await params;
  const page = getDatSectionPage(section);
  if (!page) notFound();

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <DatSectionTutorPage page={page} />
      </main>
      <Footer />
    </div>
  );
}
