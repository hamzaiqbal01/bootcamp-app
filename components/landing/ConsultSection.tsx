const calendarDays = [
  ["", "", "1", "2", "3"],
  ["6", "7", "8", "9", "10"],
  ["13", "14", "15", "16", "17"],
  ["20", "21", "22", "23", "24"],
  ["27", "28", "29", "30", ""],
];

export function ConsultSection() {
  return (
    <section id="consult" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/25">
          <div className="grid gap-10 p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">
            <div className="text-white">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                Free Consultation
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-indigo-100">
                Book a free 30-minute consultation with one of our experts. We&apos;ll discuss your
                goals, assess your profile, and create a roadmap to dental school.
              </p>
              <ul className="mt-8 space-y-4">
                {["No obligation", "Personalized advice", "30-minute call"].map((label) => (
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
              <a
                href="#contact"
                className="mt-10 inline-flex rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-indigo-50"
              >
                Schedule Your Free Call
              </a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
                <div className="text-center text-sm font-semibold text-slate-800">April 2026</div>
                <div className="mt-4 grid grid-cols-5 gap-y-2 text-center text-xs font-medium text-slate-400">
                  {["Mo", "Tu", "We", "Th", "Fr"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                  {calendarDays.flat().map((cell, i) => {
                    if (!cell) return <span key={`e-${i}`} />;
                    const isToday = cell === "20";
                    const isOpen = ["16", "17", "20", "21", "22", "23", "24", "27", "28", "29", "30"].includes(
                      cell,
                    );
                    return (
                      <span
                        key={`${cell}-${i}`}
                        className={`inline-flex h-9 items-center justify-center rounded-lg text-sm text-slate-700 ${
                          isToday
                            ? "bg-brand-600 font-semibold text-white"
                            : isOpen
                              ? "cursor-pointer bg-indigo-50 font-medium text-brand-700 ring-1 ring-indigo-100"
                              : ""
                        }`}
                      >
                        {cell}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
