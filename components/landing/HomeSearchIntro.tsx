import Link from "next/link";

export function HomeSearchIntro() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Dental School Admissions Consulting
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          Future Dental Prep is 1-on-1 DAT tutoring and admissions consulting for
          students applying to U.S. dental school. A tutor builds the study plan
          around the section that is costing points. Admissions work covers the
          personal statement, secondaries, the school list, and the interview.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Start with a{" "}
          <Link href="/dat-study-plan-generator" className="font-medium text-brand-700 underline-offset-2 hover:underline">
            free DAT study plan
          </Link>
          , compare{" "}
          <Link href="/private-dat-tutoring" className="font-medium text-brand-700 underline-offset-2 hover:underline">
            private DAT tutoring
          </Link>{" "}
          from a 4-hour starter, or{" "}
          <Link href="/schedule" className="font-medium text-brand-700 underline-offset-2 hover:underline">
            schedule a free call
          </Link>{" "}
          if you want the plan checked against your test date. Guides on GPA,
          AADSAS dates, and the DAT score scale are in the{" "}
          <Link href="/blog" className="font-medium text-brand-700 underline-offset-2 hover:underline">
            admissions blog
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
