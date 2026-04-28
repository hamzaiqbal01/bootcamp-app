import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Light treatment on dark backgrounds (e.g. footer): white tile behind the mark */
  inverse?: boolean;
};

const LOGO_PX = 56;

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="DentalPath"
      className={`inline-flex items-center ${inverse ? "text-white" : "text-slate-900"} ${className}`}
    >
      <span
        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden ${
          inverse ? "rounded-lg bg-white" : ""
        }`}
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={LOGO_PX}
          height={LOGO_PX}
          className="h-full w-full object-contain"
          priority
        />
      </span>
    </Link>
  );
}
