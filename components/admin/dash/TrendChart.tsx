"use client";

import { useState } from "react";

export type TrendPoint = {
  /** Heading of the hover card, e.g. "Thu, Nov 12, 2026". */
  title: string;
  /** Extra lines shown in the hover card, e.g. [["Impressions", "1,721"], ["CTR", "1.16%"]]. */
  rows?: [string, string][];
};

const fmtNum = (n: number, compact?: boolean) =>
  compact && n >= 1000
    ? `${(n / 1000).toFixed(1)}k`
    : Math.round(n).toLocaleString("en-US");

/** Area/line chart for a daily series, with an optional dashed comparison series. Hover (or touch) shows
 *  the numbers for that day. */
export function TrendChart({
  labels,
  series,
  compare,
  height = 220,
  compact,
  seriesName = "Clicks",
  compareName = "Previous period",
  points,
}: {
  labels: string[];
  series: number[];
  compare?: number[];
  height?: number;
  /** Axis/tooltip numbers as 1.2k. */
  compact?: boolean;
  seriesName?: string;
  compareName?: string;
  points?: TrendPoint[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const w = 720,
    h = height,
    padL = 40,
    padR = 8,
    padB = 26,
    padT = 10;
  const n = series.length;
  const all = [...series, ...(compare ?? [])];
  const max = Math.max(...all, 1) * 1.1;
  const x = (i: number) => padL + (i / Math.max(n - 1, 1)) * (w - padL - padR);
  const y = (v: number) => padT + (1 - v / max) * (h - padT - padB);
  const path = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const ticks = [0, 0.5, 1].map((t) => max * t);
  const every = Math.max(1, Math.ceil(labels.length / 7));

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!n) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * w;
    const i = Math.round(((sx - padL) / (w - padL - padR)) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, i)));
  }

  const hx = hover === null ? 0 : (x(hover) / w) * 100;
  const prevVal = hover !== null ? compare?.[hover] : undefined;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full touch-pan-y select-none"
        role="img"
        aria-label="Trend chart"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={padL}
              x2={w - padR}
              y1={y(t)}
              y2={y(t)}
              stroke="#EEF2F7"
            />
            <text
              x={padL - 6}
              y={y(t) + 4}
              textAnchor="end"
              fontSize="10"
              fill="#94A3B8"
            >
              {fmtNum(t, compact)}
            </text>
          </g>
        ))}
        {compare ? (
          <path
            d={path(compare)}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        ) : null}
        {n ? (
          <>
            <path
              d={`${path(series)} L${x(n - 1)},${y(0)} L${x(0)},${y(0)} Z`}
              fill="#1F5BD8"
              opacity="0.08"
            />
            <path
              d={path(series)}
              fill="none"
              stroke="#1F5BD8"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </>
        ) : null}
        {labels.map((l, i) =>
          i % every === 0 || i === labels.length - 1 ? (
            <text
              key={i}
              x={x(i)}
              y={h - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#94A3B8"
            >
              {l}
            </text>
          ) : null,
        )}
        {hover !== null ? (
          <g pointerEvents="none">
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={padT}
              y2={h - padB}
              stroke="#94A3B8"
              strokeDasharray="3 3"
            />
            {prevVal !== undefined ? (
              <circle
                cx={x(hover)}
                cy={y(prevVal)}
                r="3.5"
                fill="white"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
            ) : null}
            <circle
              cx={x(hover)}
              cy={y(series[hover])}
              r="4.5"
              fill="#1F5BD8"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        ) : null}
        {/* Transparent layer so the whole plot area catches the pointer. */}
        <rect x={0} y={0} width={w} height={h} fill="transparent" />
      </svg>

      {hover !== null ? (
        <div
          className="pointer-events-none absolute top-0 z-10 min-w-[170px] rounded-xl bg-[#0B1B3A] px-3 py-2 text-xs text-white shadow-lg"
          style={{
            left: `${hx}%`,
            transform: `translateX(${hx > 60 ? "calc(-100% - 12px)" : "12px"})`,
          }}
        >
          <div className="mb-1 font-semibold">
            {points?.[hover]?.title ?? labels[hover]}
          </div>
          <Line
            dot="bg-[#5B8CFF]"
            label={seriesName}
            value={fmtNum(series[hover])}
          />
          {points?.[hover]?.rows?.map(([k, v]) => (
            <Line key={k} label={k} value={v} />
          ))}
          {prevVal !== undefined ? (
            <Line
              dot="bg-slate-400"
              label={compareName}
              value={fmtNum(prevVal)}
              muted
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Line({
  label,
  value,
  dot,
  muted,
}: {
  label: string;
  value: string;
  dot?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-0.5 ${muted ? "text-slate-300" : ""}`}
    >
      <span className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot ?? "bg-transparent"}`} />
        {label}
      </span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}
