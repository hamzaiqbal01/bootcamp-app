import Link from "next/link";

const steps = [
  {
    n: "1",
    title: "Book a free call",
    body: "Tell us your test date, GPA, and where you want to apply. We will tell you honestly whether we can help.",
  },
  {
    n: "2",
    title: "Get your plan",
    body: "We match you with the right expert and send a written plan before any paid work starts.",
  },
  {
    n: "3",
    title: "Do the work",
    body: "Sessions, edits, and feedback on a schedule. Most students see a clear next step within the first week.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex max-w-[720px] flex-col gap-3.5">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            How it works
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-[#0B1B3A]">
            How our dental school consulting works
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.n}
              className="flex flex-col gap-3 rounded-2xl border border-[#E4E9F2] bg-white p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1B3A] text-sm font-extrabold text-white">
                {step.n}
              </span>
              <h3 className="text-[19px] font-bold text-[#0B1B3A]">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#5B6782]">{step.body}</p>
            </article>
          ))}
        </div>
        <Link
          href="/schedule"
          className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1F5BD8] px-6 text-[15px] font-bold text-white hover:bg-[#1747AC]"
        >
          Schedule a free call
        </Link>
      </div>
    </section>
  );
}
