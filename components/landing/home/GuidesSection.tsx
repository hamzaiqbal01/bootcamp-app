import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export function GuidesSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="guides" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
              Resources
            </p>
            <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              Latest admissions guides
            </h2>
          </div>
          <Link href="/blog" className="text-[15px] font-bold text-[#1F5BD8]">
            All guides
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E4E9F2] bg-white transition hover:shadow-[0_16px_32px_-24px_rgba(11,27,58,0.4)]"
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${post.coverGradient}`}>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-6xl" aria-hidden>
                    {post.coverEmoji}
                  </span>
                )}
                <span className="absolute bottom-4 left-4 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#1F5BD8] shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg leading-snug font-bold text-[#0B1B3A]">{post.title}</h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#5B6782]">
                  {post.description}
                </p>
                <span className="mt-auto pt-2 text-sm font-semibold text-[#5B6782]">
                  {post.readingTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
