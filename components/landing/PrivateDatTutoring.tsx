import Link from "next/link";
import {
  getPackageWhatsIncluded,
  privateDatTutoringFaq,
  privateDatTutoringPackages,
} from "@/lib/data/dat-private-tutoring";
import { contactLinkForPackage } from "@/lib/contact-link";
import {
  StudentReviews,
  TutorsSection,
} from "@/components/services/TrustSections";
import { datSectionPages } from "@/lib/data/dat-section-tutors";

const promises = [
  {
    title: "A 99th percentile tutor",
    text: "One-on-one time with someone who has already beaten the exam.",
  },
  {
    title: "A plan built for you",
    text: "Your tutor builds the study schedule around your weakest sections.",
  },
  {
    title: "Low risk to start",
    text: "Not a fit after the first paid session? Switch tutors or get the remaining hours refunded.",
  },
];

const steps = [
  {
    title: "Get matched",
    text: "We pair you with an expert educator for your sections and timeline.",
  },
  {
    title: "Intro call",
    text: "Your tutor calls within a day to learn your background and DAT prep so far.",
  },
  {
    title: "Your schedule",
    text: "Your personal study schedule is shared in your first session.",
  },
  {
    title: "Weekly sessions",
    text: "Standard packages meet for 2 hours, usually once a week.",
  },
];

// Help first: which package fits which situation (wording follows each package's own blurb).
const hoursGuide = [
  {
    hours: 4,
    who: "You want to try a tutor first, or fix one weak section.",
    text: "Three sessions over about two weeks. Good for a single problem area, such as PAT keyholes or QR word problems.",
  },
  {
    hours: 10,
    who: "You are already studying and one subject is holding you back.",
    text: "Enough time to rebuild one subject, check your progress on practice tests and adjust the plan.",
  },
  {
    hours: 16,
    who: "You want a tutor with you through most of your prep.",
    text: "Our most popular choice. Weekly sessions cover your weakest sections while your tutor keeps the schedule on track.",
  },
  {
    hours: 20,
    who: "Several sections are weak, or you are retaking for a big jump.",
    text: "Intensive, targeted help across multiple subjects, with time to fix the habits that cost points last time.",
  },
];

const selfCheck = [
  "Take one full-length practice test before you decide.",
  "Mark every section scoring 2+ points below your goal.",
  "One weak section: 4 or 10 hours is usually enough.",
  "Two or more, or a retake: look at 16 or 20 hours.",
];

const datSections = [
  {
    name: "Biology",
    text: "The widest section. We focus on the high-yield systems and teach you how to recall facts under time pressure.",
    href: "/blog/dat-biology-study-guide",
  },
  {
    name: "General Chemistry",
    text: "Concept first, then timed problem sets, so stoichiometry and equilibrium questions stop eating your clock.",
    href: "/blog/dat-general-chemistry-study-guide",
  },
  {
    name: "Organic Chemistry",
    text: "Reactions and mechanisms grouped by pattern, so you reason through new questions instead of memorizing lists.",
    href: "/blog/dat-organic-chemistry-study-guide",
  },
  {
    name: "Perceptual Ability (PAT)",
    text: "Keyholes, angles, cubes and the rest, drilled one subtest at a time with strategies for each type.",
    href: "/blog/dat-perceptual-ability-practice-guide",
  },
  {
    name: "Reading Comprehension",
    text: "A reading method that fits the 60-minute section, plus practice finding answers fast in dense science passages.",
    href: "/blog/dat-reading-comprehension-study-guide",
  },
  {
    name: "Quantitative Reasoning",
    text: "The math you actually need, shortcuts for the on-screen calculator, and word-problem setups.",
    href: "/blog/dat-quantitative-reasoning-study-guide",
  },
];

function Check({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        light ? "bg-white/15 text-[#9DB9F5]" : "bg-[#E8EFFD] text-[#1F5BD8]"
      }`}
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.5l3 3 6-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PrivateDatTutoring() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-40 -right-32 -z-10 h-[520px] w-[520px] rounded-full bg-[#1F5BD8]/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#0F9D8A]/[0.08] blur-3xl"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
              Private DAT tutoring
            </span>
            <h1 className="mt-5 text-[clamp(32px,4.4vw,52px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
              DAT Tutoring — Private{" "}
              <span className="whitespace-nowrap text-[#1F5BD8]">
                1-on-1 Prep
              </span>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-[#5B6782]">
              The DAT will be one of the most important exams you will take, but
              you do not have to face it alone. Get one-on-one attention from a
              99th percentile DAT tutor.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {promises.map((item) => (
                <li key={item.title} className="flex gap-2.5">
                  <Check />
                  <span>
                    <b className="block text-[14px] text-[#0B1B3A]">
                      {item.title}
                    </b>
                    <span className="mt-0.5 block text-[13px] leading-snug text-[#5B6782]">
                      {item.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#packages"
                className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-6 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
              >
                See tutoring packages
                <span aria-hidden>↓</span>
              </a>
              <a
                href="#guide"
                className="inline-flex min-h-[50px] items-center rounded-full border border-[#D5DDEA] bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
              >
                How many hours do I need?
              </a>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#E4E9F2] bg-white/85 p-6 shadow-[0_30px_60px_-40px_rgba(11,27,58,0.5)] backdrop-blur sm:p-8">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#8A93A3] uppercase">
              How it works
            </p>
            <ol className="mt-5">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index < steps.length - 1 ? (
                    <span
                      className="absolute top-8 left-[15px] h-[calc(100%-24px)] w-px bg-[#DCE5F7]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-[13px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <b className="block text-[15px] text-[#0B1B3A]">
                      {step.title}
                    </b>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-[#5B6782]">
                      {step.text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Free guide: how much tutoring do you need? */}
      <section id="guide" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            Free guide
          </p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            How much DAT tutoring do you need?
          </h2>
          <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-[#5B6782]">
            Most students do not need a tutor for every section. Tutoring pays
            off where you are stuck, so the right number of hours depends on how
            many sections are below your goal and how much time is left before
            your test.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <ol className="grid gap-4 sm:grid-cols-2">
              {hoursGuide.map((item) => (
                <li
                  key={item.hours}
                  className="rounded-[20px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
                >
                  <p className="flex items-baseline gap-2">
                    <span className="text-[30px] leading-none font-extrabold tracking-[-0.03em] text-[#1F5BD8]">
                      {item.hours}
                    </span>
                    <span className="text-[14px] font-bold text-[#0B1B3A]">
                      hours
                    </span>
                  </p>
                  <h3 className="mt-3 text-[15.5px] leading-snug font-bold text-[#0B1B3A]">
                    {item.who}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#5B6782]">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>

            <aside className="rounded-[20px] border border-[#C9D8F6] bg-white p-6 lg:sticky lg:top-24">
              <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                Quick self-check
              </h3>
              <ul className="mt-4 space-y-3 text-[14px] leading-snug text-[#33415C]">
                {selfCheck.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <Check />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                href="/dat-study-plan-generator"
                className="mt-5 inline-flex text-[14px] font-bold text-[#1F5BD8] hover:underline"
              >
                Build a free DAT study plan →
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF3FD_100%)] py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-[620px] text-center">
            <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              Pick the hours you need
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#5B6782]">
              Every package is private, 1-on-1 tutoring. Start small to try it,
              or lock in more hours and save.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-4">
            {privateDatTutoringPackages.map((pkg) => {
              const dark = Boolean(pkg.popular);
              return (
                <article
                  key={pkg.hours}
                  className={`relative flex flex-col rounded-[22px] p-6 transition duration-300 hover:-translate-y-0.5 ${
                    dark
                      ? "bg-[linear-gradient(160deg,#0B1B3A_0%,#16306A_100%)] text-white shadow-[0_30px_60px_-30px_rgba(11,27,58,0.8)] lg:-mt-3 lg:mb-3"
                      : "border border-[#E4E9F2] bg-white shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]"
                  }`}
                >
                  {pkg.popular || pkg.badge ? (
                    <span
                      className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.06em] uppercase shadow-sm ${
                        dark
                          ? "bg-[#E7A400] text-[#0B1B3A]"
                          : "bg-[#0B1B3A] text-white"
                      }`}
                    >
                      {pkg.popular ? "Most popular" : pkg.badge}
                    </span>
                  ) : null}

                  <h3 className="flex items-baseline gap-2">
                    <span
                      className={`text-[44px] leading-none font-extrabold tracking-[-0.03em] ${
                        dark ? "text-white" : "text-[#1F5BD8]"
                      }`}
                    >
                      {pkg.hours}
                    </span>
                    <span
                      className={`text-[15px] font-bold ${dark ? "text-white/80" : "text-[#0B1B3A]"}`}
                    >
                      hours of tutoring
                    </span>
                  </h3>
                  {pkg.sessions ? (
                    <p
                      className={`mt-1.5 text-[13px] ${dark ? "text-white/60" : "text-[#8A93A3]"}`}
                    >
                      {pkg.sessions} sessions · ~2 weeks
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    <span
                      className={`text-[30px] leading-none font-extrabold tracking-[-0.02em] tabular-nums ${
                        dark ? "text-white" : "text-[#0B1B3A]"
                      }`}
                    >
                      ${pkg.priceNow.toLocaleString("en-US")}
                    </span>
                    <span
                      className={`text-[15px] line-through ${dark ? "text-white/40" : "text-[#A3ACBD]"}`}
                    >
                      ${pkg.priceWas.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[12px] font-bold ${
                        dark
                          ? "bg-[#7FE0B0]/15 text-[#7FE0B0]"
                          : "bg-[#E3F6EF] text-[#0F7A5C]"
                      }`}
                    >
                      Save ${pkg.save.toLocaleString("en-US")}
                    </span>
                    <span
                      className={`text-[13px] font-semibold ${dark ? "text-white/70" : "text-[#5B6782]"}`}
                    >
                      ${Math.round(pkg.priceNow / pkg.hours)}/hour
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-[14px] leading-relaxed ${dark ? "text-white/75" : "text-[#5B6782]"}`}
                  >
                    {pkg.blurb}
                  </p>

                  <div
                    className={`my-5 h-px ${dark ? "bg-white/10" : "bg-[#EEF2F8]"}`}
                  />

                  <ul
                    className={`space-y-2.5 text-[13.5px] ${dark ? "text-white/85" : "text-[#33415C]"}`}
                  >
                    {getPackageWhatsIncluded(pkg).map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <Check light={dark} />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      href={contactLinkForPackage(
                        `DAT tutoring, ${pkg.title}`,
                        `$${pkg.priceNow.toLocaleString("en-US")}`,
                      )}
                      className={`inline-flex min-h-[46px] w-full items-center justify-center rounded-full px-4 text-center text-[14px] font-bold transition-colors ${
                        dark
                          ? "bg-white text-[#0B1B3A] hover:bg-[#E8EFFD]"
                          : "border border-[#D5DDEA] text-[#0B1B3A] hover:border-[#1F5BD8] hover:bg-[#1F5BD8] hover:text-white"
                      }`}
                    >
                      {pkg.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-center text-[14px] text-[#5B6782]">
            Prices in USD. Not sure how many hours you need?{" "}
            <Link
              href="/schedule"
              className="font-bold text-[#1F5BD8] hover:underline"
            >
              Book a free 15-minute call
            </Link>
          </p>
        </div>
      </section>

      {/* How we tutor each DAT section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            How we tutor each DAT section
          </h2>
          <p className="mt-3 max-w-[64ch] text-[16px] leading-relaxed text-[#5B6782]">
            Your tutor spends the hours where your practice scores are lowest.
            Open a section for how we teach it, or read our free study guide.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {datSections.map((section) => {
              const tutorPage = datSectionPages.find(
                (page) => `/blog/${page.guideSlug}` === section.href,
              );
              return (
                <div
                  key={section.name}
                  className="flex flex-col rounded-[20px] border border-[#E4E9F2] bg-white p-5 transition-colors hover:border-[#1F5BD8]"
                >
                  <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                    {tutorPage ? (
                      <Link
                        href={`/private-dat-tutoring/${tutorPage.slug}`}
                        className="hover:text-[#1F5BD8]"
                      >
                        {section.name} tutoring
                      </Link>
                    ) : (
                      section.name
                    )}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#5B6782]">
                    {section.text}
                  </p>
                  <span className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-[13px] font-bold text-[#1F5BD8]">
                    {tutorPage ? (
                      <Link
                        href={`/private-dat-tutoring/${tutorPage.slug}`}
                        className="hover:underline"
                      >
                        {section.name.replace(/ \(PAT\)$/, "")} tutor →
                      </Link>
                    ) : null}
                    <Link
                      href={section.href}
                      className="text-[#5B6782] hover:underline"
                    >
                      Free study guide
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TutorsSection
        title="Meet the DAT tutors"
        intro="Dental students and dentists with top DAT scores. Press play to hear from them; we match you after the free call based on your weak sections."
      />

      <StudentReviews />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[16px] text-[#5B6782]">
              Our team of DAT experts is ready to answer any question you have.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {privateDatTutoringFaq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#E4E9F2] bg-white shadow-[0_12px_30px_-26px_rgba(11,27,58,0.45)] transition-colors open:border-[#C9D8F6]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#0B1B3A] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1F5BD8] group-open:text-white">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pr-16 pb-5 text-[15px] leading-relaxed text-[#5B6782]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] px-6 py-12 text-center text-white sm:px-12">
            <div
              className="pointer-events-none absolute -top-28 left-1/2 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/30 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em]">
                Have a question that you do not see answered here?
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[16px] text-white/70">
                Send us a message and our team will get back to you ASAP.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
                >
                  Send us a message
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex min-h-[50px] items-center rounded-full border border-white/25 px-6 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  Book a free call
                </Link>
              </div>
              <p className="mt-8 text-[13px] text-white/55">
                Dental student with a 20+ DAT? We&apos;re adding a few tutors
                this cycle.{" "}
                <Link
                  href="/become-a-tutor"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Apply to tutor
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
