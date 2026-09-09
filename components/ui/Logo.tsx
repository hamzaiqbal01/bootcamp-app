import Link from "next/link";
import { Instrument_Serif, Syne } from "next/font/google";

const logoSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const logoSans = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

type LogoProps = {
  className?: string;
  inverse?: boolean;
};

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="The Dental Prep"
      className={`inline-flex items-center ${inverse ? "text-white" : "text-slate-900"} ${className}`}
    >
      <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap leading-none">
        <span
          className={`${logoSerif.className} text-[15px] sm:text-base ${
            inverse ? "text-indigo-200" : "text-slate-500"
          }`}
        >
          The
        </span>
        <span
          className={`${logoSans.className} text-[17px] font-extrabold tracking-[-0.05em] sm:text-[19px]`}
        >
          Dental{" "}
          <span className={inverse ? "text-indigo-300" : "text-brand-600"}>Prep</span>
        </span>
      </span>
    </Link>
  );
}
