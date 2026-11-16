import type { ReactNode } from "react";

// Small server-rendered building blocks for the admin dashboard: cards, stat tiles and SVG charts (no chart
// library, so pages stay fast and work without JavaScript).

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-slate-200/80 ${className}`}
    >
      {title ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Delta({
  value,
  invert = false,
  suffix = "%",
}: {
  value: number | null;
  invert?: boolean;
  suffix?: string;
}) {
  if (value === null || !Number.isFinite(value))
    return <span className="text-xs text-slate-400">—</span>;
  const good = invert ? value < 0 : value > 0;
  const flat = Math.abs(value) < 0.05;
  const cls = flat
    ? "bg-slate-100 text-slate-600"
    : good
      ? "bg-emerald-50 text-emerald-700"
      : "bg-rose-50 text-rose-700";
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${cls}`}
    >
      {flat ? "±" : value > 0 ? "▲" : "▼"}{" "}
      {Math.abs(value).toFixed(suffix === "%" ? 0 : 1)}
      {suffix}
    </span>
  );
}

export function StatCard({
  label,
  value,
  delta,
  invert,
  deltaSuffix,
  hint,
  series,
}: {
  label: string;
  value: string;
  delta?: number | null;
  invert?: boolean;
  deltaSuffix?: string;
  hint?: string;
  series?: number[];
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-slate-200/80">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        {delta !== undefined ? (
          <Delta value={delta} invert={invert} suffix={deltaSuffix} />
        ) : null}
      </div>
      <p className="mt-2 text-[26px] leading-none font-bold tracking-tight text-slate-900 tabular-nums">
        {value}
      </p>
      {series && series.length > 1 ? (
        <Sparkline values={series} className="mt-3" />
      ) : null}
      {hint ? <p className="mt-2 text-[11px] text-slate-400">{hint}</p> : null}
    </div>
  );
}

export function Sparkline({
  values,
  className = "",
}: {
  values: number[];
  className?: string;
}) {
  const w = 160,
    h = 34;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - (v / max) * (h - 4) - 2,
  ]);
  const line = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`h-8 w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon
        points={`0,${h} ${line} ${w},${h}`}
        fill="#1F5BD8"
        opacity="0.08"
      />
      <polyline
        points={line}
        fill="none"
        stroke="#1F5BD8"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export { TrendChart } from "./TrendChart";
export type { TrendPoint } from "./TrendChart";

/** Hover-card content for daily Search Console rows: full date plus the day's other numbers. */
export function dayPoints(
  rows: {
    key: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[],
  skip: "clicks" | "impressions",
) {
  return rows.map((r) => ({
    title: new Date(`${r.key}T00:00:00Z`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }),
    rows: [
      ...(skip === "clicks" ? [] : [["Clicks", fmt.int(r.clicks)]]),
      ...(skip === "impressions"
        ? []
        : [["Impressions", fmt.int(r.impressions)]]),
      ["CTR", fmt.pct(r.ctr)],
      ["Avg position", fmt.pos(r.position)],
    ] as [string, string][],
  }));
}

/** Horizontal bars for a ranked list (top pages, sources...). */
export function BarList({
  rows,
  valueLabel,
}: {
  rows: { label: ReactNode; value: number; sub?: ReactNode; href?: string }[];
  valueLabel?: (n: number) => string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  if (!rows.length)
    return (
      <p className="py-6 text-center text-sm text-slate-400">No data yet</p>
    );
  return (
    <ul className="space-y-2">
      {rows.map((r, i) => (
        <li key={i} className="relative">
          <div
            className="absolute inset-y-0 left-0 rounded-lg bg-[#EEF3FE]"
            style={{ width: `${(r.value / max) * 100}%` }}
            aria-hidden
          />
          <div className="relative flex items-center justify-between gap-3 px-2.5 py-1.5 text-sm">
            <div className="min-w-0">
              <div className="truncate font-medium text-slate-800">
                {r.label}
              </div>
              {r.sub ? (
                <div className="truncate text-[11px] text-slate-500">
                  {r.sub}
                </div>
              ) : null}
            </div>
            <span className="shrink-0 font-semibold text-slate-900 tabular-nums">
              {valueLabel ? valueLabel(r.value) : r.value}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Badge({
  tone = "slate",
  children,
}: {
  tone?: "green" | "amber" | "red" | "blue" | "slate";
  children: ReactNode;
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    blue: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyConnect({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
      <p className="font-semibold text-slate-900">{title}</p>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}

export const fmt = {
  int: (n: number) => Math.round(n).toLocaleString("en-US"),
  pct: (n: number) => `${(n * 100).toFixed(2)}%`,
  pos: (n: number) => n.toFixed(1),
};

export function pctChange(now: number, before: number): number | null {
  if (!before) return now ? 100 : null;
  return ((now - before) / before) * 100;
}
