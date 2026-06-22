import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { experts } from "@/lib/data/experts";

export const metadata: Metadata = {
  title: "About Us | Future Dentist Prep",
  description:
    "Meet Dr. Alexander Takshyn and the Future Dentist Prep team — dental professionals and top students who have helped 10,000+ pre-dental students get accepted to dental school.",
  openGraph: {
    title: "About Future Dentist Prep",
    description:
      "Meet Dr. Alexander Takshyn and the Future Dentist Prep team — dental professionals and top students helping pre-dental students get accepted.",
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
  const drAlex = experts.find((e) => e.id === "alex")!;
  const team = experts.filter((e) => e.id !== "alex");

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
            <div className="grid gap-14 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-20">
              <div>
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-900 ring-1 ring-violet-200/70">
                  Our Story
                </span>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                  Built by Dentists,{" "}
                  <span className="text-brand-600">for Future Dentists</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  Future Dentist Prep was founded by{" "}
                  <strong className="font-semibold text-slate-800">Dr. Alexander Takshyn</strong>{" "}
                  with one mission: give every pre-dental student the same level of expert guidance
                  that used to be reserved for the well-connected few.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                  After navigating dental school admissions as an international applicant,
                  completing his DMD with a scholarship at the University of Pennsylvania, and
                  matching at his #1 surgical program, Dr. Takshyn turned his experience into a
                  platform — helping thousands of students do the same.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/schedule"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-brand-700"
                  >
                    Schedule a Free Call
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Dr. Alex photo card */}
              <div className="relative mx-auto w-full max-w-sm lg:mx-0">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
                  <Image
                    src="/images/aleex.png"
                    alt="Dr. Alexander Takshyn, DMD — Founder of Future Dentist Prep"
                    width={420}
                    height={500}
                    className="w-full object-cover object-top"
                    priority
                  />
                  <div className="p-6">
                    <p className="text-lg font-bold text-slate-900">Dr. Alexander Takshyn</p>
                    <p className="mt-1 text-sm text-brand-600">DMD · Founder & Lead Consultant</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      University of Pennsylvania School of Dental Medicine · Oral & Maxillofacial
                      Surgery, Nova Southeastern University
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-brand-500/20 to-violet-500/20" />
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
                We exist to change that. Every student who works with Future Dentist Prep gets
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

        {/* Team */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-brand-600" />
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Our consultants and tutors are current dental students and dentists from top programs
              across the country.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((expert) => (
                <div
                  key={expert.id}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md hover:border-brand-100"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <Image
                      src={expert.imageUrl}
                      alt={expert.name}
                      fill
                      className="object-cover object-top transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-slate-900">{expert.name}</p>
                    <p className="mt-1 text-sm text-brand-600">{expert.role}</p>
                    <p
                      className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500"
                      dangerouslySetInnerHTML={{ __html: expert.bio.split("<br")[0] }}
                    />
                  </div>
                </div>
              ))}
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
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-indigo-50"
              >
                Schedule a Free Call
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
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
