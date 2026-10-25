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
        src={inverse ? "/images/logo-fdp-wordmark-white.png" : "/images/logo-fdp-lockup.png"}
        alt="Future Dental Prep"
        width={1024}
        height={inverse ? 292 : 221}
        priority={!inverse}
        className="h-auto w-[11rem] sm:w-[12.25rem]"
        style={{ width: "12.25rem", height: "auto" }}
      />
    </Link>
  );
}
