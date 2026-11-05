// Google Analytics 4 helpers. The tag only loads on the real domain (see components/analytics/GoogleAnalytics),
// so on localhost and Vercel preview URLs these calls do nothing.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-ZXVMWQQ01M";

export const GA_HOSTS = ["futuredentalprep.com", "www.futuredentalprep.com"];

/** Set by proxy.ts from Vercel's visitor-country header: "eu" for the EEA, UK and Switzerland. */
export const REGION_COOKIE = "fdp_region";
/** The visitor's cookie choice on the consent banner: "granted" or "denied". */
export const CONSENT_KEY = "fdp_consent";

// EU 27 + Iceland, Liechtenstein, Norway (EEA) + United Kingdom + Switzerland.
export const CONSENT_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
]);

type Params = Record<string, string | number | boolean | undefined>;

/** Send a GA4 event, e.g. track("generate_lead", { method: "contact_form" }). */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (!gtag) return;
  gtag("event", event, { page_path: window.location.pathname, ...params });
}

/** A lead from any form or booking; also marked as a key event in GA4. */
export function trackLead(method: string, params: Params = {}) {
  track("generate_lead", { method, ...params });
}
