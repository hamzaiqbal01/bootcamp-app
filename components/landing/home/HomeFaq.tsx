import Link from "next/link";
import { faqItems } from "@/lib/data/faq";

export function HomeFaq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FD_55%,#EDF2FC_100%)] pt-8 pb-20 sm:pt-10 sm:pb-24"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.07] blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[820px] px-4 sm:px-6">
        <div className="mb-10 flex flex-col items-center gap-3.5 text-center">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">FAQ</p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Frequently asked questions
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              open={item.defaultOpen}
              className="group rounded-2xl border border-[#E4E9F2] bg-white/90 shadow-[0_12px_30px_-26px_rgba(11,27,58,0.45)] backdrop-blur transition-colors open:border-[#C9D8F6] open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#0B1B3A] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1F5BD8] group-open:text-white">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-5 pr-16 text-[15px] leading-relaxed text-[#5B6782]">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E4E9F2] bg-white/90 px-6 py-5 text-center shadow-[0_12px_30px_-26px_rgba(11,27,58,0.45)] backdrop-blur sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-[#0B1B3A]">Still have a question?</p>
            <p className="mt-0.5 text-[14px] text-[#5B6782]">Send us a message, or talk it through on a free 15-minute call.</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-2.5">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#D5DDEA] bg-white px-5 text-[14px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
            >
              Contact us
            </Link>
            <Link
              href="/schedule"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#1F5BD8] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#1747AC]"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
