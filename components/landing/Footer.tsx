import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="lg:col-span-1">
            <Logo inverse />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Helping future dentists achieve their dreams through expert admissions consulting and
              academic tutoring.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Services</h4>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#services" className="transition hover:text-white">
                Application Consulting
              </a>
              <a href="#tutoring" className="transition hover:text-white">
                Tutoring
              </a>
              <a href="#consult" className="transition hover:text-white">
                Free Consultation
              </a>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#experts" className="transition hover:text-white">
                Our Experts
              </a>
              <a href="#reviews" className="transition hover:text-white">
                Reviews
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Connect</h4>
            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#contact" className="transition hover:text-white">
                Contact Us
              </a>
              <a href="#" className="transition hover:text-white">
                Instagram
              </a>
              <a href="#" className="transition hover:text-white">
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} DentalPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
