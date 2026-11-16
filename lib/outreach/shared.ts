// Outreach tracker: types, labels and message templates. Safe to import from client and server.

export const OUTREACH_STATUSES = [
  "to-contact",
  "contacted",
  "followed-up",
  "replied",
  "in-progress",
  "link-live",
  "declined",
  "no-response",
] as const;
export type OutreachStatus = (typeof OUTREACH_STATUSES)[number];

export const OUTREACH_STATUS_LABELS: Record<OutreachStatus, string> = {
  "to-contact": "To contact",
  contacted: "Contacted",
  "followed-up": "Followed up",
  replied: "Replied",
  "in-progress": "In progress",
  "link-live": "Link live",
  declined: "Declined",
  "no-response": "No response",
};

export const OUTREACH_STATUS_STYLES: Record<OutreachStatus, string> = {
  "to-contact": "bg-slate-100 text-slate-700 ring-slate-200",
  contacted: "bg-sky-50 text-sky-700 ring-sky-200",
  "followed-up": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  replied: "bg-amber-50 text-amber-800 ring-amber-200",
  "in-progress": "bg-violet-50 text-violet-700 ring-violet-200",
  "link-live": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  declined: "bg-rose-50 text-rose-700 ring-rose-200",
  "no-response": "bg-slate-50 text-slate-500 ring-slate-200",
};

export const OUTREACH_KINDS = [
  "club",
  "advising-office",
  "blog",
  "directory",
  "podcast",
  "instagram",
  "other",
] as const;
export type OutreachKind = (typeof OUTREACH_KINDS)[number];

export const OUTREACH_KIND_LABELS: Record<OutreachKind, string> = {
  club: "Pre-dental club",
  "advising-office": "Advising office",
  blog: "Blog / website",
  directory: "Directory / list",
  podcast: "Podcast / YouTube",
  instagram: "Instagram page",
  other: "Other",
};

export const isOutreachStatus = (s: string): s is OutreachStatus =>
  (OUTREACH_STATUSES as readonly string[]).includes(s);
export const isOutreachKind = (s: string): s is OutreachKind =>
  (OUTREACH_KINDS as readonly string[]).includes(s);

export type OutreachTarget = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  organization: string;
  state: string;
  kind: OutreachKind;
  status: OutreachStatus;
  contact_name: string;
  email: string;
  instagram: string;
  website: string;
  discount_code: string;
  link_url: string;
  last_contacted_on: string | null;
  next_follow_up_on: string | null;
  notes: string;
};

/** Days to wait before the next follow-up after a message goes out. */
export const FOLLOW_UP_DAYS = 7;
export const DISCOUNT_PERCENT = 10;

export const displayName = (
  t: Pick<OutreachTarget, "name" | "organization">,
) =>
  t.organization && t.name
    ? `${t.organization} ${t.name}`
    : t.organization || t.name || "(no name)";

export const instagramUrl = (handle: string) =>
  handle
    ? `https://instagram.com/${handle.replace(/^@/, "").replace(/\/+$/, "")}`
    : "";

/** Message templates from the outreach kit, filled in for one target. */
export function outreachMessages(
  t: Pick<OutreachTarget, "name" | "organization" | "discount_code">,
) {
  const club = displayName(t);
  const code = t.discount_code || "[CODE]";
  const dm = `Hi! I'm with Future Dental Prep (futuredentalprep.com). We're a team of dentists and dental students who help pre-dents with the DAT and dental school applications.

We'd love to support ${club} members with:
• ${DISCOUNT_PERCENT}% off DAT tutoring and application help (personal statement, secondaries, interview prep) with the code ${code}
• Free tools for your resources page: a secondaries guide for 50+ dental schools, a DAT score calculator and an AADSAS GPA calculator

Would your officer team be open to sharing these with your members? Happy to send more details!`;

  const emailSubject = `Free resources + member discount for ${club}`;
  const emailBody = `Hi ${club} team,

I'm from Future Dental Prep (https://futuredentalprep.com). We're a team of dentists and dental students who help pre-dental students with the DAT and dental school applications.

We'd love to support your members with:

An exclusive member discount
${DISCOUNT_PERCENT}% off DAT tutoring and application help (personal statement, secondaries, interview prep) with the code ${code}

Free resources for your members or resources page
- Dental school secondary questions guide (50+ schools): https://futuredentalprep.com/secondaries
- DAT score calculator (new 200–600 scale): https://futuredentalprep.com/dat-score-calculator
- AADSAS GPA calculator: https://futuredentalprep.com/aadsas-gpa-calculator
- Free DAT study plan generator: https://futuredentalprep.com/dat-study-plan-generator

If it's helpful, we'd appreciate it if you could share these with your members or add them to your resources page.

Thank you, and good luck to your members this cycle!

Future Dental Prep
https://futuredentalprep.com
futuredentistpreparation@gmail.com`;

  const followUp = `Hi ${club} team, just following up on my note last week. Happy to send the member discount code (${code}) and our free secondaries guide and DAT calculator for your members whenever it's useful. Thanks!`;

  return { dm, emailSubject, emailBody, followUp };
}

/** Gmail account outreach emails go out from (Gmail opens in this account if you are signed in to it). */
export const OUTREACH_FROM_EMAIL = "futuredentistpreparation@gmail.com";

/** Gmail "new message" window with recipient, subject and body already filled in. */
export function gmailComposeUrl(to: string, subject: string, body: string) {
  const q = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
    authuser: OUTREACH_FROM_EMAIL,
  });
  return `https://mail.google.com/mail/?${q}`;
}
