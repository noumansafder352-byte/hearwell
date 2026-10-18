"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, ClipboardList, HeartHandshake, Route, SlidersHorizontal } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoundRings } from "@/components/ui/SoundWave";
import { cn } from "@/lib/cn";

export interface StepItem {
  title: string;
  description: string;
  points?: string[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Default icons for a four-stage care process: assess → plan → treat → support. */
const DEFAULT_ICONS: ReactNode[] = [ClipboardList, Route, SlidersHorizontal, HeartHandshake].map((Icon, i) => (
  <Icon key={i} aria-hidden />
));

interface ProcessStepperProps {
  eyebrow: string;
  title: string;
  description: string;
  steps: StepItem[];
  /** Rendered icon elements, one per step (sized by the stepper). Pass elements, not components, from server pages. */
  icons?: ReactNode[];
}

/**
 * Interactive process: step tabs on the left, a detail panel on the right.
 * While in view it auto-advances (a timer bar shows progress); hovering pauses it,
 * choosing a step stops it. Reduced-motion users get a static, manual stepper.
 */
export function ProcessStepper({ eyebrow, title, description, steps, icons = DEFAULT_ICONS }: ProcessStepperProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const running = inView && !manual;

  const select = (i: number) => {
    setActive(i);
    setManual(true);
  };
  const step = steps[active];
  const stepIcon = icons[active % icons.length];

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} />

        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10",
            hovered && "progress-paused",
          )}
        >
          {/* ---------- Step tabs (vertically centred against the taller panel) ---------- */}
          <Reveal className="lg:self-center">
            <div role="tablist" aria-label="Process steps" className="relative grid grid-cols-2 gap-3 lg:grid-cols-1">
              {/* Vertical rail behind the tabs (desktop) */}
              <span aria-hidden className="absolute top-8 bottom-8 left-10 hidden w-px bg-line lg:block" />
              <span
                aria-hidden
                className="absolute top-8 left-10 hidden w-px origin-top bg-brand-gradient transition-transform duration-700 lg:block"
                style={{ bottom: "2rem", transform: `scaleY(${active / (steps.length - 1)})` }}
              />

              {steps.map((s, i) => {
                const icon = icons[i % icons.length];
                const isActive = i === active;
                const done = i < active;
                return (
                  <button
                    key={s.title}
                    role="tab"
                    id={`process-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="process-panel"
                    onClick={() => select(i)}
                    className={cn(
                      "relative flex items-center gap-4 overflow-hidden rounded-2xl p-3 text-left transition-all duration-500 sm:p-4",
                      isActive
                        ? "bg-white shadow-[0_24px_50px_-28px_rgb(15_44_87/0.5)] ring-1 ring-clinic/25"
                        : "bg-mist/70 ring-1 ring-line hover:bg-mist",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 hidden size-12 shrink-0 place-items-center rounded-xl transition-colors duration-500 sm:grid [&_svg]:size-5",
                        isActive || done ? "bg-brand-gradient text-white" : "bg-white text-clinic ring-1 ring-line",
                      )}
                    >
                      {done ? <Check className="size-5" aria-hidden /> : icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-bold tracking-[0.16em] text-clinic uppercase sm:text-xs">
                        Step {i + 1}
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug font-bold text-navy sm:text-base">{s.title}</span>
                    </span>

                    {/* Timer bar along the bottom of the active tab */}
                    {isActive && running && (
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
                        <span
                          key={active}
                          className="progress-run block h-full bg-brand-gradient"
                          onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ---------- Detail panel ---------- */}
          <Reveal delay={0.1}>
            <div
              id="process-panel"
              role="tabpanel"
              aria-labelledby={`process-tab-${active}`}
              className="relative isolate flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] bg-navy-gradient p-7 text-white shadow-[0_40px_80px_-40px_rgb(15_44_87/0.75)] sm:p-10"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_100%_0%,rgb(43_143_216/0.35),transparent_70%)]"
              />
              <SoundRings animated className="-top-24 -right-24 size-[22rem] text-sky/20" />
              {/* Oversized watermark of the step number */}
              <span
                aria-hidden
                className="absolute right-6 bottom-0 font-display text-[9rem] leading-none font-extrabold text-white/[0.05] sm:text-[12rem]"
              >
                0{active + 1}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  data-reveal
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-sky ring-1 ring-white/20 backdrop-blur-md [&_svg]:size-7">
                      {stepIcon}
                    </span>
                    <span className="text-xs font-bold tracking-[0.16em] text-sky uppercase">
                      Step {active + 1} of {steps.length}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl leading-tight font-bold sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{step.description}</p>

                  {step.points && (
                    <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                      {step.points.map((point, i) => (
                        <motion.li
                          data-reveal
                          key={point}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease }}
                          className="flex items-start gap-2.5 rounded-2xl bg-white/[0.07] p-4 text-sm leading-snug font-medium ring-1 ring-white/10"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="relative mt-auto flex gap-2 pt-10" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.title}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === active ? "w-8 bg-sky" : "w-1.5 bg-white/30",
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
