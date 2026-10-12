import { hasLargeScoreGap } from "./generate";
import { SECTION_IDS, type GeneratedPlan, type LeadBand, type StudyPlanInput } from "./types";

export function scoreLead(
  input: StudyPlanInput,
  plan: GeneratedPlan,
  extras: { phone: string; marketingConsent: boolean; tutorRequested?: boolean },
): { score: number; band: LeadBand } {
  let score = 0;
  const weeks = plan.weeksUntilExam;

  if (weeks >= 4 && weeks <= 12) score += 25;
  else if (weeks < 4) score += 18;
  else if (weeks <= 16) score += 10;

  const highCount = SECTION_IDS.filter((id) => plan.sectionLevels[id] === "high").length;
  if (highCount >= 2) score += 15;
  else if (highCount === 1) score += 8;

  if (hasLargeScoreGap(input)) score += 15;

  const usingResources = input.currentResources.some((resource) => resource !== "nothing");
  const namedChallenge = input.biggestChallenges.some((challenge) => challenge !== "other");
  if (usingResources && namedChallenge) score += 10;
  if (namedChallenge) score += 8;
  if (extras.phone.trim()) score += 10;
  if (input.targetScore != null) score += 5;
  if (input.startedStudying) score += 4;
  if (extras.marketingConsent) score += 5;
  if (extras.tutorRequested) score += 12;

  score = Math.max(0, Math.min(100, score));
  const band: LeadBand = score >= 70 ? "high" : score >= 40 ? "warm" : "low";
  return { score, band };
}

export const LEAD_BAND_LABEL = {
  low: "Low intent",
  warm: "Warm",
  high: "High intent",
} as const;
