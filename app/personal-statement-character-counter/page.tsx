import type { Metadata } from "next";
import Link from "next/link";
import { CharacterCounter } from "@/components/tools/CharacterCounter";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { OG_IMAGE } from "@/lib/og-image";

const title = "Dental School Personal Statement Character Counter";
const description =
  "Free AADSAS personal statement character counter. Check your dental school essay against the 4,500-character limit, with spaces, words, and paragraphs counted live.";

export const metadata: Metadata = {
  title: {
    absolute:
      "AADSAS Personal Statement Character Counter (4,500 Limit) | Future Dental Prep",
  },
  description,
  alternates: { canonical: "/personal-statement-character-counter" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Free AADSAS Personal Statement Character Counter",
    description,
    url: "/personal-statement-character-counter",
    type: "website",
  },
};

const faqs = [
  {
    q: "What is the AADSAS personal statement character limit?",
    a: "The ADEA AADSAS personal statement is limited to 4,500 characters, and spaces count toward that total.",
  },
  {
    q: "Do spaces and line breaks count as characters?",
    a: "Spaces count toward the AADSAS limit. This counter also includes line breaks in its total, so you have a little margin when you paste into the application.",
  },
  {
    q: "How many words is 4,500 characters?",
    a: "Usually somewhere around 700 to 850 words, depending on how long your words and sentences are. The counter shows both so you can track either one.",
  },
  {
    q: "Is my personal statement saved or shared?",
    a: "Your text is kept only in your own browser so it is there if you come back. It is never uploaded to our servers. Use Clear to remove it.",
  },
  {
    q: "Should I write right up to the limit?",
    a: "Not necessarily. A focused statement that lands a little under the limit often reads better than one padded to fill it. Cut repetition before you cut specific examples.",
  },
];

export default function PersonalStatementCounterPage() {
  return (
    <ToolPageLayout
      slug="personal-statement-character-counter"
      title={title}
      intro="Paste your dental school personal statement to check it against the 4,500-character AADSAS limit, with spaces, words, and paragraphs counted as you type."
      description={description}
      faqs={faqs}
      sections={[
        {
          heading: "How to use the character counter",
          body: (
            <>
              <p>
                Paste your draft into the box. The bar turns amber when you are
                within 10% of the limit and red when you go over, with the exact
                number of characters left or over shown underneath.
              </p>
              <p>
                Formatting such as bold, italics, and bullet points does not
                carry into a plain-text application box, so it is safest to
                paste plain text here and in AADSAS.
              </p>
            </>
          ),
        },
        {
          heading: "How to cut characters without losing your story",
          body: (
            <>
              <p>
                Start with sentences that repeat an idea you already made, then
                filler openings such as &ldquo;I have always wanted to&rdquo;
                and long lists of activities that are already in your
                application. Keep the specific moments that only you could
                describe.
              </p>
              <p>
                If you want an expert read before you submit, our{" "}
                <Link
                  href="/pricing"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  personal statement packages
                </Link>{" "}
                include review from a practicing dentist.
              </p>
            </>
          ),
        },
      ]}
    >
      <CharacterCounter />
    </ToolPageLayout>
  );
}
