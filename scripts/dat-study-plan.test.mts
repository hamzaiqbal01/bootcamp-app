import assert from "node:assert/strict";
import { generateDatStudyPlan, weeklyAvailableHours } from "../lib/dat-study-plan/generate";
import { parseStudyPlanRequest } from "../lib/dat-study-plan/form";
import { adminLeadWrite } from "../lib/dat-study-plan/summary";
import { SECTION_IDS, type SectionId, type StudyPlanInput } from "../lib/dat-study-plan/types";

const TODAY = "2026-10-08";

function sections<T>(value: T): Record<SectionId, T> {
  return Object.fromEntries(SECTION_IDS.map((id) => [id, value])) as Record<SectionId, T>;
}

function input(overrides: Partial<StudyPlanInput> = {}): StudyPlanInput {
  const base: StudyPlanInput = {
    scheduledDat: true,
    datDate: "2026-12-31",
    plannedDatWindow: null,
    startedStudying: true,
    diagnosticTaken: false,
    scoreFormat: null,
    overallScore: null,
    sectionScores: sections(null),
    sectionConfidence: {
      ...sections("okay" as const),
      organicChemistry: "very-weak",
    },
    targetScore: null,
    currentStatus: "full-time-student",
    weekdayAvailability: "2-3",
    weekendAvailability: "4-6",
    preferredStudyDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    preferredRestDay: "sun",
    currentResources: ["bootcamp"],
    biggestChallenges: ["organic-chemistry"],
  };

  return {
    ...base,
    ...overrides,
    sectionScores: { ...base.sectionScores, ...overrides.sectionScores },
    sectionConfidence: { ...base.sectionConfidence, ...overrides.sectionConfidence },
  };
}

function leadBody(study: StudyPlanInput, extra: Record<string, unknown> = {}) {
  return {
    ...study,
    lead: {
      firstName: "Ava",
      email: "ava@example.com",
      phone: "",
      country: "",
      marketingConsent: false,
    },
    attribution: {
      utmSource: "blog",
      utmMedium: "organic",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
      landingPage: "/dat-study-plan-generator",
      referrer: "",
    },
    ...extra,
  };
}

const threeWeeks = generateDatStudyPlan(
  input({
    datDate: "2026-10-29",
    startedStudying: false,
    sectionConfidence: sections("very-weak"),
    biggestChallenges: ["behind", "organic-chemistry"],
  }),
  TODAY,
);
assert.equal(threeWeeks.preparationIntensity, "critical");
assert.ok(threeWeeks.weeksUntilExam <= 3);
assert.match(threeWeeks.intensityNote, /timeline is tight/i);

const twelveWeeks = generateDatStudyPlan(input({ datDate: "2026-12-31" }), TODAY);
assert.ok(twelveWeeks.weeksUntilExam > 10 && twelveWeeks.weeksUntilExam < 13);
assert.equal(twelveWeeks.primaryPriority, "organicChemistry");
assert.equal(twelveWeeks.preparationIntensity, "focused");

const unscheduled = generateDatStudyPlan(
  input({
    scheduledDat: false,
    datDate: null,
    plannedDatWindow: "not-sure",
    startedStudying: false,
  }),
  TODAY,
);
assert.equal(unscheduled.daysUntilExam, null);
assert.equal(unscheduled.weeksUntilExam, 12);

const withScores = generateDatStudyPlan(
  input({
    diagnosticTaken: true,
    scoreFormat: "current",
    overallScore: 410,
    targetScore: 480,
    sectionScores: {
      ...sections(450),
      organicChemistry: 320,
    },
    sectionConfidence: sections(null),
    biggestChallenges: ["organic-chemistry"],
  }),
  TODAY,
);
assert.equal(withScores.primaryPriority, "organicChemistry");
assert.match(withScores.priorities[0]?.reason ?? "", /score you entered|main challenge/);

const noDiagnostic = generateDatStudyPlan(
  input({
    diagnosticTaken: false,
    sectionConfidence: { ...sections("strong" as const), biology: "not-started" },
    biggestChallenges: ["biology"],
  }),
  TODAY,
);
assert.equal(noDiagnostic.primaryPriority, "biology");
assert.match(noDiagnostic.priorities[0]?.reason ?? "", /not started|main challenge/);

const strong = generateDatStudyPlan(
  input({
    datDate: "2027-02-05",
    diagnosticTaken: true,
    scoreFormat: "current",
    overallScore: 520,
    targetScore: 530,
    sectionScores: sections(520),
    sectionConfidence: sections(null),
    biggestChallenges: ["consistency"],
    startedStudying: true,
  }),
  TODAY,
);
assert.equal(strong.preparationIntensity, "balanced");
assert.equal(strong.tutorButton, "Find My DAT Tutor");

const limited = generateDatStudyPlan(
  input({
    weekdayAvailability: "lt-1",
    weekendAvailability: "lt-2",
    preferredStudyDays: ["mon", "sat"],
    preferredRestDay: null,
    datDate: "2027-02-05",
    startedStudying: false,
    sectionConfidence: sections("okay"),
    biggestChallenges: ["time"],
  }),
  TODAY,
);
assert.ok(limited.recommendedHoursPerWeek < 8);
assert.equal(limited.preparationIntensity, "foundation");

const working = generateDatStudyPlan(
  input({
    currentStatus: "working-full-time",
    weekdayAvailability: "1-2",
    weekendAvailability: "2-4",
  }),
  TODAY,
);
assert.match(working.exampleDay[0]?.time ?? "", /PM/);
assert.match(working.exampleDayNote, /evening/);

const hours = weeklyAvailableHours(
  input({
    weekdayAvailability: "2-3",
    weekendAvailability: "4-6",
    preferredStudyDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    preferredRestDay: "sun",
  }),
);
assert.equal(hours, 17.5);

const past = parseStudyPlanRequest(leadBody(input({ datDate: "2020-01-01" })), TODAY);
assert.ok("error" in past);

const badScore = parseStudyPlanRequest(
  leadBody(
    input({
      diagnosticTaken: true,
      scoreFormat: "current",
      overallScore: 20,
      sectionScores: sections(null),
      sectionConfidence: sections(null),
    }),
  ),
  TODAY,
);
assert.ok("error" in badScore);

const valid = parseStudyPlanRequest(leadBody(input()), TODAY);
assert.ok(!("error" in valid));
if (!("error" in valid)) {
  assert.equal(valid.attribution.utmSource, "blog");
  assert.equal(valid.lead.email, "ava@example.com");
}

assert.deepEqual(adminLeadWrite(null), { action: "insert" });
assert.deepEqual(adminLeadWrite("contacted"), { action: "update" });

console.log("dat study plan tests passed");
