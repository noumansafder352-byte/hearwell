"use client";

import Image from "next/image";
import { AudioLines, Clock } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { testTypes } from "@/data/hearing-tests";
import { images, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

/** Photo for each test, in the same order as testTypes.tests. */
const PHOTOS: { key: ImageKey; position: string }[] = [
  { key: "hearingTest", position: "60% center" }, // Pure-Tone Audiometry
  { key: "adultCuppingEar", position: "50% 40%" }, // Speech Audiometry
  { key: "childHeadphones", position: "50% 30%" }, // ABR
  { key: "consultationSpecialist", position: "62% center" }, // ASSR
  { key: "earExamination", position: "45% center" }, // Tympanometry
  { key: "tinnitusCoverEar", position: "68% 40%" }, // Tinnitus Matching
  { key: "hearingAidInEar", position: "45% center" }, // Real-Ear Measurement
];

/**
 * Hearing Tests — "Types of Hearing Tests". Expanding photo-panel gallery (same
 * pattern as About › Why HearWell). Desktop: hover/focus widens a panel; collapsed
 * panels show a vertical title. Smaller screens: open grid.
 */
export function TestTypesGallery() {
  // 4th test (ASSR) is open by default.
  const [active, setActive] = useState(3);
  const { tests } = testTypes;

  return (
    <section aria-labelledby="tests-title" className="bg-mist py-20 sm:py-24 lg:py-28" id="tests">
      <div className="container-site">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Our Assessments</p>
          <h2
            id="tests-title"
            className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {testTypes.title}
          </h2>
        </Reveal>

        <Reveal y={30} className="mt-14">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:h-[34rem] xl:gap-3">
            {tests.map((test, i) => {
              const { key, position } = PHOTOS[i % PHOTOS.length];
              const photo = images[key];
              const open = i === active;
              const badge = test.abbr ?? <AudioLines className="size-4" aria-hidden />;
              return (
                <li
                  key={test.name}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  style={{ flexBasis: 0 }}
                  className={cn(
                    "group relative isolate flex min-h-[24rem] overflow-hidden rounded-[1.5rem] text-white shadow-[0_24px_50px_-30px_rgb(15_44_87/0.8)] outline-none transition-[flex-grow] duration-700 ease-[var(--ease-out-soft)] focus-visible:ring-4 focus-visible:ring-sky/40 xl:min-h-0",
                    open ? "xl:grow-[5]" : "xl:grow",
                  )}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 45vw, (min-width: 640px) 45vw, 92vw"
                    className={cn(
                      "-z-20 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)]",
                      open && "xl:scale-105",
                    )}
                    style={{ objectPosition: position }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_31_62/0.97)_0%,rgb(15_44_87/0.82)_48%,rgb(15_44_87/0.3)_100%)]"
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 -z-10 bg-navy/55 opacity-0 transition-opacity duration-700",
                      !open && "xl:opacity-100",
                    )}
                  />

                  {/* Collapsed (desktop only): badge + vertical title */}
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 hidden flex-col items-center justify-between pt-6 pb-8 transition-opacity duration-500 xl:flex",
                      open ? "opacity-0" : "opacity-100 delay-200",
                    )}
                  >
                    <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-white/15 px-2 font-display text-xs font-bold ring-1 ring-white/25 backdrop-blur-md">
                      {badge}
                    </span>
                    <span className="flex rotate-180 items-center gap-4 [writing-mode:vertical-rl]">
                      <span className="h-10 w-[3px] rounded-full bg-gradient-to-b from-sky to-clinic" />
                      <span className="font-display text-[1.4rem] leading-none font-extrabold tracking-[-0.01em] whitespace-nowrap text-white drop-shadow-[0_2px_10px_rgb(0_0_0/0.35)]">
                        {test.name}
                      </span>
                    </span>
                  </div>

                  {/* Open content (always on smaller screens) */}
                  <div
                    className={cn(
                      "mt-auto w-full p-6 transition-opacity duration-500 sm:p-7",
                      open ? "xl:opacity-100 xl:delay-200" : "xl:pointer-events-none xl:opacity-0",
                    )}
                  >
                    <span className="inline-grid h-10 min-w-10 place-items-center rounded-xl bg-brand-gradient px-2.5 font-display text-sm font-bold ring-1 ring-sky/50">
                      {badge}
                    </span>
                    <p className="mt-5 text-sm font-semibold text-sky">{test.subtitle}</p>
                    <h3 className="mt-1 text-xl leading-snug font-bold xl:text-[1.4rem] xl:whitespace-nowrap">
                      {test.name}
                      {test.abbr && <span className="sr-only"> ({test.abbr})</span>}
                    </h3>
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80">{test.description}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur-md">
                      <Clock className="size-4 text-sky" aria-hidden />
                      <span className="sr-only">Duration:</span>
                      {test.duration}
                    </p>
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
