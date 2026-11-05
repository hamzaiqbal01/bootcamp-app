"use client";

import { useEffect, useMemo, useState } from "react";
import { readSaved, useHydrated, writeSaved } from "@/components/tools/storage";

// Standard 4.0 conversion AADSAS applies to letter grades.
const GRADES: [string, number][] = [
  ["A+", 4.0],
  ["A", 4.0],
  ["A-", 3.7],
  ["B+", 3.3],
  ["B", 3.0],
  ["B-", 2.7],
  ["C+", 2.3],
  ["C", 2.0],
  ["C-", 1.7],
  ["D+", 1.3],
  ["D", 1.0],
  ["D-", 0.7],
  ["F", 0.0],
];
const POINTS = Object.fromEntries(GRADES);

const SUBJECTS = [
  { value: "bio", label: "Biology" },
  { value: "chem", label: "Chemistry" },
  { value: "phys", label: "Physics" },
  { value: "other", label: "Other (non-science)" },
] as const;

type Subject = (typeof SUBJECTS)[number]["value"];
type Course = { id: number; name: string; subject: Subject; credits: string; grade: string };
type TermSystem = "semester" | "quarter";

const STORAGE_KEY = "fdp-gpa-calculator";
// Quarter hours are converted to semester hours at two-thirds.
const QUARTER_TO_SEMESTER = 2 / 3;

let nextId = 1;
const blankCourse = (subject: Subject = "bio"): Course => ({ id: nextId++, name: "", subject, credits: "", grade: "" });
const starterCourses = (): Course[] => [blankCourse("bio"), blankCourse("chem"), blankCourse("phys"), blankCourse("other")];

type Totals = { hours: number; points: number };
const gpa = (t: Totals) => (t.hours > 0 ? t.points / t.hours : null);
const fmt = (value: number | null) => (value == null ? "—" : value.toFixed(2));

type Saved = { system?: TermSystem; courses?: Omit<Course, "id">[] };

// The server renders an empty calculator; once in the browser it remounts with the last saved session.
export function GpaCalculator() {
  const hydrated = useHydrated();
  return <Calculator key={hydrated ? "browser" : "server"} hydrated={hydrated} />;
}

function Calculator({ hydrated }: { hydrated: boolean }) {
  const [saved] = useState(() => (hydrated ? readSaved<Saved>(STORAGE_KEY) : null));
  const [courses, setCourses] = useState<Course[]>(() =>
    saved?.courses?.length ? saved.courses.map((c) => ({ ...c, id: nextId++ })) : starterCourses(),
  );
  const [system, setSystem] = useState<TermSystem>(saved?.system === "quarter" ? "quarter" : "semester");

  useEffect(() => {
    if (!hydrated) return;
    writeSaved(STORAGE_KEY, {
      system,
      courses: courses.map(({ name, subject, credits, grade }) => ({ name, subject, credits, grade })),
    });
  }, [courses, system, hydrated]);

  const results = useMemo(() => {
    const zero = (): Totals => ({ hours: 0, points: 0 });
    const by: Record<Subject, Totals> = { bio: zero(), chem: zero(), phys: zero(), other: zero() };
    let counted = 0;
    for (const course of courses) {
      const raw = parseFloat(course.credits);
      if (!course.grade || !(raw > 0)) continue;
      const hours = system === "quarter" ? raw * QUARTER_TO_SEMESTER : raw;
      by[course.subject].hours += hours;
      by[course.subject].points += hours * POINTS[course.grade];
      counted++;
    }
    const sum = (...keys: Subject[]): Totals =>
      keys.reduce((t, k) => ({ hours: t.hours + by[k].hours, points: t.points + by[k].points }), zero());
    const science = sum("bio", "chem", "phys");
    const overall = sum("bio", "chem", "phys", "other");
    return {
      counted,
      overall: gpa(overall),
      science: gpa(science),
      bio: gpa(by.bio),
      chem: gpa(by.chem),
      phys: gpa(by.phys),
      other: gpa(by.other),
      hours: overall.hours,
      scienceHours: science.hours,
    };
  }, [courses, system]);

  const update = (id: number, patch: Partial<Course>) =>
    setCourses((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const remove = (id: number) => setCourses((list) => (list.length > 1 ? list.filter((c) => c.id !== id) : list));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5 shadow-[0_24px_50px_-36px_rgba(11,27,58,0.45)] sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#0B1B3A]">Your courses</h2>
          <div className="flex rounded-xl border border-[#E4E9F2] bg-[#F6F8FC] p-1" role="radiogroup" aria-label="Credit system">
            {(["semester", "quarter"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={system === value}
                onClick={() => setSystem(value)}
                className={`min-h-9 cursor-pointer rounded-lg px-3.5 text-sm font-bold capitalize ${
                  system === value ? "bg-white text-[#0B1B3A] shadow-sm" : "text-[#5B6782] hover:text-[#0B1B3A]"
                }`}
              >
                {value} hours
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 hidden grid-cols-[minmax(0,1.6fr)_minmax(0,1.3fr)_90px_100px_36px] gap-3 px-1 text-xs font-bold tracking-[0.06em] text-[#5B6782] uppercase md:grid">
          <span>Course (optional)</span>
          <span>Subject</span>
          <span>Credits</span>
          <span>Grade</span>
          <span />
        </div>

        <ul className="mt-2 flex flex-col gap-3">
          {courses.map((course, index) => (
            <li
              key={course.id}
              className="grid grid-cols-2 gap-2.5 rounded-xl border border-[#EEF1F7] bg-[#FBFCFE] p-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.3fr)_90px_100px_36px] md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-1"
            >
              <label className="col-span-2 md:col-span-1">
                <span className="sr-only">Course {index + 1} name</span>
                <input
                  value={course.name}
                  onChange={(e) => update(course.id, { name: e.target.value })}
                  placeholder={`Course ${index + 1}`}
                  className="h-11 w-full rounded-[10px] border border-[#D5DDEA] bg-white px-3 text-[15px] text-[#0B1B3A] placeholder:text-[#9AA6BD] focus:border-[#1F5BD8] focus:ring-3 focus:ring-[#1F5BD8]/15 focus:outline-none"
                />
              </label>
              <label className="col-span-2 md:col-span-1">
                <span className="sr-only">Course {index + 1} subject</span>
                <select
                  value={course.subject}
                  onChange={(e) => update(course.id, { subject: e.target.value as Subject })}
                  className="h-11 w-full cursor-pointer rounded-[10px] border border-[#D5DDEA] bg-white px-3 text-[15px] text-[#0B1B3A] focus:border-[#1F5BD8] focus:ring-3 focus:ring-[#1F5BD8]/15 focus:outline-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Course {index + 1} credits</span>
                <input
                  value={course.credits}
                  onChange={(e) => update(course.id, { credits: e.target.value })}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  placeholder="Credits"
                  className="h-11 w-full rounded-[10px] border border-[#D5DDEA] bg-white px-3 text-[15px] text-[#0B1B3A] placeholder:text-[#9AA6BD] focus:border-[#1F5BD8] focus:ring-3 focus:ring-[#1F5BD8]/15 focus:outline-none"
                />
              </label>
              <div className="flex gap-2">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Course {index + 1} grade</span>
                  <select
                    value={course.grade}
                    onChange={(e) => update(course.id, { grade: e.target.value })}
                    className="h-11 w-full cursor-pointer rounded-[10px] border border-[#D5DDEA] bg-white px-3 text-[15px] text-[#0B1B3A] focus:border-[#1F5BD8] focus:ring-3 focus:ring-[#1F5BD8]/15 focus:outline-none"
                  >
                    <option value="">Grade</option>
                    {GRADES.map(([letter]) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </label>
                <RemoveButton index={index} onClick={() => remove(course.id)} disabled={courses.length === 1} className="grid md:hidden" />
              </div>
              <RemoveButton
                index={index}
                onClick={() => remove(course.id)}
                disabled={courses.length === 1}
                className="hidden md:grid"
              />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCourses((list) => [...list, blankCourse("bio")])}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#1F5BD8] px-5 text-sm font-bold text-white hover:bg-[#1747AC]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            Add course
          </button>
          <button
            type="button"
            onClick={() => setCourses(starterCourses())}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-[#D5DDEA] bg-white px-5 text-sm font-bold text-[#0B1B3A] hover:border-[#0B1B3A]"
          >
            Clear all
          </button>
          <p className="text-xs text-[#5B6782]">Saved in this browser only.</p>
        </div>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-2xl bg-[#0B1B3A] p-6 text-white shadow-[0_24px_50px_-30px_rgba(11,27,58,0.7)]">
          <p className="text-xs font-bold tracking-[0.08em] text-[#9DB9F5] uppercase">Overall GPA</p>
          <p className="mt-1 text-5xl font-extrabold tracking-[-0.03em]">{fmt(results.overall)}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
            <div>
              <p className="text-xs text-[#9DB9F5]">Science (BCP)</p>
              <p className="text-2xl font-extrabold">{fmt(results.science)}</p>
            </div>
            <div>
              <p className="text-xs text-[#9DB9F5]">Non-science</p>
              <p className="text-2xl font-extrabold">{fmt(results.other)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5">
          <p className="text-xs font-bold tracking-[0.08em] text-[#5B6782] uppercase">By subject</p>
          <dl className="mt-3 flex flex-col divide-y divide-[#EEF1F7] text-sm">
            {[
              ["Biology", results.bio],
              ["Chemistry", results.chem],
              ["Physics", results.phys],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between py-2.5">
                <dt className="text-[#33415C]">{label}</dt>
                <dd className="font-bold text-[#0B1B3A]">{fmt(value as number | null)}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-[#33415C]">Credit hours counted</dt>
              <dd className="font-bold text-[#0B1B3A]">
                {results.hours ? `${+results.hours.toFixed(2)} (${+results.scienceHours.toFixed(2)} BCP)` : "—"}
              </dd>
            </div>
          </dl>
          {results.counted === 0 ? (
            <p className="mt-3 text-xs text-[#5B6782]">Add credits and a grade to a course to see your GPA.</p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function RemoveButton({
  index,
  onClick,
  disabled,
  className,
}: {
  index: number;
  onClick: () => void;
  disabled: boolean;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Remove course ${index + 1}`}
      className={`h-11 w-9 shrink-0 cursor-pointer place-items-center rounded-[10px] text-[#9AA6BD] hover:bg-[#FDECEC] hover:text-[#B42318] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mx-auto">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
