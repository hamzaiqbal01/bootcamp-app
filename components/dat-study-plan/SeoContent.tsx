import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqs = [
  {
    q: "Is the DAT study plan generator free?",
    a: "Yes. You can build and view the plan without payment. An email is sent only if you ask for it.",
  },
  {
    q: "How long should I study for the DAT?",
    a: "Many students use about 8 to 16 weeks, but the useful length depends on your start point, test date, and weekly hours. A shorter timeline needs a narrower plan.",
  },
  {
    q: "How many hours per week should I study?",
    a: "It depends on your baseline, exam date, and other commitments. The generator uses the weekday and weekend hours you say you can keep.",
  },
  {
    q: "Can I use this plan with DAT Bootcamp?",
    a: "Yes. If you already use DAT Bootcamp, the plan tells you where to spend that time. It does not replace the question bank.",
  },
  {
    q: "Can I use this with DAT Booster?",
    a: "Yes. The same is true for DAT Booster, Kaplan, a course, or your own notes. The schedule wraps around the resources you already have.",
  },
  {
    q: "What if I haven't taken a diagnostic yet?",
    a: "You can answer with confidence levels instead of scores. A diagnostic later will make the next version of the plan more specific.",
  },
  {
    q: "Can I change my study plan later?",
    a: "Yes. Generate it again when your test date, scores, or weekly hours change. Treat each week’s checkpoint as a reason to rebalance.",
  },
  {
    q: "When should I consider a private DAT tutor?",
    a: "A tutor is worth considering when a section stays weak after structured practice, your test date is close, or you want someone to review the plan against your error log.",
  },
];

export function studyPlanFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

const guides = [
  ["/blog/how-to-study-for-the-dat", "How to study for the DAT"],
  ["/blog/dat-scoring-scale-200-600", "DAT scoring scale"],
  ["/blog/dat-biology-study-guide", "Biology study guide"],
  ["/blog/dat-general-chemistry-study-guide", "General Chemistry study guide"],
  ["/blog/dat-organic-chemistry-study-guide", "Organic Chemistry study guide"],
  ["/blog/dat-perceptual-ability-practice-guide", "Perceptual Ability practice"],
  ["/blog/dat-pat-tips-and-strategies", "PAT tips"],
  ["/blog/dat-reading-comprehension-study-guide", "Reading Comprehension guide"],
  ["/blog/dat-quantitative-reasoning-study-guide", "Quantitative Reasoning guide"],
  ["/private-dat-tutoring", "Private DAT tutoring"],
];

export function SeoContent() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <SectionHeader
          badge="DAT prep"
          title="How the DAT Study Plan Generator Works"
          description="You answer a few questions about your test date, scores or confidence, and the hours you can actually study. The plan turns those answers into phases, weekly priorities, and a sample day."
        />
        <div className="space-y-10 text-base leading-relaxed text-stone-700">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">How many weeks should you study for the DAT?</h2>
            <p className="mt-3">
              Students with a longer runway can spend the early weeks on content. Students testing soon should spend
              more of the remaining time on timed questions and full-length practice. The generator shortens the
              content phase when the date is close.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">How many hours per week should you study?</h2>
            <p className="mt-3">
              A full-time student and someone working full-time should not be handed the same calendar. The suggested
              load is calculated from the weekday hours, weekend hours, and days you select.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Why your DAT study plan should be personalized</h2>
            <p className="mt-3">
              A generic eight-week PDF cannot tell Organic Chemistry from a section you already know. Your plan puts
              more time on the sections you scored lower, marked as weak, or named as a challenge, and it still keeps
              review time for the others.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-stone-900">Keep reading</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {guides.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="font-medium text-brand-700 underline-offset-2 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-stone-900">Frequently asked questions</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="rounded-2xl border border-stone-200 px-5 py-4">
                  <summary className="cursor-pointer font-semibold text-stone-900">{faq.q}</summary>
                  <p className="mt-2 text-stone-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
