import type { ReactNode } from "react";
import Link from "next/link";

const PAGE_GRID =
  "relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,460px)] lg:items-center lg:gap-x-16 lg:gap-y-12 lg:px-8";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] pb-20 pt-12 sm:pb-28 sm:pt-16 lg:pb-32">
      <div className="bg-shapes">
        <div className="bg-shape hero-shape-1" />
        <div className="bg-shape hero-shape-2" />
        <div className="bg-shape hero-shape-3" />
      </div>

      <div className={PAGE_GRID}>
        <div className="relative z-1 max-w-2xl lg:max-w-none">
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-900 ring-1 ring-violet-200/70">
            Trusted by 500+ Future Dentists
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            Future Dentist{" "}
            <span className="text-brand-600">Prep</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:max-w-2xl">
            Trusted by thousands of current dental students and dentists.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-brand-700"
            >
              Schedule a free call
            </Link>
            <a
              href="#experts"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7L13 10L8 13V7Z" fill="currentColor" />
              </svg>
              Meet Our Experts
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 sm:gap-10">
            <div>
              <div className="text-3xl font-bold text-slate-900">97%</div>
              <div className="text-sm font-medium text-slate-500">Acceptance Rate</div>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <div>
              <div className="text-3xl font-bold text-slate-900">10,000 +</div>
              <div className="text-sm font-medium text-slate-500">Students Helped</div>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <div>
              <div className="text-3xl font-bold text-slate-900">9.8/10</div>
              <div className="text-sm font-medium text-slate-500">Avg. Rating</div>
            </div>
          </div>
        </div>

        {/* Staggered vertical cards — no enclosing panel */}
        <div className="relative z-1 mx-auto flex w-full max-w-[400px] flex-col gap-5 lg:mx-0 lg:ml-auto lg:max-w-[460px]">
          <HeroFloatingCard
            className="animate-float-soft w-[min(100%,340px)] shadow-md shadow-slate-200/80 lg:w-full lg:max-w-[380px]"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.97 12 22 12 22C12 22 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Application Review"
            subtitle="Comprehensive feedback"
          />
          <HeroFloatingCard
            className="animate-float-soft-md ml-0 w-[min(100%,340px)] shadow-md shadow-slate-200/80 sm:ml-8 lg:ml-auto lg:w-full lg:max-w-[380px]"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 6V12L16 14M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="1-on-1 Tutoring"
            subtitle="DAT & coursework"
          />
          <HeroFloatingCard
            className="animate-float-soft-slow w-[min(100%,320px)] shadow-md shadow-slate-200/80 sm:ml-4 lg:ml-0 lg:w-full lg:max-w-[360px]"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M8 10L12 14L16 10"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 3V14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M20 17L12 21L4 17"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            title="Interview Prep"
            subtitle="Mock interviews"
          />
        </div>
      </div>
    </section>
  );
}

function HeroFloatingCard({
  className,
  icon,
  title,
  subtitle,
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 lg:p-5 ${className ?? ""}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>
      <div className="min-w-0 pt-0.5">
        <strong className="block text-base text-slate-900">{title}</strong>
        <small className="text-sm text-slate-500">{subtitle}</small>
      </div>
    </div>
  );
}
