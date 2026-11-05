import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { StatsStrip } from "@/components/landing/home/StatsStrip";
import {
  HeroTutorsCard,
  HeroTutorsStrip,
} from "@/components/services/HeroTutors";
import {
  orderedTutors,
  StudentReviews,
  TutorsSection,
} from "@/components/services/TrustSections";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Future Dental Prep pairs pre-dental students with dentists and recent dental school admits for 1-on-1 DAT tutoring and admissions help. Trusted by 1,000+ students.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Future Dental Prep",
    description:
      "Dentists and recent dental school admits helping pre-dental students 1-on-1 with the DAT and dental school applications.",
    type: "website",
  },
};

const sectionTitle =
  "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";

const values = [
  {
    title: "People who just did it",
    text: "Your tutor is a practicing dentist or a dental student who went through the DAT and AADSAS recently, so the advice matches how admissions works today.",
  },
  {
    title: "1-on-1, never a template",
    text: "Every plan, edit and mock interview is built around your file: your scores, your story and the schools you are applying to.",
  },
  {
    title: "Honest advice",
    text: "We tell you where your application is weak and what to fix first. No score guarantees, no promises we cannot keep.",
  },
];

const help = [
  {
    title: "DAT tutoring",
    text: "1-on-1 tutoring for every DAT section, with a study plan built around your weakest areas.",
    href: "/private-dat-tutoring",
  },
  {
    title: "Personal statement",
    text: "Brainstorming, outlines and rounds of edits until your statement sounds like you.",
    href: "/services/personal-statement-editing",
  },
  {
    title: "Application and school list",
    text: "AADSAS review, experiences, secondaries and a school list that fits your numbers.",
    href: "/services/aadsas-application-review",
  },
  {
    title: "Interview prep",
    text: "Mock MMI, panel and traditional interviews, recorded and reviewed with you.",
    href: "/services/dental-school-interview-prep",
  },
];

export default function AboutPage() {
  const heroTutors = orderedTutors([
    "dr-todd-chastain",
    "celina-yang",
    "hansuja-chaurasia",
  ]).slice(0, 3);

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs trail={[{ name: "About", path: "/about" }]} />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-10 pb-14 sm:pt-14 sm:pb-16">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.08] blur-3xl"
            aria-hidden
          />
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:px-8">
            <div className="max-w-[760px]">
              <span className="inline-flex rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
                About us
              </span>
              <h1 className="mt-5 text-[clamp(32px,4.4vw,52px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance text-[#0B1B3A]">
                Built by dentists,{" "}
                <span className="text-[#1F5BD8]">for future dentists</span>
              </h1>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-[#33415C] sm:text-[18px]">
                Future Dental Prep gives every pre-dental student the kind of
                1-on-1 guidance that used to be reserved for the well-connected
                few. Our tutors and mentors are dentists and dental students who
                went through the DAT and dental school admissions themselves.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/schedule"
                  className="inline-flex min-h-[50px] items-center rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
                >
                  Book a free call
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center rounded-full border border-[#D5DDEA] bg-white px-7 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
                >
                  Get in touch
                </Link>
              </div>
              <HeroTutorsStrip tutors={heroTutors} />
            </div>
            <HeroTutorsCard tutors={heroTutors} />
          </div>
        </section>

        <StatsStrip />

        {/* Story */}
        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <div>
              <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
                Our story
              </p>
              <h2 className={`mt-3 ${sectionTitle}`}>
                Why we started Future Dental Prep
              </h2>
            </div>
            <div className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed text-[#33415C]">
              <p>
                Dental school admissions is competitive, unclear and
                high-stakes. Most students go through it alone, without anyone
                to tell them what admissions committees look for, how to write a
                personal statement that stands out, or how to prepare for an
                MMI.
              </p>
              <p>
                We started Future Dental Prep to change that. Every student
                works 1-on-1 with someone who has been through the process:
                practicing dentists and dental students from schools like Penn,
                Case Western, UConn and UAB.
              </p>
              <p>
                Whether you need DAT tutoring, help with your personal
                statement, an application review or full-cycle support, we start
                from where you are and build a plan to get you where you want to
                go.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#F7F9FD] py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={sectionTitle}>How we work</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-[20px] border border-[#E4E9F2] bg-white p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1B3A] text-[14px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold text-[#0B1B3A]">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#5B6782]">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we help with */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={sectionTitle}>What we help with</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {help.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col rounded-[20px] border border-[#E4E9F2] bg-white p-5 transition-colors hover:border-[#1F5BD8]"
                >
                  <h3 className="text-[16.5px] font-extrabold text-[#0B1B3A]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                    {item.text}
                  </p>
                  <span className="mt-auto pt-4 text-[14px] font-bold text-[#1F5BD8] group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TutorsSection
          title="Meet the team"
          intro="Dentists and dental students who went through admissions recently. Press play to hear from them."
        />
        <StudentReviews />

        {/* CTA */}
        <section className="bg-white pb-20 sm:pb-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] px-6 py-12 text-center text-white sm:px-12">
              <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em]">
                Ready to start your journey?
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[16px] text-white/70">
                Book a free 15-minute call with our team. No obligation, just
                honest advice for your situation.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/schedule"
                  className="inline-flex min-h-[50px] items-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
                >
                  Book a free call
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center rounded-full border border-white/25 px-6 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  Send us a message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
