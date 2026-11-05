import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  inverse?: boolean;
};

export function Logo({ className = "", inverse = false }: LogoProps) {
  return (
    <Link href="/" aria-label="Future Dental Prep" className={`inline-flex items-center ${className}`}>
      <Image
        src={inverse ? "/images/logo-fdp-dark.png" : "/images/logo-fdp-lockup-trim.png"}
        alt="Future Dental Prep"
        width={inverse ? 1882 : 965}
        height={inverse ? 286 : 145}
        priority={!inverse}
        className={`h-auto w-[11rem] sm:w-[12.25rem] ${inverse ? "" : "theme-light-only"}`}
        style={{ width: "12.25rem", height: "auto" }}
      />
      {inverse ? null : (
        // White lockup with the same layout as the light logo, so it matches in size at the same width.
        <Image
          src="/images/logo-fdp-dark.png"
          alt="Future Dental Prep"
          width={1882}
          height={286}
          className="theme-dark-only h-auto"
          style={{ width: "12.25rem", height: "auto" }}
        />
      )}
    </Link>
  );
}
