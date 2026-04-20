export type ServiceBadge = "platinum" | "gold" | "express" | "course";

export type IncludeEntry =
  | string
  | { text: string; sub: string[] };

export type ServicePackage = {
  id: string;
  badge?: ServiceBadge;
  title: string;
  price: string;
  priceUnit?: string;
  /** Second price segment, e.g. General Consulting */
  priceAlt?: string;
  includes: IncludeEntry[];
  descriptions: string[];
  notes?: string[];
  cta: string;
  ctaVariant?: "primary" | "white";
  featured?: boolean;
  ribbon?: string;
  courseIntros?: string[];
  /** Paragraph after the bullet list (e.g. interview course) */
  courseClosing?: string[];
};
