import Image from "next/image";
import { CalendarCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Equalizer, SoundRings } from "@/components/ui/SoundWave";
import { specialist } from "@/data/specialist";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/**
 * Specialist profile. Uses a monogram panel unless a real, consented photo is
 * added in data/specialist.ts — stock photos must never stand in for staff.
 */
export function SpecialistSection({
  variant,
  tone = "mist",
}: {
  variant: "home" | "about";
  /** Section background; "white" removes the mist band. */
  tone?: "mist" | "white";
}) {
  const copy = specialist[variant];
  const intro = specialist.verified ? copy.intro.verified : copy.intro.pending;

  return (
    // On white it follows another white section, so drop the top padding to avoid a double gap.
    <Section tone={tone} className={tone === "white" ? "pt-0!" : undefined}>
      <Reveal>
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative isolate flex min-h-[20rem] flex-col items-center justify-center overflow-hidden bg-navy-gradient p-10 text-center text-white">
            <SoundRings animated className="top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 text-sky/40" />
            {specialist.photo ? (
              <div className="relative size-48 overflow-hidden rounded-full ring-8 ring-white/10">
                <Image src={specialist.photo.src} alt={specialist.photo.alt} fill sizes="192px" className="object-cover" />
              </div>
            ) : (
              <span
                aria-hidden
                className="relative grid size-40 place-items-center rounded-full bg-brand-gradient font-display text-5xl font-bold tracking-tight ring-8 ring-white/10"
              >
                {specialist.initials}
              </span>
            )}
            <p className="relative mt-7 text-xl font-bold">{specialist.name}</p>
            <p className="relative mt-1 text-sm font-semibold tracking-[0.14em] text-sky uppercase">
              {specialist.designation}
            </p>
            <Equalizer className="relative mt-6 h-8 text-white/40" bars={13} />
          </div>

          <div className="p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-4 text-[1.9rem] leading-tight font-bold text-navy sm:text-4xl">
              Meet {specialist.name}
            </h2>
            <p className="mt-2 font-semibold text-clinic">{specialist.designation}</p>
            <div className="mt-6 grid gap-4 leading-relaxed text-navy/70">
              <p>{intro}</p>
              <p>{copy.body}</p>
            </div>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" aria-label="Areas of expertise">
              {specialist.expertise.map((area) => (
                <li key={area} className="flex items-center gap-2.5 rounded-2xl bg-mist px-4 py-3 text-sm font-medium text-navy">
                  <Check className="size-4 shrink-0 text-clinic" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
            <Button
              href={whatsappUrl(whatsappMessages.specialist)}
              size="lg"
              className="mt-9 w-full sm:w-auto"
              icon={<CalendarCheck className="size-5" aria-hidden />}
            >
              {specialist.cta}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
