export type TutoringPackage = {
  hours: number;
  title: string;
  priceWas: number;
  priceNow: number;
  save: number;
  blurb: string;
  cta: string;
  popular?: boolean;
  badge?: string;
  sessions?: number;
  extras?: string[];
};

export const privateDatTutoringPackages: TutoringPackage[] = [
  {
    hours: 4,
    title: "4-Hour Starter",
    priceWas: 599,
    priceNow: 500,
    save: 99,
    blurb:
      "Three sessions over about two weeks — try tutoring or lock in one weak section, with study resources included.",
    cta: "Get the 4-Hour Starter",
    badge: "Starter",
    sessions: 3,
    extras: [
      "3 live sessions (4 hours total)",
      "DAT study resources and practice drills",
      "Section-focus plan for your weakest area",
    ],
  },
  {
    hours: 10,
    title: "10 Hours of Tutoring",
    priceWas: 2199,
    priceNow: 1999,
    save: 200,
    blurb: "Great for students who need focused help in one subject after they’ve already started prep.",
    cta: "Get 10 Hours of Tutoring",
  },
  {
    hours: 16,
    title: "16 Hours of Tutoring",
    priceWas: 3399,
    priceNow: 2999,
    save: 400,
    blurb: "Great for students of all types seeking comprehensive tutoring.",
    cta: "Get 16 Hours of Tutoring",
    popular: true,
  },
  {
    hours: 20,
    title: "20 Hours of Tutoring",
    priceWas: 4299,
    priceNow: 3699,
    save: 600,
    blurb: "Great for students who want intensive, targeted help across multiple subjects.",
    cta: "Get 20 Hours of Tutoring",
  },
];

const included = [
  "10 Hours of Private Tutoring",
  "Personalized Study Sessions",
  "Review of Your Study Schedule",
] as const;

function includedFor(hours: number, extras: string[] = []) {
  const base = included.map((line) =>
    line.replace(/^\d+ Hours/, `${hours} Hours`),
  );
  const withoutDupHours = extras.some((extra) => /hours|sessions/i.test(extra))
    ? base.filter((line) => !/^\d+ Hours of Private Tutoring$/.test(line))
    : base;
  return [...withoutDupHours, ...extras];
}

export function getPackageWhatsIncluded(pkg: TutoringPackage | number) {
  if (typeof pkg === "number") {
    return includedFor(pkg);
  }
  return includedFor(pkg.hours, pkg.extras);
}

export const privateDatTutoringFaq = [
  {
    question: "How can dedicated attention from a private tutor help me?",
    answer:
      "Over time, we have found that most students who spend money on having a private tutor do so for one reason: structure. Students who acquire a tutor want a planned out study schedule. They crave structure and the feeling of productivity, but may lack the confidence, ability or knowledge to create a sufficient schedule for themselves. A private tutor will give you personalized attention to optimize your study time and structure.",
  },
  {
    question: "What happens after I sign up for tutoring?",
    answer:
      "We will get in contact with you and match you with an expert educator. The expert educator will call you within the following day. The purpose of the first phone call with your expert educator is to get comfortable with your personality and situation, introduce you to the technology we use for our tutoring sessions, and set expectations. Your expert educator will ask you questions about your background and your DAT prep, then begin assembling a study schedule that will be shared with you during your first tutoring session. Standard packages use 2-hour sessions, usually once a week. The 4-hour starter is three shorter sessions (4 hours total) over about two weeks, plus study resources.",
  },
  {
    question: "What if I realize tutoring isn't right for me?",
    answer:
      "If you realize tutoring isn't for you within the first paid session, we can either match you with a new tutor or refund you the remaining hours of your tutoring package. We will always be here to help!",
  },
  {
    question: "Does tutoring come with a score guarantee?",
    answer:
      "Even with a private tutor, it is important to know that the bulk of your progress will come from consistent, daily effort. For this reason, our expert educators put their best efforts into building you a productive study schedule. While we do not offer a “score guarantee” to students, we know that studying the right material for the right amount of time will lead to improved DAT scores.",
  },
];
