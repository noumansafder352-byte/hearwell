"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { AudioLines, CalendarCheck, Compass, MessageCircle, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { journey } from "@/data/home";

const ICONS: LucideIcon[] = [MessageCircle, CalendarCheck, AudioLines, Compass];

interface StepProps {
  index: number;
  count: number;
  title: string;
  description: string;
  progress: MotionValue<number>;
}

/** One timeline step: a node that lights up when the progress line reaches it, plus its card. */
function Step({ index, count, title, description, progress }: StepProps) {
  const Icon = ICONS[index % ICONS.length];
  // Point on the 0–1 track where this node sits.
  const at = count > 1 ? index / (count - 1) : 0;
  const on = useTransform(progress, [Math.max(0, at - 0.06), at], [0, 1]);
  const ringScale = useTransform(on, [0, 1], [0.6, 1]);
  const cardGlow = useTransform(on, (v) => `0 24px 48px -28px rgb(10 99 168 / ${0.55 * v})`);
  const cardRing = useTransform(on, (v) => `inset 0 0 0 1px rgb(43 143 216 / ${0.15 + 0.35 * v})`);

  return (
    <li className="relative grid grid-cols-[4rem_1fr] gap-5 lg:flex lg:flex-col lg:gap-0">
      {/* Node */}
      <div className="relative z-10 flex justify-center lg:mb-8">
        <span className="relative grid size-16 place-items-center rounded-full bg-white text-navy/40 shadow-[0_10px_24px_-14px_rgb(15_44_87/0.5)] ring-1 ring-line">
          <Icon className="size-6" aria-hidden />
          {/* Active state */}
          <motion.span
            aria-hidden
            style={{ opacity: on, scale: ringScale }}
            className="absolute inset-0 grid place-items-center rounded-full bg-brand-gradient text-white shadow-[0_14px_30px_-10px_rgb(10_99_168/0.85)]"
          >
            <Icon className="size-6" />
            <span className="hw-ripple absolute inset-0 rounded-full border-2 border-sky/60" />
          </motion.span>
        </span>
      </div>

      {/* Card */}
      <motion.div
        data-reveal
        style={{ boxShadow: cardGlow }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        className="relative mb-2 overflow-hidden rounded-3xl bg-white p-6 lg:mb-0 lg:flex-1 lg:p-7 lg:text-center"
      >
        <motion.span aria-hidden style={{ boxShadow: cardRing }} className="pointer-events-none absolute inset-0 rounded-3xl" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -bottom-4 font-display text-[5rem] leading-none font-extrabold text-mist"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.16em] text-clinic uppercase">Step {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-lg leading-snug font-bold text-navy">{title}</h3>
          <p className="mt-2 leading-relaxed text-navy/70">{description}</p>
        </div>
      </motion.div>
    </li>
  );
}

/**
 * Scroll-linked journey timeline: a gradient progress line fills along the track
 * (horizontal on desktop, vertical on mobile) and lights up each step as it passes.
 */
export function JourneyTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const steps = journey.steps;

  return (
    <div className="relative">
      {/* Horizontal track (desktop): spans node centres of first and last column */}
      <div aria-hidden className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-[3px] -translate-y-1/2 rounded-full bg-line lg:block">
        <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-gradient-to-r from-clinic via-sky to-clinic" />
      </div>
      {/* Vertical track (mobile/tablet): runs through node centres */}
      <div aria-hidden className="absolute top-8 bottom-16 left-8 w-[3px] -translate-x-1/2 rounded-full bg-line lg:hidden">
        <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-clinic via-sky to-clinic" />
      </div>

      <ol ref={ref} className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => (
          <Step key={step.title} index={i} count={steps.length} title={step.title} description={step.description} progress={progress} />
        ))}
      </ol>
    </div>
  );
}
