import type { Metadata } from "next";
import Link from "next/link";
import {
  ConnectionNote,
  GscNotConnected,
  RefreshGscButton,
} from "@/components/admin/dash/gscShared";
import {
  BarList,
  Card,
  dayPoints,
  fmt,
  PageHeader,
  pctChange,
  StatCard,
  TrendChart,
} from "@/components/admin/dash/ui";
import { LocalTime } from "@/components/admin/LeadBits";
import { requireAdmin } from "@/lib/admin/session";
import {
  getDaily,
  getTop,
  gscConnection,
  type GscConnection,
  type Range,
  ranges,
  type Row,
  shortPath,
  totals,
} from "@/lib/admin/gsc";
import {
  countLeadsByStatus,
  leadActivitySince,
  listLeads,
} from "@/lib/leads/server";
import {
  LEAD_SOURCE_LABELS,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_STYLES,
} from "@/lib/leads/shared";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Overview" };

const DAY = 864e5;
const dayKey = (d: Date) => d.toISOString().slice(0, 10);
const short = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

type SearchOk = {
  current: Range;
  daily: Row[];
  prevDaily: Row[];
  pages: Row[];
  queries: Row[];
};

async function searchData(): Promise<{
  connection: GscConnection;
  ok?: SearchOk;
  error?: string;
}> {
  const connection = gscConnection();
  if (connection === "none") return { connection };
  try {
    const { current, previous } = ranges(28);
    const [daily, prevDaily, pages, queries] = await Promise.all([
      getDaily(current),
      getDaily(previous),
      getTop(current, "page", 8),
      getTop(current, "query", 8),
    ]);
    return { connection, ok: { current, daily, prevDaily, pages, queries } };
  } catch (e) {
    return { connection, error: e instanceof Error ? e.message : String(e) };
  }
}

function currentTime() {
  return Date.now();
}

export default async function AdminOverviewPage() {
  await requireAdmin();
  if (!isSupabaseConfigured()) return null;

  const now = currentTime();
  const since = new Date(now - 60 * DAY).toISOString();
  const [activity, counts, recent, search] = await Promise.all([
    leadActivitySince(since),
    countLeadsByStatus(),
    listLeads({ page: 1, pageSize: 6, sort: "newest" }),
    searchData(),
  ]);

  // Leads: last 30 days vs the 30 before, excluding tutor applications and spam.
  const real = activity.filter(
    (l) => l.source !== "tutor-apply" && l.status !== "spam",
  );
  const cut = now - 30 * DAY;
  const last30 = real.filter((l) => Date.parse(l.created_at) >= cut);
  const prev30 = real.filter((l) => Date.parse(l.created_at) < cut);
  const perDay = Array.from({ length: 30 }, (_, i) => {
    const key = dayKey(new Date(now - (29 - i) * DAY));
    return last30.filter((l) => l.created_at.slice(0, 10) === key).length;
  });
  const bySource = Object.entries(
    last30.reduce<Record<string, number>>(
      (acc, l) => ((acc[l.source] = (acc[l.source] ?? 0) + 1), acc),
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);

  const ok = search.ok;
  const t = ok ? totals(ok.daily) : null;
  const p = ok ? totals(ok.prevDaily) : null;
  const daily = ok
    ? [...ok.daily].sort((a, b) => a.key.localeCompare(b.key))
    : [];
  const prevDaily = ok
    ? [...ok.prevDaily].sort((a, b) => a.key.localeCompare(b.key))
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        subtitle={
          ok
            ? `Leads: last 30 days. Google search: ${short(ok.current.start)} – ${short(ok.current.end)} vs the 28 days before.`
            : "Leads from the last 30 days."
        }
        actions={ok ? <RefreshGscButton /> : null}
      />
      {"connection" in search ? (
        <ConnectionNote connection={search.connection} />
      ) : null}

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Leads (30 days)"
          value={fmt.int(last30.length)}
          delta={pctChange(last30.length, prev30.length)}
          series={perDay}
          hint={`${prev30.length} in the 30 days before`}
        />
        <StatCard
          label="New leads waiting"
          value={fmt.int(counts.new)}
          hint="Status: New"
        />
        {t && p ? (
          <>
            <StatCard
              label="Google clicks (28 days)"
              value={fmt.int(t.clicks)}
              delta={pctChange(t.clicks, p.clicks)}
              series={daily.map((d) => d.clicks)}
            />
            <StatCard
              label="Google impressions"
              value={fmt.int(t.impressions)}
              delta={pctChange(t.impressions, p.impressions)}
              series={daily.map((d) => d.impressions)}
            />
          </>
        ) : (
          <>
            <StatCard
              label="Google clicks"
              value="—"
              hint="Connect Search Console"
            />
            <StatCard
              label="Google impressions"
              value="—"
              hint="Connect Search Console"
            />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Google clicks per day"
          subtitle="Blue: last 28 days · dashed: the 28 days before"
          className="lg:col-span-2"
          action={
            t && p ? (
              <div className="text-right text-xs text-slate-500">
                CTR <b className="text-slate-900">{fmt.pct(t.ctr)}</b> · Avg
                position <b className="text-slate-900">{fmt.pos(t.position)}</b>
              </div>
            ) : null
          }
        >
          {ok ? (
            <TrendChart
              labels={daily.map((d) => short(d.key))}
              series={daily.map((d) => d.clicks)}
              compare={prevDaily.map((d) => d.clicks)}
              points={dayPoints(daily, "clicks")}
            />
          ) : (
            <GscNotConnected error={search.error} />
          )}
        </Card>

        <Card title="Leads by source" subtitle="Last 30 days">
          <BarList
            rows={bySource.map(([s, n]) => ({
              label:
                LEAD_SOURCE_LABELS[s as keyof typeof LEAD_SOURCE_LABELS] ?? s,
              value: n,
            }))}
          />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {(["new", "contacted", "converted"] as const).map((s) => (
              <Link
                key={s}
                href={`/admin/leads?status=${s}`}
                className="rounded-xl bg-slate-50 px-2 py-2 hover:bg-slate-100"
              >
                <div className="text-lg font-bold text-slate-900 tabular-nums">
                  {counts[s]}
                </div>
                <div className="text-[11px] text-slate-500">
                  {LEAD_STATUS_LABELS[s]}
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Top pages on Google"
          subtitle="By clicks, last 28 days"
          action={
            <Link
              href="/admin/search"
              className="text-xs font-semibold text-[#1F5BD8] hover:underline"
            >
              Search report →
            </Link>
          }
        >
          {ok ? (
            <BarList
              rows={ok.pages.map((r) => ({
                label: shortPath(r.key),
                value: r.clicks,
                sub: `${fmt.int(r.impressions)} impressions · position ${fmt.pos(r.position)}`,
              }))}
            />
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              Connect Search Console
            </p>
          )}
        </Card>

        <Card title="Top Google searches" subtitle="By clicks, last 28 days">
          {ok ? (
            <BarList
              rows={ok.queries.map((r) => ({
                label: r.key,
                value: r.clicks,
                sub: `${fmt.int(r.impressions)} impressions · position ${fmt.pos(r.position)}`,
              }))}
            />
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              Connect Search Console
            </p>
          )}
        </Card>

        <Card
          title="Latest leads"
          action={
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#1F5BD8] hover:underline"
            >
              All leads →
            </Link>
          }
        >
          <ul className="divide-y divide-slate-100">
            {recent.leads.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-start justify-between gap-3 py-2.5 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {lead.name || "(no name)"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {lead.subject || lead.message || "—"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${LEAD_STATUS_STYLES[lead.status]}`}
                    >
                      {LEAD_STATUS_LABELS[lead.status]}
                    </span>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {lead.source === "sheet" ? (
                        "From sheet"
                      ) : (
                        <LocalTime iso={lead.created_at} />
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {recent.leads.length === 0 ? (
              <li className="py-6 text-center text-sm text-slate-400">
                No leads yet
              </li>
            ) : null}
          </ul>
        </Card>
      </div>
    </div>
  );
}
