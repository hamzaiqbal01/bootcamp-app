"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { btn, btnSize } from "@/components/ui/button-styles";
import { emptyPlanForm, formToInput, requestFromForm, stepError, type PlanFormState } from "@/lib/dat-study-plan/form";
import { generateDatStudyPlan } from "@/lib/dat-study-plan/generate";
import type { Attribution, GeneratedPlan, LeadDetails } from "@/lib/dat-study-plan/types";
import { DatPerformanceStep } from "./DatPerformanceStep";
import { DatTimelineStep } from "./DatTimelineStep";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { StudyAvailabilityStep } from "./StudyAvailabilityStep";
import { StudyPlanGenerating } from "./StudyPlanGenerating";
import { StudyPlanPreview } from "./StudyPlanPreview";
import { trackDatPlan } from "./track";

const STEPS = ["Your DAT", "Your Scores", "Study Schedule", "Your Plan"] as const;

function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
    landingPage: window.location.pathname,
    referrer: document.referrer,
  };
}

export function DatStudyPlanExperience() {
  const router = useRouter();
  const [form, setForm] = useState<PlanFormState>(emptyPlanForm);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phase, setPhase] = useState<"intro" | "wizard" | "generating" | "preview">("intro");
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hint = phase === "wizard" ? stepError(step, form) : null;
  const progressIndex = phase === "preview" || phase === "generating" ? 3 : step - 1;

  const finishGenerating = useCallback(() => {
    const input = formToInput(form);
    const next = generateDatStudyPlan(input);
    setPlan(next);
    setPhase("preview");
    trackDatPlan("dat_plan_preview_generated", {
      weeksUntilExam: next.weeksUntilExam,
      preparationIntensity: next.preparationIntensity,
      primaryPriority: next.primaryPriority,
    });
  }, [form]);

  const patch = (partial: Partial<PlanFormState>) => setForm((current) => ({ ...current, ...partial }));

  async function submitLead(lead: LeadDetails) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/dat-study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestFromForm(form, lead, readAttribution())),
      });
      const data = (await res.json()) as { token?: string; emailSent?: boolean; error?: string };
      if (!res.ok || !data.token) throw new Error(data.error || "Could not save your plan.");
      trackDatPlan("dat_plan_lead_submitted", {
        weeksUntilExam: plan?.weeksUntilExam ?? 0,
        preparationIntensity: plan?.preparationIntensity ?? "",
        primaryPriority: plan?.primaryPriority ?? "",
      });
      router.push(`/dat-study-plan-generator/plan/${data.token}?sent=${data.emailSent ? "1" : "0"}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save your plan.");
      setSubmitting(false);
    }
  }

  const started = useMemo(() => phase !== "intro", [phase]);

  return (
    <div className="bg-[#F6F4F0]">
      {phase === "intro" && (
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Free DAT tool</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              Build Your Personalized DAT Study Plan
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">
              Tell us where you are today, when you&apos;re taking the DAT, and where you want to improve. We&apos;ll
              create a personalized study roadmap around your schedule.
            </p>
            <button
              type="button"
              className={`mt-8 ${btn.primary} ${btnSize.lg}`}
              onClick={() => {
                setPhase("wizard");
                trackDatPlan("dat_plan_started");
              }}
            >
              Build My Free Study Plan
            </button>
            <p className="mt-4 text-sm text-stone-500">Free • Takes about 2 minutes • No obligation</p>
            <p className="mt-2 text-sm text-stone-400">Designed for students preparing for the current DAT.</p>
          </div>
        </section>
      )}

      {started && (
        <section id="study-plan-wizard" className="scroll-mt-24 px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <ol className="mb-6 flex flex-wrap gap-2" aria-label="Progress">
              {STEPS.map((label, index) => (
                <li
                  key={label}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    index === progressIndex ? "bg-[#0B1020] text-white" : index < progressIndex ? "bg-brand-50 text-brand-700" : "bg-white text-stone-400"
                  }`}
                >
                  {index + 1} {label}
                </li>
              ))}
            </ol>

            <div className="rounded-[28px] border border-stone-200 bg-[#FFFEFB] p-5 pb-28 shadow-sm sm:p-8 sm:pb-8">
              {phase === "wizard" && step === 1 && <DatTimelineStep form={form} onChange={patch} />}
              {phase === "wizard" && step === 2 && <DatPerformanceStep form={form} onChange={patch} />}
              {phase === "wizard" && step === 3 && <StudyAvailabilityStep form={form} onChange={patch} />}
              {phase === "generating" && <StudyPlanGenerating onDone={finishGenerating} />}
              {phase === "preview" && plan && (
                <div className="space-y-8">
                  <StudyPlanPreview plan={plan} />
                  <LeadCaptureForm submitting={submitting} error={error} onSubmit={submitLead} />
                </div>
              )}
            </div>

            {phase === "wizard" && (
              <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t border-stone-200 bg-[#F6F4F0]/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                {hint && <p className="mb-2 text-sm text-stone-500">{hint}</p>}
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`${btn.outline} ${btnSize.md}`}
                    onClick={() => {
                      if (step === 1) setPhase("intro");
                      else setStep((current) => (current === 3 ? 2 : 1));
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(hint)}
                    className={`flex-1 sm:flex-none ${btn.primary} ${btnSize.md}`}
                    onClick={() => {
                      if (hint) return;
                      if (step === 1) {
                        trackDatPlan("dat_plan_step_1_completed");
                        setStep(2);
                      } else if (step === 2) {
                        trackDatPlan("dat_plan_step_2_completed");
                        setStep(3);
                      } else {
                        trackDatPlan("dat_plan_step_3_completed");
                        setPhase("generating");
                      }
                    }}
                  >
                    {step === 3 ? "Build my plan" : "Continue"}
                  </button>
                </div>
              </div>
            )}

            {phase === "preview" && (
              <button
                type="button"
                className={`mt-4 ${btn.outline} ${btnSize.md}`}
                onClick={() => {
                  setPhase("wizard");
                  setStep(3);
                  setError(null);
                }}
              >
                Back
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
