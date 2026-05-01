import Link from "next/link";

const benefits = [
  "No obligation — see if we’re a fit",
  "Personalized advice for your timeline and goals",
  "About 30 minutes with an admissions specialist",
];

export function ScheduleCallSection() {
  return (
    <section className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-brand-700">
            Admissions
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[2.5rem]">
            Schedule a free call
          </h1>
          <p className="mt-4 text-[1.05rem] leading-[1.7] text-slate-500">
            Book a short call with our team. We&apos;ll learn about your background, answer questions about
            applications and the DAT, and suggest sensible next steps—whether or not you work with us.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/25">
          <div className="grid gap-10 p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:p-14">
            <div className="text-white">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What happens on the call</h2>
              <p className="mt-4 text-lg leading-relaxed text-indigo-100">
                You&apos;ll share where you are in the process; we&apos;ll listen, clarify options, and point you
                toward resources that match your goals.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((label) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-medium">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M10 18.333A8.333 8.333 0 1010 1.667a8.333 8.333 0 000 16.666z"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7.5 10l1.667 1.667L12.5 8.333"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-10 inline-flex rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-indigo-50"
              >
                Contact us
              </Link>
              <p className="mt-4 max-w-md text-sm text-indigo-200/90">
                Send a message with your questions or goals—we&apos;ll reply as soon as we can.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm lg:max-w-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">Before you reach out</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/95">
                <li className="flex gap-2">
                  <span className="text-indigo-200" aria-hidden>
                    •
                  </span>
                  Find a quiet spot and a stable connection.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-200" aria-hidden>
                    •
                  </span>
                  Jot down your top schools or deadlines if you know them.
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-200" aria-hidden>
                    •
                  </span>
                  A few details about your timeline help us reply with useful next steps.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
