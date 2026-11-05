// One landing page per admissions service, rendered by app/services/[slug]/page.tsx.
// Prices and "what's included" come from lib/data/services/packages.ts via `packageIds`, so a price changes in one place.
// Testimonials are pulled by author name from lib/data/reviews.ts; only use reviews already published on the site.

export type ServiceFaq = { question: string; answer: string };

export type ServicePageSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceGuide = {
  heading: string;
  intro: string;
  steps: { title: string; text: string }[];
  checklistTitle: string;
  checklist: string[];
};

export type ServicePage = {
  slug: string;
  /** <title>, under 60 characters including the brand suffix */
  metaTitle: string;
  /** Meta description, about 140–160 characters */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** First 40–60 words under the H1: what it is, who it is for, what it costs. */
  answer: string;
  /** Package ids from lib/data/services/packages.ts, in display order */
  packageIds: string[];
  /** Short facts shown as chips above the packages */
  highlights: string[];
  /** Free, practical help shown right after the intro, before packages */
  guide: ServiceGuide;
  steps: { title: string; text: string }[];
  sections: ServicePageSection[];
  coachIds: string[];
  reviewAuthors: string[];
  faqs: ServiceFaq[];
  relatedPosts: string[];
  relatedLinks?: { label: string; href: string }[];
  /** Short label used in breadcrumbs and "related services" lists */
  shortName: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "personal-statement-editing",
    shortName: "Personal Statement Editing",
    metaTitle: "Dental School Personal Statement Editing | FDP",
    metaDescription:
      "Dental school personal statement editing for your 4,500-character AADSAS personal statement. Express, Gold and Platinum from $167. We edit, never ghostwrite.",
    eyebrow: "Personal statement editing",
    h1: "Dental School Personal Statement Editing",
    answer:
      "Your personal statement is the 4,500-character essay in your AADSAS application where you explain why you want to be a dentist. Below is a free step-by-step guide to writing a strong one, plus a checklist to test your draft. If you want an expert to edit yours, our dental school personal statement editing starts at $167.",
    packageIds: ["ps-express", "ps-gold", "ps-platinum"],
    highlights: [
      "From $167",
      "48-hour Express option",
      "Up to unlimited rounds",
      "We never ghostwrite",
    ],
    guide: {
      heading: "How to write a strong dental school personal statement",
      intro:
        "Admissions readers want to know three things: why dentistry, what you have actually done to test that choice, and what kind of dentist you will be. Follow these steps and you will cover all three.",
      steps: [
        {
          title: "Start with your real reason",
          text: "Pick one or two moments that moved you toward dentistry, such as a patient you met while shadowing or working with your hands. Your own moment is stronger than any general statement about helping people.",
        },
        {
          title: "Show, don't tell",
          text: 'Describe what you did and noticed, and let the reader conclude you are caring or hard-working. "I stayed after closing to explain the procedure to her daughter" says more than "I am compassionate".',
        },
        {
          title: "Connect experiences to dentistry",
          text: "For each experience, say what it taught you that matters in a dental chair: communication, steady hands, patience, trust. This is what turns a list into a story.",
        },
        {
          title: "Use a simple structure",
          text: "An opening moment, two or three paragraphs that each cover one experience and what you learned, and a closing that looks ahead to the dentist you want to become.",
        },
        {
          title: "Edit to 4,500 characters",
          text: "The limit counts spaces. Cut repeated ideas and extra adjectives, read it out loud, and have someone else read it before you submit.",
        },
      ],
      checklistTitle: "Check your draft",
      checklist: [
        "The first paragraph could only have been written by you",
        "It says why dentistry, not just why healthcare",
        "It tells one or two stories instead of listing activities",
        'It avoids clichés like "ever since I was a child"',
        "Someone else has read it",
        "It is under 4,500 characters, spaces included",
      ],
    },
    steps: [
      {
        title: "Send your draft or ideas",
        text: "Share a full draft, a rough outline, or just the experiences you want to write about.",
      },
      {
        title: "Line-by-line review",
        text: "Your specialist reads every sentence, marks red flags and explains what to change and why.",
      },
      {
        title: "Revise together",
        text: "You rewrite in your own voice. Gold includes two rounds; Platinum continues until it is ready.",
      },
      {
        title: "Final polish",
        text: "A last pass for flow, sentence structure and the 4,500-character AADSAS limit.",
      },
    ],
    sections: [
      {
        heading: "What does a dental school personal statement editor do?",
        paragraphs: [
          "A good editor does not rewrite your statement into someone else's voice. They read it the way an admissions committee will: quickly, looking for why you chose dentistry, what you have actually done, and whether you sound like someone who will finish dental school.",
          "We review your statement one sentence at a time, top to bottom. You get specific comments on what to cut, what to expand and what reads as a red flag, plus suggested revisions you can accept, change or ignore. Every word that ends up in the final statement is yours.",
        ],
      },
      {
        heading: "Which personal statement package should I choose?",
        paragraphs: [
          "Pick by how close you are to done. If your statement is finished and you want an expert opinion fast, Express gives you paragraph-by-paragraph feedback and a score out of 10 within 48 hours. If you have a draft that needs real work, Gold includes brainstorming, an outline and two full rounds of critique and editing. If you are starting from scratch or want help until submission day, Platinum includes an initial call, unlimited rounds of editing and a final polish.",
        ],
        bullets: [
          "Express ($167): one written review, 48-hour turnaround, rating out of 10",
          "Gold ($474): outline help plus 2 rounds of critique and editing",
          "Platinum ($797): brainstorming call, unlimited rounds, final polish",
        ],
      },
      {
        heading: "The mistakes we fix most often",
        paragraphs: [
          "Most statements we see are not badly written. They are generic. The most common problems are an opening that could belong to any applicant, a list of activities instead of one or two stories that show who you are, telling the reader you are compassionate instead of showing it, and a closing paragraph that repeats the first. We also check the practical parts: the 4,500-character AADSAS limit (spaces count), tone, and anything an admissions reader could misread.",
        ],
      },
      {
        heading: "When should I get my personal statement edited?",
        paragraphs: [
          "Start before the AADSAS application opens in May so you can submit early in the cycle. Many dental schools review applications on a rolling basis, so a polished statement ready in June is worth more than a perfect one in September. If you are already late, Express is built for a fast second opinion.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain", "celina-yang"],
    reviewAuthors: ["Julia R.", "Monique M.", "Natiri S."],
    faqs: [
      {
        question: "Will you write my personal statement for me?",
        answer:
          "No. We help with ideas, outlines and revisions of a statement you write. Admissions committees expect your own voice, and ghostwriting puts your application at risk.",
      },
      {
        question: "How long is the AADSAS personal statement?",
        answer:
          "The AADSAS personal statement allows up to 4,500 characters, including spaces. Use our free character counter to check your draft before you send it.",
      },
      {
        question: "How fast will I get feedback?",
        answer:
          "Express reviews are returned within 48 hours. Gold and Platinum rounds are scheduled with your specialist; tell us your deadline on the free call and we plan around it.",
      },
      {
        question: "What if I only have ideas and no draft yet?",
        answer:
          "Gold and Platinum both include brainstorming and outlining, so you can start from a list of experiences. Platinum begins with a voice call to build the outline together.",
      },
      {
        question: "Do you edit personal statements for reapplicants?",
        answer:
          "Yes. If you applied before, we look at what your last statement said and help you show what has changed since then.",
      },
    ],
    relatedPosts: [
      "how-to-write-dental-school-personal-statement",
      "dental-school-personal-statement-mistakes",
      "dental-school-personal-statement-examples",
    ],
    relatedLinks: [
      {
        label: "Free personal statement character counter",
        href: "/personal-statement-character-counter",
      },
    ],
  },
  {
    slug: "dental-school-interview-prep",
    shortName: "Interview Prep",
    metaTitle: "Dental School Interview Prep and MMI Coaching | FDP",
    metaDescription:
      "Dental school interview prep with mock MMI, traditional, panel and group interviews, recorded and critiqued 1-on-1. Practice the real formats. $347.",
    eyebrow: "Interview prep",
    h1: "Dental School Interview Prep and MMI Coaching",
    answer:
      "Dental schools interview applicants before making offers, using traditional, panel, group or multiple mini interview (MMI) formats, often on video. Below is a free guide to preparing, plus a checklist for the week before. If you want practice with feedback, our dental school interview prep package is $347.",
    packageIds: ["interview"],
    highlights: [
      "$347",
      "2 hours of mock interviews",
      "MMI, traditional, panel, group",
      "School-specific option",
    ],
    guide: {
      heading: "How to prepare for a dental school interview",
      intro:
        "Good interviews come from preparation, not memorized scripts. These five steps work for every format.",
      steps: [
        {
          title: "Know your format",
          text: "Read the invite carefully: traditional one-on-one, panel, group, MMI stations or virtual. Each one rewards a different kind of practice.",
        },
        {
          title: "Prepare five or six core stories",
          text: "Why dentistry, why this school, a challenge you handled, a time you worked on a team, an ethical choice. Most questions can be answered with one of these stories.",
        },
        {
          title: "Practice out loud, on a timer",
          text: "Say your answers out loud and record yourself. MMI stations are short and timed, so practice getting to your point quickly.",
        },
        {
          title: "Know your own application",
          text: "Interviewers often read your AADSAS application first. Be ready to talk about every experience, gap and grade you listed.",
        },
        {
          title: "Plan the day",
          text: "Prepare two or three questions to ask the school. For virtual interviews, test your camera, light and connection the day before.",
        },
      ],
      checklistTitle: "The week before your interview",
      checklist: [
        "You know the format and schedule of the day",
        "You can explain why this school in specific terms",
        "You have practiced your core stories out loud",
        "You re-read your AADSAS application",
        "You have questions ready to ask",
        "Your outfit and (for virtual) setup are ready",
      ],
    },
    steps: [
      {
        title: "Protocol overview",
        text: "A 30-minute session on how your schools interview and what each format tests.",
      },
      {
        title: "Practice sheet",
        text: "Common dental school questions with sample responses, so you prepare before the mock.",
      },
      {
        title: "Mock interviews",
        text: "Two hours of 1-on-1 video sessions in the formats your schools use.",
      },
      {
        title: "Critique and rework",
        text: "Specific feedback on each answer and help formulating stronger ones.",
      },
    ],
    sections: [
      {
        heading: "How do dental school interviews work?",
        paragraphs: [
          "Dental schools use a few formats, and many applicants meet more than one in the same cycle. A traditional interview is a one-on-one or panel conversation about your application. The multiple mini interview (MMI) is a series of short timed stations, often with ethical scenarios. Some schools add group tasks, and many interviews are now held on video.",
          "Each format rewards a different skill. MMI stations reward structured thinking under a timer; traditional interviews reward clear stories about your experiences. Our coaching starts by matching your practice to the formats your schools actually use.",
        ],
      },
      {
        heading: "What happens in a mock interview session?",
        paragraphs: [
          "Sessions run on video so we can see what an interviewer sees: pace, eye contact, filler words and how you handle a question you did not expect. After each answer we stop, explain what worked and what did not, and help you rebuild the answer. You can spend your two hours on one format or spread them across all of them.",
        ],
        bullets: [
          '"Why dentistry?" and other questions every school asks',
          "Ethical scenarios and MMI-style stations under time",
          "Questions about your own experiences and weak spots",
          "School-specific practice for your top choices",
        ],
      },
      {
        heading: "When should I start interview prep?",
        paragraphs: [
          "Start when you submit your application, not when the invite arrives. Invites can come with only a week or two of notice, and the strongest answers come from practice spread over several sessions. If you already have an invite, book the free call and we will plan your hours around the date.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain"],
    reviewAuthors: ["Shah P."],
    faqs: [
      {
        question: "Do you prepare students for MMI interviews?",
        answer:
          "Yes. We run timed MMI-style stations and debrief each one, alongside traditional, panel and group interview practice.",
      },
      {
        question: "Can I practice for one specific dental school?",
        answer:
          "Yes. The package includes a school-focused option, so sessions can follow the format and question style of the school you are interviewing with.",
      },
      {
        question: "What if two hours is not enough?",
        answer:
          "You can schedule additional interview hours at an hourly rate after the package.",
      },
      {
        question: "Are the sessions online?",
        answer:
          "Yes. Mock interviews are held over video, which also prepares you for schools that interview virtually.",
      },
    ],
    relatedPosts: [
      "how-to-prepare-for-dental-school-interview",
      "dental-school-mmi-interview-guide",
      "why-dentistry-interview-answer",
      "virtual-dental-school-interview",
    ],
  },
  {
    slug: "secondary-essay-help",
    shortName: "Secondary Essay Help",
    metaTitle: "Dental School Secondary Essay Help | FDP",
    metaDescription:
      "Get your dental school secondary essays reviewed before you submit. Three rounds of critique, editing and polish for each school. $267 per school.",
    eyebrow: "Secondary essay help",
    h1: "Dental School Secondary Essay Help",
    answer:
      "After your AADSAS application, many dental schools send their own secondary essays, and how quickly and how well you answer them can affect your interview chances. Below is a free guide to writing them fast, plus a checklist. If you want each school's answers reviewed, our dental school secondary essay help is $267 per school.",
    packageIds: ["secondary"],
    highlights: [
      "$267 per school",
      "3 rounds per school",
      "Prompts for 50+ schools",
      "We never ghostwrite",
    ],
    guide: {
      heading: "How to write dental school secondaries fast and well",
      intro:
        "Secondaries arrive in waves after your primary application is verified. A little preparation lets you return each one in days instead of weeks.",
      steps: [
        {
          title: "Pre-write the common prompts",
          text: '"Why our school", diversity, a challenge and your career goals come up again and again. Draft these before the emails arrive using our list of secondary questions by school.',
        },
        {
          title: "Research each school",
          text: "Note two or three things only that school offers, such as a clinic, curriculum feature or community program, and connect each to your own experience.",
        },
        {
          title: "Answer in the first sentence",
          text: "Start with a direct answer, back it with one real example, and stop. When there is no limit, 250 to 400 words is usually enough.",
        },
        {
          title: "Reuse, but tailor",
          text: "You can adapt a strong draft for several schools, but change the school-specific parts every time. Never leave another school's name in an essay.",
        },
        {
          title: "Track and submit quickly",
          text: "Keep a simple list of schools, prompts, fees and dates. Aim to return each secondary within about two weeks.",
        },
      ],
      checklistTitle: "Before you hit submit",
      checklist: [
        "Each answer responds to the exact question asked",
        "The school's name and details are correct",
        "Every answer is within its word or character limit",
        "You mention something specific to this school",
        "Someone else has proofread it",
        "The secondary fee is paid, if the school charges one",
      ],
    },
    steps: [
      {
        title: "Send your answers",
        text: "Share the school's prompts and your drafts, even rough ones.",
      },
      {
        title: "First critique",
        text: "We comment on each answer and recommend changes for that school.",
      },
      {
        title: "Second round",
        text: "Your revised answers get another critique with editing.",
      },
      { title: "Final polish", text: "A last look before you submit." },
    ],
    sections: [
      {
        heading: "Why secondary essays matter",
        paragraphs: [
          "After your primary AADSAS application, many dental schools send their own secondary application. These answers are written for one school, so they show the admissions committee whether you know the program and fit what it looks for. A strong primary can be undercut by rushed, generic secondaries.",
          "Each school looks for different things. An answer that works for one program may fall flat at another, which is why we review secondaries school by school.",
        ],
      },
      {
        heading: "How fast should I return my secondaries?",
        paragraphs: [
          "Most schools review on a rolling basis, so the sooner a complete application reaches the committee, the more interview spots are still open. Plan to draft each secondary within days of receiving it. Our three-round process is built to fit that pace; tell us your schools on the free call and we schedule around them.",
        ],
      },
      {
        heading: "Find the prompts for your schools",
        paragraphs: [
          "We publish secondary questions for more than 50 dental schools, so you can start drafting before the email arrives. Look up your schools, draft your answers, then send them to us for review.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain", "celina-yang", "hansuja-chaurasia"],
    reviewAuthors: ["Surya P.", "Sahba M."],
    faqs: [
      {
        question: "Will you write my secondary essays?",
        answer:
          "No. We help with ideas, outlines and revisions of answers you write, so every essay stays in your own voice.",
      },
      {
        question: "Can I send only some of the questions?",
        answer:
          "Yes. You can have us review a few questions or a school's full secondary. Pricing is $267 per school.",
      },
      {
        question: "Can I bundle secondaries with other services?",
        answer:
          "Yes. The Complete Application Package includes secondary review for three schools, plus personal statement, experiences, school selection and interview coaching.",
      },
    ],
    relatedPosts: [
      "dental-school-secondary-essays",
      "dental-school-application-timeline",
      "no-dental-school-interview-invite-yet",
    ],
    relatedLinks: [
      {
        label: "Secondary questions for 50+ dental schools",
        href: "/secondaries",
      },
    ],
  },
  {
    slug: "aadsas-application-review",
    shortName: "AADSAS Application Review",
    metaTitle: "AADSAS Application Review for Dental School | FDP",
    metaDescription:
      "AADSAS application review before you submit: a full critique, line-by-line experience edits, or a CV check. Packages from $100 for dental school applicants.",
    eyebrow: "Application review",
    h1: "AADSAS Application Review",
    answer:
      "ADEA AADSAS is the application most U.S. dental schools use: your personal statement, experiences, coursework and letters in one place. Below is a free guide to reviewing your own application before you submit, plus a checklist. If you want an expert to go through it, our AADSAS application review starts at $100.",
    packageIds: ["critique", "experience", "cv-review"],
    highlights: [
      "From $100",
      "Full critique with a rating out of 10",
      "Up to 10 experiences edited",
      "We never ghostwrite",
    ],
    guide: {
      heading: "How to review your AADSAS application before you submit",
      intro:
        "Most weak applications are not missing anything big. They have small problems that add up: vague experiences, inconsistent hours, a statement that repeats the activity list. Go through it in this order.",
      steps: [
        {
          title: "Check that it is complete and consistent",
          text: "Hours, dates and titles should match across your experiences, CV and letters. Inconsistent numbers are an easy red flag for a reader.",
        },
        {
          title: "Make every experience show what you did",
          text: "Start each description with your role and what you actually did, then one line on what you learned. Cut duties anyone in the same job would list.",
        },
        {
          title: "Pick your most meaningful experiences carefully",
          text: "Choose the ones that best show why dentistry and how you work with people. Clinical exposure, service and leadership usually matter most.",
        },
        {
          title: "Answer the extra essays only when they apply",
          text: "Disadvantaged status, educational interruption, reapplicant and manual dexterity essays are short and specific. Answer the question asked, with facts.",
        },
        {
          title: "Read the whole application as one story",
          text: "Your statement, experiences and letters should point the same way. If a reader finished it, could they say in one sentence who you are?",
        },
      ],
      checklistTitle: "Before you submit AADSAS",
      checklist: [
        "Every experience has hours, dates and a clear role",
        "Descriptions say what you did, not just the job title",
        "Your strongest experiences are marked as most meaningful",
        "Extra essays answer only what they ask",
        "Coursework matches your transcripts",
        "Someone else has read the whole application",
      ],
    },
    steps: [
      {
        title: "Pick your review",
        text: "Full critique, experience edits, or a CV check, depending on what you need.",
      },
      {
        title: "Send your materials",
        text: "Share your AADSAS sections, drafts and CV by email.",
      },
      {
        title: "Get detailed feedback",
        text: "Red flags, weak spots and specific suggestions, section by section.",
      },
      {
        title: "Talk it through",
        text: "The full critique ends with a one-hour call to plan your next steps.",
      },
    ],
    sections: [
      {
        heading: "Which AADSAS review should I choose?",
        paragraphs: [
          "Choose by how much help you need and when. The Application Critique is a full read of everything, with a rating and a one-hour call, but no editing. The Experience Review edits your experience descriptions over three rounds. The CV Review is a single written check of a CV you already have.",
        ],
        bullets: [
          "Application Critique ($847): every AADSAS essay, your statement, up to 10 experiences and up to 10 secondary prompts reviewed, rated out of 10, plus a 1-hour call",
          "Experience Review ($297): up to 10 experiences, three rounds of critique and editing",
          "CV / Resume Review ($100): one round of written feedback on your CV",
        ],
      },
      {
        heading: "What we look for",
        paragraphs: [
          "We read your application the way a committee member does: quickly, looking for consistency, real clinical exposure, evidence that you work well with people, and a clear reason for dentistry. We mark anything that reads as a red flag, point out what is missing, and suggest specific changes. You make the edits in your own words.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain", "hansuja-chaurasia"],
    reviewAuthors: ["Sahba M.", "Shah P."],
    faqs: [
      {
        question: "Does the Application Critique include editing?",
        answer:
          "No. The critique is a full review with feedback, a rating out of 10 and a one-hour call. If you want your experiences or statement edited, add the Experience Review or a personal statement package.",
      },
      {
        question: "How many experiences does the Experience Review cover?",
        answer:
          "Up to 10 experiences, with three rounds: a first critique, a second round of critique and editing, and a final polish.",
      },
      {
        question: "Will you write my experience descriptions?",
        answer:
          "No. We help with ideas, structure and revisions of descriptions you write, so the application stays in your own voice.",
      },
      {
        question: "When should I get my application reviewed?",
        answer:
          "Before you submit. AADSAS opens in May, and many dental schools review on a rolling basis, so a reviewed application ready early in the cycle is the goal.",
      },
    ],
    relatedPosts: [
      "dental-school-letters-of-recommendation",
      "dental-shadowing-hours-for-dental-school",
      "how-long-does-aadsas-verification-take",
    ],
    relatedLinks: [
      {
        label: "Free AADSAS GPA calculator",
        href: "/aadsas-gpa-calculator",
      },
    ],
  },
  {
    slug: "dental-school-list",
    shortName: "Dental School List",
    metaTitle: "Dental School List and School Selection Help | FDP",
    metaDescription:
      "Build a dental school list that fits your GPA, DAT and state residency. A 1-on-1 school selection session with our admissions team, $247.",
    eyebrow: "School selection",
    h1: "Dental School List Help",
    answer:
      "There are 66 dental schools in the United States and 10 in Canada, and each looks for different applicants. Below is a free guide to building a realistic dental school list, plus a checklist. If you want an expert to build it with you, our 30-minute school selection session is $247.",
    packageIds: ["school-selection"],
    highlights: [
      "$247",
      "30-minute 1-on-1 session",
      "Pros and cons of each school",
      "List built around your stats",
    ],
    guide: {
      heading: "How to build a dental school list",
      intro:
        "A good list balances where you are likely to get in with where you would love to go, and it is affordable to apply to. Use these steps.",
      steps: [
        {
          title: "Start with your numbers",
          text: "Compare your overall GPA, science GPA and DAT with each school's recent class profile. Schools near or below your numbers are your realistic core.",
        },
        {
          title: "Check residency rules",
          text: "Many public schools take mostly in-state students. Your own state's schools usually belong at the top of the list.",
        },
        {
          title: "Look at mission fit",
          text: "Some schools focus on research, others on community or rural care. Pick schools whose mission matches your experiences.",
        },
        {
          title: "Balance reach, target and likely schools",
          text: "Include a few reaches, but most of your list should be schools where your profile is typical of accepted students.",
        },
        {
          title: "Count the cost",
          text: "Every school adds an AADSAS fee and often a secondary fee, plus interview travel. Make sure you can afford every application on the list.",
        },
      ],
      checklistTitle: "Check your list",
      checklist: [
        "Your in-state schools are on it",
        "Most schools match your GPA and DAT range",
        "You meet each school's prerequisites",
        "You checked out-of-state acceptance rates",
        "Each school fits your goals or experiences",
        "You can afford every application fee",
      ],
    },
    steps: [
      {
        title: "Share your profile",
        text: "GPA, DAT, state of residence, experiences and goals.",
      },
      {
        title: "1-on-1 session",
        text: "A 30-minute video or phone call with our admissions team.",
      },
      {
        title: "School-by-school review",
        text: "We go through the pros and cons of each school you are considering.",
      },
      {
        title: "Your custom list",
        text: "You leave with a school list built around your profile.",
      },
    ],
    sections: [
      {
        heading: "How many dental schools should I apply to?",
        paragraphs: [
          "There is no single right number. It depends on your GPA, DAT, residency and budget. Applicants with numbers close to the average for their schools can apply to fewer; applicants with weaker numbers or few in-state options usually need a wider list. We help you find the number that balances your chances with what you can afford.",
        ],
      },
      {
        heading: "What happens in the school selection session",
        paragraphs: [
          "Before the call you share your stats and the schools you are considering. In the 30-minute session our admissions team explains which schools are a good fit and which are not, the pros and cons of each, and puts together a list that makes sense for you.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain", "hansuja-chaurasia"],
    reviewAuthors: ["Emily P.", "Roger M."],
    faqs: [
      {
        question: "How long is the school selection session?",
        answer:
          "30 minutes, by video or phone, with a member of our admissions team.",
      },
      {
        question: "What should I bring to the session?",
        answer:
          "Your GPA (overall and science), DAT scores or target, state of residence, main experiences, and any schools you are already considering.",
      },
      {
        question: "Can you help if I have a low GPA or DAT?",
        answer:
          "Yes. A careful school list matters most for applicants below the average. We focus on schools where your profile has a realistic chance.",
      },
      {
        question: "Is school selection included in a bigger package?",
        answer:
          "Yes. The Complete Application Package includes school selection along with personal statement, secondaries, experiences and interview coaching.",
      },
    ],
    relatedPosts: [
      "dental-school-acceptance-rates",
      "dental-school-gpa-requirements",
      "dat-score-guide",
    ],
    relatedLinks: [
      {
        label: "Free DAT score calculator",
        href: "/dat-score-calculator",
      },
    ],
  },
  {
    slug: "complete-application-package",
    shortName: "Complete Application Package",
    metaTitle: "Complete Dental School Application Package | FDP",
    metaDescription:
      "One package for the whole cycle: personal statement, 3 secondaries, experiences, school list and interview coaching, plus advising. $2,397.",
    eyebrow: "Complete package",
    h1: "Complete Dental School Application Package",
    answer:
      "A dental school application cycle runs from writing your statement in spring to interviews in the fall and winter. Below is a free month-by-month plan for the whole cycle, plus a checklist. If you want one team with you from start to finish, our complete dental school application package is $2,397.",
    packageIds: ["complete"],
    highlights: [
      "$2,397",
      "Statement, 3 secondaries, experiences",
      "School list and interview coaching",
      "Advising all cycle",
    ],
    guide: {
      heading: "Your dental school application cycle, step by step",
      intro:
        "Most of the work happens in a few busy months. Knowing the order makes it manageable.",
      steps: [
        {
          title: "Winter to spring: prepare",
          text: "Take or plan your DAT, ask for letters of recommendation, collect your experiences and hours, and start your personal statement.",
        },
        {
          title: "May: AADSAS opens",
          text: "Finish your statement and experiences, enter your coursework, and build your school list before you submit.",
        },
        {
          title: "June: submit early",
          text: "Submit as early as you can. Many schools review on a rolling basis, and AADSAS verification can take up to 10 business days after your application is complete.",
        },
        {
          title: "Summer: secondaries",
          text: "Secondaries arrive after verification. Pre-write the common prompts and aim to return each one within about two weeks.",
        },
        {
          title: "Fall and winter: interviews and decisions",
          text: "Prepare for traditional and MMI interviews. Acceptances can start in December, and some schools keep making offers into spring.",
        },
      ],
      checklistTitle: "Make sure you have",
      checklist: [
        "A DAT date or score that fits the cycle",
        "Letters of recommendation requested early",
        "A personal statement someone else has read",
        "Experiences with hours and clear descriptions",
        "A school list that fits your profile and budget",
        "A plan for secondaries and interview practice",
      ],
    },
    steps: [
      {
        title: "Plan the cycle",
        text: "We map your timeline and build your school list.",
      },
      {
        title: "Build the application",
        text: "Personal statement (Platinum) and experience review before you submit.",
      },
      {
        title: "Secondaries",
        text: "Three schools' secondaries reviewed in three rounds each.",
      },
      {
        title: "Interviews",
        text: "Mock interviews with feedback, plus advising until decisions.",
      },
    ],
    sections: [
      {
        heading: "What is included",
        paragraphs: [
          "The package brings our main admissions services together with one team that knows your application from start to finish.",
        ],
        bullets: [
          "Personal Statement Platinum: brainstorming call, unlimited rounds, final polish",
          "School secondary service for 3 schools",
          "Experience Review: up to 10 experiences, three rounds",
          "School Selection: a 1-on-1 session and a custom school list",
          "Interview Coaching: 2 hours of mock interviews with critique",
          "Admissions advising throughout your application cycle",
        ],
      },
      {
        heading: "Is the complete package worth it?",
        paragraphs: [
          "Bought separately, these services come to $2,489. The package is $2,397 and adds advising throughout the cycle. It suits applicants who want help with every part of the application; if you only need one piece, a single service is the better choice.",
        ],
      },
    ],
    coachIds: ["dr-todd-chastain", "celina-yang"],
    reviewAuthors: ["Jason L.", "Ali T."],
    faqs: [
      {
        question: "What does the complete package include?",
        answer:
          "Personal Statement Platinum, secondaries for 3 schools, Experience Review, School Selection, Interview Coaching, and admissions advising through the cycle.",
      },
      {
        question: "What if I apply to more than 3 schools?",
        answer:
          "Tell us how many schools you are applying to on the free call and we will plan secondary help for the rest of your list.",
      },
      {
        question: "When should I start the package?",
        answer:
          "Ideally in the winter or spring before AADSAS opens in May, so your statement and experiences are ready to submit early.",
      },
      {
        question: "Do you write any part of the application for me?",
        answer:
          "No. We help with ideas, structure, editing and practice, but every essay stays in your own words.",
      },
    ],
    relatedPosts: [
      "how-to-get-into-dental-school",
      "dental-school-application-timeline-fall-2028",
      "dental-school-application-timeline-fall-2027",
    ],
    relatedLinks: [
      {
        label: "Free DAT study plan generator",
        href: "/dat-study-plan-generator",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

const CATEGORY_SERVICE: Record<string, string> = {
  "Personal Statement": "personal-statement-editing",
  "Interview Prep": "dental-school-interview-prep",
};

/** The service page a blog post should point readers to, if any. */
export function getServiceForPost(slug: string, category: string) {
  return (
    servicePages.find((page) => page.relatedPosts.includes(slug)) ??
    (CATEGORY_SERVICE[category]
      ? getServicePage(CATEGORY_SERVICE[category])
      : undefined)
  );
}
