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
import {
  CANADA_CHECKED,
  canadaFaqs,
  canadianSchools,
  datComparison,
  usSchoolsAcceptingCanadianDat,
} from "@/lib/data/canada";

const sectionTitle =
  "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";

export const CANADA_TITLE =
  "Dental School Admissions Help for Canadian Applicants | FDP";
export const CANADA_DESCRIPTION =
  "Applying to dental school from Canada? All 10 Canadian schools compared, Canadian DAT vs US DAT, and how Canadians apply to US dental schools through AADSAS.";

const takeaways = [
  "Canada has 10 dental schools, and each runs its own admissions. Three of them (UBC, Toronto, Dalhousie) also take ADEA AADSAS.",
  "Most Canadian schools want the Canadian DAT. McGill and Montréal do not require the DAT this cycle.",
  "The Canadian DAT has no organic chemistry or QR and is scored 1–30. The US DAT is scored 200–600.",
  "Many schools strongly prefer in-province applicants, so most Canadians also apply to US schools.",
];

const help = [
  {
    title: "Applying to US schools",
    text: "Same help as US applicants: school list, AADSAS review, personal statement, secondaries and interviews.",
    href: "/services",
    cta: "See application services",
  },
  {
    title: "Interviews and MMIs",
    text: "Alberta, Saskatchewan and McGill use MMIs; others use panel interviews. We run mock interviews in the format your school uses.",
    href: "/services/dental-school-interview-prep",
    cta: "Interview prep",
  },
  {
    title: "DAT tutoring",
    text: "We tutor the US DAT. Biology, general chemistry, PAT and reading are on both tests, so ask on a free call if you are taking the Canadian DAT.",
    href: "/private-dat-tutoring",
    cta: "DAT tutoring",
  },
];

function schemas() {
  const url = `${SITE_URL}/canada`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Dental school admissions help for Canadian applicants",
      serviceType: "Dental school admissions consulting",
      description: CANADA_DESCRIPTION,
      url,
      provider: organizationRef,
      areaServed: { "@type": "Country", name: "Canada" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/schedule`,
        name: "Online, 1-on-1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: canadaFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([{ name: "Canadian Applicants", path: "/canada" }]),
  ];
}

export function CanadaPage() {
  const heroTutors = orderedTutors([
    "dr-todd-chastain",
    "celina-yang",
    "hansuja-chaurasia",
  ]).slice(0, 3);

  return (
    <>
      <JsonLd data={schemas()} />

      {/* Hero */}
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
              <li className="text-[#5B6782]" aria-current="page">
                Canadian Applicants
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div className="max-w-[780px]">
              <h1 className="text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[#0B1B3A]">
                Dental School Admissions for Canadian Applicants
              </h1>
              <p className="mt-5 max-w-[66ch] text-[17px] leading-relaxed text-[#33415C] sm:text-[18px]">
                Applying to dental school from Canada works differently from the
                US. Canada has 10 dental schools, each with its own application,
                DAT rules and interview format, and most give priority to
                residents of their province. That is why many Canadians apply to
                US schools through ADEA AADSAS as well. This page compares all
                10 schools and both DATs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#schools"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
                >
                  Compare the 10 schools
                  <span aria-hidden>↓</span>
                </a>
                <Link
                  href="/schedule"
                  className="inline-flex min-h-[50px] items-center rounded-full border border-[#D5DDEA] bg-white px-7 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
                >
                  Book a free call
                </Link>
              </div>
              <HeroTutorsStrip tutors={heroTutors} />
            </div>
            <HeroTutorsCard tutors={heroTutors} />
          </div>

          <div className="mt-10 rounded-[20px] border border-[#C9D8F6] bg-white p-6">
            <h2 className="text-[16px] font-bold text-[#0B1B3A]">
              Key takeaways
            </h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {takeaways.map((item) => (
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
        </div>
      </section>

      {/* The 10 schools */}
      <section id="schools" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            The 10 Canadian dental schools: how to apply
          </h2>
          <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-[#5B6782]">
            Dates are for the 2026–27 cycle (Fall 2027 entry), checked on each
            school&apos;s own page in {CANADA_CHECKED}. Rules change every year,
            so confirm on the school&apos;s page before you apply.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {canadianSchools.map((school) => (
              <article
                key={school.name}
                className="rounded-[20px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[17px] font-extrabold text-[#0B1B3A]">
                      {school.name}
                    </h3>
                    <p className="text-[13px] text-[#5B6782]">
                      {school.province} · {school.program}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {school.aadsas ? (
                      <span className="rounded-full bg-[#E8EFFD] px-2.5 py-0.5 text-[11.5px] font-bold text-[#1F5BD8]">
                        AADSAS option
                      </span>
                    ) : null}
                    {school.french ? (
                      <span className="rounded-full bg-[#FFF4DB] px-2.5 py-0.5 text-[11.5px] font-bold text-[#8A5A00]">
                        Taught in French
                      </span>
                    ) : null}
                  </div>
                </div>
                <dl className="mt-4 grid gap-2.5 text-[14.5px] leading-snug">
                  <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2">
                    <dt className="font-bold text-[#0B1B3A]">Apply</dt>
                    <dd className="text-[#33415C]">{school.apply}</dd>
                  </div>
                  <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2">
                    <dt className="font-bold text-[#0B1B3A]">DAT</dt>
                    <dd className="text-[#33415C]">{school.dat}</dd>
                  </div>
                  <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2">
                    <dt className="font-bold text-[#0B1B3A]">Deadline</dt>
                    <dd className="text-[#33415C]">{school.deadline}</dd>
                  </div>
                </dl>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {school.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full border border-[#E4E9F2] bg-white px-2.5 py-1 text-[12.5px] text-[#5B6782]"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
                <a
                  href={school.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-[13px] font-bold text-[#1F5BD8] hover:underline"
                >
                  Official admissions page ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Canadian DAT vs US DAT */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>Canadian DAT vs US DAT</h2>
          <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-[#5B6782]">
            They are different tests. Alberta accepts only the Canadian DAT,
            while UBC, Western and Toronto accept either. If you also apply to
            US schools, check which DAT each one accepts before you register.
          </p>
          <div className="mt-8 overflow-x-auto rounded-[20px] border border-[#E4E9F2] bg-white">
            <table className="w-full min-w-[560px] text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-[#E4E9F2] text-[#0B1B3A]">
                  <th scope="col" className="px-5 py-3.5 font-bold">
                    &nbsp;
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-bold">
                    Canadian DAT
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-bold">
                    US DAT
                  </th>
                </tr>
              </thead>
              <tbody>
                {datComparison.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-[#EEF2F8] last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-3 font-bold text-[#0B1B3A]"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-3 text-[#33415C]">{row.canadian}</td>
                    <td className="px-5 py-3 text-[#33415C]">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] text-[#5B6782]">
            Sources:{" "}
            <a
              href="https://www.cda-adc.ca/for-prospective-dentists/dat/faqs"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1F5BD8] hover:underline"
            >
              CDA DAT FAQ
            </a>{" "}
            and the{" "}
            <a
              href="https://www.ada.org/education/testing/exams/dental-admission-test-dat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1F5BD8] hover:underline"
            >
              ADA DAT page
            </a>
            . More on US scores:{" "}
            <Link
              href="/blog/dat-scoring-scale-200-600"
              className="font-semibold text-[#1F5BD8] hover:underline"
            >
              200–600 DAT conversion chart
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Applying to US schools */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className={sectionTitle}>
              Applying to US dental schools from Canada
            </h2>
            <ul className="mt-5 space-y-3.5 text-[15.5px] leading-relaxed text-[#33415C]">
              <li>
                <b className="text-[#0B1B3A]">One application.</b> Canadians
                apply through ADEA AADSAS, the same system US applicants use.
              </li>
              <li>
                <b className="text-[#0B1B3A]">Transcripts.</b> Transcripts from
                English-language Canadian universities are treated like US
                transcripts. Transcripts from French-language universities need
                a WES or ECE evaluation.
              </li>
              <li>
                <b className="text-[#0B1B3A]">DAT.</b> Most US schools want the
                US DAT. Some accept the Canadian DAT, and that list changes, so
                check each school.
              </li>
              <li>
                <b className="text-[#0B1B3A]">Money.</b> Some US schools limit
                financial aid to US citizens and permanent residents. Check the
                cost and aid page of every school on your list.
              </li>
            </ul>
            <p className="mt-5 text-[15px] text-[#5B6782]">
              Planning the US side? See the{" "}
              <Link
                href="/blog/dental-school-application-timeline"
                className="font-semibold text-[#1F5BD8] hover:underline"
              >
                AADSAS application timeline
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="text-[18px] font-extrabold text-[#0B1B3A]">
              Examples of US schools and the Canadian DAT
            </h3>
            <ul className="mt-4 space-y-3">
              {usSchoolsAcceptingCanadianDat.map((school) => (
                <li
                  key={school.name}
                  className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-4"
                >
                  <a
                    href={school.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-bold text-[#0B1B3A] hover:text-[#1F5BD8]"
                  >
                    {school.name} ↗
                  </a>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#5B6782]">
                    {school.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>How we help Canadian applicants</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {help.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-[20px] border border-[#E4E9F2] bg-white p-5"
              >
                <h3 className="text-[17px] font-extrabold text-[#0B1B3A]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                  {item.text}
                </p>
                <Link
                  href={item.href}
                  className="mt-auto pt-4 text-[14px] font-bold text-[#1F5BD8] hover:underline"
                >
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TutorsSection />
      <StudentReviews />

      {/* FAQ */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6">
          <h2 className={sectionTitle}>FAQ for Canadian applicants</h2>
          <div className="mt-7 flex flex-col gap-3">
            {canadaFaqs.map((faq) => (
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
          <div className="mt-10 rounded-[20px] bg-[#0B1B3A] p-6 text-center text-white sm:p-8">
            <h2 className="text-[22px] font-extrabold">
              Not sure where to apply?
            </h2>
            <p className="mx-auto mt-2 max-w-[48ch] text-[15px] text-white/70">
              Book a free 15-minute call. We will look at your province, DAT and
              grades and help you build a list.
            </p>
            <Link
              href="/schedule"
              className="mt-5 inline-flex min-h-[48px] items-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
            >
              Book a free call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
