"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { preconnect, preload } from "react-dom";
import { track, trackLead } from "@/lib/analytics";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Calendly) return resolve();
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Calendly failed to load")),
      { once: true },
    );
  });
}

export function CalendlyEmbed({ bookingUrl }: { bookingUrl: string }) {
  // Start fetching Calendly as soon as the page HTML arrives, before React runs, so the calendar opens sooner.
  preconnect("https://calendly.com");
  preconnect("https://assets.calendly.com");
  preload(SCRIPT_SRC, { as: "script" });

  const router = useRouter();
  const params = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  // Read the theme on the first client render so a dark-mode visitor doesn't load the calendar twice.
  // (The value only feeds the Calendly URL, never the HTML, so server and client markup still match.)
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );
  // Calendly reports its content height; follow it so there's no empty space under the calendar.
  const [height, setHeight] = useState(560);
  // Our loader covers the widget until Calendly says the calendar is showing.
  const [ready, setReady] = useState(false);

  // Match the calendar to the site theme, and follow the header toggle.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Our own header replaces Calendly's event details; colors follow the site palette.
  // Prefill what we already know and pass UTM tags through, so bookings show which button led here.
  const url = new URL(bookingUrl);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("primary_color", dark ? "82a8ff" : "1f5bd8");
  url.searchParams.set("background_color", dark ? "1a1a1a" : "ffffff");
  url.searchParams.set("text_color", dark ? "f2f2f2" : "0b1b3a");
  for (const key of [
    "name",
    "email",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ]) {
    const value = params.get(key);
    if (value) url.searchParams.set(key, value);
  }
  const embedUrl = url.toString();
  const source = params.get("utm_source") ?? params.get("from") ?? "";

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return;
        containerRef.current.innerHTML = "";
        setReady(false);
        window.Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
        });
        // Keep our loader up until Calendly itself says the calendar is showing (event_type_viewed /
        // page_height below). Its iframe "load" fires seconds earlier, while it still shows only its own
        // spinner, so that only starts a 3-second backup in case Calendly's message never arrives.
        containerRef.current
          .querySelector("iframe")
          ?.addEventListener(
            "load",
            () => window.setTimeout(() => !cancelled && setReady(true), 3000),
            { once: true },
          );
      })
      .catch(() => !cancelled && setFailed(true));
    // Never hide the calendar for good if Calendly's ready message is missed.
    const fallback = window.setTimeout(
      () => !cancelled && setReady(true),
      15000,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [embedUrl]);

  useEffect(() => {
    async function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      const data = event.data as {
        event?: string;
        payload?: {
          height?: string;
          event?: { uri?: string };
          invitee?: { uri?: string };
        };
      };
      if (data?.event === "calendly.event_type_viewed") {
        setReady(true);
        return;
      }
      if (data?.event === "calendly.page_height") {
        const px = Number.parseInt(data.payload?.height ?? "", 10);
        if (px > 0) {
          setHeight(Math.max(420, px));
          setReady(true);
        }
        return;
      }
      if (data?.event !== "calendly.event_scheduled") return;
      track("book_call_complete", { source });
      trackLead("calendly_booking", { source });

      const eventUri = data.payload?.event?.uri;
      const inviteeUri = data.payload?.invitee?.uri;
      if (!eventUri || !inviteeUri) return;

      setSaving(true);
      try {
        await fetch("/api/calendly/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventUri, inviteeUri, source }),
        });
      } catch {
        // The booking itself is already confirmed by Calendly; recording it is best effort.
      }
      router.push("/schedule/booked");
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router, source]);

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-[22px] border border-[#E4E9F2] bg-white px-6 py-16 text-center">
        <p className="text-[15px] font-bold text-[#0B1B3A]">
          The booking calendar didn&apos;t load.
        </p>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1F5BD8] px-5 py-3 text-[14px] font-bold text-white hover:bg-[#1747AC]"
        >
          Open the booking page
        </a>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[26px] border border-[#E4E9F2] bg-white shadow-[0_30px_60px_-40px_rgba(11,27,58,0.55)]">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0B1B3A_0%,#16306A_60%,#1F5BD8_130%)] px-6 py-4 text-white">
        <div
          className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-[#4F8BFF]/30 blur-3xl"
          aria-hidden
        />
        <p className="relative text-[17px] leading-tight font-extrabold">
          Free consultation with Future Dental Prep
        </p>
        <div className="relative mt-2.5 flex flex-wrap gap-2 text-[12px] font-semibold text-white/85">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <rect
                x="3"
                y="6"
                width="13"
                height="12"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M16 10.5 21 8v8l-5-2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Zoom or Google Meet
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 7.5V12l3 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Times in your time zone
          </span>
        </div>
      </div>
      <div className="relative">
        <div
          ref={containerRef}
          className="w-full"
          style={{ height }}
          aria-label="Book a free call"
        />
        {!ready ? (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center bg-white px-6 pt-10 transition-opacity"
          >
            <span
              className="relative flex h-12 w-12 items-center justify-center"
              aria-hidden
            >
              <span className="absolute inset-0 rounded-full border-[3px] border-[#E8EFFD]" />
              <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#1F5BD8]" />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#1F5BD8]"
              >
                <rect
                  x="3.5"
                  y="5"
                  width="17"
                  height="15"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M3.5 9.5h17M8 3v4M16 3v4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="mt-4 text-[15px] font-bold text-[#0B1B3A]">
              Loading available times…
            </p>
            <p className="mt-1 text-[13px] text-[#8A93A3]">
              This takes a second or two.
            </p>

            {/* Calendar-shaped placeholder so the card doesn't look empty while it loads. */}
            <div className="mt-8 w-full max-w-[380px]" aria-hidden>
              <div className="mx-auto h-3.5 w-36 rounded-full fdp-summary-shimmer" />
              <div className="mt-6 grid grid-cols-7 gap-2.5">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="mx-auto h-8 w-8 rounded-full fdp-summary-shimmer"
                  />
                ))}
              </div>
            </div>
            <span className="sr-only">Loading the booking calendar</span>
          </div>
        ) : null}
      </div>
      {saving ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-[15px] font-bold text-[#0B1B3A] backdrop-blur">
          Confirming your booking…
        </div>
      ) : null}
    </div>
  );
}
