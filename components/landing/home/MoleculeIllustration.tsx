// Decorative glossy ball-and-stick molecule, drawn in the same style as CellIllustration.
// Glows and shadows use radial gradients rather than blur filters. IDs are prefixed to avoid clashes.
const SHADES = {
  blue: ["#C9D8FF", "#5677EC", "#22359B"],
  coral: ["#FFD9CB", "#F08B6B", "#C2502F"],
  teal: ["#D2F5E8", "#35B98D", "#11795A"],
  sky: ["#EEF3FF", "#97B5FF", "#4A6BD6"],
} as const;

type Shade = keyof typeof SHADES;

const CENTER = { x: 180, y: 160 };

// Drawn back-to-front: smaller, farther atoms first so the larger ones overlap them.
const ATOMS: { x: number; y: number; r: number; shade: Shade }[] = [
  { x: 214, y: 268, r: 17, shade: "coral" },
  { x: 92, y: 92, r: 22, shade: "coral" },
  { x: 272, y: 226, r: 21, shade: "sky" },
  { x: 286, y: 84, r: 27, shade: "teal" },
  { x: 92, y: 236, r: 29, shade: "blue" },
];

function Bond({ x, y }: { x: number; y: number }) {
  const d = `M${CENTER.x} ${CENTER.y} L${x} ${y}`;
  return (
    <g strokeLinecap="round">
      <path d={d} stroke="#9FB3E6" strokeWidth="15" />
      <path d={d} stroke="#D6E1FB" strokeWidth="9" />
      <path d={d} stroke="#FFFFFF" strokeWidth="3" opacity="0.8" transform="translate(-2 -2)" />
    </g>
  );
}

function Atom({ x, y, r, shade }: { x: number; y: number; r: number; shade: Shade }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={`url(#fdpmol-${shade})`} />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" />
      <ellipse
        cx={x - r * 0.32}
        cy={y - r * 0.38}
        rx={r * 0.36}
        ry={r * 0.2}
        fill="#FFFFFF"
        opacity="0.85"
        transform={`rotate(-30 ${x - r * 0.32} ${y - r * 0.38})`}
      />
    </g>
  );
}

export function MoleculeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="20 20 340 320" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="fdpmol-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0.3" stopColor="#7EA2F5" stopOpacity="0.3" />
          <stop offset="1" stopColor="#7EA2F5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fdpmol-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#A9B7DE" stopOpacity="0.55" />
          <stop offset="1" stopColor="#A9B7DE" stopOpacity="0" />
        </radialGradient>
        {(Object.keys(SHADES) as Shade[]).map((shade) => (
          <radialGradient key={shade} id={`fdpmol-${shade}`} cx="34%" cy="28%" r="78%">
            <stop offset="0" stopColor={SHADES[shade][0]} />
            <stop offset="0.55" stopColor={SHADES[shade][1]} />
            <stop offset="1" stopColor={SHADES[shade][2]} />
          </radialGradient>
        ))}
      </defs>

      <circle cx={CENTER.x} cy={CENTER.y + 10} r="170" fill="url(#fdpmol-halo)" />
      <ellipse cx="186" cy="322" rx="130" ry="13" fill="url(#fdpmol-shadow)" />

      {ATOMS.map((atom) => (
        <Bond key={`bond-${atom.x}-${atom.y}`} x={atom.x} y={atom.y} />
      ))}
      {ATOMS.map((atom) => (
        <Atom key={`${atom.x}-${atom.y}`} {...atom} />
      ))}
      <Atom x={CENTER.x} y={CENTER.y} r={40} shade="blue" />
    </svg>
  );
}
