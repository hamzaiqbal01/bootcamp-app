"use client";

import type { FormEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContactSection() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Contact Us"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-brand-500/0 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option>Application Services</option>
                <option>Tutoring Services</option>
                <option>Pricing Information</option>
                <option>Schedule a Consultation</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your goals..."
                required
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-3.5 text-base font-semibold text-white transition hover:bg-brand-700 sm:w-auto sm:px-10"
            >
              Send Message
            </button>
          </form>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M22 6L12 13L2 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900">Email</strong>
                <p className="mt-1 text-slate-600">hello@dentalpath.com</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.76 20.99 20.52 21 20.27 21C10.79 21 3 13.21 3 3.73C3 3.48 3.01 3.24 3.03 3C3.07 2.44 3.52 2 4.08 2H7.08C7.57 2 7.99 2.35 8.07 2.84C8.14 3.27 8.27 3.68 8.44 4.07L6.91 5.6C8.51 8.57 10.93 10.99 13.9 12.59L15.43 11.06C15.82 11.23 16.23 11.36 16.66 11.43C17.15 11.51 17.5 11.93 17.5 12.42V16.92C17.5 17.47 17.06 17.92 16.5 17.92"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900">Phone</strong>
                <p className="mt-1 text-slate-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="10" r="3" stroke="#4F46E5" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <strong className="text-slate-900">Location</strong>
                <p className="mt-1 text-slate-600">Philadelphia, PA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
