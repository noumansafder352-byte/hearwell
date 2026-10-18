import type { ImageKey } from "./images";

export interface ServiceLink {
  slug: string;
  label: string;
  href: string;
  /** One-line summary used in menus. */
  blurb: string;
  /** Home-page card copy (approved content). */
  summary: string;
  image: ImageKey;
  icon: "audio" | "hearingAid" | "tinnitus" | "ear";
}

export const services: ServiceLink[] = [
  {
    slug: "hearing-tests",
    label: "Hearing Tests",
    href: "/services/hearing-tests",
    blurb: "Diagnostic hearing assessments for all ages",
    summary:
      "Comprehensive hearing assessments to evaluate hearing ability, identify potential difficulties, and guide appropriate next steps.",
    image: "serviceHearingTest",
    icon: "audio",
  },
  {
    slug: "hearing-aids",
    label: "Hearing Aids",
    href: "/services/hearing-aids",
    blurb: "Personalized advice, styles and fitting support",
    summary:
      "Personalized advice on modern hearing aids, including suitable options, fitting support, and everyday listening solutions.",
    image: "serviceHearingAids",
    icon: "hearingAid",
  },
  {
    slug: "tinnitus-management",
    label: "Tinnitus Management",
    href: "/services/tinnitus-management",
    blurb: "Support for ringing, buzzing and other ear sounds",
    summary:
      "Assessment and guidance for people experiencing ringing, buzzing, or other sounds in their ears, with management options tailored to their needs.",
    image: "serviceTinnitus",
    icon: "tinnitus",
  },
  {
    slug: "ear-wax-removal",
    label: "Ear Wax Removal",
    href: "/services/ear-wax-removal",
    blurb: "Assessment and microsuction where appropriate",
    summary:
      "Appropriate assessment and ear wax removal to help address wax-related discomfort or hearing difficulties using suitable clinical methods.",
    image: "serviceEarWax",
    icon: "ear",
  },
];

export interface NavItem {
  label: string;
  href: string;
  children?: ServiceLink[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services/hearing-tests", children: services },
  { label: "Our Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer "Quick Links". "Book Appointment" is rendered as a WhatsApp link. */
export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/#services" },
  { label: "Book Appointment", href: "whatsapp:appointment" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Blog", href: "/blog" },
] as const;
