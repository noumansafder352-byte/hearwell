import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { JourneyTimeline } from "./JourneyTimeline";
import { aboutPreview, journey } from "@/data/home";
import { images } from "@/data/images";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Section 3 — About HearWell preview. */
export function AboutPreview() {
  return (
    <Section>
      <SplitMedia
        image={images.homeAboutConsultation}
        objectPosition="center 45%"
        badge={
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-lift ring-1 ring-line">
            <IconBadge tone="blue" className="size-10 rounded-xl [&_svg]:size-5">
              <MapPin />
            </IconBadge>
            <span className="text-sm leading-tight font-semibold text-navy">
              Nelson Medical Complex
              <span className="block text-xs font-medium text-silver">Saddar, Rawalpindi</span>
            </span>
          </div>
        }
      >
        <p className="eyebrow">{aboutPreview.eyebrow}</p>
        <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
          {aboutPreview.title}
        </h2>
        <div className="mt-6 grid gap-4 text-base leading-relaxed text-navy/70">
          {aboutPreview.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <p className="mt-8 text-sm font-bold tracking-[0.14em] text-navy uppercase">{aboutPreview.valuesLabel}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {aboutPreview.values.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="group flex items-center gap-3.5 font-semibold text-navy"
            >
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_18px_-10px_rgb(10_99_168/0.9)] transition-transform duration-300 group-hover:-rotate-6"
              >
                <Icon className="size-5" />
              </span>
              {label}
            </li>
          ))}
        </ul>
        <Button href="/about" className="mt-10" trailingIcon={<ArrowRight className="size-4" aria-hidden />}>
          {aboutPreview.cta}
        </Button>
      </SplitMedia>
    </Section>
  );
}

/** Section 7 — Your Hearing Care Journey. */
export function Journey() {
  return (
    <Section>
      <SectionHeading align="center" eyebrow={journey.eyebrow} title={journey.title} description={journey.description} />
      <div className="mt-16">
        <JourneyTimeline />
      </div>
      <Reveal className="mt-14 flex justify-center">
        <Button
          href={whatsappUrl(whatsappMessages.appointment)}
          size="lg"
          icon={<CalendarCheck className="size-5" aria-hidden />}
        >
          {journey.cta}
        </Button>
      </Reveal>
    </Section>
  );
}
