import { CalendarCheck, Phone } from "lucide-react";
import { HearingTestsWhy } from "@/components/services/HearingTestsWhy";
import { TestTypesGallery } from "@/components/services/TestTypesGallery";
import { FaqSection } from "@/components/sections/FaqSection";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import {
  hearingTestsCta,
  hearingTestsFaq,
  hearingTestsHero,
  hearingTestsIntro,
} from "@/data/hearing-tests";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Hearing Tests",
  description:
    "Comprehensive diagnostic hearing assessments for all ages in Rawalpindi — pure-tone and speech audiometry, ABR, ASSR, tympanometry, tinnitus matching and real-ear measurement.",
  path: "/services/hearing-tests",
});

export default function HearingTestsPage() {
  return (
    <>
      <PageHero
        title={hearingTestsHero.title}
        description={hearingTestsHero.description}
        crumbs={[{ label: "Services", href: "/#services" }, { label: "Hearing Tests" }]}
        image={images.hearingTest}
        imagePosition="70% 40%"
        variant="background"
      />

      {/* Section 2 — Introduction */}
      <Section>
        <SplitMedia image={images.earExamination} objectPosition="45% center">
          <p className="eyebrow">{hearingTestsIntro.eyebrow}</p>
          <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
            {hearingTestsIntro.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/70">{hearingTestsIntro.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              href={whatsappUrl(whatsappMessages.hearingTest)}
              size="lg"
              icon={<CalendarCheck className="size-5" aria-hidden />}
            >
              {hearingTestsIntro.primaryCta}
            </Button>
            <Button
              href={siteConfig.contact.phoneHref}
              size="lg"
              variant="secondary"
              icon={<Phone className="size-4" aria-hidden />}
            >
              {hearingTestsIntro.secondaryCta}
            </Button>
          </div>
        </SplitMedia>
      </Section>

      {/* Section 3 — Types of Hearing Tests */}
      <TestTypesGallery />

      {/* Section 4 — Why Choose Our Hearing Tests? */}
      <HearingTestsWhy />

      {/* Section 5 — FAQs */}
      <FaqSection
        tone="mist"
        eyebrow={hearingTestsFaq.eyebrow}
        title={hearingTestsFaq.title}
        items={hearingTestsFaq.items}
      />

      {/* Section 6 — Appointment CTA */}
      <FinalCta
        eyebrow=""
        title={hearingTestsCta.title}
        description={hearingTestsCta.description}
        primary={{ label: hearingTestsCta.primaryCta, href: whatsappUrl(whatsappMessages.hearingTest) }}
        secondary={{ label: hearingTestsCta.secondaryCta, href: "/contact", icon: "none" }}
      />
    </>
  );
}
