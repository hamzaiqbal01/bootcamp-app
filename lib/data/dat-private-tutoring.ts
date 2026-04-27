export type TutoringPackage = {
  hours: number;
  title: string;
  priceWas: number;
  priceNow: number;
  save: number;
  blurb: string;
  cta: string;
  popular?: boolean;
};

export const privateDatTutoringPackages: TutoringPackage[] = [
  {
    hours: 10,
    title: "10 Hours of Tutoring",
    priceWas: 2199,
    priceNow: 1999,
    save: 200,
    blurb: "Great for students who want to try out tutoring or need help in one subject.",
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
  "Tutors With 99th Percentile Scores",
  "Review of Your Study Schedule",
] as const;

function includedFor(hours: number) {
  return included.map((line) =>
    line.replace(/^\d+ Hours/, `${hours} Hours`),
  );
}

export function getPackageWhatsIncluded(hours: number) {
  return includedFor(hours);
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
      "We will get in contact with you and match you with an expert educator. The expert educator will call you within the following day. The purpose of the first phone call with your expert educator is to get comfortable with your personality and situation, introduce you to the technology we use for our tutoring sessions, and set expectations. Your expert educator will ask you questions about your background and your DAT prep, then begin assembling a study schedule that will be shared with you during your first tutoring session. Each tutoring session lasts 2 hours. Most students meet with their tutor once a week at a time that works for both you and the tutor.",
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
