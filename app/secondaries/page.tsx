import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSideDecor } from "@/components/landing/HeroSideDecor";
import { SecondaryDirectory, type DirectorySchool } from "@/components/landing/SecondaryDirectory";
import { answerGuides, guideForPrompt } from "@/lib/data/secondaries/answer-guide";
import { getSchoolDetail } from "@/lib/data/secondaries/school-details";
import { schools } from "@/lib/data/secondaries/schools";
import { schoolQuestionCount } from "@/lib/data/secondaries/helpers";
import { Breadcrumbs, JsonLd } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

const schoolsWithPrompts = schools.filter((school) => schoolQuestionCount(school.slug) > 0).length;

// Update when the page content is reviewed. Prompts change every cycle; each school card links to its admissions page.
const PAGE_UPDATED = "November 5, 2026";

export const metadata: Metadata = {
  title: { absolute: `Dental School Secondary Questions 2026–27: ${schoolsWithPrompts} Schools | FDP` },
  description: `Every dental school secondary question we track for the 2026–27 cycle, ${schoolsWithPrompts} schools by state, with word limits, plus tips on how to answer them fast.`,
  alternates: {
    canonical: "/secondaries",
  },
};

const faqs = [
  {
    question: "When do dental school secondaries arrive?",
    answer:
      "Usually after your AADSAS application is verified and sent to the school. Some schools send secondaries to every applicant, others only to applicants who pass an initial screen, and a few do not use secondary essays at all. Each school's card on this page shows how that school sends them.",
  },
  {
    question: "How fast should I return my secondaries?",
    answer:
      "Aim for about two weeks or less. Most dental schools review applications on a rolling basis, so a complete application reaches the committee while more interview spots are still open.",
  },
  {
    question: "Can I write my secondaries before I receive them?",
    answer:
      "Yes. Many schools reuse their prompts from cycle to cycle, so you can draft early using this page. Confirm the final wording on the school's application before you submit.",
  },
  {
    question: "Do dental school secondaries cost money?",
    answer:
      "Many schools charge a secondary or supplemental fee, and the amount varies by school. Open a school's page to see the fee we have on file, and confirm it on the school's admissions site.",
  },
  {
    question: "Do all dental schools have secondary essays?",
    answer:
      "No. Some schools rely only on the AADSAS application and do not ask for extra essays. Those schools are marked on this page.",
  },
];

// Plain data for the client-side directory; prompt types are matched here because RegExp cannot cross to the client.
const directory: DirectorySchool[] = schools.map((school) => {
  const detail = getSchoolDetail(school.slug);
  const questions = (detail?.questions ?? []).map((question) => {
    const guide = guideForPrompt(question.text);
    return {
      text: question.text,
      tag: question.tag,
      limit: question.limit,
      groupLabel: question.groupLabel,
      guide: guide ? { id: guide.id, label: guide.label } : undefined,
    };
  });
  return {
    slug: school.slug,
    name: school.name,
    abbr: school.abbr,
    state: school.state,
    distribution: detail?.distribution,
    hasPage: questions.length > 0,
    questions,
    note: detail?.noEssayNote,
  };
});

// Reading order for the guide (most common prompt first); matching order lives in answer-guide.ts.
const GUIDE_ORDER = ["why-school", "ties", "diversity", "challenge", "teamwork", "ethics", "career", "academics", "reapplicant", "disadvantaged"];
const guidesInReadingOrder = [...answerGuides].sort((a, b) => GUIDE_ORDER.indexOf(a.id) - GUIDE_ORDER.indexOf(b.id));

// Guide text the directory shows under each prompt (plain data; the RegExp matchers stay on the server).
const directoryGuides = Object.fromEntries(
  answerGuides.map((guide) => [guide.id, { label: guide.label, quickTip: guide.quickTip, how: guide.how, avoid: guide.avoid }]),
);

const takeaways = [
  "Most schools send secondaries after your AADSAS application is verified; a few send none.",
  "Return each secondary within about two weeks. Most schools review on a rolling basis.",
  "Prompts repeat year to year, so you can draft early, then confirm the wording on the school's application.",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function SecondariesPage() {
  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs trail={[{ name: "Secondary Questions", path: "/secondaries" }]} />
      <JsonLd data={faqSchema} />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-10 pb-10 sm:pt-14 sm:pb-12">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.09] blur-3xl"
            aria-hidden
          />
          <HeroSideDecor />
          <div className="mx-auto w-full max-w-[860px] px-4 text-center sm:px-6">
            <h1 className="text-[clamp(32px,4.4vw,50px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[#0B1B3A]">
              Dental School Secondary Questions <span className="whitespace-nowrap text-[#1F5BD8]">(2026–27)</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-[17px] leading-relaxed text-[#5B6782]">
              The secondary prompts for {schoolsWithPrompts} U.S. dental schools, with word limits, plus how to answer each
              type of question.
            </p>
            <p className="mt-3 text-[13px] font-semibold text-[#8A93A3]">
              Updated {PAGE_UPDATED} · Compiled by the Future Dental Prep admissions team
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[860px] px-4 sm:px-6">
            <div className="rounded-[20px] border border-[#C9D8F6] bg-white p-6 text-left shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]">
              <p className="text-[12px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">Key takeaways</p>
              <ul className="mt-3 space-y-2.5">
                {takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#33415C]">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F5BD8]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-[#5B6782]">
                Jump to:{" "}
                <a href="#prompts" className="font-bold text-[#1F5BD8] hover:underline">
                  prompts by school
                </a>{" "}
                ·{" "}
                <a href="#how-to-answer" className="font-bold text-[#1F5BD8] hover:underline">
                  how to answer
                </a>{" "}
                ·{" "}
                <a href="#faq" className="font-bold text-[#1F5BD8] hover:underline">
                  FAQ
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* One list: search, then every school's prompts in a collapsible card. */}
        <section id="prompts" className="scroll-mt-24 bg-[#F7F9FD] py-12 sm:py-14">
          <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6">
            <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              Secondary prompts by school
            </h2>
            <p className="mt-2 mb-6 text-[15.5px] leading-relaxed text-[#5B6782]">
              Open a school to see its prompts. Each prompt shows how to answer it, with steps one tap away.
            </p>
            <SecondaryDirectory schools={directory} guides={directoryGuides} />
          </div>
        </section>

        {/* How to answer, by prompt type */}
        <section id="how-to-answer" className="scroll-mt-24 bg-white py-12 sm:py-16">
          <div className="mx-auto w-full max-w-[1040px] px-4 sm:px-6">
            <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              How to answer dental school secondary questions
            </h2>
            <div className="mt-5 rounded-[18px] bg-[#0B1B3A] p-5 text-white sm:p-6">
              <p className="text-[15px] font-bold">Three rules for every answer</p>
              <ol className="mt-3 grid gap-2 text-[15px] leading-relaxed text-white/85 sm:grid-cols-3 sm:gap-4">
                <li>
                  <b className="text-white">1.</b> Answer the question in your first sentence.
                </li>
                <li>
                  <b className="text-white">2.</b> Use one real example, not a list.
                </li>
                <li>
                  <b className="text-white">3.</b> No limit? Stop at 250 to 400 words.
                </li>
              </ol>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {guidesInReadingOrder.map((guide) => (
                <article
                  key={guide.id}
                  id={`answer-${guide.id}`}
                  className="scroll-mt-28 rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
                >
                  <h3 className="text-[17px] font-extrabold text-[#0B1B3A]">{guide.title}</h3>
                  <p className="mt-1 text-[14.5px] text-[#5B6782] italic">They want to know: {guide.intent}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#33415C] marker:text-[#1F5BD8]">
                    {guide.how.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#5B6782]">
                    <b className="text-[#B42318]">Avoid:</b> {guide.avoid}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-[15px] text-[#5B6782]">
              More examples in our guide to{" "}
              <Link href="/blog/dental-school-secondary-essays" className="font-bold text-[#1F5BD8] hover:underline">
                writing dental school secondary essays
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-[linear-gradient(180deg,#F3F6FD_0%,#EEF3FD_100%)] py-14 sm:py-16">
          <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
            <h2 className="text-center text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              Frequently asked questions
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group rounded-2xl border border-[#E4E9F2] bg-white transition-colors open:border-[#C9D8F6]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#0B1B3A] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[16px]">{faq.question}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1F5BD8] group-open:text-white">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pr-16 pb-5 text-[15px] leading-relaxed text-[#5B6782]">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-7 text-white sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className="text-[20px] font-extrabold">Want help writing your secondaries?</p>
                <p className="mt-1 text-[14px] text-white/70">
                  Three rounds of critique, editing and polish for each school. $267 per school.
                </p>
              </div>
              <Link
                href="/services/secondary-essay-help"
                className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
              >
                Secondary essay help
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
