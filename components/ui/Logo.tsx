type LogoProps = {
  className?: string;
  /** Light logo on dark backgrounds (e.g. footer) */
  inverse?: boolean;
};

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <a
      href="#"
      className={`inline-flex items-center gap-2.5 ${inverse ? "text-white" : "text-slate-900"} ${className}`}
    >
      <svg
        className="h-8 w-8 shrink-0"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="32" height="32" rx="8" fill="#4F46E5" />
        <path
          d="M10 22V12C10 9.79 11.79 8 14 8H18C20.21 8 22 9.79 22 12V22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M10 17H22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span
        className={`text-base font-bold tracking-tight ${inverse ? "" : "text-slate-900"}`}
      >
        DentalPath
      </span>
    </a>
  );
}
