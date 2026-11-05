import type { ToolTone } from "@/lib/data/tools";

// Icon tile colours per tool tone, shared by the homepage grid and the tool pages.
export const toolTones: Record<ToolTone, { tile: string; glow: string; accent: string }> = {
  blue: { tile: "from-[#EAF1FF] to-[#C7D8FF] text-[#1F5BD8] ring-[#D6E2FF]", glow: "rgba(79,123,255,0.22)", accent: "#1F5BD8" },
  green: { tile: "from-[#E4F8EF] to-[#B8EBD3] text-[#12925F] ring-[#CDEFE0]", glow: "rgba(53,185,141,0.2)", accent: "#12925F" },
  purple: { tile: "from-[#F1ECFF] to-[#D6C9FF] text-[#6B47D6] ring-[#E2DAFF]", glow: "rgba(139,108,255,0.2)", accent: "#6B47D6" },
  orange: { tile: "from-[#FFF1E7] to-[#FFD2B5] text-[#D9622B] ring-[#FFE0CC]", glow: "rgba(240,139,107,0.2)", accent: "#D9622B" },
};

export function ToolIcon({ slug, size = 20 }: { slug: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (slug) {
    case "dat-study-plan-generator":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h3M8 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "aadsas-gpa-calculator":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "dat-score-calculator":
      return (
        <svg {...common}>
          <path d="M4 17a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="m12 17 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.4" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 11h6M9 14.5h6M9 18h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}
