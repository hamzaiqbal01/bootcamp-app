import { ReviewsCarousel } from "@/components/landing/ReviewsCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ratingBars, testimonials } from "@/lib/data/reviews";

export function ReviewsSection() {

  return (
    <section
      id="reviews"
      className="relative isolate scroll-mt-24 overflow-hidden bg-slate-50 py-20 sm:py-28"
    >
      <div className="bg-shapes">
        <div className="bg-shape reviews-shape-1" />
        <div className="bg-shape reviews-shape-2" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Student Feedback"
          title="What Our Students Say"
          description="Real feedback from real students. Our results speak for themselves."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              On a scale of 1-10, how would you rate your experience?
            </h3>
            <p className="mt-2 text-sm text-slate-500">39 responses</p>

            <div className="mt-8 flex gap-4">
              <div className="flex flex-col justify-between pb-8 pt-2 text-xs font-medium text-slate-400">
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
              <div className="flex flex-1 items-end justify-between gap-1 border-b border-l border-slate-200 pb-2 pl-2 pt-6">
                {ratingBars.map((bar) => (
                  <div
                    key={bar.label}
                    className="flex flex-1 flex-col items-center gap-2 text-center"
                  >
                    <div className="flex h-44 w-full items-end justify-center">
                      <div
                        className="w-full max-w-10 rounded-t-md bg-linear-to-t from-brand-600 to-indigo-400 transition-all"
                        style={{ height: `${bar.heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
                      {bar.count} ({bar.pct}%)
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-brand-600">
                  9.8<span className="text-lg font-semibold text-slate-400">/10</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Average student rating</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-brand-600">
                  97<span className="text-lg font-semibold text-slate-400">%</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Would recommend to a friend</p>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Student testimonials</h3>
              <p className="mt-1 text-sm text-slate-500">All submitted customer reviews</p>
            </div>
          </div>
        </div>

        <ReviewsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
