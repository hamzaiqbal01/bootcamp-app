import { LEAD_BAND_LABEL } from "./lead-score";
import { CHALLENGE_OPTIONS, RESOURCE_OPTIONS, STATUS_OPTIONS, WEEKDAY_OPTIONS, WEEKEND_OPTIONS } from "./options";
import type { GeneratedPlan, LeadBand, StudyPlanInput } from "./types";

function labelFrom<T extends string>(options: { id: T; label: string }[], id: T): string {
  return options.find((option) => option.id === id)?.label ?? id;
}

export function leadSummaryText(
  input: StudyPlanInput,
  plan: GeneratedPlan,
  score: number,
  band: LeadBand,
): string {
  const resources = input.currentResources.map((id) => labelFrom(RESOURCE_OPTIONS, id)).join(", ");
  const challenges = input.biggestChallenges.map((id) => labelFrom(CHALLENGE_OPTIONS, id)).join(", ");
  const target = input.targetScore == null ? "Not sure" : String(input.targetScore);
  const when = input.datDate ? input.datDate : plan.timelineLabel;

  return [
    "DAT study plan",
    `Timeline: ${when} (${plan.weeksUntilExam} weeks)`,
    `Target: ${target}`,
    `Primary priority: ${plan.primaryLabel}`,
    `Secondary priority: ${plan.secondaryLabel}`,
    `Weekly hours: ${plan.recommendedHoursPerWeek}`,
    `Intensity: ${plan.intensityLabel}`,
    `Status: ${labelFrom(STATUS_OPTIONS, input.currentStatus)}`,
    `Weekdays: ${labelFrom(WEEKDAY_OPTIONS, input.weekdayAvailability)}`,
    `Weekends: ${labelFrom(WEEKEND_OPTIONS, input.weekendAvailability)}`,
    `Resources: ${resources}`,
    `Challenges: ${challenges}`,
    `Lead score: ${score} (${LEAD_BAND_LABEL[band]})`,
  ].join("\n");
}

export function adminLeadWrite(existingStatus: string | null): { action: "insert" | "update" } {
  return existingStatus ? { action: "update" } : { action: "insert" };
}
