"use client";

import { useEffect, useMemo, useState } from "react";
import { readSaved, useHydrated, writeSaved } from "@/components/tools/storage";

// ADEA AADSAS personal statement limit, counted with spaces.
const LIMIT = 4500;
const STORAGE_KEY = "fdp-ps-counter";

// The server renders an empty counter; once in the browser it remounts with the last saved draft.
export function CharacterCounter() {
  const hydrated = useHydrated();
  return <Counter key={hydrated ? "browser" : "server"} hydrated={hydrated} />;
}

function Counter({ hydrated }: { hydrated: boolean }) {
  const [text, setText] = useState(() => (hydrated ? (readSaved<string>(STORAGE_KEY) ?? "") : ""));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (hydrated) writeSaved(STORAGE_KEY, text || null);
  }, [text, hydrated]);

  const stats = useMemo(() => {
    const characters = Array.from(text).length;
    const noSpaces = Array.from(text.replace(/\s/g, "")).length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
    const minutes = words ? Math.max(1, Math.round(words / 230)) : 0;
    return { characters, noSpaces, words, paragraphs, minutes };
  }, [text]);

  const remaining = LIMIT - stats.characters;
  const pct = Math.min(100, (stats.characters / LIMIT) * 100);
  const state = remaining < 0 ? "over" : stats.characters >= LIMIT * 0.9 ? "close" : "ok";
  const bar = state === "over" ? "bg-[#E25C4B]" : state === "close" ? "bg-[#F5A524]" : "bg-[#16A34A]";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_24px_50px_-36px_rgba(11,27,58,0.45)] sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="ps-text" className="text-lg font-bold text-[#0B1B3A]">
            Your personal statement
          </label>
          <span className="text-xs font-semibold text-[#5B6782]">Stays in this browser. Nothing is uploaded.</span>
        </div>
        <textarea
          id="ps-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your personal statement here…"
          rows={16}
          className="mt-4 min-h-[360px] w-full resize-y rounded-xl border border-[#D5DDEA] bg-[#FBFCFE] p-4 text-[15px] leading-relaxed text-[#0B1B3A] placeholder:text-[#9AA6BD] focus:border-[#1F5BD8] focus:bg-white focus:ring-3 focus:ring-[#1F5BD8]/15 focus:outline-none"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            disabled={!text}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-[#1F5BD8] px-5 text-sm font-bold text-white hover:bg-[#1747AC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copied" : "Copy text"}
          </button>
          <button
            type="button"
            onClick={() => setText("")}
            disabled={!text}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-[#D5DDEA] bg-white px-5 text-sm font-bold text-[#0B1B3A] hover:border-[#0B1B3A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-2xl bg-[#0B1B3A] p-6 text-white shadow-[0_24px_50px_-30px_rgba(11,27,58,0.7)]">
          <p className="text-xs font-bold tracking-[0.08em] text-[#9DB9F5] uppercase">Characters with spaces</p>
          <p className="mt-1 text-5xl font-extrabold tracking-[-0.03em]">
            {stats.characters.toLocaleString()}
            <span className="text-xl font-bold text-[#9DB9F5]"> / {LIMIT.toLocaleString()}</span>
          </p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div className={`h-full rounded-full transition-[width] ${bar}`} style={{ width: `${pct}%` }} />
          </div>
          <p
            className={`mt-3 text-sm font-semibold ${
              state === "over" ? "text-[#FFB4A8]" : state === "close" ? "text-[#FFD48A]" : "text-[#A7F0C2]"
            }`}
          >
            {remaining >= 0
              ? `${remaining.toLocaleString()} characters left`
              : `${Math.abs(remaining).toLocaleString()} characters over the limit`}
          </p>
        </div>
        <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5">
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["Words", stats.words],
              ["Without spaces", stats.noSpaces],
              ["Paragraphs", stats.paragraphs],
              ["Reading time", stats.minutes ? `${stats.minutes} min` : "—"],
            ].map(([label, value]) => (
              <div key={label as string}>
                <dt className="text-xs font-semibold text-[#5B6782]">{label}</dt>
                <dd className="text-xl font-extrabold text-[#0B1B3A]">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
