// How to answer each common type of dental school secondary prompt.
// `match` decides which guide a prompt links to on /secondaries; order matters (first match wins).

export type AnswerGuide = {
  id: string;
  label: string;
  title: string;
  match: RegExp;
  /** One line shown right under each matching prompt */
  quickTip: string;
  /** What the school is really asking */
  intent: string;
  /** How to build the answer */
  how: string[];
  /** The most common mistake */
  avoid: string;
};

export const answerGuides: AnswerGuide[] = [
  {
    id: "reapplicant",
    label: "Reapplicant",
    title: "Reapplicant prompts",
    match: /reappl|previously applied|applied before|since (you|your) (last|previous)/i,
    quickTip: "Say what changed since your last cycle, with facts: new grades, a higher DAT, new hours or a stronger statement.",
    intent: "Has anything actually changed since the last time we said no?",
    how: [
      "Open with one sentence on what you learned from the last cycle.",
      "List the concrete changes: new grades, a higher DAT, new clinical or volunteer hours, a rewritten statement.",
      "End with why you are a stronger applicant now, backed by those facts.",
    ],
    avoid: "Blaming the last cycle on luck or the school. Show growth, not frustration.",
  },
  {
    id: "academics",
    label: "Grades or DAT",
    title: "Academic record, DAT, withdrawals and gaps",
    match: /\bgpa\b|grade|withdr|academic (record|performance|difficult|probation)|\bdat\b|course ?work|break in|gap in|interruption|repeat(ed)? (a )?course/i,
    quickTip: "Explain what happened in one or two plain sentences, what you changed, and the proof that it worked.",
    intent: "Is there a pattern we should worry about, and do you understand it?",
    how: [
      "State what happened in one or two plain sentences, with no excuses.",
      "Explain what you changed: study habits, workload, getting help.",
      "Point to proof that it worked, such as later grades or a retake score.",
    ],
    avoid: "Long explanations or blaming others. Short, honest and forward-looking reads as mature.",
  },
  {
    id: "disadvantaged",
    label: "Background",
    title: "Disadvantaged or first-generation status",
    match: /disadvantag|first[- ]generation|socioeconomic|financial (hardship|need)|economically/i,
    quickTip: "Describe your circumstances factually, how they shaped your path, and what you will bring to patients.",
    intent: "What context should we have when we read the rest of your application?",
    how: [
      "Describe the circumstances factually: work hours, family responsibilities, school resources.",
      "Show how they affected your path, for example fewer research options or working through college.",
      "Close with what it taught you that you will bring to patients.",
    ],
    avoid: "Writing it as a sad story. Facts plus what you did with them are stronger.",
  },
  {
    id: "ties",
    label: "Ties to the state",
    title: "Ties to the state or region",
    match: /\bties?\b|connection\(s\)|connections? (do you have )?to|resident|residency|in-state|state of|practice in (the state|[A-Z])|rural|underserved area|shortage area|grow up in|grew up in/i,
    quickTip: "Name real connections, such as where you grew up, family, school or work, and where you plan to practice.",
    intent: "Are you likely to stay and practice here after graduation?",
    how: [
      "Name real connections: where you grew up, family, school, work, or volunteering in the state.",
      "If you plan to practice there, say where and why, for example a rural or underserved area you know.",
      "If your ties are weak, say so briefly and explain what draws you to the region.",
    ],
    avoid: "Inventing or stretching ties. Schools can check, and it hurts trust.",
  },
  {
    id: "why-school",
    label: "Why this school",
    title: "\"Why our school?\"",
    match: /why (do you want to|are you|have you|did you)? ?(attend|apply|choose|chosen|interest|select)|why .*(school|program|college|university)|what (attracts|draws|interests|convinced) you|right fit|selecting a dental school|choosing a dental school|mission/i,
    quickTip: "Name two or three things only this school offers and connect each one to something you have done.",
    intent: "Did you research us, and do you actually fit what we do?",
    how: [
      "Pick two or three things only this school has: a clinic, curriculum feature, community program or research area.",
      "Connect each one to something you have already done, such as a shadowing experience or volunteer work.",
      "Finish with what you would contribute there, not only what you would get.",
    ],
    avoid: "Praise that fits any school (\"excellent faculty\", \"great reputation\"). Swap the school name: if it still works, rewrite it.",
  },
  {
    id: "diversity",
    label: "Diversity",
    title: "Diversity, background and what you would add",
    match: /divers|background|culture|cultural|perspective|unique|identity|contribute to (the|our) (class|community)|add to/i,
    quickTip: "Pick one specific part of your background and show, with one short story, how it shapes the way you care for people.",
    intent: "What will you bring to the class and to the patients you treat?",
    how: [
      "Choose one specific part of your background or experience, not a list.",
      "Tell a short moment where it shaped how you treated someone or solved a problem.",
      "Link it to patient care: communication, trust, understanding a community.",
    ],
    avoid: "Listing traits or identities without an example. One real story is enough.",
  },
  {
    id: "teamwork",
    label: "Teamwork",
    title: "Teamwork and leadership",
    match: /team|leader|collaborat|conflict|group/i,
    quickTip: "Pick one team situation: your exact role, what you did when it got hard, and the result.",
    intent: "Can you work in a clinic, where everything is a team effort?",
    how: [
      "Pick one situation with a clear goal and your specific role.",
      "Show what you did when it got hard, such as a disagreement or missed deadline.",
      "Give the result and what you learned about working with people.",
    ],
    avoid: "Taking all the credit, or describing the team without your own actions.",
  },
  {
    id: "challenge",
    label: "Challenge",
    title: "Challenges, failure and obstacles",
    match: /challeng(e|ing) (you|that you)|(you|you have) (faced|encountered)|obstacle|fail|adversity|setback|difficult (time|situation|experience)|overcome|mistake|hardship/i,
    quickTip: "Keep the problem short and spend most of the answer on what you did and what you learned.",
    intent: "How do you respond when things go wrong?",
    how: [
      "Spend one or two sentences on the situation.",
      "Spend most of the answer on what you did and what you changed.",
      "End with how you apply that lesson now.",
    ],
    avoid: "A disaster story with little reflection, or a fake weakness. Show real follow-through.",
  },
  {
    id: "ethics",
    label: "Ethics",
    title: "Ethical dilemmas and integrity",
    match: /ethic|dilemma|integrity|honest|moral|professionalism/i,
    quickTip: "Name the dilemma, weigh both sides out loud, then say what you did or would do and why.",
    intent: "Can you think through a hard decision fairly?",
    how: [
      "Name the dilemma and the people affected.",
      "Weigh both sides out loud before you decide.",
      "State what you did or would do, and why it protects patients or trust.",
    ],
    avoid: "Jumping straight to the \"right\" answer without showing your reasoning.",
  },
  {
    id: "career",
    label: "Career goals",
    title: "Career goals and plans",
    match: /goal|future|career|plan|after graduat|specialt|years from now|aspir/i,
    quickTip: "Describe the kind of dentist you want to be, grounded in what you have seen, and stay open on specialties.",
    intent: "Do you have a realistic picture of a dental career?",
    how: [
      "Describe the kind of dentist you want to be: setting, patients, community.",
      "Ground it in experience, such as the offices you shadowed or a population you served.",
      "Stay open on specialties; schools like focus, not fixed plans.",
    ],
    avoid: "Vague goals (\"help people\") or a rigid specialty plan with no experience behind it.",
  },
];

export function guideForPrompt(text: string): AnswerGuide | undefined {
  return answerGuides.find((guide) => guide.match.test(text));
}
