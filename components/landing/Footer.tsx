import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const services = [
  { href: "/services", label: "Application Services" },
  {
    href: "/services/personal-statement-editing",
    label: "Personal Statement Editing",
  },
  { href: "/services/dental-school-interview-prep", label: "Interview Prep" },
  { href: "/services/secondary-essay-help", label: "Secondary Essay Help" },
  {
    href: "/services/aadsas-application-review",
    label: "AADSAS Application Review",
  },
  { href: "/services/dental-school-list", label: "Dental School List" },
  {
    href: "/services/complete-application-package",
    label: "Complete Application Package",
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/private-dat-tutoring", label: "DAT Tutoring" },
  { href: "/dat-study-plan-generator", label: "DAT Study Plan" },
  { href: "/dat-score-calculator", label: "DAT Score Calculator" },
  { href: "/aadsas-gpa-calculator", label: "AADSAS GPA Calculator" },
  {
    href: "/personal-statement-character-counter",
    label: "Personal Statement Counter",
  },
  { href: "/secondaries", label: "Secondary Questions" },
  { href: "/schedule", label: "Schedule a Free Call" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/canada", label: "Applying from Canada" },
  { href: "/international-applicants", label: "International Applicants" },
  { href: "/contact", label: "Contact" },
  { href: "/become-a-tutor", label: "Become a DAT Tutor" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="site-footer border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Helping future dentists achieve their dreams through expert
              admissions consulting and academic tutoring. Trusted by 1,000+
              pre-dental students.
            </p>
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

      <div className="site-footer-bottom border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Future Dental Prep. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-slate-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
