import "server-only";
import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { type Range, serviceAccountAuth } from "@/lib/admin/gsc";
import { COUNTRY_OPTIONS } from "@/components/admin/dash/searchFilterOptions";

// Google Analytics 4 data for the admin Traffic page. Read-only, through the same service account as Search
// Console (GOOGLE_SERVICE_ACCOUNT_KEY). That account must be added in GA4 → Admin → Property access management
// as a Viewer, and the "Google Analytics Data API" must be enabled in its Google Cloud project.
// GA4_PROPERTY_ID (the number in GA4 → Admin → Property details) is optional: without it the first property the
// service account can see is used (needs the "Google Analytics Admin API" enabled too).

export const GA4_TAG = "ga4";
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const THREE_HOURS = 3 * 60 * 60;

export const ga4Configured = () =>
  Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim());

function auth() {
  const a = serviceAccountAuth(SCOPES);
  if (!a) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set.");
  return a;
}

/** "properties/123456789" from GA4_PROPERTY_ID, or the first property the service account can read. */
const propertyName = unstable_cache(
  async (): Promise<{ name: string; label: string }> => {
    const env = process.env.GA4_PROPERTY_ID?.trim().replace(
      /^properties\//,
      "",
    );
    if (env) return { name: `properties/${env}`, label: `Property ${env}` };
    const admin = google.analyticsadmin({ version: "v1beta", auth: auth() });
    const { data } = await admin.accountSummaries.list({ pageSize: 50 });
    for (const acc of data.accountSummaries ?? []) {
      const p = acc.propertySummaries?.[0];
      if (p?.property)
        return {
          name: p.property,
          label: `${p.displayName ?? p.property} (${acc.displayName ?? "account"})`,
        };
    }
    throw new Error(
      "The service account can't see any GA4 property yet. Add it as a Viewer in GA4 → Admin → Property access management.",
    );
  },
  ["ga4-property"],
  { tags: [GA4_TAG], revalidate: 24 * 60 * 60 },
);

/** The service account's email, shown in the setup steps (not a secret). */
export function serviceAccountEmail(): string {
  try {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.trim() ?? "";
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    return (JSON.parse(json) as { client_email?: string }).client_email ?? "";
  } catch {
    return "";
  }
}

export async function ga4Property() {
  return propertyName();
}

/** GA4 versions of the shared filter bar: page = page path contains, country = 3-letter code, device. */
export type GaFilters = { page?: string; country?: string; device?: string };

const GA_COUNTRY_NAMES: Record<string, string> = {
  ...Object.fromEntries(COUNTRY_OPTIONS),
  are: "United Arab Emirates",
};

function dimensionFilter(f?: GaFilters) {
  if (!f) return undefined;
  const exprs: {
    filter: {
      fieldName: string;
      stringFilter: {
        matchType: string;
        value: string;
        caseSensitive: boolean;
      };
    };
  }[] = [];
  if (f.page)
    exprs.push({
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "CONTAINS",
          value: f.page,
          caseSensitive: false,
        },
      },
    });
  if (f.country && GA_COUNTRY_NAMES[f.country])
    exprs.push({
      filter: {
        fieldName: "country",
        stringFilter: {
          matchType: "EXACT",
          value: GA_COUNTRY_NAMES[f.country],
          caseSensitive: false,
        },
      },
    });
  if (f.device)
    exprs.push({
      filter: {
        fieldName: "deviceCategory",
        stringFilter: {
          matchType: "EXACT",
          value: f.device.toLowerCase(),
          caseSensitive: false,
        },
      },
    });
  return exprs.length ? { andGroup: { expressions: exprs } } : undefined;
}

export type GaRow = { key: string; v: number[] };

/**
 * One GA4 report. Rows come back as { key: dimension value(s), v: metric values in the order asked }.
 * Sorted by the first metric, largest first (or by date when the dimension is "date").
 */
export const gaReport = unstable_cache(
  async (
    range: Range,
    dimensions: string[],
    metrics: string[],
    limit: number,
    filters?: GaFilters,
  ): Promise<GaRow[]> => {
    const { name } = await propertyName();
    const api = google.analyticsdata({ version: "v1beta", auth: auth() });
    const { data } = await api.properties.runReport({
      property: name,
      requestBody: {
        dateRanges: [{ startDate: range.start, endDate: range.end }],
        dimensions: dimensions.map((d) => ({ name: d })),
        metrics: metrics.map((m) => ({ name: m })),
        dimensionFilter: dimensionFilter(filters),
        limit: String(limit),
        orderBys:
          dimensions[0] === "date"
            ? [{ dimension: { dimensionName: "date" } }]
            : [{ metric: { metricName: metrics[0] }, desc: true }],
      },
    });
    return (data.rows ?? []).map((r) => ({
      key: (r.dimensionValues ?? []).map((d) => d.value ?? "").join(" / "),
      v: (r.metricValues ?? []).map((m) => Number(m.value ?? 0)),
    }));
  },
  ["ga4-report"],
  { tags: [GA4_TAG], revalidate: THREE_HOURS },
);

/** GA4 "20261112" → "2026-11-12". */
export const gaDate = (d: string) =>
  d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}` : d;
