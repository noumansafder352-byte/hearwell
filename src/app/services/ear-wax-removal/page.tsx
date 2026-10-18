import {
  CalendarCheck,
  HeartHandshake,
  ListChecks,
  Phone,
  ScanEye,
  Stethoscope,
} from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSpotlight } from "@/components/sections/FeatureSpotlight";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { ProcessStepper } from "@/components/services/ProcessStepper";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  aftercare,
  earWaxCta,
  earWaxFaq,
  earWaxHero,
  earWaxJourney,
  earWaxSigns,
  microsuction,
} from "@/data/ear-wax";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Ear Wax Removal",
  description:
    "Professional ear wax assessment and removal in Rawalpindi, using microsuction where appropriate, with aftercare guidance from HearWell Audiology Clinic.",
  path: "/services/ear-wax-removal",
});

const consultation = whatsappUrl(
  serviceMessage("Ear Wax Removal", "consultation"),
);

export default function EarWaxRemovalPage() {
  return (
    <>
      <PageHero
        title={earWaxHero.title}
        description={earWaxHero.description}
        crumbs={[
          { label: "Services", href: "/#services" },
          { label: "Ear Wax Removal" },
        ]}
        image={images.earExamination}
        imagePosition="45% center"
        variant="background"
        actions={
          <>
            <Button
              href={consultation}
              variant="light"
              size="lg"
              icon={
                <CalendarCheck className="size-5 text-clinic" aria-hidden />
              }
            >
              {earWaxHero.primaryCta}
            </Button>
            <Button
              href={siteConfig.contact.phoneHref}
              variant="outline-light"
              size="lg"
              icon={<Phone className="size-4" aria-hidden />}
            >
              {earWaxHero.secondaryCta}
            </Button>
          </>
        }
      />

      {/* Section 2 — Microsuction */}
      <Section>
        <SplitMedia
          image={images.consultationClinic}
          objectPosition="70% center"
          reverse
        >
          <p className="eyebrow">{microsuction.eyebrow}</p>
          <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
            {microsuction.title}
          </h2>
          <div className="mt-6 grid gap-4 text-base leading-relaxed text-navy/70">
            {microsuction.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-5">
            {microsuction.points.map(({ title, description, icon: Icon }) => (
              <li key={title} className="group flex gap-4">
                <IconBadge
                  tone="blue"
                  className="size-10 rounded-xl [&_svg]:size-5"
                >
                  <Icon />
                </IconBadge>
                <span>
                  <span className="block font-semibold text-navy">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-navy/70">
                    {description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </SplitMedia>
      </Section>

      {/* Section 3 — Signs */}
      <FeatureSpotlight
        eyebrow={earWaxSigns.eyebrow}
        title={earWaxSigns.title}
        description={earWaxSigns.description}
        items={earWaxSigns.items}
        image={images.adultCuppingEar}
        aspect="aspect-[3/2] lg:aspect-[4/3.7]"
        objectPosition="center 40%"
      />

      {/* Section 4 — What to Expect */}
      <ProcessStepper
        eyebrow={earWaxJourney.eyebrow}
        title={earWaxJourney.title}
        description={earWaxJourney.description}
        steps={earWaxJourney.steps}
        icons={[ScanEye, ListChecks, Stethoscope, HeartHandshake].map(
          (Icon, i) => (
            <Icon key={i} aria-hidden />
          ),
        )}
      />

      {/* Section 5 — Aftercare and Prevention: compact row, dividers instead of cards */}
      <section className="relative overflow-hidden bg-navy-gradient py-16 text-white sm:py-20">
        <div className="container-site relative">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow eyebrow-light">{aftercare.eyebrow}</p>
              <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-white sm:text-4xl lg:text-[2.6rem]">
                {aftercare.title}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/70 lg:justify-self-end">
              {aftercare.description}
            </p>
          </div>

          <Stagger
            as="ul"
            className="mt-10 grid border-t border-white/10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
          >
            {aftercare.items.map(({ title, description, icon: Icon }, i) => (
              <StaggerItem
                as="li"
                key={title}
                className={cn(
                  "group flex gap-4 border-white/10 py-6 lg:block lg:px-6 lg:py-8",
                  i > 0 && "border-t sm:border-t-0",
                  i > 1 && "sm:border-t lg:border-t-0",
                  i % 2 === 1 && "sm:border-l sm:pl-6",
                  i > 0 && "lg:border-l",
                  i === 0 && "lg:pl-0",
                  i === 2 && "sm:pl-0 lg:pl-6",
                  i === 3 && "lg:pr-0",
                )}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full text-sky ring-1 ring-sky/40 transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent group-hover:shadow-[0_0_30px_rgb(43_143_216/0.55)]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="block">
                  <span className="block font-bold text-white lg:mt-5">
                    {title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-white/65">
                    {description}
                  </span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section 6 — FAQs */}
      <FaqSection
        tone="mist"
        eyebrow={earWaxFaq.eyebrow}
        title={earWaxFaq.title}
        items={earWaxFaq.items}
      />

      {/* Section 7 — Final CTA */}
      <FinalCta
        eyebrow=""
        title={earWaxCta.title}
        description={earWaxCta.description}
        visual="ear-wax"
        primary={{ label: earWaxCta.primaryCta, href: consultation }}
        secondary={{ label: earWaxCta.secondaryCta, href: siteConfig.contact.phoneHref, icon: "phone" }}
      />
    </>
  );
}
