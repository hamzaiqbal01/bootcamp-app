import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ConnectionNote,
  GscNotConnected,
  RefreshGscButton,
} from "@/components/admin/dash/gscShared";
import { SearchFilters } from "@/components/admin/dash/SearchFilters";
import { type SearchFilterState } from "@/components/admin/dash/searchFilterOptions";
import { currentTime, readFilters } from "@/lib/admin/filters";
import {
  Badge,
  BarList,
  Card,
  dayPoints,
  Delta,
  fmt,
  PageHeader,
  pctChange,
  StatCard,
  TrendChart,
} from "@/components/admin/dash/ui";
import { requireAdmin } from "@/lib/admin/session";
import {
  getDaily,
  getIndexStatus,
  getTop,
  gscConnection,
  type Row,
  shortPath,
  SITE_ORIGIN,
  totals,
} from "@/lib/admin/gsc";

export const metadata: Metadata = { title: "Search (Google)" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Landing pages whose Google index status is worth watching.
const KEY_PAGES = [
  "/",
  "/services",
  "/services/personal-statement-editing",
  "/services/dental-school-interview-prep",
  "/services/secondary-essay-help",
  "/services/aadsas-application-review",
  "/services/dental-school-list",
  "/services/complete-application-package",
  "/private-dat-tutoring",
  "/private-dat-tutoring/dat-biology-tutor",
  "/private-dat-tutoring/dat-general-chemistry-tutor",
  "/private-dat-tutoring/dat-organic-chemistry-tutor",
  "/private-dat-tutoring/dat-pat-tutor",
  "/private-dat-tutoring/dat-reading-comprehension-tutor",
  "/private-dat-tutoring/dat-quantitative-reasoning-tutor",
  "/pricing",
  "/secondaries",
  "/canada",
  "/international-applicants",
  "/schedule",
  "/contact",
];

const BUYER_WORDS = [
  "tutor",
  "tutoring",
  "consult",
  "editing",
  "editor",
  "coach",
  "interview prep",
  "service",
  "review",
  "help with",
];

const COUNTRY: Record<string, string> = {
  usa: "United States",
  can: "Canada",
  ind: "India",
  pak: "Pakistan",
  gbr: "United Kingdom",
  aus: "Australia",
  phl: "Philippines",
  nga: "Nigeria",
  are: "UAE",
  sau: "Saudi Arabia",
};

function section(url: string) {
  const p = shortPath(url).split("#")[0];
  if (p.startsWith("/blog")) return "Blog";
  if (p.startsWith("/services")) return "Service pages";
  if (p.startsWith("/private-dat-tutoring/")) return "DAT section tutor pages";
  if (p.startsWith("/private-dat-tutoring")) return "DAT tutoring page";
  if (p.startsWith("/secondaries")) return "Secondaries";
  if (p === "/canada" || p === "/international-applicants")
    return "Canada + International";
  if (/calculator|counter|study-plan/.test(p)) return "Free tools";
  if (p === "/") return "Home";
  return "Other pages";
}

function groupBySection(rows: Row[]) {
  const g = new Map<string, Row[]>();
  for (const r of rows) {
    const k = section(r.key);
    g.set(k, [...(g.get(k) ?? []), r]);
  }
  return g;
}

const short = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function AdminSearchPage({ searchParams }: Props) {
  await requireAdmin();
  const sp = await searchParams;
  const { state, filters, period, minDate, maxDate } = readFilters(
    sp,
    currentTime(),
  );

  const connection = gscConnection();
  const header = (
    <PageHeader
      title="Search (Google)"
      subtitle="Google Search Console: how people find the site on Google."
      actions={<>{connection !== "none" ? <RefreshGscButton /> : null}</>}
    />
  );
  const filterBar = (
    <SearchFilters
      key={JSON.stringify(state)}
      value={state}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
  if (connection === "none")
    return (
      <div className="space-y-6">
        {header}
        <GscNotConnected />
      </div>
    );

  const { current, previous } = period;
  let data;
  try {
    const [
      daily,
      prevDaily,
      pages,
      prevPages,
      queries,
      prevQueries,
      countries,
    ] = await Promise.all([
      getDaily(current, filters),
      getDaily(previous, filters),
      getTop(current, "page", 500, filters),
      getTop(previous, "page", 500, filters),
      getTop(current, "query", 1000, filters),
      getTop(previous, "query", 1000, filters),
      getTop(current, "country", 10, filters),
    ]);
    data = {
      daily,
      prevDaily,
      pages,
      prevPages,
      queries,
      prevQueries,
      countries,
    };
  } catch (e) {
    return (
      <div className="space-y-6">
        {header}
        {filterBar}
        <GscNotConnected error={e instanceof Error ? e.message : String(e)} />
      </div>
    );
  }

  const daily = [...data.daily].sort((a, b) => a.key.localeCompare(b.key));
  const prevDaily = [...data.prevDaily].sort((a, b) =>
    a.key.localeCompare(b.key),
  );
  const t = totals(data.daily);
  const p = totals(data.prevDaily);

  const prevPage = new Map(data.prevPages.map((r) => [r.key, r]));
  const prevQuery = new Map(data.prevQueries.map((r) => [r.key, r]));
  const now = groupBySection(data.pages);
  const before = groupBySection(data.prevPages);
  const sections = [...new Set([...now.keys(), ...before.keys()])]
    .map((k) => ({
      k,
      a: totals(now.get(k) ?? []),
      b: totals(before.get(k) ?? []),
    }))
    .sort((x, y) => y.a.impressions - x.a.impressions);

  const lowCtr = data.pages
    .filter((r) => r.impressions >= 50 && r.ctr < 0.015 && r.position <= 12)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 12);
  const buyer = data.queries
    .filter((r) => BUYER_WORDS.some((w) => r.key.includes(w)))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  return (
    <div className="space-y-6">
      {header}
      {filterBar}
      <ConnectionNote connection={connection} />
      <p className="text-xs text-slate-500">
        {span(current)} compared with {span(previous)}. The most recent day or
        two can still change while Google finishes counting.
      </p>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Clicks"
          value={fmt.int(t.clicks)}
          delta={pctChange(t.clicks, p.clicks)}
          series={daily.map((d) => d.clicks)}
        />
        <StatCard
          label="Impressions"
          value={fmt.int(t.impressions)}
          delta={pctChange(t.impressions, p.impressions)}
          series={daily.map((d) => d.impressions)}
        />
        <StatCard
          label="CTR"
          value={fmt.pct(t.ctr)}
          delta={(t.ctr - p.ctr) * 100}
          deltaSuffix=" pts"
        />
        <StatCard
          label="Avg position"
          value={fmt.pos(t.position)}
          delta={t.position - p.position}
          deltaSuffix=""
          invert
          hint="Lower is better"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Clicks per day" subtitle="Dashed line: previous period">
          <TrendChart
            labels={daily.map((d) => short(d.key))}
            series={daily.map((d) => d.clicks)}
            compare={prevDaily.map((d) => d.clicks)}
            height={200}
            points={dayPoints(daily, "clicks")}
          />
        </Card>
        <Card
          title="Impressions per day"
          subtitle="How often the site appeared in Google results"
        >
          <TrendChart
            labels={daily.map((d) => short(d.key))}
            series={daily.map((d) => d.impressions)}
            compare={prevDaily.map((d) => d.impressions)}
            height={200}
            compact
            seriesName="Impressions"
            points={dayPoints(daily, "impressions")}
          />
        </Card>
      </div>

      <Card
        title="Day by day"
        subtitle="Newest first. Click a date to see just that day."
      >
        <div className="max-h-[360px] overflow-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="sticky top-0 bg-white text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-3 font-medium">Date</th>
                <th className="py-2 pr-3 text-right font-medium">Clicks</th>
                <th className="py-2 pr-3 text-right font-medium">
                  Impressions
                </th>
                <th className="py-2 pr-3 text-right font-medium">CTR</th>
                <th className="py-2 text-right font-medium">Avg position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...daily].reverse().map((d) => (
                <tr key={d.key}>
                  <td className="py-2 pr-3">
                    <Link
                      href={dayHref(state, d.key)}
                      className="font-medium text-slate-800 hover:text-[#1F5BD8]"
                    >
                      {weekday(d.key)}
                    </Link>
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">
                    {fmt.int(d.clicks)}
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">
                    {fmt.int(d.impressions)}
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">
                    {fmt.pct(d.ctr)}
                  </td>
                  <td className="py-2 text-right tabular-nums">
                    {fmt.pos(d.position)}
                  </td>
                </tr>
              ))}
              {daily.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-sm text-slate-400"
                  >
                    No data for this period and filter
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Performance by part of the site"
        subtitle="Totals for the period, previous period in grey"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-3 font-medium">Section</th>
                <th className="py-2 pr-3 text-right font-medium">Clicks</th>
                <th className="py-2 pr-3 text-right font-medium">
                  Impressions
                </th>
                <th className="py-2 pr-3 text-right font-medium">CTR</th>
                <th className="py-2 text-right font-medium">Avg position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sections.map(({ k, a, b }) => (
                <tr key={k}>
                  <td className="py-2.5 pr-3 font-medium text-slate-800">
                    {k}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {fmt.int(a.clicks)}{" "}
                    <span className="text-xs text-slate-400">
                      / {fmt.int(b.clicks)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {fmt.int(a.impressions)}{" "}
                    <span className="text-xs text-slate-400">
                      / {fmt.int(b.impressions)}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums">
                    {fmt.pct(a.ctr)}
                  </td>
                  <td className="py-2.5 text-right tabular-nums">
                    {a.impressions ? fmt.pos(a.position) : "—"}{" "}
                    <span className="text-xs text-slate-400">
                      / {b.impressions ? fmt.pos(b.position) : "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Top pages" subtitle="By clicks">
          <RowsTable
            rows={data.pages.slice(0, 15)}
            prev={prevPage}
            label={(r) => <PageLink url={r.key} />}
          />
        </Card>
        <Card title="Top searches" subtitle="By clicks, then impressions">
          <RowsTable
            rows={[...data.queries]
              .sort(
                (a, b) => b.clicks - a.clicks || b.impressions - a.impressions,
              )
              .slice(0, 15)}
            prev={prevQuery}
            label={(r) => <span className="text-slate-800">{r.key}</span>}
          />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card
          title="Quick wins: seen a lot, clicked little"
          subtitle="50+ impressions, CTR under 1.5%, on page 1. Better titles can lift these."
        >
          <RowsTable
            rows={lowCtr}
            prev={prevPage}
            label={(r) => <PageLink url={r.key} />}
          />
        </Card>
        <Card
          title="Buyer searches"
          subtitle="Searches with words like tutor, editing, coach, service. These bring leads."
        >
          <RowsTable
            rows={buyer}
            prev={prevQuery}
            label={(r) => <span className="text-slate-800">{r.key}</span>}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Countries" subtitle="By clicks">
          <BarList
            rows={data.countries.map((r) => ({
              label: COUNTRY[r.key] ?? r.key.toUpperCase(),
              value: r.clicks,
              sub: `${fmt.int(r.impressions)} impressions`,
            }))}
          />
        </Card>

        <Suspense fallback={<IndexCardSkeleton />}>
          <IndexCard />
        </Suspense>
      </div>
    </div>
  );
}

function span(r: { start: string; end: string }) {
  return r.start === r.end
    ? short(r.start)
    : `${short(r.start)} – ${short(r.end)}`;
}

const weekday = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function dayHref(state: SearchFilterState, day: string) {
  const sp = new URLSearchParams({ range: "custom", start: day, end: day });
  if (state.q) sp.set("q", state.q);
  if (state.page) sp.set("page", state.page);
  if (state.country) sp.set("country", state.country);
  if (state.device) sp.set("device", state.device);
  return `/admin/search?${sp}`;
}

/** Index checks are slow (one Google call per page), so this card streams in after the rest of the page. */
async function IndexCard() {
  let index;
  try {
    index = await getIndexStatus(KEY_PAGES);
  } catch (e) {
    return (
      <Card title="Are key pages on Google?" className="lg:col-span-2">
        <p className="py-6 text-center text-sm text-slate-400">
          Could not check: {e instanceof Error ? e.message : String(e)}
        </p>
      </Card>
    );
  }
  const notIndexed = index.filter((i) => i.verdict !== "PASS");
  return (
    <Card
      title="Are key pages on Google?"
      subtitle={`${index.length - notIndexed.length} of ${index.length} indexed · checked once a day`}
      className="lg:col-span-2"
    >
      <ul className="divide-y divide-slate-100">
        {[...notIndexed, ...index.filter((i) => i.verdict === "PASS")].map(
          (i) => (
            <li
              key={i.path}
              className="flex items-center justify-between gap-3 py-2 text-sm"
            >
              <a
                href={SITE_ORIGIN + i.path}
                target="_blank"
                className="min-w-0 truncate text-slate-800 hover:text-[#1F5BD8]"
              >
                {i.path}
              </a>
              <span className="flex shrink-0 items-center gap-2">
                <span className="hidden text-xs text-slate-400 sm:inline">
                  {i.coverage}
                </span>
                <Badge
                  tone={
                    i.verdict === "PASS"
                      ? "green"
                      : i.verdict === "ERROR"
                        ? "red"
                        : "amber"
                  }
                >
                  {i.verdict === "PASS"
                    ? "On Google"
                    : i.verdict === "ERROR"
                      ? "Error"
                      : "Not yet"}
                </Badge>
              </span>
            </li>
          ),
        )}
      </ul>
      {notIndexed.length ? (
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
          For pages marked “Not yet”: open Search Console, paste the URL in the
          top bar and click Request indexing.
        </p>
      ) : null}
    </Card>
  );
}

function IndexCardSkeleton() {
  return (
    <Card
      title="Are key pages on Google?"
      subtitle="Checking with Google…"
      className="lg:col-span-2"
    >
      <ul className="space-y-3 py-1">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="h-4 animate-pulse rounded bg-slate-100" />
        ))}
      </ul>
    </Card>
  );
}

function PageLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      className="text-slate-800 hover:text-[#1F5BD8]"
    >
      {shortPath(url)}
    </a>
  );
}

function RowsTable({
  rows,
  prev,
  label,
}: {
  rows: Row[];
  prev: Map<string, Row>;
  label: (r: Row) => React.ReactNode;
}) {
  if (!rows.length)
    return (
      <p className="py-6 text-center text-sm text-slate-400">
        Nothing here for this period
      </p>
    );
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr className="border-b border-slate-100">
            <th className="py-2 pr-3 font-medium">Page / search</th>
            <th className="py-2 pr-3 text-right font-medium">Clicks</th>
            <th className="py-2 pr-3 text-right font-medium">Impr.</th>
            <th className="py-2 pr-3 text-right font-medium">CTR</th>
            <th className="py-2 text-right font-medium">Position</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => {
            const b = prev.get(r.key);
            return (
              <tr key={r.key}>
                <td className="max-w-[260px] truncate py-2 pr-3">{label(r)}</td>
                <td className="py-2 pr-3 text-right tabular-nums">
                  {fmt.int(r.clicks)}
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">
                  {fmt.int(r.impressions)}{" "}
                  {b ? (
                    <Delta value={pctChange(r.impressions, b.impressions)} />
                  ) : (
                    <Badge tone="blue">new</Badge>
                  )}
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">
                  {fmt.pct(r.ctr)}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {fmt.pos(r.position)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
