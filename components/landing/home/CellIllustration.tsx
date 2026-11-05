// Decorative glossy cell for the "What we offer" section. Glows and shadows use radial gradients
// rather than blur filters so they never show hard edges. IDs are prefixed so they can't clash with other inline SVGs.
const PORES: [number, number][] = [
  [178, 208], [204, 186], [236, 180], [266, 192], [286, 218], [292, 250],
  [282, 282], [258, 304], [226, 310], [196, 300], [176, 276], [168, 244],
];

const RIBOSOMES: [number, number][] = [
  [146, 214], [140, 246], [142, 280], [154, 312], [176, 338], [328, 228], [334, 262], [326, 296],
];

export function CellIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 460 480" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fdpcell-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0.55" stopColor="#7EA2F5" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7EA2F5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fdpcell-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#A9B7DE" stopOpacity="0.55" />
          <stop offset="1" stopColor="#A9B7DE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fdpcell-mem" cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#DCE6FF" />
          <stop offset="0.85" stopColor="#97B3F6" />
          <stop offset="1" stopColor="#5277E3" />
        </radialGradient>
        <radialGradient id="fdpcell-cyto" cx="40%" cy="36%" r="72%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.75" stopColor="#E7EEFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#C3D4FC" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="fdpcell-nuc" cx="34%" cy="28%" r="80%">
          <stop offset="0" stopColor="#A9C0FF" />
          <stop offset="0.5" stopColor="#4F70EA" />
          <stop offset="1" stopColor="#24379F" />
        </radialGradient>
        <radialGradient id="fdpcell-nucleolus" cx="34%" cy="30%" r="75%">
          <stop offset="0" stopColor="#7C8FF0" />
          <stop offset="1" stopColor="#18246E" />
        </radialGradient>
        <linearGradient id="fdpcell-mito" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFC9B6" />
          <stop offset="1" stopColor="#EB7F62" />
        </linearGradient>
        <radialGradient id="fdpcell-ves" cx="34%" cy="30%" r="80%">
          <stop offset="0" stopColor="#D4F5EA" />
          <stop offset="1" stopColor="#25A47C" />
        </radialGradient>
        <radialGradient id="fdpcell-lyso" cx="34%" cy="30%" r="80%">
          <stop offset="0" stopColor="#E3E9FF" />
          <stop offset="1" stopColor="#6E88F0" />
        </radialGradient>
        <clipPath id="fdpcell-inside">
          <circle cx="230" cy="236" r="186" />
        </clipPath>
      </defs>

      <circle cx="230" cy="236" r="228" fill="url(#fdpcell-halo)" />
      <ellipse cx="236" cy="452" rx="150" ry="16" fill="url(#fdpcell-shadow)" />

      <circle cx="230" cy="236" r="200" fill="url(#fdpcell-mem)" />
      <circle cx="230" cy="236" r="200" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="2.5" />
      <circle cx="230" cy="236" r="187" fill="url(#fdpcell-cyto)" />
      <circle cx="230" cy="236" r="187" fill="none" stroke="#B9CCFA" strokeWidth="1.2" />

      <g clipPath="url(#fdpcell-inside)">
        {/* Rough ER wrapping the nucleus */}
        <g fill="none" stroke="#9AB3F4" strokeWidth="5" strokeLinecap="round" opacity="0.75">
          <path d="M150 206 C150 160 200 140 236 142" />
          <path d="M138 252 C130 196 170 150 214 140" />
          <path d="M152 316 C134 292 130 270 132 248" />
          <path d="M320 216 C330 244 330 272 318 300" />
        </g>
        <g fill="#6E88F0" opacity="0.7">
          {RIBOSOMES.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>

        {/* Mitochondria */}
        <g transform="rotate(-24 330 140)">
          <rect x="288" y="122" width="84" height="36" rx="18" fill="url(#fdpcell-mito)" />
          <path
            d="M300 140 c4 -9 8 -9 10 0 s6 9 10 0 s6 -9 10 0 s6 9 10 0 s6 -9 10 0 s6 9 10 0"
            fill="none"
            stroke="#FFF3EE"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <rect x="288" y="122" width="84" height="36" rx="18" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>
        <g transform="rotate(28 150 360)">
          <rect x="114" y="345" width="72" height="30" rx="15" fill="url(#fdpcell-mito)" />
          <path
            d="M124 360 c4 -8 7 -8 9 0 s5 8 9 0 s5 -8 9 0 s5 8 9 0 s5 -8 9 0"
            fill="none"
            stroke="#FFF3EE"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="114" y="345" width="72" height="30" rx="15" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* Golgi stack */}
        <g fill="none" stroke="#2EAE87" strokeLinecap="round" opacity="0.9">
          <path d="M290 330 C310 334 330 350 338 372" strokeWidth="6" />
          <path d="M282 344 C300 348 316 362 322 380" strokeWidth="6" />
          <path d="M274 358 C290 362 302 372 306 388" strokeWidth="6" />
          <path d="M268 372 C280 376 288 384 290 394" strokeWidth="5" />
        </g>

        <circle cx="352" cy="330" r="10" fill="url(#fdpcell-ves)" />
        <circle cx="236" cy="384" r="9" fill="url(#fdpcell-ves)" />
        <circle cx="108" cy="190" r="11" fill="url(#fdpcell-lyso)" />
        <circle cx="290" cy="98" r="7" fill="url(#fdpcell-lyso)" />
      </g>

      {/* Nucleus */}
      <circle cx="232" cy="246" r="74" fill="#3C57C9" opacity="0.18" />
      <circle cx="230" cy="244" r="68" fill="url(#fdpcell-nuc)" />
      <circle cx="230" cy="244" r="68" fill="none" stroke="#C7D5FF" strokeOpacity="0.8" strokeWidth="2" />
      <g fill="#D3DEFF" opacity="0.85">
        {PORES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" />
        ))}
      </g>
      <circle cx="244" cy="254" r="24" fill="url(#fdpcell-nucleolus)" />
      <ellipse cx="206" cy="216" rx="22" ry="12" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 206 216)" />

      {/* Specular highlights */}
      <ellipse cx="150" cy="118" rx="70" ry="30" fill="#FFFFFF" opacity="0.45" transform="rotate(-34 150 118)" />
      <ellipse cx="136" cy="110" rx="26" ry="10" fill="#FFFFFF" opacity="0.9" transform="rotate(-34 136 110)" />
    </svg>
  );
}
