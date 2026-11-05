import type { Metadata } from "next";
import Link from "next/link";
import { DatScoreCalculator } from "@/components/tools/DatScoreCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { OG_IMAGE } from "@/lib/og-image";

const title = "DAT Score Calculator";
const description =
  "Free DAT score calculator. Enter your section scores to get your Academic Average (AA) and Total Science, on the new 200–600 scale or the old 1–30 scale.";

export const metadata: Metadata = {
  title: {
    absolute:
      "DAT Score Calculator: Academic Average & Total Science | Future Dental Prep",
  },
  description,
  alternates: { canonical: "/dat-score-calculator" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Free DAT Score Calculator (AA & Total Science)",
    description,
    url: "/dat-score-calculator",
    type: "website",
  },
};

const faqs = [
  {
    q: "How is the DAT Academic Average calculated?",
    a: "The Academic Average (AA) is the average of five sections: Biology, General Chemistry, Organic Chemistry, Reading Comprehension, and Quantitative Reasoning. The Perceptual Ability Test (PAT) is not included.",
  },
  {
    q: "What is the DAT Total Science score?",
    a: "Total Science (TS) is the average of the three science sections: Biology, General Chemistry, and Organic Chemistry.",
  },
  {
    q: "Is the DAT scored 1–30 or 200–600?",
    a: "Exams taken on or after March 1, 2025 are scored 200–600 in 10-point steps. Exams taken before that were scored 1–30, and those scores remain valid.",
  },
  {
    q: "What is a good DAT score on the new scale?",
    a: "Many applicants use an AA around 420–440 as a competitive target, and 460 or higher as strong for selective programs. Always compare against the entering-class profiles of the schools on your list.",
  },
  {
    q: "How accurate is the old-to-new conversion?",
    a: "It is approximate. The conversion here uses the Academic Average concordance from our DAT scoring scale guide, and concordance differs by section. Confirm important comparisons against the official ADA tables.",
  },
];

export default function DatScoreCalculatorPage() {
  return (
    <ToolPageLayout
      slug="dat-score-calculator"
      title={title}
      intro="Enter your DAT section scores to see your Academic Average, Total Science score, and an approximate conversion between the new 200–600 scale and the old 1–30 scale."
      description={description}
      faqs={faqs}
      sections={[
        {
          heading: "How to use the DAT score calculator",
          body: (
            <>
              <p>
                Choose the scale your exam was scored on, then enter your
                section scores from a real exam or a practice test. Your
                Academic Average and Total Science update as you type, rounded
                the same way they are reported.
              </p>
              <p>
                The calculator also shows an approximate equivalent on the other
                scale, which helps when a school, advisor, or older article
                still talks about a &ldquo;20 AA.&rdquo;
              </p>
            </>
          ),
        },
        {
          heading: "Academic Average vs. Total Science vs. PAT",
          body: (
            <p>
              Schools read all three. The Academic Average covers five sections
              and is the number most schools quote. Total Science isolates
              biology, general chemistry, and organic chemistry. PAT stands
              alone and is often compared separately, so a strong PAT does not
              raise your AA.
            </p>
          ),
        },
        {
          heading: "Turning a practice score into a plan",
          body: (
            <p>
              If one section is pulling your average down, that is where extra
              hours do the most good. Our free{" "}
              <Link
                href="/dat-study-plan-generator"
                className="font-semibold text-[#1F5BD8] hover:underline"
              >
                DAT study plan generator
              </Link>{" "}
              weights your week toward that section, and the{" "}
              <Link
                href="/blog/dat-scoring-scale-200-600"
                className="font-semibold text-[#1F5BD8] hover:underline"
              >
                DAT scoring scale guide
              </Link>{" "}
              has the full old-to-new chart.
            </p>
          ),
        },
      ]}
    >
      <DatScoreCalculator />
    </ToolPageLayout>
  );
}
