import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { BlogAdSenseLoader } from "@/components/ads/BlogAdSenseLoader";
import { blogPosts, getAllCategories, slugifyCategory } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog | Future Dentist Prep",
  description:
    "Expert guides on dental school admissions, DAT prep, personal statements, and interview tips — written by dentists and current dental students.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Future Dentist Prep Blog",
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

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Header />
      <BlogAdSenseLoader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_60%,#312E81_100%)] pb-24 pt-20 sm:pb-32 sm:pt-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-3xl" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-indigo-200 ring-1 ring-white/20 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                EXPERT RESOURCES
              </span>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                The Dental School
                <br />
                <span className="text-indigo-300">Admissions Blog</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Guides, strategies, and insider knowledge from Dr. Alexander Takshyn and our team
                of dental professionals — written to help you get accepted.
              </p>
              <p className="mt-3 text-sm text-indigo-200">{blogPosts.length} published articles</p>
            </div>

            {/* Category pills */}
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) =>
                cat === "All" ? (
                  <Link
                    key={cat}
                    href="/blog"
                    className="rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-indigo-400"
                  >
                    {cat}
                  </Link>
                ) : (
                  <Link
                    key={cat}
                    href={`/blog/category/${slugifyCategory(cat)}`}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-slate-300 ring-1 ring-white/20 transition hover:bg-white/20"
                  >
                    {cat}
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Featured post */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-600">
              Featured Article
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl shadow-slate-200 ring-1 ring-slate-100 transition hover:shadow-indigo-200/40"
            >
              <div className="grid lg:grid-cols-[1fr_420px]">
                {/* Text side */}
                <div className="flex flex-col justify-between p-8 sm:p-12">
                  <div>
                    <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${featured.coverGradient} px-3.5 py-1 text-xs font-bold text-white`}>
                      {featured.coverEmoji} {featured.category}
                    </span>
                    <h2 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem] group-hover:text-indigo-200 transition">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-400 line-clamp-3">
                      {featured.description}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={featured.author.imageUrl}
                        alt={featured.author.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover object-top ring-2 ring-white/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{featured.author.name}</p>
                        <p className="text-xs text-slate-400">
                          {formatDate(featured.publishedAt)} · {featured.readingTime}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition group-hover:bg-indigo-500 group-hover:ring-indigo-400">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="transition group-hover:translate-x-0.5">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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
                      className="object-cover object-right"
                      sizes="420px"
                    />
                  </div>
                ) : (
                  <div className={`hidden bg-gradient-to-br ${featured.coverGradient} lg:flex items-center justify-center`}>
                    <span className="text-[8rem]" role="img" aria-label={featured.category}>
                      {featured.coverEmoji}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Rest of posts */}
            {rest.length > 0 && (
              <>
                <p className="mb-6 mt-20 text-xs font-bold uppercase tracking-widest text-slate-500">
                  More Articles
                </p>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg hover:border-brand-100"
                    >
                      {/* Card cover */}
                      {post.coverImage ? (
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${post.coverGradient}`}>
                          <span className="text-6xl" role="img" aria-label={post.category}>
                            {post.coverEmoji}
                          </span>
                        </div>
                      )}

                      {/* Card body */}
                      <div className="flex flex-1 flex-col p-6">
                        <span className={`inline-flex w-fit items-center rounded-full bg-gradient-to-r ${post.coverGradient} px-3 py-0.5 text-xs font-bold text-white`}>
                          {post.category}
                        </span>
                        <h2 className="mt-4 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-600 transition line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                          {post.description}
                        </p>
                        <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                          <Image
                            src={post.author.imageUrl}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full object-cover object-top"
                          />
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{post.author.name}</p>
                            <p className="text-xs text-slate-400">
                              {formatDate(post.publishedAt)} · {post.readingTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-700 p-10 shadow-xl shadow-indigo-500/25 sm:p-14">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                    Get Personal Guidance
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                    Ready to start your application?
                  </h2>
                  <p className="mt-3 max-w-lg text-indigo-100">
                    Our articles give you the framework. A free 15-minute call with our team gives
                    you a personalized plan built around your specific GPA, DAT score, and timeline.
                  </p>
                </div>
                <Link
                  href="/schedule"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-indigo-50"
                >
                  Schedule a Free Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
