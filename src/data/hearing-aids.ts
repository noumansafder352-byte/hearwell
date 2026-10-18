import { BatteryCharging, Bluetooth, EyeOff, Sparkles } from "lucide-react";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type { Feature } from "./home";

export const hearingAidsHero = {
  title: "Hearing Aids",
  description:
    "Experience clearer, more comfortable hearing with personalized hearing aid solutions designed around your lifestyle and hearing needs.",
  // TODO(owner): confirm consultations are free before publishing this label.
  cta: "Book a Free Consultation",
};

export const digitalSolutions = {
  eyebrow: "Advanced Hearing Care",
  title: "Personalized Digital Hearing Solutions",
  text: "We offer professional guidance on modern digital hearing aids, helping you explore suitable options based on your hearing needs, lifestyle, and preferences. From discreet designs to advanced sound processing, our goal is to help you communicate more comfortably and confidently.",
  featuresLabel: "Key Features",
  features: [
    {
      title: "Invisible Designs",
      description: "Discreet options designed to fit comfortably in or near the ear.",
      icon: EyeOff,
    },
    {
      title: "Bluetooth Streaming",
      description: "Connect compatible hearing aids to supported phones and devices.",
      icon: Bluetooth,
    },
    {
      title: "Rechargeable Options",
      description: "Convenient charging solutions for everyday use.",
      icon: BatteryCharging,
    },
    {
      title: "AI Noise Reduction",
      description: "Available in selected models to help manage background noise.",
      icon: Sparkles,
    },
  ] satisfies Feature[],
  primaryCta: "Book Consultation",
  secondaryCta: "View All Styles",
};

export interface HearingAidStyle {
  id: string;
  name: string;
  /** Short name used in WhatsApp messages and CTAs. */
  shortName: string;
  subtitle?: string;
  description: string;
  benefits: string[];
}

export const styles = {
  eyebrow: "Explore Hearing Aid Styles",
  title: "Find Your Perfect Hearing Solution",
  description:
    "Discover hearing aid styles designed to suit different hearing needs, comfort preferences, and lifestyles. Our team can help you understand the available options and choose a suitable solution following a hearing assessment.",
  // Card copy supplied by the clinic (replaces the earlier draft wording).
  items: [
    {
      id: "cic-iic",
      name: "CIC / IIC",
      shortName: "CIC / IIC",
      description: "Completely-in-the-Canal. Virtually invisible and custom-made for your ear canal.",
      benefits: ["Virtually invisible", "Mild to moderate loss", "Natural sound directionality"],
    },
    {
      id: "ric",
      name: "Receiver-In-Canal",
      shortName: "RIC",
      description: "Discreet and comfortable. Features the receiver wire for natural sound clarity.",
      benefits: ["Natural sound quality", "Bluetooth compatible", "Easy to maintain"],
    },
    {
      id: "bte",
      name: "Behind-The-Ear",
      shortName: "BTE",
      description: "Powerful and versatile. Suitable for all types of hearing loss, including severe.",
      benefits: ["All hearing levels", "Durable design", "Full feature set"],
    },
    {
      id: "ite",
      name: "In-The-Ear",
      shortName: "ITE",
      description: "Custom-fit to the outer portion of the ear. Easy to handle with manual controls.",
      benefits: ["Easy to handle", "Volume controls", "Long battery life"],
    },
  ] satisfies HearingAidStyle[],
  cta: "View Guide",
};

export interface HearingAidGuide {
  id: string;
  title: string;
  label: string;
  description: string;
  specs: { label: string; value: string }[];
  cta: string;
}

export const guides = {
  eyebrow: "Explore Your Options",
  title: "Detailed Hearing Aid Guides",
  description:
    "Learn more about each hearing aid style, its benefits, and the factors to consider when choosing a device.",
  items: [
    {
      id: "cic-iic",
      title: "CIC / IIC Hearing Aids",
      label: "Discreet Design",
      description:
        "CIC and IIC hearing aids fit inside the ear canal and are designed for people who prefer a less visible hearing solution. Suitability depends on hearing requirements, ear anatomy, and the device's capabilities.",
      specs: [
        { label: "Best For", value: "People prioritizing discreet appearance, when clinically suitable." },
        { label: "Sound Quality", value: "Depends on the selected model and individual hearing needs." },
        { label: "Visibility", value: "Small, low-profile design." },
        { label: "Battery Life", value: "Varies by model and battery type." },
      ],
      cta: "Explore CIC / IIC Hearing Aids",
    },
    {
      id: "ric",
      title: "Receiver-in-Canal (RIC) Hearing Aids",
      label: "Versatile Performance",
      description:
        "RIC hearing aids combine a compact behind-the-ear component with a receiver inside the ear canal. They are available with different sound-processing, connectivity, and power options.",
      specs: [
        { label: "Best For", value: "People seeking a versatile, lightweight hearing aid." },
        { label: "Connectivity", value: "Bluetooth is available in compatible models." },
        { label: "Sound Quality", value: "Advanced processing options vary by device." },
        { label: "Ventilation", value: "Open-fit options may be available where appropriate." },
      ],
      cta: "Explore RIC Hearing Aids",
    },
    {
      id: "bte",
      title: "Behind-the-Ear (BTE) Hearing Aids",
      label: "Powerful Support",
      description:
        "BTE hearing aids sit behind the ear and deliver sound through tubing or an earmould. They are available in a range of configurations, including options designed for greater amplification needs.",
      specs: [
        { label: "Best For", value: "People who need a robust device with suitable amplification." },
        { label: "Features", value: "Options vary by model." },
        {
          label: "Durability",
          value: "Designed for regular everyday use, with care requirements depending on the device.",
        },
        { label: "Power", value: "Available in different power levels." },
      ],
      cta: "Explore BTE Hearing Aids",
    },
    {
      id: "ite",
      title: "In-the-Ear (ITE) Hearing Aids",
      label: "Custom Fit",
      description:
        "ITE hearing aids are made to fit within the outer ear. Their shape, size, controls, and features depend on the selected model and the individual's hearing requirements.",
      specs: [
        {
          label: "Best For",
          value: "People who prefer a custom-fit device without a separate behind-the-ear component.",
        },
        { label: "Controls", value: "Handling and control options vary by model." },
        { label: "Battery Life", value: "Depends on the selected device." },
        { label: "Connectivity", value: "Available in selected models." },
      ],
      cta: "Explore ITE Hearing Aids",
    },
  ] satisfies HearingAidGuide[],
};

// CTA copy supplied by the clinic. TODO(owner): confirm the 60-day trial and lifetime support terms.
export const hearingAidsMidCta = {
  title: "Ready to Hear Better?",
  description:
    "Take the first step towards better hearing with our 60-day risk-free trial and lifetime support guarantee.",
  highlight: { value: "60-Day", label: "Free Trial Period" },
  primaryCta: "Start Free Trial",
  secondaryCta: "Call Now",
};

export const brands = {
  eyebrow: "Our Technology Partners",
  title: "Trusted Hearing Aid Technology",
  description:
    "We help patients explore hearing aid options from established manufacturers, with available models and features depending on individual needs and product availability.",
  /**
   * Logos supplied by the clinic, processed with scripts/process-logos.mjs into
   * /public/images/brands (<slug>.webp colour + <slug>-mono.webp navy).
   * `height` balances visual weight across very different logo shapes.
   * `dark` = the colour logo needs a dark tile behind it (e.g. yellow wordmarks).
   */
  items: [
    { name: "ReSound", slug: "resound", width: 506, height: 120, display: "h-6 sm:h-9" },
    { name: "Rexton", slug: "rexton", width: 154, height: 27, display: "h-4 sm:h-6", dark: true },
    { name: "Signia", slug: "signia", width: 166, height: 79, display: "h-10 sm:h-14" },
    { name: "Starkey", slug: "starkey", width: 192, height: 120, display: "h-11 sm:h-16" },
    { name: "Oticon", slug: "oticon", width: 350, height: 92, display: "h-6 sm:h-9" },
  ] as { name: string; slug: string; width: number; height: number; display: string; dark?: boolean }[],
};

export const hearingAidsFaq = {
  eyebrow: "Hearing Aid FAQs",
  title: "Common Questions About Hearing Aids",
  items: [
    {
      question: "How do I know if I need hearing aids?",
      answer:
        "A hearing assessment can help determine whether hearing aids may be beneficial. Your audiologist can explain your results and discuss suitable options.",
    },
    {
      question: "Which hearing aid style is best for me?",
      answer:
        "The right style depends on your hearing loss, ear anatomy, lifestyle, comfort, and preferred features. A professional assessment can help identify suitable options.",
    },
    {
      question: "Are hearing aids visible?",
      answer:
        "Visibility varies by style. CIC and IIC devices are designed to be discreet, while RIC and BTE devices sit partly or fully behind the ear.",
    },
    {
      question: "Do hearing aids connect to mobile phones?",
      answer:
        "Many modern hearing aids offer Bluetooth connectivity, but compatibility and available functions vary by model and phone.",
    },
    {
      question: "Are rechargeable hearing aids available?",
      answer:
        "Yes. Rechargeable options are available in selected styles and models. Your audiologist can explain the available choices and charging requirements.",
    },
    {
      question: "How long do hearing aids last?",
      answer:
        "Lifespan depends on the device, maintenance, usage, and care. Regular cleaning and professional servicing can help maintain performance.",
    },
  ] satisfies FaqItem[],
};
