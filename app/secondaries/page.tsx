import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { SecondarySchoolList } from "@/components/landing/SecondarySchoolList";
import { schools } from "@/lib/data/secondaries/schools";
import { uniqueStates } from "@/lib/data/secondaries/helpers";

export const metadata: Metadata = {
  title: "Dental School Secondary Questions",
  description:
    "Reference prompts for U.S. dental school secondary essays — school-by-school questions and word limits. Confirm the current cycle on each school's site.",
  alternates: {
    canonical: "/secondaries",
  },
};

export default function SecondariesPage() {
  const stateCount = uniqueStates().length;

  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] pb-14 pt-12 sm:pb-16 sm:pt-16">
          <div className="bg-shapes">
            <div className="bg-shape hero-shape-1" />
            <div className="bg-shape hero-shape-2" />
          </div>
          <div className="relative z-1 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-brand-700">
              Free reference
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              Secondary questions, by school
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Look up supplemental prompts before you write. Confirm the current cycle on each
              school&apos;s admissions page — these change every year.
            </p>
            <dl className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-3">
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
                <dt className="sr-only">Schools</dt>
                <dd>
                  <span className="font-semibold text-slate-900">{schools.length}</span> schools
                </dd>
              </div>
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
                <dt className="sr-only">States</dt>
                <dd>
                  <span className="font-semibold text-slate-900">{stateCount}</span> states
                </dd>
              </div>
              <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
                <dt className="sr-only">Cycle</dt>
                <dd>
                  <span className="font-semibold text-slate-900">2026–27</span> cycle
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SecondarySchoolList />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
