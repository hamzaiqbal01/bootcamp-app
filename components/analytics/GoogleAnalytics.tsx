"use client";

import Script from "next/script";
import { useEffect } from "react";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import {
  CONSENT_KEY,
  GA_HOSTS,
  GA_MEASUREMENT_ID,
  REGION_COOKIE,
  track,
} from "@/lib/analytics";

// GA4 via gtag.js, loaded after the page is interactive and only on the real domain, so local testing and
// Vercel preview URLs never send data. Page views on client-side navigation come from GA4's enhanced
// measurement ("page changes based on browser history events"), which is on by default.
//
// Consent: for visitors from the EEA, UK and Switzerland (region cookie "eu", set by proxy.ts) GA is not
// loaded at all until they choose Accept on the cookie banner, which calls window.fdpLoadGA(). Everyone
// else gets GA straight away.
const loader = `
(function(){
  window.fdpLoadGA = function(){
    if (window.__fdpGA) return;
    if (${JSON.stringify(GA_HOSTS)}.indexOf(location.hostname) === -1) return;
    window.__fdpGA = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
    document.head.appendChild(s);
  };
  var eu = /(?:^|; )${REGION_COOKIE}=eu(?:;|$)/.test(document.cookie);
  var choice = null;
  try { choice = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
  if (!eu || choice === 'granted') window.fdpLoadGA();
})();
`;

/** Turns clicks on key links anywhere on the site into GA4 events. */
function useLinkClickEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!link || !href) return;
      const label = (link.textContent ?? "").trim().slice(0, 80);

      if (href.startsWith("mailto:")) {
        track("email_click", { link_text: label });
        return;
      }
      if (href.startsWith("tel:")) {
        track("phone_click", { link_text: label });
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      if (url.pathname === "/schedule") {
        track("book_call_click", { link_text: label });
      } else if (
        url.pathname === "/contact" &&
        url.searchParams.get("package")
      ) {
        track("select_package", {
          package_name: url.searchParams.get("package") ?? "",
        });
      } else if (url.pathname === "/contact") {
        track("contact_click", { link_text: label });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);
}

export function GoogleAnalytics() {
  useLinkClickEvents();
  return (
    <>
      <Script id="ga4" strategy="afterInteractive">
        {loader}
      </Script>
      <CookieConsent />
    </>
  );
}
