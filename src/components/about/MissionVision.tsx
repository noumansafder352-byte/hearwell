import { Eye, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SoundRings } from "@/components/ui/SoundWave";
import { missionVision } from "@/data/about";
import { cn } from "@/lib/cn";

interface HalfProps {
  title: string;
  text: string;
  icon: LucideIcon;
  dark?: boolean;
  align: "end" | "start";
}

/** One half of the split band; content hugs the centre line on desktop. */
function Half({ title, text, icon: Icon, dark = false, align }: HalfProps) {
  return (
    <div
      className={cn(
        "relative isolate flex overflow-hidden px-4 py-16 sm:px-6 lg:py-24",
        dark ? "bg-navy-gradient text-white" : "bg-mist text-navy",
        align === "end" ? "lg:justify-end lg:pr-16" : "lg:justify-start lg:pl-16",
      )}
    >
      {dark && <SoundRings animated className="-right-40 -bottom-40 -z-10 size-[30rem] text-sky/20" />}
      <Reveal className="group w-full max-w-xl">
        <h3 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <span
            aria-hidden
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-12",
              dark ? "bg-white/15 text-white ring-1 ring-white/25" : "bg-brand-gradient text-white",
            )}
          >
            <Icon className="size-[18px]" />
          </span>
          {title}
        </h3>
        <span aria-hidden className="mt-5 block h-0.5 w-12 rounded-full bg-gradient-to-r from-clinic to-sky" />
        <p className={cn("mt-5 text-base leading-relaxed", dark ? "text-white/75" : "text-navy/70")}>{text}</p>
      </Reveal>
    </div>
  );
}

/**
 * About Us — "Our Purpose". Centred heading above a full-width two-tone band:
 * Mission on mist (left) and Vision on navy (right), both always visible.
 */
export function MissionVision() {
  return (
    <section aria-labelledby="purpose-title" className="bg-white pt-20 sm:pt-24 lg:pt-28">
      <Reveal className="container-site mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">{missionVision.eyebrow}</p>
        <h2
          id="purpose-title"
          className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
        >
          {missionVision.title}
        </h2>
      </Reveal>

      <div className="mt-14 grid lg:mt-16 lg:grid-cols-2">
        <Half {...missionVision.mission} icon={Target} align="end" />
        <Half {...missionVision.vision} icon={Eye} align="start" dark />
      </div>
    </section>
  );
}
