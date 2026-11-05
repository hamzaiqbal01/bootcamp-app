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
  INTERNATIONAL_CHECKED,
  intlFaqs,
  schoolsAccepting,
  schoolsNotAccepting,
  steps,
  type IntlSchool,
} from "@/lib/data/international";

const sectionTitle =
  "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";

export const INTL_TITLE = "US Dental School for International Students | FDP";
export const INTL_DESCRIPTION =
  "Applying to US dental school as an international student: US coursework, WES/ECE evaluations, the DAT, TOEFL, escrow deposits, the F-1 visa and which schools accept you.";

const takeaways = [
  "Most US dental schools accept international students, but every school sets its own rules, and some public schools do not.",
  "Many schools want US or Canadian coursework, often 60 to 93 semester units or a full degree.",
  "There is no US federal aid for F-1 students, and some schools ask for an escrow deposit of up to four years of tuition.",
  "The US DAT is only offered in the US, its territories and parts of Canada.",
];

const help = [
  {
    title: "Building your school list",
    text: "We sort schools by their international policy, coursework rules and costs, so you only pay to apply where you can be admitted.",
    href: "/services/dental-school-list",
    cta: "School list help",
  },
  {
    title: "Your AADSAS application",
    text: "Personal statement, experiences and secondaries reviewed 1-on-1 by tutors who went through admissions recently.",
    href: "/services/aadsas-application-review",
    cta: "Application review",
  },
  {
    title: "DAT tutoring",
    text: "1-on-1 online tutoring for every US DAT section, from tutors with top DAT scores.",
    href: "/private-dat-tutoring",
    cta: "DAT tutoring",
  },
];

function schemas() {
  const url = `${SITE_URL}/international-applicants`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "US dental school admissions help for international students",
      serviceType: "Dental school admissions consulting",
      description: INTL_DESCRIPTION,
      url,
      provider: organizationRef,
      areaServed: "Worldwide",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${SITE_URL}/schedule`,
        name: "Online, 1-on-1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: intlFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "International Applicants", path: "/international-applicants" },
    ]),
  ];
}

function SchoolList({ schools }: { schools: IntlSchool[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {schools.map((school) => (
        <li
          key={school.name}
          className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
        >
          <a
            href={school.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] font-bold text-[#0B1B3A] hover:text-[#1F5BD8]"
          >
            {school.name} ↗
          </a>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
            {school.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function InternationalPage() {
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
                International Applicants
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div className="max-w-[780px]">
              <h1 className="text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[#0B1B3A]">
                Applying to US Dental School as an International Student
              </h1>
              <p className="mt-5 max-w-[66ch] text-[17px] leading-relaxed text-[#33415C] sm:text-[18px]">
                International students can apply to most US dental schools
                through ADEA AADSAS, but each school sets its own rules. Expect
                to need US or Canadian coursework, a WES or ECE transcript
                evaluation, the US DAT, often the TOEFL, and proof that you can
                pay for the full program, since F-1 students cannot get US
                federal aid.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#steps"
                  className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC]"
                >
                  See the 7 steps
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

      {/* Steps */}
      <section id="steps" className="scroll-mt-24 bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            How to apply to US dental school from abroad
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-[14px] font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[16.5px] font-extrabold text-[#0B1B3A]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#33415C]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[13.5px] text-[#5B6782]">
            Sources:{" "}
            <a
              href="https://www.adea.org/godental/Apply/admissions-process/international-students"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1F5BD8] hover:underline"
            >
              ADEA for international students
            </a>
            ,{" "}
            <a
              href="https://help.liaisonedu.com/ADEA_AADSAS_Applicant_Help_Center/Sending_Your_Official_Transcripts_and_Test_Scores_to_ADEA_AADSAS/Sending_Official_Transcripts_to_ADEA_AADSAS/2_Foreign_and_French-Canadian_Transcripts"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1F5BD8] hover:underline"
            >
              AADSAS foreign transcripts
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
            .
          </p>
        </div>
      </section>

      {/* Schools */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            US dental schools that accept international students
          </h2>
          <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-[#5B6782]">
            Examples, not a full list, checked on each school&apos;s own page in{" "}
            {INTERNATIONAL_CHECKED}. Policies change, so confirm before you
            apply.
          </p>
          <div className="mt-8 [&_li]:bg-white">
            <SchoolList schools={schoolsAccepting} />
          </div>

          <h3 className="mt-12 text-[20px] font-extrabold text-[#0B1B3A]">
            Schools that do not accept international applicants
          </h3>
          <p className="mt-2 max-w-[70ch] text-[15px] text-[#5B6782]">
            Mostly state schools that only admit US citizens and permanent
            residents. Check before you pay an application fee.
          </p>
          <div className="mt-5 [&_li]:bg-white">
            <SchoolList schools={schoolsNotAccepting} />
          </div>
        </div>
      </section>

      {/* Money */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>
            Paying for US dental school as an international student
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5">
              <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                No federal aid
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                F-1 students are not eligible for US federal student aid.
                Schools such as UCSF offer their own aid only to US citizens and
                permanent residents.
              </p>
            </div>
            <div className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5">
              <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                Escrow and deposits
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                Some schools want money up front. Touro asks non-citizens for
                four years of tuition and fees in escrow, or two years with a US
                co-signer. Marquette adds a special deposit and insurance fees.
              </p>
            </div>
            <div className="rounded-[18px] border border-[#E4E9F2] bg-[#F7F9FD] p-5">
              <h3 className="text-[16px] font-bold text-[#0B1B3A]">
                Proof of funds for the I-20
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#5B6782]">
                To issue the I-20 for your F-1 visa, the school needs proof you
                can cover tuition and living costs. Pacific asks international
                students to show funding for the whole program.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[15px] text-[#5B6782]">
            Dentists trained outside the US follow a different route (advanced
            standing through ADEA CAAPID). This page is for students who do not
            have a dental degree yet.
          </p>
        </div>
      </section>

      {/* How we help */}
      <section className="bg-[#F7F9FD] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={sectionTitle}>How we help international applicants</h2>
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
          <h2 className={sectionTitle}>FAQ for international applicants</h2>
          <div className="mt-7 flex flex-col gap-3">
            {intlFaqs.map((faq) => (
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
              Not sure which schools fit you?
            </h2>
            <p className="mx-auto mt-2 max-w-[48ch] text-[15px] text-white/70">
              Book a free 15-minute call. We will look at your coursework,
              country and budget and help you plan.
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
