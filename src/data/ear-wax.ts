import {
  AudioWaveform,
  Ban,
  ClipboardCheck,
  Droplets,
  Ear,
  Eye,
  Leaf,
  RotateCw,
  Stethoscope,
  UserRoundCheck,
  VolumeX,
} from "lucide-react";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type { StepItem } from "@/components/services/ProcessStepper";
import type { Feature } from "./home";

export const earWaxHero = {
  title: "Ear Wax Removal",
  description:
    "Safe, professional ear wax removal using appropriate clinical techniques to help restore comfort and hearing clarity.",
  primaryCta: "Book a Consultation",
  secondaryCta: "Call Clinic",
};

export const microsuction = {
  eyebrow: "Expert Care",
  title: "Microsuction: Precise, Gentle Ear Wax Removal",
  paragraphs: [
    "At HearWell Audiology Clinic, we provide professional ear wax assessment and removal using microsuction where appropriate. This technique uses gentle suction under direct visual guidance to remove excess wax without the need for water irrigation.",
    "Our priority is your comfort and safety throughout the procedure.",
  ],
  points: [
    {
      title: "No Water Irrigation",
      description: "A dry method that avoids flushing water into the ear.",
      icon: Droplets,
    },
    {
      title: "Direct Visual Guidance",
      description: "Allows the clinician to observe the ear canal during the procedure.",
      icon: Eye,
    },
    {
      title: "Individual Assessment",
      description: "The removal method is selected according to your ear health and needs.",
      icon: UserRoundCheck,
    },
  ] satisfies Feature[],
};

export const earWaxSigns = {
  eyebrow: "Recognize the Signs",
  title: "When Should You Consider Ear Wax Removal?",
  description:
    "Excess ear wax can sometimes build up and cause discomfort or affect hearing. If you experience any of the following symptoms, consider seeking professional advice.",
  items: [
    {
      title: "Muffled Hearing",
      description: "Sounds may seem quieter or less clear when wax obstructs the ear canal.",
      icon: VolumeX,
    },
    {
      title: "Ear Fullness",
      description: "You may experience a blocked or plugged sensation in one or both ears.",
      icon: Ear,
    },
    {
      title: "Tinnitus",
      description: "Excess wax can sometimes contribute to ringing or buzzing sensations in the ears.",
      icon: AudioWaveform,
    },
    {
      title: "Dizziness or Discomfort",
      description:
        "Ear blockage may sometimes be associated with discomfort or dizziness. These symptoms can have other causes and may require medical assessment.",
      icon: RotateCw,
    },
  ] satisfies Feature[],
};

export const earWaxJourney = {
  eyebrow: "Our Process",
  title: "Your Ear Wax Removal Journey",
  description: "We aim to make your visit comfortable, clear, and straightforward.",
  steps: [
    {
      title: "Ear Assessment",
      description:
        "The clinician discusses your symptoms and examines your ears to assess wax buildup and identify any concerns.",
    },
    {
      title: "Suitable Removal Method",
      description: "If removal is appropriate, the clinician explains the recommended method and what to expect.",
    },
    {
      title: "Professional Removal",
      description: "Excess wax is removed using the selected technique, such as microsuction, where suitable.",
    },
    {
      title: "Guidance and Follow-Up",
      description:
        "You receive relevant aftercare advice and guidance on whether further assessment or follow-up is needed.",
    },
  ] satisfies StepItem[],
};

export const earWaxFaq = {
  eyebrow: "Ear Wax Removal FAQs",
  title: "Common Questions About Ear Wax Removal",
  items: [
    {
      question: "Does ear wax removal hurt?",
      answer:
        "Microsuction is generally well tolerated, although some people may experience temporary discomfort or sensitivity. Tell your clinician if you feel pain during the procedure.",
    },
    {
      question: "Is microsuction safe?",
      answer:
        "When performed by a suitably trained clinician following an appropriate assessment, microsuction is generally considered a safe method. Its suitability depends on your ear health and medical history.",
    },
    {
      question: "How long does ear wax removal take?",
      answer:
        "The appointment length depends on the amount and consistency of wax, the condition of your ears, and whether further assessment is needed.",
    },
    {
      question: "Can ear wax cause hearing loss?",
      answer:
        "A buildup of ear wax can cause temporary hearing difficulties by blocking the ear canal. However, hearing problems can have other causes, so an assessment may be needed.",
    },
    {
      question: "Can I remove ear wax at home?",
      answer:
        "Avoid inserting cotton buds, hairpins, or other objects into your ears, as these can push wax deeper or cause injury. Seek professional advice if you have a blockage or discomfort.",
    },
    {
      question: "Is microsuction suitable for everyone?",
      answer:
        "No. The clinician will assess your ears and medical history before deciding whether microsuction or another method is appropriate.",
    },
  ] satisfies FaqItem[],
};

export const aftercare = {
  eyebrow: "Caring for Your Ears",
  title: "Keep Your Ears Healthy",
  description:
    "After ear wax removal, simple precautions can help protect your ears and reduce the risk of irritation.",
  items: [
    {
      title: "Avoid Inserting Objects",
      description: "Do not use cotton buds or other objects inside the ear canal.",
      icon: Ban,
    },
    {
      title: "Follow Professional Advice",
      description: "Use ear drops only when recommended and appropriate for your ear health.",
      icon: ClipboardCheck,
    },
    {
      title: "Avoid Unnecessary Cleaning",
      description: "Ear wax naturally protects the ear canal, so routine removal is not always needed.",
      icon: Leaf,
    },
    {
      title: "Seek Help for Persistent Symptoms",
      description:
        "Contact a healthcare professional if blocked hearing, pain, discharge, or other symptoms continue.",
      icon: Stethoscope,
    },
  ] satisfies Feature[],
};

export const earWaxCta = {
  title: "Enjoy Clearer, More Comfortable Hearing",
  description:
    "Concerned about blocked ears or excess ear wax? Contact HearWell for professional guidance and an assessment to determine the right care for you.",
  primaryCta: "Book a Consultation",
  secondaryCta: "Call Clinic",
};
