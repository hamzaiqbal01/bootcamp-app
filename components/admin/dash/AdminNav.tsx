"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Item = {
  href: string;
  label: string;
  icon: ReactNode;
  soon?: boolean;
  match?: (path: string) => boolean;
};

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d={d}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const items: Item[] = [
  {
    href: "/admin",
    label: "Overview",
    icon: icon("M4 13h6V4H4v9Zm10 7h6v-9h-6v9ZM4 20h6v-4H4v4ZM14 4v4h6V4h-6Z"),
    match: (p) => p === "/admin",
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: icon(
      "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 19v-1a4 4 0 0 0-3-3.87M16 3.13a3.5 3.5 0 0 1 0 6.75",
    ),
    match: (p) => p.startsWith("/admin/leads"),
  },
  {
    href: "/admin/search",
    label: "Search (Google)",
    icon: icon("m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"),
    match: (p) => p.startsWith("/admin/search"),
  },
  {
    href: "/admin/traffic",
    label: "Traffic (GA4)",
    icon: icon("M3 3v18h18M7 15l4-4 3 3 5-6"),
    match: (p) => p.startsWith("/admin/traffic"),
  },
  {
    href: "/admin/outreach",
    label: "Outreach",
    icon: icon("M4 4h16v12H5.2L4 17.2V4Zm4 5h8M8 12h5"),
    match: (p) => p.startsWith("/admin/outreach"),
  },
];

export function AdminNav({ variant }: { variant: "side" | "top" }) {
  const pathname = usePathname() ?? "/admin";

  if (variant === "top") {
    return (
      <nav className="flex gap-1 overflow-x-auto" aria-label="Admin">
        {items
          .filter((i) => !i.soon)
          .map((i) => {
            const active = i.match?.(pathname);
            return (
              <Link
                key={i.label}
                href={i.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${
                  active
                    ? "bg-[#0B1B3A] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {i.label}
              </Link>
            );
          })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {items.map((i) =>
        i.soon ? (
          <span
            key={i.label}
            className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/35"
          >
            {i.icon}
            {i.label}
            <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
              Soon
            </span>
          </span>
        ) : (
          <Link
            key={i.label}
            href={i.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              i.match?.(pathname)
                ? "bg-white/12 text-white"
                : "text-white/65 hover:bg-white/6 hover:text-white"
            }`}
          >
            {i.icon}
            {i.label}
          </Link>
        ),
      )}
    </nav>
  );
}
