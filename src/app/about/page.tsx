import { ApproachSection } from "@/components/about/ApproachSection";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyHearWell } from "@/components/about/WhyHearWell";
import { FinalCta } from "@/components/home/FinalCta";
import { SpecialistSection } from "@/components/sections/SpecialistSection";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { aboutHero, ourClinic } from "@/data/about";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about HearWell Audiology Clinic at Nelson Medical Complex, Rawalpindi — our clinic, specialist, mission, vision and patient-centered approach to hearing care.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={aboutHero.title}
        description={aboutHero.description}
        crumbs={[{ label: "About Us" }]}
        variant="compact"
      />

      {/* Section 2 — Our Clinic */}
      <Section>
        <SplitMedia image={images.homeAboutConsultation} objectPosition="center 45%">
          <p className="eyebrow">{ourClinic.eyebrow}</p>
          <h2 className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.6rem]">
            {ourClinic.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/75">{ourClinic.paragraphs[0]}</p>
          <p className="mt-4 text-base leading-relaxed text-navy/75">{ourClinic.paragraphs[1]}</p>

          <h3 className="mt-10 text-sm font-bold tracking-[0.14em] text-navy uppercase">{ourClinic.valuesLabel}</h3>
          <ul className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {ourClinic.values.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                className="group flex items-center gap-4"
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_18px_-10px_rgb(10_99_168/0.9)] transition-transform duration-300 group-hover:-rotate-6"
                >
                  <Icon className="size-5" />
                </span>
                <span>
                  <span aria-hidden className="block font-display text-xs font-bold text-clinic tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block font-semibold text-navy">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </SplitMedia>
      </Section>

      {/* Section 3 — Meet Our Specialist */}
      <SpecialistSection variant="about" tone="white" />

      {/* Section 4 — Our Mission & Vision */}
      <MissionVision />

      {/* Section 5 — Our Approach to Hearing Care */}
      <ApproachSection />

      {/* Section 6 — Our Commitment to Patients */}
      <WhyHearWell />

      {/* Closing call to action (same as Home) */}
      <FinalCta />
    </>
  );
}
