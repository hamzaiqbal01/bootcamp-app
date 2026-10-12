"use client";

import { useState } from "react";
import { btn, btnSize } from "@/components/ui/button-styles";
import type { PublicStudyPlan } from "@/lib/dat-study-plan/types";
import { trackDatPlan } from "./track";

export function StudyPlanResults({
  view,
  emailSent = true,
}: {
  view: PublicStudyPlan;
  emailSent?: boolean;
}) {
  const { plan, firstName } = view;
  const [openWeek, setOpenWeek] = useState(1);
  const [tutorState, setTutorState] = useState<"idle" | "open" | "sending" | "sent" | "dismissed" | "error">(
    view.tutorRequested ? "sent" : "idle",
  );

  return (
    <div className="bg-[#F6F4F0] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {!emailSent && (
          <p role="status" className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Your plan is saved on this page. The email could not be sent, so keep this link.
          </p>
        )}
        <p className="text-sm font-medium text-brand-700">Prepared for {firstName}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Your Personalized DAT Study Plan
        </h1>
        <p className="mt-3 text-stone-600">{plan.guidanceNote}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["DAT date", plan.daysUntilExam == null ? plan.timelineLabel : `${plan.daysUntilExam} days`],
            ["Weeks remaining", plan.timelineLabel],
            ["Weekly hours", plan.hoursLabel],
            ["Preparation intensity", plan.intensityLabel],
            ["Primary focus", plan.primaryLabel],
            ["Target score", plan.targetLabel],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-stone-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">{label}</p>
              <p className="mt-2 font-semibold text-stone-900">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-stone-500">{plan.timelineNote}</p>
        <p className="mt-1 text-sm text-stone-500">{plan.hoursNote}</p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-stone-900">Your main priorities</h2>
          <div className="mt-4 space-y-3">
            {plan.priorities.map((item, index) => (
              <article key={item.section} className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Priority {index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-stone-900">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-stone-900">Week-by-week plan</h2>
          {plan.weeks.map((week) => {
            const open = openWeek === week.week;
            return (
              <article key={week.week} className="rounded-2xl border border-stone-200 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenWeek(open ? 0 : week.week)}
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                      Week {week.week} · {week.phaseLabel}
                    </span>
                    <span className="mt-1 block font-semibold text-stone-900">{week.title}</span>
                  </span>
                  <span className="text-sm text-stone-500">{open ? "Hide" : "View week details"}</span>
                </button>
                {open && (
                  <div className="border-t border-stone-100 px-5 py-4 text-sm leading-relaxed text-stone-700">
                    <p>
                      Focus: {week.focus}. Suggested workload: {week.hours} hours.
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      {week.tasks.map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                    <h3 className="mt-4 font-semibold text-stone-900">Weekly checkpoint</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {week.checkpoint.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-stone-900">Example study day</h2>
          <p className="mt-2 text-sm text-stone-500">{plan.exampleDayNote}</p>
          <ol className="mt-4 space-y-3">
            {plan.exampleDay.map((block) => (
              <li key={`${block.time}-${block.label}`} className="flex gap-4 text-sm">
                <span className="w-36 shrink-0 font-medium text-stone-500">{block.time}</span>
                <span className="text-stone-800">{block.label}</span>
              </li>
            ))}
          </ol>
        </section>

        {tutorState !== "dismissed" && (
          <section id="tutor" className="mt-10 rounded-2xl bg-[#0B1020] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold">Want an Expert to Review Your Plan?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              We can match you with a DAT tutor based on your weakest sections, target score, timeline, and
              availability.
            </p>
            {tutorState === "sent" ? (
              <p className="mt-5 text-sm text-white/90">
                Thanks, {firstName}. We&apos;ll follow up using the email you already provided.
              </p>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className={`${btn.inverse} ${btnSize.md}`}
                  onClick={() => {
                    trackDatPlan("dat_tutor_match_clicked", { primaryPriority: plan.primaryPriority });
                    setTutorState("open");
                  }}
                >
                  {plan.tutorButton}
                </button>
                <button
                  type="button"
                  className={`${btn.ghost} ${btnSize.md}`}
                  onClick={() => setTutorState("dismissed")}
                >
                  Not now
                </button>
              </div>
            )}
            {tutorState === "error" && (
              <p role="alert" className="mt-4 text-sm text-rose-200">
                We could not send that request. Please try again.
              </p>
            )}
          </section>
        )}

        {tutorState === "open" || tutorState === "sending" ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center">
            <div role="dialog" aria-modal="true" aria-labelledby="tutor-title" className="w-full max-w-md rounded-2xl bg-white p-6">
              <h2 id="tutor-title" className="text-xl font-semibold text-stone-900">
                {plan.tutorButton}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                We already have your name, email, timeline, and {plan.primaryLabel} focus. We&apos;ll use that to follow
                up. You do not need to enter it again.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={tutorState === "sending"}
                  className={`${btn.primary} ${btnSize.md}`}
                  onClick={async () => {
                    setTutorState("sending");
                    try {
                      const res = await fetch("/api/dat-study-plan/tutor-match", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token: view.token }),
                      });
                      if (!res.ok) throw new Error("failed");
                      setTutorState("sent");
                    } catch {
                      setTutorState("error");
                    }
                  }}
                >
                  {tutorState === "sending" ? "Sending..." : "Request a tutor match"}
                </button>
                <button type="button" className={`${btn.outline} ${btnSize.md}`} onClick={() => setTutorState("idle")}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
