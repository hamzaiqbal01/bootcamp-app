import Link from "next/link";
import { ExpertsSection } from "@/components/landing/ExpertsSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getPackageWhatsIncluded,
  privateDatTutoringFaq,
  privateDatTutoringPackages,
} from "@/lib/data/dat-private-tutoring";
import { experts } from "@/lib/data/experts";

export function PrivateDatTutoring() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="bg-shapes">
          <div className="bg-shape hero-shape-1" />
          <div className="bg-shape hero-shape-2" />
        </div>
        <div className="relative z-1 mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Private DAT Tutoring
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            The DAT will be one of the most important exams you will take, but you do not have to face
            it alone. Get one-on-one attention from a 99th percentile DAT tutor.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-16 sm:py-20" id="packages">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {privateDatTutoringPackages.map((pkg) => (
              <article
                key={pkg.hours}
                className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${
                  pkg.popular
                    ? "border-brand-500 bg-linear-to-b from-indigo-50/80 to-white ring-2 ring-brand-500/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                {pkg.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    Most Popular
                  </span>
                ) : null}
                <h2 className="text-lg font-bold text-slate-900">
                  <span className="text-brand-600">{pkg.hours} Hours</span> of Tutoring
                </h2>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="text-lg text-slate-400 line-through">
                    ${pkg.priceWas.toLocaleString("en-US")}
                  </span>
                  <span className="text-3xl font-bold text-slate-900">
                    ${pkg.priceNow.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm font-medium text-slate-500">USD</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-emerald-700">
                  Save ${pkg.save} Instantly
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{pkg.blurb}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white shadow transition hover:bg-brand-700"
                >
                  {pkg.cta}
                </Link>
                <p className="mt-8 text-sm font-semibold text-slate-900">What is included:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {getPackageWhatsIncluded(pkg.hours).map((line) => (
                    <li key={line} className="flex gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExpertsSection />

      <section className="bg-slate-50 py-16 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Help"
            title="Frequently asked questions"
            description="Our team of DAT experts is ready to answer any question you have."
          />
          <p className="mx-auto mb-8 max-w-2xl text-center text-slate-600">
            Have a question that you do not see answered here?{" "}
            <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-700">
              Send us a message
            </Link>{" "}
            and our team will get back to you ASAP.
          </p>
          <div className="mx-auto max-w-3xl space-y-3">
            {privateDatTutoringFaq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="border-t border-slate-100 px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  <p className="pt-4">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-slate-500">Our team of DAT experts</p>
          <p className="mt-2 text-lg text-slate-600">
            Have a question that you do not see answered here?
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {experts.map((ex) => (
              <span
                key={ex.id}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {ex.name}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-700"
          >
            Send us a message
          </Link>
        </div>
      </section>
    </>
  );
}
