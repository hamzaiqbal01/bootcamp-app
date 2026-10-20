"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { BLOG_LEAD_OFFERS, blogHasLeadForm } from "@/lib/blog-lead";

export function BlogLeadForm({ slug }: { slug: string }) {
  const offer = blogHasLeadForm(slug) ? BLOG_LEAD_OFFERS[slug] : null;
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  if (!offer) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
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
          subject: offer.subject,
          message: String(fd.get("message") ?? ""),
          page: slug,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not send that.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Could not send that.");
    }
  }

  if (state === "success") {
    return (
      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <p className="text-lg font-bold text-emerald-900">Got it. We will email you back.</p>
        <p className="mt-2 text-sm text-emerald-800">
          Check the inbox you just used. If you do not see a reply within two business days, write us from that same address.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Free check</p>
      <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">{offer.heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{offer.body}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${slug}-name`} className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id={`${slug}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={state === "submitting"}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor={`${slug}-email`} className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id={`${slug}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={state === "submitting"}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${slug}-message`} className="block text-sm font-medium text-slate-700">
          Where you are
        </label>
        <textarea
          id={`${slug}-message`}
          name="message"
          required
          rows={3}
          placeholder={offer.placeholder}
          disabled={state === "submitting"}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
        />
      </div>

      {state === "error" ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#0B1020] px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Email me the check"}
      </button>
    </form>
  );
}
