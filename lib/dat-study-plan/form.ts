import { daysBetween, todayInNewYork } from "./generate";
import {
  CHALLENGE_OPTIONS,
  CONFIDENCE_OPTIONS,
  DAY_OPTIONS,
  RESOURCE_OPTIONS,
  SCORE_FORMAT_OPTIONS,
  STATUS_OPTIONS,
  WEEKDAY_OPTIONS,
  WEEKEND_OPTIONS,
  WINDOW_OPTIONS,
} from "./options";
import {
  SECTION_IDS,
  type Attribution,
  type ChallengeId,
  type Confidence,
  type DatWindow,
  type LeadDetails,
  type ResourceId,
  type ScoreFormat,
  type SectionId,
  type StudentStatus,
  type StudyPlanInput,
  type Weekday,
  type WeekdayBand,
  type WeekendBand,
} from "./types";

export type PlanFormState = {
  scheduledDat: boolean | null;
  datDate: string;
  plannedDatWindow: DatWindow | null;
  startedStudying: boolean | null;
  diagnosticTaken: boolean | null;
  scoreFormat: ScoreFormat | null;
  overallScore: string;
  sectionScores: Record<SectionId, string>;
  sectionUnknown: Record<SectionId, boolean>;
  sectionConfidence: Record<SectionId, Confidence | null>;
  targetUnsure: boolean;
  targetScore: string;
  currentStatus: StudentStatus | null;
  weekdayAvailability: WeekdayBand | null;
  weekendAvailability: WeekendBand | null;
  preferredStudyDays: Weekday[];
  preferredRestDay: Weekday | null;
  currentResources: ResourceId[];
  biggestChallenges: ChallengeId[];
};

function emptySections<T>(value: T): Record<SectionId, T> {
  return {
    biology: value,
    generalChemistry: value,
    organicChemistry: value,
    perceptualAbility: value,
    readingComprehension: value,
    quantitativeReasoning: value,
  };
}

export function emptyPlanForm(): PlanFormState {
  return {
    scheduledDat: null,
    datDate: "",
    plannedDatWindow: null,
    startedStudying: null,
    diagnosticTaken: null,
    scoreFormat: null,
    overallScore: "",
    sectionScores: emptySections(""),
    sectionUnknown: emptySections(false),
    sectionConfidence: emptySections<Confidence | null>(null),
    targetUnsure: false,
    targetScore: "",
    currentStatus: null,
    weekdayAvailability: null,
    weekendAvailability: null,
    preferredStudyDays: [],
    preferredRestDay: null,
    currentResources: [],
    biggestChallenges: [],
  };
}

export function scoreBounds(format: ScoreFormat | null, value: number): boolean {
  if (!Number.isInteger(value)) return false;
  if (format === "current") return value >= 200 && value <= 600;
  if (format === "legacy") return value >= 1 && value <= 30;
  return (value >= 1 && value <= 30) || (value >= 200 && value <= 600);
}

function parseScore(raw: string, format: ScoreFormat | null): number | null | "invalid" {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!/^\d+$/.test(trimmed)) return "invalid";
  const value = Number(trimmed);
  return scoreBounds(format, value) ? value : "invalid";
}

export function stepError(step: 1 | 2 | 3, form: PlanFormState, today = todayInNewYork()): string | null {
  if (step === 1) {
    if (form.scheduledDat == null) return "Tell us whether you have a test date.";
    if (form.scheduledDat) {
      if (!form.datDate) return "Choose your DAT date.";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(form.datDate) || daysBetween(today, form.datDate) < 0) {
        return "Choose a DAT date that is today or later.";
      }
      return null;
    }
    if (!form.plannedDatWindow) return "Choose when you plan to take the DAT.";
    if (form.startedStudying == null) return "Tell us whether you have started studying.";
    return null;
  }

  if (step === 2) {
    if (form.diagnosticTaken == null) return "Tell us whether you have a recent practice test.";
    if (form.diagnosticTaken) {
      if (!form.scoreFormat) return "Choose the score scale you are using.";
      const overall = parseScore(form.overallScore, form.scoreFormat);
      if (overall == null) return "Enter your overall score.";
      if (overall === "invalid") return "Enter a whole-number score on the scale you selected.";
      for (const id of SECTION_IDS) {
        if (form.sectionUnknown[id]) continue;
        const score = parseScore(form.sectionScores[id], form.scoreFormat);
        if (score === "invalid") return "Check the section scores. Each one must match the scale you selected.";
      }
    } else if (SECTION_IDS.some((id) => form.sectionConfidence[id] == null)) {
      return "Mark how confident you feel in each section.";
    }
    if (!form.targetUnsure) {
      if (!form.targetScore.trim()) return "Enter a target score, or choose Not sure.";
      const targetFormat = form.diagnosticTaken ? form.scoreFormat : null;
      const target = parseScore(form.targetScore, targetFormat ?? "unsure");
      if (target === "invalid" || target == null) return "Enter a whole-number target score, or choose Not sure.";
    }
    return null;
  }

  if (!form.currentStatus) return "Choose what best describes you right now.";
  if (!form.weekdayAvailability) return "Choose your weekday study time.";
  if (!form.weekendAvailability) return "Choose your weekend study time.";
  if (form.currentResources.length === 0) return "Select what you are using to prepare.";
  if (form.biggestChallenges.length === 0) return "Select your biggest challenge.";
  return null;
}

export function formToInput(form: PlanFormState, today = todayInNewYork()): StudyPlanInput {
  const error = stepError(1, form, today) ?? stepError(2, form, today) ?? stepError(3, form, today);
  if (error) throw new Error(error);

  const format = form.diagnosticTaken ? form.scoreFormat : null;
  const sectionScores = emptySections<number | null>(null);
  const sectionConfidence = emptySections<Confidence | null>(null);

  if (form.diagnosticTaken && format) {
    for (const id of SECTION_IDS) {
      if (form.sectionUnknown[id]) continue;
      const score = parseScore(form.sectionScores[id], format);
      sectionScores[id] = score === "invalid" ? null : score;
    }
  } else {
    for (const id of SECTION_IDS) sectionConfidence[id] = form.sectionConfidence[id];
  }

  const overall = form.diagnosticTaken ? parseScore(form.overallScore, format) : null;
  const target = form.targetUnsure ? null : parseScore(form.targetScore, format ?? "unsure");

  return {
    scheduledDat: form.scheduledDat === true,
    datDate: form.scheduledDat ? form.datDate : null,
    plannedDatWindow: form.scheduledDat ? null : form.plannedDatWindow,
    startedStudying: form.scheduledDat ? null : form.startedStudying,
    diagnosticTaken: form.diagnosticTaken === true,
    scoreFormat: format,
    overallScore: typeof overall === "number" ? overall : null,
    sectionScores,
    sectionConfidence,
    targetScore: typeof target === "number" ? target : null,
    currentStatus: form.currentStatus as StudentStatus,
    weekdayAvailability: form.weekdayAvailability as WeekdayBand,
    weekendAvailability: form.weekendAvailability as WeekendBand,
    preferredStudyDays: form.preferredStudyDays,
    preferredRestDay: form.preferredRestDay,
    currentResources: form.currentResources,
    biggestChallenges: form.biggestChallenges,
  };
}

function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function oneOf<T extends string>(options: { id: T }[], value: unknown): T | null {
  return typeof value === "string" && options.some((option) => option.id === value) ? (value as T) : null;
}

function manyOf<T extends string>(options: { id: T }[], value: unknown): T[] | null {
  if (!Array.isArray(value) || value.length > options.length) return null;
  const ids: T[] = [];
  for (const item of value) {
    const id = oneOf(options, item);
    if (!id || ids.includes(id)) return null;
    ids.push(id);
  }
  return ids;
}

function parseNullableScore(value: unknown, format: ScoreFormat | null): number | null | "invalid" {
  if (value == null || value === "") return null;
  if (typeof value !== "number" || !Number.isInteger(value)) return "invalid";
  return scoreBounds(format, value) ? value : "invalid";
}

export type ParsedSubmission = {
  input: StudyPlanInput;
  lead: LeadDetails;
  attribution: Attribution;
};

export function parseStudyPlanRequest(body: unknown, today = todayInNewYork()): ParsedSubmission | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const raw = body as Record<string, unknown>;

  const scheduledDat = raw.scheduledDat;
  if (typeof scheduledDat !== "boolean") return { error: "Tell us whether you have a test date." };

  let datDate: string | null = null;
  let plannedDatWindow: DatWindow | null = null;
  let startedStudying: boolean | null = null;

  if (scheduledDat) {
    datDate = cleanText(raw.datDate, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datDate) || daysBetween(today, datDate) < 0) {
      return { error: "Choose a DAT date that is today or later." };
    }
  } else {
    plannedDatWindow = oneOf(WINDOW_OPTIONS, raw.plannedDatWindow);
    if (!plannedDatWindow) return { error: "Choose when you plan to take the DAT." };
    if (typeof raw.startedStudying !== "boolean") return { error: "Tell us whether you have started studying." };
    startedStudying = raw.startedStudying;
  }

  if (typeof raw.diagnosticTaken !== "boolean") return { error: "Tell us whether you have a recent practice test." };

  const scoreFormat = raw.diagnosticTaken ? oneOf(SCORE_FORMAT_OPTIONS, raw.scoreFormat) : null;
  if (raw.diagnosticTaken && !scoreFormat) return { error: "Choose the score scale you are using." };

  const overall = raw.diagnosticTaken ? parseNullableScore(raw.overallScore, scoreFormat) : null;
  if (raw.diagnosticTaken && (overall == null || overall === "invalid")) {
    return { error: "Enter a whole-number overall score on the scale you selected." };
  }

  const sectionScores = emptySections<number | null>(null);
  const sectionConfidence = emptySections<Confidence | null>(null);
  const sections = raw.sectionScores;
  const confidence = raw.sectionConfidence;

  if (raw.diagnosticTaken) {
    if (!sections || typeof sections !== "object") return { error: "Section scores are missing." };
    for (const id of SECTION_IDS) {
      const score = parseNullableScore((sections as Record<string, unknown>)[id], scoreFormat);
      if (score === "invalid") return { error: "A section score is outside the selected scale." };
      sectionScores[id] = score;
    }
  } else {
    if (!confidence || typeof confidence !== "object") return { error: "Section confidence is missing." };
    for (const id of SECTION_IDS) {
      const value = oneOf(CONFIDENCE_OPTIONS, (confidence as Record<string, unknown>)[id]);
      if (!value) return { error: "Mark how confident you feel in each section." };
      sectionConfidence[id] = value;
    }
  }

  let targetScore: number | null = null;
  if (raw.targetScore != null && raw.targetScore !== "") {
    const target = parseNullableScore(raw.targetScore, raw.diagnosticTaken ? scoreFormat : "unsure");
    if (target === "invalid" || target == null) return { error: "Enter a whole-number target score." };
    targetScore = target;
  }

  const currentStatus = oneOf(STATUS_OPTIONS, raw.currentStatus);
  const weekdayAvailability = oneOf(WEEKDAY_OPTIONS, raw.weekdayAvailability);
  const weekendAvailability = oneOf(WEEKEND_OPTIONS, raw.weekendAvailability);
  if (!currentStatus || !weekdayAvailability || !weekendAvailability) {
    return { error: "Study availability is incomplete." };
  }

  const preferredStudyDays = manyOf(DAY_OPTIONS, raw.preferredStudyDays ?? []);
  const currentResources = manyOf(RESOURCE_OPTIONS, raw.currentResources);
  const biggestChallenges = manyOf(CHALLENGE_OPTIONS, raw.biggestChallenges);
  if (!preferredStudyDays || !currentResources || !biggestChallenges) return { error: "Some selections are invalid." };
  if (currentResources.length === 0 || biggestChallenges.length === 0) {
    return { error: "Select your resources and your biggest challenge." };
  }

  const rest = raw.preferredRestDay == null || raw.preferredRestDay === "" ? null : oneOf(DAY_OPTIONS, raw.preferredRestDay);
  if (raw.preferredRestDay && !rest) return { error: "The rest day is invalid." };

  const leadRaw = raw.lead;
  if (!leadRaw || typeof leadRaw !== "object") return { error: "Add your name and email to see the full plan." };
  const leadRecord = leadRaw as Record<string, unknown>;
  const firstName = cleanText(leadRecord.firstName, 60);
  const email = cleanText(leadRecord.email, 254).toLowerCase();
  const phone = cleanText(leadRecord.phone, 32);
  const country = cleanText(leadRecord.country, 60);
  if (firstName.length < 1) return { error: "Enter your first name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (phone && !/^[0-9+().\-\s]{7,32}$/.test(phone)) return { error: "Enter a valid phone number or leave it blank." };
  if (typeof leadRecord.marketingConsent !== "boolean") return { error: "Confirm whether we may email your plan." };

  const utm = raw.attribution && typeof raw.attribution === "object" ? (raw.attribution as Record<string, unknown>) : {};

  const input: StudyPlanInput = {
    scheduledDat,
    datDate,
    plannedDatWindow,
    startedStudying,
    diagnosticTaken: raw.diagnosticTaken,
    scoreFormat,
    overallScore: typeof overall === "number" ? overall : null,
    sectionScores,
    sectionConfidence,
    targetScore,
    currentStatus,
    weekdayAvailability,
    weekendAvailability,
    preferredStudyDays,
    preferredRestDay: rest,
    currentResources,
    biggestChallenges,
  };

  return {
    input,
    lead: { firstName, email, phone, country, marketingConsent: leadRecord.marketingConsent },
    attribution: {
      utmSource: cleanText(utm.utmSource, 120),
      utmMedium: cleanText(utm.utmMedium, 120),
      utmCampaign: cleanText(utm.utmCampaign, 120),
      utmContent: cleanText(utm.utmContent, 120),
      utmTerm: cleanText(utm.utmTerm, 120),
      landingPage: cleanText(utm.landingPage, 300),
      referrer: cleanText(utm.referrer, 300),
    },
  };
}

export function requestFromForm(
  form: PlanFormState,
  lead: LeadDetails,
  attribution: Attribution,
): Record<string, unknown> {
  const input = formToInput(form);
  return { ...input, lead, attribution };
}
