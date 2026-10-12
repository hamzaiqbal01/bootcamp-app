import { ChoiceGroup, MultiChoice } from "./controls";
import {
  CHALLENGE_OPTIONS,
  DAY_OPTIONS,
  RESOURCE_OPTIONS,
  STATUS_OPTIONS,
  WEEKDAY_OPTIONS,
  WEEKEND_OPTIONS,
} from "@/lib/dat-study-plan/options";
import type { PlanFormState } from "@/lib/dat-study-plan/form";
import type { ChallengeId, ResourceId, StudentStatus, Weekday, WeekdayBand, WeekendBand } from "@/lib/dat-study-plan/types";

function toggle<T extends string>(values: T[], id: T): T[] {
  return values.includes(id) ? values.filter((value) => value !== id) : [...values, id];
}

export function StudyAvailabilityStep({
  form,
  onChange,
}: {
  form: PlanFormState;
  onChange: (patch: Partial<PlanFormState>) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Build the plan around your actual life</h2>
        <p className="mt-2 text-stone-600">The weekly hours come from what you can keep, not from an ideal calendar.</p>
      </div>

      <ChoiceGroup
        legend="What best describes you right now?"
        options={STATUS_OPTIONS}
        value={form.currentStatus}
        onChange={(id) => onChange({ currentStatus: id as StudentStatus })}
      />
      <ChoiceGroup
        legend="How many hours can you realistically study on weekdays?"
        options={WEEKDAY_OPTIONS}
        value={form.weekdayAvailability}
        onChange={(id) => onChange({ weekdayAvailability: id as WeekdayBand })}
      />
      <ChoiceGroup
        legend="How many hours can you study on weekends?"
        options={WEEKEND_OPTIONS}
        value={form.weekendAvailability}
        onChange={(id) => onChange({ weekendAvailability: id as WeekendBand })}
      />
      <MultiChoice
        legend="Preferred study days"
        options={DAY_OPTIONS}
        values={form.preferredStudyDays}
        onToggle={(id) => onChange({ preferredStudyDays: toggle(form.preferredStudyDays, id as Weekday) })}
      />
      <ChoiceGroup
        legend="Preferred rest day (optional)"
        options={[{ id: "none", label: "No preference" }, ...DAY_OPTIONS]}
        value={form.preferredRestDay ?? "none"}
        onChange={(id) => onChange({ preferredRestDay: id === "none" ? null : (id as Weekday) })}
      />
      <MultiChoice
        legend="What are you currently using to prepare?"
        options={RESOURCE_OPTIONS}
        values={form.currentResources}
        onToggle={(id) => onChange({ currentResources: toggle(form.currentResources, id as ResourceId) })}
      />
      <MultiChoice
        legend="What's your biggest challenge right now?"
        options={CHALLENGE_OPTIONS}
        values={form.biggestChallenges}
        onToggle={(id) => onChange({ biggestChallenges: toggle(form.biggestChallenges, id as ChallengeId) })}
      />
    </div>
  );
}
