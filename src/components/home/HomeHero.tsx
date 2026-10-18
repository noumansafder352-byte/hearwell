import Image from "next/image";
import { ArrowRight, AudioLines, CalendarCheck, Ear } from "lucide-react";
import type { CSSProperties } from "react";
import { Equalizer, SoundRings } from "@/components/ui/SoundWave";
import { homeHero } from "@/data/home";
import { images } from "@/data/images";
import { riseStep } from "@/lib/cn";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Ear icon with three sound arcs that light up in sequence, as if sound is reaching it. */
function EarWaves() {
  return (
    <span className="relative flex items-center gap-0.5">
      <span className="grid size-12 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_12px_26px_-8px_rgb(10_99_168/0.95)] sm:size-14">
        <Ear className="size-6 sm:size-7" />
      </span>
      <svg
        viewBox="0 0 16 32"
        className="h-9 w-[1.125rem] text-clinic drop-shadow-[0_0_3px_rgb(255_255_255/0.95)] sm:h-10 sm:w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${3 + i * 4} ${10 - i * 3} q ${4 + i * 1.5} ${6 + i * 3} 0 ${12 + i * 6}`}
            strokeWidth={2.4}
            className="arc-pulse"
            style={{ animationDelay: `${i * 0.25}s` } as CSSProperties}
          />
        ))}
      </svg>
    </span>
  );
}

export function HomeHero() {
  const photo = images.homeHeroGrandson;

  return (
    <section className="header-offset relative isolate overflow-hidden bg-mist">
      {/* ---------- Background ---------- */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(55%_65%_at_78%_38%,rgb(43_143_216/0.22),transparent_70%),radial-gradient(40%_45%_at_8%_60%,rgb(10_99_168/0.10),transparent_70%),linear-gradient(180deg,#f5f9fd_0%,#eef4fa_100%)]"
      />
      {/* Fine dot grid, faded towards the edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(15_44_87/0.09)_1px,transparent_1px)] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)] bg-[size:22px_22px]"
      />
      <div className="container-site grid items-center gap-16 pt-10 pb-24 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-14 lg:pb-28">
        {/* ---------- Copy ---------- */}
        <div className="relative max-w-2xl">
          <p className="rise inline-flex items-center gap-2.5 text-[0.68rem] font-bold tracking-[0.1em] text-clinic uppercase sm:text-xs sm:tracking-[0.14em]">
            <span className="grid size-6 place-items-center rounded-full bg-brand-gradient text-white">
              <AudioLines className="size-3.5" aria-hidden />
            </span>
            {homeHero.eyebrow}
          </p>

          <h1
            className="rise mt-7 font-display text-[2.75rem] leading-[1] font-extrabold tracking-[-0.035em] text-navy sm:text-6xl lg:text-[4.4rem]"
            style={riseStep(1)}
          >
            Hear Better.
            <span className="relative mt-1 block w-fit">
              <span className="text-gradient">Live Better.</span>
              {/* Hand-drawn sound-wave underline */}
              <svg
                aria-hidden
                viewBox="0 0 320 24"
                fill="none"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-4 w-full sm:-bottom-4 sm:h-5"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1">
                    <stop offset="0" stopColor="#0A63A8" />
                    <stop offset="1" stopColor="#2B8FD8" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 14 C 22 14, 26 4, 40 6 S 58 22, 74 18 S 92 2, 108 8 S 124 22, 140 16 S 160 4, 176 10 S 196 20, 214 14 S 238 6, 260 11 S 296 15, 318 10"
                  pathLength={1}
                  className="draw"
                  style={{ ["--draw-delay" as string]: "0.7s" }}
                  stroke="url(#hero-underline)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="rise mt-10 max-w-xl text-base leading-relaxed text-navy/70" style={riseStep(2)}>
            {homeHero.description}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={riseStep(3)}>
            <a
              href={whatsappUrl(whatsappMessages.appointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fx btn-sheen inline-flex h-12 items-center gap-2 rounded-full bg-brand-gradient pr-6 pl-1.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_36px_-14px_rgb(10_99_168/0.85)] hover:shadow-[0_22px_40px_-14px_rgb(10_99_168/0.95)]"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
                <CalendarCheck className="size-4" aria-hidden />
              </span>
              {homeHero.primaryCta}
            </a>
            <a
              href="#services"
              className="glass-chip btn-fx btn-sheen btn-sheen-blue group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold text-navy hover:text-clinic hover:shadow-lift"
            >
              {homeHero.secondaryCta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>

        {/* ---------- Visual ---------- */}
        <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:mr-10 lg:ml-auto lg:max-w-[26.5rem]">
          {/* Sound rings radiating from behind the arch */}
          <SoundRings animated className="top-[38%] left-1/2 -z-10 size-[150%] -translate-x-1/2 -translate-y-1/2 text-sky/45" />

          {/* Offset gradient arch */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2.75rem] bg-brand-gradient opacity-90 sm:translate-x-6 sm:translate-y-6"
          />
          {/* Outline arch */}
          <div aria-hidden className="absolute -inset-3 rounded-t-full rounded-b-[3.25rem] border border-sky/40 sm:-inset-4" />

          {/* Photo arch */}
          <div className="zoom-in relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.75rem] shadow-[0_40px_80px_-36px_rgb(15_44_87/0.55)] ring-4 ring-white">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 26.5rem, (min-width: 640px) 24rem, 90vw"
              className="object-cover object-center"
            />
          </div>

          {/* Floating animated badges (decorative) */}
          <div aria-hidden className="rise absolute bottom-[12%] -left-2 sm:-left-8" style={riseStep(5)}>
            <div className="float-slow">
              <EarWaves />
            </div>
          </div>

          <div aria-hidden className="rise absolute top-[16%] -right-4 sm:-right-10" style={riseStep(6)}>
            <div className="glass glass-strong float-slower grid size-[4.25rem] place-items-center rounded-full sm:size-[4.75rem]">
              <span className="grid size-11 place-items-center rounded-full bg-brand-gradient shadow-[0_8px_18px_-8px_rgb(10_99_168/0.9)] sm:size-12">
                <Equalizer className="h-7 gap-[3px] text-white" barClassName="w-[3px]" bars={5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
