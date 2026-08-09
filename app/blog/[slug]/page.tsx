import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { BlogAdSense } from "@/components/ads/BlogAdSense";
import { BlogAdSenseLoader } from "@/components/ads/BlogAdSenseLoader";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { extractH2Headings, slugifyHeading } from "@/lib/blog-toc";
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
    title: {
      absolute: `${post.title} | FDP`,
    },
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
  const h2Seen = new Map<string, number>();

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
        <h3 key={key++} className="mb-3 mt-8 text-xl font-bold text-slate-900 scroll-mt-28">
          {line.slice(4)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("## ")) {
      const raw = line.slice(3).trim();
      const text = raw.replaceAll(/\*\*/g, "");
      const baseId = slugifyHeading(text);
      const count = h2Seen.get(baseId) ?? 0;
      const id = count > 0 ? `${baseId}-${count + 1}` : baseId;
      h2Seen.set(baseId, count + 1);

      elements.push(
        <h2
          key={key++}
          id={id}
          className="mb-4 mt-12 scroll-mt-28 text-2xl font-extrabold tracking-tight text-slate-900 first:mt-0 sm:text-[1.65rem]"
        >
          {raw.replaceAll(/\*\*(.+?)\*\*/g, "$1")}
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
        <div key={key++} className="my-7 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 text-sm sm:text-[0.95rem]">
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
            className="my-5 text-[1.05rem] leading-[1.85] text-slate-700 sm:text-[1.075rem]"
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
  const tocHeadings = extractH2Headings(post.content);

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

  const blogFaqBySlug: Record<
    string,
    { "@context": string; "@type": string; mainEntity: Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }> }
  > = {
    "dental-school-gpa-requirements": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I get into dental school with a 3.0 GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — you can get into dental school with a 3.0 GPA if you pair it with compensating strengths such as a DAT AA of about 21–22+ (roughly 440–460 on the 200–600 scale), an upward grade trend, strong shadowing, and a realistic school list.",
          },
        },
        {
          "@type": "Question",
          name: "Can you get into dental school with a 3.0?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A 3.0 is not an automatic rejection, but a bare 3.0 with an average DAT and only top-tier schools usually fails. Aim for DAT ~21–22+, recent A-level science grades, and mid-tier or access-mission programs.",
          },
        },
        {
          "@type": "Question",
          name: "Is a 3.5 GPA good enough for dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 3.5 overall GPA is competitive at many U.S. dental schools when paired with a competitive DAT (about 420+ AA on the new scale), strong clinical experience, and a well-prepared application.",
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
    },
    "aadsas-bcp-gpa-explained": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the AADSAS numeric grade value for A- — 3.7 or 3.67?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On ADEA AADSAS, A- converts to 3.67 for quality-point calculations — not 3.7. Always confirm against your verified Academic Audit.",
          },
        },
        {
          "@type": "Question",
          name: "Does AADSAS Science GPA include math and statistics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AADSAS Science GPA is broader than BCP and typically includes math and statistics, while BCP GPA is limited to Biology, Chemistry, Physics, and Biochemistry.",
          },
        },
        {
          "@type": "Question",
          name: "Does math count toward AADSAS BCP GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Math and statistics typically count toward Science GPA (or Other Science), not the narrower BCP GPA used on AADSAS.",
          },
        },
        {
          "@type": "Question",
          name: "What does BCP stand for on AADSAS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BCP stands for Biology, Chemistry, and Physics. On ADEA AADSAS, BCP GPA reporting also includes Biochemistry coursework classified in those subject categories.",
          },
        },
        {
          "@type": "Question",
          name: "Is BCP GPA the same as science GPA on AADSAS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. BCP GPA is limited to Biology, Chemistry, Physics, and Biochemistry. Science GPA is broader and can include math and other science courses.",
          },
        },
        {
          "@type": "Question",
          name: "Do repeated courses replace the old grade in AADSAS BCP GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AADSAS includes all graded attempts. Retaking a course does not erase the original grade from BCP GPA calculations.",
          },
        },
      ],
    },
    "how-long-does-it-take-to-become-a-dentist": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does it take to become a dentist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In the United States, it typically takes about 8 years after high school: 4 years of undergraduate study plus 4 years of dental school (DDS or DMD), followed by licensure before you can practice.",
          },
        },
        {
          "@type": "Question",
          name: "How many years is dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "U.S. dental school is almost always 4 years for a DDS or DMD degree. Specialty residencies add 2–6 more years after graduation if you pursue them.",
          },
        },
        {
          "@type": "Question",
          name: "Can you become a dentist in less than 8 years?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sometimes. Accelerated 3+4 programs, heavy AP credit, and skipping gap years can shorten the path, but accredited dental school itself remains about 4 years for most U.S. graduates.",
          },
        },
        {
          "@type": "Question",
          name: "Do general dentists need a residency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. General dentists can license and practice after dental school without a residency. Residencies are required or expected mainly for specialty careers.",
          },
        },
      ],
    },
    "dat-scoring-scale-200-600": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the DAT still scored 1 to 30?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No for exams on or after March 1, 2025. Official DAT scores are reported on a 200 to 600 scale in 10-point increments. Older attempts may still show 2-digit history in the DTS Hub.",
          },
        },
        {
          "@type": "Question",
          name: "What is a 20 DAT score on the new scale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An Academic Average of 20 on the old 1–30 scale is approximately equivalent to a 420 Academic Average on the new 200–600 scale, per the ADA DAT concordance table.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good DAT score on the 200–600 scale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many applicants target about 420–440 Academic Average (roughly old 20–21) for a competitive school list, while selective programs often look closer to 460+ (roughly old 22+). Always check current school class profiles.",
          },
        },
        {
          "@type": "Question",
          name: "Are unofficial DAT scores still available at the testing center?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Beginning March 1, 2025, unofficial scores are not provided at the testing site under the new scoring model.",
          },
        },
      ],
    },
    "dental-school-decision-day": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When is dental school Decision Day 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For the 2026–27 ADEA AADSAS cycle (Fall 2027 entry), the acceptance notification date is December 15, 2026 — the first day schools may begin notifying accepted applicants.",
          },
        },
        {
          "@type": "Question",
          name: "Do all dental schools send acceptances on Decision Day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. December 15 is the earliest allowed notification date. Many schools continue offering seats through winter and spring via rolling admissions and waitlists.",
          },
        },
        {
          "@type": "Question",
          name: "Is Decision Day the same as when AADSAS opens?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. For 2026–27, AADSAS opens May 12, 2026 and submissions begin June 2, 2026. Decision Day is mid-December.",
          },
        },
      ],
    },
    "can-i-get-into-dental-school-with-a-2-5-gpa": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I get into dental school with a 2.5 GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Almost never on a flat 2.5 alone. Accepted averages are near 3.55 overall. A realistic path usually requires an academic rebuild such as a post-bacc or SMP with strong recent science grades, plus a competitive DAT and a careful school list.",
          },
        },
        {
          "@type": "Question",
          name: "Is a 2.5 GPA too low for dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 2.5 cumulative GPA is well below typical dental school ranges and is usually too low to apply competitively without first earning a much stronger recent academic record.",
          },
        },
        {
          "@type": "Question",
          name: "Can a high DAT make up for a 2.5 GPA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A strong DAT helps after you show you can earn A grades in rigorous science coursework. A high DAT alone rarely replaces the need for a rebuilt transcript when the cumulative GPA is around 2.5.",
          },
        },
      ],
    },
    "dental-school-application-timeline-fall-2027": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When do I apply for Fall 2027 dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apply in the 2026–27 ADEA AADSAS cycle. The application opens May 12, 2026, and the first submit day is June 2, 2026.",
          },
        },
        {
          "@type": "Question",
          name: "When is Decision Day for Fall 2027 entry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "December 15, 2026 is the 2026–27 dental school acceptance notification date — the first day schools may begin releasing acceptances for Fall 2027 matriculation.",
          },
        },
        {
          "@type": "Question",
          name: "When should I take the DAT for Fall 2027 entry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ideally by late spring or early summer 2026 so scores are ready near AADSAS submission, with an earlier first attempt if you want room for a 90-day retake.",
          },
        },
        {
          "@type": "Question",
          name: "When do I apply for Fall 2028 dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fall 2028 entry uses the 2027–28 AADSAS cycle, typically opening and submitting around May–June 2027 once ADEA publishes exact dates. Use 2026–27 as a planning template until then.",
          },
        },
      ],
    },
    "how-long-does-aadsas-verification-take": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does AADSAS verification take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once your ADEA AADSAS application is Complete, verification occurs in chronological order and can take up to 10 business days. Status then changes to Verified.",
          },
        },
        {
          "@type": "Question",
          name: "When does the AADSAS verification clock start?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The verification queue starts when your application reaches Complete status — after required materials such as official transcripts are received — not merely when you click Submit.",
          },
        },
        {
          "@type": "Question",
          name: "How long do AADSAS transcripts take to post?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Official transcripts and test scores typically take about five business days from the date of receipt to post to your AADSAS application.",
          },
        },
      ],
    },
    "aadsas-fee-assistance-program-fap": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the AADSAS Fee Assistance Program?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ADEA FAP is a fee waiver program for eligible applicants. Approved applicants typically receive a waiver covering three ADEA AADSAS dental school designations, valued around $494.",
          },
        },
        {
          "@type": "Question",
          name: "Who qualifies for AADSAS FAP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eligibility generally requires that the applicant’s and relevant family members’ adjusted gross income is at or below 300% of the U.S. poverty guidelines, with supporting U.S. tax documents and a FAFSA Submission Summary.",
          },
        },
        {
          "@type": "Question",
          name: "Can I submit AADSAS before FAP approval?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. If you want the FAP waiver, do not submit your ADEA AADSAS application before you receive FAP approval. Submitting early can make you ineligible.",
          },
        },
        {
          "@type": "Question",
          name: "How long is an AADSAS FAP waiver valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Approved FAP waivers are typically active for 30 calendar days from the approval notification. Submit within that window or the funding may be forfeited.",
          },
        },
      ],
    },
    "casper-test-dental-school": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do dental schools require the Casper test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some U.S. dental schools require Casper, but it is not universal. Check each school’s admissions page and your Acuity Insights program list for the current cycle.",
          },
        },
        {
          "@type": "Question",
          name: "What is Casper for dental school?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Casper is an online situational judgment test from Acuity Insights that uses video and typed open responses to assess attributes like communication, empathy, ethics, and problem-solving.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Casper cost for dental school applicants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "U.S. fees are commonly around $85 base plus per-program distribution fees, but amounts change — confirm on Acuity Insights Dates and Fees. Approved ADEA FAP applicants may qualify for Casper fee assistance.",
          },
        },
      ],
    },
  };

  const gpaFaqLd = blogFaqBySlug[slug] ?? null;

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
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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

            <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/80">{post.description}</p>

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
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Mobile TOC */}
            <BlogTableOfContents headings={tocHeadings} variant="mobile" />

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start xl:gap-14">
              {/* Main content — wider reading column */}
              <article className="min-w-0 max-w-none">
                <BlogAdSense format="horizontal" className="mb-2 mt-0" />
                <div className="blog-prose">{renderMarkdown(post.content)}</div>
                <BlogAdSense format="rectangle" />

                {/* Author card — below content */}
                <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Written By
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{post.author.name}</p>
                      <p className="text-sm text-slate-500">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sticky TOC + CTA — desktop */}
              <aside className="hidden xl:block">
                <div className="sticky top-28 space-y-6">
                  <BlogTableOfContents headings={tocHeadings} variant="sidebar" />

                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-600/15">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">
                      Free Consultation
                    </p>
                    <p className="mt-3 text-lg font-extrabold leading-snug">
                      Get personalized guidance for your application
                    </p>
                    <p className="mt-2 text-sm text-brand-100">
                      15 minutes. No obligation. Real advice.
                    </p>
                    <Link
                      href="/schedule"
                      className="mt-5 block rounded-xl bg-white py-3 text-center text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                    >
                      Schedule Free Call →
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        {(newer || older) && (
          <section className="border-t border-slate-100 bg-white py-10">
            <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
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
