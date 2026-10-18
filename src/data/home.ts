import {
  Award,
  Baby,
  Cpu,
  Ear,
  HeartHandshake,
  LifeBuoy,
  MessagesSquare,
  Microscope,
  Scale,
  SlidersHorizontal,
  Stethoscope,
  AudioWaveform,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "@/components/ui/FaqAccordion";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const homeHero = {
  eyebrow: "Rawalpindi's Trusted Audiology Clinic",
  title: "Hear Better. Live Better.",
  description:
    "HearWell Audiology Clinic provides professional hearing care for people of all ages. From comprehensive hearing assessments to personalized hearing solutions, we help you hear clearly and enjoy life's most important moments.",
  primaryCta: "Book an Appointment",
  secondaryCta: "Explore Our Services",
};

export const commitment = {
  eyebrow: "Our Commitment to Better Hearing",
  title: "Trusted Care. Better Hearing. Greater Confidence.",
  description:
    "We are committed to delivering professional, patient-centered hearing care through expert guidance, modern diagnostic technology, and personalized solutions.",
  indicators: [
    { title: "Experienced Care", description: "Professional audiology services", icon: Award },
    { title: "Patient-Focused", description: "Care tailored to individual needs", icon: HeartHandshake },
    { title: "Independent Advice", description: "Guidance based on your hearing needs", icon: Scale },
    { title: "Modern Technology", description: "Advanced hearing assessment equipment", icon: Cpu },
  ] satisfies Feature[],
};

export const aboutPreview = {
  eyebrow: "About Our Clinic",
  title: "Providing World-Class Hearing Care in Rawalpindi",
  paragraphs: [
    "HearWell Audiology Clinic, located at Nelson Medical Complex, Rawalpindi, provides professional hearing care for individuals of all ages. Using modern diagnostic technology and personalized guidance, we help patients understand their hearing needs and explore suitable solutions.",
    "Our commitment is to deliver expert, patient-centered care that helps people hear better and stay connected to the moments that matter.",
  ],
  valuesLabel: "Our Values",
  values: [
    { label: "Independent Advice", icon: Scale },
    { label: "Latest Technology", icon: Cpu },
    { label: "Expert Audiologists", icon: Stethoscope },
    { label: "Patient-Centered Care", icon: HeartHandshake },
  ] satisfies { label: string; icon: LucideIcon }[],
  cta: "Explore More",
};

export const servicesIntro = {
  eyebrow: "Our Expertise",
  title: "Comprehensive Hearing Care Services",
  description:
    "From diagnostic hearing assessments to personalized hearing solutions, we offer professional audiology services to help you understand and manage your hearing health.",
};

export const whyChoose = {
  eyebrow: "The HearWell Difference",
  title: "Hearing Care That Puts You First",
  description:
    "We believe better hearing begins with understanding your needs. Our approach combines professional guidance, personalized recommendations, and supportive care to help you make informed decisions about your hearing health.",
  items: [
    {
      title: "Expert Audiology Care",
      description: "Professional hearing assessments and guidance to help you understand your hearing needs.",
      icon: Stethoscope,
    },
    {
      title: "Personalized Recommendations",
      description: "Hearing care and solutions tailored to your individual requirements.",
      icon: SlidersHorizontal,
    },
    {
      title: "Modern Diagnostic Technology",
      description: "Appropriate diagnostic equipment to support detailed hearing assessments.",
      icon: Microscope,
    },
    {
      title: "Independent Advice",
      description: "Clear, patient-focused guidance to help you explore suitable hearing care options.",
      icon: Scale,
    },
    {
      title: "Ongoing Support",
      description: "Guidance throughout your hearing care journey, from initial assessment to follow-up support.",
      icon: LifeBuoy,
    },
  ] satisfies Feature[],
};

export const journey = {
  eyebrow: "Getting Started",
  title: "Your Journey to Better Hearing Starts Here",
  description:
    "We aim to make accessing hearing care simple and comfortable, from your first enquiry to understanding your hearing needs and exploring suitable solutions.",
  steps: [
    { title: "Get in Touch", description: "Tell us about your hearing concerns or the service you need." },
    {
      title: "Arrange Your Appointment",
      description: "Contact our team to discuss availability and arrange a suitable visit.",
    },
    {
      title: "Understand Your Hearing",
      description:
        "Receive an appropriate hearing assessment and discuss the findings with the relevant professional.",
    },
    {
      title: "Explore Your Options",
      description:
        "Understand the recommended next steps, whether that involves further assessment, hearing aids, or ongoing management.",
    },
  ],
  cta: "Arrange Your Appointment",
};

export const whoWeHelp = {
  eyebrow: "Hearing Care for Everyone",
  title: "Hearing Care for Every Stage of Life",
  description:
    "Hearing needs can change throughout life. We aim to provide appropriate guidance and support for individuals experiencing hearing difficulties, helping them take informed steps towards better hearing health.",
  groups: [
    {
      title: "Children and Families",
      description: "Support for families seeking professional guidance about a child's hearing.",
      icon: Baby,
    },
    {
      title: "Adults Experiencing Hearing Changes",
      description: "Assessments for people noticing difficulty hearing conversations, television, or everyday sounds.",
      icon: MessagesSquare,
    },
    {
      title: "Hearing Aid Users",
      description: "Guidance for individuals exploring hearing aids or seeking support with their existing devices.",
      icon: Ear,
    },
    {
      title: "People Experiencing Tinnitus",
      description: "Assessment and advice for individuals experiencing ringing, buzzing, or other sounds in their ears.",
      icon: AudioWaveform,
    },
  ] satisfies Feature[],
};

export const homeFaq = {
  eyebrow: "Have Questions?",
  title: "Everything You Need to Know About Hearing Care",
  items: [
    {
      question: "When should I get a hearing test?",
      answer:
        "Consider a hearing assessment if you frequently ask people to repeat themselves, struggle to follow conversations, increase the television volume, or notice changes in your hearing.",
    },
    {
      question: "Are hearing tests painful?",
      answer:
        "Most routine hearing tests are non-invasive and painless. Your audiologist can explain the process before beginning.",
    },
    {
      question: "How do I know if I need hearing aids?",
      answer:
        "A hearing assessment can help determine whether hearing aids may be appropriate for your needs. Your hearing care professional can explain suitable options.",
    },
    {
      question: "Can tinnitus be managed?",
      answer:
        "Tinnitus management depends on its possible causes, symptoms, and impact on daily life. A professional assessment can help identify appropriate management options.",
    },
    {
      question: "Is ear wax removal necessary?",
      answer:
        "Not all ear wax needs to be removed. If you experience blockage, discomfort, or hearing difficulties, seek professional advice rather than attempting to remove impacted wax yourself.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "Contact HearWell through WhatsApp to enquire about services, discuss your needs, and arrange an appointment.",
    },
  ] satisfies FaqItem[],
};

export const homeFinalCta = {
  eyebrow: "Take the First Step",
  title: "Ready to Hear Life More Clearly?",
  description:
    "Get expert guidance for your hearing needs, from hearing tests to personalized solutions. Contact HearWell to book your appointment in Rawalpindi.",
  primaryCta: "Book an Appointment",
  secondaryCta: "Contact Us on WhatsApp",
};
