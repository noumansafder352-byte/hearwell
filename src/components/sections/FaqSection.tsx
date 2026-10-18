import { MessageCircle } from "lucide-react";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

interface FaqSectionProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  tone?: "white" | "mist";
}

/** Heading + help card on the left, accordion on the right. */
export function FaqSection({ eyebrow, title, items, tone = "white" }: FaqSectionProps) {
  return (
    <Section tone={tone} id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Reveal delay={0.1} className="mt-10 rounded-3xl bg-navy-gradient p-7 text-white">
            <p className="text-lg font-bold">Still have a question?</p>
            <p className="mt-2 leading-relaxed text-white/70">
              Message our team on WhatsApp or call {siteConfig.contact.phoneDisplay}.
            </p>
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fx btn-sheen btn-sheen-blue mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]"
            >
              <MessageCircle className="size-4 text-clinic" aria-hidden />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
