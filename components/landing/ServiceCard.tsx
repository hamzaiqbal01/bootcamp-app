import { btn, btnSize } from "@/components/ui/button-styles";
import type { IncludeEntry, ServiceBadge, ServicePackage } from "@/lib/data/services";
import { ADMISSION_SERVICES_TYPEFORM } from "@/lib/external-links";

function badgeStyles(badge: ServiceBadge, featured: boolean): string {
  if (featured) {
    return "border-white/20 bg-white/8 text-white/80";
  }
  switch (badge) {
    case "platinum":
      return "border-indigo-200/80 bg-indigo-50/60 text-indigo-800";
    case "gold":
      return "border-amber-200/80 bg-amber-50/70 text-amber-900";
    case "express":
      return "border-emerald-200/80 bg-emerald-50/70 text-emerald-800";
    default:
      return "border-stone-200 text-stone-600";
  }
}

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`mt-1 shrink-0 ${featured ? "text-indigo-300" : "text-brand-600"}`}
    >
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M4.75 8.15 6.9 10.2 11.25 5.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IncludeList({
  items,
  isFeatured = false,
}: {
  items: IncludeEntry[];
  isFeatured?: boolean;
}) {
  return (
    <ul className={`space-y-3 text-[0.95rem] leading-relaxed ${isFeatured ? "text-white/88" : "text-stone-700"}`}>
      {items.map((item, i) =>
        typeof item === "string" ? (
          <li key={i} className="flex gap-3">
            <CheckIcon featured={isFeatured} />
            <span>{item}</span>
          </li>
        ) : (
          <li key={i} className="flex gap-3">
            <CheckIcon featured={isFeatured} />
            <div>
              <span>{item.text}</span>
              <ul className={`mt-2 space-y-1.5 pl-0.5 text-[0.84rem] ${isFeatured ? "text-white/65" : "text-stone-500"}`}>
                {item.sub.map((s, j) => (
                  <li key={j} className="flex gap-2">
                    <span className={`mt-2 h-px w-2.5 shrink-0 ${isFeatured ? "bg-white/30" : "bg-stone-300"}`} />
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

export function ServiceCard({ pkg }: { pkg: ServicePackage }) {
  const isFeatured = pkg.featured;
  const ctaWhite = pkg.ctaVariant === "white";
  const hasNarrative =
    pkg.descriptions.length > 0 || (pkg.notes && pkg.notes.length > 0);

  return (
    <article
      className={`group relative h-fit self-start overflow-hidden rounded-[28px] border transition duration-300 ${
        isFeatured
          ? "border-white/10 bg-[#0B1020] text-white shadow-[0_30px_80px_-28px_rgba(15,23,42,0.55)]"
          : "border-stone-200/90 bg-[#FFFEFB] shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.18)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-10 top-0 h-px ${
          isFeatured
            ? "bg-linear-to-r from-transparent via-indigo-300/80 to-transparent"
            : "bg-linear-to-r from-transparent via-stone-300 to-transparent"
        }`}
      />

      <div className="px-7 pt-8 sm:px-9">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {pkg.badge && (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${badgeStyles(pkg.badge, Boolean(isFeatured))}`}
              >
                {pkg.badge}
              </span>
            )}
            {pkg.ribbon && (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
                  isFeatured
                    ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                {pkg.ribbon}
              </span>
            )}
          </div>

          <div className="shrink-0 text-right">
            <div
              className={`text-[1.75rem] font-semibold tabular-nums tracking-tight sm:text-[1.9rem] ${
                isFeatured ? "text-white" : "text-stone-900"
              }`}
            >
              {pkg.priceAlt ? (
                <span className="flex flex-wrap items-baseline justify-end gap-1.5">
                  <span>{pkg.price}</span>
                  <span className={`text-base font-normal ${isFeatured ? "text-white/40" : "text-stone-300"}`}>
                    /
                  </span>
                  <span>{pkg.priceAlt}</span>
                </span>
              ) : (
                pkg.price
              )}
            </div>
            {pkg.priceUnit && (
              <div
                className={`mt-1 text-xs font-medium uppercase tracking-[0.12em] ${
                  isFeatured ? "text-white/50" : "text-stone-400"
                }`}
              >
                {pkg.priceUnit}
              </div>
            )}
          </div>
        </div>
        <h3
          className={`mt-5 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.65rem] ${
            isFeatured ? "text-white" : "text-stone-900"
          }`}
        >
          {pkg.title}
        </h3>
      </div>

      <div className={`mx-7 mt-6 h-px sm:mx-9 ${isFeatured ? "bg-white/10" : "bg-stone-200/80"}`} />

      <div className="grid gap-6 px-7 py-7 sm:px-9">
        <div>
          {pkg.courseIntros && pkg.courseIntros.length > 0 && (
            <div
              className={`mb-5 space-y-3 text-[0.98rem] leading-[1.75] ${
                isFeatured ? "text-white/75" : "text-stone-600"
              }`}
            >
              {pkg.courseIntros.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {pkg.includes.length > 0 && (
            <>
              <h4
                className={`mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
                  isFeatured ? "text-white/45" : "text-stone-400"
                }`}
              >
                What&apos;s included
              </h4>
              <IncludeList items={pkg.includes} isFeatured={isFeatured} />
            </>
          )}
          {pkg.courseClosing && pkg.courseClosing.length > 0 && (
            <div
              className={`mt-5 space-y-3 text-[0.98rem] leading-[1.75] ${
                isFeatured ? "text-white/75" : "text-stone-600"
              }`}
            >
              {pkg.courseClosing.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        {hasNarrative && (
          <div
            className={`space-y-3 text-[0.95rem] leading-[1.8] ${
              isFeatured ? "text-white/70" : "text-stone-600"
            }`}
          >
            {pkg.descriptions.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {pkg.notes?.map((n, i) => (
              <p
                key={i}
                className={`border-l pl-4 text-[0.82rem] italic ${
                  isFeatured
                    ? "border-white/20 text-white/55"
                    : "border-stone-300 text-stone-500"
                }`}
              >
                {n}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="px-7 pb-8 sm:px-9">
        <a
          href={ADMISSION_SERVICES_TYPEFORM}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${btnSize.md} ${ctaWhite || isFeatured ? btn.inverse : btn.outline}`}
        >
          {pkg.cta}
          <span className="ml-2 text-sm" aria-hidden>
            →
          </span>
        </a>
      </div>
    </article>
  );
}
