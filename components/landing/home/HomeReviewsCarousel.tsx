"use client";

import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Testimonial } from "@/lib/data/reviews";
import "swiper/css";
import "swiper/css/pagination";

// Soft backdrops for reviews that don't have a photo yet.
const PLACEHOLDER_TONES = [
  { bg: "from-[#DCE7FC] to-[#EEF3FE]", avatar: "#1F5BD8" },
  { bg: "from-[#D9F0EC] to-[#EEF8F6]", avatar: "#0F9D8A" },
  { bg: "from-[#E7DEFA] to-[#F3EFFD]", avatar: "#7A4FD6" },
  { bg: "from-[#FBE7D2] to-[#FDF3E9]", avatar: "#D9822B" },
];

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewMedia({ item, index }: { item: Testimonial; index: number }) {
  if (item.video) {
    return (
      <div className="relative aspect-[3/2] bg-[#0B1B3A]">
        <video
          src={item.video}
          poster={item.poster}
          controls
          playsInline
          preload="none"
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(event) => event.preventDefault()}
          className="h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-[#1F5BD8] uppercase shadow-sm">
          Video review
        </span>
      </div>
    );
  }

  if (item.photo) {
    return (
      <div className="aspect-[3/2] bg-[#E6ECF8]">
        <img
          src={item.photo}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const tone = PLACEHOLDER_TONES[index % PLACEHOLDER_TONES.length];
  return (
    <div
      className={`relative flex aspect-[3/2] items-center justify-center bg-gradient-to-br ${tone.bg}`}
    >
      <svg
        className="absolute top-4 right-5 text-white/80"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6v-6H6.5c0-1.9 1.4-3.5 3-3.5V6Zm10 0c-3 0-5.5 2.5-5.5 5.5V18h6v-6h-3.5c0-1.9 1.4-3.5 3-3.5V6Z" />
      </svg>
      <span
        className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white ring-[6px] ring-white/70"
        style={{ backgroundColor: tone.avatar }}
        aria-hidden
      >
        {initials(item.author)}
      </span>
    </div>
  );
}

function ReviewCard({ item, index }: { item: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.quote.length > 150;

  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E4E9F2] bg-white shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)]">
      <ReviewMedia item={item} index={index} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span
          className="tracking-[2px] text-[#E7A400]"
          aria-label="5 out of 5 stars"
        >
          ★★★★★
        </span>
        <blockquote
          className={`mt-3 text-[14.5px] leading-[1.65] text-[#33415C] ${expanded ? "" : "line-clamp-4"}`}
        >
          “{item.quote}”
        </blockquote>
        {isLong ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-1.5 self-start text-[13px] font-bold text-[#1F5BD8] hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
        <figcaption className="mt-auto pt-4 text-sm font-bold text-[#0B1B3A]">
          {item.author}
        </figcaption>
      </div>
    </figure>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous reviews" : "Next reviews"}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5DDEA] bg-white text-[#0B1B3A] transition hover:border-[#0B1B3A]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function HomeReviewsCarousel({ reviews }: { reviews: Testimonial[] }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  return (
    <div>
      <Swiper
        modules={[Pagination, A11y]}
        onSwiper={setSwiper}
        spaceBetween={18}
        slidesPerView={1.08}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="home-reviews-swiper !pb-12"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={item.author} className="!h-auto">
            <ReviewCard item={item} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="-mt-2 flex items-center justify-end gap-2">
        <ArrowButton direction="prev" onClick={() => swiper?.slidePrev()} />
        <ArrowButton direction="next" onClick={() => swiper?.slideNext()} />
      </div>
    </div>
  );
}
