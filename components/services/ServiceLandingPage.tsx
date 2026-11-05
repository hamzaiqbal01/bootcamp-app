import Link from "next/link";
import {
  HeroTutorsCard,
  HeroTutorsStrip,
} from "@/components/services/HeroTutors";
import { ServiceCard } from "@/components/landing/ServiceCard";
import {
  orderedTutors,
  StudentReviews,
  TutorsSection,
} from "@/components/services/TrustSections";
import {
  JsonLd,
  SITE_URL,
  breadcrumbSchema,
  organizationRef,
} from "@/components/seo/JsonLd";
import { getPostBySlug } from "@/lib/data/blog";
import { servicePages, type ServicePage } from "@/lib/data/service-pages";
import { servicePackages } from "@/lib/data/services";

function priceNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

/** Structured data for one service page: Service with its package offers, FAQ and breadcrumb. */
function serviceSchemas(page: ServicePage) {
  const url = `${SITE_URL}/services/${page.slug}`;
  const packages = page.packageIds
    .map((id) => servicePackages.find((pkg) => pkg.id === id))
    .filter((pkg) => pkg !== undefined);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: page.shortName,
      description: page.metaDescription,
      url,
      provider: organizationRef,
      areaServed: ["US", "CA"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/schedule`,
        name: "Online, 1-on-1",
      },
      offers: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.title,
        price: priceNumber(pkg.price),
        priceCurrency: "USD",
        url,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "Admissions Services", path: "/services" },
      { name: page.shortName, path: `/services/${page.slug}` },
    ]),
  ];
}

function Check() {
  return (
    <span
      className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3F6EF] text-[#0F7A5C]"
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function ServiceLandingPage({ page }: { page: ServicePage }) {
  const packages = page.packageIds
    .map((id) => servicePackages.find((pkg) => pkg.id === id))
    .filter((pkg) => pkg !== undefined);
  // Three tutors beside the H1: the ones who usually do this service first, then the rest of the team.
  const heroTutors = orderedTutors(page.coachIds).slice(0, 3);
  const posts = page.relatedPosts
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== undefined);
  const otherServices = servicePages.filter(
    (other) => other.slug !== page.slug,
  );
  const sectionTitle =
    "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";

  return (
    <>
      <JsonLd data={serviceSchemas(page)} />

      {/* Hero: explains the topic and points to the free guide first; the service is mentioned, not pushed. */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-8 pb-12 sm:pt-12 sm:pb-14">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.08] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="text-[13.5px] font-medium text-[#8A93A3]"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-[#1F5BD8]">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/services"
                  className="transition hover:text-[#1F5BD8]"
                >
                  Admissions Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#5B6782]" aria-current="page">
                {page.shortName}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div className="max-w-[780px]">
              <h1 className="text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[#0B1B3A]">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-[66ch] text-[17px] leading-relaxed text-[#33415C] sm:text-[18px]">
                {page.answer}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#guide"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
                >
                  Read the free guide
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="#packages"
                  className="inline-flex min-h-[50px] items-center rounded-full border border-[#D5DDEA] bg-white px-7 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
                >
                  See packages
                </a>
              </div>
              <HeroTutorsStrip tutors={heroTutors} />
            </div>
            <HeroTutorsCard tutors={heroTutors} />
          </div>
        </div>
      </section>

      {/* 1. Free help first */}
      <section id="guide" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[12px] font-bold tracking-[0.12em] text-[#0F7A5C] uppercase">
            Free guide
          </span>
          <h2 className={`mt-2 max-w-[760px] ${sectionTitle}`}>
            {page.guide.heading}
          </h2>
          <p className="mt-3 max-w-[68ch] text-[17px] leading-relaxed text-[#5B6782]">
            {page.guide.intro}
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <ol className="space-y-4">
              {page.guide.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-[14px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-extrabold text-[#0B1B3A]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[15.5px] leading-relaxed text-[#33415C]">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-[20px] border border-[#C9D8F6] bg-white p-6 shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)] lg:sticky lg:top-28">
              <p className="text-[16px] font-extrabold text-[#0B1B3A]">
                {page.guide.checklistTitle}
              </p>
              <ul className="mt-4 space-y-3">
                {page.guide.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-[#33415C]"
                  >
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {page.relatedLinks?.length ? (
                <div className="mt-5 border-t border-[#EEF2F8] pt-4">
                  {page.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-[14px] font-bold text-[#1F5BD8] hover:underline"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Then how we can help, and the packages */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[12px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">
            Want expert help?
          </span>
          <h2 className={`mt-2 ${sectionTitle}`}>How it works with us</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[20px] border border-[#E4E9F2] bg-white p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EFFD] text-[13px] font-bold text-[#1F5BD8]">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-[16px] font-bold text-[#0B1B3A]">
                  {step.title}
                </h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-[#5B6782]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="packages"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#F3F6FD_0%,#EEF3FD_100%)] py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            {packages.length > 1 ? "Packages and prices" : "Package and price"}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#E4E9F2] bg-white px-3.5 py-1.5 text-[13px] font-bold text-[#33415C]"
              >
                {item}
              </li>
            ))}
          </ul>
          <div
            className={`mt-8 grid gap-5 ${
              packages.length >= 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : packages.length === 2
                  ? "sm:grid-cols-2"
                  : "max-w-[440px]"
            }`}
          >
            {packages.map((pkg) => (
              <ServiceCard key={pkg.id} pkg={pkg} titleAs="h3" />
            ))}
          </div>
          <p className="mt-8 text-[15px] text-[#5B6782]">
            Not sure which fits?{" "}
            <Link
              href="/schedule"
              className="font-bold text-[#1F5BD8] hover:underline"
            >
              Book a free 15-minute call
            </Link>{" "}
            or{" "}
            <Link
              href="/pricing"
              className="font-bold text-[#1F5BD8] hover:underline"
            >
              compare all prices
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 3. More detail about the service */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
          {page.sections.map((section) => (
            <div key={section.heading} className="mb-12 last:mb-0">
              <h2 className="text-[clamp(22px,2.6vw,30px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
                {section.heading}
              </h2>
              {section.paragraphs.map((text) => (
                <p
                  key={text.slice(0, 40)}
                  className="mt-4 text-[17px] leading-[1.8] text-[#33415C]"
                >
                  {text}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[16px] leading-relaxed text-[#33415C]"
                    >
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Tutors, with their intro videos */}
      <TutorsSection />

      {/* 5. Reviews */}
      <StudentReviews />

      {/* 6. FAQ */}
      <section className="bg-[linear-gradient(180deg,#F3F6FD_0%,#EEF3FD_100%)] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
          <h2 className={`text-center ${sectionTitle}`}>
            Frequently asked questions
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {page.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-2xl border border-[#E4E9F2] bg-white transition-colors open:border-[#C9D8F6]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-[#0B1B3A] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[16px]">{faq.question}</h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1F5BD8] group-open:text-white">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pr-16 pb-5 text-[15px] leading-relaxed text-[#5B6782]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-7 text-white sm:p-9">
            <div
              className="pointer-events-none absolute -top-16 -right-12 h-48 w-48 rounded-full bg-[#1F5BD8]/40 blur-3xl"
              aria-hidden
            />
            <p className="relative text-[20px] font-extrabold">
              Still deciding?
            </p>
            <p className="relative mt-1 text-[14.5px] text-white/70">
              Tell us where you are in the cycle. A free 15-minute call, no
              obligation.
            </p>
            <Link
              href="/schedule"
              className="relative mt-5 inline-flex min-h-[48px] items-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition hover:bg-[#E8EFFD]"
            >
              Book a free call →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. More free guides and other services */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            More free guides
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[20px] border border-[#E4E9F2] bg-[#F7F9FD] p-5 transition hover:-translate-y-0.5 hover:border-[#C9D8F6]"
              >
                <span className="text-[11px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">
                  {post.category}
                </span>
                <span className="mt-2 line-clamp-3 text-[15px] leading-snug font-extrabold text-[#0B1B3A] transition group-hover:text-[#1F5BD8]">
                  {post.title}
                </span>
                <span className="mt-auto pt-3 text-[12.5px] text-[#8A93A3]">
                  {post.readingTime}
                </span>
              </Link>
            ))}
          </div>

          <h2 className="mt-14 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Other admissions services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-[#E4E9F2] bg-white px-5 text-[14px] font-bold text-[#0B1B3A] transition hover:border-[#C9D8F6] hover:text-[#1F5BD8]"
                >
                  {other.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center rounded-full border border-[#E4E9F2] bg-white px-5 text-[14px] font-bold text-[#1F5BD8] transition hover:border-[#C9D8F6]"
              >
                All services →
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
