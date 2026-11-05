"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SelectMenu } from "@/components/ui/SelectMenu";

export type DirectoryQuestion = {
  text: string;
  tag: "required" | "optional" | "conditional";
  limit?: string;
  groupLabel?: string;
  guide?: { id: string; label: string };
};

export type DirectoryGuide = {
  label: string;
  quickTip: string;
  how: string[];
  avoid: string;
};

export type DirectorySchool = {
  slug: string;
  name: string;
  abbr: string;
  state: string;
  distribution?: string;
  hasPage: boolean;
  questions: DirectoryQuestion[];
  note?: string;
};

const TAG_LABEL = {
  required: "Required",
  optional: "Optional",
  conditional: "Only if it applies",
} as const;

/**
 * One list for the whole page: search and state filter on top, every school below with its prompts in a
 * collapsible card. Rendered on the server with all schools open in the HTML, so search engines see every prompt.
 */
export function SecondaryDirectory({
  schools,
  guides,
}: {
  schools: DirectorySchool[];
  guides: Record<string, DirectoryGuide>;
}) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  // A to Z, so "Washington D.C." sits with the W's instead of after Connecticut.
  const states = useMemo(
    () =>
      [...new Set(schools.map((school) => school.state))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [schools],
  );
  const stateOptions = useMemo(
    () => [
      { value: "", label: "All states" },
      ...states.map((name) => ({ value: name, label: name })),
    ],
    [states],
  );

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = schools.filter(
      (school) =>
        (!state || school.state === state) &&
        (!q ||
          school.name.toLowerCase().includes(q) ||
          school.abbr.toLowerCase().includes(q) ||
          school.state.toLowerCase().includes(q)),
    );
    const map = new Map<string, DirectorySchool[]>();
    for (const school of list)
      map.set(school.state, [...(map.get(school.state) ?? []), school]);
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [schools, query, state]);

  const shown = groups.reduce((n, [, list]) => n + list.length, 0);

  return (
    <div>
      <div className="z-20 rounded-[20px] border border-[#E4E9F2] bg-white/95 p-3 shadow-[0_20px_40px_-32px_rgba(11,27,58,0.5)] backdrop-blur lg:sticky lg:top-[84px]">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="secondary-search" className="sr-only">
            Search dental schools
          </label>
          <input
            id="secondary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a school, e.g. NYU or UCLA"
            className="min-h-[48px] flex-1 rounded-full border border-[#E4E9F2] bg-[#F7F9FD] px-5 text-[15px] text-[#0B1B3A] outline-none placeholder:text-[#8A93A3] focus:border-[#1F5BD8] focus:bg-white focus:ring-4 focus:ring-[#1F5BD8]/15"
          />
          <SelectMenu
            label="Filter by state"
            value={state}
            options={stateOptions}
            onChange={setState}
            className="sm:w-[240px]"
          />
        </div>
      </div>

      <p className="mt-4 text-[13.5px] text-[#8A93A3]" aria-live="polite">
        Showing {shown} of {schools.length} schools
      </p>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-[20px] border border-[#E4E9F2] bg-white p-6 text-center text-[15px] text-[#5B6782]">
          No school matches that search.
        </p>
      ) : null}

      <div className="mt-6 space-y-10">
        {groups.map(([stateName, list]) => (
          <section key={stateName} aria-labelledby={`state-${stateName}`}>
            <h3
              id={`state-${stateName}`}
              className="text-[20px] font-extrabold tracking-[-0.01em] text-[#0B1B3A]"
            >
              {stateName}
            </h3>
            <div className="mt-3 space-y-3">
              {list.map((school) => (
                <details
                  key={school.slug}
                  className="group rounded-[18px] border border-[#E4E9F2] bg-white transition-colors open:border-[#C9D8F6] open:shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <h4 className="text-[16px] leading-snug font-bold text-[#0B1B3A]">
                        {school.name}
                      </h4>
                      <span className="mt-0.5 block text-[13px] text-[#8A93A3]">
                        {school.abbr} ·{" "}
                        {school.questions.length > 0
                          ? `${school.questions.length} prompt${school.questions.length === 1 ? "" : "s"}`
                          : "No prompts listed"}
                      </span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1F5BD8] group-open:text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-[#EEF2F8] px-5 pt-4 pb-5">
                    {school.questions.length > 0 ? (
                      <ol className="list-decimal space-y-5 pl-5 marker:font-bold marker:text-[#8A93A3]">
                        {school.questions.map((question, index) => (
                          <li
                            key={index}
                            className="pl-1 text-[16px] leading-relaxed text-[#33415C]"
                          >
                            {question.groupLabel ? (
                              <span className="block text-[12px] font-bold tracking-[0.06em] text-[#8A93A3] uppercase">
                                {question.groupLabel}
                              </span>
                            ) : null}
                            {question.tag !== "required" ? (
                              <span className="font-semibold text-[#9A6A00]">
                                {TAG_LABEL[question.tag]}:{" "}
                              </span>
                            ) : null}
                            {question.text}
                            {question.limit &&
                            !/no limit/i.test(question.limit) ? (
                              <span className="text-[#8A93A3]">
                                {" "}
                                ({question.limit})
                              </span>
                            ) : null}
                            {question.guide && guides[question.guide.id] ? (
                              <div className="mt-2.5 rounded-[14px] border border-[#DCE7FC] bg-[#F4F7FE] px-4 py-3">
                                <p className="text-[14.5px] leading-relaxed text-[#33415C]">
                                  <b className="text-[#1F5BD8]">
                                    How to answer:
                                  </b>{" "}
                                  {guides[question.guide.id].quickTip}
                                </p>
                                <details className="group/tip mt-1.5">
                                  <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[13px] font-bold text-[#1F5BD8] hover:underline [&::-webkit-details-marker]:hidden">
                                    <span className="group-open/tip:hidden">
                                      Step by step
                                    </span>
                                    <span className="hidden group-open/tip:inline">
                                      Hide steps
                                    </span>
                                    <svg
                                      className="transition-transform group-open/tip:rotate-180"
                                      width="11"
                                      height="11"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      aria-hidden
                                    >
                                      <path
                                        d="M4 6l4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </summary>
                                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-[14px] leading-relaxed text-[#33415C]">
                                    {guides[question.guide.id].how.map(
                                      (step) => (
                                        <li key={step}>{step}</li>
                                      ),
                                    )}
                                  </ol>
                                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#5B6782]">
                                    <b className="text-[#B42318]">Avoid:</b>{" "}
                                    {guides[question.guide.id].avoid}
                                  </p>
                                </details>
                              </div>
                            ) : null}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-[15px] leading-relaxed text-[#5B6782]">
                        {school.note ??
                          "We have not published this school's prompts yet. Check the school's admissions page for the current cycle."}
                      </p>
                    )}

                    {school.hasPage ? (
                      <div className="mt-5 border-t border-[#EEF2F8] pt-4 text-right">
                        <Link
                          href={`/secondaries/${school.slug}`}
                          className="text-[14px] font-bold text-[#1F5BD8] hover:underline"
                        >
                          Full {school.abbr} page →
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
