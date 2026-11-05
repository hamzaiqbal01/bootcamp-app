"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, REGION_COOKIE } from "@/lib/analytics";

// Cookie banner for visitors from the EEA, UK and Switzerland only (region cookie set by proxy.ts).
// Accept loads Google Analytics; Decline keeps it off. Everyone else never sees the banner.

const OPEN_EVENT = "fdp:cookie-settings";

function isConsentRegion() {
  return new RegExp(`(?:^|; )${REGION_COOKIE}=eu(?:;|$)`).test(document.cookie);
}

function readChoice() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveChoice(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode: the choice lasts for this page view only.
  }
}

/** Remove Google Analytics cookies (_ga, _ga_XXXX) after a visitor withdraws consent. */
function clearAnalyticsCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const part of document.cookie.split("; ")) {
    const name = part.split("=")[0];
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read browser-only state after mount, then show the banner if this visitor still has to choose.
    const show = () => setOpen(true);
    const timer = window.setTimeout(() => {
      if (isConsentRegion() && !readChoice()) setOpen(true);
    }, 0);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  if (!open) return null;

  function accept() {
    saveChoice("granted");
    setOpen(false);
    (window as Window & { fdpLoadGA?: () => void }).fdpLoadGA?.();
  }

  function decline() {
    const hadGranted = readChoice() === "granted";
    saveChoice("denied");
    setOpen(false);
    if (hadGranted) {
      // GA is already running on this page: clear its cookies and reload without it.
      clearAnalyticsCookies();
      location.reload();
    }
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[560px] rounded-[20px] border border-[#E4E9F2] bg-white p-5 shadow-[0_24px_60px_-24px_rgba(11,27,58,0.45)] sm:inset-x-auto sm:left-5 sm:bottom-5"
    >
      <p className="text-[15px] font-bold text-[#0B1B3A]">
        Cookies on Future Dental Prep
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#5B6782]">
        We would like to use Google Analytics cookies to see which pages are
        useful and improve the site. We never send your name or email to Google.{" "}
        <Link
          href="/privacy"
          className="font-semibold text-[#1F5BD8] hover:underline"
        >
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={accept}
          className="inline-flex min-h-[42px] items-center rounded-full bg-[#1F5BD8] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#1747AC]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={decline}
          className="inline-flex min-h-[42px] items-center rounded-full border border-[#D5DDEA] bg-white px-5 text-[14px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

/** "Cookie settings" link for the privacy page: reopens the banner so a visitor can change their choice. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="font-semibold text-[#1F5BD8] hover:underline"
    >
      Cookie settings
    </button>
  );
}
