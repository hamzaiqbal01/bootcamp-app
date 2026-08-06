import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const services = [
  { href: "/", label: "Application Services" },
  { href: "/private-dat-tutoring", label: "DAT Tutoring" },
  { href: "/schedule", label: "Schedule a Free Call" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Helping future dentists achieve their dreams through expert admissions consulting and
              academic tutoring. Trusted by 10,000+ pre-dental students.
            </p>
            <a
              href="mailto:facedoctoralex@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              facedoctoralex@gmail.com
            </a>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Future Dentist Prep. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="transition hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
