import { testimonials } from "@/lib/data/reviews";
import { HomeReviewsCarousel } from "./HomeReviewsCarousel";

const bars = [
  { score: "10", width: "79.5%", count: "31" },
  { score: "9", width: "17.9%", count: "7" },
  { score: "8", width: "2.6%", count: "1" },
];

export function HomeReviews() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#EAF0FC_100%)] py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#1F5BD8]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -bottom-40 h-[460px] w-[460px] rounded-full bg-[#E7A400]/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[520px] flex-col gap-3.5">
            <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
              Student reviews
            </p>
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              What our students say
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <b className="text-5xl leading-none font-extrabold tracking-[-0.03em] text-[#0B1B3A]">9.8</b>
            <p className="text-sm leading-snug text-[#5B6782]">
              <span className="tracking-[2px] text-[#E7A400]">★★★★★</span>
              <br />
              Average rating out of 10
              <br />
              From 39 student surveys
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2" aria-label="Rating distribution">
            {bars.map((bar) => (
              <div key={bar.score} className="grid grid-cols-[20px_minmax(0,1fr)_24px] items-center gap-2 text-xs text-[#5B6782]">
                <span>{bar.score}</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#E4E9F2]">
                  <span className="block h-full rounded-full bg-[#1F5BD8]" style={{ width: bar.width }} />
                </span>
                <span>{bar.count}</span>
              </div>
            ))}
          </div>
        </div>
        <HomeReviewsCarousel reviews={testimonials} />
      </div>
    </section>
  );
}
