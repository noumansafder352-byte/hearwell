import {
  Compass,
  Cpu,
  HandHeart,
  HeartHandshake,
  MessageSquareText,
  RefreshCw,
  Scale,
  ScanSearch,
  Stethoscope,
  UserRound,
} from "lucide-react";
import type { Feature } from "./home";

export const aboutHero = {
  title: "About Us",
  description: "Learn more about HearWell Audiology Clinic and our commitment to your hearing health.",
};

export const ourClinic = {
  eyebrow: "Our Clinic",
  title: "Providing World-Class Hearing Care in Rawalpindi",
  paragraphs: [
    "HearWell Audiology Clinic, located at Nelson Medical Complex, Rawalpindi, provides professional hearing care for individuals of all ages. We combine modern diagnostic technology with personalized guidance to help patients understand their hearing needs and explore suitable solutions.",
    "We believe everyone deserves to experience the joy of sound, stay connected with loved ones, and enjoy greater confidence in everyday life.",
  ],
  valuesLabel: "Our Core Values",
  values: [
    { label: "Independent Advice", icon: Scale },
    { label: "Latest Technology", icon: Cpu },
    { label: "Expert Audiologists", icon: Stethoscope },
    { label: "Patient-Centered Care", icon: HeartHandshake },
  ],
};

export const missionVision = {
  eyebrow: "Our Purpose",
  title: "Making Better Hearing Care Accessible to Everyone",
  mission: {
    title: "Our Mission",
    text: "To provide professional, personalized hearing care that helps individuals understand their hearing health, explore suitable solutions, and improve everyday communication.",
  },
  vision: {
    title: "Our Vision",
    text: "To become a trusted destination for hearing healthcare in Rawalpindi, empowering people of all ages to experience better hearing and a more connected life.",
  },
};

export const approach = {
  eyebrow: "The HearWell Approach",
  title: "Care That Begins With Listening",
  description:
    "Every patient's hearing needs are different. We focus on understanding individual concerns, providing clear guidance, and helping patients make informed decisions about their hearing health.",
  items: [
    {
      title: "Personalized Attention",
      description: "We consider each patient's concerns and hearing needs when guiding them towards appropriate care.",
      icon: UserRound,
    },
    {
      title: "Professional Assessment",
      description: "We use suitable diagnostic methods to evaluate hearing concerns and help determine the next steps.",
      icon: ScanSearch,
    },
    {
      title: "Clear Guidance",
      description:
        "We explain available options in simple, understandable language so patients can make informed decisions.",
      icon: MessageSquareText,
    },
    {
      title: "Continued Support",
      description:
        "We encourage follow-up care when appropriate to help patients manage their hearing health over time.",
      icon: RefreshCw,
    },
  ] satisfies Feature[],
};

export const commitmentToPatients = {
  eyebrow: "Why HearWell",
  title: "Your Hearing Health Matters to Us",
  description:
    "At HearWell Audiology Clinic, we believe quality hearing care should be professional, supportive, and centered on the individual. We strive to create a welcoming environment where patients feel comfortable discussing their concerns and exploring suitable solutions.",
  items: [
    {
      title: "Patient-First Care",
      description: "We prioritize individual needs, comfort, and a positive care experience.",
      icon: HandHeart,
    },
    {
      title: "Independent Advice",
      description: "We aim to provide clear, needs-based recommendations to support informed decisions.",
      icon: Scale,
    },
    {
      title: "Modern Technology",
      description: "We use appropriate diagnostic equipment to support hearing assessments.",
      icon: Cpu,
    },
    {
      title: "Professional Guidance",
      description: "We help patients understand their options throughout their hearing care journey.",
      icon: Compass,
    },
  ] satisfies Feature[],
  cta: "Book an Appointment",
};
