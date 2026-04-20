import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  {
    num: "01",
    title: "DAT Preparation",
    body: "Comprehensive DAT tutoring covering all sections — biology, chemistry, organic chemistry, PAT, reading comprehension, and quantitative reasoning.",
    features: ["Customized study plans", "Practice exams & analytics", "Score improvement guarantee"],
  },
  {
    num: "02",
    title: "Science Coursework",
    body: "Struggling with pre-req courses? Our tutors help with biology, chemistry, biochemistry, anatomy, and more.",
    features: ["Weekly 1-on-1 sessions", "Exam-focused strategies", "Concept mastery approach"],
  },
  {
    num: "03",
    title: "Post-Bacc Guidance",
    body: "Planning a post-baccalaureate path? We help you choose the right program and excel academically.",
    features: ["Program selection support", "Academic planning", "GPA enhancement strategies"],
  },
];

export function TutoringSection() {
  return (
    <section id="tutoring" className="scroll-mt-24 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academic Support"
          title="Tutoring Services"
          description="Personalized academic tutoring from top dental students and professionals who've been in your shoes."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.num}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
            >
              <div className="text-sm font-bold text-brand-600">{c.num}</div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.body}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {c.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
