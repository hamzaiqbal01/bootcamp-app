import Link from "next/link";
import type { ServicePage } from "@/lib/data/service-pages";

// Shown under related blog posts: links the how-to article to the matching paid service page.
export function BlogServiceCta({ service }: { service: ServicePage }) {
  return (
    <aside className="mt-10 flex flex-col gap-4 rounded-[20px] border border-[#C9D8F6] bg-[#F4F7FE] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-bold tracking-[0.14em] text-[#1F5BD8] uppercase">Want expert help?</p>
        <p className="mt-1 text-[17px] leading-snug font-extrabold text-[#0B1B3A]">{service.h1}</p>
        <p className="mt-1 text-[14px] text-[#5B6782]">{service.highlights.slice(0, 2).join(" · ")}</p>
      </div>
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full bg-[#1F5BD8] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#1747AC]"
      >
        See {service.shortName.toLowerCase()} →
      </Link>
    </aside>
  );
}
