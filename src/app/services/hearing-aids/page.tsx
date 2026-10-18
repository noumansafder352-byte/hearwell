import { ArrowDown, CalendarCheck } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { BrandPartners } from "@/components/services/BrandPartners";
import { HearingAidStyles } from "@/components/services/HearingAidStyles";
import { FaqSection } from "@/components/sections/FaqSection";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import {
  digitalSolutions,
  hearingAidsFaq,
  hearingAidsHero,
  hearingAidsMidCta,
} from "@/data/hearing-aids";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Hearing Aids",
  description:
    "Personalized hearing aid guidance in Rawalpindi — CIC/IIC, RIC, BTE and ITE styles, fitting support and everyday listening solutions at HearWell Audiology Clinic.",
  path: "/services/hearing-aids",
});

const consultation = whatsappUrl(serviceMessage("Hearing Aids", "consultation"));
const freeTrial = whatsappUrl(
  "Hello HearWell Audiology Clinic, I would like to start the 60-day hearing aid trial. Please let me know the next steps.",
);

export default function HearingAidsPage() {
  return (
    <>
      <PageHero
        title={hearingAidsHero.title}
        description={hearingAidsHero.description}
        crumbs={[{ label: "Services", href: "/#services" }, { label: "Hearing Aids" }]}
        image={images.hearingAidInEar}
        imagePosition="35% center"
        variant="background"
        actions={
          <Button href={consultation} variant="light" size="lg" icon={<CalendarCheck className="size-5 text-clinic" aria-hidden />}>
            {hearingAidsHero.cta}
          </Button>
        }
      />

      {/* Section 2 — Personalized Digital Hearing Solutions */}
      <Section>
        <SplitMedia image={images.hearingAidWearer} objectPosition="35% center" reverse>
          <p className="eyebrow">{digitalSolutions.eyebrow}</p>
          <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
            {digitalSolutions.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/70">{digitalSolutions.text}</p>
          <h3 className="mt-8 text-sm font-bold tracking-[0.14em] text-navy uppercase">
            {digitalSolutions.featuresLabel}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {digitalSolutions.features.map(({ title, description, icon: Icon }) => (
              <li key={title} className="group flex gap-3.5 rounded-2xl bg-mist p-4 ring-1 ring-line">
                <IconBadge tone="blue" className="size-10 rounded-xl [&_svg]:size-5">
                  <Icon />
                </IconBadge>
                <span>
                  <span className="block font-semibold text-navy">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-navy/70">{description}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={consultation} size="lg" icon={<CalendarCheck className="size-5" aria-hidden />}>
              {digitalSolutions.primaryCta}
            </Button>
            <Button href="#styles" size="lg" variant="secondary" trailingIcon={<ArrowDown className="size-4" aria-hidden />}>
              {digitalSolutions.secondaryCta}
            </Button>
          </div>
        </SplitMedia>
      </Section>

      {/* Section 3 — Find Your Perfect Hearing Solution */}
      <HearingAidStyles />

      {/* Section 4 — Hearing aid brands */}
      <BrandPartners />

      {/* Section 5 — FAQs */}
      <FaqSection eyebrow={hearingAidsFaq.eyebrow} title={hearingAidsFaq.title} items={hearingAidsFaq.items} />

      {/* Section 6 — Ready to Hear Better? (closing CTA above the footer) */}
      <FinalCta
        eyebrow=""
        title={hearingAidsMidCta.title}
        description={hearingAidsMidCta.description}
        highlight={hearingAidsMidCta.highlight}
        visual="hearing-aids"
        primary={{ label: hearingAidsMidCta.primaryCta, href: freeTrial }}
        secondary={{ label: hearingAidsMidCta.secondaryCta, href: siteConfig.contact.phoneHref, icon: "phone" }}
      />
    </>
  );
}
