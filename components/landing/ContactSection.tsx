"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { btn, btnSize } from "@/components/ui/button-styles";
import { SectionHeader } from "@/components/ui/SectionHeader";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("Name") ?? "").trim();
    const email = String(fd.get("Email") ?? "").trim();
    const subject = String(fd.get("Subject") ?? "").trim();
    const message = String(fd.get("Message") ?? "").trim();

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        throw new Error(`Contact API responded with ${res.status}`);
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Contact Us"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="contact-name"
                name="Name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                required
                disabled={state === "submitting"}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-brand-500/0 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="contact-email"
                name="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                disabled={state === "submitting"}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700">
                Subject
              </label>
              <input
                id="contact-subject"
                name="Subject"
                type="text"
                placeholder="What is this regarding?"
                required
                disabled={state === "submitting"}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="contact-message"
                name="Message"
                rows={4}
                placeholder="Your message..."
                required
                disabled={state === "submitting"}
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60"
              />
            </div>

            {state === "success" && (
              <p className="text-sm font-medium text-emerald-700" role="status">
                Thanks — your message was sent. We&apos;ll get back to you soon.
              </p>
            )}
            {state === "error" && (
              <p className="text-sm font-medium text-red-600" role="alert">
                Something went wrong. Please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className={`${btn.primary} ${btnSize.md} w-full sm:w-auto sm:px-10`}
            >
              {state === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
