import type { MetadataRoute } from "next";
import { blogPosts, getAllCategories, slugifyCategory } from "@/lib/data/blog";
import { schools } from "@/lib/data/secondaries/schools";
import { getSchoolDetail } from "@/lib/data/secondaries/school-details";
import { coaches } from "@/lib/data/coaches";
import { freeTools } from "@/lib/data/tools";
import { servicePages } from "@/lib/data/service-pages";
import { datSectionPages } from "@/lib/data/dat-section-tutors";

const BASE = "https://futuredentalprep.com";

// Only real dates go in the sitemap. A date that changes on every build teaches search engines to ignore lastmod,
// so pages without a tracked edit date leave it out; blog listings use their newest post.
function latestPostDate(category?: string) {
  const dates = blogPosts
    .filter((post) => !category || post.category === category)
    .map((post) => new Date(post.publishedAt).getTime());
  return new Date(Math.max(...dates));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((page) => ({
      url: `${BASE}/services/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE}/blog`,
      lastModified: latestPostDate(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/canada`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE}/international-applicants`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/schedule`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE}/dat-study-plan-generator`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...freeTools
      .filter((tool) => tool.slug !== "dat-study-plan-generator")
      .map((tool) => ({
        url: `${BASE}/${tool.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    {
      url: `${BASE}/private-dat-tutoring`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...datSectionPages.map((page) => ({
      url: `${BASE}/private-dat-tutoring/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${BASE}/become-a-tutor`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/secondaries`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...coaches.map((coach) => ({
      url: `${BASE}/team/${coach.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const secondaryRoutes: MetadataRoute.Sitemap = schools
    .filter(
      (school) => (getSchoolDetail(school.slug)?.questions.length ?? 0) > 0,
    )
    .map((school) => ({
      url: `${BASE}/secondaries/${school.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: `${BASE}/blog/category/${slugifyCategory(category)}`,
      lastModified: latestPostDate(category),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...secondaryRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}
