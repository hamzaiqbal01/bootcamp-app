"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";

const SHOW_AFTER_MS = 5_000;

export function BlogDemoCallPopup({ slug }: { slug: string }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let elapsed = 0;
    let last = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      if (document.visibilityState === "visible") elapsed += now - last;
      last = now;
      if (elapsed >= SHOW_AFTER_MS) {
        window.clearInterval(timer);
        setOpen(true);
      }
    }, 250);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setState("submitting");
    setError("");

    try {
      const res = await fetch("/api/blog-lead", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          subject: "Free demo tutor",
          message: String(fd.get("info") ?? ""),
          page: slug,
          intent: "demo-call",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not send that.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Could not send that.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#0B1020]/70 backdrop-blur-sm"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[min(92vh,44rem)] w-full max-w-md overflow-x-hidden overflow-y-auto rounded-3xl bg-white shadow-2xl shadow-black/30"
      >
        <div className="relative overflow-hidden bg-[#0B1020] px-6 pt-6 pb-7 text-white sm:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-indigo-500/40 blur-3xl"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={dismiss}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-200 uppercase">
            Future Dental Prep
          </p>
          <h2 id={titleId} className="mt-3 max-w-[16ch] text-2xl font-extrabold tracking-tight sm:text-3xl">
            Get a free demo tutor
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            15 minutes with a tutor. No pitch and no obligation. Tell us where you are, and we will point at the next step.
          </p>
        </div>

        {state === "success" ? (
          <div className="px-6 py-7 sm:px-8">
            <p className="text-lg font-bold text-slate-900">You are on the list.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We will email you to set the 15-minute tutor demo. If nothing arrives in two business days, write us from the same address.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#0B1020] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Back to the article
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8">
            <div>
              <label htmlFor={`${slug}-demo-name`} className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id={`${slug}-demo-name`}
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={state === "submitting"}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 disabled:opacity-60"
              />
            </div>
            <div className="mt-4">
              <label htmlFor={`${slug}-demo-email`} className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id={`${slug}-demo-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={state === "submitting"}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 disabled:opacity-60"
              />
            </div>
            <div className="mt-4">
              <label htmlFor={`${slug}-demo-info`} className="block text-sm font-medium text-slate-700">
                Problem or info
              </label>
              <textarea
                id={`${slug}-demo-info`}
                name="info"
                required
                rows={3}
                placeholder="What do you want the tutor to help with?"
                disabled={state === "submitting"}
                className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 disabled:opacity-60"
              />
            </div>
            {state === "error" ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
            <button
              type="submit"
              disabled={state === "submitting"}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#0B1020] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "submitting" ? "Sending…" : "Get my free demo tutor"}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">We only use this to set the tutor demo.</p>
          </form>
        )}
      </div>
    </div>
  );
}
