import type { MetadataRoute } from "next";
import { blogPosts, getAllCategories, slugifyCategory } from "@/lib/data/blog";
import { schools } from "@/lib/data/secondaries/schools";
import { getSchoolDetail } from "@/lib/data/secondaries/school-details";

const BASE = "https://futuredentalprep.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/schedule`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE}/private-dat-tutoring`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${BASE}/become-a-tutor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/secondaries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const secondaryRoutes: MetadataRoute.Sitemap = schools
    .filter((school) => (getSchoolDetail(school.slug)?.questions.length ?? 0) > 0)
    .map((school) => ({
      url: `${BASE}/secondaries/${school.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${BASE}/blog/category/${slugifyCategory(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...secondaryRoutes, ...categoryRoutes, ...blogRoutes];
}
