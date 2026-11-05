import type { Metadata } from "next";
import Link from "next/link";
import { GpaCalculator } from "@/components/tools/GpaCalculator";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { OG_IMAGE } from "@/lib/og-image";

const title = "AADSAS GPA Calculator";
const description =
  "Free AADSAS GPA calculator for dental school applicants. Get your overall, science (BCP), biology, chemistry, physics, and non-science GPA from your courses.";

export const metadata: Metadata = {
  title: {
    absolute:
      "AADSAS GPA Calculator: Science (BCP) & Overall GPA | Future Dental Prep",
  },
  description,
  alternates: { canonical: "/aadsas-gpa-calculator" },
  openGraph: {
    images: [OG_IMAGE],
    title: "Free AADSAS GPA Calculator for Dental School",
    description,
    url: "/aadsas-gpa-calculator",
    type: "website",
  },
};

const faqs = [
  {
    q: "What is the BCP GPA on AADSAS?",
    a: "BCP stands for Biology, Chemistry, and Physics. It is the science GPA dental schools look at most closely, alongside your overall GPA.",
  },
  {
    q: "How does AADSAS convert letter grades?",
    a: "AADSAS converts letter grades to a 4.0 scale: A+ and A are 4.0, A- is 3.7, B+ is 3.3, B is 3.0, and so on down to F at 0.0. This calculator uses the same scale.",
  },
  {
    q: "How are quarter hours counted?",
    a: "Quarter hours are converted to semester hours at two-thirds, so a 4-quarter-hour course counts as about 2.67 semester hours. Switch the calculator to quarter hours and it converts for you.",
  },
  {
    q: "Do repeated courses count on AADSAS?",
    a: "AADSAS includes every attempt of a course in its GPA calculations, so enter each attempt as its own row to match how your verified GPA is likely to look.",
  },
  {
    q: "Is this my official AADSAS GPA?",
    a: "No. Your official GPA is calculated by ADEA AADSAS after your transcripts are verified. Use this calculator to estimate it before you apply and to see which category is pulling your numbers down.",
  },
  {
    q: "Is my data saved or shared?",
    a: "Your courses are saved only in your own browser so you can come back to them. Nothing is sent to our servers.",
  },
];

export default function AadsasGpaCalculatorPage() {
  return (
    <ToolPageLayout
      slug="aadsas-gpa-calculator"
      title={title}
      intro="Add your courses to see your overall GPA, science (BCP) GPA, and biology, chemistry, physics, and non-science GPAs the way AADSAS groups them."
      description={description}
      faqs={faqs}
      sections={[
        {
          heading: "How to use the AADSAS GPA calculator",
          body: (
            <>
              <p>
                Add one row per course attempt. Pick the subject that matches
                how the course will be classified, enter the credit hours, and
                choose the letter grade. Your GPAs update as you type.
              </p>
              <p>
                If your school uses quarters, switch to quarter hours and the
                calculator converts each course to semester hours before
                averaging.
              </p>
            </>
          ),
        },
        {
          heading: "Overall GPA vs. science (BCP) GPA",
          body: (
            <>
              <p>
                Your overall GPA includes every graded course. Your science GPA,
                often called the BCP GPA, includes only biology, chemistry, and
                physics. Admissions committees read both, and many look closely
                at the science GPA because it lines up with the dental school
                curriculum.
              </p>
              <p>
                If your BCP GPA is lower than your overall GPA, upper-level
                science courses with strong grades can show an upward trend. A{" "}
                <Link
                  href="/schedule"
                  className="font-semibold text-[#1F5BD8] hover:underline"
                >
                  free call with a mentor
                </Link>{" "}
                can help you decide whether that, a post-bacc, or a higher DAT
                score is the better use of your time.
              </p>
            </>
          ),
        },
        {
          heading: "What counts as biology, chemistry, or physics?",
          body: (
            <p>
              Some courses, such as biochemistry or physiology, sit between
              departments. AADSAS assigns each course a subject when you enter
              your transcript, so check the AADSAS course subject list and pick
              the closest match here. That keeps your estimate close to how the
              course will be verified.
            </p>
          ),
        },
      ]}
    >
      <GpaCalculator />
    </ToolPageLayout>
  );
}
