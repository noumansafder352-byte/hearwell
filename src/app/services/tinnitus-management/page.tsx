import { CalendarCheck, Check } from "lucide-react";
import { FaqSection } from "@/components/sections/FaqSection";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { ProcessStepper } from "@/components/services/ProcessStepper";
import { FeatureSpotlight } from "@/components/sections/FeatureSpotlight";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Equalizer, WaveLines } from "@/components/ui/SoundWave";
import { images } from "@/data/images";
import {
  tinnitusCauses,
  tinnitusCta,
  tinnitusFaq,
  tinnitusHero,
  tinnitusIntro,
  tinnitusProcess,
  tinnitusSolutions,
} from "@/data/tinnitus";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Tinnitus Management",
  description:
    "Assessment and personalized support for ringing, buzzing and other sounds in the ears — sound therapy, tinnitus retraining therapy and tinnitus hearing aids in Rawalpindi.",
  path: "/services/tinnitus-management",
});

/** Sounds people commonly describe (from the approved FAQ copy). */
const SOUNDS = ["Ringing", "Buzzing", "Humming", "Hissing", "Whistling"];

export default function TinnitusPage() {
  return (
    <>
      <PageHero
        title={tinnitusHero.title}
        description={tinnitusHero.description}
        crumbs={[{ label: "Services", href: "/#services" }, { label: "Tinnitus Management" }]}
        image={images.consultationSpecialist}
        imagePosition="65% center"
        variant="background"
      />

      {/* Section 2 — Understanding & Managing Tinnitus */}
      <Section>
        <SplitMedia
          image={images.tinnitusFingersInEars}
          objectPosition="62% center"
          badge={
            // Hidden on phones, where the photo is too short and the card would cover the face.
            <div className="glass-strong hidden w-72 rounded-2xl p-4 sm:block">
              <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.14em] text-clinic uppercase">
                <Equalizer className="h-3.5 text-clinic" bars={5} />
                How tinnitus may sound
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {SOUNDS.map((s) => (
                  <li key={s} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy ring-1 ring-line">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <div>
            <p className="eyebrow">{tinnitusIntro.eyebrow}</p>
            <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
              {tinnitusIntro.title}
            </h2>
            <div className="mt-6 grid gap-4 text-base leading-relaxed text-navy/70">
              {tinnitusIntro.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-bold tracking-[0.14em] text-navy uppercase">{tinnitusIntro.optionsLabel}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tinnitusIntro.options.map(({ title, icon: Icon }) => (
                <li
                  key={title}
                  className="group flex items-center gap-3.5 rounded-2xl bg-mist p-3.5 ring-1 ring-line transition-all duration-300 hover:bg-white hover:shadow-soft hover:ring-clinic/30"
                >
                  <IconBadge tone="blue" className="size-10 shrink-0 rounded-xl [&_svg]:size-5">
                    <Icon />
                  </IconBadge>
                  <span className="text-sm leading-snug font-semibold text-navy">{title}</span>
                </li>
              ))}
            </ul>
            <Button
              href={whatsappUrl(serviceMessage("Tinnitus", "evaluation"))}
              size="lg"
              className="mt-9"
              icon={<CalendarCheck className="size-5" aria-hidden />}
            >
              {tinnitusIntro.cta}
            </Button>
          </div>
        </SplitMedia>
      </Section>

      {/* Section 3 — What Causes Tinnitus? */}
      <FeatureSpotlight
        eyebrow={tinnitusCauses.eyebrow}
        title={tinnitusCauses.title}
        description={tinnitusCauses.description}
        items={tinnitusCauses.items}
        image={images.earPainMan}
      />

      {/* Section 4 — 4-Step Tinnitus Management Process */}
      <ProcessStepper
        eyebrow={tinnitusProcess.eyebrow}
        title={tinnitusProcess.title}
        description={tinnitusProcess.description}
        steps={tinnitusProcess.steps}
      />

      {/* Section 5 — Effective Tinnitus Management Solutions */}
      <Section tone="navy" className="overflow-hidden">
        <WaveLines className="inset-x-0 top-0 h-36 w-full text-sky/20" />
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={tinnitusSolutions.eyebrow}
          title={tinnitusSolutions.title}
          description={tinnitusSolutions.description}
        />
        <Stagger as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
          {tinnitusSolutions.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="flex flex-col rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.1] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-bold text-sky/80 tabular-nums">0{i + 1}</span>
                <Equalizer className="h-8 text-white/30" bars={9} animated={false} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{item.description}</p>
              <p className="mt-6 text-sm font-semibold text-white">{item.listLabel}</p>
              <ul className="mt-3 grid gap-2 text-sm text-white/75">
                {item.list.map((entry) => (
                  <li key={entry} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
                    {entry}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Section 6 — FAQs */}
      <FaqSection eyebrow={tinnitusFaq.eyebrow} title={tinnitusFaq.title} items={tinnitusFaq.items} />

      {/* Section 7 — Final CTA */}
      <FinalCta
        eyebrow=""
        title={tinnitusCta.title}
        description={tinnitusCta.description}
        highlight={tinnitusCta.highlight}
        visual="tinnitus"
        primary={{
          label: tinnitusCta.primaryCta,
          href: whatsappUrl(serviceMessage("Tinnitus Management", "consultation")),
        }}
        secondary={{ label: tinnitusCta.secondaryCta, href: siteConfig.contact.phoneHref, icon: "phone" }}
      />
    </>
  );
}
