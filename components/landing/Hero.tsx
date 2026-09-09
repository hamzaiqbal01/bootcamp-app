import Image from "next/image";
import Link from "next/link";
import { Caveat, Instrument_Serif, Syne } from "next/font/google";
import { btn, btnSize } from "@/components/ui/button-styles";

const script = Caveat({
  subsets: ["latin"],
  weight: ["600"],
});

const headingSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const headingSans = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const STATS = [
  {
    value: "97%",
    label: "Acceptance Rate",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19V9M10 19V5M16 19v-7M22 19H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "10,000+",
    label: "Students Helped",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "9.8/10",
    label: "Avg. Rating",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3.5 14.7 9l6 .9-4.35 4.2 1.03 5.9L12 17.3 6.62 20l1.03-5.9L3.3 9.9 9.3 9 12 3.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-5rem)] flex-col justify-center overflow-hidden bg-[#070B14] py-12 sm:py-16">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-dental-model.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/88 to-[#070B14]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/50" />
        <div className="absolute -left-32 -top-30 h-130 w-130 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <p
        className={`${script.className} pointer-events-none absolute right-4 bottom-16 z-10 text-[1.65rem] leading-[1.15] text-white sm:right-8 sm:text-3xl lg:right-16 lg:bottom-24 lg:text-[2.15rem]`}
      >
        Same
        <br />
        Dream
        <br />
        Brighter
        <br />
        Future
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Trusted by 10,000+ Future Dentists
          </p>
          <h1 className="mt-5 flex flex-wrap items-baseline gap-x-3 text-white">
            <span
              className={`${headingSerif.className} text-3xl text-slate-300 sm:text-4xl lg:text-5xl`}
            >
              The
            </span>
            <span
              className={`${headingSans.className} text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]`}
            >
              Dental{" "}
              <span className="text-indigo-400">Prep</span>
            </span>
          </h1>
          <p className="mt-5 text-xl font-medium text-slate-200 sm:text-2xl">
            Study smarter. Get further.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Personalized application support, expert tutoring, and interview
            prep to help you achieve your dental school dreams.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/schedule"
              className={`${btn.inverse} ${btnSize.md} gap-2.5`}
            >
              <CalendarIcon />
              Schedule a free call
            </Link>
            <a
              href="#services"
              className={`${btn.ghost} ${btnSize.md} gap-2.5`}
            >
              <GridIcon />
              View services
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-8">
                {index > 0 ? (
                  <div className="hidden h-10 w-px bg-white/10 sm:block" />
                ) : null}
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-slate-400">{stat.icon}</span>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
