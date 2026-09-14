import type { ContactPayload } from "@/lib/contact";

export type TutorApplyPayload = {
  name: string;
  email: string;
  phone: string;
  school: string;
  year: string;
  datScore: string;
  subjects: string[];
  hoursPerWeek: string;
  timezone: string;
  studentsTaught: string;
  hourlyRate: string;
  videoUrl: string;
  notes: string;
};

export const TUTOR_SUBJECTS = [
  "Biology",
  "General Chemistry",
  "Organic Chemistry",
  "PAT",
  "QR",
  "RC",
] as const;

export function parseTutorApplyPayload(body: unknown): TutorApplyPayload | null {
  if (!body || typeof body !== "object") return null;

  const raw = body as Record<string, unknown>;
  const str = (key: string) => (typeof raw[key] === "string" ? raw[key].trim() : "");

  const name = str("name");
  const email = str("email");
  const phone = str("phone");
  const school = str("school");
  const year = str("year");
  const datScore = str("datScore");
  const hoursPerWeek = str("hoursPerWeek");
  const timezone = str("timezone");
  const studentsTaught = str("studentsTaught");
  const hourlyRate = str("hourlyRate");
  const videoUrl = str("videoUrl");
  const notes = str("notes");

  const subjects = Array.isArray(raw.subjects)
    ? raw.subjects.filter(
        (s): s is string =>
          typeof s === "string" && TUTOR_SUBJECTS.includes(s as (typeof TUTOR_SUBJECTS)[number]),
      )
    : [];

  if (!name || !email || !school || !year || !datScore || subjects.length === 0 || !hoursPerWeek || !timezone) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return {
    name,
    email,
    phone,
    school,
    year,
    datScore,
    subjects,
    hoursPerWeek,
    timezone,
    studentsTaught,
    hourlyRate,
    videoUrl,
    notes,
  };
}

export function tutorApplyToContact(payload: TutorApplyPayload): ContactPayload {
  const message = [
    "DAT tutor application",
    `Phone: ${payload.phone || "—"}`,
    `School / program: ${payload.school}`,
    `Year: ${payload.year}`,
    `DAT AA (or equivalent): ${payload.datScore}`,
    `Subjects: ${payload.subjects.join(", ")}`,
    `Hours/week: ${payload.hoursPerWeek}`,
    `Timezone: ${payload.timezone}`,
    `Students taught: ${payload.studentsTaught || "—"}`,
    `Expected $/hr: ${payload.hourlyRate || "—"}`,
    `Intro video: ${payload.videoUrl || "—"}`,
    "",
    payload.notes || "(no additional notes)",
  ].join("\n");

  return {
    name: payload.name,
    email: payload.email,
    subject: "DAT Tutor Application",
    message,
  };
}
