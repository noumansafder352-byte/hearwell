import { siteConfig } from "./site-config";

/** Builds a wa.me click-to-chat URL with an optional pre-filled, URL-encoded message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

const greeting = "Hello HearWell Audiology Clinic,";

/**
 * Pre-filled WhatsApp messages. Edit the wording here; every button that uses
 * a key picks up the change automatically.
 */
export const whatsappMessages = {
  appointment: `${greeting} I would like to book an appointment. Please let me know the available times.`,
  hearingTest: `${greeting} I would like to book a hearing test. Please share the available appointment times.`,
  consultation: `${greeting} I would like to book a consultation. Please let me know the available times.`,
  general: `${greeting} I have a question about your services.`,
  specialist: `${greeting} I would like to book a consultation with Dr. Suleman Bukhari. Please share the available times.`,
  directions: `${greeting} could you please share directions to the clinic at Nelson Medical Complex, Saddar?`,
} as const;

export type WhatsappMessageKey = keyof typeof whatsappMessages;

/** Message for a service-specific CTA, e.g. "Hearing Aids". */
export function serviceMessage(service: string, intent: "appointment" | "consultation" | "evaluation" = "appointment") {
  const ask =
    intent === "consultation"
      ? `book a consultation for ${service}`
      : intent === "evaluation"
        ? `book a ${service} evaluation`
        : `book an appointment for ${service}`;
  return `${greeting} I would like to ${ask}. Please let me know the available times.`;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Formats contact-form fields into a readable WhatsApp message. */
export function contactFormMessage({ name, email, subject, message }: ContactFormValues): string {
  const lines = [
    greeting,
    "",
    `Name: ${name.trim()}`,
    email.trim() ? `Email: ${email.trim()}` : null,
    subject.trim() ? `Subject: ${subject.trim()}` : null,
    "",
    message.trim(),
  ];
  return lines.filter((line) => line !== null).join("\n");
}
