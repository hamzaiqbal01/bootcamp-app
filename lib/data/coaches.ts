export type CoachStat = {
  value: string;
  label: string;
};

export type CoachVideo = {
  src: string;
  poster: string;
  thumb: string;
  // object-position for the expanded video, for clips whose subject isn't centred (e.g. portrait phone video).
  position?: string;
};

export type Coach = {
  id: string;
  name: string;
  title: string;
  badge: string;
  extraBadges?: string[];
  initials: string;
  photo: string | null;
  photoPosition: string;
  introVideo?: CoachVideo;
  stats: CoachStat[];
  text: string;
  focusAreas: string[];
  role: string;
};

export const coaches: Coach[] = [
  {
    id: "dr-todd-chastain",
    name: "Dr. Todd Chastain, DMD",
    title: "Faculty, UAB School of Dentistry",
    badge: "10+ yrs tutoring",
    extraBadges: ["Practicing dentist"],
    initials: "TC",
    photo: "/images/hero-coaches/dr-todd-chastain.jpg",
    photoPosition: "50% 44%",
    introVideo: {
      src: "/videos/todd-chastain-intro.mp4",
      poster: "/images/coach-videos/todd-chastain-intro-poster.jpg",
      thumb: "/images/coach-videos/todd-chastain-intro-thumb.jpg",
    },
    stats: [
      { value: "35 yrs", label: "Private practice" },
      { value: "10 yrs", label: "Mentoring" },
      { value: "DMD", label: "UAB, 1991" },
    ],
    text: "For the past 10 years, Dr. Chastain has mentored pre-dental students through applications and interviews, and every one he has guided is now a practicing dentist. He taught dental students in the clinic at UAB and now teaches biology at the University of North Alabama, so he also tutors DAT Biology. He knows what admissions committees look for and how to help you stand out.",
    focusAreas: ["DAT Biology", "Applications", "Interviews", "Personal statement"],
    role: "Applicant mentor & DAT Biology tutor",
  },
  {
    id: "celina-yang",
    name: "Celina (Chaeyun) Yang",
    title: "University of Pennsylvania School of Dental Medicine",
    badge: "Dental student",
    initials: "CY",
    photo: "/images/hero-coaches/celina-yang.jpg",
    photoPosition: "50% 45%",
    stats: [
      { value: "25 AA", label: "DAT score" },
      { value: "7", label: "Interviews" },
      { value: "Penn", label: "Dental school" },
    ],
    text: "First-year Penn Dental student who scored a 25 AA on the DAT, with a 27 in Biology and a 28 in Quantitative Reasoning. Celina has tutored science from high school through college, and she goes over every practice question with you, right or wrong, so a lucky guess never hides a gap.",
    focusAreas: ["DAT Biology", "Quantitative Reasoning", "Personal statement", "Secondaries"],
    role: "DAT & admissions coach",
  },
  {
    id: "hansuja-chaurasia",
    name: "Hansuja Chaurasia",
    title: "University of Connecticut School of Dental Medicine",
    badge: "Dental student",
    initials: "HC",
    photo: "/images/hero-coaches/hansuja-chaurasia.jpg",
    photoPosition: "50% 40%",
    introVideo: {
      src: "/videos/hansuja-chaurasia-intro.mp4",
      poster: "/images/coach-videos/hansuja-chaurasia-intro-poster.jpg",
      thumb: "/images/coach-videos/hansuja-chaurasia-intro-thumb.jpg",
      position: "50% 38%",
    },
    stats: [
      { value: "UConn", label: "Dental school" },
      { value: "B.S.", label: "Allied Health" },
      { value: "Tutor", label: "DAT & advising" },
    ],
    text: "UConn Dental student who has worked as a private DAT tutor and application advisor. Hansuja's strongest DAT sections were Reading Comprehension and Biology, and her sessions focus on why an answer is right, not just what it is, so you can handle questions you haven't seen before.",
    focusAreas: ["DAT", "Application advising"],
    role: "DAT tutor & advisor",
  },
  {
    id: "neil-desai",
    name: "Neil Desai",
    title: "Case Western Reserve University School of Dental Medicine",
    badge: "Dental student · D1",
    initials: "ND",
    photo: null,
    photoPosition: "center center",
    stats: [
      { value: "24 AA", label: "2024 DAT" },
      { value: "30", label: "Chemistry" },
      { value: "3.92", label: "GPA" },
    ],
    text: "BS Human Biology with honors from Michigan State. Coaches every DAT section, from biology and orgo to PAT and QR.",
    focusAreas: ["Biology", "Chemistry", "Orgo", "PAT", "QR", "RC"],
    role: "DAT tutor",
  },
];

export function getCoach(id: string) {
  return coaches.find((coach) => coach.id === id);
}
