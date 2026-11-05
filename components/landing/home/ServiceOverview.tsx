import Link from "next/link";
import type { ReactNode } from "react";
import { CellIllustration } from "@/components/landing/home/CellIllustration";

// Per-card colour theme: icon tile, icon colour and the soft corner wave.
// Dark mode restyles these through the svc-tile-* / svc-wave classes in app/theme-dark.css.
const tones = {
  blue: {
    tile: "bg-gradient-to-br from-[#EAF1FF] to-[#C7D8FF] text-[#1F5BD8] ring-[#D6E2FF]",
    wave: ["#C9DAFF", "#8FB0FF"],
  },
  orange: {
    tile: "bg-gradient-to-br from-[#FFF1E7] to-[#FFD2B5] text-[#D9622B] ring-[#FFE0CC]",
    wave: ["#FFE0CC", "#FFB98F"],
  },
  green: {
    tile: "bg-gradient-to-br from-[#E4F8EF] to-[#B8EBD3] text-[#12925F] ring-[#CDEFE0]",
    wave: ["#CDEFE0", "#8EDDB8"],
  },
  purple: {
    tile: "bg-gradient-to-br from-[#F1ECFF] to-[#D6C9FF] text-[#6B47D6] ring-[#E2DAFF]",
    wave: ["#E2DAFF", "#B9A6FF"],
  },
} as const;

type Tone = keyof typeof tones;

const cards: { title: string; body: string; price: string; href: string; cta: string; tone: Tone; icon: ReactNode }[] = [
  {
    title: "Interview Coaching",
    body: "Traditional and MMI mock interviews with the questions dental schools actually ask.",
    price: "From $347",
    href: "/pricing",
    cta: "See plans",
    tone: "purple",
    icon: <PeopleIcon />,
  },
  {
    title: "Personal Statement",
    body: "Multiple rounds of edits from a practicing dentist who has read hundreds of statements.",
    price: "From $167",
    href: "/pricing",
    cta: "See plans",
    tone: "orange",
    icon: <EditIcon />,
  },
  {
    title: "Application Review",
    body: "School list, experiences, and your full AADSAS application reviewed before you submit.",
    price: "From $87",
    href: "/pricing",
    cta: "See plans",
    tone: "green",
    icon: <LayersIcon />,
  },
  {
    title: "DAT Tutoring",
    body: "Custom study plans, practice exams, and 1-on-1 tutoring for every section of the DAT.",
    price: "From $500",
    href: "/private-dat-tutoring",
    cta: "See plans",
    tone: "blue",
    icon: <ToothIcon />,
  },
];

export function ServiceOverview() {
  return (
    <section id="services" className="relative isolate scroll-mt-24 overflow-hidden bg-[#F6F8FC] py-20 sm:py-24">
      <div className="pointer-events-none absolute top-[24px] right-[24px] -z-10 hidden w-[230px] lg:block xl:top-[20px] xl:right-[64px] xl:w-[320px]">
        <CellIllustration className="animate-cell-float h-auto w-full" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex max-w-[720px] flex-col gap-3.5">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            What we offer
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Dental school admissions consulting, from first DAT to acceptance
          </h2>
          <p className="max-w-[60ch] text-lg text-[#5B6782]">
            Most students come to us for one thing and stay for the rest. Start with the section that is holding your application back.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const tone = tones[card.tone];
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative isolate flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-[#E4E9F2] bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,27,58,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#D3DDF0] hover:shadow-[0_22px_40px_-24px_rgba(11,27,58,0.4)]"
              >
                <CornerWave from={tone.wave[0]} to={tone.wave[1]} id={card.tone} />
                <span
                  className={`svc-tile svc-tile-${card.tone} flex h-12 w-12 items-center justify-center rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_14px_-8px_rgba(11,27,58,0.35)] ring-1 ${tone.tile}`}
                >
                  {card.icon}
                </span>
                <h3 className="text-[19px] font-bold text-[#0B1B3A]">{card.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#5B6782]">{card.body}</p>
                <div className="mt-auto flex items-center justify-between border-t border-[#E4E9F2] pt-3.5 text-sm">
                  <b className="text-[#0B1B3A]">{card.price}</b>
                  <span className="inline-flex items-center gap-1 font-bold text-[#1F5BD8]">
                    {card.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Soft coloured swoosh in the card's bottom-right corner, behind the content.
function CornerWave({ from, to, id }: { from: string; to: string; id: string }) {
  const gid = `svc-wave-${id}`;
  return (
    <svg
      viewBox="0 0 220 140"
      preserveAspectRatio="none"
      className="svc-wave pointer-events-none absolute right-0 bottom-0 -z-10 h-[46%] w-[62%]"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} stopOpacity="0.15" />
          <stop offset="0.5" stopColor={from} stopOpacity="0.8" />
          <stop offset="1" stopColor={to} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M220 0 C196 30 184 70 140 92 C102 111 54 118 0 140 L220 140 Z" fill={`url(#${gid})`} />
      <path className="svc-wave-line" d="M220 46 C202 70 182 96 150 112 C122 126 96 132 70 140" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3C4.8 3 3 4.8 3 7.2c0 2 .7 3.4 1.3 5 .6 1.6.7 3.4 1.1 5.3.4 1.9 1 3.5 2.1 3.5 1.4 0 1.6-2.2 2-4 .3-1.4.8-2.5 2.5-2.5s2.2 1.1 2.5 2.5c.4 1.8.6 4 2 4 1.1 0 1.7-1.6 2.1-3.5.4-1.9.5-3.7 1.1-5.3.6-1.6 1.3-3 1.3-5C21 4.8 19.2 3 17 3c-1.8 0-2.8 1-5 1S8.8 3 7 3Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M17.5 3.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 8.5-8.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="m2.5 12.5 9.5 5 9.5-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m2.5 16.5 9.5 5 9.5-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.9" />
      <path d="M17 14c2.5 0 4.2 1.6 4.6 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}
