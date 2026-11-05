// Facts for /canada, checked against each school's own admissions page in November 2026 (2026–27 cycle,
// Fall 2027 entry). Requirements change every cycle: re-check every row before each new cycle.

export const CANADA_CHECKED = "November 2026";

export type CanadianSchool = {
  name: string;
  province: string;
  program: string;
  apply: string;
  dat: string;
  deadline: string;
  notes: string[];
  url: string;
  /** Taught in French. */
  french?: boolean;
  /** Takes applications through ADEA AADSAS (alone or as an option). */
  aadsas?: boolean;
};

export const canadianSchools: CanadianSchool[] = [
  {
    name: "University of British Columbia",
    province: "British Columbia",
    program: "DMD",
    apply: "ADEA AADSAS",
    dat: "Canadian or American DAT, written by August 31, 2026",
    deadline: "October 10, 2026",
    notes: [
      "Interviews and a problem-based learning assessment",
      "A limited number of international seats",
    ],
    url: "https://www.dentistry.ubc.ca/education/dmd/dmd-admission-procedures/",
    aadsas: true,
  },
  {
    name: "University of Alberta",
    province: "Alberta",
    program: "DDS",
    apply: "UAlberta Launchpad",
    dat: "Canadian DAT only; the American DAT is not accepted. Minimum 15 in SNS, PAT and RC",
    deadline: "July 1 – November 1, 2026",
    notes: [
      "Personal Experiences forms",
      "Casper",
      "MMI interview plus a written statement",
      "32 seats, at least 29 for Alberta residents",
    ],
    url: "https://www.ualberta.ca/en/school-of-dentistry/programs-and-admissions/dentistry/dds-doctor-of-dental-surgery.html",
  },
  {
    name: "University of Saskatchewan",
    province: "Saskatchewan",
    program: "DMD",
    apply: "USask portal (international applicants use AADSAS)",
    dat: "Canadian DAT, written by November 30, 2026. Minimums: AA 15, PAT 14, RC 14",
    deadline: "August 1 – November 15, 2026 (documents by December 1)",
    notes: [
      "MMI interview",
      "36 students a year; Saskatchewan residency means 4 years in the province",
    ],
    url: "https://admissions.usask.ca/dentistry.php",
  },
  {
    name: "University of Manitoba",
    province: "Manitoba",
    program: "DMD",
    apply: "U of M portal",
    dat: "Canadian DAT (English). A best PAT under 14 rules you out of an interview",
    deadline: "Check the school page (last posted: January 15, 2026)",
    notes: [
      "CDA structured panel interview",
      "At least 25 of 29 seats for Manitobans; citizens and PRs only",
    ],
    url: "https://umanitoba.ca/explore/undergraduate-admissions/requirements/dentistry",
  },
  {
    name: "Western University (Schulich)",
    province: "Ontario",
    program: "DDS",
    apply: "OUAC",
    dat: "Canadian or American DAT within 2 years. Reading Comprehension required, so the French DAT is not accepted",
    deadline: "November 1 (2026–27 cycle closed)",
    notes: [
      "Autobiographical sketch",
      "Casper",
      "About 30-minute virtual panel interview",
      "International Applicant Pathway",
    ],
    url: "https://www.schulich.uwo.ca/med-dent-admissions/dentistry/how-to-apply.html",
  },
  {
    name: "University of Toronto",
    province: "Ontario",
    program: "DDS",
    apply: "UTDAS (the school's own system) or ADEA AADSAS",
    dat: "Canadian or American DAT within 24 months. Only Academic Average and PAT are used",
    deadline: "September 1 – November 1, 2026",
    notes: [
      "Casper",
      "Personal statement and an accomplishment essay",
      "20-minute interview with two faculty in February",
    ],
    url: "https://www.dentistry.utoronto.ca/prospective-students/undergraduate/DDS",
    aadsas: true,
  },
  {
    name: "McGill University",
    province: "Quebec",
    program: "DMD",
    apply: "McGill applicant portal",
    dat: "Not required for 2026–27; future cycles under review",
    deadline: "November 1, 2026 (documents by November 3)",
    notes: [
      "Casper (English or French)",
      "Virtual MMI in February",
      "Quebec applicants need B2 French",
    ],
    url: "https://www.mcgill.ca/dentistry/4-year-dmd-program/requirements",
  },
  {
    name: "Université de Montréal",
    province: "Quebec",
    program: "DMD",
    apply: "UdeM admission portal",
    dat: "Not required for Fall 2027 (Casper not required either)",
    deadline: "November 1, 2026 for university and out-of-Quebec applicants",
    notes: [
      "Motivation questionnaire (60% of the decision)",
      "Possible interview in French",
      "Citizens and PRs only",
    ],
    url: "https://admission.umontreal.ca/programmes/doctorat-de-1er-cycle-en-medecine-dentaire/",
    french: true,
  },
  {
    name: "Université Laval",
    province: "Quebec",
    program: "DMD",
    apply: "ULaval admission",
    dat: "Canadian DAT: only the PAT counts, minimum 15/30",
    deadline: "March 1, 2027 (international: February 1)",
    notes: [
      "French Casper",
      "Structured interview",
      "48 seats for Quebec residents; non-Quebec admission is unlikely",
    ],
    url: "https://www.ulaval.ca/etudes/programmes/doctorat-en-medecine-dentaire",
    french: true,
  },
  {
    name: "Dalhousie University",
    province: "Nova Scotia",
    program: "DDS",
    apply:
      "Dalhousie portal or ADEA AADSAS (AADSAS applicants also file a Dalhousie application)",
    dat: "DAT written October 1, 2023 – August 31, 2026, minimums met in one attempt",
    deadline: "October 1, 2026",
    notes: [
      "About 40-minute in-person interview",
      "Up to 46 seats (32 domestic, 14 international)",
      "Preference for Nova Scotia residents",
    ],
    url: "https://www.dal.ca/study/programs/graduate-professional/dentistry-dds.html",
    aadsas: true,
  },
];

export const datComparison = [
  {
    label: "Run by",
    canadian: "Canadian Dental Association (CDA)",
    us: "American Dental Association (ADA)",
  },
  {
    label: "Science section",
    canadian: "Biology (40) and general chemistry (30)",
    us: "Biology (40), general chemistry (30) and organic chemistry (30)",
  },
  { label: "Organic chemistry", canadian: "Not tested", us: "30 questions" },
  {
    label: "Quantitative Reasoning",
    canadian: "Not tested",
    us: "40 questions in 45 minutes",
  },
  {
    label: "Perceptual Ability (PAT)",
    canadian: "90 questions",
    us: "90 questions in 60 minutes",
  },
  {
    label: "Reading Comprehension",
    canadian: "50 questions (no RC on the French version)",
    us: "50 questions in 60 minutes",
  },
  {
    label: "Score scale",
    canadian: "1–30 (15 is the national average)",
    us: "200–600 since March 1, 2025",
  },
  {
    label: "Manual dexterity",
    canadian: "Suspended since COVID-19",
    us: "None",
  },
];

export const usSchoolsAcceptingCanadianDat = [
  {
    name: "Penn Dental Medicine",
    text: "US DAT preferred, but Canadian citizens and residents may send Canadian DAT scores. No extra requirements for Canadians.",
    url: "https://www.dental.upenn.edu/admissions-academics/dmd-program/admissions/",
  },
  {
    name: "Marquette University",
    text: "Accepts the Canadian DAT.",
    url: "https://www.marquette.edu/dentistry/admissions/application-requirements.php",
  },
  {
    name: "University of the Pacific (Dugoni)",
    text: "Accepts the Canadian DAT for applicants from Canadian universities only. Graduates of French-language Canadian schools are treated as international.",
    url: "https://www.pacific.edu/dental/academic-programs/doctor-of-dental-surgery/dds-admissions-requirements",
  },
  {
    name: "University of Detroit Mercy",
    text: "Will stop accepting the Canadian DAT from the 2027–28 cycle. A reminder to check every school.",
    url: "https://dental.udmercy.edu/programs/dental/dds/admission.php",
  },
];

export const canadaFaqs = [
  {
    question: "Do Canadian dental schools use AADSAS?",
    answer:
      "Some do. UBC takes applications through ADEA AADSAS, Toronto lets you choose its own UTDAS system or AADSAS, and Dalhousie accepts its own portal or AADSAS. Western uses OUAC, and the other schools use their own university portals.",
  },
  {
    question: "Which Canadian dental schools do not require the DAT?",
    answer:
      "McGill removed the DAT requirement for the 2026–27 cycle, and Université de Montréal does not require it for Fall 2027. Laval uses only the PAT score from the Canadian DAT. Every other school requires the DAT.",
  },
  {
    question: "What is the difference between the Canadian DAT and the US DAT?",
    answer:
      "The Canadian DAT has no organic chemistry and no Quantitative Reasoning section, and it is scored from 1 to 30. The US DAT includes organic chemistry and QR and has used a 200–600 scale since March 1, 2025.",
  },
  {
    question: "Can I use the US DAT to apply to Canadian schools?",
    answer:
      "At some schools. UBC, Western and Toronto accept either the Canadian or the American DAT. Alberta does not accept the American DAT. Check each school's page before you register.",
  },
  {
    question: "Can Canadians apply to US dental schools?",
    answer:
      "Yes. Canadians apply through ADEA AADSAS like US applicants. Transcripts from English-language Canadian universities are treated like US transcripts; French-language transcripts need a WES or ECE evaluation. Some US schools accept the Canadian DAT, but not all.",
  },
];
