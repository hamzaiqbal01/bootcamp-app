// Free student tools. Shared by the homepage tools grid, each tool page's "related tools" list, and the sitemap.
export type ToolTone = "blue" | "green" | "purple" | "orange";

export type FreeTool = {
  slug: string;
  title: string;
  /** One line for cards. */
  summary: string;
  tone: ToolTone;
};

export const freeTools: FreeTool[] = [
  {
    slug: "dat-study-plan-generator",
    title: "DAT Study Plan Generator",
    summary: "A free plan built from your test date and the section that needs the hours.",
    tone: "blue",
  },
  {
    slug: "aadsas-gpa-calculator",
    title: "AADSAS GPA calculator",
    summary: "Overall, science (BCP), and subject GPAs from your courses.",
    tone: "green",
  },
  {
    slug: "dat-score-calculator",
    title: "DAT score calculator",
    summary: "Academic Average and Total Science from your section scores.",
    tone: "purple",
  },
  {
    slug: "personal-statement-character-counter",
    title: "Personal statement counter",
    summary: "Live character count against the 4,500-character AADSAS limit.",
    tone: "orange",
  },
];
