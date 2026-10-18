import { HomeHero } from "@/components/home/HomeHero";
import { CommitmentPanel } from "@/components/home/CommitmentPanel";
import { FinalCta } from "@/components/home/FinalCta";
import { AboutPreview, Journey } from "@/components/home/HomeSections";
import { WhoWeHelp } from "@/components/home/WhoWeHelp";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { SpecialistSection } from "@/components/sections/SpecialistSection";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaq, servicesIntro } from "@/data/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Hearing Care in Rawalpindi",
    description:
      "HearWell Audiology Clinic provides professional hearing care for people of all ages in Rawalpindi — hearing tests, hearing aids, tinnitus management and ear wax removal.",
    path: "/",
  }),
  title: { absolute: "HearWell Audiology Clinic | Hearing Care in Rawalpindi" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CommitmentPanel />
      <AboutPreview />

      <Section tone="mist" id="services">
        <SectionHeading
          align="center"
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          description={servicesIntro.description}
        />
        <div className="mt-16">
          <ServicesGrid />
        </div>
      </Section>

      <WhyChoose />
      <SpecialistSection variant="home" />
      <Journey />
      <WhoWeHelp />
      <FaqSection eyebrow={homeFaq.eyebrow} title={homeFaq.title} items={homeFaq.items} />

      <FinalCta />
    </>
  );
}
