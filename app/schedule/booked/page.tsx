import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSideDecor } from "@/components/landing/HeroSideDecor";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: "Your Call Is Booked",
  description: "Your free call with Future Dental Prep is confirmed.",
  robots: { index: false, follow: true },
};

const next = [
  {
    title: "Check your email",
    text: "Calendly sent your confirmation with the meeting link and a calendar invite.",
  },
  {
    title: "Bring your questions",
    text: "Your school list, DAT date or scores, and where you are in the cycle all help.",
  },
  {
    title: "Need a different time?",
    text: "Use the reschedule link in your confirmation email.",
  },
];

const tools = [
  { href: "/dat-study-plan-generator", label: "Build a free DAT study plan" },
  { href: "/aadsas-gpa-calculator", label: "AADSAS GPA calculator" },
  { href: "/secondaries", label: "Secondary questions by school" },
];

export default function BookedPage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-8 pb-16 sm:pt-10 sm:pb-24">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.09] blur-3xl"
            aria-hidden
          />
          {/* Side art sits beside the heading only, not down by the cards. */}
          <div className="absolute inset-x-0 top-0 h-[420px]">
            <HeroSideDecor />
          </div>
          <div className="relative mx-auto w-full max-w-[760px] px-4 text-center sm:px-6">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E3F6EF] text-[#0F7A5C]" aria-hidden>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 className="mt-6 text-[clamp(30px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
              Your call is booked
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[#5B6782]">
              Thanks for scheduling with Future Dental Prep. We look forward to talking with you.
            </p>

            <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {next.map((item, index) => (
                <li
                  key={item.title}
                  className="rounded-[20px] border border-[#E4E9F2] bg-white p-5 shadow-[0_14px_32px_-28px_rgba(11,27,58,0.45)]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1B3A] text-[13px] font-bold text-white">
                    {index + 1}
                  </span>
                  <b className="mt-3 block text-[15px] text-[#0B1B3A]">{item.title}</b>
                  <span className="mt-1 block text-[13.5px] leading-snug text-[#5B6782]">{item.text}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-[22px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-7 text-left text-white">
              <p className="text-[18px] font-extrabold">Get a head start before the call</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {tools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="flex h-full items-center justify-between gap-2 rounded-[14px] border border-white/15 bg-white/10 px-4 py-3 text-[14px] font-semibold transition hover:bg-white/15"
                    >
                      {tool.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="mt-8 inline-block text-[14px] font-bold text-[#1F5BD8] hover:underline">
              Back to the homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
