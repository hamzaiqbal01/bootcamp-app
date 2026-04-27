import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Light logo on dark backgrounds (e.g. footer) */
  inverse?: boolean;
};

/**
 * Molar-inspired mark: wide crown, subtle waist, two rounded roots.
 * Inverted: white tile + indigo tooth (footer). Default: indigo tile + white tooth.
 */
function ToothMark({ inverse }: { inverse: boolean }) {
  const tile = inverse ? "white" : "var(--color-brand-600, #4f46e5)";
  const tooth = inverse ? "var(--color-brand-600, #4f46e5)" : "white";
  return (
    <svg
      className="h-8 w-8 shrink-0"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill={tile} />
      <path
        fill={tooth}
        d="M10.2 8.1C10.2 5.3 12.4 3 16 3s5.8 2.2 5.8 5.1c.6-.35 1.3-.55 2-.55 1.4 0 2.5 1.1 2.5 2.4 0 1.5-.4 2.5-1.1 3.1v5.1c0 2-1.3 3.2-2.2 3.2-.4 0-.7-.1-1.1-.25-.25 1-1.2 1.6-1.2 1.6v1.1c0 .4-.1.6-.1.6s-.4 1-1.6 1-1.7-1-1.7-1h-.1s-.4 1-1.5 1-1.5-1-1.5-1h-.1s-.4 1-1.6 1-1.7-1-1.7-1-.1-.2-.1-.6v-1.1s-.9-.5-1.1-1.4c-.35.1-.7.2-1.1.2-.8 0-2.1-1.1-2.1-3.1v-5.2a3.1 3.1 0 0 1-1.1-2.5c0-1.1.9-2.1 2-2.3.1-.1.1-.1.1-.1z
            M10.1 8.1v.1z"
      />
    </svg>
  );
}

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${inverse ? "text-white" : "text-slate-900"} ${className}`}
    >
      <ToothMark inverse={inverse} />
      <span
        className={`text-base font-bold tracking-tight ${inverse ? "" : "text-slate-900"}`}
      >
        DentalPath
      </span>
    </Link>
  );
}
