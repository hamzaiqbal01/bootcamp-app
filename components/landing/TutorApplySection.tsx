"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { btn, btnSize } from "@/components/ui/button-styles";
import { TUTOR_SUBJECTS } from "@/lib/tutor-apply";

type SubmitState = "idle" | "submitting" | "success" | "error" | "subjects";

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 disabled:opacity-60";

export function TutorApplySection() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const subjects = fd.getAll("subjects").map(String);
    if (subjects.length === 0) {
      setState("subjects");
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/tutor-apply", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(fd.get("name") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          school: String(fd.get("school") ?? "").trim(),
          year: String(fd.get("year") ?? "").trim(),
          datScore: String(fd.get("datScore") ?? "").trim(),
          subjects: fd.getAll("subjects").map(String),
          hoursPerWeek: String(fd.get("hoursPerWeek") ?? "").trim(),
          timezone: String(fd.get("timezone") ?? "").trim(),
          studentsTaught: String(fd.get("studentsTaught") ?? "").trim(),
          hourlyRate: String(fd.get("hourlyRate") ?? "").trim(),
          videoUrl: String(fd.get("videoUrl") ?? "").trim(),
          notes: String(fd.get("notes") ?? "").trim(),
        }),
      });

      if (!res.ok) {
        throw new Error(`Tutor apply API responded with ${res.status}`);
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section className="bg-[#F6F4F0] py-16 sm:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
          Tutors
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Become a DAT tutor
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
          We&apos;re adding a few DAT tutors for this cycle. If you have a 20+ AA (or equivalent),
          clear English, and reliable Zoom hours, send this in. We review applications ourselves —
          this is not an open hiring blast.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-[28px] border border-stone-200/90 bg-[#FFFEFB] p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="tutor-name" className="block text-sm font-medium text-stone-700">
                Full name
              </label>
              <input
                id="tutor-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tutor-email" className="block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                id="tutor-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tutor-phone" className="block text-sm font-medium text-stone-700">
              Phone <span className="font-normal text-stone-500">(optional)</span>
            </label>
            <input
              id="tutor-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              disabled={state === "submitting"}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="tutor-school" className="block text-sm font-medium text-stone-700">
                School / program
              </label>
              <input
                id="tutor-school"
                name="school"
                type="text"
                placeholder="e.g. Penn Dental, D2"
                required
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tutor-year" className="block text-sm font-medium text-stone-700">
                Year
              </label>
              <select
                id="tutor-year"
                name="year"
                required
                disabled={state === "submitting"}
                className={fieldClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="D1">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
                <option value="Dentist">Practicing dentist</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tutor-dat" className="block text-sm font-medium text-stone-700">
              DAT AA (or new-scale equivalent)
            </label>
            <input
              id="tutor-dat"
              name="datScore"
              type="text"
              placeholder="e.g. 22 AA or 480"
              required
              disabled={state === "submitting"}
              className={fieldClass}
            />
            <p className="mt-2 text-xs text-stone-500">
              If we move forward we&apos;ll ask for a score screenshot. Don&apos;t upload it here.
            </p>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-stone-700">Subjects you can teach</legend>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TUTOR_SUBJECTS.map((subject) => (
                <label key={subject} className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    disabled={state === "submitting"}
                    className="h-4 w-4 rounded border-stone-300 text-brand-600"
                  />
                  {subject}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="tutor-hours" className="block text-sm font-medium text-stone-700">
                Hours per week
              </label>
              <input
                id="tutor-hours"
                name="hoursPerWeek"
                type="text"
                placeholder="e.g. 4–6"
                required
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tutor-tz" className="block text-sm font-medium text-stone-700">
                Timezone
              </label>
              <select
                id="tutor-tz"
                name="timezone"
                required
                disabled={state === "submitting"}
                className={fieldClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="ET">Eastern (ET)</option>
                <option value="CT">Central (CT)</option>
                <option value="MT">Mountain (MT)</option>
                <option value="PT">Pacific (PT)</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="tutor-taught" className="block text-sm font-medium text-stone-700">
                Students taught (approx.)
              </label>
              <input
                id="tutor-taught"
                name="studentsTaught"
                type="text"
                placeholder="e.g. 3"
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="tutor-rate" className="block text-sm font-medium text-stone-700">
                Expected $/hour
              </label>
              <input
                id="tutor-rate"
                name="hourlyRate"
                type="text"
                placeholder="e.g. 60"
                disabled={state === "submitting"}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tutor-video" className="block text-sm font-medium text-stone-700">
              Intro video link (optional)
            </label>
            <input
              id="tutor-video"
              name="videoUrl"
              type="url"
              placeholder="https://"
              disabled={state === "submitting"}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="tutor-notes" className="block text-sm font-medium text-stone-700">
              Anything else
            </label>
            <textarea
              id="tutor-notes"
              name="notes"
              rows={4}
              disabled={state === "submitting"}
              className={`${fieldClass} resize-y`}
            />
          </div>

          {state === "success" && (
            <p className="text-sm font-medium text-emerald-700" role="status">
              Application received. If it&apos;s a fit, we&apos;ll email you about a short trial
              session.
            </p>
          )}
          {state === "subjects" && (
            <p className="text-sm font-medium text-red-600" role="alert">
              Pick at least one subject you can teach.
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
            {state === "submitting" ? "Sending…" : "Submit application"}
          </button>
        </form>
      </div>
    </section>
  );
}
