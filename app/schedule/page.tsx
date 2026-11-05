import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { CalendlyEmbed } from "@/components/schedule/CalendlyEmbed";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: "Schedule a Free Call",
  description:
    "Book a free call with a Future Dental Prep admissions specialist. No obligation — get personalized guidance on dental school applications and your timeline.",
  alternates: {
    canonical: "/schedule",
  },
};

const benefits = [
  "No obligation — see if we’re a fit",
  "Personalized advice for your timeline and goals",
  "Talk to an admissions specialist, not a salesperson",
];

const prep = [
  "Find a quiet spot and a stable connection.",
  "Jot down your top schools or deadlines if you know them.",
  "Have your DAT date or scores handy, if you have them.",
];

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] text-[#1F5BD8]" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function SchedulePage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[{ name: "Schedule a Free Call", path: "/schedule" }]}
      />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_45%,#EEF3FD_100%)] pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div
            className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[480px] w-[480px] rounded-full bg-[#1F5BD8]/10 blur-3xl"
            aria-hidden
          />
          {/* Mobile: heading, then the calendar, then the details. Desktop: text left, calendar right. */}
          <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 xl:gap-x-24 lg:px-8">
            <div className="lg:col-start-1 lg:row-start-1">
              <span className="inline-flex rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
                Free consultation
              </span>
              <h1 className="mt-5 text-[clamp(32px,4.2vw,50px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
                Schedule a <span className="text-[#1F5BD8]">free call</span>
              </h1>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-[#5B6782]">
                Book a short call with our team. We&apos;ll learn about your background, answer questions about
                applications and the DAT, and suggest sensible next steps — whether or not you work with us.
              </p>
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <Suspense fallback={<div className="mx-auto h-[700px] w-full max-w-[560px] rounded-[26px] border border-[#E4E9F2] bg-white" />}>
                <CalendlyEmbed bookingUrl={CALENDLY_BOOKING_URL} />
              </Suspense>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <ul className="space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] font-semibold text-[#0B1B3A]">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[20px] border border-[#E4E9F2] bg-white/80 p-6 backdrop-blur">
                <p className="text-[12px] font-bold tracking-[0.1em] text-[#8A93A3] uppercase">Before the call</p>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed text-[#5B6782]">
                  {prep.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F5BD8]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
