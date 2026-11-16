import type { Metadata } from "next";
import { RefreshGscButton } from "@/components/admin/dash/gscShared";
import { SearchFilters } from "@/components/admin/dash/SearchFilters";
import {
  BarList,
  Card,
  Delta,
  EmptyConnect,
  fmt,
  PageHeader,
  pctChange,
  StatCard,
  TrendChart,
} from "@/components/admin/dash/ui";
import { currentTime, readFilters } from "@/lib/admin/filters";
import {
  ga4Configured,
  ga4Property,
  gaDate,
  type GaFilters,
  gaReport,
  type GaRow,
  serviceAccountEmail,
} from "@/lib/admin/ga4";
import type { Range } from "@/lib/admin/gsc";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Traffic (GA4)" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const TOTAL_METRICS = [
  "activeUsers",
  "newUsers",
  "sessions",
  "engagedSessions",
  "averageSessionDuration",
  "screenPageViews",
  "keyEvents",
];
const DAILY_METRICS = [
  "activeUsers",
  "sessions",
  "engagedSessions",
  "keyEvents",
];
const SESSION_METRICS = [
  "sessions",
  "activeUsers",
  "engagementRate",
  "keyEvents",
];

// The site's own GA4 events (see components/analytics/GoogleAnalytics.tsx).
const EVENTS: [string, string, string][] = [
  ["book_call_click", "Clicked “Book a call”", "Any link to /schedule"],
  ["book_call_complete", "Booked a call", "Finished a Calendly booking"],
  ["generate_lead", "Sent a form", "Contact, tutor, study plan or guide form"],
  ["select_package", "Picked a package", "Package button on pricing"],
  ["chat_open", "Opened the chat", "Chat widget"],
  ["contact_click", "Clicked Contact", "Links to /contact"],
  ["email_click", "Clicked an email", "mailto links"],
];

const short = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
const long = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
const span = (r: Range) =>
  r.start === r.end ? short(r.start) : `${short(r.start)} – ${short(r.end)}`;
const duration = (s: number) =>
  s >= 60
    ? `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`
    : `${Math.round(s)}s`;

/** One value per day of the range (GA4 leaves out days with no data). */
function fillDays(range: Range, rows: GaRow[]) {
  const by = new Map(rows.map((r) => [gaDate(r.key), r.v]));
  const out: { day: string; v: number[] }[] = [];
  const end = Date.parse(`${range.end}T00:00:00Z`);
  for (let t = Date.parse(`${range.start}T00:00:00Z`); t <= end; t += 864e5) {
    const day = new Date(t).toISOString().slice(0, 10);
    out.push({ day, v: by.get(day) ?? DAILY_METRICS.map(() => 0) });
  }
  return out;
}

export default async function TrafficPage({ searchParams }: Props) {
  await requireAdmin();
  const sp = await searchParams;
  const { state, period, minDate, maxDate } = readFilters(sp, currentTime());
  const filters: GaFilters = {
    page: state.page || undefined,
    country: state.country || undefined,
    device: state.device || undefined,
  };
  const { current, previous } = period;

  const header = (
    <PageHeader
      title="Traffic (GA4)"
      subtitle="Google Analytics: who visits the site, where they come from and what they do."
      actions={ga4Configured() ? <RefreshGscButton /> : null}
    />
  );
  const filterBar = (
    <SearchFilters
      key={JSON.stringify(state)}
      value={state}
      minDate={minDate}
      maxDate={maxDate}
      basePath="/admin/traffic"
      hideQuery
    />
  );

  if (!ga4Configured())
    return (
      <div className="space-y-6">
        {header}
        <Setup />
      </div>
    );

  let d;
  try {
    const r = (
      range: Range,
      dims: string[],
      metrics: string[],
      limit: number,
    ) => gaReport(range, dims, metrics, limit, filters);
    const [
      property,
      tot,
      prevTot,
      daily,
      prevDaily,
      channels,
      prevChannels,
      sources,
      landing,
      prevLanding,
      pages,
      countries,
      devices,
      events,
      prevEvents,
    ] = await Promise.all([
      ga4Property(),
      r(current, [], TOTAL_METRICS, 1),
      r(previous, [], TOTAL_METRICS, 1),
      r(current, ["date"], DAILY_METRICS, 600),
      r(previous, ["date"], DAILY_METRICS, 600),
      r(current, ["sessionDefaultChannelGroup"], SESSION_METRICS, 20),
      r(previous, ["sessionDefaultChannelGroup"], SESSION_METRICS, 20),
      r(current, ["sessionSourceMedium"], SESSION_METRICS, 15),
      r(current, ["landingPage"], SESSION_METRICS, 25),
      r(previous, ["landingPage"], SESSION_METRICS, 200),
      r(current, ["pagePath"], ["screenPageViews", "activeUsers"], 15),
      r(current, ["country"], ["activeUsers", "sessions"], 10),
      r(current, ["deviceCategory"], ["sessions", "activeUsers"], 5),
      r(current, ["eventName"], ["eventCount"], 200),
      r(previous, ["eventName"], ["eventCount"], 200),
    ]);
    d = {
      property,
      tot: tot[0]?.v ?? TOTAL_METRICS.map(() => 0),
      prevTot: prevTot[0]?.v ?? TOTAL_METRICS.map(() => 0),
      daily: fillDays(current, daily),
      prevDaily: fillDays(previous, prevDaily),
      channels,
      prevChannels: new Map(prevChannels.map((x) => [x.key, x.v])),
      sources,
      landing,
      prevLanding: new Map(prevLanding.map((x) => [x.key, x.v])),
      pages,
      countries,
      devices,
      events: new Map(events.map((x) => [x.key, x.v[0]])),
      prevEvents: new Map(prevEvents.map((x) => [x.key, x.v[0]])),
    };
  } catch (e) {
    return (
      <div className="space-y-6">
        {header}
        {filterBar}
        <Setup error={e instanceof Error ? e.message : String(e)} />
      </div>
    );
  }

  const [users, newUsers, sessions, engaged, avgTime, views, keyEvents] = d.tot;
  const [pUsers, , pSessions, pEngaged, pAvgTime, , pKeyEvents] = d.prevTot;
  const rate = sessions ? engaged / sessions : 0;
  const pRate = pSessions ? pEngaged / pSessions : 0;
  const ev = (k: string) => d.events.get(k) ?? 0;
  const pev = (k: string) => d.prevEvents.get(k) ?? 0;
  const bookingRate = ev("book_call_click")
    ? ev("book_call_complete") / ev("book_call_click")
    : 0;

  const labels = d.daily.map((x) => short(x.day));
  const points = d.daily.map((x) => ({
    title: long(x.day),
    rows: [
      ["Sessions", fmt.int(x.v[1])],
      ["Engaged sessions", fmt.int(x.v[2])],
      ["Key events", fmt.int(x.v[3])],
    ] as [string, string][],
  }));

  return (
    <div className="space-y-6">
      {header}
      {filterBar}
      <p className="text-xs text-slate-500">
        {span(current)} compared with {span(previous)} · {d.property.label}
      </p>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Visitors"
          value={fmt.int(users)}
          delta={pctChange(users, pUsers)}
          series={d.daily.map((x) => x.v[0])}
          hint={`${fmt.int(newUsers)} new`}
        />
        <StatCard
          label="Sessions"
          value={fmt.int(sessions)}
          delta={pctChange(sessions, pSessions)}
          series={d.daily.map((x) => x.v[1])}
        />
        <StatCard
          label="Engagement rate"
          value={fmt.pct(rate).replace(".00", "")}
          delta={(rate - pRate) * 100}
          deltaSuffix=" pts"
          hint="Stayed 10s+, saw 2+ pages or converted"
        />
        <StatCard
          label="Avg session time"
          value={duration(avgTime)}
          delta={pctChange(avgTime, pAvgTime)}
        />
        <StatCard
          label="Page views"
          value={fmt.int(views)}
          hint={
            sessions
              ? `${(views / sessions).toFixed(1)} per session`
              : undefined
          }
        />
        <StatCard
          label="Key events"
          value={fmt.int(keyEvents)}
          delta={pctChange(keyEvents, pKeyEvents)}
          series={d.daily.map((x) => x.v[3])}
          hint="Conversions marked in GA4"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Visitors per day"
          subtitle="Dashed line: previous period. Hover for details."
          className="lg:col-span-2"
        >
          <TrendChart
            labels={labels}
            series={d.daily.map((x) => x.v[0])}
            compare={d.prevDaily.map((x) => x.v[0])}
            seriesName="Visitors"
            points={points}
            height={220}
          />
        </Card>
        <Card
          title="What visitors did"
          subtitle="Site events, vs previous period"
        >
          <ul className="divide-y divide-slate-100">
            {EVENTS.map(([k, label, hint]) => (
              <li
                key={k}
                className="flex items-center justify-between gap-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800">{label}</p>
                  <p className="truncate text-[11px] text-slate-400">{hint}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-semibold tabular-nums">
                    {fmt.int(ev(k))}
                  </span>
                  <Delta value={pctChange(ev(k), pev(k))} />
                </div>
              </li>
            ))}
          </ul>
          {ev("book_call_click") ? (
            <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <b className="text-slate-900">
                {fmt.pct(bookingRate).replace(".00", "")}
              </b>{" "}
              of “Book a call” clicks ended in a booked call.
            </p>
          ) : null}
        </Card>
      </div>

      <Card
        title="Where visitors come from"
        subtitle="By channel, previous period in grey"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-3 font-medium">Channel</th>
                <th className="py-2 pr-3 text-right font-medium">Sessions</th>
                <th className="py-2 pr-3 text-right font-medium">Visitors</th>
                <th className="py-2 pr-3 text-right font-medium">Engagement</th>
                <th className="py-2 text-right font-medium">Key events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {d.channels.map((c) => {
                const p = d.prevChannels.get(c.key);
                return (
                  <tr key={c.key}>
                    <td className="py-2.5 pr-3 font-medium text-slate-800">
                      {c.key}
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">
                      {fmt.int(c.v[0])}{" "}
                      <span className="text-xs text-slate-400">
                        / {fmt.int(p?.[0] ?? 0)}
                      </span>{" "}
                      <Delta value={pctChange(c.v[0], p?.[0] ?? 0)} />
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">
                      {fmt.int(c.v[1])}
                    </td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">
                      {fmt.pct(c.v[2]).replace(".00", "")}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">
                      {fmt.int(c.v[3])}
                    </td>
                  </tr>
                );
              })}
              {d.channels.length === 0 ? <EmptyRow cols={5} /> : null}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Landing pages" subtitle="The first page of each visit">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-xs text-slate-500">
                <tr className="border-b border-slate-100">
                  <th className="py-2 pr-3 font-medium">Page</th>
                  <th className="py-2 pr-3 text-right font-medium">Sessions</th>
                  <th className="py-2 pr-3 text-right font-medium">
                    Engagement
                  </th>
                  <th className="py-2 text-right font-medium">Key events</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {d.landing.map((l) => {
                  const p = d.prevLanding.get(l.key);
                  return (
                    <tr key={l.key}>
                      <td className="max-w-[260px] truncate py-2 pr-3">
                        <a
                          href={`https://futuredentalprep.com${l.key === "(not set)" ? "" : l.key}`}
                          target="_blank"
                          className="text-slate-800 hover:text-[#1F5BD8]"
                        >
                          {l.key}
                        </a>
                      </td>
                      <td className="py-2 pr-3 text-right whitespace-nowrap tabular-nums">
                        {fmt.int(l.v[0])}{" "}
                        {p ? (
                          <Delta value={pctChange(l.v[0], p[0])} />
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-600">
                            new
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums">
                        {fmt.pct(l.v[2]).replace(".00", "")}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {fmt.int(l.v[3])}
                      </td>
                    </tr>
                  );
                })}
                {d.landing.length === 0 ? <EmptyRow cols={4} /> : null}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Sources" subtitle="Source / medium, by sessions">
          <BarList
            rows={d.sources.map((s) => ({
              label: s.key,
              value: s.v[0],
              sub: `${fmt.int(s.v[1])} visitors · ${fmt.pct(s.v[2]).replace(".00", "")} engaged · ${fmt.int(s.v[3])} key events`,
            }))}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Most viewed pages" subtitle="By page views">
          <BarList
            rows={d.pages.map((p) => ({
              label: p.key,
              value: p.v[0],
              sub: `${fmt.int(p.v[1])} visitors`,
            }))}
          />
        </Card>
        <Card title="Countries" subtitle="By visitors">
          <BarList
            rows={d.countries.map((c) => ({
              label: c.key,
              value: c.v[0],
              sub: `${fmt.int(c.v[1])} sessions`,
            }))}
          />
        </Card>
        <Card title="Devices" subtitle="By sessions">
          <BarList
            rows={d.devices.map((c) => ({
              label: c.key.charAt(0).toUpperCase() + c.key.slice(1),
              value: c.v[0],
              sub: `${fmt.int(c.v[1])} visitors`,
            }))}
          />
        </Card>
      </div>
    </div>
  );
}

function EmptyRow({ cols }: { cols: number }) {
  return (
    <tr>
      <td colSpan={cols} className="py-6 text-center text-sm text-slate-400">
        No data for this period and filter
      </td>
    </tr>
  );
}

function Setup({ error }: { error?: string }) {
  const email = serviceAccountEmail();
  return (
    <EmptyConnect title="Connect Google Analytics (one time, about 3 minutes)">
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Google Cloud Console (same project as Search Console) → APIs &amp;
          Services → Library → enable <b>Google Analytics Data API</b> and{" "}
          <b>Google Analytics Admin API</b>.
        </li>
        <li>
          Google Analytics → Admin (gear icon) →{" "}
          <b>Property access management</b> → <b>+</b> → Add users → paste{" "}
          <code className="rounded bg-slate-100 px-1 break-all">
            {email || "the service account email"}
          </code>{" "}
          → role <b>Viewer</b> → uncheck “Notify by email” → Add.
        </li>
        <li>Come back here and click Refresh.</li>
      </ol>
      {error ? (
        <p className="text-xs break-words text-rose-600">
          Google said: {error}
        </p>
      ) : null}
    </EmptyConnect>
  );
}
