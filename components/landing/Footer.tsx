import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <Logo inverse />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          Helping future dentists achieve their dreams through expert admissions consulting and
          academic tutoring.
        </p>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} DentalPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
