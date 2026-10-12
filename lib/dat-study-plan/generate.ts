import {
  CHALLENGE_SECTION,
  DAY_OPTIONS,
  SECTION_LABELS,
  WEEKDAY_HOURS,
  WEEKEND_HOURS,
  WINDOW_WEEKS,
} from "./options";
import {
  CHECKPOINT,
  GUIDANCE_NOTE,
  SECTION_IDS,
  type DayBlock,
  type GeneratedPlan,
  type Intensity,
  type Phase,
  type PriorityLevel,
  type SectionHours,
  type SectionId,
  type StudyPlanInput,
  type Weekday,
  type WeekPlan,
} from "./types";

export function todayInNewYork(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function daysBetween(today: string, exam: string): number {
  const start = Date.parse(`${today}T00:00:00Z`);
  const end = Date.parse(`${exam}T00:00:00Z`);
  return Math.round((end - start) / 86_400_000);
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function roundHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

type Scale = "current" | "legacy";

export function scoreScale(input: StudyPlanInput): Scale | null {
  if (input.scoreFormat === "current") return "current";
  if (input.scoreFormat === "legacy") return "legacy";
  const nums = [input.overallScore, ...SECTION_IDS.map((id) => input.sectionScores[id])].filter(
    (n): n is number => n != null,
  );
  if (nums.length === 0) return null;
  if (nums.some((n) => n > 30)) return "current";
  if (nums.every((n) => n <= 30)) return "legacy";
  return null;
}

function isLow(score: number, scale: Scale): boolean {
  return scale === "current" ? score < 400 : score < 18;
}

export function hasLargeScoreGap(input: StudyPlanInput): boolean {
  if (input.overallScore == null || input.targetScore == null) return false;
  const scale = scoreScale(input);
  if (scale === "current") return input.targetScore - input.overallScore >= 40;
  if (scale === "legacy") return input.targetScore - input.overallScore >= 3;
  return false;
}

export function selectedStudyDays(input: StudyPlanInput): Weekday[] {
  let days = input.preferredStudyDays.length
    ? [...input.preferredStudyDays]
    : DAY_OPTIONS.filter((day) => day.id !== "sun").map((day) => day.id);
  if (input.preferredRestDay) days = days.filter((day) => day !== input.preferredRestDay);
  return days.length ? days : ["sat"];
}

export function weeklyAvailableHours(input: StudyPlanInput): number {
  const days = selectedStudyDays(input);
  const weekdayHours = WEEKDAY_HOURS[input.weekdayAvailability];
  const weekendHours = WEEKEND_HOURS[input.weekendAvailability];
  const total = days.reduce((sum, day) => {
    const weekend = day === "sat" || day === "sun";
    return sum + (weekend ? weekendHours : weekdayHours);
  }, 0);
  return roundHalf(total);
}

function weeksFromInput(input: StudyPlanInput, today: string): { days: number | null; weeks: number } {
  if (input.scheduledDat && input.datDate) {
    const days = Math.max(0, daysBetween(today, input.datDate));
    return { days, weeks: round1(days / 7) };
  }
  const windowWeeks = input.plannedDatWindow ? WINDOW_WEEKS[input.plannedDatWindow] : 12;
  return { days: null, weeks: windowWeeks };
}

function sectionPoints(input: StudyPlanInput, id: SectionId, scale: Scale | null): number {
  let points = 0;
  const confidence = input.sectionConfidence[id];
  if (confidence === "not-started" || confidence === "very-weak") points += 3;
  else if (confidence === "weak") points += 2;
  else if (confidence === "okay") points += 1;

  if (input.biggestChallenges.some((challenge) => CHALLENGE_SECTION[challenge] === id)) points += 2;

  const score = input.sectionScores[id];
  if (score != null && scale) {
    if (isLow(score, scale)) points += 2;
    else if (scale === "current" ? score < 450 : score < 20) points += 1;
  }

  if (!input.diagnosticTaken && confidence == null) points += 1;
  return points;
}

function levelFor(points: number): PriorityLevel {
  if (points >= 4) return "high";
  if (points >= 2) return "medium";
  return "low";
}

function reasonFor(input: StudyPlanInput, id: SectionId, level: PriorityLevel, scale: Scale | null): string {
  const label = SECTION_LABELS[id];
  if (level === "low") {
    return `${label} stays in the rotation so it does not go cold. Your answers did not show a large gap here.`;
  }

  const facts: string[] = [];
  const score = input.sectionScores[id];
  if (score != null && scale && isLow(score, scale)) {
    facts.push(`the ${label} score you entered is one of the clearer gaps`);
  }
  const confidence = input.sectionConfidence[id];
  if (confidence === "not-started") facts.push(`you have not started ${label} yet`);
  else if (confidence === "very-weak" || confidence === "weak") {
    facts.push(`you described ${label} as ${confidence === "very-weak" ? "very weak" : "weak"}`);
  }
  if (input.biggestChallenges.some((challenge) => CHALLENGE_SECTION[challenge] === id)) {
    facts.push(`you listed ${label} as a main challenge`);
  }

  if (facts.length === 0) {
    return `${label} gets extra time early so the rest of the plan has a stable base.`;
  }
  const joined = facts.join(", and ");
  return `${label} should get additional study time in the first weeks because ${joined}.`;
}

function intensityFor(
  weeks: number,
  underprepared: boolean,
  highCount: number,
  input: StudyPlanInput,
  available: number,
): Intensity {
  if (weeks <= 3 && underprepared) return "critical";
  if (weeks <= 5 || (weeks <= 7 && underprepared)) return "intensive";
  if (weeks >= 14 && (input.startedStudying === false || available < 8)) return "foundation";
  if (highCount >= 1) return "focused";
  return "balanced";
}

const INTENSITY_COPY: Record<Intensity, { label: string; note: string; status: string }> = {
  foundation: {
    label: "Foundation",
    note: "You have room to build the fundamentals before timed practice takes over.",
    status: "Building the fundamentals",
  },
  balanced: {
    label: "Balanced",
    note: "Your timeline and current preparation support a steady mix of review and practice.",
    status: "Steady preparation",
  },
  focused: {
    label: "Focused",
    note: "A few sections need more structure than a generic schedule would give them.",
    status: "Needs structured preparation",
  },
  intensive: {
    label: "Intensive",
    note: "Your timeline is short enough that the plan stays narrow and consistent.",
    status: "A tight, structured stretch",
  },
  critical: {
    label: "Critical",
    note: "Your timeline is tight, so your plan needs to be highly structured and focused.",
    status: "Highly structured preparation",
  },
};

function practiceShare(weeks: number): number {
  if (weeks <= 2) return 0.4;
  if (weeks <= 4) return 0.32;
  if (weeks <= 8) return 0.24;
  return 0.18;
}

function allocateHours(total: number, levels: Record<SectionId, PriorityLevel>, weeks: number): SectionHours[] {
  const share = practiceShare(weeks);
  const practice = roundHalf(total * share);
  const remaining = roundHalf(Math.max(0, total - practice));
  const weight: Record<PriorityLevel, number> = { high: 1.8, medium: 1, low: 0.7 };
  const sum = SECTION_IDS.reduce((totalWeight, id) => totalWeight + weight[levels[id]], 0);
  const rows: SectionHours[] = SECTION_IDS.map((id) => ({
    section: id,
    label: SECTION_LABELS[id],
    hours: sum === 0 ? 0 : roundHalf((remaining * weight[levels[id]]) / sum),
  }));
  const drift = roundHalf(remaining - rows.reduce((sumHours, row) => sumHours + row.hours, 0));
  if (rows[0]) rows[0].hours = roundHalf(rows[0].hours + drift);
  rows.push({ section: "practice", label: "Practice review", hours: practice });
  return rows;
}

function phaseSequence(total: number): Phase[] {
  let finalCount = total <= 2 ? total : 1;
  let conditioning = total <= 3 ? 0 : total <= 6 ? Math.min(2, total - finalCount) : Math.max(1, Math.round(total * 0.25));
  let foundation = total >= 8 ? Math.max(1, Math.round(total * 0.35)) : total >= 5 ? 1 : 0;
  let reinforcement = total - foundation - conditioning - finalCount;
  while (reinforcement < 0 && foundation > 0) {
    foundation -= 1;
    reinforcement += 1;
  }
  while (reinforcement < 0 && conditioning > 0) {
    conditioning -= 1;
    reinforcement += 1;
  }
  while (reinforcement < 0 && finalCount > 1) {
    finalCount -= 1;
    reinforcement += 1;
  }
  const phases: Phase[] = [];
  const push = (phase: Phase, count: number) => {
    for (let i = 0; i < count; i += 1) phases.push(phase);
  };
  push("foundation", foundation);
  push("reinforcement", reinforcement);
  push("conditioning", conditioning);
  push("final", finalCount);
  return phases.slice(0, total);
}

const PHASE_LABEL: Record<Phase, string> = {
  foundation: "Foundation",
  reinforcement: "Reinforcement",
  conditioning: "Exam conditioning",
  final: "Final review",
};

const WEEK_TITLES: Record<Phase, string[]> = {
  foundation: ["Build the Foundation", "Strengthen Weak Topics", "Fill Content Gaps"],
  reinforcement: ["Add Timed Practice", "Review Your Error Log", "Raise Accuracy"],
  conditioning: ["Full-Length Practice", "Exam Timing"],
  final: ["High-Yield Review", "Protect Your Routine"],
};

function questionBankLine(input: StudyPlanInput): string {
  const named = input.currentResources.some((resource) =>
    ["bootcamp", "booster", "kaplan", "princeton", "school"].includes(resource),
  );
  return named
    ? "Work through the question bank you already use, aimed at this week's focus"
    : "Complete a targeted set of practice questions on this week's focus";
}

function tasksFor(phase: Phase, primary: string, secondary: string, input: StudyPlanInput): string[] {
  const bank = questionBankLine(input);
  if (phase === "foundation") {
    return [
      `Review ${primary} fundamentals before adding new topics`,
      bank,
      `Start or continue high-yield ${secondary} review`,
      primary === "Perceptual Ability"
        ? "Add 3 short review sessions in your next science section"
        : "Do 3 short perceptual-ability sessions",
      "Create an error log and write the reason for each miss",
      "Finish with one untimed mixed block and note what felt slow",
    ];
  }
  if (phase === "reinforcement") {
    return [
      `Drill the ${primary} topics that showed up in your error log`,
      bank,
      `Add a timed set for ${secondary}`,
      "Review every missed question before starting new content",
      "Keep one PAT or reading session on the calendar",
      "Check that your study days still match the hours you planned",
    ];
  }
  if (phase === "conditioning") {
    return [
      "Take one full-length or a long timed section block",
      `Spend the next session only on misses from ${primary}`,
      bank,
      "Practice the section that runs long before you add new notes",
      "Review pacing: where did you rush, and where did you stall?",
      "Keep the day before a practice test light",
    ];
  }
  return [
    `Review high-yield ${primary} notes, not new textbooks`,
    "Redo missed questions from your error log",
    "One short timed set, then stop",
    "Confirm your test-day timing, sleep, and what you will eat",
    "No major new content this week",
  ];
}

function formatClock(totalMinutes: number): string {
  const minutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour}:${mins.toString().padStart(2, "0")} ${suffix}`;
}

function exampleDay(input: StudyPlanInput, primary: string, secondary: string): { blocks: DayBlock[]; note: string } {
  const weekdayHours = WEEKDAY_HOURS[input.weekdayAvailability];
  const startHour =
    input.currentStatus === "working-full-time" ? 18 : input.currentStatus === "working-part-time" ? 17 : 9;
  const totalMin = Math.max(30, Math.round(weekdayHours * 60));
  const shares =
    totalMin < 90
      ? [
          { share: 0.7, label: `${primary} review` },
          { share: 0.3, label: "Error log review" },
        ]
      : [
          { share: 0.4, label: `${primary} review` },
          { share: 0.25, label: "Practice questions" },
          { share: 0.2, label: `${secondary} review` },
          { share: 0.15, label: "Error log review" },
        ];

  let cursor = startHour * 60;
  const blocks: DayBlock[] = [];
  shares.forEach((block, index) => {
    const length = index === shares.length - 1 ? startHour * 60 + totalMin - cursor : Math.max(20, Math.round(totalMin * block.share));
    const end = cursor + length;
    blocks.push({ time: `${formatClock(cursor)}–${formatClock(end)}`, label: block.label });
    cursor = end;
    if (index === 0 && totalMin >= 120 && index < shares.length - 1) {
      blocks.push({ time: "Break", label: "Step away before the next block" });
    }
  });

  const note =
    weekdayHours < 1.5
      ? "This sample day follows the shorter weekday block you said you can keep."
      : input.currentStatus === "working-full-time" || input.currentStatus === "working-part-time"
        ? "This sample day starts in the evening because you are working."
        : "Move these blocks to the time of day you actually study. Keep the order.";

  return { blocks, note };
}

function tutorButton(primary: SectionId, level: PriorityLevel): string {
  if (level !== "high") return "Find My DAT Tutor";
  switch (primary) {
    case "organicChemistry":
      return "Get Matched With an Organic Chemistry Tutor";
    case "biology":
      return "Find a Biology DAT Tutor";
    case "generalChemistry":
      return "Find a General Chemistry DAT Tutor";
    case "perceptualAbility":
      return "Find a PAT Tutor";
    case "readingComprehension":
      return "Find a Reading Comprehension Tutor";
    case "quantitativeReasoning":
      return "Find a Quantitative Reasoning Tutor";
    default:
      return "Find My DAT Tutor";
  }
}

export function generateDatStudyPlan(input: StudyPlanInput, today = todayInNewYork()): GeneratedPlan {
  const scale = input.diagnosticTaken ? scoreScale(input) : null;
  const points = Object.fromEntries(SECTION_IDS.map((id) => [id, sectionPoints(input, id, scale)])) as Record<
    SectionId,
    number
  >;
  const sectionLevels = Object.fromEntries(SECTION_IDS.map((id) => [id, levelFor(points[id])])) as Record<
    SectionId,
    PriorityLevel
  >;
  const ranked = [...SECTION_IDS].sort((a, b) => points[b] - points[a] || SECTION_IDS.indexOf(a) - SECTION_IDS.indexOf(b));
  const primary = ranked[0] ?? "biology";
  const secondary = ranked[1] ?? "generalChemistry";
  const third = ranked[2] ?? "organicChemistry";
  const highCount = SECTION_IDS.filter((id) => sectionLevels[id] === "high").length;
  const available = weeklyAvailableHours(input);
  const { days, weeks } = weeksFromInput(input, today);
  const underprepared =
    input.startedStudying === false ||
    highCount >= 2 ||
    hasLargeScoreGap(input) ||
    input.biggestChallenges.includes("behind") ||
    input.biggestChallenges.includes("low-scores");
  const intensity = intensityFor(weeks, underprepared, highCount, input, available);
  const copy = INTENSITY_COPY[intensity];
  const hoursLabelLow = Math.max(1, Math.round(available - Math.max(1, available * 0.1)));
  const hoursLabelHigh = Math.max(hoursLabelLow, Math.round(available + Math.max(1, available * 0.1)));
  const weekCount = Math.min(12, Math.max(1, Math.round(weeks)));
  const phases = phaseSequence(weekCount);
  const sectionHours = allocateHours(available, sectionLevels, weeks);
  const primaryLabel = SECTION_LABELS[primary];
  const secondaryLabel = SECTION_LABELS[secondary];

  const weeksPlan: WeekPlan[] = phases.map((phase, index) => {
    const titles = WEEK_TITLES[phase];
    const title = titles[index % titles.length] ?? titles[0] ?? "Study Week";
    return {
      week: index + 1,
      title,
      phase,
      phaseLabel: PHASE_LABEL[phase],
      focus: `${primaryLabel} + ${secondaryLabel}`,
      hours: available,
      tasks: tasksFor(phase, primaryLabel, secondaryLabel, input),
      checkpoint: [...CHECKPOINT],
    };
  });

  const day = exampleDay(input, primaryLabel, secondaryLabel);
  const timelineLabel = days == null ? `${weeks} weeks` : `${round1(days / 7)} weeks`;
  const timelineNote =
    days == null
      ? input.plannedDatWindow === "not-sure"
        ? "You do not have a test date yet, so this roadmap uses a 12-week window you can move."
        : "This roadmap uses the window you selected. Set a test date when you have one and generate the plan again."
      : `You have ${days} day${days === 1 ? "" : "s"} until your DAT.`;

  const priorities = [primary, secondary, third].map((id) => ({
    section: id,
    label: SECTION_LABELS[id],
    level: sectionLevels[id],
    reason: reasonFor(input, id, sectionLevels[id], scale),
  }));

  return {
    daysUntilExam: days,
    weeksUntilExam: weeks,
    timelineLabel,
    timelineNote: weekCount < Math.round(weeks) ? `${timelineNote} This roadmap covers the next ${weekCount} weeks.` : timelineNote,
    recommendedHoursPerWeek: available,
    hoursLabel: `${hoursLabelLow}–${hoursLabelHigh} hrs/week`,
    hoursNote:
      available < 8
        ? "The weekly load matches the hours you said you can keep. Consistency matters more than adding a longer day you will skip."
        : "The weekly load is built from the weekday and weekend hours you selected.",
    preparationIntensity: intensity,
    intensityLabel: copy.label,
    intensityNote: copy.note,
    statusLabel: copy.status,
    primaryPriority: primary,
    secondaryPriority: secondary,
    primaryLabel,
    secondaryLabel,
    priorities,
    sectionLevels,
    sectionHours,
    weeks: weeksPlan,
    weeksCovered: weekCount,
    longerTimeline: Math.round(weeks) > 12,
    exampleDay: day.blocks,
    exampleDayNote: day.note,
    tutorButton: tutorButton(primary, sectionLevels[primary]),
    guidanceNote: GUIDANCE_NOTE,
    targetLabel: input.targetScore == null ? "Not sure" : String(input.targetScore),
  };
}
