import Link from "next/link";
import type { IncludeEntry, ServiceBadge, ServicePackage } from "@/lib/data/services";
import { contactLinkForPackage } from "@/lib/contact-link";

// How many "What's included" items a compact card shows before the rest fold away.
const VISIBLE_INCLUDES = 4;

const BADGE_STYLES: Record<ServiceBadge, string> = {
  platinum: "bg-[#EEF0FF] text-[#4B3FD1]",
  gold: "bg-[#FFF4DB] text-[#9A6A00]",
  express: "bg-[#E3F6EF] text-[#0F7A5C]",
};

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        featured ? "bg-white/15 text-[#9DB9F5]" : "bg-[#E8EFFD] text-[#1F5BD8]"
      }`}
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function IncludeList({ items, featured = false }: { items: IncludeEntry[]; featured?: boolean }) {
  return (
    <ul className={`space-y-2.5 text-[14px] leading-relaxed ${featured ? "text-white/85" : "text-[#33415C]"}`}>
      {items.map((item, i) =>
        typeof item === "string" ? (
          <li key={i} className="flex gap-2.5">
            <CheckIcon featured={featured} />
            <span>{item}</span>
          </li>
        ) : (
          <li key={i} className="flex gap-2.5">
            <CheckIcon featured={featured} />
            <div>
              <span>{item.text}</span>
              <ul className={`mt-1.5 space-y-1 text-[13px] ${featured ? "text-white/60" : "text-[#5B6782]"}`}>
                {item.sub.map((s, j) => (
                  <li key={j} className="flex gap-2">
                    <span className={`mt-2 h-px w-2 shrink-0 ${featured ? "bg-white/30" : "bg-[#C9D2E3]"}`} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}

function Price({ pkg, featured = false }: { pkg: ServicePackage; featured?: boolean }) {
  return (
    <div>
      <div
        className={`flex flex-wrap items-baseline gap-1.5 text-[30px] leading-none font-extrabold tracking-[-0.02em] tabular-nums ${
          featured ? "text-white" : "text-[#0B1B3A]"
        }`}
      >
        <span>{pkg.price}</span>
        {pkg.priceAlt ? (
          <>
            <span className={`text-base font-normal ${featured ? "text-white/40" : "text-[#C9D2E3]"}`}>/</span>
            <span>{pkg.priceAlt}</span>
          </>
        ) : null}
      </div>
      {pkg.priceUnit ? (
        <div
          className={`mt-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase ${
            featured ? "text-white/50" : "text-[#8A93A3]"
          }`}
        >
          {pkg.priceUnit}
        </div>
      ) : null}
    </div>
  );
}

function Narrative({ pkg, featured = false }: { pkg: ServicePackage; featured?: boolean }) {
  const paragraphs = [...(pkg.courseIntros ?? []), ...pkg.descriptions, ...(pkg.courseClosing ?? [])];
  if (paragraphs.length === 0 && !pkg.notes?.length) return null;

  return (
    <div className={`space-y-3 text-[14px] leading-[1.7] ${featured ? "text-white/70" : "text-[#5B6782]"}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {pkg.notes?.map((n, i) => (
        <p
          key={i}
          className={`border-l-2 pl-3 text-[13px] italic ${
            featured ? "border-white/20 text-white/55" : "border-[#DCE5F7] text-[#8A93A3]"
          }`}
        >
          {n}
        </p>
      ))}
    </div>
  );
}

/** Dark, full-width card for the bundle. */
export function FeaturedServiceCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-7 text-white shadow-[0_40px_80px_-50px_rgba(11,27,58,0.8)] sm:p-10">
      <div
        className="pointer-events-none absolute -top-28 -right-20 h-[360px] w-[360px] rounded-full bg-[#1F5BD8]/35 blur-3xl"
        aria-hidden
      />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col">
          {pkg.ribbon ? (
            <span className="inline-flex w-fit rounded-full bg-[#E7A400]/15 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-[#FFD36E] uppercase">
              {pkg.ribbon}
            </span>
          ) : null}
          <h2 className="mt-4 text-[clamp(24px,3vw,32px)] leading-tight font-extrabold tracking-[-0.02em]">
            {pkg.title}
          </h2>
          <div className="mt-5">
            <Price pkg={pkg} featured />
          </div>
          <div className="mt-6">
            <Narrative pkg={pkg} featured />
          </div>
          <Link
            href={contactLinkForPackage(pkg.title, pkg.price)}
            className="mt-8 inline-flex min-h-[50px] w-fit items-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
          >
            {pkg.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
        {pkg.includes.length > 0 ? (
          <div className="rounded-[20px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <h3 className="mb-4 text-[11px] font-bold tracking-[0.14em] text-white/50 uppercase">What&apos;s included</h3>
            <IncludeList items={pkg.includes} featured />
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** Compact card: first few inclusions up front, the rest and the fine print one click away. */
export function ServiceCard({ pkg, titleAs: Title = "h2" }: { pkg: ServicePackage; titleAs?: "h2" | "h3" }) {
  const visible = pkg.includes.slice(0, VISIBLE_INCLUDES);
  const hidden = pkg.includes.slice(VISIBLE_INCLUDES);
  const hasNarrative =
    pkg.descriptions.length > 0 ||
    Boolean(pkg.notes?.length || pkg.courseIntros?.length || pkg.courseClosing?.length);
  const hasMore = hidden.length > 0 || hasNarrative;

  return (
    <article className="flex h-full flex-col rounded-[22px] border border-[#E4E9F2] bg-white p-6 shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-[#C9D8F6] hover:shadow-[0_24px_48px_-32px_rgba(11,27,58,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <Title className="text-[18px] leading-snug font-extrabold text-[#0B1B3A]">{pkg.title}</Title>
        {pkg.badge ? (
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-[0.12em] uppercase ${BADGE_STYLES[pkg.badge]}`}
          >
            {pkg.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <Price pkg={pkg} />
      </div>

      <div className="my-5 h-px bg-[#EEF2F8]" />

      {visible.length > 0 ? <IncludeList items={visible} /> : null}

      {hasMore ? (
        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[13px] font-bold text-[#1F5BD8] hover:underline [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              {hidden.length > 0 ? `See all ${pkg.includes.length} inclusions` : "See details"}
            </span>
            <span className="hidden group-open:inline">Show less</span>
            <svg
              className="transition-transform group-open:rotate-180"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="mt-3 space-y-4">
            {hidden.length > 0 ? <IncludeList items={hidden} /> : null}
            <Narrative pkg={pkg} />
          </div>
        </details>
      ) : null}

      <div className="mt-auto pt-6">
        <Link
          href={contactLinkForPackage(pkg.title, pkg.price)}
          className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#D5DDEA] px-4 text-center text-[14px] font-bold whitespace-nowrap text-[#0B1B3A] transition-colors hover:border-[#1F5BD8] hover:bg-[#1F5BD8] hover:text-white"
        >
          {pkg.cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
