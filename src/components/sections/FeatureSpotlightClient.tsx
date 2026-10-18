"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export interface FeatureSpotlightClientProps {
  eyebrow: string;
  title: string;
  description: string;
  /** `icon` is a rendered element; use FeatureSpotlight (server) to pass Lucide icons. */
  items: { title: string; description: string; icon: ReactNode }[];
  image: SiteImage;
  /** Photo frame ratio; pick one close to the photo so little is cropped. */
  aspect?: string;
  objectPosition?: string;
}

/**
 * Photo beside a list of icon items (e.g. Tinnitus "Common Causes", Ear Wax
 * "Recognize the Signs"). Hovering, focusing or tapping an item raises it as
 * the selected card.
 */
export function FeatureSpotlightClient({
  eyebrow,
  title,
  description,
  items,
  image,
  aspect = "aspect-[3/2]",
  objectPosition = "center",
}: FeatureSpotlightClientProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-mist py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---------- Photo ---------- */}
          <Reveal
            className={cn(
              "relative w-full overflow-hidden rounded-[2rem] bg-navy shadow-[0_40px_80px_-40px_rgb(15_44_87/0.75)]",
              aspect,
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
              style={{ objectPosition }}
            />
          </Reveal>

          {/* ---------- Items ---------- */}
          <Reveal delay={0.1}>
            <ul className="grid gap-1.5">
              {items.map(({ title: itemTitle, description: itemDescription, icon }, i) => (
                <li key={itemTitle}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      "group relative flex w-full gap-4 overflow-hidden rounded-3xl px-5 py-4 text-left transition-all duration-500 sm:gap-5 sm:px-6 sm:py-4",
                      active === i
                        ? "bg-white shadow-[0_24px_50px_-30px_rgb(15_44_87/0.45)] ring-1 ring-clinic/20"
                        : "ring-1 ring-transparent hover:bg-white/60",
                    )}
                  >
                    {/* Active accent bar */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-4 left-0 w-1 origin-center rounded-r-full bg-brand-gradient transition-transform duration-500",
                        active === i ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors duration-500 [&_svg]:size-5",
                        active === i ? "bg-brand-gradient text-white" : "bg-white text-clinic ring-1 ring-line",
                      )}
                    >
                      {icon}
                    </span>
                    <span>
                      <span className="block text-lg font-bold text-navy">{itemTitle}</span>
                      <span className="mt-1 block text-base leading-relaxed text-navy/70">{itemDescription}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
