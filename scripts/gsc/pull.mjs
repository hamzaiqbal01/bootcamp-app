import fs from "node:fs";
import path from "node:path";
import { ensureDir, loadAuthorizedClient, OUT_DIR, searchConsole } from "./config.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  }),
);

const WINDOW = Number(args.window ?? 7);
const LAG_DAYS = Number(args.lag ?? 3);
const MIN_IMPRESSIONS = Number(args["min-impressions"] ?? 50);
const ROW_LIMIT = Number(args.rows ?? 500);

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function shiftDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

const end = shiftDays(new Date(), -LAG_DAYS);
const ranges = {
  current: { startDate: isoDate(shiftDays(end, -(WINDOW - 1))), endDate: isoDate(end) },
  previous: {
    startDate: isoDate(shiftDays(end, -(WINDOW * 2 - 1))),
    endDate: isoDate(shiftDays(end, -WINDOW)),
  },
  last28: { startDate: isoDate(shiftDays(end, -27)), endDate: isoDate(end) },
};

const api = searchConsole(loadAuthorizedClient());

async function resolveSite() {
  if (args.site) return args.site;
  if (process.env.GSC_SITE_URL) return process.env.GSC_SITE_URL;

  const { data } = await api.sites.list();
  const sites = (data.siteEntry ?? []).map((s) => s.siteUrl);
  if (sites.length === 1) return sites[0];

  throw new Error(
    `Multiple properties found. Pass one explicitly:\n` +
      sites.map((s) => `  npm run gsc:pull -- --site="${s}"`).join("\n"),
  );
}

async function query(siteUrl, { startDate, endDate }, dimensions) {
  const { data } = await api.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit: ROW_LIMIT },
  });
  return (data.rows ?? []).map((row) => ({
    key: row.keys.join(" | "),
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
}

function totals(rows) {
  const clicks = rows.reduce((sum, r) => sum + r.clicks, 0);
  const impressions = rows.reduce((sum, r) => sum + r.impressions, 0);
  const weightedPosition = rows.reduce((sum, r) => sum + r.position * r.impressions, 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weightedPosition / impressions : 0,
  };
}

const pct = (value) => `${(value * 100).toFixed(2)}%`;
const pos = (value) => value.toFixed(1);

function delta(current, previous, format = (v) => String(v)) {
  const diff = current - previous;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${format(diff)}`;
}

function comparisonTable(currentRows, previousRows, label, limit = 15) {
  const prev = new Map(previousRows.map((r) => [r.key, r]));
  const rows = [...currentRows]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);

  const lines = [
    `| ${label} | Clicks | Δ | Impr | Δ | CTR | Δ pts | Pos | Δ |`,
    "|---|---|---|---|---|---|---|---|---|",
  ];

  for (const row of rows) {
    const before = prev.get(row.key) ?? { clicks: 0, impressions: 0, ctr: 0, position: row.position };
    lines.push(
      `| ${row.key} | ${row.clicks} | ${delta(row.clicks, before.clicks)} | ${row.impressions} | ` +
        `${delta(row.impressions, before.impressions)} | ${pct(row.ctr)} | ` +
        `${delta(row.ctr * 100, before.ctr * 100, (v) => v.toFixed(2))} | ${pos(row.position)} | ` +
        `${delta(row.position, before.position, (v) => v.toFixed(1))} |`,
    );
  }

  return lines.join("\n");
}

function killList(rows, label) {
  const flagged = rows
    .filter((r) => r.impressions >= MIN_IMPRESSIONS && r.ctr < 0.015 && r.position <= 12)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  if (flagged.length === 0) return `_No ${label} below the CTR threshold._`;

  return [
    `| ${label} | Impr | CTR | Pos |`,
    "|---|---|---|---|",
    ...flagged.map((r) => `| ${r.key} | ${r.impressions} | ${pct(r.ctr)} | ${pos(r.position)} |`),
  ].join("\n");
}

function pageQueryBreakdown(rows, limitPerPage = 10) {
  const pages = new Map();

  for (const row of rows) {
    const separator = row.key.indexOf(" | ");
    const page = row.key.slice(0, separator);
    const queryText = row.key.slice(separator + 3);
    if (!pages.has(page)) pages.set(page, []);
    pages.get(page).push({ ...row, key: queryText });
  }

  return [...pages.entries()]
    .map(([page, queries]) => ({
      page,
      impressions: queries.reduce((sum, row) => sum + row.impressions, 0),
      queries: queries.sort((a, b) => b.impressions - a.impressions).slice(0, limitPerPage),
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map(
      ({ page, queries }) =>
        `### ${page}\n\n` +
        [
          "| Query | Clicks | Impr | CTR | Pos |",
          "|---|---|---|---|---|",
          ...queries.map(
            (row) =>
              `| ${row.key} | ${row.clicks} | ${row.impressions} | ${pct(row.ctr)} | ${pos(row.position)} |`,
          ),
        ].join("\n"),
    )
    .join("\n\n");
}

const siteUrl = await resolveSite();

const [pagesNow, pagesPrev, pages28, queriesNow, queriesPrev, queries28, pageQueries28] = await Promise.all([
  query(siteUrl, ranges.current, ["page"]),
  query(siteUrl, ranges.previous, ["page"]),
  query(siteUrl, ranges.last28, ["page"]),
  query(siteUrl, ranges.current, ["query"]),
  query(siteUrl, ranges.previous, ["query"]),
  query(siteUrl, ranges.last28, ["query"]),
  query(siteUrl, ranges.last28, ["page", "query"]),
]);

const now = totals(pagesNow);
const before = totals(pagesPrev);

const report = `# Search Console report — ${siteUrl}

Generated ${isoDate(new Date())} · data through ${ranges.current.endDate} (GSC lags ~${LAG_DAYS} days)

## Site pulse — last ${WINDOW} days vs previous ${WINDOW}

| Metric | ${ranges.current.startDate} → ${ranges.current.endDate} | ${ranges.previous.startDate} → ${ranges.previous.endDate} | Change |
|---|---|---|---|
| Clicks | ${now.clicks} | ${before.clicks} | ${delta(now.clicks, before.clicks)} |
| Impressions | ${now.impressions} | ${before.impressions} | ${delta(now.impressions, before.impressions)} |
| CTR | ${pct(now.ctr)} | ${pct(before.ctr)} | ${delta(now.ctr * 100, before.ctr * 100, (v) => v.toFixed(2))} pts |
| Avg position | ${pos(now.position)} | ${pos(before.position)} | ${delta(now.position, before.position, (v) => v.toFixed(1))} |

## Top pages (${WINDOW}d, vs previous ${WINDOW}d)

${comparisonTable(pagesNow, pagesPrev, "Page")}

## Top queries (${WINDOW}d, vs previous ${WINDOW}d)

${comparisonTable(queriesNow, queriesPrev, "Query")}

## CTR kill-list — 28 days (impressions ≥ ${MIN_IMPRESSIONS}, CTR < 1.5%, position ≤ 12)

### Pages

${killList(pages28, "Page")}

### Queries

${killList(queries28, "Query")}

## Query mapping by page — 28 days

${pageQueryBreakdown(pageQueries28)}
`;

ensureDir(OUT_DIR);
const stamp = isoDate(new Date());
const mdPath = path.join(OUT_DIR, `report-${stamp}.md`);
const jsonPath = path.join(OUT_DIR, `raw-${stamp}.json`);

fs.writeFileSync(mdPath, report);
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    { siteUrl, ranges, pagesNow, pagesPrev, pages28, queriesNow, queriesPrev, queries28, pageQueries28 },
    null,
    2,
  ),
);

console.log(report);
console.log(`\nSaved:\n  ${mdPath}\n  ${jsonPath}`);
