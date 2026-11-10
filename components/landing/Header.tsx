"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/landing/home/TopBar";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const nav = [
  { href: "/services", label: "Application Services" },
  { href: "/private-dat-tutoring", label: "DAT Services" },
  { href: "/secondaries", label: "Secondaries" },
  { href: "/#team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/#tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
];

const navLink =
  "whitespace-nowrap rounded-lg px-2 py-2 text-[14px] font-medium text-[#33415C] transition-colors hover:text-[#0B1B3A] xl:px-2.5 xl:text-[15px]";

export function Header() {
  const [open, setOpen] = useState(false);

  // Full-screen menu: lock page scroll, close on Escape or when the desktop nav takes over.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <>
      <TopBar />
      <header
        id="header"
        className="sticky top-0 z-50 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
          <Logo className="py-[6px]" />

          <nav
            id="nav"
            aria-label="Primary"
            className="nav hidden items-center lg:flex"
          >
            {/* Same order as index.html: three .nav-link, then .btn-outline, .btn-primary */}
            <div className="flex items-center gap-1">
              {/* Link for every item, including /#team and /#tools, so going to a home section is a client-side
                  navigation (no full page reload) and Next scrolls to the section once it renders. */}
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={navLink}>
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Theme toggle first, then the two calls to action side by side: Contact (outline) and Book (filled). */}
            <div className="ml-2 flex items-center gap-2 xl:ml-3 xl:gap-2.5">
              <ThemeToggle />
              <Link
                href="/contact"
                className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-[#D5DDEA] bg-white px-4 text-sm font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
              >
                Contact
              </Link>
              <Link
                href="/schedule"
                className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full bg-[#1F5BD8] px-4 text-sm font-bold text-white hover:bg-[#1747AC]"
              >
                Book a free call
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
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
        </div>

        <div
          id="mobile-menu"
          className={`fixed inset-0 z-[60] flex flex-col bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FD_100%)] transition-[opacity,visibility] duration-300 lg:hidden ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
          inert={!open}
        >
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 h-[360px] w-[360px] rounded-full bg-[#1F5BD8]/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex items-center justify-between border-b border-slate-200/70 px-4 py-2 sm:px-6">
            <Logo className="py-[6px]" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0B1B3A]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Primary mobile"
            className="relative flex flex-1 flex-col overflow-y-auto px-4 pt-6 pb-8 sm:px-6"
          >
            <ul className="flex flex-col">
              {nav.map((item, index) => {
                const className =
                  "group flex items-center justify-between border-b border-slate-200/70 py-4 text-[26px] font-extrabold tracking-[-0.02em] text-[#0B1B3A] transition-colors hover:text-[#1F5BD8]";
                const content = (
                  <>
                    {item.label}
                    <svg
                      className="text-[#8A93A3] transition group-hover:translate-x-1 group-hover:text-[#1F5BD8]"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                );
                return (
                  <li
                    key={item.href}
                    className={`transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: open ? `${80 + index * 50}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={item.href}
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              className={`mt-auto pt-8 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${80 + nav.length * 50}ms` : "0ms",
              }}
            >
              <Link
                href="/schedule"
                className="flex min-h-[54px] items-center justify-center rounded-full bg-[#1F5BD8] px-4 text-[16px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)]"
                onClick={() => setOpen(false)}
              >
                Book a free consultation
              </Link>
              <p className="mt-2 text-center text-[13px] text-[#5B6782]">
                Free 15-minute call. No obligation.
              </p>
              <Link
                href="/contact"
                className="mt-4 flex min-h-[50px] items-center justify-center rounded-full border border-[#D5DDEA] bg-white px-4 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
                onClick={() => setOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
