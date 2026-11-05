import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/components/fdp-dat/fdp-dat.css";
import "./theme-dark-planner.css";
import "./theme-dark.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ChatWidget } from "@/components/chat/ChatWidget";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/JsonLd";
import { OG_IMAGE } from "@/lib/og-image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://futuredentalprep.com"),
  title: {
    default:
      "Future Dental Prep | Dental School Admissions Consulting & DAT Tutoring",
    template: "%s | Future Dental Prep",
  },
  description:
    "Expert-led dental school admissions consulting and DAT tutoring from a team of dental professionals and top students. Trusted by 1,000+ pre-dental students.",
  openGraph: {
    images: [OG_IMAGE],
    siteName: "Future Dental Prep",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    images: [OG_IMAGE.url],
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Runs before first paint so a saved dark theme never flashes light.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {children}
        <ChatWidget />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
