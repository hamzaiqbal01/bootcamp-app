"use client";

import { useState } from "react";
import { videoLibrary, type VideoItem } from "@/lib/data/videos";

// Only a thumbnail is loaded until someone presses play, so the section costs one
// small image per video instead of eight YouTube players.
function thumbnail(
  id: string,
  size: "hqdefault" | "maxresdefault" = "hqdefault",
) {
  return `https://i.ytimg.com/vi/${id}/${size}.jpg`;
}

function PlayBadge({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-white/95 text-[#1F5BD8] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 ${
        large ? "h-20 w-20" : "h-9 w-9"
      }`}
    >
      <svg
        width={large ? 28 : 14}
        height={large ? 28 : 14}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
      </svg>
    </span>
  );
}

function MainPlayer({
  video,
  playing,
  onPlay,
}: {
  video: VideoItem;
  playing: boolean;
  onPlay: () => void;
}) {
  if (playing) {
    return (
      <iframe
        key={video.id}
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play: ${video.title}`}
      className="group relative block h-full w-full"
    >
      <img
        key={video.id}
        src={thumbnail(video.id, "maxresdefault")}
        onError={(event) => {
          // Not every upload has a max-res thumbnail.
          event.currentTarget.src = thumbnail(video.id);
        }}
        alt=""
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/85 via-[#0B1B3A]/20 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <PlayBadge large />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-7">
        <span className="text-[12px] font-bold tracking-[0.1em] text-[#9DB8F5] uppercase">
          {video.topic}
        </span>
        <span className="mt-1 block text-[clamp(18px,2.2vw,24px)] leading-snug font-extrabold text-white">
          {video.title}
        </span>
      </span>
    </button>
  );
}

export function HomeVideoLibrary() {
  const [activeId, setActiveId] = useState(videoLibrary[0].id);
  const [playing, setPlaying] = useState(false);
  const active =
    videoLibrary.find((video) => video.id === activeId) ?? videoLibrary[0];

  function select(id: string) {
    setActiveId(id);
    setPlaying(true);
  }

  return (
    <section
      id="video-library"
      className="relative scroll-mt-24 overflow-hidden bg-[#0B1B3A] py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#1F5BD8]/30 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex max-w-[640px] flex-col gap-3.5">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#9DB8F5] uppercase">
            Free video library
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-white">
            Application and interview videos
          </h2>
          <p className="text-[16px] leading-relaxed text-white/70">
            Free walkthroughs on the application, the personal statement, your
            school list, and the interview.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="aspect-video overflow-hidden rounded-[22px] bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
            <MainPlayer
              video={active}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
          </div>

          {/* On desktop the list is pinned to the player's height and scrolls inside it. */}
          <div className="relative min-w-0">
            <ul className="video-playlist -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 lg:absolute lg:inset-0 lg:mx-0 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:px-0 lg:pr-2 lg:pb-0">
              {videoLibrary.map((video) => {
                const isActive = video.id === active.id;
                return (
                  <li
                    key={video.id}
                    className="w-[260px] shrink-0 snap-start lg:w-auto"
                  >
                    <button
                      type="button"
                      onClick={() => select(video.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${
                        isActive
                          ? "bg-white/12 ring-1 ring-white/25"
                          : "hover:bg-white/[0.07]"
                      }`}
                    >
                      <span className="relative aspect-video w-[120px] shrink-0 overflow-hidden rounded-xl bg-white/10">
                        <img
                          src={thumbnail(video.id)}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <PlayBadge />
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="text-[11px] font-bold tracking-[0.08em] text-[#9DB8F5] uppercase">
                          {video.topic}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[14px] leading-snug font-bold text-white">
                          {video.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
