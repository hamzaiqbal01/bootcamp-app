"use client";

import type { MouseEvent } from "react";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

// The current theme lives on <html class="dark">, set before paint by the script in app/layout.tsx.
// Both icons are rendered and CSS shows the right one, so server and client markup always match.
export function ThemeToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Smaller, borderless icon button for the desktop header, where space is tight. */
  compact?: boolean;
}) {
  const size = compact
    ? "h-8 w-6 border-transparent bg-transparent"
    : "h-10 w-10 border-slate-200 bg-white hover:border-[#1F5BD8]";
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const dark = !document.documentElement.classList.contains("dark");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(dark);
      return;
    }

    // Swap the whole page at once and reveal the new theme in a circle growing from the button,
    // so every section changes together instead of fading at different speeds.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => applyTheme(dark));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      // A fast second click skips the first transition; the theme is still applied, so ignore it.
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-full border text-[#0B1B3A] transition-colors hover:text-[#1F5BD8] ${size} ${className}`}
    >
      {/* Moon: shown in light mode */}
      <svg
        className="theme-light-only"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {/* Sun: shown in dark mode */}
      <svg
        className="theme-dark-only"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="4.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
