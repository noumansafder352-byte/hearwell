import { Ear, type LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SoundRings } from "@/components/ui/SoundWave";
import { approach } from "@/data/about";
import { cn } from "@/lib/cn";

interface PointProps {
  title: string;
  description: string;
  icon: LucideIcon;
  side: "left" | "right";
}

/** One approach point; mirrors its alignment toward the central emblem on desktop. */
function Point({ title, description, icon: Icon, side }: PointProps) {
  const left = side === "left";
  return (
    <StaggerItem
      as="li"
      className={cn("group relative flex gap-5", left && "lg:flex-row-reverse lg:text-right")}
    >
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-clinic shadow-soft ring-1 ring-line transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent"
      >
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="text-lg leading-snug font-bold text-navy">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-navy/70">{description}</p>
      </div>
      {/* Dashed connector toward the centre (desktop) */}
      <span
        aria-hidden
        className={cn(
          "absolute top-6 hidden w-10 border-t border-dashed border-sky/50 lg:block",
          left ? "-right-14" : "-left-14",
        )}
      />
    </StaggerItem>
  );
}

/**
 * About Us — "The HearWell Approach". Radial "listening" layout: a central ear
 * emblem with sound rings, two approach points on each side.
 */
export function ApproachSection() {
  const [a, b, c, d] = approach.items;

  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{approach.eyebrow}</p>
          <h2
            id="approach-title"
            className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {approach.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy/70">{approach.description}</p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          <Stagger as="ul" className="order-2 grid gap-10 lg:order-1 lg:gap-16">
            <Point {...a} side="left" />
            <Point {...b} side="left" />
          </Stagger>

          {/* Central emblem */}
          <Reveal className="relative order-1 mx-auto grid size-56 place-items-center lg:order-2 lg:size-72">
            <SoundRings animated className="inset-0 text-sky/50" />
            <span aria-hidden className="absolute inset-[18%] rounded-full bg-mist ring-1 ring-line" />
            <span
              aria-hidden
              className="relative grid size-24 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_0_50px_rgb(43_143_216/0.45),0_20px_40px_-16px_rgb(10_99_168/0.8)] ring-8 ring-white"
            >
              <Ear className="size-10" />
            </span>
          </Reveal>

          <Stagger as="ul" className="order-3 grid gap-10 lg:gap-16">
            <Point {...c} side="right" />
            <Point {...d} side="right" />
          </Stagger>
        </div>
      </div>
    </section>
  );
}
