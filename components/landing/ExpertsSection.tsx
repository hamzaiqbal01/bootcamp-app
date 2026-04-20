"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experts } from "@/lib/data/experts";

export function ExpertsSection() {
  const [active, setActive] = useState(0);
  const current = experts[active];

  return (
    <section id="experts" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Who You'll Work With"
          title="Our Experts"
          description="Learn from dental professionals and top students who understand the admissions process inside and out."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {experts.map((ex, i) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  active === i
                    ? "border-brand-600 bg-brand-50 shadow-[0_0_0_3px_rgba(79,70,229,0.1)]"
                    : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-[#FAFAFE]"
                }`}
              >
                <div
                  className={`relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border-2 ${
                    active === i ? "border-brand-600" : "border-slate-200"
                  }`}
                >
                  <Image
                    src={ex.imageUrl}
                    alt={ex.name}
                    width={52}
                    height={52}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <strong className="block truncate text-[0.9rem] font-semibold text-slate-900">
                    {ex.name}
                  </strong>
                  <span className="text-[0.8rem] text-slate-500">{ex.role}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-2px_rgba(0,0,0,0.05)] lg:sticky lg:top-24">
            <div className="mb-5 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-brand-600">
                <Image
                  src={current.imageUrl}
                  alt={current.name}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.35rem] font-bold text-slate-900">{current.bioTitle}</h3>
            </div>
            <p
              className="text-[0.95rem] leading-[1.8] text-slate-500 [&_em]:text-brand-600 [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: current.bio }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
