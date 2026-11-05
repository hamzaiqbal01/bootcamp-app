"use client";

import Link from "next/link";
import { useState } from "react";
import { getPackageWhatsIncluded, privateDatTutoringPackages } from "@/lib/data/dat-private-tutoring";
import { servicePackages } from "@/lib/data/services";
import type { IncludeEntry, ServicePackage } from "@/lib/data/services";
import { contactLinkForPackage } from "@/lib/contact-link";

// One card shape for both admissions packages and DAT tutoring packages.
type Plan = {
  id: string;
  title: string;
  price: string;
  priceWas?: string;
  priceUnit?: string;
  note?: string;
  lines: string[];
};

const usd = (value: number) => `$${value.toLocaleString("en-US")}`;

const tutoringPlans: Plan[] = privateDatTutoringPackages.map((pkg) => ({
  id: `dat-${pkg.hours}`,
  title: `${pkg.hours} hours of 1-on-1 tutoring`,
  price: usd(pkg.priceNow),
  priceWas: usd(pkg.priceWas),
  priceUnit: `$${Math.round(pkg.priceNow / pkg.hours)}/hour`,
  note: `Save ${usd(pkg.save)}`,
  lines: getPackageWhatsIncluded(pkg),
}));

const tutoringPopular = privateDatTutoringPackages.find((pkg) => pkg.popular);

const tabs = [
  {
    id: "statement",
    label: "Personal statement",
    ids: ["ps-express", "ps-gold", "ps-platinum"],
    popular: "ps-gold",
  },
  {
    id: "application",
    label: "Application",
    ids: ["cv-review", "experience", "secondary", "critique"],
    popular: "",
  },
  {
    id: "interview",
    label: "Interview & strategy",
    ids: ["interview", "school-selection", "consulting"],
    popular: "interview",
  },
  {
    id: "dat",
    label: "1-on-1 DAT tutoring",
    ids: tutoringPlans.map((plan) => plan.id),
    popular: tutoringPopular ? `dat-${tutoringPopular.hours}` : "",
  },
];

function includeLines(items: IncludeEntry[]): string[] {
  return items.flatMap((item) =>
    typeof item === "string" ? [item] : [item.text, ...item.sub],
  );
}

function toPlan(pkg: ServicePackage): Plan {
  return {
    id: pkg.id,
    title: pkg.title,
    price: pkg.priceAlt ? `${pkg.price} / ${pkg.priceAlt}` : pkg.price,
    priceUnit: pkg.priceUnit,
    lines: includeLines(pkg.includes),
  };
}

const allPlans: Plan[] = [...tutoringPlans, ...servicePackages.map(toPlan)];

export function PricingTabs({ titleAs = "h2" }: { titleAs?: "h1" | "h2" }) {
  const Title = titleAs;
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((item) => item.id === active) ?? tabs[0];
  const plans = tab.ids
    .map((id) => allPlans.find((plan) => plan.id === id))
    .filter((plan): plan is Plan => Boolean(plan));
  const complete = servicePackages.find((pkg) => pkg.id === "complete");

  return (
    <section id="pricing" className="relative isolate scroll-mt-24 overflow-hidden bg-[#F6F8FC] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(79,123,255,0.22),transparent)]" />
        <div className="absolute -top-28 -right-28 h-[380px] w-[380px] rounded-full border border-[#1F5BD8]/12" />
        <div className="absolute -top-10 -right-10 h-[240px] w-[240px] rounded-full border border-dashed border-[#1F5BD8]/18" />
        <div className="absolute top-0 right-0 h-[420px] w-[520px] bg-[radial-gradient(#1F5BD8_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.22] [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]" />
        <div className="absolute top-24 -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(127,168,255,0.12),transparent)]" />
        <span className="absolute top-[150px] right-[22%] h-2 w-2 rounded-full bg-[#1F5BD8]/25" />
        <span className="absolute top-[70px] right-[34%] h-1.5 w-1.5 rounded-full bg-[#4F8BFF]/30" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 flex max-w-[720px] flex-col items-center gap-3.5 text-center">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            Pricing
          </p>
          <Title className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Flexible packages to fit different needs
          </Title>
          <p className="text-lg text-[#5B6782]">
            Pick the one service you need, or bundle everything and save 10%.
          </p>
        </div>

        <div
          className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[28px] border border-[#E4E9F2] bg-white p-1.5 shadow-[0_8px_24px_-18px_rgba(11,27,58,0.35)]"
          role="tablist"
          aria-label="Package groups"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active}
              onClick={() => setActive(item.id)}
              className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${
                item.id === active
                  ? "bg-[#0B1B3A] text-white"
                  : "text-[#5B6782] hover:bg-[#F1F4FA] hover:text-[#0B1B3A]"
              }`}
            >
              {item.label}
              <span
                className={`rounded-full px-1.5 text-[11px] leading-[18px] ${
                  item.id === active ? "bg-white/15 text-white" : "bg-[#EEF3FE] text-[#1F5BD8]"
                }`}
              >
                {item.ids.length}
              </span>
            </button>
          ))}
        </div>

        <div
          className={`grid items-stretch gap-5 md:grid-cols-2 ${plans.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}
        >
          {plans.map((pkg) => {
            const popular = pkg.id === tab.popular;
            const lines = pkg.lines;
            const shown = lines.slice(0, 6);
            return (
              <article
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl bg-white p-7 transition-shadow ${
                  popular
                    ? "border border-[#1F5BD8] shadow-[0_28px_48px_-30px_rgba(31,91,216,0.65)] ring-1 ring-[#1F5BD8]"
                    : "border border-[#E4E9F2] shadow-[0_10px_30px_-26px_rgba(11,27,58,0.4)] hover:shadow-[0_22px_40px_-28px_rgba(11,27,58,0.45)]"
                }`}
              >
                {popular ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#1F5BD8] px-3 py-1 text-xs font-bold text-white">
                    Most chosen
                  </span>
                ) : null}
                <h3 className="min-h-[56px] text-lg leading-snug font-bold text-[#0B1B3A]">{pkg.title}</h3>
                <p className="mt-3 flex flex-wrap items-baseline gap-1.5">
                  <b className="text-4xl font-extrabold tracking-[-0.03em] text-[#0B1B3A]">{pkg.price}</b>
                  {pkg.priceWas ? <s className="text-base text-[#8A93A3]">{pkg.priceWas}</s> : null}
                  {pkg.priceUnit ? <span className="text-sm text-[#5B6782]">{pkg.priceUnit}</span> : null}
                </p>
                {pkg.note ? (
                  <span className="mt-2 inline-flex w-fit rounded-full bg-[#E3F6EF] px-2.5 py-0.5 text-[12px] font-bold text-[#0F7A5C]">
                    {pkg.note}
                  </span>
                ) : null}
                <Link
                  href={contactLinkForPackage(pkg.title, pkg.price)}
                  className={`mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold transition-colors ${
                    popular
                      ? "bg-[#1F5BD8] text-white hover:bg-[#1747AC]"
                      : "border border-[#C9D6F2] bg-white text-[#1F5BD8] hover:border-[#1F5BD8] hover:bg-[#F4F7FE]"
                  }`}
                >
                  Get started
                  <span className="sr-only">: {pkg.title}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <p className="mt-6 text-xs font-bold tracking-[0.08em] text-[#5B6782] uppercase">What&apos;s included</p>
                <ul className="mt-3 flex flex-col gap-3 text-sm leading-snug text-[#33415C]">
                  {shown.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <CheckIcon />
                      {line}
                    </li>
                  ))}
                  {lines.length > shown.length ? (
                    <li className="pl-[26px] text-[13px] font-semibold text-[#1F5BD8]">
                      + {lines.length - shown.length} more included
                    </li>
                  ) : null}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[15px] text-[#5B6782]">
          Not sure which package fits?{" "}
          <Link href="/schedule" className="font-bold text-[#1F5BD8] hover:underline">
            Book a free 15-minute call
          </Link>
        </p>

        {complete ? (
          <div className="relative mt-10 overflow-hidden rounded-[20px] bg-[#0B1B3A] px-7 py-9 text-[#C9D4EA] sm:px-10">
            <div
              className="pointer-events-none absolute -top-24 -right-16 h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(79,123,255,0.35),transparent)]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="min-w-0 flex-1 basis-[420px]">
                <span className="inline-flex rounded-full bg-[#1F5BD8]/25 px-3 py-1 text-xs font-bold tracking-[0.06em] text-[#BFD3FF] uppercase">
                  Save 10% with the bundle
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-[28px]">{complete.title}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed">{complete.descriptions[0]}</p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <b className="text-[40px] leading-none font-extrabold tracking-[-0.03em] text-white">{complete.price}</b>
                <Link
                  href={contactLinkForPackage(complete.title, complete.price)}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#EAF0FF]"
                >
                  Get the complete package
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#E7EFFE] text-[#1F5BD8]">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
