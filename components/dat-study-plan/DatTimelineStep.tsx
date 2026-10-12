import { ChoiceGroup } from "./controls";
import { daysBetween, todayInNewYork } from "@/lib/dat-study-plan/generate";
import { WINDOW_OPTIONS } from "@/lib/dat-study-plan/options";
import type { PlanFormState } from "@/lib/dat-study-plan/form";
import type { DatWindow } from "@/lib/dat-study-plan/types";

export function DatTimelineStep({
  form,
  onChange,
}: {
  form: PlanFormState;
  onChange: (patch: Partial<PlanFormState>) => void;
}) {
  const today = todayInNewYork();
  const days = form.datDate && /^\d{4}-\d{2}-\d{2}$/.test(form.datDate) ? daysBetween(today, form.datDate) : null;
  const weeks = days != null && days >= 0 ? Math.round((days / 7) * 10) / 10 : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Let&apos;s start with your DAT timeline</h2>
        <p className="mt-2 text-stone-600">We use this to decide how long each phase of the plan should be.</p>
      </div>

      <ChoiceGroup
        legend="Have you scheduled your DAT?"
        options={[
          { id: "yes", label: "Yes, I have a test date" },
          { id: "no", label: "Not yet" },
        ]}
        value={form.scheduledDat == null ? null : form.scheduledDat ? "yes" : "no"}
        onChange={(id) => onChange({ scheduledDat: id === "yes" })}
      />

      {form.scheduledDat === true && (
        <div>
          <label htmlFor="dat-date" className="text-base font-semibold text-stone-900">
            DAT test date
          </label>
          <input
            id="dat-date"
            type="date"
            min={today}
            value={form.datDate}
            onChange={(event) => onChange({ datDate: event.target.value })}
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none focus:border-brand-600"
          />
          {weeks != null && (
            <p className="mt-3 text-sm font-medium text-stone-700">
              You have {days} day{days === 1 ? "" : "s"} ({weeks} weeks) until your DAT.
            </p>
          )}
        </div>
      )}

      {form.scheduledDat === false && (
        <div className="space-y-8">
          <ChoiceGroup
            legend="When are you planning to take the DAT?"
            options={WINDOW_OPTIONS}
            value={form.plannedDatWindow}
            onChange={(id) => onChange({ plannedDatWindow: id as DatWindow })}
          />
          <ChoiceGroup
            legend="Have you started studying?"
            options={[
              { id: "yes", label: "Yes" },
              { id: "no", label: "No" },
            ]}
            value={form.startedStudying == null ? null : form.startedStudying ? "yes" : "no"}
            onChange={(id) => onChange({ startedStudying: id === "yes" })}
          />
        </div>
      )}
    </div>
  );
}
