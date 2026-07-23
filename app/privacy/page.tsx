import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Future Dentist Prep",
  description:
    "Learn how Future Dentist Prep collects, uses, and protects your personal information when you use our website and services.",
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "July 23, 2026";
const SITE_NAME = "Future Dentist Prep";
const SITE_URL = "https://futuredentistprep.com";
const CONTACT_EMAIL = "facedoctoralex@gmail.com";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="border-b border-slate-100 bg-[linear-gradient(135deg,#FAFAFE_0%,#EEF2FF_50%,#F5F3FF_100%)] py-14 sm:py-18">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-900 ring-1 ring-violet-200/70">
              Legal
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base text-slate-500">
              Last updated:{" "}
              <time dateTime="2026-07-23" className="font-medium text-slate-700">
                {LAST_UPDATED}
              </time>
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">

              <p className="lead text-lg text-slate-600">
                At <strong>{SITE_NAME}</strong> (<a href={SITE_URL}>{SITE_URL}</a>), your privacy
                matters to us. This policy explains what information we collect, how we use it, and
                your rights with respect to your data.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>1. Information We Collect</h2>
              <h3>a) Contact Form</h3>
              <p>
                When you submit the contact form on our website, we collect:
              </p>
              <ul>
                <li><strong>Name</strong></li>
                <li><strong>Email address</strong></li>
                <li><strong>Subject</strong></li>
                <li><strong>Message content</strong></li>
              </ul>
              <p>
                This information is used solely to respond to your inquiry.
              </p>

              <h3>b) Automatically Collected Data</h3>
              <p>
                Like most websites, our server may collect standard log data including your IP
                address, browser type, pages visited, and time of visit. This data is used for
                security and performance monitoring only and is not linked to any personal
                identification.
              </p>

              <h3>c) Cookies and Similar Technologies</h3>
              <p>
                We and our partners may use cookies, web beacons, pixels, and similar technologies
                to operate the website, measure performance, and — when advertising is enabled —
                deliver and measure ads.
              </p>
              <p>These technologies may collect or process information such as:</p>
              <ul>
                <li>IP address and approximate location</li>
                <li>Device, browser, and operating system information</li>
                <li>Pages viewed, links clicked, and referring URLs</li>
                <li>Cookie identifiers and advertising identifiers</li>
              </ul>
              <p>
                Basic session and security cookies may also be set by our hosting provider (Vercel)
                to keep the site running securely.
              </p>

              <h3>d) Advertising (Google AdSense)</h3>
              <p>
                We may use <strong>Google AdSense</strong> and related Google advertising services
                to display ads on certain pages of our website (primarily informational blog
                content). Google and its partners may use cookies and similar technologies to:
              </p>
              <ul>
                <li>Serve personalized and/or non-personalized ads</li>
                <li>Measure ad performance and frequency</li>
                <li>Prevent fraud and ensure ad security</li>
              </ul>
              <p>
                Third-party vendors, including Google, may use cookies to serve ads based on a
                user&apos;s prior visits to this website or other websites. Users may opt out of
                personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                {" "}
                or{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aboutads.info/choices
                </a>
                . For more information about how Google uses data, see{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How Google uses information from sites or apps that use our services
                </a>
                .
              </p>
              <p>
                Visitors in the European Economic Area (EEA), United Kingdom, and Switzerland may
                see a consent message (Google-certified Consent Management Platform) that allows
                them to manage advertising and cookie preferences before personalized ads are
                shown.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>2. How We Use Your Information</h2>
              <p>Information collected through the contact form is used to:</p>
              <ul>
                <li>Respond to your questions and inquiries</li>
                <li>Connect you with the appropriate consultant or tutor</li>
                <li>Send relevant information you have explicitly requested</li>
              </ul>
              <p>
                Information collected through cookies and advertising technologies may be used to
                operate the site, understand traffic, and (where enabled) deliver and measure
                advertising.
              </p>
              <p>
                We do <strong>not</strong> sell, rent, or share your contact-form personal
                information with third parties for their own marketing purposes.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>3. Data Storage & Third-Party Services</h2>
              <p>We use the following third-party services to operate our website:</p>

              <h3>SheetDB / Google Sheets</h3>
              <p>
                Contact form submissions are stored in a Google Spreadsheet via SheetDB. This
                allows our team to manage and respond to inquiries. Data is accessible only to
                authorized team members.
              </p>

              <h3>Resend</h3>
              <p>
                We use Resend to send email notifications to our team when a new contact form is
                submitted. Your email address is included in these notifications so we can reply
                to you.
              </p>

              <h3>Vercel</h3>
              <p>
                Our website is hosted on Vercel. Vercel may collect server log data as part of
                standard web hosting operations. See{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Vercel&apos;s Privacy Policy
                </a>{" "}
                for details.
              </p>

              <h3>Google AdSense and Advertising Partners</h3>
              <p>
                When ads are enabled, Google and participating third-party vendors may receive
                technical data (such as IP address, cookie IDs, and page URLs) to serve and
                measure ads. Their processing is governed by their own privacy policies in
                addition to this policy.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>4. Data Retention</h2>
              <p>
                Contact form data is retained in our records for as long as is necessary to
                fulfill your request and for legitimate business purposes. You may request
                deletion of your data at any time by contacting us.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>5. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>6. Children&apos;s Privacy</h2>
              <p>
                Our services are intended for individuals aged 18 and older. We do not knowingly
                collect personal information from children under 13. If you believe a child has
                provided us with personal information, please contact us and we will delete it
                promptly.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>7. Links to Other Websites</h2>
              <p>
                Our website may contain links to third-party websites (e.g., scheduling tools,
                Typeform). We are not responsible for the privacy practices of those sites and
                encourage you to review their policies independently.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
                date at the top of this page will reflect any changes. Continued use of our website
                after changes are posted constitutes your acceptance of the updated policy.
              </p>

              <hr className="my-10 border-slate-100" />

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact
                us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
                <li>
                  <strong>Phone / Text:</strong>{" "}
                  <a href="sms:+12675845457">267-584-5457</a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <Link href="/contact">Contact form</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
