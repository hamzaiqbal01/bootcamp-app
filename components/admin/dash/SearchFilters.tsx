"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  COUNTRY_OPTIONS,
  DEVICE_OPTIONS,
  RANGE_PRESETS,
  type SearchFilterState,
} from "./searchFilterOptions";

const input =
  "h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#1F5BD8] focus:ring-2 focus:ring-[#1F5BD8]/15";

export function SearchFilters({
  value,
  minDate,
  maxDate,
  basePath = "/admin/search",
  hideQuery = false,
}: {
  value: SearchFilterState;
  minDate: string;
  maxDate: string;
  /** Page the filters link to (the Traffic page reuses this bar). */
  basePath?: string;
  /** Hide "Query contains" (GA4 has no search queries). */
  hideQuery?: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [state, setState] = useState(value);
  const [custom, setCustom] = useState(value.range === "custom");

  function go(next: Partial<SearchFilterState>) {
    const v = { ...state, ...next };
    setState(v);
    const sp = new URLSearchParams();
    if (v.range === "custom") {
      sp.set("range", "custom");
      sp.set("start", v.start);
      sp.set("end", v.end);
    } else if (v.range !== "28d") sp.set("range", v.range);
    if (v.q.trim()) sp.set("q", v.q.trim());
    if (v.page.trim()) sp.set("page", v.page.trim());
    if (v.country) sp.set("country", v.country);
    if (v.device) sp.set("device", v.device);
    const qs = sp.toString();
    start(() => router.push(`${basePath}${qs ? `?${qs}` : ""}`));
  }

  const active = [
    state.q && { k: "q" as const, label: `Query contains “${state.q}”` },
    state.page && {
      k: "page" as const,
      label: `Page contains “${state.page}”`,
    },
    state.country && {
      k: "country" as const,
      label:
        COUNTRY_OPTIONS.find(([c]) => c === state.country)?.[1] ??
        state.country.toUpperCase(),
    },
    state.device && {
      k: "device" as const,
      label:
        DEVICE_OPTIONS.find(([d]) => d === state.device)?.[1] ?? state.device,
    },
  ].filter(Boolean) as {
    k: "q" | "page" | "country" | "device";
    label: string;
  }[];

  return (
    <div
      className={`space-y-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200 transition-opacity ${pending ? "opacity-60" : ""}`}
    >
      {/* Date range */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-full bg-slate-50 p-1 ring-1 ring-slate-200">
          {RANGE_PRESETS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setCustom(false);
                go({ range: r.id });
              }}
              className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${state.range === r.id && !custom ? "bg-[#0B1B3A] text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              {r.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCustom(true)}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${custom ? "bg-[#0B1B3A] text-white" : "text-slate-600 hover:text-slate-900"}`}
          >
            Custom
          </button>
        </div>
        {custom ? (
          <form
            className="flex flex-wrap items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              let s = String(f.get("start") || maxDate);
              let en = String(f.get("end") || s);
              if (s > en) [s, en] = [en, s];
              go({ range: "custom", start: s, end: en });
            }}
          >
            <input
              type="date"
              name="start"
              defaultValue={state.start}
              min={minDate}
              max={maxDate}
              className={input}
              aria-label="Start date"
            />
            <span className="text-sm text-slate-400">to</span>
            <input
              type="date"
              name="end"
              defaultValue={state.end}
              min={minDate}
              max={maxDate}
              className={input}
              aria-label="End date"
            />
            <button
              type="submit"
              className="h-9 cursor-pointer rounded-xl bg-[#1F5BD8] px-4 text-sm font-semibold text-white hover:bg-[#1a4fbd]"
            >
              Apply
            </button>
            <span className="text-xs text-slate-400">
              Same date in both = one day
            </span>
          </form>
        ) : null}
      </div>

      {/* Dimension filters */}
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          go({
            q: String(f.get("q") ?? ""),
            page: String(f.get("page") ?? ""),
          });
        }}
      >
        {hideQuery ? null : (
          <input
            name="q"
            defaultValue={state.q}
            key={`q-${state.q}`}
            placeholder="Query contains…"
            className={`${input} w-44`}
          />
        )}
        <input
          name="page"
          defaultValue={state.page}
          key={`p-${state.page}`}
          placeholder="Page contains… (e.g. /blog)"
          className={`${input} w-56`}
        />
        <select
          value={state.country}
          onChange={(e) => go({ country: e.target.value })}
          className={`${input} cursor-pointer`}
          aria-label="Country"
        >
          <option value="">All countries</option>
          {COUNTRY_OPTIONS.map(([c, n]) => (
            <option key={c} value={c}>
              {n}
            </option>
          ))}
        </select>
        <select
          value={state.device}
          onChange={(e) => go({ device: e.target.value })}
          className={`${input} cursor-pointer`}
          aria-label="Device"
        >
          <option value="">All devices</option>
          {DEVICE_OPTIONS.map(([d, n]) => (
            <option key={d} value={d}>
              {n}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-9 cursor-pointer rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Filter
        </button>
        {pending ? (
          <span className="text-xs text-slate-500">Loading…</span>
        ) : null}
      </form>

      {active.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {active.map((a) => (
            <button
              key={a.k}
              type="button"
              onClick={() => go({ [a.k]: "" })}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#1F5BD8]/10 px-3 py-1 text-xs font-semibold text-[#1F5BD8] hover:bg-[#1F5BD8]/20"
            >
              {a.label} <span aria-hidden>×</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => go({ q: "", page: "", country: "", device: "" })}
            className="cursor-pointer text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
