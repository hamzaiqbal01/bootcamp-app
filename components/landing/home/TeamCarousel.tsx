"use client";

import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Coach } from "@/lib/data/coaches";
import { CoachIntroVideo } from "./CoachIntroVideo";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CapIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M7 13v4.2c0 .3 2.2 2.3 5 2.3s5-2 5-2.3V13" stroke="currentColor" strokeWidth="1.7" />
      <path d="M21 11v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const PLACEHOLDER = "/images/hero-coaches/profile-placeholder.svg";

function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#E4E9F2] bg-white shadow-[0_14px_34px_-26px_rgba(11,27,58,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(11,27,58,0.55)]">
      <div className="relative aspect-[6/5] overflow-hidden bg-[#E6ECF8]">
        <img
          src={coach.photo ?? PLACEHOLDER}
          alt={coach.photo ? `${coach.name}, ${coach.role}` : ""}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          style={{ objectPosition: coach.photo ? coach.photoPosition : "center" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#0B1B3A]/90 via-[#0B1B3A]/45 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0B1B3A] shadow-sm backdrop-blur">
            <span className="text-[#1F5BD8]">
              <CapIcon />
            </span>
            {coach.badge}
          </span>
          {coach.extraBadges?.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0B1B3A] shadow-sm backdrop-blur"
            >
              {badge}
            </span>
          ))}
        </div>
        {!coach.photo ? (
          <span className="absolute top-4 right-4 rounded-full bg-[#0B1B3A]/70 px-2.5 py-1 text-[11px] font-semibold text-white">
            Photo coming soon
          </span>
        ) : null}
        <div className={`absolute inset-x-0 bottom-0 pb-5 pl-6 ${coach.introVideo ? "pr-20" : "pr-6"}`}>
          <h3 className="text-[21px] leading-tight font-extrabold text-white">{coach.name}</h3>
          <p className="mt-1 text-[13px] leading-snug text-white/80">{coach.title}</p>
        </div>
        {coach.introVideo ? <CoachIntroVideo video={coach.introVideo} coachName={coach.name} /> : null}
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {coach.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-[#F4F7FD] px-2 py-2.5 text-center">
              <div className="text-[17px] leading-none font-extrabold text-[#0B1B3A]">{stat.value}</div>
              <div className="mt-1 text-[11px] leading-snug text-[#5B6782]">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-[#33415C]">{coach.text}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Focus areas">
          {coach.focusAreas.map((area) => (
            <li key={area} className="rounded-full border border-[#DCE5F7] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#33415C]">
              {area}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          <Link
            href="/schedule"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1F5BD8] px-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1747AC]"
          >
            Book a free call
          </Link>
          <Link
            href={`/team/${coach.id}`}
            className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full border border-[#D5DDEA] px-3 text-[14px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A]"
          >
            View profile
            <span className="sr-only">: {coach.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TeamCarousel({ coaches }: { coaches: Coach[] }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous coaches"
          onClick={() => swiper?.slidePrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DDEA] bg-white text-[#0B1B3A] transition hover:border-[#0B1B3A]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next coaches"
          onClick={() => swiper?.slideNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DDEA] bg-white text-[#0B1B3A] transition hover:border-[#0B1B3A]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onSwiper={setSwiper}
        spaceBetween={18}
        slidesPerView={1.06}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 18 },
          1100: { slidesPerView: 3, spaceBetween: 18 },
        }}
        className="team-swiper !pb-10"
      >
        {coaches.map((coach) => (
          <SwiperSlide key={coach.id} className="!h-auto">
            <CoachCard coach={coach} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
