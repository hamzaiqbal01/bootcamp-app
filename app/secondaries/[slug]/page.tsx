import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSideDecor } from "@/components/landing/HeroSideDecor";
import {
  getAdjacentSchools,
  getEnrichedSchoolDetails,
  getSchoolDetail,
} from "@/lib/data/secondaries/school-details";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getEnrichedSchoolDetails().map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchoolDetail(slug);
  if (!school) {
    return { title: "School not found" };
  }

  const count = school.questions.length;
  return {
    title: `${school.abbr} secondary questions`,
    description:
      count > 0
        ? `${school.name} secondary / supplemental prompts (${count}). Confirm the current cycle on the school site.`
        : `${school.name} secondary reference — no essay prompts on file. Confirm the current cycle on the school site.`,
    alternates: {
      canonical: `/secondaries/${slug}`,
    },
    robots:
      count === 0
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

const tagStyle = {
  required: "bg-[#E8EFFD] text-[#1F5BD8]",
  optional: "bg-[#F2F5FB] text-[#5B6782]",
  conditional: "bg-[#FFF4DB] text-[#9A6A00]",
} as const;

const tagLabel = {
  required: "Required",
  optional: "Optional",
  conditional: "If applicable",
} as const;

function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={left ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function SecondarySchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const school = getSchoolDetail(slug);
  if (!school) notFound();

  const adjacent = getAdjacentSchools(slug);
  const requiredCount = school.questions.filter((q) => q.tag === "required").length;

  const facts = [
    {
      label: "Prompts",
      value: school.questions.length > 0 ? String(school.questions.length) : "None on file",
    },
    ...(requiredCount > 0 ? [{ label: "Required", value: String(requiredCount) }] : []),
    { label: "Secondary", value: school.distribution },
    ...(school.cycleLabel ? [{ label: "Cycle", value: school.cycleLabel }] : []),
  ];

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[
          { name: "Secondary Questions", path: "/secondaries" },
          { name: school.name, path: `/secondaries/${slug}` },
        ]}
      />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-10 pb-12 sm:pt-12 sm:pb-14">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.08] blur-3xl"
            aria-hidden
          />
          <HeroSideDecor />
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/secondaries"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#5B6782] transition-colors hover:text-[#0B1B3A]"
            >
              <Arrow left />
              All schools
            </Link>
            <div className="mx-auto mt-6 max-w-[820px] text-center">
              <span className="inline-flex rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
                {school.stateFull} · {school.abbr}
              </span>
              <h1 className="mt-5 text-[clamp(28px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
                {school.name}
              </h1>
              <p className="mx-auto mt-4 max-w-[62ch] text-[16px] leading-relaxed text-[#5B6782]">
                {school.distributionDetail}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FD_30%,#EEF3FD_100%)] pt-2 pb-16 sm:pb-20">
          <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
            <div className="min-w-0">
              <div className="mb-6 flex items-start gap-3 rounded-[16px] border border-[#DCE5F7] bg-[#F7F9FD] px-4 py-3 text-[14px] text-[#5B6782]">
                <svg className="mt-0.5 shrink-0 text-[#1F5BD8]" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p>
                  Reference only — confirm prompts and deadlines on the school site.
                  {school.admissionsUrl ? (
                    <>
                      {" "}
                      <a
                        href={school.admissionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#1F5BD8] underline-offset-2 hover:underline"
                      >
                        Official admissions page ↗
                      </a>
                    </>
                  ) : null}
                </p>
              </div>

              {school.questions.length === 0 ? (
                <div className="rounded-[22px] border border-[#E4E9F2] bg-white px-6 py-10 text-[15px] leading-relaxed text-[#5B6782] shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]">
                  {school.noEssayNote ||
                    "No supplemental essay prompts are on file. Your AADSAS application may be the full submission — confirm before you assume zero writing."}
                </div>
              ) : (
                <ol className="space-y-3">
                  {school.questions.map((question, index) => (
                    <li key={`${question.text}-${index}`}>
                      {question.groupLabel &&
                      (index === 0 || school.questions[index - 1]?.groupLabel !== question.groupLabel) ? (
                        <p className="mt-6 mb-3 text-[12px] font-bold tracking-[0.1em] text-[#8A93A3] uppercase first:mt-0">
                          {question.groupLabel}
                        </p>
                      ) : null}
                      <div className="flex items-start gap-4 rounded-[20px] border border-[#E4E9F2] bg-white p-5 shadow-[0_14px_32px_-28px_rgba(11,27,58,0.45)] transition hover:border-[#C9D8F6] sm:p-6">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] text-[14px] font-extrabold text-[#1F5BD8]">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${tagStyle[question.tag]}`}>
                              {tagLabel[question.tag]}
                            </span>
                            {question.limit ? (
                              <span className="rounded-full bg-[#F2F5FB] px-2.5 py-0.5 text-[12px] font-semibold text-[#5B6782]">
                                {question.limit}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#0B1B3A]">{question.text}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
              <div className="rounded-[22px] border border-[#E4E9F2] bg-white p-6 shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]">
                <p className="text-[12px] font-bold tracking-[0.1em] text-[#8A93A3] uppercase">At a glance</p>
                <dl className="mt-4 divide-y divide-[#EEF2F8]">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <dt className="text-[14px] text-[#5B6782]">{fact.label}</dt>
                      <dd className="text-right text-[14px] font-bold text-[#0B1B3A]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-6 text-white">
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#1F5BD8]/35 blur-3xl" aria-hidden />
                <p className="relative text-[18px] font-extrabold">Want help with these essays?</p>
                <p className="relative mt-1.5 text-[14px] text-white/70">
                  An admissions expert reviews your secondaries before you submit.
                </p>
                <Link
                  href="/schedule"
                  className="relative mt-5 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-white px-4 text-[14px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
                >
                  Get help writing these
                </Link>
              </div>

              <nav className="grid grid-cols-2 gap-3" aria-label="Nearby schools">
                {adjacent.prev ? (
                  <Link
                    href={`/secondaries/${adjacent.prev.slug}`}
                    className="group rounded-[16px] border border-[#E4E9F2] bg-white px-4 py-3 transition hover:border-[#C9D8F6]"
                  >
                    <span className="flex items-center gap-1 text-[12px] text-[#8A93A3]">
                      <Arrow left />
                      Previous
                    </span>
                    <span className="mt-1 block truncate text-[14px] font-bold text-[#0B1B3A]">{adjacent.prev.abbr}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {adjacent.next ? (
                  <Link
                    href={`/secondaries/${adjacent.next.slug}`}
                    className="group rounded-[16px] border border-[#E4E9F2] bg-white px-4 py-3 text-right transition hover:border-[#C9D8F6]"
                  >
                    <span className="flex items-center justify-end gap-1 text-[12px] text-[#8A93A3]">
                      Next
                      <Arrow />
                    </span>
                    <span className="mt-1 block truncate text-[14px] font-bold text-[#0B1B3A]">{adjacent.next.abbr}</span>
                  </Link>
                ) : null}
              </nav>

              <Link
                href="/secondaries"
                className="text-center text-[14px] font-bold text-[#1F5BD8] hover:underline"
              >
                Browse all schools
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
