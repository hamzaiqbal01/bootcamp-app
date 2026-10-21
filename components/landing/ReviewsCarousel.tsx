"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReviewPortrait } from "@/components/landing/ReviewPortrait";
import type { Testimonial } from "@/lib/data/reviews";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const stars = Array.from({ length: 5 });

function Stars() {
  return (
    <div className="mt-1 flex items-center gap-0.5" role="img" aria-label="5 star rating">
      {stars.map((_, starIdx) => (
        <svg key={starIdx} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active === null ? null : testimonials[active];

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <div className="relative mt-10">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => swiper?.slidePrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => swiper?.slideNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        onSwiper={setSwiper}
        spaceBetween={20}
        slidesPerView={1.12}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2.15, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="reviews-swiper !pb-10"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={`${item.author}-${index}`} className="!h-auto">
            <blockquote className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {item.video ? (
                <video
                  src={item.video}
                  poster={item.poster}
                  controls
                  playsInline
                  preload="auto"
                  className="swiper-no-swiping aspect-[1280/854] w-full bg-slate-900 object-cover"
                />
              ) : (
                <ReviewPortrait name={item.author} index={index} cover />
              )}
              <footer className="px-6 pt-5">
                <strong className="block text-sm font-semibold text-slate-900">{item.author}</strong>
                <Stars />
              </footer>
              <p className="mt-4 line-clamp-3 px-6 text-[15px] leading-6 text-slate-600">“{item.quote}”</p>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="mx-6 mt-4 mb-8 self-start text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Read more
              </button>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeItem
        ? createPortal(
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-[#0B1020]/70"
            onClick={() => setActive(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-dialog-title"
            className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm hover:text-slate-900"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            {activeItem.video ? (
              <video
                src={activeItem.video}
                poster={activeItem.poster}
                controls
                playsInline
                preload="auto"
                className="max-h-[38vh] w-full shrink-0 bg-slate-900 object-cover"
              />
            ) : (
              <div className="max-h-[38vh] shrink-0 overflow-hidden">
                <ReviewPortrait name={activeItem.author} index={active ?? 0} cover />
              </div>
            )}
            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <h3 id="review-dialog-title" className="text-lg font-semibold text-slate-900">
                {activeItem.author}
              </h3>
              <Stars />
              <p className="mt-4 text-[15px] leading-7 text-slate-600">“{activeItem.quote}”</p>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
