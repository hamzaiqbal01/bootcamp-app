"use client";

import { useEffect, useRef, useState } from "react";
import type { CoachVideo } from "@/lib/data/coaches";

// The circle sits at right-4 / bottom-4 and is 64px wide, so its centre is 48px in from the corner.
const COLLAPSED = "circle(32px at calc(100% - 48px) calc(100% - 48px))";
const EXPANDED = "circle(150% at calc(100% - 48px) calc(100% - 48px))";

function PlayIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function PauseIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

export function CoachIntroVideo({
  video,
  coachName,
}: {
  video: CoachVideo;
  coachName: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Stop playback when the card scrolls or slides out of view.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !el.paused) el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function start() {
    setOpen(true);
    // Called inside the click so the browser allows playback with sound.
    void videoRef.current?.play();
  }

  function togglePlayback() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  function close() {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setOpen(false);
  }

  return (
    <>
      <div
        className="absolute inset-0 z-20 bg-[#0B1B3A] transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          clipPath: open ? EXPANDED : COLLAPSED,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="none"
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(event) => event.preventDefault()}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={close}
          className="h-full w-full object-cover"
          style={{ objectPosition: video.position }}
        />

        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={togglePlayback}
          aria-label={
            playing
              ? `Pause ${coachName}'s intro video`
              : `Play ${coachName}'s intro video`
          }
          className="group/video absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#0B1B3A] shadow-lg backdrop-blur transition-opacity duration-200 ${
              playing
                ? "opacity-0 group-hover/video:opacity-100 group-focus-visible/video:opacity-100"
                : "opacity-100"
            }`}
          >
            {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
          </span>
        </button>

        {open && !playing ? (
          <button
            type="button"
            onClick={close}
            aria-label="Close intro video"
            className="absolute top-4 right-4 flex cursor-pointer h-9 w-9 items-center justify-center rounded-full bg-[#0B1B3A]/70 text-white backdrop-blur transition hover:bg-[#0B1B3A]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={start}
        tabIndex={open ? -1 : 0}
        aria-label={`Play ${coachName}'s intro video`}
        className={`absolute right-4 bottom-4 z-30 h-16 w-16 cursor-pointer rounded-full transition duration-300 ${
          open
            ? "pointer-events-none scale-75 opacity-0"
            : "opacity-100 hover:scale-105"
        }`}
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:hidden"
          aria-hidden
        />
        <img
          src={video.thumb}
          alt=""
          className="relative h-full w-full rounded-full object-cover ring-[3px] ring-white shadow-lg"
        />
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#0B1B3A]/35 text-white">
          <PlayIcon size={20} />
        </span>
      </button>
    </>
  );
}
