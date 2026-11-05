// Google Analytics 4 helpers. The tag only loads on the real domain (see components/analytics/GoogleAnalytics),
// so on localhost and Vercel preview URLs these calls do nothing.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-ZXVMWQQ01M";

export const GA_HOSTS = ["futuredentalprep.com", "www.futuredentalprep.com"];

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
