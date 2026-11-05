import Image from "next/image";
import type { BlogAuthor } from "@/lib/data/blog";

// Author photo, or initials on a soft blue disc for tutors without a photo yet.
export function AuthorAvatar({ author, size, className = "" }: { author: BlogAuthor; size: number; className?: string }) {
  if (author.imageUrl) {
    return (
      <Image
        src={author.imageUrl}
        alt={author.name}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-full bg-white object-cover object-top ${className}`}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={author.name}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] font-extrabold text-[#1F5BD8] ${className}`}
    >
      {author.initials}
    </span>
  );
}
