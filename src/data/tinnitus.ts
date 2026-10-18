import {
  AudioWaveform,
  Brain,
  Ear,
  HeartPulse,
  MessagesSquare,
  Pill,
  RefreshCw,
  Stethoscope,
  Volume2,
} from "lucide-react";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type { StepItem } from "@/components/services/ProcessStepper";
import type { Feature } from "./home";

export const tinnitusHero = {
  title: "Tinnitus Management",
  description: "Expert care and personalized support for ringing, buzzing, and other sounds in the ears.",
};

export const tinnitusIntro = {
  eyebrow: "Specialist Care",
  title: "Understanding & Managing Tinnitus",
  paragraphs: [
    "Tinnitus is the perception of sound, such as ringing or buzzing, without an external source. Although it can be distressing, appropriate assessment and personalized management can help people cope with its effects.",
    "At HearWell, we help patients understand their symptoms and explore suitable management options based on their individual needs.",
  ],
  optionsLabel: "Our Management Options",
  options: [
    { title: "Tinnitus Retraining Therapy", icon: RefreshCw },
    { title: "Tinnitus Hearing Aids", icon: Ear },
    { title: "Sound Masking", icon: AudioWaveform },
    { title: "Stress Management", icon: HeartPulse },
    { title: "Cognitive Behavioural Therapy (CBT)", icon: Brain },
    { title: "Professional Counselling", icon: MessagesSquare },
  ],
  cta: "Book an Evaluation",
};

export const tinnitusCauses = {
  eyebrow: "Common Causes",
  title: "Understanding the Possible Causes of Tinnitus",
  description:
    "Tinnitus can have several possible causes. Identifying contributing factors can help guide appropriate assessment and management.",
  items: [
    {
      title: "Noise Exposure",
      description:
        "Prolonged exposure to loud music, machinery, or other loud environments can damage the inner ear and contribute to tinnitus.",
      icon: Volume2,
    },
    {
      title: "Medical Conditions",
      description:
        "Hearing loss, ear-related conditions, infections, and certain other medical conditions may be associated with tinnitus.",
      icon: Stethoscope,
    },
    {
      title: "Medication Side Effects",
      description:
        "Some medications can contribute to tinnitus. Consult a healthcare professional if symptoms begin or worsen after starting a medication; do not stop prescribed medication without medical advice.",
      icon: Pill,
    },
  ] satisfies Feature[],
};

export const tinnitusProcess = {
  eyebrow: "Our Process",
  title: "A Personalized Approach to Tinnitus Management",
  description:
    "We follow a patient-centered process to help individuals understand their symptoms and explore appropriate management strategies.",
  steps: [
    {
      title: "Comprehensive Assessment",
      description:
        "We discuss your symptoms, hearing concerns, and relevant history to understand your needs and determine appropriate assessments.",
      points: ["Hearing evaluation", "Tinnitus assessment", "Impact on daily life"],
    },
    {
      title: "Personalized Plan",
      description:
        "We develop a management approach based on your symptoms, preferences, and assessment findings.",
      points: ["Sound therapy options", "Counselling and education", "Stress management strategies"],
    },
    {
      title: "Suitable Treatment Options",
      description:
        "Depending on your needs, we discuss approaches that may help reduce tinnitus awareness and improve everyday comfort.",
      points: ["Tinnitus hearing aids, where suitable", "Sound generators", "Recommended mobile apps and sound tools"],
    },
    {
      title: "Ongoing Support",
      description:
        "We provide follow-up guidance to review progress and adjust management recommendations when appropriate.",
      points: ["Progress reviews", "Management plan adjustments", "Further referrals when needed"],
    },
  ] satisfies StepItem[],
};

export const tinnitusSolutions = {
  eyebrow: "Treatment Options",
  title: "Effective Tinnitus Management Solutions",
  description:
    "Tinnitus management varies from person to person. Depending on the assessment, different approaches may help reduce the impact of tinnitus and improve quality of life.",
  items: [
    {
      title: "Sound Therapy",
      description:
        "Sound therapy uses external sounds to make tinnitus less noticeable, particularly in quiet environments.",
      listLabel: "Options may include:",
      list: ["White noise and other background sounds", "Nature sounds", "Personalized sound programmes"],
    },
    {
      title: "Tinnitus Retraining Therapy (TRT)",
      description:
        "Tinnitus retraining therapy combines sound-based approaches with structured counselling to help people become less bothered by tinnitus over time.",
      listLabel: "May involve:",
      list: ["Sound therapy", "Habituation strategies", "Education and counselling"],
    },
    {
      title: "Tinnitus Hearing Aids",
      description:
        "For people with associated hearing loss, suitable hearing aids may improve access to environmental sounds and make tinnitus less noticeable for some individuals.",
      listLabel: "Potential benefits include:",
      list: [
        "Improved access to everyday sounds",
        "Sound support through compatible devices",
        "Hearing support alongside tinnitus management",
      ],
    },
  ],
};

export const tinnitusFaq = {
  eyebrow: "Tinnitus FAQs",
  title: "Common Questions About Tinnitus",
  items: [
    {
      question: "What does tinnitus sound like?",
      answer:
        "Tinnitus may sound like ringing, buzzing, humming, hissing, or whistling. It can affect one or both ears and may be constant or intermittent.",
    },
    {
      question: "Can tinnitus be cured?",
      answer:
        "There is no single treatment that eliminates all forms of tinnitus. However, identifying contributing factors and using suitable management strategies may help reduce its impact.",
    },
    {
      question: "Can hearing aids help with tinnitus?",
      answer:
        "Hearing aids may help people who have both tinnitus and hearing loss by improving access to external sounds. Suitability depends on individual assessment.",
    },
    {
      question: "Does stress make tinnitus worse?",
      answer:
        "Stress can make tinnitus more noticeable or difficult to manage for some people. Relaxation techniques, counselling, and appropriate support may help.",
    },
    {
      question: "When should I seek professional help for tinnitus?",
      answer:
        "Seek an assessment if tinnitus persists, affects sleep or concentration, or causes concern. Sudden hearing loss accompanied by tinnitus requires urgent medical assessment. Tinnitus that pulses with your heartbeat should also be medically evaluated.",
    },
  ] satisfies FaqItem[],
};

// CTA copy supplied by the clinic. TODO(owner): confirm the assessment/consultation is free.
export const tinnitusCta = {
  title: "Ready to Find Relief from Tinnitus?",
  description:
    "Take the first step towards peace and quiet with our expert tinnitus management program. Book your free consultation today.",
  highlight: { value: "Free Assessment", label: "No obligation" },
  primaryCta: "Book Free Consultation",
  secondaryCta: "Call Now",
};
