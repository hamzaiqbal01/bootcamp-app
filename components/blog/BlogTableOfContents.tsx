"use client";

import { useEffect, useState } from "react";

export type TocHeading = {
  id: string;
  text: string;
};

type Props = {
  headings: TocHeading[];
  variant: "mobile" | "sidebar";
};

export function BlogTableOfContents({ headings, variant }: Props) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="space-y-1 border-l border-slate-200">
      {headings.map((heading, index) => {
        const isActive = activeId === heading.id;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => setOpenMobile(false)}
              className={`block border-l-2 py-1.5 pl-3 text-sm leading-snug transition ${
                isActive
                  ? "-ml-px border-brand-600 font-semibold text-brand-700"
                  : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              <span className="mr-1.5 text-xs text-slate-400">{index + 1}.</span>
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <div className="mb-8 xl:hidden">
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900"
          aria-expanded={openMobile}
        >
          Table of Contents
          <span className="text-slate-500" aria-hidden>
            {openMobile ? "−" : "+"}
          </span>
        </button>
        {openMobile && (
          <nav aria-label="Table of contents" className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              On this page
            </p>
            {list}
          </nav>
        )}
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <nav aria-label="Table of contents">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
          Table of Contents
        </p>
        {list}
      </nav>
    </div>
  );
}
