// Facts for /international-applicants, checked on official pages (ADEA, Liaison, ADA, each school) in
// November 2026. Only facts read on the official page itself are used here. Re-check every cycle.

export const INTERNATIONAL_CHECKED = "November 2026";

export type IntlSchool = { name: string; text: string; url: string };

export const schoolsAccepting: IntlSchool[] = [
  {
    name: "A.T. Still University, Arizona (ASDOH)",
    text: "Accepts F-1 students. Prerequisites must be taken in the US; equivalency courses are not considered. Proof that you can pay for the program.",
    url: "https://atsu.edu/asdoh/admissions/requirements.htm",
  },
  {
    name: "Touro College of Dental Medicine (NY)",
    text: "Needs a US or Canadian bachelor's degree. Non-citizens deposit four years of tuition and fees in escrow, or two years with a US co-signer.",
    url: "https://dental.touro.edu/education/dds-program/admissions/",
  },
  {
    name: "Penn Dental Medicine",
    text: "Considers foreign coursework with an ECE course-by-course evaluation, prefers some US coursework. TOEFL is not required.",
    url: "https://www.dental.upenn.edu/admissions-academics/dmd-program/admissions/",
  },
  {
    name: "Creighton University",
    text: "TOEFL 90+ or IELTS 7+ (waived with a US or Canadian degree). Prerequisites taken in the US or Canada.",
    url: "https://www.creighton.edu/dentistry/future-students/dentistry-admissions-requirements",
  },
  {
    name: "UCSF School of Dentistry",
    text: "Needs 93 semester units from a US or English-speaking Canadian school. Financial aid only for US citizens and permanent residents.",
    url: "https://dentistry.ucsf.edu/programs/dds/admissions/international-coursework",
  },
  {
    name: "University of the Pacific (Dugoni)",
    text: "Needs 90 semester units from US or English-speaking Canadian schools. You must show funding for the entire three-year program.",
    url: "https://www.pacific.edu/dental/academic-programs/doctor-of-dental-surgery/dds-admissions-requirements",
  },
  {
    name: "Marquette University",
    text: "TOEFL if your schooling was not in English. Extra deposit and insurance fees for international students.",
    url: "https://www.marquette.edu/dentistry/admissions/international-students.php",
  },
  {
    name: "University of Louisville",
    text: "Needs 60–90 semester hours with a WES or ECE evaluation. Prefers TOEFL 100 (old scale) or 4.0 on the new scale.",
    url: "https://catalog.louisville.edu/professional/dental-bulletin/admission-dmd/international/",
  },
];

export const schoolsNotAccepting: IntlSchool[] = [
  {
    name: "UT Health San Antonio",
    text: "Considers only US citizens and permanent residents.",
    url: "https://uthscsa.edu/dental/programs/dds-program/admissions",
  },
  {
    name: "UMKC",
    text: "Applicants should be US citizens or permanent residents.",
    url: "https://catalog.umkc.edu/colleges-schools/dentistry/doctor-of-dental-surgery-program/traditional-admission/",
  },
  {
    name: "LSU School of Dentistry",
    text: "Residents of other countries are not considered.",
    url: "https://www.lsusd.lsuhsc.edu/admissions/dds/faq.aspx",
  },
];

export const steps = [
  {
    title: "Check each school's international policy",
    text: "Every school sets its own rules. Some do not take international students at all, and many that do want US or Canadian coursework first.",
  },
  {
    title: "Take US or Canadian prerequisite courses",
    text: "Many schools ask for a set number of US or Canadian credits (60 to 93 semester units at the schools listed below), or a full US or Canadian degree.",
  },
  {
    title: "Get a course-by-course evaluation",
    text: "AADSAS accepts foreign transcript evaluations only from WES or ECE. Foreign transcripts sent straight to AADSAS are discarded.",
  },
  {
    title: "Take the US DAT",
    text: "Every US dental school requires the DAT. It is offered at Prometric centers in the US, its territories and select locations in Canada, so plan travel if you live elsewhere.",
  },
  {
    title: "Take the TOEFL or IELTS if needed",
    text: "Many schools ask for it when your schooling was not in English; some, like Penn, do not.",
  },
  {
    title: "Apply through ADEA AADSAS",
    text: "The 2026–27 cycle opened May 12, 2026 and closes February 5, 2027. Applying early gives you the most choice of interview dates.",
  },
  {
    title: "Plan the money and the F-1 visa",
    text: "After you are admitted and show proof of funds, the school issues the Form I-20 you need for the F-1 student visa.",
  },
];

export const intlFaqs = [
  {
    question: "Can international students apply to US dental schools?",
    answer:
      "Yes. ADEA says international students can apply to most US dental schools, but every school has its own policy. Some public schools, such as UT Health San Antonio, UMKC and LSU, only consider US citizens and permanent residents.",
  },
  {
    question: "Do international students need US coursework for dental school?",
    answer:
      "At many schools, yes. UCSF asks for 93 semester units from a US or English-speaking Canadian school, Pacific asks for 90, and Touro requires a US or Canadian bachelor's degree. Check each school's page.",
  },
  {
    question:
      "Can international students get financial aid for US dental school?",
    answer:
      "Not federal aid. F-1 students are not eligible for US federal student aid, and schools such as UCSF limit their aid to US citizens and permanent residents. Some schools also ask for an escrow deposit; Touro asks for up to four years of tuition and fees.",
  },
  {
    question: "Where can I take the DAT if I live outside the US?",
    answer:
      "The DAT is offered at Prometric centers in the US, its territories and select locations in Canada. International applicants usually travel to one of those centers.",
  },
  {
    question: "Is this page for dentists trained in another country?",
    answer:
      "No. This page is for students without a dental degree. Internationally trained dentists usually apply to advanced standing programs through ADEA CAAPID, which is a separate process.",
  },
];
