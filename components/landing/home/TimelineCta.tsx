"use client";

import Link from "next/link";
import { useState } from "react";
import { trackLead } from "@/lib/analytics";

// A broad preview of the cycle; the emailed timeline and the guide carry the exact dates.
const milestones = [
  { when: "May", what: "AADSAS opens" },
  { when: "June", what: "Earliest submissions" },
  { when: "Summer", what: "Secondary applications" },
  { when: "Fall – Winter", what: "Interviews and offers" },
];

export function TimelineCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Timeline request",
          email,
          subject: "Fall 2027 application timeline",
          message:
            "Please email the Fall 2027 application timeline. The public guide is /blog/is-it-too-late-to-apply-dental-school-2027.",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead("timeline_email");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#EDF2FC] pt-4 pb-20 sm:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_55%,#1F5BD8_130%)] px-6 py-12 text-white shadow-[0_40px_80px_-50px_rgba(11,27,58,0.8)] sm:px-12 sm:py-14 lg:px-16">
          <div
            className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[#1F5BD8]/35 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#C9D8FA] uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#7FA6F5]"
                  aria-hidden
                />
                Fall 2027 cycle
              </span>
              <h2 className="mt-5 text-[clamp(28px,3.6vw,44px)] leading-[1.1] font-extrabold tracking-[-0.025em]">
                Get the free 2027 application timeline
              </h2>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[#C9D4EA]">
                Leave your email and we will send the Fall 2027 timeline. You
                can also read it now in the guide.
              </p>

              {status === "sent" ? (
                <p className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      stroke="#7FE0B0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Request received. We will email the timeline to {email}.
                </p>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="mt-7 flex w-full max-w-[520px] flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur sm:flex-row"
                >
                  <label className="sr-only" htmlFor="timeline-email">
                    Email
                  </label>
                  <input
                    id="timeline-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className="min-h-[50px] flex-1 rounded-full bg-white px-5 text-[15px] text-[#0B1B3A] outline-none placeholder:text-[#8A93A3] focus:ring-2 focus:ring-[#7FA6F5]"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="min-h-[50px] rounded-full bg-[#1F5BD8] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[#3A72E8] disabled:opacity-70"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : "Email me the timeline"}
                  </button>
                </form>
              )}
              {status === "error" ? (
                <p className="mt-3 text-sm text-[#F7C1C1]">
                  That request did not send. Try the contact page.
                </p>
              ) : null}
              <Link
                href="/blog/is-it-too-late-to-apply-dental-school-2027"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-colors hover:text-white"
              >
                Read the 2027 timeline guide
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <ol className="relative hidden rounded-[24px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur sm:block">
              {milestones.map((item, index) => (
                <li
                  key={item.when}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index < milestones.length - 1 ? (
                    <span
                      className="absolute top-7 left-[13px] h-[calc(100%-20px)] w-px bg-white/20"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1F5BD8] text-[12px] font-bold ring-4 ring-[#1F5BD8]/25">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[12px] font-bold tracking-[0.08em] text-[#9DB9F5] uppercase">
                      {item.when}
                    </span>
                    <span className="mt-0.5 block text-[15px] font-semibold text-white">
                      {item.what}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
