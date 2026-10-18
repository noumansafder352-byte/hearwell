"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { commitmentToPatients } from "@/data/about";
import { images, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

/** Photo per point, in the same order as commitmentToPatients.items. */
const PHOTOS: { key: ImageKey; position: string }[] = [
  { key: "hearingAidWearer", position: "35% center" },
  { key: "consultationSpecialist", position: "62% center" },
  { key: "hearingTest", position: "50% center" },
  { key: "earExamination", position: "45% center" },
];

/**
 * About Us — "Why HearWell". Expanding photo-panel gallery: on desktop the hovered
 * / focused panel widens to reveal its description; on smaller screens every panel
 * is stacked and fully open.
 */
export function WhyHearWell() {
  const [active, setActive] = useState(0);
  const { items } = commitmentToPatients;

  return (
    <section aria-labelledby="why-hw-title" className="bg-mist py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        {/* ---------- Header ---------- */}
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">{commitmentToPatients.eyebrow}</p>
            <h2
              id="why-hw-title"
              className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
            >
              {commitmentToPatients.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-navy/70">{commitmentToPatients.description}</p>
        </Reveal>

        {/* ---------- Expanding panels ---------- */}
        <Reveal y={30} className="mt-14">
          <ul className="grid gap-4 sm:grid-cols-2 xl:flex xl:h-[30rem] xl:flex-row">
            {items.map(({ title, description, icon: Icon }, i) => {
              const { key, position } = PHOTOS[i % PHOTOS.length];
              const photo = images[key];
              const open = i === active;
              return (
                <li
                  key={title}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group relative isolate flex min-h-[22rem] overflow-hidden rounded-[1.75rem] text-white shadow-[0_24px_50px_-30px_rgb(15_44_87/0.8)] outline-none transition-[flex-grow] duration-700 ease-[var(--ease-out-soft)] focus-visible:ring-4 focus-visible:ring-sky/40 xl:min-h-0",
                    open ? "xl:grow-[3.2]" : "xl:grow",
                  )}
                  style={{ flexBasis: 0 }}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 92vw"
                    className={cn(
                      "-z-20 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)]",
                      open && "xl:scale-105",
                    )}
                    style={{ objectPosition: position }}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 -z-10 transition-opacity duration-700",
                      "bg-[linear-gradient(to_top,rgb(10_31_62/0.96)_0%,rgb(15_44_87/0.8)_45%,rgb(15_44_87/0.25)_100%)]",
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 -z-10 bg-navy/45 transition-opacity duration-700",
                      open ? "opacity-0" : "opacity-0 xl:opacity-100",
                    )}
                  />

                  <div className="mt-auto w-full p-6 sm:p-7">
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-12 place-items-center rounded-2xl ring-1 backdrop-blur-md transition-colors duration-500",
                        open ? "bg-brand-gradient ring-sky/50" : "bg-white/15 ring-white/25",
                      )}
                    >
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-5 text-xl leading-snug font-bold xl:text-[1.35rem]">{title}</h3>
                    {/* Description: always shown below lg; on desktop only in the open panel */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-soft)]",
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 xl:grid-rows-[0fr] xl:opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-md pt-3 text-base leading-relaxed text-white/80">{description}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
