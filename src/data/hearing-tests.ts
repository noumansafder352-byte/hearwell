import { Microscope, MessagesSquare, Stethoscope } from "lucide-react";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type { Feature } from "./home";

export const hearingTestsHero = {
  title: "Hearing Tests",
  description: "Comprehensive diagnostic hearing assessments for all ages.",
};

export const hearingTestsIntro = {
  eyebrow: "Diagnostic Excellence",
  title: "Professional Hearing Assessments",
  text: "At HearWell Audiology Clinic, we provide a range of diagnostic hearing tests to evaluate your hearing ability and identify potential hearing difficulties. Our assessments help us understand your hearing needs and guide appropriate care using suitable diagnostic technology.",
  primaryCta: "Book a Hearing Test",
  secondaryCta: "Call Now",
};

export interface HearingTest {
  name: string;
  abbr?: string;
  subtitle: string;
  description: string;
  duration: string;
}

export const testTypes = {
  title: "Types of Hearing Tests",
  tests: [
    {
      name: "Pure-Tone Audiometry",
      abbr: "PTA",
      subtitle: "Standard Hearing Threshold Measurement",
      description:
        "Pure-tone audiometry is a safe, non-invasive hearing test that measures your ability to hear sounds at different frequencies and volumes. It helps identify the type and degree of hearing loss.",
      duration: "20–30 minutes",
    },
    {
      name: "Speech Audiometry",
      subtitle: "Speech Understanding Assessment",
      description:
        "Speech audiometry evaluates how well you hear and understand spoken words. It helps assess speech recognition and discrimination, providing useful information about your hearing and communication abilities.",
      duration: "15–25 minutes",
    },
    {
      name: "Auditory Brainstem Response",
      abbr: "ABR",
      subtitle: "Neurological Hearing Evaluation",
      description:
        "ABR is an objective hearing test that measures the brainstem's response to sound. It may be recommended for newborns, infants, children, and individuals who cannot complete conventional hearing tests.",
      duration: "45–60 minutes",
    },
    {
      name: "Auditory Steady-State Response",
      abbr: "ASSR",
      subtitle: "Objective Hearing Threshold Measurement",
      description:
        "ASSR is an objective test used to estimate hearing thresholds across different frequencies. It can be particularly useful when assessing infants, young children, and patients who cannot reliably respond to conventional hearing tests.",
      duration: "30–45 minutes",
    },
    {
      name: "Tympanometry",
      abbr: "Tymp",
      subtitle: "Middle Ear Function Assessment",
      description:
        "Tympanometry evaluates middle ear function by measuring eardrum movement in response to changes in air pressure. It helps identify possible middle ear problems, including fluid buildup and eardrum mobility issues.",
      duration: "5–10 minutes",
    },
    {
      name: "Tinnitus Matching",
      subtitle: "Tinnitus Pitch and Loudness Assessment",
      description:
        "Tinnitus matching helps characterize the pitch and perceived loudness of ringing, buzzing, or other sounds experienced in the ears. The results can support the development of an individualized tinnitus management plan.",
      duration: "20–40 minutes",
    },
    {
      name: "Real-Ear Measurement",
      abbr: "REM",
      subtitle: "Hearing Aid Verification",
      description:
        "Real-ear measurement evaluates how a hearing aid amplifies sound inside the ear canal. It helps verify hearing aid performance and supports adjustments tailored to the patient's hearing needs.",
      duration: "30–45 minutes",
    },
  ] satisfies HearingTest[],
};

export const hearingTestsWhy = {
  eyebrow: "The HearWell Difference",
  title: "Why Choose HearWell for Hearing Tests?",
  description:
    "We combine appropriate diagnostic technology with professional guidance to help you better understand your hearing health.",
  items: [
    {
      title: "Expert Audiologists",
      description: "Professional assessment and guidance to help evaluate your hearing concerns.",
      icon: Stethoscope,
    },
    {
      title: "Advanced Equipment",
      description: "Modern diagnostic tools to support detailed hearing assessments.",
      icon: Microscope,
    },
    {
      title: "Personalized Consultation",
      description: "Clear explanations of your results and guidance on appropriate next steps.",
      icon: MessagesSquare,
    },
  ] satisfies Feature[],
};

export const hearingTestsFaq = {
  eyebrow: "Hearing Test FAQs",
  title: "Everything You Need to Know About Hearing Tests",
  items: [
    {
      question: "When should I get a hearing test?",
      answer:
        "Consider a hearing test if you struggle to follow conversations, frequently ask people to repeat themselves, increase the television volume, or notice changes in your hearing.",
    },
    {
      question: "Are hearing tests painful?",
      answer:
        "No. Most hearing tests are non-invasive and painless. Some tests may involve headphones, small sensors, or a probe placed in the ear.",
    },
    {
      question: "How long does a hearing test take?",
      answer:
        "Most routine hearing assessments take around 20–30 minutes. More specialized tests may take longer, depending on the type of assessment and individual needs.",
    },
    {
      question: "Do children and infants need hearing tests?",
      answer:
        "Yes. Hearing assessments can help identify hearing difficulties in children and infants. The appropriate test depends on the child's age, development, and hearing concerns.",
    },
    {
      question: "What is the difference between a hearing test and a hearing aid assessment?",
      answer:
        "A hearing test evaluates your hearing ability and identifies potential hearing loss. A hearing aid assessment helps determine whether hearing aids may be suitable and which options best meet your needs.",
    },
    {
      question: "Can a hearing test identify the cause of tinnitus?",
      answer:
        "A hearing test can identify associated hearing difficulties, but it cannot determine every possible cause of tinnitus. Further medical evaluation may be recommended when appropriate.",
    },
  ] satisfies FaqItem[],
};

export const hearingTestsCta = {
  title: "Ready to Schedule Your Hearing Test?",
  description:
    "Take the first step towards understanding your hearing health. Contact our team to discuss your needs and arrange a hearing assessment at HearWell Audiology Clinic, Rawalpindi.",
  primaryCta: "Book Appointment",
  secondaryCta: "Contact Us",
};
