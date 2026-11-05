// Short reader summaries shown behind the "Summarize this article" button on each blog post.
// Generated once with Claude from each article's own text (not checked line by line). Add one when you publish a post;
// posts without an entry simply hide the button.

export type BlogSummary = {
  tldr: string;
  points: string[];
};

export const blogSummaries: Record<string, BlogSummary> = {
  "no-dental-school-interview-invite-yet": {
    tldr: "No interview invite by November does not mean you are rejected. Rolling schools still invite in October, November and December. Check that every file is complete, then use the wait to get interview-ready.",
    points: [
      "Interviews run through fall, and some programs interview into February or March. December 15, 2026 is the first day schools may send acceptances.",
      "Confirm AADSAS is complete and any school supplemental fee or essay is paid. An incomplete file is not under review.",
      "Check each school's own deadline. Creighton wants Fall 2027 DAT scores by November 15, 2026, and UAB listed October 31, 2026 as its AADSAS cutoff.",
      "Use the wait to practice your interview format and your why dentistry answer, since an invite may give only one or two weeks.",
      "From December 1, 2026 through February 5, 2027, add real grades in the second Academic Update window. Do not enter a guess.",
    ],
  },
  "virtual-dental-school-interview": {
    tldr: "Zoom interviews are scored on the same things as campus interviews. Prepare your camera, light, sound and short, direct answers, and read each school's invitation because setups differ.",
    points: [
      "Read the invitation. Boston University uses Zoom, UIC says recording the interview can disqualify you, and Creighton pairs a virtual interview with an in-person presentation.",
      "Test your setup the day before on the same device. Put the camera at eye level, light in front of your face, and keep notes off camera.",
      "Keep answers short, give one example, then pause. Name your own role in stories instead of saying we.",
      "Log in early. If the call drops, rejoin with the same link and say so in one sentence.",
      "Do a mock interview on Zoom before interview day so you hear how you actually sound.",
    ],
  },
  "dat-dates-2027": {
    tldr: "The DAT has no fixed national dates in 2027. You book an open Prometric seat. A 2027 test is usually too late for Fall 2027 entry and is the right year for Fall 2028 entry.",
    points: [
      "Get a DENTPIN, apply to the ADA, then book Prometric 60 to 90 days ahead after your eligibility letter arrives.",
      "Official scores take three to four weeks, and there is no unofficial score at the test center.",
      "AADSAS closes February 5, 2027, but schools set earlier cutoffs. Creighton needs DAT scores by November 15, 2026 for Fall 2027.",
      "For Fall 2028, test in spring or early summer 2027. If you may retake, sit in January or February 2027, since attempts must be 60 days apart.",
      "The 2026 DAT fee is $580. Reschedule fees run $50 to $150 depending on how early you change, and a missed appointment forfeits the full fee.",
    ],
  },
  "is-it-too-late-to-apply-dental-school-2027": {
    tldr: "It is not too late for every Fall 2027 school. AADSAS stays open until February 5, 2027, but each school has its own deadline, and some have already passed. Check each deadline before you apply.",
    points: [
      "The school's deadline wins over the cycle close. UAB's was October 31, 2026, and WesternU's is December 1, 2026 at 11:59 PM ET.",
      "Transcripts and letters should arrive at least four weeks before your earliest school deadline. Verification can take up to 10 business days once your file is Complete.",
      "Make sure your DAT score can arrive in time. Scores take three to four weeks, and retakes need 60 days between attempts.",
      "If you already submitted, the second Academic Update runs December 1, 2026 to February 5, 2027. You can update grades only once, so wait for final grades.",
      "December 15, 2026 is the first day schools may send acceptances. If no school deadline works, the next entry year is Fall 2028.",
    ],
  },
  "dental-school-application-timeline-fall-2028": {
    tldr: "To start dental school in Fall 2028, you apply in the 2027 to 2028 AADSAS cycle, in 2027. ADEA has not posted dates yet, so use the 2026 to 2027 cycle as a template and confirm each date.",
    points: [
      "Plan for FAP to reopen in April 2027, AADSAS to open in May 2027, and submissions to start in early June 2027. Confirm with ADEA before booking around them.",
      "Take the DAT in spring or early summer 2027. If you may retake, take your first attempt in January or February 2027.",
      "Before submit week, have prerequisites, logged shadowing hours, requested letters and your personal statement ready.",
      "The ADA grants partial DAT fee waivers in batches starting January 1, April 1 and July 1. The waiver is 50% of the exam fee.",
      "Texas residents applying to Texas dental schools use TMDSAS, not AADSAS. Check TMDSAS dates directly.",
    ],
  },
  "dat-organic-chemistry-changes-2026": {
    tldr: "The 2026 DAT organic chemistry update added no new course. The section is still 30 questions. The ADA renamed topics and lengthened the subtopic list. Study the updated outline if you test after April 2026.",
    points: [
      "Use the specifications in effect on your test date. The ADA anticipated implementation in April 2026, so any 2027 test uses the updated outline.",
      "The outline has five areas: mechanisms, chemical synthesis, acid-base chemistry, chemical and physical properties, and structural evaluation.",
      "Practice curved arrows in both directions: arrows to product, and product back to arrows. A double-headed arrow is an electron pair.",
      "Give extra time to two-step synthesis, reaction coordinate diagrams, and the listed acid-base reasons such as resonance, hybridization and sterics.",
      "Do not discard a full organic chemistry course. The ADA says the content change is not major.",
    ],
  },
  "how-long-does-aadsas-verification-take": {
    tldr: "AADSAS verification takes up to 10 business days after your application is marked Complete, often about two weeks. The clock starts when required materials arrive, not when you click Submit.",
    points: [
      "Transcripts and official scores often take about five business days to post after AADSAS receives them.",
      "Verification places each course in a subject category and converts grades to AADSAS values, such as A- = 3.67.",
      "Coursework entry errors can leave your application Undelivered, which resets your place in line. Fix errors the same day.",
      "The most common delays are missing or late transcripts, entry mistakes and peak June to July volume.",
      "Order official transcripts the week you plan to submit, double-check coursework before submitting, and check your status weekly.",
    ],
  },
  "aadsas-fee-assistance-program-fap": {
    tldr: "If you qualify, the AADSAS Fee Assistance Program waives fees for three dental schools, valued by ADEA at about $494. Do not submit AADSAS before you are approved, or you can lose eligibility.",
    points: [
      "Eligibility is a combined AGI at or below 300% of U.S. poverty guidelines. For a household of 1 the limit is $46,950, and for 4 it is $96,450.",
      "Gather your U.S. tax returns, W-2 or 1099 forms, FAFSA Submission Summary and DENTPIN. You generally get one FAP submission, and decisions are final.",
      "For the 2026 to 2027 cycle, FAP opened April 15, 2026. The 2027 to 2028 cycle is expected to open around April 2027.",
      "After approval, submit AADSAS within 30 calendar days and select three schools in one submit to use the full waiver.",
      "Schools beyond three are paid normally. Approved FAP status can also help with Casper fee assistance.",
    ],
  },
  "casper-test-dental-school": {
    tldr: "You need Casper only if a school on your list requires or strongly recommends it. It is a situational judgment test from Acuity Insights, not a universal AADSAS requirement like the DAT.",
    points: [
      "Check each school's admissions page, the AADSAS program instructions and your Acuity account. Do not trust old third-party lists.",
      "Casper has about 4 video scenarios and about 7 typed scenarios. Expect roughly 90 to 110 minutes including instructions.",
      "Register for the exact test type your schools list. Recent U.S. cycles commonly quote about $85 plus a per-program fee for extras.",
      "If you are approved for ADEA FAP, Acuity may waive the fee when you upload proof before test day.",
      "Take it early, often May to June, so results arrive before committee review. Practice with the official sample test and timed drills.",
    ],
  },
  "dat-scoring-scale-200-600": {
    tldr: "Since March 1, 2025 the DAT is scored 200 to 600 in 10-point steps instead of 1 to 30. An Academic Average of 420 equals an old 20, and 460 equals an old 22.",
    points: [
      "Convert old scores before comparing. Old 17 is about 370, 18 is 390, 19 is 410, 20 is 420, 21 is 440, 22 is 460, and 24 is 490.",
      "Unofficial scores at the test center were discontinued, and AADSAS reports all scores on the 200 to 600 scale.",
      "Old two-digit scores remain valid. Convert an old first attempt before comparing it to a new retake.",
      "Conversion is section specific. PAT 20 is about 430 on the new scale, so use the official ADA concordance table.",
      "A 420 to 440 Academic Average is the default competitive target, and 460 or higher is strong for selective programs.",
    ],
  },
  "dental-school-decision-day": {
    tldr: "Decision Day for the 2026 to 2027 cycle is December 15, 2026. It is the first date schools may release acceptances. It is not a rejection deadline and not the day everyone hears back.",
    points: [
      "Many schools use rolling admissions, so offers, waitlist moves and interviews continue through winter and spring.",
      "Not hearing anything on December 15 is common and is not an automatic no.",
      "If you have not interviewed by Decision Day, later interview invites still happen.",
      "With multiple offers, compare cost, location, curriculum and fit. Know deposit refund policies and AADSAS multiple-acceptance rules.",
      "By the spring deadline, often around April 1, plan to commit to one program.",
    ],
  },
  "can-i-get-into-dental-school-with-a-2-5-gpa": {
    tldr: "With a flat 2.5 GPA and average everything else, admission is usually not realistic. National accepted averages are near 3.55 overall and 3.46 science. The realistic path is an academic rebuild first, then a competitive DAT.",
    points: [
      "Rebuild with a post-bacc or special master's program, or a strong recent upward trend. Mostly A's in upper-level science is the goal.",
      "A high DAT helps only after you show you can earn A's in tough science. It rarely replaces that proof.",
      "Rebuilding from about 2.5 via post-bacc, aim for a DAT Academic Average of 420 to 460 or higher after the new grades.",
      "Prefer programs with access missions and broader GPA ranges. Use the Academic Update and additional information to show your new transcript, and do not hide repeats.",
      "Be honest about whether this cycle is an application year or a rebuild year. Delay if your new coursework is only half done.",
    ],
  },
  "dental-school-application-timeline-fall-2027": {
    tldr: "To start dental school in Fall 2027, apply in the 2026-27 AADSAS cycle. AADSAS opens May 12, 2026, and you can submit from June 2, 2026. Decision Day is December 15, 2026.",
    points: [
      "Starting Fall 2027 means applying in summer 2026, not in 2027.",
      "Key 2026-27 dates: FAP opens April 15, 2026, AADSAS opens May 12, 2026, first submission June 2, 2026, cycle closes February 5, 2027.",
      "Take the DAT by May-June 2026. For room to retake, take it by March-April 2026 because of the 90-day wait.",
      "Complete secondaries quickly, and take Casper if your schools require it (often May-June).",
      "Aiming for Fall 2028? You apply in the 2027-28 cycle. Do not assume dates until ADEA posts them.",
    ],
  },
  "how-long-does-it-take-to-become-a-dentist": {
    tldr: "Becoming a general dentist in the U.S. takes about 8 years after high school: 4 years of undergrad and 4 years of dental school, then licensure. Specialty training adds 2-6 more years.",
    points: [
      "The standard path is 4 years undergrad plus 4 years of DDS or DMD school. DDS and DMD are equivalent.",
      "General dentists do not need a residency. Licensure comes after graduation, usually weeks to a few months later if you plan ahead.",
      "Many specialties add 2-3 years. Oral and maxillofacial surgery often adds 4-6 years.",
      "You can shorten the path with 3+4 programs, AP or dual-enrollment credit, no gap year, and a strong first DAT.",
      "One gap year, for a retake or more experiences, makes the total about 9 years to practice.",
    ],
  },
  "aadsas-bcp-gpa-explained": {
    tldr: "AADSAS Science GPA includes math and statistics, but BCP GPA does not. BCP covers Biology, Chemistry, Physics and Biochemistry only. An A- counts as 3.67 on AADSAS, not 3.7.",
    points: [
      "Read the right column on your Academic Audit. Overall, BCP, Science and Non-Science GPA are all reported separately.",
      "Math, statistics and calculus usually count toward Science GPA, not BCP GPA.",
      "Use AADSAS grade values in hand calculations, such as A- = 3.67, or your numbers will not match.",
      "Retakes do not replace the first grade. Both attempts stay in the calculation.",
      "If BCP is your weak number, address it with post-bacc or SMP coursework, a strong DAT and a realistic school list.",
    ],
  },
  "should-i-retake-the-dat": {
    tldr: "Retake the DAT only if a higher score will change your outcomes enough to justify the delay. It is usually worth it at AA 17 or below, and rarely worth it at 22 or above.",
    points: [
      "At AA 17 or lower, a retake is usually worth it with a real study plan. At 18-19 it is often worth it. At 20-21, retake only to fix one weak section.",
      "A retake helps when you are below your school list floor, one section is broken, you have time, or practice tests show a higher ceiling.",
      "A retake hurts when you want just two more points, have no new method, or when GPA and experiences are the real problem.",
      "Do not let a retake push you past early verification and secondary windows.",
      "Diagnose by section, build a 6-10 week plan, and sit only when 2-3 recent practice AAs clear your target.",
    ],
  },
  "when-does-aadsas-open": {
    tldr: "AADSAS usually opens in late May or early June. Confirm exact dates on the ADEA site. Submitting in the first 1-2 weeks with a complete file is a real advantage at rolling schools.",
    points: [
      "Early submission helps most at schools with rolling admissions, but only if your file is truly complete.",
      "Before opening day, have a DAT plan, a near-final personal statement, letters in motion, a draft school list and documented experiences.",
      "The personal statement limit is 4,500 characters, so do not start it the week AADSAS opens.",
      "Letters of recommendation are the biggest silent delay, so ask early.",
      "After you submit, return secondaries quickly. Delays there erase an early-primary advantage.",
    ],
  },
  "dat-perceptual-ability-practice-guide": {
    tldr: "Mixed daily PAT practice often leaves scores stuck at 17-18. Drill each question family separately, log your errors by type, and practice 20-40 items daily for 6-10 weeks.",
    points: [
      "Treat keyhole, angle ranking, cube counting, hole punching and pattern folding as separate skills, and drill each one.",
      "Do short daily drills instead of weekend marathons. Focus on accuracy first, then speed.",
      "For every miss, write why the wrong answers fail. If you cannot explain it, you are guessing.",
      "In cube counting, use the same counting order every time. In hole punching and folding, predict the result before you look at the options.",
      "Try the 14-day sprint: single-skill days first, then mixed timed sets, then a full timed PAT section with review.",
    ],
  },
  "how-to-become-a-dentist-in-the-usa": {
    tldr: "Becoming a dentist in the U.S. takes about 8 years after high school: 4 years undergrad and 4 years dental school, then licensure. Specialty training adds 2-6 years.",
    points: [
      "Any major works if you finish the science prerequisites. Competitive applicants typically have a 3.5+ overall and science GPA.",
      "Competitive applicants usually have 100+ shadowing hours, ideally across general dentistry and at least one specialty.",
      "The DAT is scored 1-30 and competitive applicants typically score 20+. Most students study 10-12 weeks.",
      "Apply through AADSAS, which opens in late May or early June. Applying early matters because most schools use rolling admissions.",
      "Licensure requires a CODA-accredited degree, the INBDE, a clinical exam and state requirements. Dental school costs commonly range from $200,000 to $500,000+.",
    ],
  },
  "dental-school-vs-medical-school": {
    tldr: "Dentists do not go to medical school. They earn a DDS or DMD. Dentistry is faster to practice, about 8 years versus 11-15 for medicine, so choose based on what work you want to do.",
    points: [
      "Dental and medical school are both 4 years, but medicine requires a 3-7 year residency. General dentists need none.",
      "The DAT includes the PAT spatial test. The MCAT is about 7.5 hours and typically needs 4-6 months of prep, versus 10-12 weeks for the DAT.",
      "Dentistry is hands-on and focused on oral health. Medicine is broader, with more specialty variety and higher-acuity work.",
      "Dentistry generally offers better work-life balance and more common practice ownership.",
      "Shadow both dentists and physicians before you decide.",
    ],
  },
  "how-to-write-dental-school-personal-statement": {
    tldr: "The AADSAS personal statement is limited to 4,500 characters including spaces. Open with a specific moment, make your why dentistry specific to dentistry, and revise at least three times.",
    points: [
      "Brainstorm with specifics: names, places, numbers and moments. Answers like I love helping people mean you are not ready to draft.",
      "Use a structure of hook, why dentistry, what you bring, growth and a close. Aim for 3,800-4,300 characters on a strong draft.",
      "Avoid cliche openings like I have always wanted to be a dentist. Start with a scene.",
      "If a sentence still works when you swap in medicine or nursing, rewrite it.",
      "Address a GPA dip or gap briefly, then revise in three passes: specificity, structure, then reading aloud. Get feedback from someone who does not know your story.",
    ],
  },
  "dental-school-secondary-essays": {
    tldr: "Secondaries often decide whether you get an interview. Return each one within 7-14 days, and make every Why our school answer specific to that program.",
    points: [
      "Aim to return each secondary within 7-14 days. Delays signal low interest.",
      "For Why our school, use 2-3 school-specific details and link them to your experience. If it could go to three other schools unchanged, rewrite it.",
      "Build a story bank of 8-10 short blocks (80-150 words each) before peak season, and remix them for each school.",
      "Keep a research sheet for each school and use a simple structure: direct answer, one concrete example, then a school-specific close.",
      "Avoid the same essay for every school, reprinting your personal statement, and name-dropping programs you do not understand.",
    ],
  },
  "dat-quantitative-reasoning-study-guide": {
    tldr: "DAT QR has 40 questions in 45 minutes, so you cannot solve everything. Skip hard questions on a first pass, return to them later, and practice with the on-screen calculator.",
    points: [
      "QR gives about 67 seconds per question. Competitive scores are 20+.",
      "Study Tier 1 first: arithmetic, algebra and word problems. Then Tier 2: geometry, probability and statistics, and data interpretation.",
      "Use a two-pass system. Answer anything doable in 60-70 seconds first, flag the rest, then guess on whatever remains.",
      "Practice with the on-screen calculator. Use it for ugly decimals, not simple fractions or easy percents.",
      "Keep an error log of topic, cause and fastest approach. In the final month, do 2-3 full timed QR sections a week.",
    ],
  },
  "dat-reading-comprehension-study-guide": {
    tldr: "DAT Reading Comprehension is a search task, not a speed-reading test. Preview each passage, read for structure, and go back to the text for every detail question.",
    points: [
      "The section has 3 passages and 50 questions in 60 minutes, about 20 minutes per passage. The target is 20+.",
      "Preview the first sentence of each paragraph and the last paragraph. Then read for structure, not memorization.",
      "Return to the passage for detail questions. Do not answer from memory.",
      "Watch for trap answers that use outside knowledge, are too extreme, or come from the wrong paragraph.",
      "Practice timed and review every miss with a written reason. If a passage runs long, answer quick detail items first and guess on the worst inference item.",
    ],
  },
  "dat-organic-chemistry-study-guide": {
    tldr: "DAT Orgo is 30 questions and rewards pattern recognition, not memorizing every reaction. Master the Tier 1 and 2 topics, use a five-step decision checklist, and drill misses to reach 20+.",
    points: [
      "Treat Orgo as pattern recognition: reagents, functional groups, stereochemistry and a short list of high-yield mechanisms.",
      "Master Tier 1 and Tier 2 topics first, including SN1/SN2/E1/E2, alkene additions, aromatic chemistry, carbonyls, IR and basic NMR.",
      "For substitution and elimination, check the carbon type, nucleophile or base, solvent, heat and leaving group every time.",
      "Follow the 4-week plan, ending with 3 to 4 full Survey of Natural Sciences blocks and an error log on your bottom topics.",
      "Use one solid question bank plus a reaction sheet, and drill your misses instead of collecting more resources.",
    ],
  },
  "dat-general-chemistry-study-guide": {
    tldr: "DAT General Chemistry is 30 formula-heavy, predictable questions, so it is often the fastest way to raise your Total Science and Academic Average. Drill the same high-yield problem types until the setup is automatic.",
    points: [
      "Know Tier 1 topics cold: stoichiometry, gas laws, acids, bases and equilibrium, thermochemistry, and atomic structure with periodic trends.",
      "Keep a single formula sheet (M1V1 = M2V2, PV = nRT, Henderson-Hasselbalch, ΔG = ΔH − TΔS) and quiz yourself until recall is instant.",
      "Week 2 of the 4-week plan covers acids, bases, equilibrium and thermochemistry, which is the highest-yield week for most students.",
      "Practice Gen Chem inside full timed Survey of Natural Sciences blocks, since it comes after Biology and fatigue lowers real scores.",
      "Watch units (R value, mL vs. L, Celsius vs. Kelvin) and learn qualitative Le Chatelier shifts, which are fast, high-yield points.",
    ],
  },
  "how-to-prepare-for-dental-school-interview": {
    tldr: "Two weeks is enough to prepare for a dental school interview if you build fluency instead of memorizing answers. Confirm your format, prepare 6 to 8 short stories, and practice out loud with feedback.",
    points: [
      "Confirm your format first: a traditional panel and an MMI call for different preparation.",
      "Research the school deeply on Day 1, then build 6 to 8 personal stories of under 90 seconds each on Day 2.",
      "Prepare the core questions, ethical scenarios using the 4-step framework, and 4 to 5 current oral health topics.",
      "Record yourself, then practice with a partner who asks unplanned follow-ups; for MMI, run a full timed circuit.",
      "Handle logistics by Day 11, rest the day before, arrive 15 to 20 minutes early, and send a thank-you email within 24 hours.",
    ],
  },
  "dat-biology-study-guide": {
    tldr: "Biology is 40 of the 100 Survey of Natural Sciences questions and rewards steady review over cramming. Study the high-yield topics over 3 to 4 months using active recall and practice questions.",
    points: [
      "Give Biology more study time than its perceived difficulty suggests, because it has more questions than Gen Chem and Orgo combined.",
      "Master Tier 1 first: cell biology and division, genetics, molecular biology, and evolution and population genetics.",
      "Use Feralis notes with daily Anki reviews, and add DAT Booster questions only after reviewing a topic.",
      "Follow the 12-week plan: content in weeks 1 to 6, practice questions and Tier 2 topics in weeks 7 to 10, full tests in weeks 11 to 12.",
      "Avoid passive reading, skipping molecular biology, and stopping Anki in the last 2 weeks; if stuck at 17 to 19, find your gaps or slow down.",
    ],
  },
  "dental-school-mmi-interview-guide": {
    tldr: "The MMI is a circuit of 6 to 10 timed stations, each scored by a different evaluator who judges your reasoning, not a correct answer. Learn the six station types and practice timed.",
    points: [
      "Expect 8 to 10 minutes per station, with about 2 minutes reading the prompt and 6 to 8 minutes responding.",
      "For ethical dilemmas, use four steps: identify who is affected, name competing values, consider professional obligations, state your position.",
      "At empathy stations, acknowledge the patient's emotion first, then give clear information and respect their autonomy.",
      "Prepare 3 to 4 current dental and public health topics, and know the evidence and the main counterarguments.",
      "Think out loud and reset after each station; a bad station does not affect the others since evaluators score independently.",
    ],
  },
  "dental-school-personal-statement-mistakes": {
    tldr: "Strong applicants get rejected when their personal statement is generic. Replace clichés and accomplishment lists with specific moments, and get feedback from readers who do not know your story.",
    points: [
      "Open with a specific scene or moment, not a cliché like always wanting to be a dentist.",
      "Do not repeat your activities list; go deep on one or two experiences and what changed in how you think.",
      "Explain why dentistry specifically, not healthcare in general, and replace filler phrases with concrete evidence.",
      "Address a GPA dip in one or two direct sentences, and write about what you will contribute, not what dental school will give you.",
      "Budget the 4,500-character AADSAS limit up front and get feedback from people who do not know you well.",
    ],
  },
  "why-dentistry-interview-answer": {
    tldr: "A strong Why Dentistry answer lasts 90 to 120 seconds and is anchored in one specific experience, not generic reasons. Connect that moment to dentistry and close with where you are headed.",
    points: [
      "Interviewers judge specificity of experience, understanding of the field, self-awareness and authenticity.",
      "Avoid weak answers like wanting to help people, an inspiring childhood dentist, science plus art, owning a practice, or not getting into medical school.",
      "Use three steps: a specific experience (20 to 30 seconds), what it showed you about dentistry (40 to 50), and forward-looking intent (20 to 30).",
      "Build your answer around one confirming moment, a link to your background, something that surprised you, and the dentist you want to become.",
      "Record and time yourself, and prepare follow-ups like \"Why not medicine?\"",
    ],
  },
  "dental-school-personal-statement-examples": {
    tldr: "Strong dental personal statements answer why dentistry, why now, and what kind of dentist you will be, using specific moments instead of clichés. Keep it within the 4,500-character AADSAS limit.",
    points: [
      "Open with a specific, vivid moment with real details, not a childhood memory or a line about passion.",
      "Show what you noticed in your experiences instead of claiming traits like being detail-oriented.",
      "If you include a hardship, connect it to how it shapes the way you will care for patients, and avoid just saying it taught resilience.",
      "End with a specific image or idea, not a summary of your goals.",
      "Use the 5-part structure (hook, why dentistry, unique perspective, growth, close) and aim for 4,200 to 4,500 characters.",
    ],
  },
  "dat-pat-tips-and-strategies": {
    tldr: "PAT is 90 questions in 60 minutes across six types, and it is trainable. Daily timed practice over 8 to 12 weeks often raises the score by 3 to 5 points.",
    points: [
      "Learn one strategy per type: eliminate by views for Keyhole, build the 3D object for Top-Front-End, and use a baseline for Angle Ranking.",
      "For Hole Punching, unfold in reverse and count holes; for Cube Counting, sort cubes by position; for Pattern Folding, anchor a base face and check orientation.",
      "Budget time by type and never spend more than 90 seconds on one question; guess and move on, since wrong answers are not penalized.",
      "Practice every day, timed, with at least 15 questions even on light days, and review every miss.",
      "Aim for 19 or higher at most programs, and use the provided whiteboard for scratch work.",
    ],
  },
  "dental-school-waitlist": {
    tldr: "A waitlist is a real path to acceptance, and most movement comes in May and June after the April 30 AADSAS commitment deadline. Stay engaged with a strong letter of continued interest and a backup acceptance.",
    points: [
      "Confirm your waitlist spot within 24 hours, and stay on the list even if you hold an acceptance elsewhere.",
      "Send one Letter of Continued Interest within 2 weeks: a real update, specific reasons for the school, a clear intent to enroll, one page maximum.",
      "Send further updates only when meaningful, such as a higher DAT score, strong new grades, new shadowing or a new letter.",
      "Hold at least one paid acceptance before April 30 so you are never left with nothing.",
      "If you hear nothing by late July, chances drop sharply, so commit elsewhere or plan your reapplication.",
    ],
  },
  "dental-school-acceptance-rates": {
    tldr: "The national dental school acceptance rate is roughly 11 to 13%, but individual schools range from 3% to 35%. Build a balanced list of 12 to 16 schools and submit early.",
    points: [
      "Ignore the national average and check each school's entering class profile for GPA, DAT and in-state share.",
      "Apply where your stats are at or above the 25th percentile, not just above the minimum.",
      "Public schools favor in-state applicants, so treat out-of-state publics as aspirational.",
      "Build a list of 3 to 4 aspirational, 6 to 8 target and 3 to 4 safety schools, totaling 12 to 16.",
      "Submit in the first two weeks AADSAS opens, and prepare hard for interviews, since only 30 to 60% of interviewed applicants are accepted.",
    ],
  },
  "how-to-pay-for-dental-school": {
    tldr: "Total cost of attendance runs $250,000 to $450,000, but scholarships, federal aid, service programs like NHSC, in-state public schools and aid negotiation can cut the debt sharply. Compare net cost after all aid, not sticker tuition.",
    points: [
      "Count the full cost of attendance: tuition, $20,000 to $35,000 a year in living costs, and $20,000 to $40,000 for equipment and fees over four years.",
      "Apply for every scholarship you qualify for, and ask each school's financial aid office about separate scholarship applications and deadlines.",
      "File the FAFSA early (it opens October 1). Borrow federal loans if you may want income-driven repayment or Public Service Loan Forgiveness.",
      "Look at service-based help: the NHSC Scholarship, NHSC Loan Repayment up to $50,000, PSLF after 10 years, state programs, IHS repayment, and military HPSP.",
      "Apply to your in-state public school, compare net cost after aid across offers, and ask schools to match a better offer.",
    ],
  },
  "dental-school-application-timeline": {
    tldr: "For the 2026-27 cycle, AADSAS opens May 12, 2026 and the first submit day is June 2, 2026. Admissions is rolling, so submit your primary application in early June instead of waiting for the deadline.",
    points: [
      "Fill out every AADSAS section the day it opens, and request official transcripts right away, since transcript delays are the most common reason for late submission.",
      "Take the DAT between February and May, but do not rush it. A 19 submitted in June is not better than a 22 submitted in August.",
      "Ask recommenders at least 4 months before your target submission date, and give each a packet with your CV, personal statement draft and instructions.",
      "Return secondaries within 2 to 3 weeks, and start interview prep before invitations arrive in August and September.",
      "Commit to one school by April 30, and treat a waitlist as open: send a letter of continued interest.",
    ],
  },
  "dental-school-prerequisites": {
    tldr: "Most dental schools require one year each of biology, general chemistry, organic chemistry and physics, all with labs, plus English and math. Requirements vary by school, so build your plan around the most demanding school on your list.",
    points: [
      "Complete 2 semesters each of biology, general chemistry, organic chemistry and physics with labs, plus 2 semesters of English and 1 semester of college math.",
      "Take biochemistry, and consider microbiology, anatomy or physiology, statistics and psychology or sociology, since many programs require or recommend them.",
      "Do not count on AP or IB credit for prerequisites. Most dental schools do not accept it, and labs generally must be done in person.",
      "Put your effort into biology, chemistry and organic chemistry first, because they form the BCP GPA that every program reviews closely.",
      "If you get a C or D in a prerequisite, retake it, add advanced coursework, or explain it in the additional information section of AADSAS.",
    ],
  },
  "dental-school-letters-of-recommendation": {
    tldr: "Most dental schools require 3 letters through AADSAS. Ask people who know you well enough to write specific stories, not people with impressive titles, and give them a packet and a brag sheet at least 3 to 4 months ahead.",
    points: [
      "Plan on a science professor, a non-science professor or advisor, and the dentist who supervised your shadowing. Check each school's exact letter requirements.",
      "Ask in person for a strong letter, and ask your dentist while you are still shadowing. Make the formal ask 4 to 6 months before you submit.",
      "Send each recommender your CV, personal statement draft, a brag sheet for your relationship with them, AADSAS instructions, and a deadline 2 to 3 weeks early.",
      "Strong letters open with the relationship, tell specific stories and give a clear endorsement. Generic wording and hedged phrases like I believe weaken a letter.",
      "Waive your right to see every letter, and name a backup recommender in case someone misses the deadline.",
    ],
  },
  "dental-school-gpa-requirements": {
    tldr: "Yes, you can get into dental school with a 3.0 GPA if you pair it with a DAT AA of about 21 to 22+, an upward science trend, strong experiences and a realistic school list. The accepted average is about 3.55 overall.",
    points: [
      "Look at both GPAs. Accepted applicants average 3.55 overall and 3.46 BCP, and a weak BCP GPA raises a flag even when the overall GPA is high.",
      "Expect GPA ranges by tier: top programs 3.7 to 3.9 overall, mid-tier 3.3 to 3.6, and access-focused programs 2.8 to 3.4.",
      "Show an upward trend. Retakes do not replace the original grade, but a strong retake or a post-bacc GPA of 3.6+ over 20 to 30 credit hours helps.",
      "If your GPA is low, explain it briefly in the additional information section and raise your DAT. A 22+ AA is a strong offset.",
      "Build a school list with a mix of tiers, and check each school's 10th percentile GPA, which is more useful than a stated minimum.",
    ],
  },
  "dental-shadowing-hours-for-dental-school": {
    tldr: "Most competitive applicants aim for 100 to 150 shadowing hours, often more for top programs. School minimums usually fall between 40 and 100 hours, but committees also want sustained, varied observation.",
    points: [
      "Aim for at least 100 to 200 hours across more than one dentist and setting. Do most in general dentistry and add a specialty or community setting.",
      "Find shadowing by cold emailing 10 to 15 dentists, using your pre-dental society, asking your own dentist, or contacting dental school clinics.",
      "Be professional, observe quietly, ask thoughtful questions at natural breaks, and write in a journal for 15 to 20 minutes after each session.",
      "Use specific shadowing stories in your personal statement and interviews. Ask a dentist you shadowed for 40+ hours for a letter at least 3 months early.",
      "Avoid spreading thin across many dentists, staying in one setting, skipping documentation, or waiting until junior year to start.",
    ],
  },
  "how-to-study-for-the-dat": {
    tldr: "Most students do best with 10 to 12 weeks of structured study built on a timed diagnostic test. Work in three phases: content, practice, then full-length tests, and do PAT every day.",
    points: [
      "Take a full-length timed diagnostic first, rank your sections weakest to strongest, and book your test date before you start prep.",
      "Match your window to your diagnostic AA: 14 to 16 needs 14 to 18 weeks, 17 to 18 needs 10 to 12, 19 to 20 needs 8 to 10, 20+ needs 6 to 8.",
      "Weeks 1 to 6 build content, weeks 7 to 10 add timed practice and error analysis, and weeks 11 to 12 are full-length tests every 3 days.",
      "Log every wrong answer by topic and cause: knowledge gap, misread, or time pressure. Finish at least 4 to 5 full-length timed exams.",
      "Practice PAT daily from day one, use the search-and-destroy method for Reading Comprehension, and put sleep ahead of extra study hours.",
    ],
  },
  "dental-school-interview-questions": {
    tldr: "Only about 10 to 15% of applicants with a complete AADSAS application get an interview, and the interview tests who you are, not your numbers. Prepare specific stories, use the STAR method, and practice out loud.",
    points: [
      "Know your format: a traditional panel or one-on-one lasts 20 to 45 minutes, while an MMI has 6 to 10 stations of 6 to 8 minutes each.",
      "Answer behavioral questions with STAR: Situation, Task, Action, Result. The Action is the most important part.",
      "For why dentistry, anchor your answer in a specific personal experience and your shadowing. Research each school so your why this school answer is not generic.",
      "For ethics scenarios, put patient safety first, respect patient autonomy, document what happens, and do not cover up misconduct.",
      "Prepare 2 to 3 questions for each school, avoid tuition or salary questions, and follow a 4-week plan that includes at least 2 mock interviews.",
    ],
  },
  "best-dat-tutor-guide": {
    tldr: "Pick a DAT tutor who scored 22+ on the real exam, can diagnose your weaknesses, and runs structured sessions. Start 8 to 12 weeks before your test date, since tutoring in the last 2 to 3 weeks rarely helps.",
    points: [
      "Consider a tutor if scores have not moved after 6+ weeks, or you are more than 2 to 3 points below target with under 10 weeks left.",
      "Ask what the tutor scored on the actual DAT, and look for subject strength, experience with at least 10 to 20 students, and structured sessions.",
      "Online tutoring works as well as in-person for most students. Rates run from $25 to $50 for peer tutors up to $100 to $200+ for specialized services.",
      "Avoid tutors who guarantee a score, took the DAT 5+ years ago, only reteach your notes, or have no references.",
      "Come prepared, keep a mistake log, do timed practice between sessions, and spend session time on your weakest sections.",
    ],
  },
  "how-to-get-into-dental-school": {
    tldr: "Admissions committees weigh GPA, DAT, experiences, personal statement and letters together, and none of them alone gets you in. Start early, tell one coherent story, and submit your AADSAS application on day one in June.",
    points: [
      "Aim for a science and overall GPA of 3.5+. If you are below 3.4, take post-bacc science courses, address it honestly, and compensate with a strong DAT.",
      "Aim for 20+ on AA, PAT and TS. Plan 10 to 12 weeks of study, with 6 to 8 weeks only if you already score about 20+.",
      "Build 200+ shadowing hours across 2 to 3 specialties, with one dentist who knows you well enough to write a letter. Ask for letters 3+ months ahead.",
      "Open your 4,500-character personal statement with a specific story, and have 3 to 5 people review it.",
      "Build a tiered list of 15 to 25 schools, practice at least 5 mock MMI stations, and submit on June 1 because admissions is rolling.",
    ],
  },
  "dat-score-guide": {
    tldr: "A competitive DAT is about 420 AA, which equals the old 20. Selective programs often look for about 460 AA, the old 22. Official reporting has used a 200 to 600 scale since March 1, 2025.",
    points: [
      "Convert old scores to the new scale: old 17 is about 370, old 20 is about 420, and old 22 is about 460.",
      "Plan to clear about 420+ AA first, then work on weak sections, often PAT or organic chemistry. PAT and TS matter about as much as AA at most schools.",
      "Match your target to your GPA: 3.8+ may be fine with 19 to 20, 3.5 to 3.7 needs 20 to 21, 3.2 to 3.4 needs 22+, below 3.2 needs 23+.",
      "Study 10 to 12 weeks for most students, and 4 to 6 hours a day. More than 8 hours a day often leads to burnout.",
      "Consider a retake if you are below 19. At 19 to 20 it depends on the rest of your file. At 21+ it is rarely worth it.",
    ],
  },
};
