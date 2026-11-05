// One page per DAT section at /private-dat-tutoring/[slug]. Each page targets "[section] tutor" searches;
// the matching blog study guide keeps the how-to searches. Facts here match those study guides.

export type DatSectionPage = {
  slug: string;
  /** Short section name, e.g. "Biology". */
  section: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Answer-first paragraph under the H1. */
  answer: string;
  facts: { label: string; value: string }[];
  /** What the section covers, in the ADA outline's own groupings. */
  covers: string[];
  hardTopics: { title: string; text: string }[];
  method: { title: string; text: string }[];
  /** One example week with a tutor. */
  sampleWeek: { day: string; text: string }[];
  coachIds: string[];
  faqs: { question: string; answer: string }[];
  guideSlug: string;
  morePosts: string[];
};

const oneSectionFaq = {
  question: "Can I get a tutor for only one DAT section?",
  answer:
    "Yes. Many students book tutoring for one weak section and study the rest on their own. The 4-hour starter is three sessions over about two weeks and works well for one problem area; 10 hours gives you time to rebuild one subject and check progress on practice tests.",
};

export const datSectionPages: DatSectionPage[] = [
  {
    slug: "dat-biology-tutor",
    section: "Biology",
    metaTitle: "DAT Biology Tutor: 1-on-1 Online Tutoring | FDP",
    metaDescription:
      "1-on-1 DAT biology tutoring from tutors who scored high on it. Biology is 40 of the 100 science questions, so we focus on recall under time pressure. From $500.",
    h1: "DAT Biology Tutor",
    answer:
      "Biology is the biggest part of the DAT science section: 40 of the 100 Survey of Natural Sciences questions. It is wide rather than deep, so most points are lost to topics you skimmed, not topics you never understood. A DAT biology tutor finds those gaps with a diagnostic, then builds a review order around the systems and topics that show up most.",
    facts: [
      { label: "Questions", value: "40 of 100" },
      { label: "Time", value: "90-min science block" },
      { label: "Calculator", value: "None" },
    ],
    covers: [
      "Cell and molecular biology",
      "Diversity of life and classification",
      "Structure and function of organ systems",
      "Developmental biology",
      "Genetics",
      "Evolution, ecology and behavior",
    ],
    hardTopics: [
      {
        title: "Too much to memorize",
        text: "Students try to read every chapter equally. We rank topics by how often they appear and how weak you are, so the hours go where the points are.",
      },
      {
        title: "Developmental biology and taxonomy",
        text: "Small, detail-heavy topics that most review books cover quickly. We use short, repeated recall drills instead of rereading.",
      },
      {
        title: "Genetics problems",
        text: "Pedigrees and crosses are math-like. We practice a fixed setup so you do not lose two minutes on one question.",
      },
    ],
    method: [
      {
        title: "Diagnostic first",
        text: "A timed biology set shows which systems cost you points. Your tutor builds the review order from that, not from the textbook order.",
      },
      {
        title: "Active recall, not rereading",
        text: "Each session ends with questions on what you covered, and you get short recall sets to do between sessions.",
      },
      {
        title: "Review every practice question",
        text: "Right or wrong, you explain why the answer is right. A lucky guess should never hide a gap.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Review last week's missed questions, then teach two weak systems with diagrams.",
      },
      {
        day: "Days 2–4",
        text: "30 minutes of recall drills a day on those systems.",
      },
      { day: "Day 5", text: "A timed 40-question biology set." },
      {
        day: "Next session",
        text: "Go through every miss and pick the next two topics.",
      },
    ],
    coachIds: ["dr-todd-chastain", "celina-yang", "hansuja-chaurasia"],
    faqs: [
      {
        question: "How many questions are in DAT biology?",
        answer:
          "Biology is 40 of the 100 questions in the Survey of Natural Sciences. General chemistry and organic chemistry are 30 each, and all three share one 90-minute block.",
      },
      {
        question: "Is DAT biology hard?",
        answer:
          "It is less about difficult concepts and more about volume. Most students lose points on topics they skimmed. A plan that ranks topics by frequency and your weak spots usually helps more than more reading.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-biology-study-guide",
    morePosts: ["how-to-study-for-the-dat", "dat-score-guide"],
  },
  {
    slug: "dat-general-chemistry-tutor",
    section: "General Chemistry",
    metaTitle: "DAT General Chemistry Tutor | FDP",
    metaDescription:
      "1-on-1 DAT general chemistry tutoring from a tutor who scored 30 in chemistry. Concept first, then timed sets, with no calculator. Packages from $500.",
    h1: "DAT General Chemistry Tutor",
    answer:
      "General chemistry is 30 of the 100 science questions on the DAT, and there is no calculator in the science section. Students who know the concepts still lose points to slow math and long setups. A DAT general chemistry tutor teaches the concept, then the fastest way to set up and estimate each problem type under time pressure.",
    facts: [
      { label: "Questions", value: "30 of 100" },
      { label: "Time", value: "90-min science block" },
      { label: "Calculator", value: "None" },
    ],
    covers: [
      "Stoichiometry",
      "Gases, liquids, solids and solutions",
      "Acids and bases",
      "Chemical equilibrium",
      "Thermodynamics and kinetics",
      "Oxidation-reduction",
      "Atomic structure and periodic trends",
      "Lab techniques",
    ],
    hardTopics: [
      {
        title: "Math without a calculator",
        text: "Logs, scientific notation and unit conversions by hand. We drill estimation so you can pick the right answer without exact arithmetic.",
      },
      {
        title: "Equilibrium and acids/bases",
        text: "Many students memorize formulas without knowing when to use each one. We teach the decision first, then the formula.",
      },
      {
        title: "Thermodynamics and kinetics",
        text: "Easy to mix up. We separate them with one clear question: is this about whether it happens, or how fast?",
      },
    ],
    method: [
      {
        title: "Concept, then setup",
        text: "Each topic starts with why it works, then a step-by-step setup you repeat until it is automatic.",
      },
      {
        title: "Estimation drills",
        text: "Short sets where the goal is a fast, close answer, because the DAT gives you answer choices, not a blank.",
      },
      {
        title: "Timed mini-sections",
        text: "Weekly 30-question sets so speed improves along with accuracy.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Teach equilibrium and acid-base setups, then work problems together.",
      },
      { day: "Days 2–4", text: "15 problems a day with no calculator." },
      { day: "Day 5", text: "A timed 30-question general chemistry set." },
      {
        day: "Next session",
        text: "Fix the slowest setups and start the next topic.",
      },
    ],
    coachIds: ["neil-desai", "celina-yang", "hansuja-chaurasia"],
    faqs: [
      {
        question: "Can I use a calculator on DAT general chemistry?",
        answer:
          "No. The on-screen calculator is only available in Quantitative Reasoning. General chemistry math is designed to be done by hand, so estimation and clean setups matter.",
      },
      {
        question: "How many general chemistry questions are on the DAT?",
        answer:
          "30 of the 100 questions in the Survey of Natural Sciences, the same number as organic chemistry.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-general-chemistry-study-guide",
    morePosts: ["how-to-study-for-the-dat", "dat-score-guide"],
  },
  {
    slug: "dat-organic-chemistry-tutor",
    section: "Organic Chemistry",
    metaTitle: "DAT Organic Chemistry Tutor (Orgo) | FDP",
    metaDescription:
      "1-on-1 DAT orgo tutoring. Learn reactions by pattern and mechanism instead of memorizing lists, with the April 2026 outline covered. From $500.",
    h1: "DAT Organic Chemistry Tutor",
    answer:
      "Organic chemistry is 30 of the 100 science questions on the DAT, and it causes more stress than any other section. Most of that comes from study method: memorizing long reaction lists that fall apart on unfamiliar questions. A DAT orgo tutor teaches reactions by pattern and mechanism, so you can reason through a question you have not seen before.",
    facts: [
      { label: "Questions", value: "30 of 100" },
      { label: "Time", value: "90-min science block" },
      { label: "Outline", value: "Updated April 2026" },
    ],
    covers: [
      "Mechanisms, including curved arrows",
      "Chemical synthesis: one-step, two-step and multi-step",
      "Acid-base chemistry",
      "Chemical and physical properties, including spectroscopy",
      "Structural evaluation: nomenclature, stereochemistry, bonding",
    ],
    hardTopics: [
      {
        title: "Reaction lists that never stick",
        text: "We group reactions by what the electrons are doing, so one idea covers many reactions.",
      },
      {
        title: "Stereochemistry",
        text: "R/S, chirality and isomers need quick visual habits. We drill them with models and short timed sets.",
      },
      {
        title: "Synthesis questions",
        text: "Two-step synthesis is listed in the updated outline. We practice working backwards from the product.",
      },
    ],
    method: [
      {
        title: "Mechanism first",
        text: "You learn why a reaction happens before you memorize its reagents.",
      },
      {
        title: "Reaction maps",
        text: "Your tutor builds one-page maps that connect functional groups, so review takes minutes, not hours.",
      },
      {
        title: "Mixed practice",
        text: "Once a topic is solid, it goes into mixed sets so you learn to recognize it without the chapter title.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Teach one reaction family by mechanism and build its reaction map.",
      },
      { day: "Days 2–4", text: "Daily map review plus 15 mixed questions." },
      { day: "Day 5", text: "A timed 30-question organic chemistry set." },
      {
        day: "Next session",
        text: "Go through every miss, then add the next reaction family.",
      },
    ],
    coachIds: ["neil-desai", "celina-yang", "hansuja-chaurasia"],
    faqs: [
      {
        question: "Did DAT organic chemistry change in 2026?",
        answer:
          "The ADA reorganized the organic chemistry outline in April 2026 and says it is not a major content change. It is still 30 questions, with clearer topic names and a longer subtopic list that includes curved arrows and two-step synthesis.",
      },
      {
        question: "What is the best way to study DAT orgo?",
        answer:
          "Learn reactions by mechanism and pattern, then practice mixed questions. Memorizing reagent lists alone usually breaks down on unfamiliar questions.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-organic-chemistry-study-guide",
    morePosts: [
      "dat-organic-chemistry-changes-2026",
      "how-to-study-for-the-dat",
    ],
  },
  {
    slug: "dat-pat-tutor",
    section: "Perceptual Ability (PAT)",
    metaTitle: "DAT PAT Tutor: Perceptual Ability Help | FDP",
    metaDescription:
      "1-on-1 DAT PAT tutoring: 90 questions in 60 minutes across 6 question types. Strategies for keyholes, TFE, angles, hole punching, cubes and folding. From $500.",
    h1: "DAT PAT Tutor",
    answer:
      "The Perceptual Ability Test is 90 questions in 60 minutes, about 40 seconds each, across six very different question types. It is not tested anywhere else in school, so it does not improve with general studying. A DAT PAT tutor teaches a strategy for each type, then builds speed with daily practice one subtest at a time.",
    facts: [
      { label: "Questions", value: "90 (6 types × 15)" },
      { label: "Time", value: "60 minutes" },
      { label: "Per question", value: "About 40 seconds" },
    ],
    covers: [
      "Apertures (keyholes)",
      "View recognition (top-front-end)",
      "Angle discrimination",
      "Paper folding (hole punching)",
      "Cube counting",
      "3D form development (pattern folding)",
    ],
    hardTopics: [
      {
        title: "Keyholes and top-front-end",
        text: "The two types where students feel lost. We teach a checklist of features to compare so you stop guessing by feel.",
      },
      {
        title: "Angle ranking",
        text: "Small differences that are hard to see. We practice comparison tricks and a time limit so one angle set does not eat your clock.",
      },
      {
        title: "Running out of time",
        text: "Six types back to back with no breaks. We plan an order and a skip rule for test day.",
      },
    ],
    method: [
      {
        title: "One type at a time",
        text: "Learn the strategy, practice untimed, then timed, before moving to the next type.",
      },
      {
        title: "Daily short practice",
        text: "PAT skills build through repetition, so you get a short daily set instead of a weekly cram.",
      },
      {
        title: "Full timed sections",
        text: "Once every type is solid, you practice the full 90 questions in 60 minutes with a pacing plan.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Teach keyhole and top-front-end strategies, then solve sets together.",
      },
      {
        day: "Days 2–5",
        text: "15 questions of each new type a day, first untimed, then timed.",
      },
      {
        day: "Day 6",
        text: "A timed set mixing all the types learned so far.",
      },
      {
        day: "Next session",
        text: "Review misses and add the next two types.",
      },
    ],
    coachIds: ["neil-desai", "celina-yang", "hansuja-chaurasia"],
    faqs: [
      {
        question: "How is the DAT PAT structured?",
        answer:
          "90 questions in 60 minutes: six question types with 15 questions each. They are apertures (keyholes), view recognition (top-front-end), angle discrimination, paper folding (hole punching), cube counting and 3D form development.",
      },
      {
        question: "Can you improve your PAT score?",
        answer:
          "Yes. PAT is a skill that improves with a clear strategy for each question type and consistent daily practice. Sporadic practice improves it much more slowly.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-perceptual-ability-practice-guide",
    morePosts: ["dat-pat-tips-and-strategies", "how-to-study-for-the-dat"],
  },
  {
    slug: "dat-reading-comprehension-tutor",
    section: "Reading Comprehension",
    metaTitle: "DAT Reading Comprehension Tutor | FDP",
    metaDescription:
      "1-on-1 DAT reading comprehension tutoring: 3 dense science passages, 50 questions, 60 minutes. A reading method that fits the clock. Packages from $500.",
    h1: "DAT Reading Comprehension Tutor",
    answer:
      "DAT Reading Comprehension is three dense science passages with 50 questions in 60 minutes, about 20 minutes per passage. Strong readers still lose points when one passage runs long and the last one gets rushed. A DAT reading comprehension tutor helps you choose a reading method that fits your speed and practice finding answers in the passage fast.",
    facts: [
      { label: "Passages", value: "3" },
      { label: "Questions", value: "50" },
      { label: "Time", value: "60 minutes" },
    ],
    covers: [
      "Main idea and author's purpose",
      "Finding specific details in the passage",
      "Inference questions",
      "Dense natural science vocabulary",
    ],
    hardTopics: [
      {
        title: "Running out of time",
        text: "One slow passage takes time from the next. We set a pacing rule and practice moving on.",
      },
      {
        title: "Finding details fast",
        text: "Many questions are about one sentence. We practice a light map of the passage so you know where to look.",
      },
      {
        title: "Inference questions",
        text: "Answer choices that sound right but are not supported. We train you to point to the line that proves it.",
      },
    ],
    method: [
      {
        title: "Pick your method",
        text: "Read-first, questions-first or a hybrid. Your tutor tests each with you and keeps the one that scores best on timed passages.",
      },
      {
        title: "Prove every answer",
        text: "For each question you point to the line that supports it. This removes most inference mistakes.",
      },
      {
        title: "Timed passages every week",
        text: "Three-passage sets at full time so the pacing rule becomes a habit.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Try two reading methods on timed passages and compare scores.",
      },
      {
        day: "Days 2–4",
        text: "One timed passage a day with the chosen method.",
      },
      { day: "Day 5", text: "A full three-passage set in 60 minutes." },
      {
        day: "Next session",
        text: "Review every miss by question type and adjust pacing.",
      },
    ],
    coachIds: ["hansuja-chaurasia", "celina-yang", "neil-desai"],
    faqs: [
      {
        question: "How long is DAT reading comprehension?",
        answer:
          "60 minutes for three passages and 50 questions. That is about 20 minutes per passage, including the questions.",
      },
      {
        question: "Should I read the passage first or the questions first?",
        answer:
          "It depends on your reading speed. Try both on timed passages and keep the one that gives you the higher score without running out of time.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-reading-comprehension-study-guide",
    morePosts: ["how-to-study-for-the-dat", "dat-score-guide"],
  },
  {
    slug: "dat-quantitative-reasoning-tutor",
    section: "Quantitative Reasoning",
    metaTitle: "DAT Quantitative Reasoning Tutor | FDP",
    metaDescription:
      "1-on-1 DAT QR and math tutoring from a tutor who scored 28 in QR. 40 questions in 45 minutes: setups, pacing and on-screen calculator habits. From $500.",
    h1: "DAT Quantitative Reasoning Tutor",
    answer:
      "Quantitative Reasoning is 40 math questions in 45 minutes, about 67 seconds each, with a basic on-screen calculator. Most students know the math; they lose points to slow setups, word problems and overusing the calculator. A DAT QR tutor works on those habits so your timed score catches up with what you know.",
    facts: [
      { label: "Questions", value: "40" },
      { label: "Time", value: "45 minutes" },
      { label: "Calculator", value: "Basic, on screen" },
    ],
    covers: [
      "Algebra and equations",
      "Data analysis and interpretation",
      "Quantitative comparison",
      "Probability and statistics",
      "Word problems",
    ],
    hardTopics: [
      {
        title: "Word problems",
        text: "Turning a paragraph into an equation is where time goes. We practice standard setups for the common types.",
      },
      {
        title: "Calculator habits",
        text: "The on-screen calculator is slow. We decide which steps belong on it and which you do in your head.",
      },
      {
        title: "Pacing",
        text: "One hard question can cost three easy ones. We set a skip rule and practice using it.",
      },
    ],
    method: [
      {
        title: "Find the real problem",
        text: "A timed diagnostic shows whether you are missing content, setup speed or pacing. The plan targets that.",
      },
      {
        title: "Setup drills",
        text: "Short sets where you only write the setup, so word problems become fast and routine.",
      },
      {
        title: "Practice like test day",
        text: "Timed sets with an on-screen calculator, not the one on your desk.",
      },
    ],
    sampleWeek: [
      {
        day: "Session (2 hrs)",
        text: "Diagnostic review, then word-problem setups for the weakest type.",
      },
      {
        day: "Days 2–4",
        text: "10 setup-only problems and 10 timed problems a day.",
      },
      {
        day: "Day 5",
        text: "A timed 40-question QR set with an on-screen calculator.",
      },
      {
        day: "Next session",
        text: "Review misses by cause: content, setup or time.",
      },
    ],
    coachIds: ["celina-yang", "neil-desai", "hansuja-chaurasia"],
    faqs: [
      {
        question: "Is there a calculator on DAT quantitative reasoning?",
        answer:
          "Yes, a basic on-screen calculator. It is slower than a handheld one, so practice with an on-screen calculator and use it only for steps that need it.",
      },
      {
        question: "How many questions are in DAT QR?",
        answer:
          "40 questions in 45 minutes, which is about 67 seconds per question.",
      },
      oneSectionFaq,
    ],
    guideSlug: "dat-quantitative-reasoning-study-guide",
    morePosts: ["how-to-study-for-the-dat", "dat-score-guide"],
  },
];

// Blog posts about one DAT section that are not that section's main study guide.
const EXTRA_SECTION_POSTS: Record<string, string> = {
  "dat-organic-chemistry-changes-2026": "dat-organic-chemistry-tutor",
  "dat-pat-tips-and-strategies": "dat-pat-tutor",
};

/** The DAT section tutor page a blog post should point to, if the post is about one section. */
export function getDatSectionForPost(postSlug: string) {
  const extra = EXTRA_SECTION_POSTS[postSlug];
  return datSectionPages.find(
    (page) => page.guideSlug === postSlug || page.slug === extra,
  );
}

export function getDatSectionPage(slug: string) {
  return datSectionPages.find((page) => page.slug === slug);
}
