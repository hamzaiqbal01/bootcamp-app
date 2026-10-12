"use client";

import { useState, type FormEvent } from "react";
import { btn, btnSize } from "@/components/ui/button-styles";
import { inputClass } from "./controls";

export function LeadCaptureForm({
  submitting,
  error,
  onSubmit,
}: {
  submitting: boolean;
  error: string | null;
  onSubmit: (lead: {
    firstName: string;
    email: string;
    phone: string;
    country: string;
    marketingConsent: boolean;
  }) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!firstName.trim()) {
      setLocalError("Enter your first name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLocalError("Enter a valid email address.");
      return;
    }
    setLocalError(null);
    onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      marketingConsent: consent,
    });
  }

  const message = localError ?? error;

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7" noValidate>
      <h3 className="text-xl font-semibold text-stone-900">Unlock Your Full Study Plan</h3>
      <p className="mt-2 text-sm text-stone-600">Your plan is free. No payment required.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="plan-first-name" className="text-sm font-medium text-stone-700">
            First name
          </label>
          <input
            id="plan-first-name"
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="plan-email" className="text-sm font-medium text-stone-700">
            Email
          </label>
          <input
            id="plan-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="plan-phone" className="text-sm font-medium text-stone-700">
            Mobile number <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <input
            id="plan-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="plan-country" className="text-sm font-medium text-stone-700">
            Country <span className="font-normal text-stone-400">(optional)</span>
          </label>
          <input
            id="plan-country"
            name="country"
            autoComplete="country-name"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-stone-700">
        <input
          type="checkbox"
          className="mt-1"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        I&apos;d like Future Dental Prep to send me my study plan and useful DAT preparation guidance.
      </label>
      {message && (
        <p role="alert" className="mt-4 text-sm font-medium text-rose-700">
          {message}
        </p>
      )}
      <button type="submit" disabled={submitting} className={`mt-6 w-full sm:w-auto ${btn.primary} ${btnSize.md}`}>
        {submitting ? "Saving your plan..." : "Show My Full Study Plan"}
      </button>
    </form>
  );
}
