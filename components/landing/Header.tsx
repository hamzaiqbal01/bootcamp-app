"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const nav = [
  { href: "#services", label: "Application Services" },
  { href: "#tutoring", label: "Tutoring Services" },
  { href: "#faq", label: "FAQ" },
];

/** Matches original HTML: .nav-link (muted text) + .btn-outline / .btn-primary */

const navLink =
  "rounded-lg px-2.5 py-2 text-base font-medium text-slate-500 transition-colors hover:text-slate-900";

const btnOutline =
  "rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50";

const btnPrimary =
  "rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="header"
      className="sticky top-0 z-50 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:min-h-17 lg:px-8">
        <Logo />

        <nav
          id="nav"
          aria-label="Primary"
          className="nav hidden items-center lg:flex"
        >
          {/* Same order as index.html: three .nav-link, then .btn-outline, .btn-primary */}
          <div className="flex items-center gap-4 xl:gap-5">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={`nav-link ${navLink}`}>
                {item.label}
              </a>
            ))}
          </div>
          {/* Original CSS typically spaces the link row from the button pair; buttons stay tight together */}
          <div className="ml-8 flex items-center gap-2 xl:ml-10 xl:gap-3">
            <a
              href="#consult"
              className={`nav-link btn btn-outline ${btnOutline}`}
            >
              Schedule a Free Consult
            </a>
            <a
              href="#contact"
              className={`nav-link btn btn-primary ${btnPrimary}`}
            >
              Contact Us
            </a>
          </div>
        </nav>

        <button
          type="button"
          className="relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-slate-800 transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-slate-800 transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-slate-800 transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav aria-label="Primary mobile" className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href="#consult"
                className={`nav-link btn btn-outline ${btnOutline} px-3 py-3 text-center`}
                onClick={() => setOpen(false)}
              >
                Schedule a Free Consult
              </a>
              <a
                href="#contact"
                className={`nav-link btn btn-primary ${btnPrimary} px-3 py-3 text-center`}
                onClick={() => setOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
