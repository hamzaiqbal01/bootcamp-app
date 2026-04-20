import type { ServicePackage } from "./types";

export const servicePackages: ServicePackage[] = [
  {
    id: "ps-platinum",
    badge: "platinum",
    title: "Personal Statement Platinum",
    price: "$597",
    includes: [
      "Phone & e-mail access to your personal statement specialist",
      "Initial voice call includes: Brainstorming ideas and formulating an outline",
      "Personal statement review outlining what can be improved, fixed and highlight of any red flags",
      "Unlimited* rounds of critique and editing",
      "Sentence structure optimization",
      "Final round of editing and polishing",
    ],
    descriptions: [
      "The personal statement is a very crucial aspect of your application as it not only gives insight into the type of person you are, but the type of dental student you will be. The personal statement is usually one of the first pieces of information the dental school admissions committee reviews and therefore, it is extremely vital that you present yourself in the best light.",
      "The personal statement service is a personalized, comprehensive package. This service includes unlimited* rounds of critique and editing. We review your personal statement one sentence at a time, top to bottom. We'll give you advice, suggest revisions of certain ideas or sentences, and point out any red flags. You will also have 1-on-1 access to our in-house expert via appointments should you need additional guidance. Whether you just need an expert's eyes to review your statement, or are just starting out with a rough draft, this service will ensure you will remain memorable in the eyes of the admissions committee.",
    ],
    notes: [
      "Please note: We do not write your personal statement for you. We help you with idea generation, outline and/or revision of an already written personal statement.",
    ],
    cta: "Get a Personal Statement Review",
  },
  {
    id: "ps-gold",
    badge: "gold",
    title: "Personal Statement Gold",
    price: "$374",
    includes: [
      "Phone & e-mail access to your personal statement specialist",
      "Brainstorming ideas and formulating an outline",
      "Personal statement review outlining what can be improved, fixed and highlight of any red flags",
      "2 rounds of critique, revisions and editing",
    ],
    descriptions: [
      "The personal statement gold package is an excellent choice for those who want an expert to review and edit their paper. This service includes two rounds of critique, revisions and editing. We review your personal statement one sentence at a time, top to bottom. You will receive advice, suggest revisions of certain ideas or sentences, and point out any red flags. Whether you just need an expert's eyes to review your statement, or are just starting out with a rough draft, this service will ensure you will remain memorable in the eyes of the admissions committee.",
    ],
    notes: [
      "Please note: We do not write your personal statement for you. We help you with idea generation, outline and/or revision of an already written personal statement or help you get started.",
    ],
    cta: "Get a Personal Statement Review",
  },
  {
    id: "secondary",
    title: "Secondary Application",
    price: "$267",
    priceUnit: "per school",
    includes: [
      "Phone & e-mail access to your application specialist",
      "First round of critique",
      "Second round of critique and editing",
      "Final round of editing and polishing",
    ],
    descriptions: [
      "With the competition ever increasing for dental schools across the country, every aspect of the application becomes ever more crucial to the outcome. The secondary application holds an immense weight in admission decisions because it is tailored to each particular school. Answering the questions thoughtfully will greatly increase your chances for securing an interview spot.",
      "The secondary application service is personalized to your needs. Whether you would like us to review just a few questions or go over all of your secondaries, we are here to help. Our in-house experts are very knowledgeable about the type of answers dental schools want to see. Each school looks for different characteristics and while one school may find your answer to be satisfactory, another may not.",
      "Our expert will read the answers to the secondary application, critique it, and recommend any changes that may need to be made. After the initial round of review, your revised secondary application will go through another set of critique and editing. Lastly, your answers will get one last lookover and a final polish will take place before your secondary application is ready for submission.",
    ],
    notes: [
      "Please note: We do not write secondaries for you. We help you with idea generation, outline and/or revision of already written answers.",
    ],
    cta: "Get a Secondary Application Review",
  },
  {
    id: "ps-express",
    badge: "express",
    title: "Personal Statement Express Overview",
    price: "$167",
    includes: [
      "Email access to your personal statement expert",
      "Fast turnaround time (48 hours)",
      "Perfect for those seeking quick expert advice",
    ],
    descriptions: [
      "Are you nearly done with your personal statement and simply want someone with experience to give you some feedback? The Personal Statement Express Overview does just this. Our application expert will carefully review each paragraph and provide some general thoughts, comments and suggestions. Following the review, you will also be given a personal statement rating out of 10 to give you an idea of where you stand.",
    ],
    notes: [
      "Please note: This is not the personal statement review package. This is a single review service. We do not write your personal statement for you. We help you with idea generation and outline of an already written personal statement.",
    ],
    cta: "Get a Personal Statement Express Overview",
  },
  {
    id: "experience",
    title: "Experience Review",
    price: "$247",
    priceUnit: "10 experiences",
    includes: [
      "Phone & e-mail access to your application specialist",
      "Removal of red flags",
      "First round of critique and editing",
      "Second round of critique and editing",
      "Final round of editing and polishing",
    ],
    descriptions: [
      "Applying to dental school is difficult, and with expectations of applicants increasing every year, each component becomes that much more crucial to ensure a solid complete application is submitted. The experiences section of your application is another important section where interview offers can be determined from.",
      "Our expert will carefully review each experience on your application and identify any changes that may need to be made. This package includes an initial round of critique and direction guidance, followed by a second round of critique with editing. Lastly, another review of your experiences will ensure you are putting your best foot forward this application cycle.",
    ],
    notes: [
      "Please note: We do not write your experiences for you. We help you with idea generation, outline and/or revision of already written answers.",
    ],
    cta: "Get an Experience Review",
  },
  {
    id: "critique",
    title: "Application Critique",
    price: "$647",
    includes: [
      "Email and phone access to your admissions expert",
      {
        text: "Review of all essay prompts on the AADSAS application*:",
        sub: [
          "Disadvantaged Consideration Essay",
          "Description of Childhood Residency",
          "Educational Interruption Essay",
          "Reapplicant Essay",
          "Manual Dexterity Essay",
        ],
      },
      "Personal Statement",
      "Experiences (up to 10)",
      "School Secondary Questions/Essays (up to 10 essay prompts)",
      "Identification of red flags and areas of weakness",
      "Customized critique and suggestions for improvement",
      "Application rating out of 10",
    ],
    descriptions: [
      "There are so many angles to the application that it's easy to overlook the details, dismiss important aspects of the application or make mistakes. The Complete Application Critique will offer you peace of mind knowing that you're presenting a solid application.",
      "We will carefully review all of your responses and leave no stone unturned. Following our review, we will provide you with feedback, suggestions for improvement and our overall thoughts on your application. From there we will set up a 1 hour phone call where we can discuss your next course of action.",
    ],
    notes: [
      "Please note: This service does not offer any editing or revisions; it is not a substitute for each of the other services we offer (Personal Statement Review, Experience Review, School Secondary Essay, etc.)",
    ],
    cta: "Get an Application Critique",
  },
  {
    id: "interview",
    title: "Interview Coaching Package",
    price: "$297",
    includes: [
      "Phone & e-mail access to your interview specialist",
      "30 minute interview protocol overview",
      "2 hours of 1-on-1 mock interview video sessions with critique",
      "Multiple mini interview, traditional, panel & group interview covered",
      "School-focused interview option",
      "Common questions with sample responses practice sheet provided",
      "Assistance with formulating answers",
      "Additional interview hours can be scheduled at an hourly rate",
    ],
    descriptions: [
      "The last hurdle to overcome prior to an acceptance is the dental school interview. The interview holds immense weight on determining your admissions outcome. Are you ready for the challenge?",
      "The Interview Coaching Package is put together to remove any doubt at your interview. Your specialist will review interview protocols, provide you with a common question sheet and answer any questions you may have. From there, you have 2 hours of 1-on-1 interview time available to schedule. During your interview sessions, you can choose to tailor your interview sessions towards school-specific interview formats or practice all of them. We offer critiques and make suggestions on how you can improve your responses. We cover all interview formats including MMI, traditional, panel and group interviews. Should you want additional interview practice, an hourly rate will be provided.",
    ],
    cta: "Get Interview Coaching",
  },
  {
    id: "school-selection",
    title: "School Selection",
    price: "$197",
    includes: [
      "30 minute video/phone session with our in-house expert to determine which schools are the best fit for you and compile a school list that makes sense",
    ],
    descriptions: [
      "There are 66 dental schools within the United States and another 10 in Canada. Each dental school program looks for certain characteristics in their applicants. Do you know which schools are a good fit for you?",
      "The school selection service includes a 1-on-1 video sit-down for 30 minutes to determine which schools are a good fit for you and which aren't. Our in-house expert will customize a dental school list based on your needs with the information you provide us. Our admissions expert will explain the pros and cons of each school you're applying to and have a customized school list put together just for you.",
    ],
    cta: "Get Help With School Selection",
  },
  {
    id: "consulting",
    title: "General Consulting",
    price: "$87",
    priceAlt: "$147",
    includes: [
      "15/30 min phone call with an admissions consultant who will answer your questions regarding studying for the DAT, application process, dental school or anything else dental school related.",
    ],
    descriptions: [
      "Our general consulting service is designed to give you direction, clear answers and provide you with an encompassing answer. We can discuss the pros and cons of attending certain dental schools, help you with your study plan, outline the application process, create an application plan or whatever else comes to your mind. Get expert answers fast and make an informed decision.",
    ],
    cta: "Get General Consulting",
  },
  {
    id: "complete",
    title: "Complete Application Package",
    price: "$1,997",
    priceUnit: "10% discount when you bundle!",
    featured: true,
    ribbon: "Best Value",
    includes: [
      "Personal Statement Platinum",
      "School Secondary Service x3",
      "Experience Review",
      "School Selection",
      "Interview Coaching",
      "Admissions advising throughout your application cycle",
    ],
    descriptions: [
      "The complete application bundle includes advising plus everything you need to build a successful application and maximize your chances of receiving a dental school acceptance. Be confident in your application when you hit that submit button!",
    ],
    cta: "Save with the Complete Application Package",
    ctaVariant: "white",
  },
];
