import { getStudyPlanForAdminLead } from "@/lib/dat-study-plan/server";
import { LEAD_BAND_LABEL } from "@/lib/dat-study-plan/lead-score";
import { RESOURCE_OPTIONS, SECTION_LABELS, WEEKDAY_OPTIONS, WEEKEND_OPTIONS } from "@/lib/dat-study-plan/options";
import type { LeadBand, ResourceId, SectionId, WeekdayBand, WeekendBand } from "@/lib/dat-study-plan/types";

function label<T extends string>(options: { id: T; label: string }[], id: string | null): string {
  if (!id) return "—";
  return options.find((option) => option.id === id)?.label ?? id;
}

export async function StudyPlanLeadCard({ leadId }: { leadId: string }) {
  const plan = await getStudyPlanForAdminLead(leadId);
  if (!plan) return null;

  const band = plan.band === "low" || plan.band === "warm" || plan.band === "high" ? LEAD_BAND_LABEL[plan.band as LeadBand] : plan.band;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-bold text-slate-900">DAT study plan</h2>
      <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">DAT date</dt>
          <dd className="font-medium text-slate-900">{plan.datDate ?? "Not scheduled"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Weeks remaining</dt>
          <dd className="font-medium text-slate-900">{plan.weeks ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Target score</dt>
          <dd className="font-medium text-slate-900">{plan.target ?? "Not sure"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Primary priority</dt>
          <dd className="font-medium text-slate-900">{label(Object.entries(SECTION_LABELS).map(([id, text]) => ({ id: id as SectionId, label: text })), plan.primary)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Weekly availability</dt>
          <dd className="font-medium text-slate-900">
            Weekdays: {label(WEEKDAY_OPTIONS, plan.weekday as WeekdayBand | null)}. Weekends:{" "}
            {label(WEEKEND_OPTIONS, plan.weekend as WeekendBand | null)}.
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Lead score</dt>
          <dd className="font-medium text-slate-900">
            {plan.score ?? "—"} {band ? `(${band})` : ""}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-slate-500">Current resources</dt>
          <dd className="font-medium text-slate-900">
            {plan.resources.map((id) => label(RESOURCE_OPTIONS, id as ResourceId)).join(", ") || "—"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
