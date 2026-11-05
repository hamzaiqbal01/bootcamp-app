import Link from "next/link";
import {
  HeroTutorsCard,
  HeroTutorsStrip,
} from "@/components/services/HeroTutors";
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
import { contactLinkForPackage } from "@/lib/contact-link";
import { getPostBySlug } from "@/lib/data/blog";
import { privateDatTutoringPackages } from "@/lib/data/dat-private-tutoring";
import {
  datSectionPages,
  type DatSectionPage,
} from "@/lib/data/dat-section-tutors";

const sectionTitle =
  "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";
const hub = "/private-dat-tutoring";

function schemas(page: DatSectionPage) {
  const url = `${SITE_URL}${hub}/${page.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Private 1-on-1 DAT ${page.section} Tutoring`,
      serviceType: "DAT tutoring",
      description: page.metaDescription,
      url,
      provider: organizationRef,
      areaServed: ["US", "CA"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/schedule`,
        name: "Online, 1-on-1",
      },
      offers: privateDatTutoringPackages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.title,
        price: pkg.priceNow,
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
      { name: "DAT Tutoring", path: hub },
      { name: page.section, path: `${hub}/${page.slug}` },
    ]),
  ];
}

export function DatSectionTutorPage({ page }: { page: DatSectionPage }) {
  const heroTutors = orderedTutors(page.coachIds).slice(0, 3);
  const guide = getPostBySlug(page.guideSlug);
  const posts = page.morePosts
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== undefined);
  const otherSections = datSectionPages.filter(
    (other) => other.slug !== page.slug,
  );

  return (
    <>
      <JsonLd data={schemas(page)} />

      {/* Hero: answer first, then the section facts. */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-8 pb-12 sm:pt-12 sm:pb-14">
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
                <Link href={hub} className="transition hover:text-[#1F5BD8]">
                  DAT Tutoring
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#5B6782]" aria-current="page">
                {page.section}
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

              <dl className="mt-7 grid max-w-[560px] grid-cols-3 gap-3">
                {page.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[16px] border border-[#E4E9F2] bg-white px-4 py-3"
                  >
                    <dt className="text-[11.5px] font-bold tracking-[0.08em] text-[#8A93A3] uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[14.5px] leading-snug font-bold text-[#0B1B3A]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#how"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
                >
                  How we teach it
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

      {/* What the section covers and where students lose points */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className={sectionTitle}>What DAT {page.section} covers</h2>
            <ul className="mt-5 space-y-2.5">
              {page.covers.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-snug text-[#33415C]"
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F5BD8]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={sectionTitle}>Where students lose points</h2>
            <div className="mt-5 grid gap-3">
              {page.hardTopics.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
                >
                  <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                    {topic.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                    {topic.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How the tutor teaches it, plus an example week */}
      <section id="how" className="scroll-mt-24 bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            How a DAT {page.section.replace(/ \(PAT\)$/, "")} tutor works with
            you
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <ol className="space-y-4">
              {page.method.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-[18px] border border-[#E4E9F2] bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-[14px] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-extrabold text-[#0B1B3A]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#33415C]">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="rounded-[20px] border border-[#C9D8F6] bg-white p-6">
              <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                An example week
              </h3>
              <ul className="mt-4 space-y-3.5">
                {page.sampleWeek.map((item) => (
                  <li key={item.day}>
                    <b className="block text-[13px] tracking-[0.04em] text-[#1F5BD8] uppercase">
                      {item.day}
                    </b>
                    <span className="mt-0.5 block text-[14.5px] leading-snug text-[#33415C]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              {guide ? (
                <Link
                  href={`/blog/${guide.slug}`}
                  className="mt-5 inline-flex text-[14px] font-bold text-[#1F5BD8] hover:underline"
                >
                  Free {page.section} study guide →
                </Link>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      {/* Packages: same hours and prices as the main DAT tutoring page */}
      <section id="packages" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>Tutoring packages</h2>
          <p className="mt-3 max-w-[64ch] text-[16px] leading-relaxed text-[#5B6782]">
            Book hours for {page.section} only, or use them across sections. For
            one weak section, 4 or 10 hours is usually enough.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {privateDatTutoringPackages.map((pkg) => (
              <div
                key={pkg.hours}
                className={`flex flex-col rounded-[20px] border bg-white p-5 ${
                  pkg.popular ? "border-[#1F5BD8]" : "border-[#E4E9F2]"
                }`}
              >
                <p className="flex items-baseline gap-2">
                  <span className="text-[32px] leading-none font-extrabold tracking-[-0.03em] text-[#1F5BD8]">
                    {pkg.hours}
                  </span>
                  <span className="text-[14px] font-bold text-[#0B1B3A]">
                    hours
                  </span>
                  {pkg.popular ? (
                    <span className="ml-auto rounded-full bg-[#E8EFFD] px-2.5 py-0.5 text-[11px] font-bold text-[#1F5BD8]">
                      Most popular
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 text-[22px] font-extrabold text-[#0B1B3A] tabular-nums">
                  ${pkg.priceNow.toLocaleString("en-US")}
                  <span className="ml-2 text-[13px] font-semibold text-[#5B6782]">
                    ${Math.round(pkg.priceNow / pkg.hours)}/hour
                  </span>
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5B6782]">
                  {pkg.blurb}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href={contactLinkForPackage(
                      `DAT ${page.section} tutoring, ${pkg.title}`,
                      `$${pkg.priceNow.toLocaleString("en-US")}`,
                    )}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[#D5DDEA] px-4 text-[14px] font-bold whitespace-nowrap text-[#0B1B3A] transition-colors hover:border-[#1F5BD8] hover:bg-[#1F5BD8] hover:text-white"
                  >
                    Choose {pkg.hours} hours
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-[#5B6782]">
            Full details on the{" "}
            <Link
              href={`${hub}#packages`}
              className="font-bold text-[#1F5BD8] hover:underline"
            >
              DAT tutoring page
            </Link>
            . Not sure?{" "}
            <Link
              href="/schedule"
              className="font-bold text-[#1F5BD8] hover:underline"
            >
              Book a free 15-minute call
            </Link>
            .
          </p>
        </div>
      </section>

      <TutorsSection
        title="Meet the DAT tutors"
        intro="Dental students and dentists with top DAT scores. Press play to hear from them; we match you after the free call based on your weak sections."
      />

      <StudentReviews />

      {/* FAQ */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
          <h2 className={sectionTitle}>DAT {page.section} tutoring FAQ</h2>
          <div className="mt-7 flex flex-col gap-3">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[#E4E9F2] bg-white open:border-[#C9D8F6]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-[#0B1B3A] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    className="text-[20px] leading-none text-[#1F5BD8] transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-[#5B6782]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other sections and free guides */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0B1B3A]">
              Tutoring for other DAT sections
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {otherSections.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`${hub}/${other.slug}`}
                    className="text-[15px] font-semibold text-[#1F5BD8] hover:underline"
                  >
                    DAT {other.section} tutor
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={hub}
                  className="text-[15px] font-semibold text-[#1F5BD8] hover:underline"
                >
                  All DAT tutoring
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] font-extrabold text-[#0B1B3A]">
              Free guides
            </h2>
            <ul className="mt-4 space-y-2">
              {[guide, ...posts]
                .filter((post) => post !== undefined)
                .map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[15px] font-semibold text-[#1F5BD8] hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/dat-study-plan-generator"
                  className="text-[15px] font-semibold text-[#1F5BD8] hover:underline"
                >
                  Free DAT study plan generator
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
