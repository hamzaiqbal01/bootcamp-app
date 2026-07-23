import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import {
  getAllCategories,
  getCategoryFromSlug,
  getPostsByCategory,
  slugifyCategory,
} from "@/lib/data/blog";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: slugifyCategory(category),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);
  if (!category) return {};
  return {
    title: `${category} Articles | Future Dentist Prep Blog`,
    description: `Browse all ${category} guides from Future Dentist Prep — expert advice for pre-dental students.`,
    alternates: {
      canonical: `/blog/category/${categorySlug}`,
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

export default async function BlogCategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-slate-100 bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_60%,#312E81_100%)] pb-16 pt-14 sm:pb-20 sm:pt-18">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-indigo-200">
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
                <li className="font-semibold text-white">{category}</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {category}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              {posts.length} article{posts.length === 1 ? "" : "s"} in this category.
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
              >
                All
              </Link>
              {getAllCategories().map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${slugifyCategory(cat)}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition ${
                    cat === category
                      ? "bg-brand-600 text-white ring-brand-500"
                      : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:border-brand-100 hover:shadow-lg"
                >
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
                    <div
                      className={`flex h-40 items-center justify-center bg-gradient-to-br ${post.coverGradient}`}
                    >
                      <span className="text-6xl" role="img" aria-label={post.category}>
                        {post.coverEmoji}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
                      {post.category}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-brand-600">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.description}</p>
                    <p className="mt-auto pt-4 text-xs text-slate-400">
                      {formatDate(post.publishedAt)} · {post.readingTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
