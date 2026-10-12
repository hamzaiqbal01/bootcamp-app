"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reviewing your DAT timeline...",
  "Identifying your priority sections...",
  "Balancing your weekly study time...",
  "Building your personalized roadmap...",
];

export function StudyPlanGenerating({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timers = [1, 2, 3].map((step) => window.setTimeout(() => setIndex(step), 700 * step));
    const done = window.setTimeout(() => onDone(), 2800);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center" role="status" aria-live="polite">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-brand-600" />
      <p className="mt-6 text-lg font-medium text-stone-900">{MESSAGES[index]}</p>
    </div>
  );
}
