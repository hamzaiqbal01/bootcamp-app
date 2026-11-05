import Image from "next/image";
import Link from "next/link";
import type { Coach } from "@/lib/data/coaches";

// Trust next to the H1: the real people behind the service. Small, lazy images so the hero stays fast.

function credential(coach: Coach) {
  return coach.extraBadges?.[0] ?? coach.badge;
}

function Rating({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] text-[#5B6782] ${className}`}>
      <span className="tracking-[2px] text-[#E7A400]" aria-hidden>
        ★★★★★
      </span>{" "}
      <b className="text-[#0B1B3A]">9.8/10</b> from 39 surveyed students
    </p>
  );
}

function Avatar({ coach, size }: { coach: Coach; size: number }) {
  return coach.photo ? (
    <Image
      src={coach.photo}
      alt={coach.name}
      width={size}
      height={size}
      sizes={`${size}px`}
      className="shrink-0 rounded-full object-cover ring-2 ring-white"
      style={{ width: size, height: size, objectPosition: coach.photoPosition }}
    />
  ) : (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] font-extrabold text-[#1F5BD8] ring-2 ring-white"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {coach.initials}
    </span>
  );
}

/** Desktop: a card beside the hero text. */
export function HeroTutorsCard({ tutors }: { tutors: Coach[] }) {
  return (
    <div className="hidden w-full max-w-[380px] rounded-[24px] border border-[#E4E9F2] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(11,27,58,0.55)] lg:block">
      <p className="text-[12px] font-bold tracking-[0.12em] text-[#8A93A3] uppercase">
        Who you could work with
      </p>
      <ul className="mt-4 space-y-4">
        {tutors.map((coach) => (
          <li key={coach.id}>
            <Link
              href={`/team/${coach.id}`}
              className="group flex items-center gap-4"
            >
              <Avatar coach={coach} size={64} />
              <span className="min-w-0">
                <span className="block text-[16px] font-bold text-[#0B1B3A] transition group-hover:text-[#1F5BD8]">
                  {coach.name}
                </span>
                <span className="mt-0.5 block text-[13px] font-semibold text-[#1F5BD8]">
                  {credential(coach)}
                </span>
                <span className="block text-[13px] leading-snug text-[#5B6782]">
                  {coach.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-[#EEF2F8] pt-4">
        <Rating />
      </div>
    </div>
  );
}

/** "Dr. Todd Chastain, DMD" -> "Dr. Todd", "Celina (Chaeyun) Yang" -> "Celina". */
function shortName(name: string) {
  const words = name.split(",")[0].trim().split(/\s+/);
  return words[0] === "Dr." ? `Dr. ${words[1]}` : words[0];
}

/** "A", "A & B", "A, B & C" */
function joinNames(names: string[]) {
  return names.length <= 1
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** Mobile: a compact strip under the buttons. */
export function HeroTutorsStrip({ tutors }: { tutors: Coach[] }) {
  return (
    <div className="mt-7 flex items-center gap-3 lg:hidden">
      <div className="flex -space-x-3">
        {tutors.map((coach) => (
          <Avatar key={coach.id} coach={coach} size={44} />
        ))}
      </div>
      <div className="min-w-0">
        <p className="text-[13.5px] leading-snug font-semibold text-[#33415C]">
          {joinNames(tutors.map((coach) => shortName(coach.name)))}
        </p>
        <Rating className="mt-0.5" />
      </div>
    </div>
  );
}
