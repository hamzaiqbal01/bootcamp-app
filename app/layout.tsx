import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://futuredentalprep.com"),
  title: {
    default: "Future Dentist Prep | Dental School Admissions Consulting & DAT Tutoring",
    template: "%s | Future Dentist Prep",
  },
  description:
    "Expert-led dental school admissions consulting and DAT tutoring by Dr. Alexander Takshyn and a team of top dental professionals. Trusted by 10,000+ pre-dental students.",
  openGraph: {
    siteName: "Future Dentist Prep",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
