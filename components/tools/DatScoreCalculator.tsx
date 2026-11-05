"use client";

import { useEffect, useMemo, useState } from "react";
import { readSaved, useHydrated, writeSaved } from "@/components/tools/storage";

type Scale = "new" | "old";
type SectionKey = "bio" | "gc" | "oc" | "pat" | "rc" | "qr";

const SECTIONS: { key: SectionKey; label: string; short: string }[] = [
  { key: "bio", label: "Biology", short: "BIO" },
  { key: "gc", label: "General Chemistry", short: "GC" },
  { key: "oc", label: "Organic Chemistry", short: "OC" },
  { key: "pat", label: "Perceptual Ability", short: "PAT" },
  { key: "rc", label: "Reading Comprehension", short: "RC" },
  { key: "qr", label: "Quantitative Reasoning", short: "QR" },
];

const AA_KEYS: SectionKey[] = ["bio", "gc", "oc", "rc", "qr"];
const TS_KEYS: SectionKey[] = ["bio", "gc", "oc"];

const RANGE: Record<Scale, { min: number; max: number; step: number; placeholder: string }> = {
  new: { min: 200, max: 600, step: 10, placeholder: "e.g. 420" },
  old: { min: 1, max: 30, step: 1, placeholder: "e.g. 20" },
};

// Approximate Academic Average concordance (old 1–30 to new 200–600), from our DAT scoring scale guide.
const CONCORDANCE: [number, number][] = [
  [15, 330],
  [16, 350],
  [17, 370],
  [18, 390],
  [19, 410],
  [20, 420],
  [21, 440],
  [22, 460],
  [23, 470],
  [24, 490],
  [25, 510],
];

function interpolate(value: number, from: 0 | 1): number | null {
  const to = from === 0 ? 1 : 0;
  const rows = CONCORDANCE;
  if (value < rows[0][from] || value > rows[rows.length - 1][from]) return null;
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i];
    const b = rows[i + 1];
    if (value >= a[from] && value <= b[from]) {
      const t = (value - a[from]) / (b[from] - a[from]);
      return a[to] + t * (b[to] - a[to]);
    }
  }
  return null;
}

// How applicants usually read a new-scale AA, from the same guide. Approximate, not an official cutoff.
function band(newScaleAa: number) {
  if (newScaleAa >= 460) return { label: "Highly competitive", tone: "bg-[#E8F6EE] text-[#14804A]" };
  if (newScaleAa >= 420) return { label: "Competitive target", tone: "bg-[#E8F6EE] text-[#14804A]" };
  if (newScaleAa >= 390) return { label: "Viable at many programs", tone: "bg-[#EEF3FE] text-[#1F5BD8]" };
  if (newScaleAa >= 370) return { label: "Near average", tone: "bg-[#FFF4E5] text-[#B45309]" };
  return { label: "Below average", tone: "bg-[#FDECEC] text-[#B42318]" };
}

const STORAGE_KEY = "fdp-dat-score-calculator";
const empty: Record<SectionKey, string> = { bio: "", gc: "", oc: "", pat: "", rc: "", qr: "" };

type Saved = { scale?: Scale; scores?: Partial<Record<SectionKey, string>> };

// The server renders an empty calculator; once in the browser it remounts with the last saved scores.
export function DatScoreCalculator() {
  const hydrated = useHydrated();
  return <Calculator key={hydrated ? "browser" : "server"} hydrated={hydrated} />;
}

function Calculator({ hydrated }: { hydrated: boolean }) {
  const [saved] = useState(() => (hydrated ? readSaved<Saved>(STORAGE_KEY) : null));
  const [scale, setScale] = useState<Scale>(saved?.scale === "old" ? "old" : "new");
  const [scores, setScores] = useState<Record<SectionKey, string>>({ ...empty, ...saved?.scores });

  useEffect(() => {
    if (hydrated) writeSaved(STORAGE_KEY, { scale, scores });
  }, [scale, scores, hydrated]);

  const range = RANGE[scale];

  const result = useMemo(() => {
    const values: Partial<Record<SectionKey, number>> = {};
    const invalid: SectionKey[] = [];
    for (const { key } of SECTIONS) {
      if (scores[key] === "") continue;
      const n = Number(scores[key]);
      if (Number.isFinite(n) && n >= range.min && n <= range.max) values[key] = n;
      else invalid.push(key);
    }
    const average = (keys: SectionKey[]) =>
      keys.every((k) => values[k] != null) ? keys.reduce((sum, k) => sum + (values[k] as number), 0) / keys.length : null;
    const round = (n: number | null) => (n == null ? null : scale === "new" ? Math.round(n / 10) * 10 : Math.round(n));
    const aaRaw = average(AA_KEYS);
    const aa = round(aaRaw);
    const ts = round(average(TS_KEYS));
    const pat = values.pat ?? null;
    let other: number | null = null;
    let newScaleAa: number | null = null;
    if (aa != null) {
      if (scale === "new") {
        newScaleAa = aa;
        const old = interpolate(aa, 1);
        other = old == null ? null : Math.round(old);
      } else {
        const converted = interpolate(aa, 0);
        other = converted == null ? null : Math.round(converted / 10) * 10;
        // Off the chart either way still maps to the top or bottom band.
        newScaleAa = converted ?? (aa > 25 ? 600 : 200);
      }
    }
    const filled = AA_KEYS.filter((k) => values[k] != null).length;
    return { aa, aaRaw, ts, pat, other, newScaleAa, invalid, filled };
  }, [scores, scale, range]);

  const changeScale = (next: Scale) => {
    if (next === scale) return;
    setScale(next);
    setScores(empty);
  };

  const otherLabel = scale === "new" ? "Old scale (1–30)" : "New scale (200–600)";
  const status = result.newScaleAa == null ? null : band(result.newScaleAa);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_24px_50px_-36px_rgba(11,27,58,0.45)] sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#0B1B3A]">Your section scores</h2>
          <div className="flex rounded-xl border border-[#E4E9F2] bg-[#F6F8FC] p-1" role="radiogroup" aria-label="Score scale">
            {(
              [
                ["new", "200–600"],
                ["old", "1–30"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={scale === value}
                onClick={() => changeScale(value)}
                className={`min-h-9 cursor-pointer rounded-lg px-3.5 text-sm font-bold ${
                  scale === value ? "bg-white text-[#0B1B3A] shadow-sm" : "text-[#5B6782] hover:text-[#0B1B3A]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-[#5B6782]">
          {scale === "new"
            ? "Exams taken on or after March 1, 2025 are scored 200–600 in 10-point steps."
            : "Exams taken before March 1, 2025 were scored 1–30."}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((section) => {
            const invalid = result.invalid.includes(section.key);
            return (
              <label key={section.key} className="flex flex-col gap-1.5">
                <span className="flex items-center justify-between text-sm font-semibold text-[#33415C]">
                  {section.label}
                  <span className="text-xs font-bold text-[#9AA6BD]">{section.short}</span>
                </span>
                <input
                  value={scores[section.key]}
                  onChange={(e) => setScores((s) => ({ ...s, [section.key]: e.target.value }))}
                  type="number"
                  inputMode="numeric"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  placeholder={range.placeholder}
                  aria-invalid={invalid}
                  className={`h-12 w-full rounded-[10px] border bg-white px-3.5 text-base font-semibold text-[#0B1B3A] placeholder:font-normal placeholder:text-[#9AA6BD] focus:ring-3 focus:outline-none ${
                    invalid
                      ? "border-[#E25C4B] focus:border-[#E25C4B] focus:ring-[#E25C4B]/15"
                      : "border-[#D5DDEA] focus:border-[#1F5BD8] focus:ring-[#1F5BD8]/15"
                  }`}
                />
                {invalid ? (
                  <span className="text-xs font-semibold text-[#B42318]">
                    Enter a score from {range.min} to {range.max}.
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setScores(empty)}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-[#D5DDEA] bg-white px-5 text-sm font-bold text-[#0B1B3A] hover:border-[#0B1B3A]"
          >
            Clear scores
          </button>
          <p className="text-xs text-[#5B6782]">PAT is reported on its own and is not part of the Academic Average.</p>
        </div>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-2xl bg-[#0B1B3A] p-6 text-white shadow-[0_24px_50px_-30px_rgba(11,27,58,0.7)]">
          <p className="text-xs font-bold tracking-[0.08em] text-[#9DB9F5] uppercase">Academic Average (AA)</p>
          <p className="mt-1 text-5xl font-extrabold tracking-[-0.03em]">{result.aa ?? "—"}</p>
          {status ? (
            <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${status.tone}`}>{status.label}</span>
          ) : (
            <p className="mt-3 text-sm text-[#C9D4EA]">
              Enter BIO, GC, OC, RC, and QR ({result.filled}/5 so far).
            </p>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs text-[#9DB9F5]">Total Science (TS)</p>
              <p className="text-2xl font-extrabold">{result.ts ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[#9DB9F5]">PAT</p>
              <p className="text-2xl font-extrabold">{result.pat ?? "—"}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5">
          <p className="text-xs font-bold tracking-[0.08em] text-[#5B6782] uppercase">AA on the {scale === "new" ? "old" : "new"} scale</p>
          <p className="mt-2 text-3xl font-extrabold text-[#0B1B3A]">
            {result.aa == null ? "—" : result.other ?? "Outside chart"}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#5B6782]">
            {otherLabel}, approximate. Concordance is section-specific, so confirm against the official ADA tables.
          </p>
          {result.aaRaw != null ? (
            <p className="mt-3 border-t border-[#EEF1F7] pt-3 text-xs text-[#5B6782]">
              Unrounded average: <b className="text-[#0B1B3A]">{result.aaRaw.toFixed(1)}</b>
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
