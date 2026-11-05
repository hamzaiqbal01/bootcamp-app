"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BlogSummary as Summary } from "@/lib/data/blog-summaries";

type Phase = "closed" | "thinking" | "writing" | "done";

// Characters revealed per 16ms tick while "writing". About 1.5 seconds for a typical summary.
const CHARS_PER_FRAME = 7;
const THINKING_MS = 700;

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 3.5l1.6 4.4a3 3 0 001.8 1.8l4.4 1.6-4.4 1.6a3 3 0 00-1.8 1.8L12 19.1l-1.6-4.4a3 3 0 00-1.8-1.8L4.2 11.3l4.4-1.6a3 3 0 001.8-1.8L12 3.5z"
        fill="currentColor"
      />
      <path d="M19 3v3M17.5 4.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BlogSummary({ summary }: { summary: Summary }) {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);

  // The whole summary as one string, so one counter can "type" it in order.
  const parts = [summary.tldr, ...summary.points];
  const total = parts.reduce((n, p) => n + p.length, 0);

  useEffect(() => {
    if (phase !== "thinking") return;
    const t = window.setTimeout(() => setPhase("writing"), THINKING_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "writing") return;
    // A timer rather than requestAnimationFrame, so the text still finishes if the tab is in the background.
    const timer = window.setInterval(() => {
      setShown((n) => Math.min(total, n + CHARS_PER_FRAME));
    }, 16);
    return () => window.clearInterval(timer);
  }, [phase, total]);

  useEffect(() => {
    if (phase === "writing" && shown >= total) setPhase("done");
  }, [phase, shown, total]);

  function open() {
    if (phase !== "closed") {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShown(reduce ? total : 0);
    setPhase(reduce ? "done" : "thinking");
  }

  async function copy() {
    const text = `${summary.tldr}\n\n${summary.points.map((p) => `• ${p}`).join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; nothing else to do.
    }
  }

  // How much of each part is visible right now.
  let budget = shown;
  const visible = parts.map((p) => {
    const take = Math.max(0, Math.min(p.length, budget));
    budget -= p.length;
    return p.slice(0, take);
  });
  const caretAt = phase === "writing" ? visible.findIndex((v, i) => v.length < parts[i].length) : -1;
  const caret = <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-[#1F5BD8]" aria-hidden />;

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={open}
        aria-expanded={phase !== "closed"}
        aria-controls={panelId}
        className="group relative inline-flex min-h-[46px] cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#0B1B3A_0%,#1F5BD8_100%)] py-2 pr-5 pl-4 text-[14.5px] font-bold text-white shadow-[0_14px_30px_-14px_rgba(31,91,216,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-14px_rgba(31,91,216,0.85)]"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.28)_50%,transparent_80%)] transition duration-700 group-hover:translate-x-full" aria-hidden />
        <SparkIcon className="text-[#BFD3FF]" />
        Summarize this article
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-bold tracking-wide text-white/90">AI</span>
      </button>

      {phase !== "closed" && (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label="Article summary"
          aria-live="polite"
          aria-busy={phase !== "done"}
          className="fdp-summary-in relative mt-5 max-w-[760px] overflow-hidden rounded-[22px] border border-[#E4E9F2] bg-white p-6 shadow-[0_24px_50px_-36px_rgba(11,27,58,0.55)] sm:p-7"
        >
          <div className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-[#1F5BD8]/[0.08] blur-2xl" aria-hidden />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8EFFD] text-[#1F5BD8]">
                <SparkIcon />
              </span>
              <div>
                <p className="text-[15px] font-extrabold text-[#0B1B3A]">Quick summary</p>
                <p className="text-[12.5px] text-[#8A93A3]">
                  {phase === "thinking" ? "Reading the article…" : "30-second version of this guide"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {phase === "done" && (
                <button
                  type="button"
                  onClick={copy}
                  className="cursor-pointer rounded-full px-3 py-1.5 text-[12.5px] font-bold text-[#1F5BD8] transition hover:bg-[#E8EFFD]"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
              <button
                type="button"
                onClick={() => setPhase("closed")}
                aria-label="Close summary"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#8A93A3] transition hover:bg-[#F2F5FB] hover:text-[#0B1B3A]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {phase === "thinking" ? (
            <div className="relative mt-5 space-y-2.5" aria-hidden>
              {[92, 78, 85, 64].map((w, i) => (
                <div key={i} className="fdp-summary-shimmer h-3.5 rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : (
            <div className="relative mt-5">
              <p className="rounded-[14px] bg-[#F4F7FE] px-4 py-3.5 text-[15.5px] leading-relaxed font-semibold text-[#0B1B3A]">
                {visible[0]}
                {caretAt === 0 && caret}
              </p>
              <p className="mt-5 text-[12px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">Key takeaways</p>
              <ul className="mt-3 space-y-2.5">
                {summary.points.map((point, i) =>
                  visible[i + 1] ? (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#33415C]">
                      <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3F6EF] text-[#0F7A5C]" aria-hidden>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>
                        {visible[i + 1]}
                        {caretAt === i + 1 && caret}
                      </span>
                    </li>
                  ) : null,
                )}
              </ul>
              {phase === "done" && (
                <p className="mt-5 border-t border-[#EEF2F8] pt-4 text-[12.5px] text-[#8A93A3]">
                  AI-assisted summary of this article. Read the full guide below for details and sources.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
