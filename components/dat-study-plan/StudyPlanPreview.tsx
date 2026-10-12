import type { GeneratedPlan } from "@/lib/dat-study-plan/types";

export function StudyPlanPreview({ plan }: { plan: GeneratedPlan }) {
  const week = plan.weeks[0];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Your DAT Preparation Snapshot</h2>
        <p className="mt-2 text-stone-600">{plan.intensityNote}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Time until DAT", plan.timelineLabel],
          ["Recommended study load", plan.hoursLabel],
          ["Preparation intensity", plan.intensityLabel],
          ["Primary priority", plan.primaryLabel],
          ["Secondary priority", plan.secondaryLabel],
          ["Current status", plan.statusLabel],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-stone-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">{label}</p>
            <p className="mt-2 text-lg font-semibold text-stone-900">{value}</p>
          </div>
        ))}
      </div>
      <p className="text-stone-700">We&apos;ve created a personalized week-by-week DAT plan based on your answers.</p>
      {week && (
        <article className="rounded-2xl border border-stone-200 bg-[#FFFEFB] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Week 1 preview</p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">{week.title}</h3>
          <p className="mt-1 text-sm text-stone-500">{week.phaseLabel}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {plan.sectionHours
              .filter((row) => row.hours > 0)
              .map((row) => (
                <li key={row.section} className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2 text-sm">
                  <span className="text-stone-700">{row.label}</span>
                  <span className="font-semibold text-stone-900">{row.hours} hrs</span>
                </li>
              ))}
          </ul>
        </article>
      )}
    </div>
  );
}
