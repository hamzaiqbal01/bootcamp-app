/**
 * Optional per-school SEO uniqueness fields.
 * Fees change by cycle — prefer "confirm on admissions site" over guessed amounts.
 */
export type SchoolEnrichment = {
  secondaryFee?: string;
  timingNote?: string;
  admissionsUrl?: string;
  cycleLabel?: string;
};

/** Defaults applied when a school has no override. */
export const DEFAULT_SCHOOL_ENRICHMENT: Required<
  Pick<SchoolEnrichment, "secondaryFee" | "timingNote" | "cycleLabel">
> = {
  secondaryFee:
    "Confirm on the school's admissions page for the current cycle (applicants commonly see ~$50–$150).",
  timingNote:
    "Most dental school secondaries arrive July–early September after AADSAS verification. Aim to submit within ~14 days.",
  cycleLabel: "2026–27",
};

/**
 * Priority overrides (GSC impressions + common applicant lookups).
 * admissionsUrl should be the official DMD/DDS admissions page when known.
 */
export const schoolEnrichments: Record<string, SchoolEnrichment> = {
  "university-of-alabama-school-of-dentistry": {
    admissionsUrl: "https://www.uab.edu/dentistry/home/admissions",
    cycleLabel: "2026–27",
    timingNote:
      "UAB emails secondaries after verification — all in-state; OOS selectively. Peak volume July–September. 2026–27 added Rural Scholars / VEEP / SHPEP checkboxes; older essay prompts may still appear in email.",
    secondaryFee:
      "Confirm current secondary fee on UAB Dentistry admissions (often in the common $50–$150 range).",
  },
  "at-still-university-arizona-school-of-dentistry": {
    admissionsUrl:
      "https://www.atsu.edu/arizona-school-of-dentistry-and-oral-health/admissions",
    timingNote:
      "ASDOH supplemental questions are typically mailed to qualifying applicants after primary review.",
    secondaryFee:
      "Confirm the current ASDOH supplemental fee on ATSU admissions before you budget.",
  },
  "midwestern-university-college-of-dental-medicine-illinois": {
    admissionsUrl:
      "https://www.midwestern.edu/academics/degrees-and-programs/doctor-of-dental-medicine-il",
    timingNote:
      "CDMI / MWU-IL emails a secondary to applicants; complete promptly under rolling review.",
  },
  "midwestern-university-college-of-dental-medicine-arizona": {
    admissionsUrl:
      "https://www.midwestern.edu/academics/degrees-and-programs/doctor-of-dental-medicine-az",
  },
  "dental-college-of-georgia-augusta-university": {
    admissionsUrl: "https://www.augusta.edu/dentalmedicine/admissions/",
    timingNote:
      "DCG supplemental questions are submitted via AADSAS to qualifying applicants — often mid-summer after verification.",
  },
  "university-of-new-england-college-of-dental-medicine": {
    admissionsUrl: "https://www.une.edu/dentalmedicine/admissions",
    timingNote:
      "UNE CDM secondary timing follows AADSAS verification; check UNE admissions for the current cycle window.",
  },
  "nyu-college-of-dentistry": {
    admissionsUrl:
      "https://dental.nyu.edu/academicprograms/dds-program/admissions.html",
    cycleLabel: "2026–27",
    timingNote:
      "2026–27: Why NYU may still appear in AADSAS; after the NYU fee, complete the Kira Talent video interview. Confirm both in the current portal.",
  },
  "unc-adams-school-of-dentistry": {
    admissionsUrl: "https://dentistry.unc.edu/academic-affairs/admissions/",
    cycleLabel: "2026–27",
    timingNote:
      "2026–27 UNC prompts were updated (combined DAT/GPA reflection; Advocate / Clinician / Thinker pairs). Confirm wording in AADSAS.",
  },
  "university-of-pennsylvania-school-of-dental-medicine": {
    admissionsUrl: "https://www.dental.upenn.edu/admissions-academics/dmd-program/how-to-apply/",
    cycleLabel: "2026–27",
    timingNote:
      "2026–27 Penn portal: fit-for-dentistry, team/conflict, and Why Penn (about 1000 words each). Older ethics / success-dentist prompts were dropped.",
  },
  "university-of-minnesota-school-of-dentistry": {
    admissionsUrl: "https://dentistry.umn.edu/admissions",
    timingNote:
      "Minnesota dental secondary materials follow AADSAS; this page is for the School of Dentistry — not UMN medical school.",
  },
  "western-university-health-sciences-college-of-dental-medicine": {
    admissionsUrl: "https://prospective.westernu.edu/dentistry/dmd/",
    timingNote:
      "WesternU College of Dental Medicine secondaries are dental-program specific (not WesternU medical school).",
  },
  "boston-university-school-of-dental-medicine": {
    admissionsUrl: "https://www.bu.edu/dental/admissions/",
    timingNote:
      "BU / GSDM dental secondary — not Boston University School of Medicine secondaries.",
  },
  "tufts-university-school-of-dental-medicine": {
    admissionsUrl: "https://dental.tufts.edu/admissions",
    timingNote:
      "Tufts dental often emphasizes interview-stage writing for some prompts — confirm current-cycle distribution on Tufts Dental admissions (not Tufts School of Medicine).",
  },
  "ucla-school-of-dentistry": {
    admissionsUrl: "https://dentistry.ucla.edu/admissions",
  },
  "usc-ostrow-school-of-dentistry": {
    admissionsUrl: "https://dentistry.usc.edu/admission/",
  },
};
