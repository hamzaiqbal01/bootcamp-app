import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSideDecor } from "@/components/landing/HeroSideDecor";
import { AuthorAvatar } from "@/components/blog/AuthorAvatar";
import { BlogAdSenseLoader } from "@/components/ads/BlogAdSenseLoader";
import { blogPosts, getAllCategories, slugifyCategory } from "@/lib/data/blog";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { OG_IMAGE } from "@/lib/og-image";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert guides on dental school admissions, DAT prep, personal statements, and interview tips — written by dentists and current dental students.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    images: [OG_IMAGE],
    title: "Future Dental Prep Blog",
    description:
      "Expert guides on dental school admissions, DAT prep, and personal statements — written by dentists and current dental students.",
    type: "website",
  },
};

const categories = ["All", ...getAllCategories()];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="transition group-hover:translate-x-0.5"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs trail={[{ name: "Blog", path: "/blog" }]} />
      <BlogAdSenseLoader />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F4F7FE_0%,#FFFFFF_100%)] pt-12 pb-12 sm:pt-16 sm:pb-14">
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#1F5BD8]/[0.09] blur-3xl"
            aria-hidden
          />
          <HeroSideDecor />
          <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#1F5BD8]"
                aria-hidden
              />
              Expert resources
            </span>
            <h1 className="mx-auto mt-5 max-w-[760px] text-[clamp(32px,4.4vw,52px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
              The Dental School
              <br />
              <span className="text-[#1F5BD8]">Admissions Blog</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-[17px] leading-relaxed text-[#5B6782]">
              Guides, strategies, and insider knowledge from our team of dental
              professionals — written to help you get accepted.
            </p>
            <p className="mt-3 text-[14px] font-semibold text-[#8A93A3]">
              {blogPosts.length} published articles
            </p>

            {/* Category pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) =>
                cat === "All" ? (
                  <Link
                    key={cat}
                    href="/blog"
                    className="rounded-full bg-[#0B1B3A] px-4 py-2 text-[14px] font-bold text-white"
                  >
                    {cat}
                  </Link>
                ) : (
                  <Link
                    key={cat}
                    href={`/blog/category/${slugifyCategory(cat)}`}
                    className="rounded-full border border-[#E4E9F2] bg-white px-4 py-2 text-[14px] font-semibold text-[#33415C] transition hover:border-[#C9D8F6] hover:text-[#1F5BD8]"
                  >
                    {cat}
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Featured post */}
        <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F3F6FD_30%,#EEF3FD_100%)] pt-4 pb-16 sm:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-5 text-[12px] font-bold tracking-[0.12em] text-[#1F5BD8] uppercase">
              Featured Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] shadow-[0_40px_80px_-50px_rgba(11,27,58,0.8)] transition hover:-translate-y-0.5"
            >
              <div
                className="pointer-events-none absolute -top-28 -left-20 h-[360px] w-[360px] rounded-full bg-[#1F5BD8]/30 blur-3xl"
                aria-hidden
              />
              <div className="relative grid lg:grid-cols-[1fr_420px]">
                {/* Text side */}
                <div className="flex flex-col justify-between p-8 sm:p-12">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[12px] font-bold text-white ring-1 ring-white/15">
                      {featured.coverEmoji} {featured.category}
                    </span>
                    <h2 className="mt-5 text-[clamp(24px,3vw,34px)] leading-snug font-extrabold tracking-[-0.02em] text-white transition group-hover:text-[#C9D8FA]">
                      {featured.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-[16px] leading-relaxed text-white/70">
                      {featured.description}
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AuthorAvatar
                        author={featured.author}
                        size={40}
                        className="ring-2 ring-white/20"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-white">
                          {featured.author.name}
                        </p>
                        <p className="text-[12px] text-white/60">
                          {formatDate(featured.publishedAt)} ·{" "}
                          {featured.readingTime}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-5 text-[14px] font-bold text-[#0B1B3A]">
                      Read Article
                      <ArrowRight />
                    </span>
                  </div>
                </div>

                {/* Cover image or gradient art */}
                {featured.coverImage ? (
                  <div className="relative hidden min-h-[260px] overflow-hidden lg:block">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover object-right transition duration-500 group-hover:scale-[1.03]"
                      sizes="420px"
                    />
                  </div>
                ) : (
                  <div
                    className={`hidden bg-gradient-to-br ${featured.coverGradient} lg:flex items-center justify-center`}
                  >
                    <span
                      className="text-[8rem]"
                      role="img"
                      aria-label={featured.category}
                    >
                      {featured.coverEmoji}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Rest of posts */}
            {rest.length > 0 && (
              <>
                <p className="mt-16 mb-5 text-[12px] font-bold tracking-[0.12em] text-[#8A93A3] uppercase">
                  More Articles
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-[22px] border border-[#E4E9F2] bg-white shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)] transition duration-300 hover:-translate-y-0.5 hover:border-[#C9D8F6] hover:shadow-[0_24px_48px_-32px_rgba(11,27,58,0.5)]"
                    >
                      {/* Card cover */}
                      <div
                        className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${post.coverGradient}`}
                      >
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <span
                            className="absolute inset-0 flex items-center justify-center text-6xl"
                            role="img"
                            aria-label={post.category}
                          >
                            {post.coverEmoji}
                          </span>
                        )}
                        <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[12px] font-bold text-[#1F5BD8] shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="line-clamp-2 text-[18px] leading-snug font-extrabold text-[#0B1B3A] transition group-hover:text-[#1F5BD8]">
                          {post.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-[#5B6782]">
                          {post.description}
                        </p>
                        <div className="mt-6 flex items-center gap-3 border-t border-[#EEF2F8] pt-5">
                          <AuthorAvatar author={post.author} size={32} />
                          <div>
                            <p className="text-[12.5px] font-bold text-[#0B1B3A]">
                              {post.author.name}
                            </p>
                            <p className="text-[12px] text-[#8A93A3]">
                              {formatDate(post.publishedAt)} ·{" "}
                              {post.readingTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* CTA Banner */}
            <div className="relative mt-16 overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#0B1B3A_0%,#132B5E_60%,#1F5BD8_140%)] p-8 text-white sm:p-12">
              <div
                className="pointer-events-none absolute -top-24 -right-16 h-[320px] w-[320px] rounded-full bg-[#1F5BD8]/35 blur-3xl"
                aria-hidden
              />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[12px] font-bold tracking-[0.12em] text-[#9DB9F5] uppercase">
                    Get Personal Guidance
                  </p>
                  <h2 className="mt-3 text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em]">
                    Ready to start your application?
                  </h2>
                  <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-white/70">
                    Our articles give you the framework. A free 15-minute call
                    with our team gives you a personalized plan built around
                    your specific GPA, DAT score, and timeline.
                  </p>
                </div>
                <Link
                  href="/schedule"
                  className="inline-flex min-h-[50px] shrink-0 items-center justify-center rounded-full bg-white px-6 text-[15px] font-bold text-[#0B1B3A] transition-colors hover:bg-[#E8EFFD]"
                >
                  Schedule a Free Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
