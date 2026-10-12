import { ChoiceGroup, inputClass } from "./controls";
import { CONFIDENCE_OPTIONS, SCORE_FORMAT_OPTIONS, SECTION_LABELS } from "@/lib/dat-study-plan/options";
import type { PlanFormState } from "@/lib/dat-study-plan/form";
import { SECTION_IDS, type Confidence, type ScoreFormat, type SectionId } from "@/lib/dat-study-plan/types";

export function DatPerformanceStep({
  form,
  onChange,
}: {
  form: PlanFormState;
  onChange: (patch: Partial<PlanFormState>) => void;
}) {
  const scaleHint =
    form.scoreFormat === "legacy"
      ? "Enter a whole number from 1 to 30."
      : form.scoreFormat === "current"
        ? "Enter a whole number from 200 to 600."
        : "Current scale is 200–600. The older scale is 1–30.";

  function setScore(id: SectionId, value: string) {
    onChange({
      sectionScores: { ...form.sectionScores, [id]: value },
      sectionUnknown: { ...form.sectionUnknown, [id]: false },
    });
  }

  function setUnknown(id: SectionId, unknown: boolean) {
    onChange({
      sectionUnknown: { ...form.sectionUnknown, [id]: unknown },
      sectionScores: unknown ? { ...form.sectionScores, [id]: "" } : form.sectionScores,
    });
  }

  function setConfidence(id: SectionId, confidence: Confidence) {
    onChange({ sectionConfidence: { ...form.sectionConfidence, [id]: confidence } });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Where are you right now?</h2>
        <p className="mt-2 text-stone-600">Scores are optional by section. A guess is less useful than leaving a section blank.</p>
      </div>

      <ChoiceGroup
        legend="Have you taken a diagnostic or recent practice test?"
        options={[
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ]}
        value={form.diagnosticTaken == null ? null : form.diagnosticTaken ? "yes" : "no"}
        onChange={(id) => onChange({ diagnosticTaken: id === "yes" })}
      />

      {form.diagnosticTaken === true && (
        <div className="space-y-6">
          <ChoiceGroup
            legend="Which score scale are you using?"
            options={SCORE_FORMAT_OPTIONS}
            value={form.scoreFormat}
            onChange={(id) => onChange({ scoreFormat: id as ScoreFormat })}
          />
          <div>
            <label htmlFor="overall-score" className="text-base font-semibold text-stone-900">
              Overall / Academic Average score
            </label>
            <input
              id="overall-score"
              inputMode="numeric"
              value={form.overallScore}
              onChange={(event) => onChange({ overallScore: event.target.value })}
              className={inputClass}
            />
            <p className="mt-2 text-sm text-stone-500">{scaleHint}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SECTION_IDS.map((id) => (
              <div key={id} className="rounded-2xl border border-stone-200 bg-white p-4">
                <label htmlFor={`score-${id}`} className="text-sm font-semibold text-stone-900">
                  {SECTION_LABELS[id]}
                </label>
                <input
                  id={`score-${id}`}
                  inputMode="numeric"
                  disabled={form.sectionUnknown[id]}
                  value={form.sectionScores[id]}
                  onChange={(event) => setScore(id, event.target.value)}
                  className={inputClass}
                />
                <label className="mt-3 flex items-center gap-2 text-sm text-stone-600">
                  <input
                    type="checkbox"
                    checked={form.sectionUnknown[id]}
                    onChange={(event) => setUnknown(id, event.target.checked)}
                  />
                  I don&apos;t know this score
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {form.diagnosticTaken === false && (
        <div className="space-y-5">
          <p className="text-base font-semibold text-stone-900">How confident do you currently feel in each DAT section?</p>
          {SECTION_IDS.map((id) => (
            <fieldset key={id}>
              <legend className="text-sm font-semibold text-stone-800">{SECTION_LABELS[id]}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CONFIDENCE_OPTIONS.map((option) => {
                  const selected = form.sectionConfidence[id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setConfidence(id, option.id)}
                      className={`min-h-11 rounded-full border px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                        selected ? "border-brand-600 bg-brand-50 text-stone-900" : "border-stone-200 bg-white text-stone-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      )}

      <div className="space-y-4 border-t border-stone-200 pt-8">
        <div>
          <h3 className="text-base font-semibold text-stone-900">What score are you aiming for?</h3>
          <p className="mt-1 text-sm text-stone-500">
            If you&apos;re unsure, we&apos;ll still build your plan around your timeline and current preparation.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            aria-pressed={!form.targetUnsure}
            onClick={() => onChange({ targetUnsure: false })}
            className={`min-h-12 rounded-2xl border px-4 py-3 text-sm font-medium ${
              !form.targetUnsure ? "border-brand-600 bg-brand-50" : "border-stone-200 bg-white"
            }`}
          >
            I have a target score
          </button>
          <button
            type="button"
            aria-pressed={form.targetUnsure}
            onClick={() => onChange({ targetUnsure: true, targetScore: "" })}
            className={`min-h-12 rounded-2xl border px-4 py-3 text-sm font-medium ${
              form.targetUnsure ? "border-brand-600 bg-brand-50" : "border-stone-200 bg-white"
            }`}
          >
            Not sure
          </button>
        </div>
        {!form.targetUnsure && (
          <div>
            <label htmlFor="target-score" className="text-sm font-semibold text-stone-900">
              Target score
            </label>
            <input
              id="target-score"
              inputMode="numeric"
              value={form.targetScore}
              onChange={(event) => onChange({ targetScore: event.target.value })}
              className={inputClass}
            />
          </div>
        )}
      </div>
    </div>
  );
}
