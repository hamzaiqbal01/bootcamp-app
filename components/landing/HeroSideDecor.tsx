// Pale line art for the sides of a centered hero: an organic-chemistry ring on the left,
// a tooth with orbiting dots on the right. Decorative only, and hidden on narrow screens.
export function HeroSideDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block" aria-hidden>
      <svg
        className="hero-float absolute top-[14%] left-[3%] h-[260px] w-[260px] text-[#1F5BD8] xl:left-[6%]"
        viewBox="0 0 260 260"
        fill="none"
      >
        <g stroke="currentColor" strokeOpacity="0.28" strokeWidth="2">
          {/* Benzene ring with alternating double bonds */}
          <path d="M130 70l52 30v60l-52 30-52-30v-60z" />
          <path d="M138 84l38 22M176 154l-38 22M86 112v36" strokeOpacity="0.2" />
          {/* Side chains */}
          <path d="M130 70V30M182 160l34 20M78 160l-34 20M182 100l34-20" />
          <path d="M216 80l26 8" strokeDasharray="4 5" />
        </g>
        <g fill="currentColor">
          <circle cx="130" cy="30" r="7" fillOpacity="0.22" />
          <circle cx="216" cy="180" r="6" fillOpacity="0.18" />
          <circle cx="44" cy="180" r="8" fillOpacity="0.16" />
          <circle cx="216" cy="80" r="5" fillOpacity="0.24" />
          <circle cx="242" cy="88" r="4" fillOpacity="0.2" />
        </g>
        <g fill="#0F9D8A" fillOpacity="0.35">
          <circle cx="130" cy="70" r="4" />
          <circle cx="182" cy="160" r="4" />
          <circle cx="78" cy="100" r="4" />
        </g>
      </svg>

      <svg
        className="hero-float-slow absolute top-[10%] right-[3%] h-[280px] w-[280px] text-[#1F5BD8] xl:right-[6%]"
        viewBox="0 0 280 280"
        fill="none"
      >
        <ellipse
          cx="140"
          cy="140"
          rx="118"
          ry="56"
          transform="rotate(-24 140 140)"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        {/* Molar outline */}
        <path
          d="M104 92c-18 0-30 16-28 36 2 18 10 30 14 46 4 18 6 40 18 40 12 0 12-30 32-30s20 30 32 30c12 0 14-22 18-40 4-16 12-28 14-46 2-20-10-36-28-36-14 0-22 8-36 8s-22-8-36-8z"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M118 112c6 4 14 6 22 6s16-2 22-6"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="250" cy="96" r="7" fill="currentColor" fillOpacity="0.2" />
        <circle cx="34" cy="186" r="5" fill="#0F9D8A" fillOpacity="0.35" />
        <circle cx="206" cy="214" r="4" fill="currentColor" fillOpacity="0.25" />
        <path d="M226 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#E7A400" fillOpacity="0.4" />
      </svg>
    </div>
  );
}
