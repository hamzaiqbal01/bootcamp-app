import type {
  ChallengeId,
  Confidence,
  DatWindow,
  ResourceId,
  ScoreFormat,
  SectionId,
  StudentStatus,
  Weekday,
  WeekdayBand,
  WeekendBand,
} from "./types";

export const SECTION_LABELS: Record<SectionId, string> = {
  biology: "Biology",
  generalChemistry: "General Chemistry",
  organicChemistry: "Organic Chemistry",
  perceptualAbility: "Perceptual Ability",
  readingComprehension: "Reading Comprehension",
  quantitativeReasoning: "Quantitative Reasoning",
};

export const CONFIDENCE_OPTIONS: { id: Confidence; label: string }[] = [
  { id: "strong", label: "Strong" },
  { id: "okay", label: "Okay" },
  { id: "weak", label: "Weak" },
  { id: "very-weak", label: "Very Weak" },
  { id: "not-started", label: "Haven't Started" },
];

export const WINDOW_OPTIONS: { id: DatWindow; label: string }[] = [
  { id: "within-4-weeks", label: "Within 4 weeks" },
  { id: "1-2-months", label: "1–2 months" },
  { id: "2-3-months", label: "2–3 months" },
  { id: "3-4-months", label: "3–4 months" },
  { id: "4-plus-months", label: "4+ months" },
  { id: "not-sure", label: "I'm not sure yet" },
];

export const SCORE_FORMAT_OPTIONS: { id: ScoreFormat; label: string }[] = [
  { id: "current", label: "Current DAT score scale" },
  { id: "legacy", label: "Older DAT score format" },
  { id: "unsure", label: "I'm not sure" },
];

export const STATUS_OPTIONS: { id: StudentStatus; label: string }[] = [
  { id: "full-time-student", label: "Full-time student" },
  { id: "part-time-student", label: "Part-time student" },
  { id: "working-full-time", label: "Working full-time" },
  { id: "working-part-time", label: "Working part-time" },
  { id: "gap-year", label: "Gap year" },
  { id: "other", label: "Other" },
];

export const WEEKDAY_OPTIONS: { id: WeekdayBand; label: string }[] = [
  { id: "lt-1", label: "Less than 1 hour/day" },
  { id: "1-2", label: "1–2 hours/day" },
  { id: "2-3", label: "2–3 hours/day" },
  { id: "3-4", label: "3–4 hours/day" },
  { id: "4-plus", label: "4+ hours/day" },
];

export const WEEKEND_OPTIONS: { id: WeekendBand; label: string }[] = [
  { id: "lt-2", label: "Less than 2 hours/day" },
  { id: "2-4", label: "2–4 hours/day" },
  { id: "4-6", label: "4–6 hours/day" },
  { id: "6-plus", label: "6+ hours/day" },
];

export const DAY_OPTIONS: { id: Weekday; label: string; weekend: boolean }[] = [
  { id: "mon", label: "Monday", weekend: false },
  { id: "tue", label: "Tuesday", weekend: false },
  { id: "wed", label: "Wednesday", weekend: false },
  { id: "thu", label: "Thursday", weekend: false },
  { id: "fri", label: "Friday", weekend: false },
  { id: "sat", label: "Saturday", weekend: true },
  { id: "sun", label: "Sunday", weekend: true },
];

export const RESOURCE_OPTIONS: { id: ResourceId; label: string }[] = [
  { id: "bootcamp", label: "DAT Bootcamp" },
  { id: "booster", label: "DAT Booster" },
  { id: "kaplan", label: "Kaplan" },
  { id: "princeton", label: "Princeton Review" },
  { id: "school", label: "School/course material" },
  { id: "youtube", label: "YouTube" },
  { id: "tutor", label: "Private tutor" },
  { id: "self-study", label: "Self-study resources" },
  { id: "nothing", label: "Nothing yet" },
  { id: "other", label: "Other" },
];

export const CHALLENGE_OPTIONS: { id: ChallengeId; label: string }[] = [
  { id: "dont-know", label: "I don't know what to study" },
  { id: "consistency", label: "Staying consistent" },
  { id: "low-scores", label: "Low practice scores" },
  { id: "biology", label: "Biology" },
  { id: "general-chemistry", label: "General Chemistry" },
  { id: "organic-chemistry", label: "Organic Chemistry" },
  { id: "pat", label: "PAT" },
  { id: "reading", label: "Reading Comprehension" },
  { id: "quantitative", label: "Quantitative Reasoning" },
  { id: "time", label: "Time management" },
  { id: "anxiety", label: "Test anxiety" },
  { id: "behind", label: "I've fallen behind" },
  { id: "other", label: "Other" },
];

export const CHALLENGE_SECTION: Partial<Record<ChallengeId, SectionId>> = {
  biology: "biology",
  "general-chemistry": "generalChemistry",
  "organic-chemistry": "organicChemistry",
  pat: "perceptualAbility",
  reading: "readingComprehension",
  quantitative: "quantitativeReasoning",
};

export const WINDOW_WEEKS: Record<DatWindow, number> = {
  "within-4-weeks": 3,
  "1-2-months": 6,
  "2-3-months": 10,
  "3-4-months": 14,
  "4-plus-months": 18,
  "not-sure": 12,
};

export const WEEKDAY_HOURS: Record<WeekdayBand, number> = {
  "lt-1": 0.75,
  "1-2": 1.5,
  "2-3": 2.5,
  "3-4": 3.5,
  "4-plus": 4.5,
};

export const WEEKEND_HOURS: Record<WeekendBand, number> = {
  "lt-2": 1.5,
  "2-4": 3,
  "4-6": 5,
  "6-plus": 7,
};
