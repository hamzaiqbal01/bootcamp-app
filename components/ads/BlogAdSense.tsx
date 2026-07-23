"use client";

import { useEffect } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
};

/**
 * AdSense unit — only mount on blog routes.
 * Requires NEXT_PUBLIC_ADSENSE_CLIENT_ID (and optional slot).
 * Without env vars, renders nothing (safe for pre-approval).
 */
export function BlogAdSense({ slot, format = "auto", className = "" }: Props) {
  useEffect(() => {
    if (!CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers / empty slots
    }
  }, []);

  if (!CLIENT_ID) return null;

  return (
    <div className={`my-8 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90, width: "100%" }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE || ""}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
