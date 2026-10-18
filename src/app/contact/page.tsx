import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactForm, contactHero, findClinic, getInTouch } from "@/data/contact";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact HearWell Audiology Clinic at Nelson Medical Complex, Saddar, Rawalpindi. Call or WhatsApp 0345 0992968, Monday–Saturday 10:00 AM–8:00 PM.",
  path: "/contact",
});

interface InfoCard {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ReactNode;
}

export default function ContactPage() {
  const { address, contact, hours, map } = siteConfig;
  const cards: InfoCard[] = [
    { label: "Our Location", value: address.contactPage, href: map.directionsUrl, external: true, icon: <MapPin /> },
    { label: "Phone & WhatsApp", value: contact.phoneDisplay, href: contact.phoneHref, icon: <Phone /> },
    { label: "Email Address", value: contact.email, href: `mailto:${contact.email}`, icon: <Mail /> },
    { label: "Clinic Hours", value: hours.long, icon: <Clock /> },
  ];

  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        description={contactHero.description}
        crumbs={[{ label: "Contact" }]}
        variant="compact"
      />

      {/* Sections 2 & 3 — Get in touch + Contact form */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading title={getInTouch.title} description={getInTouch.description} />
            <Stagger as="ul" className="mt-10 grid gap-3">
              {cards.map((card) => {
                const body = (
                  <>
                    <IconBadge tone="blue">{card.icon}</IconBadge>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold tracking-[0.14em] text-clinic uppercase">{card.label}</span>
                      <span className="mt-1 block font-semibold break-words text-navy">{card.value}</span>
                    </span>
                  </>
                );
                const cls =
                  "group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line transition-all duration-500 ease-[var(--ease-out-soft)]";
                return (
                  <StaggerItem as="li" key={card.label}>
                    {card.href ? (
                      <a
                        href={card.href}
                        className={`${cls} hover:-translate-y-0.5 hover:shadow-lift`}
                        {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="rounded-[2rem] bg-mist p-6 ring-1 ring-line sm:p-10">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">{contactForm.title}</h2>
            <p className="mt-3 mb-8 leading-relaxed text-navy/70">{contactForm.description}</p>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Section 4 — Find Our Clinic */}
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading title={findClinic.title} description={findClinic.description} />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <Button
                href={map.directionsUrl}
                size="lg"
                icon={<Navigation className="size-4" aria-hidden />}
              >
                {findClinic.cta}
              </Button>
              <Button href={contact.phoneHref} size="lg" variant="secondary" icon={<Phone className="size-4" aria-hidden />}>
                {contact.phoneDisplay}
              </Button>
            </Reveal>
            <p className="mt-6 text-sm leading-relaxed text-navy/70">{address.full}</p>
          </div>
          <Reveal delay={0.05}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line sm:aspect-[16/10]">
              <iframe
                src={map.embedUrl}
                title="Map showing HearWell Audiology Clinic at Nelson Medical Complex, Saddar, Rawalpindi"
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
