import "server-only";
import fs from "node:fs";
import path from "node:path";
import { google, type searchconsole_v1 } from "googleapis";
import { unstable_cache } from "next/cache";

// Google Search Console data for the admin dashboard. Read-only.
//
// Production (Vercel): a Google service account. Put its JSON key in GOOGLE_SERVICE_ACCOUNT_KEY (raw JSON or
// base64), and add the service account's email in Search Console → Settings → Users and permissions as a
// "Restricted" user. Development: if that variable is missing, the local OAuth login from `npm run gsc:auth`
// (.gsc/credentials.json + .gsc/token.json) is used instead.

export const GSC_SITE =
  process.env.GSC_SITE_URL ?? "sc-domain:futuredentalprep.com";
export const SITE_ORIGIN = "https://futuredentalprep.com";
export const GSC_TAG = "gsc";
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

type Auth =
  | InstanceType<typeof google.auth.GoogleAuth>
  | InstanceType<typeof google.auth.OAuth2>;

/** Google service account from GOOGLE_SERVICE_ACCOUNT_KEY (also used for GA4). */
export function serviceAccountAuth(scopes: string[] = SCOPES): Auth | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim();
  if (!raw) return null;
  const json = raw.startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  const credentials = JSON.parse(json) as {
    client_email: string;
    private_key: string;
  };
  return new google.auth.GoogleAuth({ credentials, scopes });
}

function localOAuth(): Auth | null {
  if (process.env.NODE_ENV === "production") return null;
  const dir = path.join(process.cwd(), ".gsc");
  const credsPath = path.join(dir, "credentials.json");
  const tokenPath = path.join(dir, "token.json");
  if (!fs.existsSync(credsPath) || !fs.existsSync(tokenPath)) return null;
  const raw = JSON.parse(fs.readFileSync(credsPath, "utf8"));
  const c = raw.installed ?? raw.web ?? raw;
  const client = new google.auth.OAuth2(c.client_id, c.client_secret);
  client.setCredentials(JSON.parse(fs.readFileSync(tokenPath, "utf8")));
  return client;
}

export type GscConnection = "service-account" | "local" | "none";

export function gscConnection(): GscConnection {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim()) return "service-account";
  if (localOAuth()) return "local";
  return "none";
}

function api(): searchconsole_v1.Searchconsole {
  const auth = serviceAccountAuth() ?? localOAuth();
  if (!auth)
    throw new Error(
      "Search Console is not connected. Set GOOGLE_SERVICE_ACCOUNT_KEY.",
    );
  return google.searchconsole({ version: "v1", auth });
}

export type Row = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};
export type Range = { start: string; end: string };

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Last `days` days ending 2 days ago (Search Console data is not final for the most recent days), plus the
 *  period of the same length right before it. */
export function ranges(days: number): { current: Range; previous: Range } {
  const end = new Date(Date.now() - 2 * 864e5);
  const start = new Date(end.getTime() - (days - 1) * 864e5);
  const prevEnd = new Date(start.getTime() - 864e5);
  const prevStart = new Date(prevEnd.getTime() - (days - 1) * 864e5);
  return {
    current: { start: iso(start), end: iso(end) },
    previous: { start: iso(prevStart), end: iso(prevEnd) },
  };
}

/** A chosen start/end plus the period of the same length right before it. */
export function rangeBetween(
  start: string,
  end: string,
): {
  current: Range;
  previous: Range;
} {
  const a = Date.parse(`${start}T00:00:00Z`);
  const b = Date.parse(`${end}T00:00:00Z`);
  const days = Math.round((b - a) / 864e5) + 1;
  const prevEnd = new Date(a - 864e5);
  const prevStart = new Date(prevEnd.getTime() - (days - 1) * 864e5);
  return {
    current: { start, end },
    previous: { start: iso(prevStart), end: iso(prevEnd) },
  };
}

/** Like the filter bar in Search Console. query/page match "contains"; country is a 3-letter code (usa);
 *  device is DESKTOP, MOBILE or TABLET. */
export type Filters = {
  query?: string;
  page?: string;
  country?: string;
  device?: string;
};

function filterGroups(f?: Filters) {
  if (!f) return {};
  const filters: searchconsole_v1.Schema$ApiDimensionFilter[] = [];
  if (f.query)
    filters.push({
      dimension: "query",
      operator: "contains",
      expression: f.query,
    });
  if (f.page)
    filters.push({
      dimension: "page",
      operator: "contains",
      expression: f.page,
    });
  if (f.country)
    filters.push({
      dimension: "country",
      operator: "equals",
      expression: f.country,
    });
  if (f.device)
    filters.push({
      dimension: "device",
      operator: "equals",
      expression: f.device,
    });
  return filters.length ? { dimensionFilterGroups: [{ filters }] } : {};
}

async function query(
  range: Range,
  dimensions: string[],
  rowLimit = 250,
  filters?: Filters,
): Promise<Row[]> {
  const { data } = await api().searchanalytics.query({
    siteUrl: GSC_SITE,
    requestBody: {
      startDate: range.start,
      endDate: range.end,
      dimensions,
      rowLimit,
      dataState: "all",
      ...filterGroups(filters),
    },
  });
  return (data.rows ?? []).map((r) => ({
    key: (r.keys ?? []).join(" | "),
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

const SIX_HOURS = 6 * 60 * 60;

/** One row per day. */
export const getDaily = unstable_cache(
  (range: Range, filters?: Filters) => query(range, ["date"], 500, filters),
  ["gsc-daily"],
  {
    tags: [GSC_TAG],
    revalidate: SIX_HOURS,
  },
);

/** Top rows for one dimension, with optional Search Console-style filters. */
export const getTop = unstable_cache(
  (
    range: Range,
    dimension: "page" | "query" | "country" | "device",
    rowLimit: number,
    filters?: Filters,
  ) => query(range, [dimension], rowLimit, filters),
  ["gsc-top"],
  { tags: [GSC_TAG], revalidate: SIX_HOURS },
);

export type IndexStatus = {
  path: string;
  verdict: string;
  coverage: string;
  lastCrawl: string | null;
};

/** Google's index status for a list of paths (URL Inspection API, 2,000 checks a day per site). */
export const getIndexStatus = unstable_cache(
  async (paths: string[]): Promise<IndexStatus[]> => {
    const client = api();
    const check = async (p: string): Promise<IndexStatus> => {
      try {
        const { data } = await client.urlInspection.index.inspect({
          requestBody: { inspectionUrl: SITE_ORIGIN + p, siteUrl: GSC_SITE },
        });
        const r = data.inspectionResult?.indexStatusResult;
        return {
          path: p,
          verdict: r?.verdict ?? "UNKNOWN",
          coverage: r?.coverageState ?? "Unknown",
          lastCrawl: r?.lastCrawlTime ?? null,
        };
      } catch {
        return {
          path: p,
          verdict: "ERROR",
          coverage: "Could not check",
          lastCrawl: null,
        };
      }
    };
    // A few at a time: much faster than one by one, gentle on the API quota.
    const out: IndexStatus[] = [];
    for (let i = 0; i < paths.length; i += 6) {
      out.push(...(await Promise.all(paths.slice(i, i + 6).map(check))));
    }
    return out;
  },
  ["gsc-index"],
  { tags: [GSC_TAG], revalidate: 24 * 60 * 60 },
);

export function totals(rows: Row[]) {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const position = impressions
    ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions
    : 0;
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position,
  };
}

export function shortPath(url: string) {
  return url.replace(SITE_ORIGIN, "") || "/";
}
