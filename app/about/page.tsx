import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { btn, btnSize } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Future Dental Prep helps pre-dental students with DAT tutoring, admissions consulting, and application coaching. Trusted by 10,000+ students.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Future Dental Prep",
    description:
      "Future Dental Prep helps pre-dental students with DAT tutoring, admissions consulting, and application coaching.",
    type: "website",
  },
};

const stats = [
  { value: "97%", label: "Acceptance Rate" },
  { value: "10,000+", label: "Students Helped" },
  { value: "9.8/10", label: "Avg. Rating" },
  { value: "10+", label: "Years of Experience" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] pb-20 pt-16 sm:pb-28 sm:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-200/30 blur-3xl" />
            <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-indigo-200/25 blur-3xl" />
          </div>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-900 ring-1 ring-violet-200/70">
                Our Story
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                Built by Dentists,{" "}
                <span className="text-brand-600">for Future Dentists</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Future Dental Prep exists to give every pre-dental student the same level of expert
                guidance that used to be reserved for the well-connected few.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                Our consultants and tutors have been through dental school admissions themselves —
                and they use that experience to help thousands of students do the same.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/schedule"
                  className={`${btn.primary} ${btnSize.lg}`}
                >
                  Schedule a Free Call
                </Link>
                <Link
                  href="/contact"
                  className={`${btn.outline} ${btnSize.lg}`}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-slate-100 bg-white py-14">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-4xl font-extrabold text-brand-600">{stat.value}</dt>
                  <dd className="mt-2 text-sm font-medium text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-brand-600" />
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Our Mission
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Dental school admissions is competitive, opaque, and high-stakes. Most students
                navigate it alone — without insider knowledge of what adcoms actually look for, how
                to write a standout personal statement, or how to prepare for an interview that
                converts.
              </p>
              <p>
                We exist to change that. Every student who works with Future Dental Prep gets
                one-on-one access to dental professionals who have been through the process
                themselves — not generic advisors, but current dental students and practicing
                dentists from Penn, Columbia, Yale, Harvard, UCSF, and beyond.
              </p>
              <p>
                Whether you need DAT tutoring, application review, personal statement coaching, or
                full-cycle consulting, we meet you where you are — and take you where you want to
                go.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-700 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Schedule a free 15-minute call with our team. No obligation — just honest, expert
              guidance for your situation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/schedule"
                className={`${btn.inverse} ${btnSize.lg}`}
              >
                Schedule a Free Call
              </Link>
              <Link
                href="/contact"
                className={`${btn.ghost} ${btnSize.lg}`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
