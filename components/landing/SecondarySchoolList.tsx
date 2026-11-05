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
  const isFiltered = query.trim() !== "" || state !== null;

  function clear() {
    setQuery("");
    setState(null);
  }

  return (
    <div>
      {/* Stays in reach while scrolling the list on desktop. */}
      <div className="z-20 rounded-[22px] border border-[#E4E9F2] bg-white/90 p-3 shadow-[0_20px_40px_-32px_rgba(11,27,58,0.5)] backdrop-blur lg:sticky lg:top-[84px]">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="secondary-search" className="sr-only">
            Search dental schools
          </label>
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8A93A3]"
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
              placeholder="Search a school, e.g. NYU or UCLA"
              className="min-h-[50px] w-full rounded-[14px] border border-[#E4E9F2] bg-[#F7F9FD] pr-4 pl-12 text-[15px] text-[#0B1B3A] transition outline-none placeholder:text-[#8A93A3] focus:border-[#1F5BD8] focus:bg-white focus:ring-4 focus:ring-[#1F5BD8]/15"
            />
          </div>
          <label htmlFor="secondary-state" className="sr-only">
            Filter by state
          </label>
          <div className="relative sm:w-[220px]">
            <select
              id="secondary-state"
              value={state ?? ""}
              onChange={(e) => setState(e.target.value || null)}
              className="min-h-[50px] w-full cursor-pointer appearance-none rounded-[14px] border border-[#E4E9F2] bg-[#F7F9FD] pr-10 pl-4 text-[15px] font-medium text-[#0B1B3A] transition outline-none focus:border-[#1F5BD8] focus:bg-white focus:ring-4 focus:ring-[#1F5BD8]/15"
            >
              <option value="">All states</option>
              {states.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#8A93A3]"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 text-[14px] text-[#5B6782]">
        <p>
          Showing <b className="text-[#0B1B3A]">{filtered.length}</b> of {schools.length} schools
        </p>
        {isFiltered ? (
          <button type="button" onClick={clear} className="font-bold text-[#1F5BD8] hover:underline">
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="mt-8 space-y-12">
        {groups.map((group) => (
          <section key={group.state} id={group.state.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-40">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[20px] font-extrabold tracking-[-0.01em] text-[#0B1B3A]">{group.state}</p>
              <span className="rounded-full bg-[#E8EFFD] px-2.5 py-0.5 text-[12px] font-bold text-[#1F5BD8]">
                {group.schools.length}
              </span>
              <span className="h-px flex-1 bg-[#E4E9F2]" aria-hidden />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.schools.map((school) => {
                const count = schoolQuestionCount(school.slug);
                return (
                  <li key={school.slug}>
                    <Link
                      href={`/secondaries/${school.slug}`}
                      className="group flex h-full flex-col rounded-[18px] border border-[#E4E9F2] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#C9D8F6] hover:shadow-[0_20px_40px_-30px_rgba(11,27,58,0.5)]"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="truncate text-[12px] font-bold tracking-[0.06em] text-[#1F5BD8] uppercase">
                          {school.abbr}
                        </span>
                        <span className="shrink-0 rounded-md bg-[#F2F5FB] px-2 py-0.5 text-[11px] font-bold text-[#5B6782]">
                          {school.short}
                        </span>
                      </span>
                      <span className="mt-2 block text-[15px] leading-snug font-bold text-[#0B1B3A]">
                        {school.name}
                      </span>
                      <span className="mt-auto flex items-center justify-between pt-4 text-[13px]">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-semibold ${
                            count > 0 ? "bg-[#E3F6EF] text-[#0F7A5C]" : "bg-[#F2F5FB] text-[#8A93A3]"
                          }`}
                        >
                          {count > 0 ? `${count} prompt${count === 1 ? "" : "s"}` : "No essays on file"}
                        </span>
                        <span className="font-bold text-[#8A93A3] transition group-hover:translate-x-0.5 group-hover:text-[#1F5BD8]">
                          View <span aria-hidden>→</span>
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
          <div className="rounded-[22px] border border-dashed border-[#C9D2E3] bg-white px-6 py-14 text-center">
            <p className="font-bold text-[#0B1B3A]">No schools match that search.</p>
            <p className="mt-1 text-[14px] text-[#5B6782]">Try the school&apos;s short name or its state.</p>
            <button type="button" onClick={clear} className="mt-4 text-[14px] font-bold text-[#1F5BD8] hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
