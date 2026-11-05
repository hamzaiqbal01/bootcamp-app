import Link from "next/link";
import { servicePages } from "@/lib/data/service-pages";
import { servicePackages } from "@/lib/data/services";
import { HeroSideDecor } from "./HeroSideDecor";
import { FeaturedServiceCard, ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  const featured = servicePackages.find((pkg) => pkg.featured);
  const packages = servicePackages.filter((pkg) => !pkg.featured);

  return (
    <section
      id="services"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_45%,#EEF3FD_100%)] py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.08] blur-3xl"
        aria-hidden
      />
      {/* Keep the side art beside the heading, not down among the cards. */}
      <div className="absolute inset-x-0 top-0 h-[440px]">
        <HeroSideDecor />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-[680px] flex-col items-center gap-3.5 text-center">
          <span className="rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            Package details
          </span>
          <h1 className="text-[clamp(30px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
            Every package, in full
          </h1>
          <p className="text-[17px] leading-relaxed text-[#5B6782]">
            Personal Statement Express, Gold, and Platinum, plus application review, interview coaching, and the
            complete bundle.
          </p>
          <ul className="mt-2 flex flex-wrap justify-center gap-2">
            {servicePages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/services/${page.slug}`}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-[#E4E9F2] bg-white px-4 text-[13.5px] font-bold text-[#33415C] transition hover:border-[#C9D8F6] hover:text-[#1F5BD8]"
                >
                  {page.shortName} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <ServiceCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {featured ? (
          <div className="mt-8">
            <FeaturedServiceCard pkg={featured} />
          </div>
        ) : null}

        <p className="mt-12 text-center text-[15px] text-[#5B6782]">
          Not sure which package fits?{" "}
          <Link href="/schedule" className="font-bold text-[#1F5BD8] hover:underline">
            Book a free 15-minute call
          </Link>
        </p>
      </div>
    </section>
  );
}
