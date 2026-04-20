import type { IncludeEntry, ServiceBadge, ServicePackage } from "@/lib/data/services";
import { ADMISSION_SERVICES_TYPEFORM } from "@/lib/external-links";

function badgeStyles(badge: ServiceBadge): string {
  switch (badge) {
    case "platinum":
      return "bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-800";
    case "gold":
      return "bg-linear-to-br from-amber-100 to-amber-200 text-amber-800";
    case "express":
      return "bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-800";
    case "course":
      return "bg-linear-to-br from-fuchsia-100 to-pink-200 text-pink-800";
    default:
      return "";
  }
}

function IncludeList({
  items,
  isFeatured = false,
}: {
  items: IncludeEntry[];
  isFeatured?: boolean;
}) {
  return (
    <ul
      className={`space-y-2.5 text-[0.98rem] leading-[1.6] ${isFeatured ? "text-white/95" : "text-slate-800"}`}
    >
      {items.map((item, i) =>
        typeof item === "string" ? (
          <li key={i} className="relative pl-6">
            <span
              className={`absolute left-0 top-[0.42rem] h-2.5 w-2.5 rounded-full ${isFeatured ? "bg-white/35" : "bg-brand-600/20"}`}
            />
            {item}
          </li>
        ) : (
          <li key={i} className="relative pl-6">
            <span
              className={`absolute left-0 top-[0.42rem] h-2.5 w-2.5 rounded-full ${isFeatured ? "bg-white/35" : "bg-brand-600/20"}`}
            />
            {item.text}
            <ul
              className={`mt-2 space-y-1.5 pl-1 text-[0.85rem] ${isFeatured ? "text-white/80" : "text-slate-500"}`}
            >
              {item.sub.map((s, j) => (
                <li key={j} className="relative pl-5">
                  <span
                    className={`absolute left-0 top-[0.45rem] h-1.5 w-1.5 rounded-full ${isFeatured ? "bg-white/45" : "bg-slate-400/40"}`}
                  />
                  {s}
                </li>
              ))}
            </ul>
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
      className={`relative h-fit self-start overflow-hidden rounded-[20px] border bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] ${
        isFeatured
          ? "border-transparent bg-linear-to-br from-brand-600 to-violet-600 text-white"
          : "border-slate-200 hover:border-indigo-200"
      }`}
    >
      {pkg.ribbon && (
        <div className="absolute right-[-32px] top-5 rotate-45 bg-amber-500 px-10 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-white shadow-md">
          {pkg.ribbon}
        </div>
      )}

      <div className={`px-6 pb-0 pt-7 sm:px-9 ${isFeatured ? "" : ""}`}>
        <div className="flex flex-wrap items-start gap-3">
          <div className="space-y-2">
            {pkg.badge && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] ${badgeStyles(pkg.badge)}`}
              >
                {pkg.badge}
              </span>
            )}
            <h3
              className={`text-[1.5rem] font-extrabold tracking-[-0.01em] ${isFeatured ? "text-white" : "text-slate-900"}`}
            >
              {pkg.title}
            </h3>
          </div>
          <div className="ml-auto text-right">
            <div
              className={`text-[2.1rem] font-extrabold tracking-[-0.02em] ${isFeatured ? "text-white" : "text-brand-600"}`}
            >
              {pkg.priceAlt ? (
                <span className="flex flex-wrap items-baseline justify-end gap-2">
                  <span>{pkg.price}</span>
                  <span className={`text-lg font-normal ${isFeatured ? "text-white/70" : "text-slate-400"}`}>/</span>
                  <span>{pkg.priceAlt}</span>
                </span>
              ) : (
                pkg.price
              )}
            </div>
            {pkg.priceUnit && (
              <div className={`mt-0.5 text-[0.95rem] font-medium ${isFeatured ? "text-white/75" : "text-slate-600"}`}>{pkg.priceUnit}</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 sm:px-9 sm:py-7">
        <div>
          {pkg.courseIntros && pkg.courseIntros.length > 0 && (
            <div className={`mb-4 space-y-3 text-[1rem] leading-[1.75] ${isFeatured ? "text-white/90" : "text-slate-700"}`}>
              {pkg.courseIntros.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {pkg.includes.length > 0 && (
            <>
              <h4 className={`mb-3.5 text-[0.95rem] font-bold uppercase tracking-[0.05em] ${isFeatured ? "text-white/80" : "text-slate-600"}`}>
                What&apos;s included:
              </h4>
              <IncludeList items={pkg.includes} isFeatured={isFeatured} />
            </>
          )}
          {pkg.courseClosing && pkg.courseClosing.length > 0 && (
            <div className={`mt-5 space-y-3 text-[1rem] leading-[1.75] ${isFeatured ? "text-white/90" : "text-slate-700"}`}>
              {pkg.courseClosing.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        {hasNarrative && (
          <div
            className={`space-y-3 text-[1rem] leading-[1.85] ${isFeatured ? "text-white/90" : "text-slate-700"}`}
          >
            {pkg.descriptions.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {pkg.notes?.map((n, i) => (
              <p
                key={i}
                className={`border-l-[3px] pl-3.5 text-[0.85rem] italic ${
                  isFeatured
                    ? "border-white/35 text-white/80"
                    : "border-slate-300 text-slate-600"
                }`}
              >
                {n}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-7 sm:px-9">
        <a
          href={ADMISSION_SERVICES_TYPEFORM}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition ${
            ctaWhite || isFeatured
              ? "bg-white text-brand-700 shadow-sm hover:bg-indigo-50"
              : "bg-brand-600 text-white hover:bg-brand-700"
          }`}
        >
          {pkg.cta}{" "}
          <span className="ml-1 inline-block" aria-hidden>
            →
          </span>
        </a>
      </div>
    </article>
  );
}
