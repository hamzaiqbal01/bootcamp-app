export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  coverGradient: string;
  coverEmoji: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
  content: string;
};

const DR_ALEX = {
  name: "Dr. Alexander Takshyn",
  role: "DMD, Admissions Consultant & Founder",
  imageUrl: "/images/aleex.png",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-get-into-dental-school",
    title: "How to Get Into Dental School in 2025–2026: The Complete Guide",
    description:
      "A step-by-step roadmap covering GPA, DAT scores, shadowing hours, personal statements, letters of recommendation, and interview prep — everything you need to maximize your chances of acceptance.",
    publishedAt: "2026-05-15",
    readingTime: "14 min read",
    category: "Admissions Guide",
    coverGradient: "from-indigo-600 to-violet-700",
    coverEmoji: "🎓",
    author: DR_ALEX,
    content: `
## The Reality of Dental School Admissions

Getting into dental school is one of the most competitive academic endeavors in the United States. With acceptance rates at top programs hovering between 3% and 8%, the question isn't just "am I qualified?" — it's "how do I stand out in a pool of thousands of equally qualified applicants?"

After helping over 10,000 pre-dental students navigate this process — including international applicants, career changers, and reapplicants — here is the honest, complete guide we wish every applicant had from day one.

---

## 1. Understand What Dental Schools Actually Look For

Admissions committees evaluate applicants across five core areas:

| Factor | Weight |
|--------|--------|
| Academic performance (GPA) | High |
| DAT scores | High |
| Clinical & research experience | Medium-High |
| Personal statement & essays | High |
| Letters of recommendation | Medium-High |

None of these alone will get you in. All of them together — presented as a coherent story — will.

---

## 2. GPA: Know the Numbers

Most accepted applicants have:
- **Science GPA:** 3.5+ (competitive programs: 3.6+)
- **Overall GPA:** 3.5+

But GPA is not the whole story. An upward trend matters. A 3.3 freshman year followed by a 3.9 junior year tells a better story than a flat 3.5.

**What to do if your GPA is lower than 3.4:**
- Take post-baccalaureate science courses and excel
- Address it directly and honestly in your personal statement
- Compensate with an exceptional DAT score and meaningful experiences

---

## 3. The DAT: What Score Do You Actually Need?

The Dental Admission Test (DAT) is scored 1–30, with 17 being average. Competitive applicants aim for:

- **AA (Academic Average):** 20+
- **PAT (Perceptual Ability):** 20+
- **TS (Total Science):** 20+

A 22 AA will make you competitive at virtually every program. A 19 AA combined with a 3.7 GPA can still get you accepted at many schools.

**Top DAT prep strategies:**
1. Use DAT Bootcamp — the closest simulation to the real exam
2. Study 3–4 months minimum (6–8 weeks is not enough)
3. Take timed full-length practice tests weekly in the final month
4. Focus on your weakest sections first

**Average study hours:** 300–400 hours total

---

## 4. Dental Shadowing: Hours That Matter

Most schools require 100+ shadowing hours with a general dentist. Competitive applicants have:
- 200+ total hours
- Exposure to at least 2–3 specialties (orthodontics, oral surgery, pediatric dentistry)
- A genuine relationship with at least one dentist who will write you a letter

**Tip:** Shadowing quality > shadowing quantity. One dentist you shadowed for 150 hours who knows your name is worth more than five dentists you shadowed for 20 hours each.

---

## 5. The Personal Statement: Your Most Important 4,500 Characters

AADSAS gives you 4,500 characters (roughly 650 words) to answer: *Why dentistry?*

The most common mistake: starting with "Ever since I was a child..." 

What actually works:
- Open with a specific, sensory story (a moment in the dental chair, a patient interaction, a turning point)
- Connect your background to your purpose
- Demonstrate that you understand what dentistry actually involves day-to-day
- End with where you want to go

**Have 3–5 people review your statement:** a dentist, a current dental student, someone with no dental background (they'll catch jargon), and a professional editor or consultant.

---

## 6. Letters of Recommendation

Most programs require:
- 1 letter from a dentist (preferably a general dentist you shadowed extensively)
- 1 science professor
- 1 additional letter (second dentist, research supervisor, or employer)

**How to make a strong request:**
1. Ask 3+ months in advance
2. Provide your resume, personal statement draft, and a list of your experiences
3. Waive your right to view the letter (it signals confidence)
4. Follow up 4 weeks before the deadline

---

## 7. School Selection: Apply Strategically

Most applicants send 15–25 applications. Think of it as three tiers:

| Tier | Criteria | How many |
|------|----------|----------|
| Reach | Your stats are below their median | 4–6 |
| Target | Your stats match their median | 8–12 |
| Safety | Your stats are above their median | 3–5 |

Include in-state schools — they often have lower cutoffs for residents. Include at least one Caribbean or international program if your stats are borderline.

---

## 8. Interview: Convert Your Invite

Getting an interview means you are academically qualified. The interview determines whether they want you as a colleague. Prepare for:

- Traditional (one-on-one with faculty or student)
- MMI (Multiple Mini Interviews — 8–10 mini-scenarios, 5–8 minutes each)
- Panel interviews

**Practice for MMI with real scenarios.** Ethical dilemmas, teamwork scenarios, and situational judgment cases are common. The evaluators are watching *how* you think, not whether your answer is "correct."

**Mock interview practice:** Do at least 5 mock MMI stations with someone giving real-time feedback before your first real interview.

---

## 9. Timeline: When to Do What

| Year | Goal |
|------|------|
| Freshman/Sophomore | Grades, volunteering, research |
| Junior | Shadowing, DAT prep begins |
| Senior (Spring) | Take DAT, open AADSAS application |
| June 1 | Submit AADSAS application (earliest possible) |
| June–August | Submit, update, await secondaries |
| September–March | Interviews |
| April 30 | Decision deadline |

**Submit on day one (June 1).** Dental school admissions is rolling — early applications are reviewed first. Applicants who submit in September are at a serious disadvantage.

---

## 10. Reapplicants: What to Do Differently

If you were not accepted on your first cycle:
1. **Request feedback** from schools that waitlisted or rejected you
2. **Retake the DAT** if your score was below 20
3. **Strengthen your application** — new experiences, stronger letters, new post-bacc courses
4. **Rewrite your personal statement** from scratch — admissions committees will notice recycled content
5. **Apply earlier** — many reapplicants submit too late

The majority of reapplicants who work with a consultant and make meaningful changes get accepted on cycle two.

---

## The Bottom Line

There is no single secret to dental school acceptance. The students who get in consistently do three things:
1. **Start early** — the best applications are built over 2–3 years, not 6 months
2. **Tell a coherent story** — your grades, experience, and essays should reinforce the same narrative
3. **Get expert feedback** — from dentists, current dental students, and admissions professionals

If you want personalized guidance on your specific situation, [schedule a free 15-minute call](/schedule) with our team. No pressure, no obligation — just honest advice from people who've been through it.
`,
  },

  {
    slug: "dat-score-guide",
    title: "DAT Score Requirements by Dental School (2025–2026)",
    description:
      "A data-driven breakdown of average DAT AA, PAT, and TS scores for accepted applicants at top dental schools — plus expert tips to hit your target score.",
    publishedAt: "2026-04-28",
    readingTime: "9 min read",
    category: "DAT Prep",
    coverGradient: "from-emerald-500 to-teal-600",
    coverEmoji: "📊",
    author: DR_ALEX,
    content: `
## Why Your DAT Score Matters More Than You Think

The DAT (Dental Admission Test) is one of the two most gatekept numbers in dental school admissions — the other being your GPA. While your personal statement shows who you are, your DAT score proves to admissions committees that you can handle the academic rigor of dental school.

But here's what most resources won't tell you: **the score you need depends heavily on where you apply.**

---

## Understanding DAT Scoring

The DAT is scored on a scale of 1–30 in each section:

| Section | Abbreviation |
|---------|-------------|
| Biology | BIO |
| General Chemistry | GC |
| Organic Chemistry | OC |
| Perceptual Ability | PAT |
| Reading Comprehension | RC |
| Quantitative Reasoning | QR |

Three composite scores are reported:
- **AA (Academic Average):** Average of BIO, GC, OC, RC, QR
- **TS (Total Science):** Average of BIO, GC, OC
- **PAT:** Standalone score

A score of 17 is national average. **20 is the benchmark for competitive applicants.** Top programs look for 22+.

---

## Average DAT Scores at Top Dental Schools

The following data reflects median accepted applicant scores from recent admissions cycles:

| School | Avg AA | Avg PAT | Avg TS |
|--------|--------|---------|--------|
| Harvard School of Dental Medicine | 23 | 23 | 23 |
| University of Pennsylvania (Penn Dental) | 22 | 22 | 22 |
| Columbia University College of Dental Medicine | 22 | 21 | 22 |
| UCLA School of Dentistry | 22 | 21 | 22 |
| UCSF School of Dentistry | 21 | 21 | 22 |
| University of Michigan School of Dentistry | 21 | 21 | 21 |
| NYU College of Dentistry | 20 | 20 | 20 |
| Tufts University School of Dental Medicine | 20 | 20 | 20 |
| University of Florida College of Dentistry | 19 | 19 | 19 |
| Nova Southeastern University | 19 | 18 | 19 |

> Note: These are averages — some students are accepted with lower scores paired with exceptional GPAs and experiences. Others score a 24 and are still waitlisted. The full picture matters.

---

## What Score Do You Actually Need?

The honest answer: **aim for 20+ as a floor, 22+ if you're targeting elite programs.**

Here's a practical framework:

| Your GPA | Target AA |
|----------|-----------|
| 3.8+ | 19–20 may be fine |
| 3.5–3.7 | 20–21 strongly recommended |
| 3.2–3.4 | 22+ to compensate |
| Below 3.2 | 23+ (plus significant post-bacc work) |

GPA and DAT are compensatory — a spike in one can partially offset a weakness in the other, but neither can fully rescue a catastrophically low other.

---

## The Three Hardest DAT Sections (And How to Beat Them)

### 1. Perceptual Ability (PAT)

The most unique section of the DAT. No college course prepares you for it. You'll interpret 2D keyholes, count holes, fold paper, and analyze 3D objects from different angles.

**Strategy:** Practice daily for 8–12 weeks. Use PAT generators (DAT Bootcamp has the best). Consistency beats cramming.

### 2. Organic Chemistry

The section most students underestimate. AADAT OC focuses on reactions, mechanisms, and lab techniques.

**Strategy:** Master the major reaction mechanisms first (SN1, SN2, E1, E2, aldol, esterification). Flash cards + practice problems. Do not just read the material — apply it.

### 3. Biology

High-yield and high-volume. Evolution, cell biology, genetics, anatomy, physiology, and microbiology are all tested.

**Strategy:** Use DAT Bootcamp's biology notes as your primary resource. Supplement with Anki decks. Focus on what has appeared on real tests.

---

## How Long Should You Study for the DAT?

| Background | Recommended Study Time |
|------------|------------------------|
| Strong science background | 3–4 months |
| Average science background | 4–5 months |
| Weak in sciences or retaking | 5–6 months |

**Study hours:** 4–6 hours/day is sustainable and effective. More than 8 hours/day leads to burnout without proportional gains.

---

## The Most Effective DAT Study Plan (Condensed)

1. **Weeks 1–6:** Content review (one section per week: BIO, GC, OC, PAT, RC/QR)
2. **Weeks 7–10:** Mixed practice sets, section-specific drills, daily PAT practice
3. **Weeks 11–14:** Full-length practice tests (timed, under real conditions), review every wrong answer
4. **Week 15:** Light review, rest, test-day prep

**Track your performance:** Use a spreadsheet to log section scores on every practice test. Your weakest section on week 3 should be your focus on week 8.

---

## Should You Retake the DAT?

If your score is below 19, seriously consider retaking. If it's 19–20, it depends on the rest of your application. If it's 21+, retaking is rarely worth the risk.

**The risk of retaking:** Your highest score is typically reported, but some schools consider all attempts. Retaking and scoring lower is damaging. Only retake if you have a concrete plan to improve.

**Our guidance:** If you scored below your target, work with a tutor who has scored 22+ on the real exam to identify exactly where your study plan fell short.

---

## Bottom Line

- Aim for **20+ AA** as a minimum competitive score
- Aim for **22+ AA** for top-tier programs
- **PAT and TS** matter as much as AA at most schools
- Study for **4–5 months** with a structured plan and consistent practice tests
- If you scored below your target, identify the root cause before retaking

Need a personalized DAT study plan or 1-on-1 tutoring from 99th-percentile tutors? [Learn about our DAT tutoring services](/private-dat-tutoring).
`,
  },

  {
    slug: "dental-school-personal-statement-guide",
    title: "How to Write a Dental School Personal Statement That Gets You Accepted",
    description:
      "A step-by-step guide to writing an outstanding dental school personal statement — with examples of what works, what to avoid, and how to tell your story compellingly in 4,500 characters.",
    publishedAt: "2026-03-10",
    readingTime: "11 min read",
    category: "Personal Statement",
    coverGradient: "from-rose-500 to-pink-600",
    coverEmoji: "✍️",
    author: DR_ALEX,
    content: `
## The One Document That Can Make or Break Your Application

Your GPA gets you past the initial screen. Your DAT score confirms you can handle the academics. Your personal statement answers the only question that matters once you've cleared those thresholds:

**Why do you want to be a dentist — and why should we admit *you*?**

Admissions committees read thousands of personal statements every cycle. The ones that stand out share a common trait: they tell a specific, honest, human story that couldn't have been written by anyone else.

---

## Before You Write a Single Word

Answer these questions in bullet points (don't worry about writing yet):

1. What is the defining moment or experience that confirmed dentistry was right for you?
2. What in your life — background, challenges, interests — shaped how you see the world?
3. What specifically about dentistry (not medicine, not nursing, not research) drew you to it?
4. What kind of dentist do you want to be, and why?
5. What have you done that demonstrates your commitment to this path?

If your answers are vague ("I've always wanted to help people"), dig deeper. Every applicant wants to help people. What's *your* version of that?

---

## The Structure That Works

There is no single correct format for a personal statement. But after reviewing thousands of successful applications, the following structure works most consistently:

### Opening Hook (100–150 characters)
Start *in medias res* — in the middle of a scene. Put the reader in the room with you.

**Weak opening:**
> "Ever since I was a young child, I have been fascinated by science and helping others..."

**Strong opening:**
> "The patient gripped the armrest as Dr. Hernandez explained the extraction. I watched his hands relax — just slightly — as she continued talking. That moment taught me something no textbook had."

### Your Journey (1,200–1,500 characters)
Connect the hook to your broader path. What experiences led you here? Be specific — name programs, locations, what you actually did. Avoid vague claims ("I worked with underserved communities"). Use concrete details ("I assisted at a free clinic in Allentown serving uninsured patients on Saturday mornings").

### Why Dentistry Specifically (800–1,000 characters)
This is where most applicants fail. They write why they like science, or why they want to help people — both of which apply to medicine, pharmacy, and nursing equally.

What makes dentistry unique:
- The intersection of artistry and science
- The ability to build long-term relationships with patients
- Procedural immediacy (results are visible)
- The role of the dentist as a small business owner and clinician

Reference what you *observed* during shadowing that cemented your decision.

### Future Goals (500–700 characters)
Where do you see yourself in 10 years? This doesn't need to be fully formed — you're applying to dental school, not finishing it — but show that you've thought beyond "I want to be a dentist."

### Closing (200–300 characters)
Return to your opening image or theme. Avoid clichés ("I look forward to contributing to your program"). End on something specific and forward-looking.

---

## What Admissions Committees Actually Say

After speaking with admissions directors and committee members at several schools, here are the patterns they highlight:

**What gets remembered:**
- Unusual background that connects logically to dentistry
- A specific patient or patient-care moment described vividly
- Demonstrated self-awareness about why *this* field fits *this* person
- Clear writing — short sentences, active verbs, no passive constructions

**What gets forgotten:**
- "I want to make a difference"
- Lists of activities (that's what the activity section is for)
- Excessive family dentist stories (everyone has one)
- Anything in the passive voice
- Medical jargon used to sound impressive

---

## Common Mistakes (With Fixes)

### Mistake 1: Writing about someone else

> "My grandmother struggled with dental pain her whole life because she couldn't afford care. Watching her suffer made me want to become a dentist."

The reader learns about your grandmother — not you. Fix: Describe *your* reaction, *your* action, what *you* did as a result.

### Mistake 2: The activity summary

The personal statement is not a prose version of your activity list. If you're describing every shadowing experience chronologically, you're listing — not storytelling.

### Mistake 3: Starting too early

> "From a young age, I was always fascinated by teeth..."

Admissions readers see this opening hundreds of times. Start with a specific moment, not a biography.

### Mistake 4: Not connecting experiences

Your shadowing, your research, your volunteer work, your background — these should feel like chapters of the same story, not unrelated bullet points.

### Mistake 5: Perfect grammar, no personality

A technically flawless essay that reads like a formal report is forgettable. Your statement should sound like *you* — clear, thoughtful, and human.

---

## The Review Process That Works

Do not rely on one reviewer. Use this sequence:

1. **First draft:** Write without editing. Get everything out.
2. **48-hour break:** Step away completely.
3. **Second draft:** Cut every sentence that doesn't earn its place.
4. **Reviewer 1:** A dentist or dental student — for clinical accuracy and credibility
5. **Reviewer 2:** A non-dentist (friend, family member) — they'll catch jargon you've normalized
6. **Reviewer 3:** A professional editor or admissions consultant — for structure and narrative
7. **Final read:** Read it aloud. If you stumble, the sentence needs fixing.

---

## Character Count Strategy

AADSAS gives you **4,500 characters** (approximately 650–700 words). Use them.

A 3,000-character statement signals you didn't take the application seriously. A 4,400-character statement is thorough without padding.

**Approximate allocation:**
- Hook: 150 characters
- Journey: 1,400 characters
- Why dentistry: 1,000 characters
- Future goals: 600 characters
- Closing: 250 characters
- Transitions and connective tissue: 1,100 characters

---

## Before You Submit: Final Checklist

- [ ] Opens with a specific scene, not a general statement
- [ ] Explains *why dentistry* not just *why healthcare*
- [ ] Every experience mentioned is connected to a point
- [ ] No passive voice (ctrl+F "was" and "were")
- [ ] Read aloud — every sentence sounds natural
- [ ] Under 4,500 characters (with spaces)
- [ ] Reviewed by at least one dentist or dental student
- [ ] Spell-checked and proofread by someone else

---

## Getting Professional Help

Most accepted applicants report that professional feedback was the single biggest improvement to their personal statement. Not because consultants write it for you — they don't — but because expert eyes catch things you'll never see in your own writing.

We offer [personal statement review services](/schedule) where a current dental student or dentist-consultant reads your draft, gives line-by-line feedback, and works with you through revisions until it's ready.

If you have a draft you'd like feedback on, or if you're staring at a blank page, [schedule a free call](/schedule) and we'll figure out the best next step together.
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
