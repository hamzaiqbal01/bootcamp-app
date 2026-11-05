import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { getServicePage, servicePages } from "@/lib/data/service-pages";
import { OG_IMAGE } from "@/lib/og-image";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

// Only the pages defined in lib/data/service-pages.ts exist; any other /services/* URL is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const url = `/services/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      images: [OG_IMAGE],
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      images: [OG_IMAGE.url],
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ServiceLandingRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <ServiceLandingPage page={page} />
      </main>
      <Footer />
    </div>
  );
}
