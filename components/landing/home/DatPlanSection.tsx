import Link from "next/link";
import type { ReactNode } from "react";

const weeks = [
  { label: "Week 1", width: "40%", note: "Bio" },
  { label: "Week 2", width: "55%", note: "GC" },
  { label: "Week 3", width: "70%", note: "OC" },
  { label: "Week 4", width: "85%", note: "PAT" },
];

export function DatPlanSection() {
  return (
    <section id="dat" className="relative isolate scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/2 -right-[160px] h-[560px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,123,255,0.13),transparent)]" />
        <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(#1F5BD8_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.13] [mask-image:radial-gradient(ellipse_at_65%_50%,black_15%,transparent_65%)]" />
        <div className="absolute top-1/2 right-[6%] h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-[#1F5BD8]/10" />
        <div className="absolute top-1/2 right-[10%] h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-dashed border-[#1F5BD8]/15" />
        <div className="absolute -top-24 -left-24 h-[280px] w-[280px] rounded-full bg-[radial-gradient(closest-side,rgba(79,123,255,0.07),transparent)]" />
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-12 px-4 sm:px-6 lg:gap-14 lg:px-8">
        <div className="flex min-w-0 flex-1 basis-[440px] flex-col gap-5">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            DAT tutoring
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            1-on-1 DAT tutoring built around your weakest section
          </h2>
          <p className="text-lg text-[#5B6782]">
            Our tutors scored in the top percentiles and know the current DAT, including the April 2026 Orgo update. They review your error log every week and shift time to the sections that need it.
          </p>
          <ul className="flex flex-col gap-3 text-[15px] text-[#33415C]">
            {[
              "Diagnostic first, then a week-by-week plan",
              "Targeted review for PAT, sciences, reading, and QR",
              "Practice exams with a full score breakdown",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/private-dat-tutoring"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1F5BD8] px-6 text-[15px] font-bold text-white hover:bg-[#1747AC]"
            >
              See DAT tutoring
            </Link>
            <Link
              href="/dat-study-plan-generator"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#D5DDEA] bg-white px-6 text-[15px] font-bold text-[#0B1B3A] hover:border-[#0B1B3A]"
            >
              Create a study plan
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 flex-1 basis-[440px] py-8 sm:pl-6">
          <div
            className="absolute inset-y-8 right-0 left-6 -translate-x-4 translate-y-4 -rotate-2 rounded-[18px] border border-[#DCE5F7] bg-[#F1F5FE] max-sm:hidden"
            aria-hidden
          />
          <FloatingChip className="animate-float-soft -top-1 left-0" icon={<CheckBadge />}>
            Error log reviewed
          </FloatingChip>
          <FloatingChip className="animate-float-soft-md right-6 -bottom-1" icon={<CalendarBadge />}>
            Weekly check-in
          </FloatingChip>
          <div className="relative rounded-[18px] border border-[#E4E9F2] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,27,58,0.2)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <b className="text-[15px] text-[#0B1B3A]">Sample study week</b>
              <span className="rounded-full bg-[#EEF3FE] px-2.5 py-1 text-xs font-bold text-[#1F5BD8]">
                Illustrative
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {weeks.map((week) => (
                <div
                  key={week.label}
                  className="grid grid-cols-[72px_minmax(0,1fr)_48px] items-center gap-3 text-[13px]"
                >
                  <span className="font-semibold text-[#5B6782]">{week.label}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-[#E9EEF6]">
                    <i className="block h-full rounded-full bg-[#1F5BD8]" style={{ width: week.width }} />
                  </span>
                  <span className="text-right font-bold text-[#0B1B3A]">{week.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#5B6782]">
              Your tutor sets the real week after the first call. This bar is a
              preview of the study-plan layout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ className, icon, children }: { className: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div
      className={`absolute z-10 inline-flex items-center gap-2 rounded-xl border border-[#E4E9F2] bg-white px-3 py-2 text-[13px] font-semibold text-[#0B1B3A] shadow-[0_14px_30px_-18px_rgba(11,27,58,0.4)] max-sm:hidden ${className}`}
      aria-hidden
    >
      {icon}
      {children}
    </div>
  );
}

function CheckBadge() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E4F8EF] text-[#12925F]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CalendarBadge() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF3FE] text-[#1F5BD8]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="mt-0.5 shrink-0 text-[#1F5BD8]">
      <circle cx="9" cy="9" r="8" stroke="currentColor" />
      <path d="M5.2 9.2 7.7 11.6 12.8 6.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
