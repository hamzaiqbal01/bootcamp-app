import Link from "next/link";
import { MoleculeIllustration } from "@/components/landing/home/MoleculeIllustration";
import { ToolIcon, toolTones } from "@/components/tools/ToolIcon";
import { freeTools } from "@/lib/data/tools";

// The free tools pre-dental students search for most. Only tools live here; guides and FAQs have their own pages.
export function ToolsGrid() {
  return (
    <section id="tools" className="relative isolate scroll-mt-24 overflow-hidden bg-[#F6F8FC] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(79,123,255,0.18),transparent)]" />
        <div className="absolute -top-24 -right-20 h-[360px] w-[360px] rounded-full border border-[#1F5BD8]/12" />
        <div className="absolute top-0 right-0 h-[380px] w-[520px] bg-[radial-gradient(#1F5BD8_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]" />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(127,168,255,0.12),transparent)]" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-10 right-8 hidden w-[200px] lg:block xl:w-[235px]">
          <MoleculeIllustration className="animate-cell-float h-auto w-full" />
        </div>
        <div className="mb-12 flex max-w-[720px] flex-col gap-3.5">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            Free tools
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Free tools for pre-dental students
          </h2>
          <p className="text-lg text-[#5B6782]">
            Plan your DAT, check your scores and GPA, and fit your personal statement to the limit. Free, no sign-up.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {freeTools.map((tool) => {
            const tone = toolTones[tool.tone];
            return (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-[#E4E9F2] bg-white p-6 shadow-[0_10px_30px_-24px_rgba(11,27,58,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#C9D8FA] hover:shadow-[0_22px_40px_-24px_rgba(31,91,216,0.4)]"
              >
                <span
                  className="tool-glow pointer-events-none absolute -top-16 -right-16 -z-10 h-44 w-44 rounded-full"
                  style={{ background: `radial-gradient(closest-side, ${tone.glow}, transparent)` }}
                  aria-hidden
                />
                <span className="flex items-start justify-between gap-3">
                  <span
                    className={`svc-tile svc-tile-${tool.tone} flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_14px_-8px_rgba(11,27,58,0.35)] ring-1 ${tone.tile}`}
                  >
                    <ToolIcon slug={tool.slug} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6EE] px-2.5 py-1 text-[11px] font-bold text-[#14804A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                    Free
                  </span>
                </span>
                <b className="mt-5 text-[17px] leading-snug text-[#0B1B3A]">{tool.title}</b>
                <span className="mt-2 mb-5 text-sm leading-relaxed text-[#5B6782]">{tool.summary}</span>
                <span className="mt-auto flex items-center border-t border-[#E9EDF5] pt-4 text-sm font-bold text-[#1F5BD8]">
                  Open tool
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="ml-1.5 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
