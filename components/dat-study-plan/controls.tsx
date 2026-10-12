const choiceClass = (selected: boolean) =>
  `min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
    selected
      ? "border-brand-600 bg-brand-50 text-stone-900"
      : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
  }`;

export function ChoiceGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  columns = "sm:grid-cols-2",
}: {
  legend: string;
  options: { id: T; label: string }[];
  value: T | null;
  onChange: (id: T) => void;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-stone-900">{legend}</legend>
      <div className={`mt-3 grid gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={choiceClass(selected)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function MultiChoice({
  legend,
  options,
  values,
  onToggle,
}: {
  legend: string;
  options: { id: string; label: string }[];
  values: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-semibold text-stone-900">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option.id)}
              className={`min-h-11 rounded-full border px-3.5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                selected ? "border-brand-600 bg-brand-50 text-stone-900" : "border-stone-200 bg-white text-stone-700"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const inputClass =
  "mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 outline-none focus:border-brand-600";
