import { cycle2026Questions } from "./cycle-2026-questions";
import {
  DEFAULT_SCHOOL_ENRICHMENT,
  schoolEnrichments,
} from "./school-enrichments";

export type QuestionTag = "required" | "optional" | "conditional";

export type Question = {
  text: string;
  tag: QuestionTag;
  limit?: string; // e.g. "500 words" | "2000 characters" | "No Limit"
  groupLabel?: string; // displayed above a group of questions
};

export type Tip = {
  emoji: string;
  title: string;
  text: string;
};

export type SchoolDetail = {
  slug: string;
  abbr: string;       // clean primary abbreviation for display
  name: string;
  stateAbbr: string;  // two-letter code  e.g. "AL"
  stateFull: string;  // full state name  e.g. "Alabama"
  distribution: string;      // short label  e.g. "Emailed (IS all, OOS selective)"
  distributionDetail: string; // full description for the info banner
  questions: Question[];
  noEssayNote?: string; // shown when questions array is empty
  tips: Tip[];
  /** Unique SEO fields — merged from school-enrichments + defaults */
  secondaryFee?: string;
  timingNote?: string;
  admissionsUrl?: string;
  cycleLabel?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build a standard "why this school" tip
// ─────────────────────────────────────────────────────────────────────────────
const whyTip = (abbr: string): Tip => ({
  emoji: "🎯",
  title: `Why ${abbr} — Be Specific`,
  text: `Research ${abbr}'s unique programs, clinics, and faculty. Mention specific curriculum features, community outreach efforts, or research opportunities that align with your goals. Avoid generic answers that could apply to any school.`,
});
const earlyTip: Tip = {
  emoji: "📅",
  title: "Submit Early",
  text: "Most schools review secondaries on a rolling basis. Submitting within 2 weeks of receiving your secondary significantly improves your interview chances.",
};
const noLimitTip: Tip = {
  emoji: "⏱️",
  title: "No Word Limit Strategy",
  text: 'When there is no stated limit, aim for 250–400 words per response. "No limit" does not mean write a novel — clarity and conciseness are valued. Open with a hook, support with a story, and close with a takeaway.',
};
const proofreadTip: Tip = {
  emoji: "✏️",
  title: "Proofread Thoroughly",
  text: "Read each response aloud and have a mentor review it. Typos and grammatical errors signal carelessness to admissions committees.",
};
const noEssayTip = (abbr: string): Tip => ({
  emoji: "🏆",
  title: `Make Your AADSAS Shine for ${abbr}`,
  text: `Since ${abbr} does not require essay responses, your AADSAS personal statement, GPA, DAT scores, and extracurriculars carry the full weight. Ensure every section is polished and complete.`,
});

// ─────────────────────────────────────────────────────────────────────────────
// ALL SCHOOL DETAILS
// ─────────────────────────────────────────────────────────────────────────────
export const schoolDetails: SchoolDetail[] = [
  // ── ALABAMA ──────────────────────────────────────────────────────────────
  {
    slug: "university-of-alabama-school-of-dentistry",
    abbr: "UAB",
    name: "University of Alabama School of Dentistry",
    stateAbbr: "AL",
    stateFull: "Alabama",
    distribution: "Emailed (IS all, OOS selective)",
    distributionDetail:
      "Secondary is emailed to all in-state (IS) applicants automatically. Out-of-state (OOS) applicants are selectively invited — not all OOS applicants will receive a secondary.",
    questions: [
      { text: "What ties do you have to Alabama, if any?", tag: "required", limit: "No Limit" },
      { text: "Why do you want to attend the UAB School of Dentistry?", tag: "required", limit: "No Limit" },
      { text: "How would you describe your healthcare exposure? This may include shadowing, employment/volunteerism in healthcare settings, medical/dental missions, research, etc. Include your role and duties.", tag: "required", limit: "No Limit" },
      { text: "To what activities or hobbies do you like to devote your time and efforts?", tag: "required", limit: "No Limit" },
      { text: "What else do you want the admissions committee to know about you?", tag: "required", limit: "No Limit" },
    ],
    tips: [
      { emoji: "🏛️", title: "Alabama Ties — Be Honest", text: "Even without direct ties, mention your interest in serving Alabama's underserved communities, UAB's mission, or clinical programs that align with your goals. No ties is acceptable — honesty is expected." },
      whyTip("UAB"),
      { emoji: "🩺", title: "Healthcare Exposure — Be Specific", text: "State hours, settings, and what you observed or contributed. Don't just list activities — describe what confirmed your commitment to dentistry." },
      earlyTip,
    ],
  },
  // ── ARIZONA ──────────────────────────────────────────────────────────────
  {
    slug: "at-still-university-arizona-school-of-dentistry",
    abbr: "ASDOH / ATSU-AZ",
    name: "A.T. Still University, Arizona School of Dentistry and Oral Health",
    stateAbbr: "AZ",
    stateFull: "Arizona",
    distribution: "Mailed (all qualified applicants)",
    distributionDetail:
      "Supplemental questions are mailed to all applicants who meet the minimum requirements set by the admissions committee.",
    questions: [
      { text: "Why are you applying to ASDOH? What makes our school different from other dental schools?", tag: "required", limit: "500 words" },
      { text: "What changes do you think we will see in the profession in the future?", tag: "required", limit: "500 words" },
      { text: "Please list any changes or updates to your AADSAS application. If your AADSAS application is complete and accurate, please move on to the next question.", tag: "optional", limit: "No Limit" },
    ],
    tips: [
      { emoji: "🌍", title: "ASDOH's Community-Based Mission", text: "ASDOH is renowned for its community-based dental education and focus on underserved populations. Highlight any community service, public health interests, or rural/urban outreach experience in your 'Why ASDOH' response." },
      { emoji: "🔮", title: "Future of Dentistry — Show Vision", text: "For the profession trends question, demonstrate critical thinking. Discuss technology (AI, teledentistry), workforce shortages, preventive care shifts, or equity in access — and connect it to your goals." },
      earlyTip,
      proofreadTip,
    ],
  },
  {
    slug: "midwestern-university-college-of-dental-medicine-arizona",
    abbr: "CDMA / MWU-AZ",
    name: "Midwestern University College of Dental Medicine – Arizona",
    stateAbbr: "AZ",
    stateFull: "Arizona",
    distribution: "Emailed (all qualified applicants)",
    distributionDetail:
      "Supplemental questions are emailed to all applicants who meet the minimum requirements.",
    questions: [
      { text: "If you were a non-science major, how has your major course of study prepared you for a career in the health professions?", tag: "conditional", groupLabel: "Required for non-science majors" },
      { text: "If you have any C- or lower grades and/or any course withdrawals on your transcript, please explain the circumstances of these grades and/or withdrawals.", tag: "conditional", groupLabel: "Required when applicable" },
      { text: "Is there any additional information that you would like Midwestern University to have that is not included in the AADSAS application?", tag: "conditional", groupLabel: "Required when applicable" },
    ],
    tips: [
      { emoji: "📚", title: "Non-Science Major — Emphasize Transferable Skills", text: "If applicable, tie your major directly to dentistry: research skills, critical thinking, communication, patient interaction, or leadership. Don't apologize for your path — reframe it as an asset." },
      { emoji: "📊", title: "Explaining Low Grades", text: "Be concise, honest, and forward-looking. Acknowledge the situation, explain briefly, and focus on what you did to improve and what it taught you about your work ethic." },
      proofreadTip,
    ],
  },
  // ── CALIFORNIA ───────────────────────────────────────────────────────────
  {
    slug: "california-northstate-university-college-of-dental-medicine",
    abbr: "CNU",
    name: "California Northstate University College of Dental Medicine",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted directly through the AADSAS application portal.",
    questions: [
      { text: "What is important in selecting a dental school? What factors do you take into consideration when deciding which dental school to attend?", tag: "required", limit: "3000 characters" },
      { text: "Why do you want to join the California Northstate University College of Dental Medicine Family? Please state briefly how you will contribute to CNU College of Dental Medicine.", tag: "required", limit: "3000 characters" },
      { text: "Please use the following space to tell us anything additional that you believe is relevant to your application.", tag: "optional", limit: "5000 characters" },
    ],
    tips: [
      { emoji: "🏥", title: "School Selection Criteria", text: "Be genuine — mention curriculum structure, clinical experience hours, faculty access, research, location, and mission alignment. Weave in why CNU specifically meets these criteria." },
      whyTip("CNU"),
      earlyTip,
    ],
  },
  {
    slug: "loma-linda-university-school-of-dentistry",
    abbr: "LLU",
    name: "Loma Linda University School of Dentistry",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "Emailed (all applicants)",
    distributionDetail:
      "Supplemental questions are emailed to all applicants regardless of residency.",
    questions: [
      { text: "Tell us what characteristics of Loma Linda University are particularly attractive and meaningful to you and why you have chosen to apply for advanced education.", tag: "required", limit: "4000 characters" },
      { text: "Discuss how your spiritual origins, development, and experience have influenced and been integrated into your daily life.", tag: "required", limit: "4000 characters" },
      { text: "Tell us the desirable qualities that you see in yourself that you believe would aid us in considering your application.", tag: "required", limit: "4000 characters" },
      { text: "LLU believes deeply in integrating values into the educational experience. As a result, religion courses and chapel attendance are part of the curriculum. Tell us why you believe that a faith-based education would be a special benefit to you.", tag: "required", limit: "4000 characters" },
      { text: "As a Seventh-day Adventist institution, LLU has lifestyle expectations which include abstinence from alcohol, tobacco and illicit drug/substances in all forms while enrolled. If accepted to Loma Linda University, are you willing to abide by the lifestyle policies of the university while enrolled?", tag: "required", limit: "4000 characters" },
      { text: "How did you originally hear about LLUSD?", tag: "required", groupLabel: "2026–27" },
    ],
    tips: [
      { emoji: "✝️", title: "Faith-Based Mission — Be Authentic", text: "LLU is a Seventh-day Adventist institution. Be sincere about your spiritual background. Applicants of all faiths are considered, but you should reflect genuinely on how a values-integrated education benefits you." },
      { emoji: "🌿", title: "Lifestyle Expectations Question", text: "Answer the lifestyle question directly and honestly. If you already adhere to healthy lifestyle habits, explain why. If this will require adjustment, acknowledge that sincerely and state your commitment." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "ucla-school-of-dentistry",
    abbr: "UCLA",
    name: "University of California Los Angeles School of Dentistry",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS. All applicants who meet minimum requirements will receive the secondary.",
    questions: [
      { text: "How do you deal with failure?", tag: "required", limit: "350 characters" },
      { text: "How would you assess your ability to ask for help, and give one example of when you had to do so?", tag: "required", limit: "350 characters" },
      { text: "Please LIST 3 ways you deal with stress.", tag: "required", limit: "100 characters" },
      { text: "Are you making, or have you already made, a career change prior to applying to dental school? Please explain.", tag: "required", limit: "350 characters" },
      { text: "If you are not currently enrolled in school, what have you been doing since graduation?", tag: "conditional", groupLabel: "Required for applicants not currently in school", limit: "600 characters" },
      { text: "Please explain your future plans for your DDS-PhD career.", tag: "conditional", groupLabel: "Required for DDS-PhD applicants", limit: "600 characters" },
    ],
    tips: [
      { emoji: "📏", title: "Character Limits Are Strict", text: "UCLA's limits are extremely tight (100–350 chars). Draft your answer, then ruthlessly cut. Every word must earn its place. Read it aloud — if it sounds clunky, revise." },
      { emoji: "💬", title: "Failure & Stress Questions", text: "Be specific. Don't use generic answers like 'I go for a run.' Give a real failure with a concrete lesson. For stress, list three distinct, believable strategies." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "ucsf-school-of-dentistry",
    abbr: "UCSF",
    name: "University of California San Francisco School of Dentistry",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "What is important to you in selecting a dental school? How will you make your decision about which school to attend?", tag: "required", limit: "1500 characters" },
      { text: "Why do you want to join the UCSF community? Please state briefly how you will contribute to the UCSF School of Dentistry.", tag: "required", limit: "1500 characters" },
      { text: "Please use this space to tell us anything additional that you believe is relevant to your application.", tag: "optional", limit: "5000 characters" },
      { text: "If you intend to apply to the DDS/PhD program, outline your reasons for your interest in the DDS/PhD program. Your application will not be considered for the joint program if you do not supply this essay.", tag: "conditional", groupLabel: "Required for DDS/PhD applicants", limit: "1600 characters" },
    ],
    tips: [
      whyTip("UCSF"),
      { emoji: "🔬", title: "UCSF Research Culture", text: "UCSF is research-intensive. If you have research experience, mention it prominently. If not, highlight your curiosity about evidence-based dentistry and how you'd engage with UCSF's research environment." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "university-of-pacific-dugoni-school-of-dentistry",
    abbr: "UoP",
    name: "University of the Pacific, Arthur A. Dugoni School of Dentistry",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "AADSAS",
    distributionDetail:
      "UoP submits its secondary through AADSAS. 2026–27 includes Why Dugoni, when you decided on dentistry / how you heard about Pacific, and a Stockton-campus item.",
    questions: [],
    noEssayNote: "There are no supplemental essay questions for this school. Your AADSAS application is the primary application material.",
    tips: [
      noEssayTip("UoP"),
      { emoji: "⚡", title: "UoP's Accelerated 3-Year Program", text: "UoP offers a unique 3-year accelerated DDS program. If this appeals to you, ensure your personal statement reflects your readiness for an intensive, accelerated track." },
      proofreadTip,
    ],
  },
  {
    slug: "usc-ostrow-school-of-dentistry",
    abbr: "USC",
    name: "University of Southern California, Herman Ostrow School of Dentistry",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Have you previously applied to the Herman Ostrow School of Dentistry of USC? If so, did you participate in an interview?", tag: "required", limit: "2000 characters" },
      { text: "Have you taken any classes at a community college? If so, list each institution's name and the number of units you have completed.", tag: "required", limit: "2000 characters" },
      { text: "Please list your professional achievements and include when and how long.", tag: "required", limit: "2000 characters" },
    ],
    tips: [
      { emoji: "🔄", title: "Reapplicants — Address Growth Directly", text: "If you've applied before, acknowledge it and focus on what's different this cycle. New experiences, improved stats, or clearer focus all demonstrate development." },
      { emoji: "🏆", title: "Professional Achievements", text: "Be specific with dates and durations. Include research, leadership roles, employment, clinical experience, and honors. Use action verbs and quantify impact where possible." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "western-university-health-sciences-college-of-dental-medicine",
    abbr: "WesternU",
    name: "Western University of Health Sciences College of Dental Medicine",
    stateAbbr: "CA",
    stateFull: "California",
    distribution: "Admissions website",
    distributionDetail:
      "Supplemental questions are submitted through the WesternU admissions website to all qualifying applicants.",
    questions: [
      { text: "Please explain why you chose to apply to WesternU's College of Dental Medicine.", tag: "required", limit: "500 words" },
      { text: "If you have any additional information you would like the Admissions and Selection Committee to consider or aspects of your application which you think may seem confusing or incomplete, you may upload a supplemental document (one page max).", tag: "optional" },
    ],
    tips: [
      whyTip("WesternU"),
      { emoji: "🌐", title: "WesternU's Interprofessional Education", text: "WesternU is known for its interprofessional health education model. Highlight any experience working with professionals from other health fields, or your interest in collaborative patient care." },
      earlyTip,
    ],
  },
  // ── COLORADO ─────────────────────────────────────────────────────────────
  {
    slug: "university-of-colorado-school-of-dental-medicine",
    abbr: "CU",
    name: "University of Colorado School of Dental Medicine",
    stateAbbr: "CO",
    stateFull: "Colorado",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS. Conditional questions apply only to certain applicants.",
    questions: [
      { text: "The University of Colorado requires that all prerequisite coursework be completed at the conclusion of the spring term of the year accepted with a letter grade of C or better. If you have not completed all prerequisite courses (including upper division coursework), please provide your timeline for completion. (Not answering this question could delay processing.)", tag: "conditional", groupLabel: "Required for applicants with outstanding prerequisites", limit: "1000 characters" },
    ],
    tips: [
      { emoji: "📋", title: "Prerequisites Plan — Be Precise", text: "List each outstanding course, the term you plan to complete it, and your institution. Show the committee you have a clear, achievable timeline." },
      noEssayTip("CU"),
      earlyTip,
    ],
  },
  // ── CONNECTICUT ──────────────────────────────────────────────────────────
  {
    slug: "university-of-connecticut-school-of-dental-medicine",
    abbr: "UConn",
    name: "University of Connecticut School of Dental Medicine",
    stateAbbr: "CT",
    stateFull: "Connecticut",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Do you meet the 50-hour general dentist shadowing requirement? If yes, please list your shadowing experiences. If no, please explain how you will meet this requirement.", tag: "required", limit: "500 characters" },
    ],
    tips: [
      { emoji: "🦷", title: "Shadowing — Specifics Matter", text: "List each shadowing experience with practice type, hours, and what you observed. If you're still completing hours, give a clear and credible timeline." },
      proofreadTip,
      earlyTip,
    ],
  },
  // ── WASHINGTON D.C. ──────────────────────────────────────────────────────
  {
    slug: "howard-university-college-of-dentistry",
    abbr: "Howard",
    name: "Howard University College of Dentistry",
    stateAbbr: "DC",
    stateFull: "Washington D.C.",
    distribution: "Admissions website",
    distributionDetail:
      "Supplemental questions are submitted through the Howard University admissions portal.",
    questions: [
      { text: "Explain what motivated your decision to apply to HUCD.", tag: "required", limit: "5000 characters" },
      { text: "How does our program fit with your career plans?", tag: "required", limit: "5000 characters" },
      { text: "Describe any experiences and/or skills that have made you more appreciative or sensitive to other cultures or the human condition.", tag: "required", limit: "5000 characters" },
      { text: "Provide a specific example of how you promoted diversity in your community or school.", tag: "required", limit: "5000 characters" },
      { text: "If you could appear before the Admissions Committee, what information would you want them to know that is not already included in your application?", tag: "required", limit: "5000 characters" },
      { text: "Tell us about your childhood/adolescence. Briefly describe your family, community, disadvantage(s), and any other important background before college.", tag: "required", limit: "5000 characters" },
      { text: "How did you prepare for the DAT? If you took the DAT more than once, describe your preparation for each attempt.", tag: "required", limit: "5000 characters" },
      { text: "Please describe and explain any academic problems that occurred in college and/or graduate/professional school. This may include withdrawals, incomplete grades, and grades of D or F.", tag: "conditional", groupLabel: "Required when applicable", limit: "5000 characters" },
    ],
    tips: [
      { emoji: "🌍", title: "Howard's Mission — Service & Diversity", text: "Howard has a strong historical commitment to training minority dental health professionals and serving underserved communities. Authentically connect your background and goals to this mission." },
      { emoji: "👶", title: "Background Question — Be Vulnerable", text: "The childhood/background question is an opportunity to tell your full story. Be specific and honest. This helps the committee understand your journey and resilience." },
      noLimitTip,
      earlyTip,
    ],
  },
  // ── FLORIDA ──────────────────────────────────────────────────────────────
  {
    slug: "lake-erie-college-osteopathic-medicine-school-of-dental-medicine",
    abbr: "LECOM",
    name: "Lake Erie College of Osteopathic Medicine School of Dental Medicine",
    stateAbbr: "FL",
    stateFull: "Florida",
    distribution: "Emailed (all qualified applicants)",
    distributionDetail:
      "Secondary is emailed to all applicants who meet the minimum requirements. No essay responses are required.",
    questions: [],
    noEssayNote: "LECOM does not require supplemental essay responses. Focus on completing a strong AADSAS application.",
    tips: [
      noEssayTip("LECOM"),
      { emoji: "📖", title: "LECOM's Problem-Based Learning", text: "LECOM uses a Problem-Based Learning (PBL) curriculum. If you are genuinely drawn to this model, mention it in your personal statement to show alignment with their educational philosophy." },
      proofreadTip,
    ],
  },
  {
    slug: "nova-southeastern-university-college-of-dental-medicine",
    abbr: "NSU",
    name: "Nova Southeastern University College of Dental Medicine",
    stateAbbr: "FL",
    stateFull: "Florida",
    distribution: "Emailed (all applicants)",
    distributionDetail:
      "Secondary is emailed to all applicants. 2026–27 includes how you heard about NSU CDM.",
    questions: [],
    noEssayNote: "NSU does not require supplemental essay responses. Your AADSAS application represents your primary submission.",
    tips: [
      noEssayTip("NSU"),
      earlyTip,
      proofreadTip,
    ],
  },
  {
    slug: "university-of-florida-college-of-dentistry",
    abbr: "UF",
    name: "University of Florida College of Dentistry",
    stateAbbr: "FL",
    stateFull: "Florida",
    distribution: "Emailed (selected applicants)",
    distributionDetail:
      "Secondary is emailed only to selected applicants. 2026–27 includes DMD-PhD interest, SHPEP, and an out-of-state Florida-ties item.",
    questions: [],
    noEssayNote: "UF does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("UF"),
      { emoji: "⭐", title: "Being Invited = You're Competitive", text: "Receiving a secondary from UF means you've passed the initial screening. Ensure your AADSAS is flawless — your personal statement, experiences, and scores are doing the heavy lifting." },
      proofreadTip,
    ],
  },
  // ── GEORGIA ──────────────────────────────────────────────────────────────
  {
    slug: "dental-college-of-georgia-augusta-university",
    abbr: "DCG",
    name: "Dental College of Georgia at Augusta University",
    stateAbbr: "GA",
    stateFull: "Georgia",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Are there any factors that may have affected your academic record?", tag: "required", limit: "1500 characters" },
      { text: "Please explain any other responsibilities you may have outside of being a student.", tag: "required", limit: "1500 characters" },
      { text: "Do you feel that the area where you grew up has health disparities such as medically underserved, dentally underserved, or reduced and free lunches provided for high school students? If yes, please explain.", tag: "required", limit: "1500 characters" },
      { text: "Why are you interested in receiving your dental education from The Dental College of Georgia at Augusta University?", tag: "required", limit: "1500 characters" },
      { text: "Please describe your plans for practicing dentistry after graduating from dental school.", tag: "required", limit: "1500 characters" },
    ],
    tips: [
      { emoji: "🏘️", title: "Health Disparities Question", text: "DCG is deeply committed to serving Georgia's underserved communities. Reflect genuinely on the healthcare landscape where you grew up. If you grew up in a privileged area, consider disparities you've observed through volunteering or travel." },
      { emoji: "🔭", title: "Practice Plans — Think Specifically", text: "Mention a type of practice (private, public health, academic, specialty), setting (rural, urban, underserved), and patient population. DCG values students who plan to serve Georgia." },
      whyTip("DCG"),
      earlyTip,
    ],
  },
  // ── ILLINOIS ─────────────────────────────────────────────────────────────
  {
    slug: "midwestern-university-college-of-dental-medicine-illinois",
    abbr: "CDMI / MWU-IL",
    name: "Midwestern University College of Dental Medicine – Illinois",
    stateAbbr: "IL",
    stateFull: "Illinois",
    distribution: "Emailed (all applicants)",
    distributionDetail:
      "Secondary is emailed to all applicants. Conditional question applies only if relevant to your situation.",
    questions: [
      { text: "If you were previously accepted into a health profession but did not enroll, or enrolled in a health profession program but withdrew, please explain.", tag: "conditional", groupLabel: "Required when applicable" },
    ],
    tips: [
      { emoji: "🔄", title: "Explaining a Prior Withdrawal", text: "If applicable, be direct and honest. Explain the reason, what you did instead, and how that experience reinforced your commitment to dentistry. Avoid defensiveness." },
      noEssayTip("MWU-IL"),
      proofreadTip,
    ],
  },
  {
    slug: "southern-illinois-university-school-of-dental-medicine",
    abbr: "SIU",
    name: "Southern Illinois University School of Dental Medicine",
    stateAbbr: "IL",
    stateFull: "Illinois",
    distribution: "AADSAS and admissions website",
    distributionDetail:
      "Supplemental questions are submitted via both AADSAS and the SIU admissions website.",
    questions: [
      { text: "What is your particular reason for wanting to attend SIU School of Dental Medicine?", tag: "required", limit: "1500 characters" },
    ],
    tips: [
      whyTip("SIU"),
      { emoji: "🌾", title: "SIU's Rural Health Focus", text: "SIU is committed to training dentists for southern Illinois and rural communities. Connect your response to their mission if it aligns with your goals." },
      earlyTip,
    ],
  },
  {
    slug: "university-of-illinois-chicago-college-of-dentistry",
    abbr: "UIC",
    name: "University of Illinois at Chicago College of Dentistry",
    stateAbbr: "IL",
    stateFull: "Illinois",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary is submitted through the UIC admissions portal. No essay responses are required.",
    questions: [],
    noEssayNote: "UIC does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("UIC"),
      { emoji: "🌆", title: "Chicago's Clinical Diversity", text: "UIC's urban Chicago location provides exposure to an exceptionally diverse patient population. Highlight any interest in diverse clinical experiences in your AADSAS personal statement." },
      proofreadTip,
    ],
  },
  // ── INDIANA ──────────────────────────────────────────────────────────────
  {
    slug: "indiana-university-school-of-dentistry",
    abbr: "IU",
    name: "Indiana University School of Dentistry",
    stateAbbr: "IN",
    stateFull: "Indiana",
    distribution: "AADSAS and admissions website",
    distributionDetail:
      "Supplemental question is submitted via AADSAS and/or the IU admissions website. Applicants choose one of three prompts.",
    questions: [
      { text: "Discuss an accomplishment, event, realization or change of career plans that sparked a period of personal growth and a new understanding of yourself or others. How has that illustrated resilience, determination, and perseverance as part of your authentic character?", tag: "required", groupLabel: "Choose ONE of the three prompts below", limit: "250 words" },
      { text: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?", tag: "required", groupLabel: "Choose ONE of the three prompts below", limit: "250 words" },
      { text: "Describe a problem you've solved or a problem you'd like to solve. It can be an intellectual challenge or an ethical dilemma — anything of personal importance. Explain the significance and what steps you took or could take to identify a solution.", tag: "required", groupLabel: "Choose ONE of the three prompts below", limit: "250 words" },
    ],
    tips: [
      { emoji: "🎯", title: "Choose the Prompt That Fits Your Best Story", text: "Don't pick based on which sounds most impressive — pick based on which gives you the most specific, compelling story to tell. A concrete, personal narrative beats a generic 'impressive' response every time." },
      { emoji: "📏", title: "250 Words Is Short — Be Deliberate", text: "With only 250 words, every sentence matters. Use the STAR method (Situation, Task, Action, Result) but keep it tight. Cut any sentence that doesn't advance the story." },
      proofreadTip,
      earlyTip,
    ],
  },
  // ── IOWA ─────────────────────────────────────────────────────────────────
  {
    slug: "university-of-iowa-college-of-dentistry",
    abbr: "UI",
    name: "University of Iowa College of Dentistry",
    stateAbbr: "IA",
    stateFull: "Iowa",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Why do you feel that you are well prepared for a career in the dental profession?", tag: "required", limit: "2000 characters" },
      { text: "Tell us about a time your integrity was challenged.", tag: "required", limit: "2000 characters" },
      { text: "Besides dentistry, what are you passionate about?", tag: "required", limit: "2000 characters" },
      { text: "Share obstacles that you may have overcome to achieve your goals.", tag: "required", limit: "2000 characters" },
      { text: "In which type of community or setting would you like to practice?", tag: "required", limit: "2000 characters" },
      { text: "How do you plan to use your dental education after you graduate?", tag: "required", limit: "2000 characters" },
      { text: "Why the University of Iowa College of Dentistry?", tag: "required", limit: "2000 characters" },
      { text: "Please elaborate on how being part of an underserved community has influenced your path.", tag: "conditional", groupLabel: "Required for applicants who identify as part of an underserved community", limit: "2000 characters" },
    ],
    tips: [
      { emoji: "⚖️", title: "Integrity Question — Use a Specific Story", text: "Don't describe a vague dilemma. Pick a real situation: a lab course, a team conflict, a patient interaction you witnessed. Show the conflict clearly and explain your decision-making process." },
      whyTip("UI"),
      { emoji: "🏥", title: "Practice Setting — Be Specific and Genuine", text: "Iowa values students who plan to serve communities in need, particularly rural Iowa. If that matches your goals, say so specifically. If not, be honest and thoughtful about your intended setting." },
      earlyTip,
    ],
  },
  // ── KENTUCKY ─────────────────────────────────────────────────────────────
  {
    slug: "university-of-kentucky-college-of-dentistry",
    abbr: "UK",
    name: "University of Kentucky College of Dentistry",
    stateAbbr: "KY",
    stateFull: "Kentucky",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Describe an instance where you failed to achieve a goal. Explain how you handled this situation, what you took away from it, and what failure you might anticipate as a dental student.", tag: "required", limit: "2000 characters" },
      { text: "Describe an instance where you received critical feedback from a mentor, supervisor, or instructor. Explain how you handled this feedback and what you took away from the situation.", tag: "required", limit: "2000 characters" },
      { text: "Describe a time when you believe you were treated unfairly. How did you handle this situation, and what did you take away?", tag: "required", limit: "2000 characters" },
      { text: "Please identify one of your long-term service activities. How did it directly impact another individual and how did it impact you?", tag: "required", limit: "2000 characters" },
      { text: "Is there anything additional you would like to share that is not found in your application?", tag: "optional", limit: "2000 characters" },
      { text: "Please explain your performance in any course in which you received a C+ or lower or chose to withdraw.", tag: "conditional", groupLabel: "Required when applicable", limit: "2000 characters" },
      { text: "Please explain any DAT scores of 17 or below.", tag: "conditional", groupLabel: "Required when applicable", limit: "2000 characters" },
    ],
    tips: [
      { emoji: "💪", title: "Failure Questions Reveal Character", text: "UK asks multiple 'difficult situation' questions. Each response should show a distinct situation. Don't recycle the same story. Show the committee multiple dimensions of your character." },
      { emoji: "🤝", title: "Service Activity — Impact, Not Just Hours", text: "Don't just list what you did — explain the specific impact. Name individuals helped (anonymously), describe a moment of connection, or quantify the effect. Depth beats breadth." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "university-of-louisville-school-of-dentistry",
    abbr: "U of L",
    name: "University of Louisville School of Dentistry",
    stateAbbr: "KY",
    stateFull: "Kentucky",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Briefly describe your personal or professional reasons for choosing the University of Louisville's DMD program.", tag: "required", limit: "1000 characters" },
      { text: "What contributions do you see yourself making to the field of dentistry?", tag: "required", limit: "250 characters" },
      { text: "Is there anything else you want ULSD to know that is not included in this application?", tag: "optional", limit: "2000 characters" },
      { text: "If you have not taken classes in the past year, please explain what you have been doing.", tag: "conditional", groupLabel: "Required when applicable", limit: "500 characters" },
      { text: "Please briefly explain why you earned any D's, F's, and/or W's on your transcript.", tag: "conditional", groupLabel: "Required when applicable", limit: "1000 characters" },
    ],
    tips: [
      whyTip("U of L"),
      { emoji: "🔭", title: "Contributions to Dentistry — Think Big", text: "For the 250-character contributions question, be specific. Research, public health, underserved care, technology — pick one clear direction and state it crisply." },
      earlyTip,
    ],
  },
  // ── LOUISIANA ────────────────────────────────────────────────────────────
  {
    slug: "louisiana-state-university-school-of-dentistry",
    abbr: "LSU",
    name: "Louisiana State University Health Science Center School of Dentistry",
    stateAbbr: "LA",
    stateFull: "Louisiana",
    distribution: "Emailed (qualified OOS applicants)",
    distributionDetail:
      "Secondary is emailed to qualified applicants. Out-of-state applicants may receive a specific essay prompt.",
    questions: [
      { text: "If you were fortunate to be accepted to more than one dental school, how would you decide where to attend? Discuss the process and criteria you would use to make your decision (not just 'LSU is my #1 choice').", tag: "conditional", groupLabel: "Required for OOS applicants", limit: "No Limit" },
    ],
    tips: [
      { emoji: "🗺️", title: "Decision Process — Be Genuine", text: "LSU explicitly says don't just claim they're your #1. Describe real criteria: tuition, location, curriculum, clinical volume, support for family obligations, etc. Authenticity matters more than flattery." },
      noLimitTip,
      earlyTip,
    ],
  },
  // ── MAINE ────────────────────────────────────────────────────────────────
  {
    slug: "university-of-new-england-college-of-dental-medicine",
    abbr: "UNE",
    name: "University of New England College of Dental Medicine",
    stateAbbr: "ME",
    stateFull: "Maine",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Why do you want to attend a dental school with a mission grounded in public health?", tag: "required", limit: "3000 characters" },
      { text: "Please describe a healthcare or social issue that you are passionate about, and explain why. What role can you play in addressing this issue?", tag: "required", limit: "3000 characters" },
      { text: "How has your background and experience prepared you to contribute to an environment that holds diversity as a core value? How do you see yourself demonstrating a commitment to diversity, equity, and inclusion as a dental student and future dentist?", tag: "required", limit: "3000 characters" },
      { text: "How have you engaged with the dental profession during the pandemic?", tag: "conditional", groupLabel: "Required for applicants who have not met shadowing hour requirements; optional otherwise", limit: "3000 characters" },
    ],
    tips: [
      { emoji: "🏥", title: "Public Health Mission — Own It", text: "UNE's curriculum is grounded in community health. Show genuine commitment to public health dentistry, not just interest. Describe specific experiences that reflect this value." },
      { emoji: "🌈", title: "DEI Question — Be Specific and Personal", text: "Don't give a generic diversity statement. Share a specific experience, challenge, or perspective that shaped your understanding of equity in healthcare." },
      proofreadTip,
      earlyTip,
    ],
  },
  // ── MARYLAND ─────────────────────────────────────────────────────────────
  {
    slug: "university-of-maryland-school-of-dentistry",
    abbr: "UMB / UMD",
    name: "University of Maryland School of Dentistry",
    stateAbbr: "MD",
    stateFull: "Maryland",
    distribution: "Emailed (selected applicants)",
    distributionDetail:
      "Secondary is emailed only to selected applicants who meet minimum screening criteria. 2026–27 includes dental-society membership and first contact with UMSOD.",
    questions: [],
    noEssayNote: "UMD does not require supplemental essay responses. The secondary is a screening invite.",
    tips: [
      noEssayTip("UMD"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── MASSACHUSETTS ────────────────────────────────────────────────────────
  {
    slug: "boston-university-school-of-dental-medicine",
    abbr: "BU / GSDM",
    name: "Boston University, Henry M. Goldman School of Dental Medicine",
    stateAbbr: "MA",
    stateFull: "Massachusetts",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Consider your interests, experiences, characteristics, and skills. What makes GSDM a good fit for your dental education? As a dental student, how will you contribute to the school community?", tag: "required", limit: "800 characters" },
      { text: "Comment on any aspect of your application, if desired.", tag: "optional", limit: "500 characters" },
      { text: "If COVID-19 affected your dental school application preparations, please explain.", tag: "optional", limit: "500 characters" },
    ],
    tips: [
      { emoji: "🏙️", title: "GSDM's Clinical Diversity", text: "BU sees over 100,000 patient visits annually — highlight your excitement for high clinical volume and diverse case mix. Mention specific GSDM programs (IDIP, research centers) if relevant." },
      { emoji: "📏", title: "800 Characters Is Very Tight", text: "Draft 200 words, then cut to 800 characters. Lead with your most compelling fit points. Every word must add value." },
      earlyTip,
    ],
  },
  {
    slug: "harvard-school-of-dental-medicine",
    abbr: "Harvard",
    name: "Harvard University School of Dental Medicine",
    stateAbbr: "MA",
    stateFull: "Massachusetts",
    distribution: "Emailed (interview invitees)",
    distributionDetail:
      "Harvard historically sent extra materials to interview invitees. 2026–27 AADSAS items include DAT preparation and HSDM family alumni — confirm in the current portal.",
    questions: [],
    noEssayNote: "Harvard only sends supplemental materials to interview invitees. If you receive an interview invitation, specific instructions will be provided at that time.",
    tips: [
      { emoji: "🔬", title: "Harvard's Research Emphasis", text: "HSDM offers a unique DMD/Master of Medical Sciences (MMSc) curriculum. If applying to HSDM, your personal statement should reflect research interest, scientific curiosity, and commitment to advancing dental science." },
      { emoji: "📚", title: "DAT prep question is specific", text: "Name materials and a real study timeline. Do not invent a Bootcamp-only story if you used something else." },
      proofreadTip,
    ],
  },
  {
    slug: "tufts-university-school-of-dental-medicine",
    abbr: "Tufts",
    name: "Tufts University School of Dental Medicine",
    stateAbbr: "MA",
    stateFull: "Massachusetts",
    distribution: "AADSAS",
    distributionDetail:
      "2026–27 supplemental items appear in AADSAS (how you learned about Tufts, academic/conduct history, current enrollment). Older interview-day handwritten prompts were retired. Confirm in the current portal.",
    questions: [
      { text: "How did you first learn about Tufts University's DMD program?", tag: "required" },
      { text: "Have you ever been disqualified, suspended, dismissed, or otherwise subject to disciplinary action at any college or university?", tag: "conditional" },
      { text: "Have you ever been found to have violated a school rule, policy, honor code, or otherwise been disqualified for conduct?", tag: "conditional" },
      { text: "Are you currently enrolled in an undergraduate, graduate, or postbaccalaureate program leading to a degree or certificate? If yes, note the program and expected completion.", tag: "conditional" },
    ],
    tips: [
      whyTip("Tufts"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── MICHIGAN ─────────────────────────────────────────────────────────────
  {
    slug: "university-of-detroit-mercy-school-of-dentistry",
    abbr: "UDM",
    name: "University of Detroit Mercy School of Dentistry",
    stateAbbr: "MI",
    stateFull: "Michigan",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes Detroit / Vermont cohort preference plus optional background items.",
    questions: [],
    noEssayNote: "UDM does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("UDM"),
      { emoji: "💫", title: "UDM's Jesuit Values", text: "UDM is a Jesuit institution emphasizing service, ethics, and whole-person care. Reference these values in your AADSAS personal statement if they align with your own." },
      earlyTip,
    ],
  },
  {
    slug: "university-of-michigan-school-of-dentistry",
    abbr: "UMich",
    name: "University of Michigan School of Dentistry",
    stateAbbr: "MI",
    stateFull: "Michigan",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental question is submitted via AADSAS. The essay is conditional for applicants claiming disadvantaged status.",
    questions: [
      { text: "Provide any information about your background that can help clarify your disadvantaged student status.", tag: "conditional", groupLabel: "Required for applicants claiming disadvantaged status", limit: "1000 characters" },
    ],
    tips: [
      { emoji: "🌱", title: "Disadvantaged Status — Be Specific and Factual", text: "Describe the specific socioeconomic, educational, or personal circumstances clearly and factually. Avoid exaggerating or being overly emotional. The committee wants context, not sympathy." },
      noEssayTip("UMich"),
      earlyTip,
    ],
  },
  // ── MINNESOTA ────────────────────────────────────────────────────────────
  {
    slug: "university-of-minnesota-school-of-dentistry",
    abbr: "UMN",
    name: "University of Minnesota School of Dentistry",
    stateAbbr: "MN",
    stateFull: "Minnesota",
    distribution: "AADSAS and admissions website",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS and/or the UMN admissions website. Responses are conditional based on your application record.",
    questions: [
      { text: "Please provide context for any Incomplete (I), Withdraw (W), C-, D, and/or F grades on your transcript.", tag: "conditional", groupLabel: "Required when applicable", limit: "3000 characters" },
      { text: "If you have previously applied to ANY dental school and were not accepted, please explain why you feel you are better prepared or better qualified as a candidate this year than when you last applied. Specify changes/improvements made to your application.", tag: "conditional", groupLabel: "Required for reapplicants", limit: "3000 characters" },
    ],
    tips: [
      { emoji: "📈", title: "Reapplicant Question — Focus on Growth", text: "Be specific about what changed: new experiences, improved DAT or GPA, more clinical hours, stronger letters of recommendation. Show a clear trajectory of improvement, not excuses." },
      { emoji: "📊", title: "Academic Explanation — Brief and Forward-Focused", text: "Acknowledge the issue, explain the context honestly (illness, family circumstances, etc.), and emphasize what you learned and how your record improved afterward." },
      earlyTip,
    ],
  },
  // ── MISSISSIPPI ──────────────────────────────────────────────────────────
  {
    slug: "university-of-mississippi-school-of-dentistry",
    abbr: "UMMC",
    name: "University of Mississippi Medical Center School of Dentistry",
    stateAbbr: "MS",
    stateFull: "Mississippi",
    distribution: "Emailed (all applicants)",
    distributionDetail:
      "Secondary materials are emailed to all applicants. 2026–27 includes profession-challenge and academic-gap essays plus Mississippi residency and coursework items.",
    questions: [],
    noEssayNote: "UMMC does not publish specific secondary essay questions. Check your email after submission for any additional materials.",
    tips: [
      noEssayTip("UMMC"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── MISSOURI ─────────────────────────────────────────────────────────────
  {
    slug: "at-still-university-missouri-school-of-dentistry",
    abbr: "ATSU-MO / MOSDOH",
    name: "A.T. Still University, Missouri School of Dentistry and Oral Health",
    stateAbbr: "MO",
    stateFull: "Missouri",
    distribution: "Emailed (qualified applicants)",
    distributionDetail:
      "Secondary is emailed to qualified applicants who meet ATSU-MO's minimum screening criteria.",
    questions: [
      { text: "Why did you participate in the volunteer activities you listed in the Clinical, Volunteer and Community Service section of your AADSAS application? What did you gain from participating in these activities?", tag: "required", limit: "500 words" },
      { text: "Why do you want to attend the Missouri School of Dentistry & Oral Health?", tag: "required", limit: "500 words" },
      { text: "Please list any changes or updates to your AADSAS application. This section may be left blank if your AADSAS application is complete and accurate.", tag: "optional", limit: "No Limit" },
    ],
    tips: [
      { emoji: "🤲", title: "Volunteer Question — Go Deep, Not Wide", text: "Pick 1–2 specific activities and explain the motivation behind choosing them and the personal insight gained. ATSU-MO wants to understand your values, not just a list of things you did." },
      whyTip("ATSU-MO"),
      earlyTip,
    ],
  },
  {
    slug: "university-of-missouri-kansas-city-school-of-dentistry",
    abbr: "UMKC",
    name: "University of Missouri Kansas City School of Dentistry",
    stateAbbr: "MO",
    stateFull: "Missouri",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental question is submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Why are you interested in attending the UMKC School of Dentistry?", tag: "required", limit: "500 characters" },
    ],
    tips: [
      whyTip("UMKC"),
      { emoji: "📏", title: "500 Characters Is Extremely Brief", text: "Lead with your most compelling reason. Name a specific UMKC program, curriculum feature, or mission point. Cut everything else." },
      earlyTip,
    ],
  },
  // ── NEBRASKA ─────────────────────────────────────────────────────────────
  {
    slug: "creighton-university-school-of-dentistry",
    abbr: "Creighton",
    name: "Creighton University School of Dentistry",
    stateAbbr: "NE",
    stateFull: "Nebraska",
    distribution: "Admissions website",
    distributionDetail:
      "Supplemental questions are submitted through the Creighton University admissions website.",
    questions: [
      { text: "What is your reason for choosing Creighton?", tag: "required", limit: "No Limit" },
      { text: "Please state if there is anything of particular importance that the Admissions Committee should know about you.", tag: "required", limit: "No Limit" },
      { text: "If there was a break in your education (other than normal school vacations), please explain fully your occupation or activities during that time.", tag: "conditional", groupLabel: "Required for applicants with educational breaks", limit: "No Limit" },
    ],
    tips: [
      { emoji: "✝️", title: "Creighton's Jesuit Mission", text: "Creighton is a Jesuit Catholic university. Reflect on how its values — service to others, cura personalis (care for the whole person), and social justice — resonate with your own goals." },
      noLimitTip,
      earlyTip,
    ],
  },
  {
    slug: "university-of-nebraska-medical-center-college-of-dentistry",
    abbr: "UNMC",
    name: "University of Nebraska Medical Center College of Dentistry",
    stateAbbr: "NE",
    stateFull: "Nebraska",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Please describe the most challenging situation or obstacle you have had to overcome.", tag: "required", limit: "500 characters" },
      { text: "What was the life lesson you learned from this experience?", tag: "required", limit: "300 characters" },
    ],
    tips: [
      { emoji: "💪", title: "Short Prompts — Maximum Impact", text: "With 500 and 300 characters respectively, you must be razor-sharp. State the obstacle clearly in one sentence, then pivot immediately to your response and the lesson learned." },
      proofreadTip,
      earlyTip,
    ],
  },
  // ── NEVADA ───────────────────────────────────────────────────────────────
  {
    slug: "university-of-nevada-las-vegas-school-of-dental-medicine",
    abbr: "UNLV",
    name: "University of Nevada Las Vegas School of Dental Medicine",
    stateAbbr: "NV",
    stateFull: "Nevada",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary is submitted through the UNLV admissions website. No essay responses are required.",
    questions: [],
    noEssayNote: "UNLV does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("UNLV"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── NEW JERSEY ───────────────────────────────────────────────────────────
  {
    slug: "rutgers-school-of-dental-medicine",
    abbr: "Rutgers",
    name: "Rutgers School of Dental Medicine",
    stateAbbr: "NJ",
    stateFull: "New Jersey",
    distribution: "None",
    distributionDetail:
      "Rutgers does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "Rutgers does not require a secondary application. Your AADSAS is your full application.",
    tips: [
      noEssayTip("Rutgers"),
      { emoji: "🎓", title: "Rutgers' AADSAS Application", text: "Ensure your personal statement and activity descriptions are polished and complete, as these are the only materials Rutgers reviews beyond transcripts and test scores." },
      proofreadTip,
    ],
  },
  // ── NEW YORK ─────────────────────────────────────────────────────────────
  {
    slug: "columbia-university-college-of-dental-medicine",
    abbr: "Columbia",
    name: "Columbia University College of Dental Medicine",
    stateAbbr: "NY",
    stateFull: "New York",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes CDM family alumni and SMDEP/SHPEP items.",
    questions: [],
    noEssayNote: "Columbia CDM does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("Columbia"),
      { emoji: "🔬", title: "Columbia's Research Reputation", text: "Columbia CDM is integrated with a world-class medical center. If research interests you, ensure your AADSAS personal statement reflects that." },
      earlyTip,
    ],
  },
  {
    slug: "nyu-college-of-dentistry",
    abbr: "NYU",
    name: "New York University College of Dentistry",
    stateAbbr: "NY",
    stateFull: "New York",
    distribution: "AADSAS + Kira",
    distributionDetail:
      "Written prompts (if assigned) appear in the NYU section of AADSAS. For 2026–27, after a complete AADSAS file and the NYU Dentistry fee, applicants also complete a first-round asynchronous video interview on Kira Talent.",
    questions: [
      { text: "Why do you want to pursue your dental education at New York University College of Dentistry?", tag: "required", limit: "5000 characters" },
      { text: "Please explain why you are submitting an application to NYU Dentistry this cycle when you did not previously apply here.", tag: "conditional", groupLabel: "Required for reapplicants who did not previously apply to NYU", limit: "500 characters" },
      { text: "After a complete AADSAS application and the NYU Dentistry fee, complete the first-round asynchronous video interview on Kira Talent. This is not a written essay — treat it like an interview.", tag: "required", groupLabel: "2026–27 interview (not an essay)", limit: "Video" },
    ],
    tips: [
      whyTip("NYU"),
      { emoji: "🎥", title: "Kira is part of the file", text: "Practice spoken answers (Why NYU, Why dentistry, a behavioral example). NYU sends Kira after the fee — do not wait until a live interview invite." },
      { emoji: "🏙️", title: "NYC Clinical Diversity", text: "NYU sees one of the highest patient volumes in the country. Highlight your enthusiasm for diverse clinical experiences, complex cases, and the unique learning environment of a major urban dental school." },
      earlyTip,
    ],
  },
  {
    slug: "stony-brook-university-school-of-dental-medicine",
    abbr: "Stony Brook",
    name: "Stony Brook University School of Dental Medicine",
    stateAbbr: "NY",
    stateFull: "New York",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS. 2026–27 includes optional essays plus dual-degree, educator, residency, outreach, and prerequisite items.",
    questions: [
      { text: "Have there been changes in your preparation from the application to dental school?", tag: "optional", limit: "500 characters" },
      { text: "Is there anything you want us to know that we have not asked you?", tag: "optional", limit: "500 characters" },
    ],
    tips: [
      { emoji: "💡", title: "Optional Doesn't Mean Skip", text: "Completing optional questions shows initiative and provides context for your application. Use them to address anything not well-covered in your AADSAS, such as an upward grade trend or a unique experience." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "touro-college-of-dental-medicine",
    abbr: "Touro",
    name: "Touro College of Dental Medicine at New York Medical College",
    stateAbbr: "NY",
    stateFull: "New York",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes New York vs New Mexico pathway preference, prior application year, and a conduct item.",
    questions: [],
    noEssayNote: "Touro does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("Touro"),
      earlyTip,
      proofreadTip,
    ],
  },
  {
    slug: "university-at-buffalo-school-of-dental-medicine",
    abbr: "UB",
    name: "University at Buffalo School of Dental Medicine",
    stateAbbr: "NY",
    stateFull: "New York",
    distribution: "None",
    distributionDetail:
      "UB does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "UB does not require a secondary application.",
    tips: [
      noEssayTip("UB"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── NORTH CAROLINA ───────────────────────────────────────────────────────
  {
    slug: "east-carolina-university-school-of-dental-medicine",
    abbr: "ECU",
    name: "East Carolina University School of Dental Medicine",
    stateAbbr: "NC",
    stateFull: "North Carolina",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "What specifically led you to apply to East Carolina University's School of Dental Medicine?", tag: "required", limit: "1000 characters" },
      { text: "Describe a time that you collaborated with others in working toward a common goal. What did you learn from that experience?", tag: "required", limit: "1000 characters" },
      { text: "Describe a crisis in your life and what you learned from it.", tag: "required", limit: "1000 characters" },
      { text: "In times of academic or personal challenges, who is among your support network? In what specific ways has that person(s) been supportive?", tag: "required", limit: "1000 characters" },
      { text: "Describe a situation where your attempts at leadership were not successful. Why do you think that was?", tag: "required", limit: "1000 characters" },
    ],
    tips: [
      { emoji: "🌾", title: "ECU's Rural Health Mission", text: "ECU trains dentists for North Carolina's rural and underserved communities. Connect your response to this mission if applicable — mention rural background, public health interests, or service commitments." },
      { emoji: "❌", title: "Leadership Failure — Own It", text: "The leadership question specifically asks about failure. Don't reframe a failure as a success. Show genuine self-reflection, what you'd do differently, and how this shapes your leadership approach now." },
      proofreadTip,
      earlyTip,
    ],
  },
  {
    slug: "unc-adams-school-of-dentistry",
    abbr: "UNC",
    name: "University of North Carolina Chapel Hill, Adams School of Dentistry",
    stateAbbr: "NC",
    stateFull: "North Carolina",
    distribution: "AADSAS and emailed",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS and may also be emailed to all qualifying applicants.",
    questions: [
      { text: "Please describe your interest in choosing the UNC Adams School of Dentistry for your dental education.", tag: "required", limit: "1500 characters" },
      { text: "We all have unique values, aspirations, and a sense of purpose that define who we are and how we live. What is your personal mission? Describe how your personal mission aligns with your professional goals.", tag: "required", limit: "250 words" },
      { text: "Comment on your ability to work on a team, both as a leader and as a supportive team member.", tag: "required", limit: "250 words" },
      { text: "Share your skills or experiences that allow you to work effectively with different groups of people.", tag: "required", limit: "250 words" },
      { text: "Effective communication is key in modern healthcare. Describe your skills, experiences, strengths, and weaknesses in communication. This may include experiences in expository writing, public speaking, drama/acting, debate, etc.", tag: "required", limit: "250 words" },
      { text: "The completion of college coursework and the Dental Admission Test (DAT) are milestones on the path to dental school, each offering unique challenges and learning opportunities. Reflect on your performance in these areas. This is also an opportunity to discuss any aspects of your academic record or DAT that you believe require additional context.", tag: "required", limit: "250 words" },
      { text: "Have you participated in any academic enrichment programs designed to help you prepare for a career in dentistry or other health professions? (Yes/No)", tag: "required", limit: "Yes / No" },
      { text: "For a variety of reasons, access to dental care is a challenge for many Americans. In your opinion, what role should dentistry play in addressing this issue?", tag: "required", groupLabel: "Advocate — choose one", limit: "250 words" },
      { text: "Describe an ethical dilemma you have faced. How was it resolved, and how might this experience influence your future career or your time as a dental student?", tag: "required", groupLabel: "Advocate — choose one", limit: "250 words" },
      { text: "Describe a meaningful experience you have had either in a clinical encounter or with a dental role model. What did you learn, and how will it shape the type of clinician you will become?", tag: "required", groupLabel: "Clinician — choose one", limit: "250 words" },
      { text: "Describe a time when you have faced conflict. How did you work to resolve it?", tag: "required", groupLabel: "Clinician — choose one", limit: "250 words" },
      { text: "Describe a time when you worked on a team to solve a problem or develop a project. What did you learn about the challenges faced by teams?", tag: "required", groupLabel: "Thinker — choose one", limit: "250 words" },
      { text: "Describe a time when you experienced failure. How did this change you?", tag: "required", groupLabel: "Thinker — choose one", limit: "250 words" },
    ],
    tips: [
      { emoji: "📋", title: "UNC Has Many Questions — Plan Your Time", text: "UNC's secondary is comprehensive. Block dedicated time. Choose one option in each Advocate / Clinician / Thinker pair — do not answer both." },
      whyTip("UNC"),
      { emoji: "📈", title: "One academic + DAT prompt", text: "College coursework and DAT are now one reflection. Give context only where it changes how they read the numbers — not a second personal statement." },
      earlyTip,
    ],
  },
  // ── OHIO ─────────────────────────────────────────────────────────────────
  {
    slug: "case-western-reserve-university-school-of-dental-medicine",
    abbr: "CWRU",
    name: "Case Western Reserve University School of Dental Medicine",
    stateAbbr: "OH",
    stateFull: "Ohio",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental question is submitted via AADSAS. The essay is conditional for DMD/MPH applicants only.",
    questions: [
      { text: "Please write a statement about why you are interested in the MPH/DMD program and how this program fits into your long-term professional goals.", tag: "conditional", groupLabel: "Required for DMD/MPH applicants", limit: "500 characters" },
    ],
    tips: [
      noEssayTip("CWRU"),
      { emoji: "🔬", title: "CWRU's Research Environment", text: "CWRU is deeply integrated with Cleveland's world-class medical research community. If you have research interests, leverage them in your AADSAS personal statement." },
      earlyTip,
    ],
  },
  {
    slug: "ohio-state-university-college-of-dentistry",
    abbr: "OSU",
    name: "The Ohio State University College of Dentistry",
    stateAbbr: "OH",
    stateFull: "Ohio",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "How has your undergraduate experience influenced your outlook on life?", tag: "required", limit: "500 characters" },
      { text: "Describe a community to which you belong and share a way in which you have made a difference in that community.", tag: "required", limit: "500 characters" },
      { text: "Describe a challenging circumstance in your life and how you coped with the challenge.", tag: "required", limit: "500 characters" },
    ],
    tips: [
      { emoji: "🏫", title: "Undergraduate Influence — Be Reflective", text: "Think about a specific class, professor, or experience that genuinely shifted your perspective. Specificity beats generality — avoid clichés like 'college opened my mind.'" },
      { emoji: "🤝", title: "Community Impact — Quantify if Possible", text: "Mention a specific community (neighborhood, club, cultural group), a concrete action you took, and a measurable or qualitative outcome." },
      earlyTip,
    ],
  },
  // ── OKLAHOMA ─────────────────────────────────────────────────────────────
  {
    slug: "university-of-oklahoma-college-of-dentistry",
    abbr: "OU",
    name: "University of Oklahoma College of Dentistry",
    stateAbbr: "OK",
    stateFull: "Oklahoma",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes Why OU, DDS/MBA interest, clinic-placement options, and alumni family.",
    questions: [],
    noEssayNote: "OU does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("OU"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── OREGON ───────────────────────────────────────────────────────────────
  {
    slug: "oregon-health-sciences-university-school-of-dentistry",
    abbr: "OHSU",
    name: "Oregon Health Sciences University School of Dentistry",
    stateAbbr: "OR",
    stateFull: "Oregon",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. No essay responses are required.",
    questions: [],
    noEssayNote: "OHSU does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("OHSU"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── PENNSYLVANIA ─────────────────────────────────────────────────────────
  {
    slug: "university-of-pittsburgh-school-of-dental-medicine",
    abbr: "Pitt",
    name: "University of Pittsburgh School of Dental Medicine",
    stateAbbr: "PA",
    stateFull: "Pennsylvania",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental items are submitted via AADSAS. 2026–27 includes events attendance, DAT/academic context, hardship, scholarships, plus a DMD/PhD essay if applicable.",
    questions: [
      { text: "In order to apply for the program, please include an essay that addresses: your intellectual and professional interest in graduate study in Oral Biology; primary interests within your field; relevant background experience; which faculty mentor/lab you'd like to work with; and your career goals after graduate school.", tag: "conditional", groupLabel: "Required for DMD/PhD applicants", limit: "5000 characters" },
    ],
    tips: [
      noEssayTip("Pitt"),
      { emoji: "🔬", title: "DMD/PhD Applicants — Align with Faculty Research", text: "Research specific Pitt Oral Biology faculty members and their active projects. Mentioning a specific mentor and how your interests align significantly strengthens a DMD/PhD application." },
      earlyTip,
    ],
  },
  {
    slug: "temple-university-kornberg-school-of-dentistry",
    abbr: "Temple",
    name: "Temple University, Maurice H. Kornberg School of Dentistry",
    stateAbbr: "PA",
    stateFull: "Pennsylvania",
    distribution: "None",
    distributionDetail:
      "Temple does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "Temple does not require a secondary application.",
    tips: [
      noEssayTip("Temple"),
      { emoji: "🏙️", title: "Temple's Urban Clinical Training", text: "Temple's North Philadelphia location provides exceptional clinical diversity. If community health or urban dentistry interests you, feature it in your AADSAS personal statement." },
      proofreadTip,
    ],
  },
  {
    slug: "university-of-pennsylvania-school-of-dental-medicine",
    abbr: "UPenn",
    name: "University of Pennsylvania School of Dental Medicine",
    stateAbbr: "PA",
    stateFull: "Pennsylvania",
    distribution: "Penn portal",
    distributionDetail:
      "After AADSAS verification, Penn invites applicants to a supplemental application in the Penn Dental Medicine portal. 2026–27 written prompts below are from that cycle (ethics / “successful dentist” prompts from earlier years were replaced).",
    questions: [
      { text: "Why are you well-suited for a career in dentistry?", tag: "required", limit: "1000 words" },
      { text: "Dental education involves frequent collaboration with peers, faculty, and staff. How do you typically contribute to a team, and how do you handle disagreements or conflict?", tag: "required", limit: "1000 words" },
      { text: "What qualities of Penn Dental Medicine do you feel will help you achieve your professional goals and how? Please describe.", tag: "required", limit: "1000 words" },
    ],
    tips: [
      { emoji: "🦷", title: "Fit for dentistry — one story", text: "This replaced the old ethics / success-dentist pair. Give evidence you work well in clinical teams, not a generic love-of-science paragraph." },
      { emoji: "🤝", title: "Team + conflict is two asks", text: "Answer both: how you contribute, and how you handle disagreement. One small, resolved conflict beats a dramatic fight you “won.”" },
      whyTip("Penn"),
      earlyTip,
    ],
  },
  // ── PUERTO RICO ──────────────────────────────────────────────────────────
  {
    slug: "university-of-puerto-rico-school-of-dental-medicine",
    abbr: "UPR",
    name: "University of Puerto Rico School of Dental Medicine",
    stateAbbr: "PR",
    stateFull: "Puerto Rico",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary materials are submitted through the UPR admissions portal. Specific essay requirements are communicated upon application.",
    questions: [],
    noEssayNote: "UPR's specific secondary essay requirements are communicated through their admissions portal after application submission.",
    tips: [
      { emoji: "🌴", title: "UPR — Spanish Proficiency is Valued", text: "UPR primarily serves Puerto Rico's Spanish-speaking population. If you are bilingual or have experience serving Spanish-speaking patients, highlight this in your application." },
      earlyTip,
      proofreadTip,
    ],
  },
  // ── SOUTH CAROLINA ───────────────────────────────────────────────────────
  {
    slug: "medical-university-of-south-carolina-college-of-dental-medicine",
    abbr: "MUSC",
    name: "Medical University of South Carolina, James B. Edwards College of Dental Medicine",
    stateAbbr: "SC",
    stateFull: "South Carolina",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary is submitted through the MUSC admissions website. Essay requirements apply specifically to DMD/PhD applicants.",
    questions: [
      { text: "For the Essay section: write a brief essay discussing previous research experience(s), current research interests, why you want to pursue the combined DMD/PhD degree, why you are applying to MUSC, and your long-range goals.", tag: "conditional", groupLabel: "Required for DMD/PhD applicants", limit: "No Limit" },
      { text: "For the Resume/Personal History: provide information in resume or CV format including past employment, research experience, publications, academic honors, extracurricular activities, and professional memberships.", tag: "conditional", groupLabel: "Required for DMD/PhD applicants" },
    ],
    tips: [
      noEssayTip("MUSC"),
      { emoji: "🔬", title: "MUSC Research Opportunities", text: "MUSC offers strong research integration within its dental program. If research interests you, connect your personal statement to MUSC's research environment." },
      earlyTip,
    ],
  },
  // ── TENNESSEE ────────────────────────────────────────────────────────────
  {
    slug: "meharry-medical-college-school-of-dentistry",
    abbr: "Meharry",
    name: "Meharry Medical College School of Dentistry",
    stateAbbr: "TN",
    stateFull: "Tennessee",
    distribution: "Emailed (all applicants)",
    distributionDetail:
      "Secondary is emailed to all applicants. One essay question is required.",
    questions: [
      { text: "Please indicate why you wish to attend Meharry Medical College, School of Dentistry.", tag: "required", limit: "No Limit" },
    ],
    tips: [
      { emoji: "🌍", title: "Meharry's HBCU Mission", text: "Meharry is one of the nation's leading HBCUs and is committed to training healthcare providers for minority and underserved populations. Authentically align your response with this mission." },
      noLimitTip,
      earlyTip,
    ],
  },
  {
    slug: "university-of-tennessee-college-of-dentistry",
    abbr: "UT / UTHSC",
    name: "University of Tennessee Health Science Center College of Dentistry",
    stateAbbr: "TN",
    stateFull: "Tennessee",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes Tennessee ties, rural ZIP (if applicable), and prior UTHSC interview.",
    questions: [],
    noEssayNote: "UTHSC does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("UTHSC"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── TEXAS ────────────────────────────────────────────────────────────────
  {
    slug: "texas-am-university-college-of-dentistry",
    abbr: "Texas A&M",
    name: "Texas A&M University College of Dentistry",
    stateAbbr: "TX",
    stateFull: "Texas",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary is submitted through the Texas A&M admissions website. No essay responses are required.",
    questions: [],
    noEssayNote: "Texas A&M does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("Texas A&M"),
      earlyTip,
      proofreadTip,
    ],
  },
  {
    slug: "texas-tech-university-woody-hunt-school-of-dentistry",
    abbr: "Texas Tech",
    name: "Texas Tech University Health Sciences Center El Paso, Woody L. Hunt School of Dentistry",
    stateAbbr: "TX",
    stateFull: "Texas",
    distribution: "None",
    distributionDetail:
      "Texas Tech does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "Texas Tech does not require a secondary application.",
    tips: [
      noEssayTip("Texas Tech"),
      { emoji: "🌵", title: "Border Region Focus", text: "Texas Tech's El Paso location serves a predominantly Hispanic border community. If you speak Spanish or have experience serving border communities, highlight it in your AADSAS application." },
      proofreadTip,
    ],
  },
  {
    slug: "ut-houston-school-of-dentistry",
    abbr: "UT-H / UTHSC-H",
    name: "University of Texas Health Science Center at Houston School of Dentistry",
    stateAbbr: "TX",
    stateFull: "Texas",
    distribution: "None",
    distributionDetail:
      "UT Houston does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "UT Houston does not require a secondary application.",
    tips: [
      noEssayTip("UT-H"),
      earlyTip,
      proofreadTip,
    ],
  },
  {
    slug: "ut-san-antonio-school-of-dentistry",
    abbr: "UT-SA / UTHSC-SA",
    name: "University of Texas Health Science Center at San Antonio School of Dentistry",
    stateAbbr: "TX",
    stateFull: "Texas",
    distribution: "None",
    distributionDetail:
      "UT San Antonio does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "UT San Antonio does not require a secondary application.",
    tips: [
      noEssayTip("UT-SA"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── UTAH ─────────────────────────────────────────────────────────────────
  {
    slug: "roseman-university-college-of-dental-medicine",
    abbr: "Roseman",
    name: "Roseman University of Health Sciences College of Dental Medicine",
    stateAbbr: "UT",
    stateFull: "Utah",
    distribution: "Admissions website",
    distributionDetail:
      "Secondary is submitted through the Roseman University admissions website. 2026–27 includes Utah vs Utah/Nevada cohort preference, how you heard about Roseman, and a Kira video assessment.",
    questions: [],
    noEssayNote: "Roseman does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("Roseman"),
      { emoji: "⚡", title: "Roseman's Block Curriculum", text: "Roseman uses a competency-based block curriculum. If this intensive model excites you, mention it specifically in your AADSAS personal statement as a reason for your interest." },
      earlyTip,
    ],
  },
  {
    slug: "university-of-utah-school-of-dentistry",
    abbr: "U of U",
    name: "University of Utah School of Dentistry",
    stateAbbr: "UT",
    stateFull: "Utah",
    distribution: "AADSAS and emailed",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS and/or emailed to qualifying applicants.",
    questions: [
      { text: "Please tell us why you are interested in the University of Utah School of Dentistry.", tag: "required", limit: "9999 characters" },
      { text: "Please tell us any additional information about yourself not already in your application.", tag: "required", limit: "9999 characters" },
      { text: "Please list three obstacles that you have encountered in your preparation for dental school and how you have or are managing each.", tag: "required", limit: "9999 characters" },
      { text: "Please describe how your prior employment has helped prepare you for dental school.", tag: "required", limit: "9999 characters" },
    ],
    tips: [
      whyTip("U of U"),
      { emoji: "🧱", title: "Three Obstacles — Show Diversity", text: "Pick three distinct obstacles from different areas of your life: academic, personal, and professional/clinical. This shows breadth of challenge and resilience across multiple dimensions." },
      { emoji: "💼", title: "Employment Question — Dentistry Isn't Required", text: "Any work experience is valid. Highlight transferable skills: communication, precision, customer service, teamwork, time management. Show how non-dental jobs prepared you for dental school." },
      earlyTip,
    ],
  },
  // ── VIRGINIA ─────────────────────────────────────────────────────────────
  {
    slug: "virginia-commonwealth-university-school-of-dentistry",
    abbr: "VCU",
    name: "Virginia Commonwealth University School of Dentistry",
    stateAbbr: "VA",
    stateFull: "Virginia",
    distribution: "Emailed (interview invitees)",
    distributionDetail:
      "Secondary materials are sent only to applicants invited to interview. The essay question is optional.",
    questions: [
      { text: "Is there any information not included elsewhere in your application that you would like us to know?", tag: "optional", limit: "No Limit" },
    ],
    tips: [
      { emoji: "💡", title: "Optional But Valuable", text: "Use this optional question to provide context for anything unusual in your application, to highlight a strength not captured elsewhere, or to express genuine enthusiasm for VCU." },
      noLimitTip,
      earlyTip,
    ],
  },
  // ── WASHINGTON ───────────────────────────────────────────────────────────
  {
    slug: "university-of-washington-school-of-dentistry",
    abbr: "UW",
    name: "University of Washington School of Dentistry",
    stateAbbr: "WA",
    stateFull: "Washington",
    distribution: "AADSAS",
    distributionDetail:
      "Supplemental questions are submitted via AADSAS to all qualifying applicants.",
    questions: [
      { text: "Embracing equity, diversity and inclusion is a value UWSOD seeks to uphold in teaching, service and research. If selected to the incoming class, how would you contribute to developing and maintaining a sense of belonging for all classmates? What challenges might you encounter? What benefits would you expect?", tag: "required", limit: "1500 characters" },
      { text: "Service to others is highly valued at UWSOD. Describe a memorable experience within the last two years in which your service to someone or a community in need was enriching to the recipient(s). What was your motivation and what was the most meaningful part for you personally?", tag: "required", limit: "1500 characters" },
      { text: "Please describe a challenge or barrier you have faced in your life. How has it influenced who you are today?", tag: "required", limit: "1500 characters" },
      { text: "Is there an area of your application that you think is not an adequate representation of your abilities? If so, please explain.", tag: "required", limit: "1500 characters" },
    ],
    tips: [
      { emoji: "🌈", title: "UW's Equity Focus", text: "UWSOD has a strong commitment to DEI. Provide a specific example of how you've contributed to inclusive environments — not a generic statement of values. Name the people, the setting, the challenge." },
      { emoji: "🛠️", title: "Application Weakness Question", text: "This is a rare opportunity to address a gap honestly. If you answer it, be brief, factual, and forward-looking. Don't over-apologize — focus on what the gap doesn't reflect about your true ability." },
      earlyTip,
      proofreadTip,
    ],
  },
  // ── WEST VIRGINIA ────────────────────────────────────────────────────────
  {
    slug: "west-virginia-university-school-of-dentistry",
    abbr: "WVU",
    name: "West Virginia University School of Dentistry",
    stateAbbr: "WV",
    stateFull: "West Virginia",
    distribution: "AADSAS",
    distributionDetail:
      "Secondary is submitted via AADSAS. 2026–27 includes online-prerequisite and West Virginia residency/ties items.",
    questions: [],
    noEssayNote: "WVU does not require supplemental essay responses for the secondary application.",
    tips: [
      noEssayTip("WVU"),
      earlyTip,
      proofreadTip,
    ],
  },
  // ── WISCONSIN ────────────────────────────────────────────────────────────
  {
    slug: "marquette-university-school-of-dentistry",
    abbr: "Marquette",
    name: "Marquette University School of Dentistry",
    stateAbbr: "WI",
    stateFull: "Wisconsin",
    distribution: "None",
    distributionDetail:
      "Marquette does not distribute a secondary application. Your AADSAS application is your complete submission.",
    questions: [],
    noEssayNote: "Marquette does not require a secondary application.",
    tips: [
      noEssayTip("Marquette"),
      { emoji: "✝️", title: "Marquette's Jesuit Mission", text: "Marquette is a Jesuit Catholic university. If its mission of ethical leadership and service resonates with you, reference it authentically in your AADSAS personal statement." },
      proofreadTip,
    ],
  },
];

function withSchoolEnrichment(school: SchoolDetail): SchoolDetail {
  const extra = schoolEnrichments[school.slug] ?? {};
  const cycleQs = cycle2026Questions[school.slug];
  const questions = cycleQs ?? school.questions;
  const gainedEssays = Boolean(cycleQs && cycleQs.length > 0 && school.questions.length === 0);
  const withoutNoEssayTip =
    cycleQs && questions.length > 0
      ? school.tips.filter((tip) => tip.emoji !== "🏆")
      : school.tips;
  const tips = gainedEssays
    ? [
        whyTip(school.abbr),
        ...withoutNoEssayTip.filter((tip) => tip !== earlyTip && tip !== proofreadTip),
        earlyTip,
        proofreadTip,
      ]
    : withoutNoEssayTip;

  return {
    ...school,
    questions,
    noEssayNote: questions.length > 0 ? undefined : school.noEssayNote,
    tips,
    secondaryFee:
      school.secondaryFee ??
      extra.secondaryFee ??
      DEFAULT_SCHOOL_ENRICHMENT.secondaryFee,
    timingNote:
      school.timingNote ??
      extra.timingNote ??
      DEFAULT_SCHOOL_ENRICHMENT.timingNote,
    admissionsUrl: school.admissionsUrl ?? extra.admissionsUrl,
    cycleLabel:
      school.cycleLabel ??
      extra.cycleLabel ??
      (cycleQs ? "2026–27" : DEFAULT_SCHOOL_ENRICHMENT.cycleLabel),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────────────────────
export function getSchoolDetail(slug: string): SchoolDetail | undefined {
  const base = schoolDetails.find((s) => s.slug === slug);
  if (!base) return undefined;
  return withSchoolEnrichment(base);
}

export function getEnrichedSchoolDetails(): SchoolDetail[] {
  return schoolDetails.map(withSchoolEnrichment);
}

export function getAdjacentSlugs(slug: string): { prev?: string; next?: string } {
  const idx = schoolDetails.findIndex((s) => s.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? schoolDetails[idx - 1].slug : undefined,
    next: idx < schoolDetails.length - 1 ? schoolDetails[idx + 1].slug : undefined,
  };
}

export function getAdjacentSchools(slug: string): {
  prev?: { slug: string; abbr: string; name: string };
  next?: { slug: string; abbr: string; name: string };
} {
  const idx = schoolDetails.findIndex((s) => s.slug === slug);
  if (idx === -1) return {};
  const prev = idx > 0 ? schoolDetails[idx - 1] : undefined;
  const next = idx < schoolDetails.length - 1 ? schoolDetails[idx + 1] : undefined;
  return {
    prev: prev ? { slug: prev.slug, abbr: prev.abbr, name: prev.name } : undefined,
    next: next ? { slug: next.slug, abbr: next.abbr, name: next.name } : undefined,
  };
}
