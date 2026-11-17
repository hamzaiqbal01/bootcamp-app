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

export const OUTREACH_INSTAGRAM = "https://www.instagram.com/futuredentalprep/";

/** Message templates for one target: dentists + 1-on-1 tutoring first, free club website as the extra. */
export function outreachMessages(
  t: Pick<OutreachTarget, "name" | "organization" | "discount_code" | "contact_name">,
) {
  const club = displayName(t);
  const code = t.discount_code || "[CODE]";
  const hi = t.contact_name ? `Hi ${t.contact_name.trim().split(/\s+/)[0]},` : `Hi ${club} team,`;

  const emailSubject = `1-on-1 DAT tutoring + a free website for ${club}`;
  const emailBody = `${hi}

I'm reaching out from Future Dental Prep, a team of dentists and current dental students at Penn, UConn and Case Western. We'd love to partner with ${club}: discounted 1-on-1 tutoring for your members, and a free website for your club.

We offer 1-on-1 DAT tutoring and one-on-one help with dental school applications: personal statements, secondaries and interviews. Every student works directly with their own tutor, someone who took the DAT and got into dental school recently.

Our tutors also include Dr. Todd Chastain, DMD, a practicing dentist and faculty member at UAB School of Dentistry, with 10+ years of tutoring experience.
https://futuredentalprep.com/about

What ${club} gets:
- ${DISCOUNT_PERCENT}% off 1-on-1 tutoring and application help with code ${code}
- A free club website (officers, events, join form, resources), built by us and handed over at no cost
- Free tools for members: DAT Score Calculator (https://futuredentalprep.com/dat-score-calculator) and AADSAS GPA Calculator (https://futuredentalprep.com/aadsas-gpa-calculator)

In return, we'd just ask you to list us as a club partner and share the code with members once a semester. No cost, no contract.

Would you be open to partnering? A simple "yes" is enough, and I'll send the details.

Best,
Future Dental Prep
Website: https://futuredentalprep.com
Instagram: @futuredentalprep (${OUTREACH_INSTAGRAM})`;

  const followUp = `${hi}

Following up on my note. We'd still love to offer ${club} members ${DISCOUNT_PERCENT}% off 1-on-1 DAT tutoring and application help, and build your club a free website.
https://futuredentalprep.com/private-dat-tutoring

You can also see what we share on Instagram: ${OUTREACH_INSTAGRAM}

Would you be open to it?

Best,
Future Dental Prep`;

  const dm = `Hi! We're Future Dental Prep (@futuredentalprep), a team of dentists and dental students at Penn, UConn and Case Western offering 1-on-1 DAT tutoring and dental school application help.

We'd love to partner with ${club}:
• ${DISCOUNT_PERCENT}% off 1-on-1 tutoring for your members with code ${code}
• A free website for your club, built by us at no cost
• Free tools: DAT score calculator and AADSAS GPA calculator (futuredentalprep.com)

All we'd ask is to be listed as a club partner and to share the code once a semester. Would your officer team be open to it?`;

  const dmFollowUp = `Hi! Just following up. We'd still love to give ${club} members ${DISCOUNT_PERCENT}% off 1-on-1 DAT tutoring and build your club a free website. Would your officers be open to a quick chat?`;

  return { dm, dmFollowUp, emailSubject, emailBody, followUp };
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
