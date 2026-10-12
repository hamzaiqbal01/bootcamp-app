export const SECTION_IDS = [
  "biology",
  "generalChemistry",
  "organicChemistry",
  "perceptualAbility",
  "readingComprehension",
  "quantitativeReasoning",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type ScoreFormat = "current" | "legacy" | "unsure";

export type Confidence = "strong" | "okay" | "weak" | "very-weak" | "not-started";

export type DatWindow =
  | "within-4-weeks"
  | "1-2-months"
  | "2-3-months"
  | "3-4-months"
  | "4-plus-months"
  | "not-sure";

export type StudentStatus =
  | "full-time-student"
  | "part-time-student"
  | "working-full-time"
  | "working-part-time"
  | "gap-year"
  | "other";

export type WeekdayBand = "lt-1" | "1-2" | "2-3" | "3-4" | "4-plus";

export type WeekendBand = "lt-2" | "2-4" | "4-6" | "6-plus";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type ResourceId =
  | "bootcamp"
  | "booster"
  | "kaplan"
  | "princeton"
  | "school"
  | "youtube"
  | "tutor"
  | "self-study"
  | "nothing"
  | "other";

export type ChallengeId =
  | "dont-know"
  | "consistency"
  | "low-scores"
  | "biology"
  | "general-chemistry"
  | "organic-chemistry"
  | "pat"
  | "reading"
  | "quantitative"
  | "time"
  | "anxiety"
  | "behind"
  | "other";

export type PriorityLevel = "high" | "medium" | "low";

export type Intensity = "foundation" | "balanced" | "focused" | "intensive" | "critical";

export type Phase = "foundation" | "reinforcement" | "conditioning" | "final";

export type LeadBand = "low" | "warm" | "high";

export type StudyPlanInput = {
  scheduledDat: boolean;
  datDate: string | null;
  plannedDatWindow: DatWindow | null;
  startedStudying: boolean | null;
  diagnosticTaken: boolean;
  scoreFormat: ScoreFormat | null;
  overallScore: number | null;
  sectionScores: Record<SectionId, number | null>;
  sectionConfidence: Record<SectionId, Confidence | null>;
  targetScore: number | null;
  currentStatus: StudentStatus;
  weekdayAvailability: WeekdayBand;
  weekendAvailability: WeekendBand;
  preferredStudyDays: Weekday[];
  preferredRestDay: Weekday | null;
  currentResources: ResourceId[];
  biggestChallenges: ChallengeId[];
};

export type SectionHours = {
  section: SectionId | "practice";
  label: string;
  hours: number;
};

export type WeekPlan = {
  week: number;
  title: string;
  phase: Phase;
  phaseLabel: string;
  focus: string;
  hours: number;
  tasks: string[];
  checkpoint: string[];
};

export type DayBlock = {
  time: string;
  label: string;
};

export type PriorityItem = {
  section: SectionId;
  label: string;
  level: PriorityLevel;
  reason: string;
};

export type GeneratedPlan = {
  daysUntilExam: number | null;
  weeksUntilExam: number;
  timelineLabel: string;
  timelineNote: string;
  recommendedHoursPerWeek: number;
  hoursLabel: string;
  hoursNote: string;
  preparationIntensity: Intensity;
  intensityLabel: string;
  intensityNote: string;
  statusLabel: string;
  primaryPriority: SectionId;
  secondaryPriority: SectionId;
  primaryLabel: string;
  secondaryLabel: string;
  priorities: PriorityItem[];
  sectionLevels: Record<SectionId, PriorityLevel>;
  sectionHours: SectionHours[];
  weeks: WeekPlan[];
  weeksCovered: number;
  longerTimeline: boolean;
  exampleDay: DayBlock[];
  exampleDayNote: string;
  tutorButton: string;
  guidanceNote: string;
  targetLabel: string;
};

export type PublicStudyPlan = {
  firstName: string;
  token: string;
  plan: GeneratedPlan;
  tutorRequested: boolean;
};

export type LeadDetails = {
  firstName: string;
  email: string;
  phone: string;
  country: string;
  marketingConsent: boolean;
};

export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  landingPage: string;
  referrer: string;
};

export const CHECKPOINT = [
  "Did I complete the planned study hours?",
  "Did my accuracy improve on the sections I practiced?",
  "Which topic caused the most errors?",
  "Do I need to rebalance next week's plan?",
];

export const GUIDANCE_NOTE =
  "This plan is guidance based on what you shared. It does not predict a DAT score. Adjust it when your practice results change.";
