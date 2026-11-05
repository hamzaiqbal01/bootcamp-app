"use client";

import { useEffect, useState, type ReactNode } from "react";

const photos = [
  "/images/hero-coaches/dr-todd-chastain.jpg",
  "/images/hero-coaches/celina-yang.jpg",
  "/images/hero-coaches/hansuja-chaurasia.jpg",
  "/images/hero-coaches/profile-placeholder.svg",
];

// One small photo per coach on the dashed orbit's front (lower) half, spaced evenly from left to right.
// The orbit is centred at (82, 90) with radii 74 x 22; each spot's centre sits on that ellipse.
const LAYOUTS: string[][] = [
  [],
  ["left-[67px] top-[97px] h-[30px] w-[30px]"],
  ["left-[3px] top-[86px] h-[30px] w-[30px]", "left-[131px] top-[86px] h-[30px] w-[30px]"],
  [
    "left-[3px] top-[86px] h-[30px] w-[30px]",
    "left-[67px] top-[97px] h-[30px] w-[30px]",
    "left-[131px] top-[86px] h-[30px] w-[30px]",
  ],
  [
    "-left-[4px] top-[81px] h-[28px] w-[28px]",
    "left-[44px] top-[97px] h-[28px] w-[28px]",
    "left-[92px] top-[97px] h-[28px] w-[28px]",
    "left-[140px] top-[81px] h-[28px] w-[28px]",
  ],
  [
    "-left-[5px] top-[77px] h-[26px] w-[26px]",
    "left-[32px] top-[96px] h-[26px] w-[26px]",
    "left-[67px] top-[97px] h-[30px] w-[30px]",
    "left-[106px] top-[96px] h-[26px] w-[26px]",
    "left-[143px] top-[77px] h-[26px] w-[26px]",
  ],
];
const satellites = LAYOUTS[Math.min(photos.length, LAYOUTS.length - 1)];

const fade = "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none";

// Stacks every photo in one spot and fades the visible one in, so swaps cross-fade instead of jumping.
function PhotoStack({ visible }: { visible: number }) {
  return photos.map((src, i) => (
    <img
      key={src}
      src={src}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover object-[center_20%] ${fade} ${
        i === visible ? "scale-100 opacity-100" : "scale-110 opacity-0"
      }`}
    />
  ));
}

export function HeroCoachCluster({ messages }: { messages: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [paused]);

  const show = (index: number) => setActive(index % photos.length);
  const message = active % messages.length;

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative h-[128px] w-[164px] shrink-0" role="group" aria-label="Coaches">
        <span className="pointer-events-none absolute top-0 left-[40px] h-[84px] w-[84px] rounded-full border border-[#1F5BD8]/35" />
        <span className="pointer-events-none absolute top-[68px] left-2 h-[44px] w-[148px] rounded-[100%] border border-dashed border-[#1F5BD8]/30" />
        <span className="pointer-events-none absolute top-[109px] left-[79px] h-1.5 w-1.5 rounded-full bg-[#1F5BD8]" />

        <button
          type="button"
          onClick={() => show(active + 1)}
          className="absolute top-0 left-[44px] h-[76px] w-[76px] cursor-pointer overflow-hidden rounded-full border-[3px] border-white shadow-[0_10px_24px_-12px_rgba(11,27,58,0.45)]"
          aria-label="Next coach"
        >
          <PhotoStack visible={active} />
        </button>

        <span className="pointer-events-none absolute top-0 left-[102px] grid h-[22px] w-[22px] place-items-center rounded-full bg-[#1F5BD8] text-white shadow-sm">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 3C4.8 3 3 4.8 3 7.2c0 2 .7 3.4 1.3 5 .6 1.6.7 3.4 1.1 5.3.4 1.9 1 3.5 2.1 3.5 1.4 0 1.6-2.2 2-4 .3-1.4.8-2.5 2.5-2.5s2.2 1.1 2.5 2.5c.4 1.8.6 4 2 4 1.1 0 1.7-1.6 2.1-3.5.4-1.9.5-3.7 1.1-5.3.6-1.6 1.3-3 1.3-5C21 4.8 19.2 3 17 3c-1.8 0-2.8 1-5 1S8.8 3 7 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {satellites.map((spot, index) => (
          <button
            key={photos[index]}
            type="button"
            onClick={() => show(index)}
            className={`absolute cursor-pointer overflow-hidden rounded-full border-2 shadow-[0_6px_14px_-8px_rgba(11,27,58,0.5)] ${fade} ${
              index === active ? "scale-110 border-[#1F5BD8]" : "border-white"
            } ${spot}`}
            aria-label={`Show coach ${index + 1}`}
            aria-pressed={index === active}
          >
            <img src={photos[index]} alt="" className="h-full w-full object-cover object-[center_20%]" />
          </button>
        ))}
      </div>

      <div className="grid min-w-0 flex-1" aria-live="polite">
        {messages.map((text, i) => (
          <p
            key={i}
            aria-hidden={i !== message}
            className={`col-start-1 row-start-1 text-[16px] leading-[1.65] text-[#5B6782] ${fade} ${
              i === message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
