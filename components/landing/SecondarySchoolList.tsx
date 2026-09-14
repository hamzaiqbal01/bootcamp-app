"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schools } from "@/lib/data/secondaries/schools";
import {
  filterSchools,
  groupSchoolsByState,
  schoolQuestionCount,
  uniqueStates,
} from "@/lib/data/secondaries/helpers";

const states = uniqueStates();

export function SecondarySchoolList() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<string | null>(null);
  const filtered = useMemo(() => filterSchools(query, state), [query, state]);
  const groups = useMemo(() => groupSchoolsByState(filtered), [filtered]);

  return (
    <div>
      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/60 sm:p-5">
        <label htmlFor="secondary-search" className="sr-only">
          Search dental schools
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            id="secondary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NYU, California, UCLA…"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
          />
        </div>

        <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setState(null)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              state === null
                ? "bg-[#0B1020] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All states
          </button>
          {states.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setState(name === state ? null : name)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                state === name
                  ? "bg-[#0B1020] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{filtered.length}</span> of{" "}
        {schools.length} schools
      </p>

      <div className="mt-8 space-y-12">
        {groups.map((group) => (
          <section key={group.state} id={group.state.toLowerCase().replace(/\s+/g, "-")}>
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                {group.state}
              </h2>
              <p className="text-sm text-slate-400">
                {group.schools.length} school{group.schools.length === 1 ? "" : "s"}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.schools.map((school) => {
                const count = schoolQuestionCount(school.slug);
                return (
                  <li key={school.slug}>
                    <Link
                      href={`/secondaries/${school.slug}`}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md hover:shadow-indigo-100/70"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1020] text-[11px] font-bold tracking-wide text-white">
                        {school.short}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-brand-600">
                          {school.abbr}
                        </span>
                        <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-slate-900">
                          {school.name}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                          {count > 0 ? `${count} prompt${count === 1 ? "" : "s"}` : "No essays on file"}
                          <span
                            aria-hidden
                            className="translate-x-0 transition group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {groups.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="font-medium text-slate-800">No schools match that search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setState(null);
              }}
              className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
