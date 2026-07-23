import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { BlogAdSense } from "@/components/ads/BlogAdSense";
import { BlogAdSenseLoader } from "@/components/ads/BlogAdSenseLoader";
import { blogPosts, getAdjacentPosts, getPostBySlug, getRelatedPosts, slugifyCategory } from "@/lib/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      ...(post.coverImage ? { images: [{ url: post.coverImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="mb-2 mt-6 text-base font-bold text-slate-800">
          {line.slice(5)}
        </h4>,
      );
      i++;
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mb-3 mt-8 text-xl font-bold text-slate-900">
          {line.slice(4)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mb-4 mt-12 text-2xl font-extrabold tracking-tight text-slate-900 first:mt-0"
        >
          {line.slice(3)}
        </h2>,
      );
      i++;
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="mb-4 mt-10 text-3xl font-extrabold tracking-tight text-slate-900">
          {line.slice(2)}
        </h1>,
      );
      i++;
    } else if (line.startsWith("---")) {
      elements.push(
        <hr key={key++} className="my-10 border-slate-100" />,
      );
      i++;
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !/^\|[-| :]+\|$/.test(l.trim()));
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="bg-slate-50">
                {rows[0]
                  .split("|")
                  .filter(Boolean)
                  .map((cell, ci) => (
                    <th
                      key={ci}
                      className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      {cell.trim()}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  {row
                    .split("|")
                    .filter(Boolean)
                    .map((cell, ci) => (
                      <td key={ci} className="px-5 py-3.5 text-slate-700">
                        <span dangerouslySetInnerHTML={{ __html: cell.trim().replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (line.startsWith("- [ ] ")) {
      const checkItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- [ ] ")) {
        checkItems.push(lines[i].slice(6));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-6 space-y-2">
          {checkItems.map((item, ii) => (
            <li key={ii} className="flex items-center gap-3 text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-slate-300 bg-white" aria-hidden />
              <span dangerouslySetInnerHTML={{ __html: item.replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>,
      );
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-slate-700">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {ii + 1}
              </span>
              <span
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.replaceAll(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-slate-900'>$1</strong>").replaceAll(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-brand-600 hover:underline'>$1</a>") }}
              />
            </li>
          ))}
        </ol>,
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-5 space-y-2 pl-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
              <span
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.replaceAll(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-slate-900'>$1</strong>").replaceAll(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-brand-600 hover:underline'>$1</a>") }}
              />
            </li>
          ))}
        </ul>,
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="my-6 border-l-4 border-brand-500 bg-brand-50/50 py-4 pl-6 pr-4">
          <p className="text-base italic text-slate-700">{line.slice(2)}</p>
        </blockquote>,
      );
      i++;
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="my-4 font-bold text-slate-900">
          {line.slice(2, -2)}
        </p>,
      );
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const paraLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("-") && !lines[i].startsWith("|") && !lines[i].startsWith(">") && !lines[i].startsWith("---")) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        const text = paraLines.join(" ");
        elements.push(
          <p
            key={key++}
            className="my-5 leading-[1.8] text-slate-700"
            dangerouslySetInnerHTML={{
              __html: text
                .replaceAll(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-slate-900'>$1</strong>")
                .replaceAll(/\*(.+?)\*/g, "<em>$1</em>")
                .replaceAll(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-brand-600 font-medium hover:underline'>$1</a>"),
            }}
          />,
        );
      } else {
        // Safety: if nothing was captured, advance i to prevent an infinite loop
        // on any unrecognised line (e.g. a lone "#" or other edge-case character)
        i++;
      }
    }
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const { newer, older } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Future Dentist Prep",
      url: "https://futuredentistprep.com",
    },
  };

  const gpaFaqLd =
    slug === "dental-school-gpa-requirements"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can I get into dental school with a 3.0 GPA?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. A 3.0 overall GPA is not an automatic rejection, but you typically need compensating strengths such as a DAT AA of 21–22+, an upward grade trend, strong shadowing, and a realistic school list that includes mid-tier and access-mission programs.",
              },
            },
            {
              "@type": "Question",
              name: "Is a 3.5 GPA good enough for dental school?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A 3.5 overall GPA is competitive at many U.S. dental schools when paired with a 20+ DAT, strong clinical experience, and a well-prepared application.",
              },
            },
            {
              "@type": "Question",
              name: "What is the minimum GPA to apply to dental school?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most schools do not publish a hard minimum. In practice, applicants below about 2.75 rarely advance, and a 3.0 is a more realistic floor for most programs without extraordinary compensating factors.",
              },
            },
          ],
        }
      : null;

  return (
    <>
      <Header />
      <BlogAdSenseLoader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {gpaFaqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gpaFaqLd) }}
        />
      )}
      <main>
        {/* Post header */}
        <section className={`relative overflow-hidden ${post.coverImage ? "bg-slate-900" : `bg-gradient-to-br ${post.coverGradient}`} pb-16 pt-14 sm:pb-20 sm:pt-18`}>
          {post.coverImage && (
            <div className="absolute inset-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover opacity-40"
                priority
                sizes="100vw"
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={`/blog/category/${slugifyCategory(post.category)}`}
                    className="hover:text-white"
                  >
                    {post.category}
                  </Link>
                </li>
              </ol>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/30 transition hover:bg-white/25"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/blog/category/${slugifyCategory(post.category)}`}
                className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/30"
              >
                {post.category}
              </Link>
              <span className="text-sm text-white/70">{formatDate(post.publishedAt)}</span>
              <span className="text-sm text-white/70">·</span>
              <span className="text-sm text-white/70">{post.readingTime}</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{post.description}</p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <Image
                src={post.author.imageUrl}
                alt={post.author.name}
                width={52}
                height={52}
                className="h-13 w-13 rounded-full object-cover object-top ring-2 ring-white/40"
              />
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-sm text-white/70">{post.author.role}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1fr_260px] lg:items-start">
              {/* Main content */}
              <article className="min-w-0">
                <BlogAdSense format="horizontal" className="mb-2 mt-0" />
                {renderMarkdown(post.content)}
                <BlogAdSense format="rectangle" />
              </article>

              {/* Sticky sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  {/* Author card */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Written By
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.author.imageUrl}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover object-top"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{post.author.name}</p>
                        <p className="text-xs text-slate-500">{post.author.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA card */}
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-500/20">
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">
                      Free Consultation
                    </p>
                    <p className="mt-3 text-lg font-extrabold leading-snug">
                      Get personalized guidance for your application
                    </p>
                    <p className="mt-2 text-sm text-indigo-100">
                      15 minutes. No obligation. Real advice.
                    </p>
                    <Link
                      href="/schedule"
                      className="mt-5 block rounded-xl bg-white py-3 text-center text-sm font-semibold text-brand-700 transition hover:bg-indigo-50"
                    >
                      Schedule Free Call →
                    </Link>
                  </div>

                  {/* Reading time */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                    <p className="text-3xl font-extrabold text-slate-900">{post.readingTime.split(" ")[0]}</p>
                    <p className="text-sm text-slate-500">minute read</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        {(newer || older) && (
          <section className="border-t border-slate-100 bg-white py-10">
            <div className="mx-auto grid w-full max-w-4xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-brand-200 hover:bg-white"
                >
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Older article
                  </p>
                  <p className="mt-2 font-semibold text-slate-900 line-clamp-2">{older.title}</p>
                </Link>
              ) : (
                <div />
              )}
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-right transition hover:border-brand-200 hover:bg-white sm:justify-self-end"
                >
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Newer article
                  </p>
                  <p className="mt-2 font-semibold text-slate-900 line-clamp-2">{newer.title}</p>
                </Link>
              ) : null}
            </div>
          </section>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                Related in {post.category}
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-100"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${rp.coverGradient} text-3xl`}>
                      {rp.coverEmoji}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rp.category}</span>
                      <h3 className="mt-1 font-bold leading-snug text-slate-900 group-hover:text-brand-600 transition line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">{rp.readingTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mobile CTA */}
        <section className="bg-gradient-to-br from-brand-600 via-indigo-600 to-violet-700 py-16 lg:hidden">
          <div className="mx-auto w-full max-w-xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold text-white">Ready for personalized help?</h2>
            <p className="mt-3 text-indigo-100">
              Schedule a free 15-minute call with our team.
            </p>
            <Link
              href="/schedule"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-indigo-50"
            >
              Schedule a Free Call
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
