import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { btn, btnSize } from "@/components/ui/button-styles";
import {
  getAdjacentSchools,
  getEnrichedSchoolDetails,
  getSchoolDetail,
} from "@/lib/data/secondaries/school-details";

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
  required: "bg-brand-50 text-brand-700",
  optional: "bg-slate-100 text-slate-600",
  conditional: "bg-amber-50 text-amber-800",
} as const;

const tagLabel = {
  required: "Required",
  optional: "Optional",
  conditional: "If applicable",
} as const;

export default async function SecondarySchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const school = getSchoolDetail(slug);
  if (!school) notFound();

  const adjacent = getAdjacentSchools(slug);
  const requiredCount = school.questions.filter((q) => q.tag === "required").length;

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] pb-12 pt-10 sm:pb-14 sm:pt-14">
          <div className="bg-shapes">
            <div className="bg-shape hero-shape-1" />
            <div className="bg-shape hero-shape-2" />
          </div>
          <div className="relative z-1 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/secondaries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              ← All schools
            </Link>
            <p className="mt-6 text-sm font-semibold text-brand-600">
              {school.stateFull} · {school.abbr}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {school.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              {school.distributionDetail}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                {school.questions.length > 0
                  ? `${school.questions.length} prompt${school.questions.length === 1 ? "" : "s"}`
                  : "No essays on file"}
              </span>
              {requiredCount > 0 ? (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                  {requiredCount} required
                </span>
              ) : null}
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                {school.distribution}
              </span>
              {school.cycleLabel ? (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                  {school.cycleLabel}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-sm text-slate-500">
              Reference only — confirm prompts and deadlines on the school site.
              {school.admissionsUrl ? (
                <>
                  {" "}
                  <a
                    href={school.admissionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-600 underline-offset-2 hover:underline"
                  >
                    Official admissions page
                  </a>
                </>
              ) : null}
            </p>

            {school.questions.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-slate-600 shadow-sm">
                {school.noEssayNote ||
                  "No supplemental essay prompts are on file. Your AADSAS application may be the full submission — confirm before you assume zero writing."}
              </div>
            ) : (
              <ol className="space-y-4">
                {school.questions.map((question, index) => (
                  <li
                    key={`${question.text}-${index}`}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6"
                  >
                    {question.groupLabel &&
                    (index === 0 ||
                      school.questions[index - 1]?.groupLabel !== question.groupLabel) ? (
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                        {question.groupLabel}
                      </p>
                    ) : null}
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1020] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagStyle[question.tag]}`}
                          >
                            {tagLabel[question.tag]}
                          </span>
                          {question.limit ? (
                            <span className="text-xs text-slate-400">{question.limit}</span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-800">
                          {question.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/schedule" className={`${btn.primary} ${btnSize.md}`}>
                Get help writing these
              </Link>
              <Link href="/secondaries" className={`${btn.outline} ${btnSize.md}`}>
                Browse all schools
              </Link>
            </div>

            <nav
              className="mt-12 grid gap-3 sm:grid-cols-2"
              aria-label="Nearby schools"
            >
              {adjacent.prev ? (
                <Link
                  href={`/secondaries/${adjacent.prev.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm transition hover:border-slate-300"
                >
                  <span className="block text-xs text-slate-400">Previous</span>
                  <span className="mt-1 block font-semibold text-slate-900">
                    {adjacent.prev.abbr}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next ? (
                <Link
                  href={`/secondaries/${adjacent.next.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-right text-sm transition hover:border-slate-300 sm:text-left"
                >
                  <span className="block text-xs text-slate-400">Next</span>
                  <span className="mt-1 block font-semibold text-slate-900">
                    {adjacent.next.abbr}
                  </span>
                </Link>
              ) : null}
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
