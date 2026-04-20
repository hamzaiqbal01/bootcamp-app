export type FaqItem = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export const faqItems: FaqItem[] = [
  {
    question: "How does the admissions consulting process work?",
    answer:
      "We start with a free consultation to understand your background, goals, and timeline. From there, we match you with an expert who creates a personalized plan. You'll work together on every aspect of your application — from school selection to personal statements to interview prep.",
    defaultOpen: true,
  },
  {
    question: "When should I start working with a consultant?",
    answer:
      "Ideally, start 6-12 months before your application cycle. However, we've helped students on tighter timelines too. The earlier you begin, the more comprehensive our support can be.",
  },
  {
    question: "What makes your tutors different from others?",
    answer:
      "Our tutors are current dental students and practicing dentists from top programs. They've recently gone through the exact process you're navigating, so they offer relevant, first-hand insight that generic tutoring services can't match.",
  },
  {
    question: "Do you guarantee acceptance into dental school?",
    answer:
      "While we can't guarantee admission (no ethical service can), our track record speaks volumes — 97% of our students receive at least one acceptance. We maximize your competitiveness at every stage.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "We offer flexible packages to fit different needs and budgets. Schedule a free consultation and we'll recommend the best plan for your situation — no pressure, no obligation.",
  },
  {
    question: "Can you help international applicants?",
    answer:
      "Absolutely. Several of our experts, including Dr. Takshyn, were international applicants themselves. We understand the unique challenges and requirements international students face.",
  },
];
