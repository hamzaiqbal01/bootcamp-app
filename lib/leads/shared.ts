// Client-safe lead types and helpers (no secrets, no server imports).

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "follow-up",
  "converted",
  "not-interested",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "follow-up": "Follow-up",
  converted: "Converted",
  "not-interested": "Not interested",
  spam: "Spam",
};

export const LEAD_STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  contacted: "bg-sky-50 text-sky-700 ring-sky-200",
  "follow-up": "bg-amber-50 text-amber-800 ring-amber-200",
  converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "not-interested": "bg-slate-100 text-slate-600 ring-slate-200",
  spam: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const LEAD_SOURCES = ["contact", "tutor-apply", "sheet", "manual"] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  contact: "Contact form",
  "tutor-apply": "Tutor application",
  sheet: "Google Sheet",
  manual: "Added manually",
};

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  notes: string;
};

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && (LEAD_STATUSES as readonly string[]).includes(value);
}

export function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === "string" && (LEAD_SOURCES as readonly string[]).includes(value);
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}

function replySubject(subject: string): string {
  const s = subject.trim();
  if (!s) return "Re: Your message to Future Dental Prep";
  return /^re:/i.test(s) ? s : `Re: ${s}`;
}

function replyBody(lead: Pick<Lead, "name" | "message">): string {
  const greeting = firstName(lead.name) ? `Hi ${firstName(lead.name)},` : "Hi,";
  const original = lead.message.trim();
  const quoted = original
    ? `\n---\nYour message:\n${original.length > 600 ? `${original.slice(0, 600)}…` : original}`
    : "";
  return `${greeting}\n\nThanks for reaching out to Future Dental Prep.\n\n${quoted}`;
}

/** Opens the default mail app (Outlook, Apple Mail, Gmail app on phone…). */
export function mailtoReplyUrl(lead: Pick<Lead, "name" | "email" | "subject" | "message">): string {
  const params = new URLSearchParams({
    subject: replySubject(lead.subject),
    body: replyBody(lead),
  });
  // mailto expects %20 for spaces, not "+"
  return `mailto:${encodeURIComponent(lead.email)}?${params.toString().replaceAll("+", "%20")}`;
}

/** Opens a Gmail compose window in the browser. */
export function gmailReplyUrl(lead: Pick<Lead, "name" | "email" | "subject" | "message">): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: lead.email,
    su: replySubject(lead.subject),
    body: replyBody(lead),
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
