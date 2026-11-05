import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";
import { ToolIcon, toolTones } from "@/components/tools/ToolIcon";
import { freeTools } from "@/lib/data/tools";

const BASE = "https://futuredentalprep.com";

export type ToolFaq = { q: string; a: string };
export type ToolSection = { heading: string; body: ReactNode };

type ToolPageLayoutProps = {
  slug: string;
  title: string;
  intro: string;
  /** Short plain-text description used in structured data. */
  description: string;
  children: ReactNode;
  sections: ToolSection[];
  faqs: ToolFaq[];
};

// Shared page shell for the free tools: hero + tool, explainer content, FAQ (with FAQPage schema),
// related tools, and a call to action. Each page supplies its own metadata.
export function ToolPageLayout({ slug, title, intro, description, children, sections, faqs }: ToolPageLayoutProps) {
  const url = `${BASE}/${slug}`;
  const related = freeTools.filter((tool) => tool.slug !== slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: title,
      url,
      description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "Organization", name: "Future Dental Prep", url: BASE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${BASE}/#tools` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F7FD] to-white pt-10 pb-16 sm:pt-14 sm:pb-20">
          <HeroBackdrop />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#5B6782]">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-[#0B1B3A]">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/#tools" className="hover:text-[#0B1B3A]">
                    Free tools
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-semibold text-[#0B1B3A]" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>
            <div className="mb-10 flex max-w-[760px] flex-col gap-4">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5DDEA] bg-white py-1.5 pr-3.5 pl-1.5 text-[13px] font-semibold text-[#0B1B3A]">
                <b className="rounded-full bg-[#E8F6EE] px-2.5 py-0.5 text-xs font-bold text-[#14804A]">Free</b>
                No sign-up needed
              </p>
              <h1 className="text-[clamp(30px,3.6vw,46px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
                {title}
              </h1>
              <p className="text-lg leading-relaxed text-[#5B6782]">{intro}</p>
            </div>
            {children}
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div className="flex max-w-3xl flex-col gap-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#0B1B3A]">{section.heading}</h2>
                  <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-[#33415C]">{section.body}</div>
                </div>
              ))}
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#0B1B3A]">Frequently asked questions</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {faqs.map((faq) => (
                    <details key={faq.q} className="group rounded-2xl border border-[#E4E9F2] bg-white px-5 py-4 open:shadow-[0_12px_28px_-22px_rgba(11,27,58,0.4)]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0B1B3A]">
                        {faq.q}
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF3FE] text-[#1F5BD8] transition-transform group-open:rotate-45">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-[#5B6782]">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-[#0B1B3A] p-6 text-[#C9D4EA]">
                <p className="text-xs font-bold tracking-[0.08em] text-[#9DB9F5] uppercase">Talk to a mentor</p>
                <p className="mt-2 text-lg font-bold text-white">Want an expert to look at your numbers?</p>
                <p className="mt-2 text-sm leading-relaxed">
                  A free 15-minute call with a dentist or dental student mentor can turn these results into a plan.
                </p>
                <Link
                  href="/schedule"
                  className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-white px-5 text-[15px] font-bold text-[#0B1B3A] hover:bg-[#EAF0FF]"
                >
                  Book a free 15-min call
                </Link>
              </div>
              <div className="rounded-2xl border border-[#E4E9F2] bg-white p-5">
                <p className="text-xs font-bold tracking-[0.08em] text-[#5B6782] uppercase">More free tools</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {related.map((tool) => (
                    <li key={tool.slug}>
                      <Link href={`/${tool.slug}`} className="group flex items-center gap-3 rounded-xl p-2 hover:bg-[#F6F8FC]">
                        <span
                          className={`svc-tile svc-tile-${tool.tone} grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br ring-1 ${toolTones[tool.tone].tile}`}
                        >
                          <ToolIcon slug={tool.slug} size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-[#0B1B3A] group-hover:text-[#1F5BD8]">{tool.title}</span>
                          <span className="block text-xs leading-snug text-[#5B6782]">{tool.summary}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
