export type FaqItem = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export const faqItems: FaqItem[] = [
  {
    question: "Can I get into dental school with a 3.0 GPA?",
    answer:
      "Yes — a 3.0 overall GPA is not an automatic rejection, but you typically need compensating strengths such as a DAT AA of 21–22+, an upward grade trend, strong shadowing, and a realistic school list. See our full GPA guide for ranges and strategy.",
    defaultOpen: true,
  },
  {
    question: "What is a good DAT score for dental school?",
    answer:
      "Competitive applicants often aim for about a 20+ Academic Average, with stronger scores helping at more selective schools. PAT and Total Science also matter. Check our Average DAT Score guide for school-tier ranges.",
  },
  {
    question: "When do dental school applications open?",
    answer:
      "AADSAS typically opens in May, with earliest submissions in early June. Applying early matters because many schools use rolling admissions. See our application timeline for the full month-by-month plan.",
  },
  {
    question: "Does AADSAS Science GPA include math?",
    answer:
      "Usually yes — math and statistics typically count toward Science GPA. They do not count toward the narrower BCP GPA (Biology, Chemistry, Physics, Biochemistry). Our BCP GPA guide explains the difference with examples.",
  },
  {
    question: "How does the admissions consulting process work?",
    answer:
      "We start with a free consultation to understand your background, goals, and timeline. From there, we match you with an expert who creates a personalized plan. You'll work together on every aspect of your application — from school selection to personal statements to interview prep.",
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
