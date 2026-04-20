import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Common Questions"
          title="FAQ"
          description="Everything you need to know about our services and process."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 open:bg-white open:shadow-md"
              open={item.defaultOpen}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="border-t border-slate-100 px-6 pb-5 pt-0 text-sm leading-relaxed text-slate-600">
                <p className="pt-4">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
