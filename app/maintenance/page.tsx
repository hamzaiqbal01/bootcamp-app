import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance | Future Dentist Prep",
  description: "Future Dentist Prep is temporarily under maintenance. Please check back soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(14,165,233,0.18),_transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-brand-100 uppercase">
          Future Dentist Prep
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          We&apos;ll be right back
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          Our website is temporarily under maintenance. We&apos;re making a few
          updates and will be back online shortly.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm">
          <p className="text-sm text-slate-300">Need help in the meantime?</p>
          <a
            href="mailto:facedoctoralex@gmail.com"
            className="mt-2 inline-block text-base font-semibold text-white underline decoration-brand-500/60 underline-offset-4 transition hover:decoration-brand-400"
          >
            facedoctoralex@gmail.com
          </a>
        </div>

        <p className="mt-8 text-xs tracking-wide text-slate-500">
          Thank you for your patience.
        </p>
      </div>
    </main>
  );
}
