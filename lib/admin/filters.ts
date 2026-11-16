import "server-only";
import {
  RANGE_PRESETS,
  type SearchFilterState,
} from "@/components/admin/dash/searchFilterOptions";
import { type Filters, rangeBetween, ranges } from "@/lib/admin/gsc";

// Date range + filter parsing shared by the Search (GSC) and Traffic (GA4) pages.

const isoDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function currentTime() {
  return Date.now();
}

/** Reads ?range=7d|28d|3m|…|custom&start&end&q&page&country&device like Search Console's filter bar. */
export function readFilters(
  sp: Record<string, string | string[] | undefined>,
  now: number,
) {
  const one = (k: string) => {
    const v = sp[k];
    return ((Array.isArray(v) ? v[0] : v) ?? "").trim();
  };
  const maxDate = isoDay(now - 864e5);
  const minDate = isoDay(now - 486 * 864e5);
  let range = one("range") || "28d";
  let start = one("start");
  let end = one("end");
  let period;
  if (range === "custom" && DATE_RE.test(start) && DATE_RE.test(end)) {
    const clamp = (d: string) =>
      d < minDate ? minDate : d > maxDate ? maxDate : d;
    [start, end] = [clamp(start), clamp(end)].sort();
    period = rangeBetween(start, end);
  } else {
    const preset =
      RANGE_PRESETS.find((r) => r.id === range) ?? RANGE_PRESETS[2];
    range = preset.id;
    period = ranges(preset.days);
    start = period.current.start;
    end = period.current.end;
  }
  const device = one("device").toUpperCase();
  const country = one("country").toLowerCase();
  const state: SearchFilterState = {
    range,
    start,
    end,
    q: one("q").toLowerCase().slice(0, 100),
    page: one("page").slice(0, 200),
    country: /^[a-z]{3}$/.test(country) ? country : "",
    device: ["MOBILE", "DESKTOP", "TABLET"].includes(device) ? device : "",
  };
  const filters: Filters = {
    query: state.q || undefined,
    page: state.page || undefined,
    country: state.country || undefined,
    device: state.device || undefined,
  };
  return { state, filters, period, minDate, maxDate };
}
