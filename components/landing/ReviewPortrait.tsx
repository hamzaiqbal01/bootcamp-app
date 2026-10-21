type Portrait = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  style: "short" | "long" | "bob" | "curly" | "buzz";
};

const PORTRAITS: Portrait[] = [
  { bg: "#E7EEF8", skin: "#F0C2A0", hair: "#2C2118", shirt: "#4338CA", style: "long" },
  { bg: "#F8EDE4", skin: "#E8B48A", hair: "#6B3A22", shirt: "#0F172A", style: "bob" },
  { bg: "#E8F3EE", skin: "#F3D0B5", hair: "#1F1A17", shirt: "#4F46E5", style: "short" },
  { bg: "#EEF2FF", skin: "#C68642", hair: "#1A120B", shirt: "#1E293B", style: "buzz" },
  { bg: "#F4EFE6", skin: "#8D5524", hair: "#120C09", shirt: "#312E81", style: "short" },
  { bg: "#FDECEC", skin: "#F1C6A8", hair: "#4A2C20", shirt: "#3730A3", style: "long" },
  { bg: "#EAF2F8", skin: "#D9A066", hair: "#24160F", shirt: "#0B1020", style: "curly" },
  { bg: "#F3F0EA", skin: "#A86B3C", hair: "#1C140F", shirt: "#4F46E5", style: "buzz" },
  { bg: "#E9F2F1", skin: "#EDC0A3", hair: "#3A2A22", shirt: "#1E1B4B", style: "short" },
  { bg: "#F7EEE8", skin: "#C47A4A", hair: "#2A160E", shirt: "#312E81", style: "bob" },
  { bg: "#EEF0F6", skin: "#8D5524", hair: "#140E0B", shirt: "#0F172A", style: "curly" },
  { bg: "#F6F1E8", skin: "#E0A87A", hair: "#3D2914", shirt: "#4338CA", style: "short" },
  { bg: "#EDEAF6", skin: "#F0C7A8", hair: "#1A1412", shirt: "#1E293B", style: "long" },
  { bg: "#E7F0EA", skin: "#B7794B", hair: "#24170F", shirt: "#3730A3", style: "bob" },
];

function Hair({ style, color }: { style: Portrait["style"]; color: string }) {
  if (style === "buzz") {
    return <path d="M22 38c2-14 14-22 28-22s26 8 28 22c-6-6-16-8-28-8s-22 2-28 8z" fill={color} />;
  }
  if (style === "long") {
    return (
      <path
        d="M20 46c1-20 14-30 30-30s29 10 30 30c2 18-4 34-10 40-2-16-8-24-20-24s-18 8-20 24c-6-6-12-22-10-40z"
        fill={color}
      />
    );
  }
  if (style === "bob") {
    return (
      <path
        d="M18 52c2-22 14-34 32-34s30 12 32 34c-4 10-8 14-14 14-2-12-8-18-18-18s-16 6-18 18c-6 0-10-4-14-14z"
        fill={color}
      />
    );
  }
  if (style === "curly") {
    return (
      <path
        d="M24 36c-8 2-12 12-8 20 2-8 8-10 14-8-6 6-8 14-2 20 4-8 12-10 16-6-2 8 4 16 12 16 10 0 16-10 12-18 8 2 14-6 12-14-4 6-12 6-16 2 2-10-4-18-14-18-8 0-16 4-26 6z"
        fill={color}
      />
    );
  }
  return <path d="M24 40c1-16 12-24 26-24s25 8 26 24c-4-8-14-12-26-12s-22 4-26 12z" fill={color} />;
}

function Figure({ portrait }: { portrait: Portrait }) {
  return (
    <>
      <path d="M18 100c6-18 18-28 32-28s26 10 32 28" fill={portrait.shirt} />
      <Hair style={portrait.style} color={portrait.hair} />
      <circle cx="50" cy="46" r="18" fill={portrait.skin} />
      <circle cx="44" cy="45" r="1.2" fill="#1C1917" />
      <circle cx="56" cy="45" r="1.2" fill="#1C1917" />
      <path d="M46 53c2.2 2 5.8 2 8 0" fill="none" stroke="#7C4A2D" strokeWidth="1.2" strokeLinecap="round" />
    </>
  );
}

export function ReviewPortrait({
  name,
  index,
  cover = false,
}: {
  name: string;
  index: number;
  cover?: boolean;
}) {
  const portrait = PORTRAITS[index % PORTRAITS.length];

  if (cover) {
    return (
      <svg
        viewBox="0 0 320 214"
        role="img"
        aria-label={`${name} portrait`}
        className="aspect-[1280/854] w-full"
      >
        <rect width="320" height="214" fill={portrait.bg} />
        <circle cx="160" cy="118" r="86" fill="#fff" fillOpacity="0.45" />
        <g transform="translate(92 28) scale(1.35)">
          <Figure portrait={portrait} />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={`${name} portrait`} className="h-14 w-14 shrink-0 rounded-full">
      <rect width="100" height="100" fill={portrait.bg} />
      <Figure portrait={portrait} />
    </svg>
  );
}
