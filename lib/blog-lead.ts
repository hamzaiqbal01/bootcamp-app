export const BLOG_LEAD_OFFERS = {
  "dat-dates-2027": {
    heading: "Check your DAT date against your deadlines",
    body: "Tell us your planned test month and the cycle you are applying. We email back whether that date still leaves time.",
    subject: "DAT date check",
    placeholder: "Example: testing March 2027, applying Fall 2027, no school list yet",
  },
  "dental-school-application-timeline-fall-2027": {
    heading: "Get a timeline for your own file",
    body: "Tell us your cycle and whether the DAT is done. We email a date order you can follow.",
    subject: "Application timeline",
    placeholder: "Example: applying Fall 2027, DAT not taken, transcript still in progress",
  },
  "dental-school-prerequisites": {
    heading: "Not sure a course counts?",
    body: "Send the course name and the school you are aiming at. We email back whether it is usually accepted.",
    subject: "Prerequisite check",
    placeholder: "Example: Anatomy at a community college, aiming at UCSF",
  },
} as const;

export type BlogLeadSlug = keyof typeof BLOG_LEAD_OFFERS;

export function blogHasLeadForm(slug: string): slug is BlogLeadSlug {
  return slug in BLOG_LEAD_OFFERS;
}
