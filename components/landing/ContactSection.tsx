"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useState, useSyncExternalStore } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

function noopSubscribe() {
  return () => {};
}

function readPackageParam() {
  return (
    new URLSearchParams(window.location.search)
      .get("package")
      ?.trim()
      .slice(0, 120) ?? ""
  );
}

export const CONTACT_EMAIL = "futuredentistpreparation@gmail.com";

const inputClass =
  "mt-1.5 w-full rounded-[14px] border border-[#E4E9F2] bg-[#F7F9FD] px-4 py-3 text-[15px] text-[#0B1B3A] outline-none transition placeholder:text-[#8A93A3] focus:border-[#1F5BD8] focus:bg-white focus:ring-4 focus:ring-[#1F5BD8]/15 disabled:opacity-60";

function ContactRow({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] text-[#1F5BD8]"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-bold text-[#0B1B3A]">{title}</p>
        <div className="mt-0.5 text-[14.5px] leading-relaxed text-[#5B6782]">
          {children}
        </div>
      </div>
    </li>
  );
}

export function ContactSection() {
  const [state, setState] = useState<SubmitState>("idle");
  // Package chosen on a pricing card (/contact?package=...). Empty on the server, read from the URL in the browser.
  const packageFromUrl = useSyncExternalStore(
    noopSubscribe,
    readPackageParam,
    () => "",
  );
  const [dismissed, setDismissed] = useState(false);
  // null = the visitor has not typed yet, so the field shows the package-based default.
  const [subjectEdit, setSubjectEdit] = useState<string | null>(null);
  const [messageEdit, setMessageEdit] = useState<string | null>(null);

  const selectedPackage = dismissed ? "" : packageFromUrl;
  const subject =
    subjectEdit ?? (selectedPackage ? `Package: ${selectedPackage}` : "");
  const message =
    messageEdit ??
    (selectedPackage
      ? `Hi, I'm interested in ${selectedPackage}.\n\nA bit about me (where I am in the DAT or application process): `
      : "");

  function clearPackage() {
    setDismissed(true);
    setSubjectEdit("");
    setMessageEdit("");
    window.history.replaceState(null, "", "/contact");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("Name") ?? "").trim();
    const email = String(fd.get("Email") ?? "").trim();
    const subject = String(fd.get("Subject") ?? "").trim();
    const message = String(fd.get("Message") ?? "").trim();

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        throw new Error(`Contact API responded with ${res.status}`);
      }

      setState("success");
      form.reset();
      setDismissed(true);
      setSubjectEdit("");
      setMessageEdit("");
    } catch {
      setState("error");
    }
  }

  const busy = state === "submitting";

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/3 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.08] blur-3xl"
        aria-hidden
      />
      {/* Mobile: heading, form, then other ways to reach us. Desktop: details left, form right. */}
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-9 lg:px-8">
        {/* Heading */}
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#1F5BD8]"
              aria-hidden
            />
            Get in touch
          </span>
          <h1 className="mt-5 text-[clamp(32px,4.4vw,50px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
            Contact Us
          </h1>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-[#5B6782]">
            Questions about DAT tutoring, your application or a package? Send us
            a message and a member of the team will reply by email.
          </p>
        </div>

        {/* The form */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-[24px] border border-[#E4E9F2] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,27,58,0.55)] sm:p-8"
          >
            <div>
              <h2 className="text-[20px] font-extrabold text-[#0B1B3A]">
                {selectedPackage
                  ? "Ask about this package"
                  : "Send us a message"}
              </h2>
              <p className="mt-1 text-[14px] text-[#5B6782]">
                All fields are required.
              </p>
              {selectedPackage ? (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-[14px] border border-[#C9D8F6] bg-[#F4F7FE] px-4 py-3">
                  <p className="min-w-0 text-[14px] text-[#33415C]">
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">
                      Selected package
                    </span>
                    <b className="text-[#0B1B3A]">{selectedPackage}</b>
                  </p>
                  <button
                    type="button"
                    onClick={clearPackage}
                    className="shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-bold text-[#1F5BD8] transition hover:bg-[#E8EFFD]"
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[14px] font-semibold text-[#33415C]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="Name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  disabled={busy}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[14px] font-semibold text-[#33415C]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  disabled={busy}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-[14px] font-semibold text-[#33415C]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="Subject"
                type="text"
                value={subject}
                onChange={(event) => setSubjectEdit(event.target.value)}
                placeholder="What is this regarding?"
                required
                disabled={busy}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-[14px] font-semibold text-[#33415C]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="Message"
                rows={5}
                value={message}
                onChange={(event) => setMessageEdit(event.target.value)}
                placeholder="Tell us where you are in the process and how we can help."
                required
                disabled={busy}
                className={`${inputClass} resize-y`}
              />
            </div>

            {state === "success" && (
              <p
                className="rounded-[12px] bg-[#E3F6EF] px-4 py-3 text-[14px] font-semibold text-[#0F7A5C]"
                role="status"
              >
                Thanks, your message was sent. We&apos;ll get back to you by
                email soon.
              </p>
            )}
            {state === "error" && (
              <p
                className="rounded-[12px] bg-[#FDECEC] px-4 py-3 text-[14px] font-semibold text-[#B42318]"
                role="alert"
              >
                Something went wrong. Please try again, or email us at{" "}
                {CONTACT_EMAIL}.
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center rounded-full bg-[#1F5BD8] px-8 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(31,91,216,0.6)] transition-colors hover:bg-[#1747AC] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>

        {/* Ways to reach us */}
        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="space-y-6">
            <ContactRow
              title="Email us"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold break-all text-[#1F5BD8] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </ContactRow>
            <ContactRow
              title="Book a free 15-minute call"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3.5"
                    y="5"
                    width="17"
                    height="15"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M3.5 9.5h17M8 3v4M16 3v4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              Talk through your DAT or application with our team.{" "}
              <Link
                href="/schedule"
                className="font-semibold text-[#1F5BD8] hover:underline"
              >
                Pick a time →
              </Link>
            </ContactRow>
            <ContactRow
              title="Chat with us"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 18.5 3.5 21l3.4-1.1A8.5 8.5 0 1 0 5 18.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Use the chat button in the bottom-right corner to send a quick
              message or voice note.
            </ContactRow>
          </ul>

          <div className="mt-10 rounded-[20px] border border-[#E4E9F2] bg-white p-5">
            <p className="text-[14px] font-bold text-[#0B1B3A]">
              Looking for something specific?
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px]">
              <li>
                <Link
                  href="/pricing"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/private-dat-tutoring"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  DAT tutoring
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  Admissions services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
