"use client";

import {
  ArrowRight,
  AudioLines,
  AudioWaveform,
  BatteryFull,
  Bluetooth,
  CalendarCheck,
  Check,
  Compass,
  EyeOff,
  Hand,
  ShieldCheck,
  Signal,
  Sparkles,
  Volume2,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { guides, styles } from "@/data/hearing-aids";
import { serviceMessage, whatsappUrl } from "@/lib/whatsapp";
import { images, type ImageKey } from "@/data/images";

/** Person photo for each style (illustrative stock, not clinic patients). */
const STYLE_PHOTOS: Record<StyleId, { key: ImageKey; position: string }> = {
  "cic-iic": { key: "earExamination", position: "45% center" },
  ric: { key: "hearingAidOpenFit", position: "100% 30%" },
  bte: { key: "hearingAidWearer", position: "32% center" },
  ite: { key: "hearingAidInEar", position: "40% center" },
};

type StyleId = "cic-iic" | "ric" | "bte" | "ite";

/** Icon for each benefit label; falls back to a check mark for anything unlisted. */
const BENEFIT_ICONS: Record<string, LucideIcon> = {
  "Virtually invisible": EyeOff,
  "Mild to moderate loss": AudioLines,
  "Natural sound directionality": Compass,
  "Natural sound quality": AudioWaveform,
  "Bluetooth compatible": Bluetooth,
  "Easy to maintain": Wrench,
  "All hearing levels": Signal,
  "Durable design": ShieldCheck,
  "Full feature set": Sparkles,
  "Easy to handle": Hand,
  "Volume controls": Volume2,
  "Long battery life": BatteryFull,
};

/**
 * Stylised ear (side view, face to the left) showing where each hearing-aid style
 * sits. Purely illustrative, not to scale.
 */
function EarIllustration({ id, tone = "dark" }: { id: StyleId; tone?: "dark" | "light" }) {
  // Per-instance ids: the illustration renders more than once per page, and a duplicate
  // gradient id makes copies reference a definition that may be hidden.
  const uid = useId().replace(/:/g, "");
  const deviceId = `hw-device-${uid}`;
  const glowId = `hw-glow-${uid}`;
  const device = `url(#${deviceId})`;
  // Ear lines: white on navy panels, navy on white surfaces.
  const line = tone === "dark" ? "rgb(255 255 255 / 0.55)" : "rgb(15 44 87 / 0.55)";
  const canal = tone === "dark" ? "rgb(0 0 0 / 0.35)" : "rgb(15 44 87 / 0.35)";
  return (
    <svg viewBox="0 0 240 220" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={deviceId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cc4f4" />
          <stop offset="1" stopColor="#2B8FD8" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ear */}
      <g fill="none" stroke={line} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {/* helix / outer rim */}
        <path d="M86 52 C 100 22, 160 14, 178 58 C 192 92, 178 122, 164 140 C 152 156, 152 176, 140 192 C 128 208, 104 206, 98 190 C 94 178, 104 168, 110 158" />
        {/* antihelix */}
        <path d="M108 54 C 136 44, 160 64, 158 92 C 156 112, 142 124, 136 138" opacity={0.7} />
        {/* concha bowl */}
        <path d="M96 100 C 100 84, 126 82, 136 98 C 146 114, 138 136, 120 140 C 106 143, 96 132, 96 120" opacity={0.6} />
        {/* tragus */}
        <path d="M86 108 C 80 116, 82 128, 90 132" opacity={0.7} />
      </g>
      {/* ear canal opening */}
      <ellipse cx="102" cy="118" rx="6" ry="8" fill={canal} />

      {/* Device for the style */}
      <g filter={`url(#${glowId})`} className="origin-center transition-transform duration-700 group-hover:scale-[1.04]">
        {id === "cic-iic" && (
          <>
            <ellipse cx="102" cy="118" rx="6.5" ry="8.5" fill={device} />
            <circle cx="102" cy="118" r="16" fill="none" stroke="#7cc4f4" strokeOpacity={0.5} strokeDasharray="3 4" />
          </>
        )}
        {id === "ite" && (
          <path
            d="M98 104 C 104 92, 124 90, 132 102 C 140 116, 132 132, 118 134 C 106 136, 96 126, 98 114 Z"
            fill={device}
          />
        )}
        {id === "ric" && (
          <>
            <path d="M190 52 C 200 66, 200 98, 188 116 C 184 104, 184 70, 190 52 Z" fill={device} />
            <path d="M191 54 C 178 18, 112 12, 104 112" fill="none" stroke="#7cc4f4" strokeWidth={2} />
            <circle cx="103" cy="116" r="5" fill={device} />
          </>
        )}
        {id === "bte" && (
          <>
            <path d="M192 44 C 210 60, 212 110, 194 132 C 182 118, 180 62, 192 44 Z" fill={device} />
            <path d="M193 46 C 176 6, 108 8, 106 104" fill="none" stroke="#7cc4f4" strokeWidth={4.5} />
            <path d="M98 106 C 104 98, 118 98, 122 108 C 126 120, 116 128, 106 126 C 98 124, 94 114, 98 106 Z" fill={device} opacity={0.9} />
          </>
        )}
      </g>
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Premium pop-up with the detailed guide for one hearing-aid style. */
function GuideDialog({ id, onClose }: { id: StyleId; onClose: () => void }) {
  const guide = guides.items.find((g) => g.id === id);
  const style = styles.items.find((s) => s.id === id);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!guide || !style) return null;
  const photo = images[STYLE_PHOTOS[id].key];
  const titleId = `guide-title-${id}`;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close guide"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-navy-900/60 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[2rem] md:overflow-hidden bg-white shadow-[0_40px_100px_-30px_rgb(10_31_62/0.8)] sm:rounded-[2rem] md:grid-cols-[0.85fr_1.15fr]"
      >
        {/* Left: photo panel */}
        <div className="relative isolate flex min-h-52 flex-col justify-end overflow-hidden bg-navy p-6 text-white sm:p-8 md:min-h-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: STYLE_PHOTOS[id].position }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_31_62/0.97)_0%,rgb(15_44_87/0.75)_50%,rgb(15_44_87/0.2)_100%)]"
          />
          <span className="absolute top-5 left-5 rounded-full bg-white/20 px-3 py-1 font-display text-xs font-bold tracking-wide ring-1 ring-white/30 backdrop-blur-md">
            {style.shortName}
          </span>
          <div aria-hidden className="mb-5 hidden size-24 rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/20 backdrop-blur-md md:block">
            <EarIllustration id={id} />
          </div>
          <p className="eyebrow eyebrow-light">{guide.label}</p>
          <h2 id={titleId} className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">
            {guide.title}
          </h2>
        </div>

        {/* Right: details */}
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          <p className="pr-10 text-base leading-relaxed text-navy/70">{guide.description}</p>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            {guide.specs.map((spec) => (
              <div key={spec.label} className="rounded-2xl bg-mist p-4 ring-1 ring-line">
                <dt className="text-xs font-bold tracking-[0.14em] text-clinic uppercase">{spec.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed font-medium text-navy">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            <a
              href={whatsappUrl(serviceMessage(guide.title, "consultation"))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fx btn-sheen inline-flex h-12 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgb(10_99_168/0.85)]"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book a Consultation
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center rounded-full px-5 text-sm font-semibold text-navy/70 transition-colors hover:text-navy"
            >
              Close
            </button>
          </div>
        </div>

        {/* Close (X) */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close guide"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-navy shadow-soft ring-1 ring-line transition-colors hover:bg-clinic hover:text-white"
        >
          <X className="size-5" aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

/** Hearing Aids — "Explore Hearing Aid Styles": illustrated style cards; "View Guide" opens a pop-up. */
export function HearingAidStyles() {
  const [openId, setOpenId] = useState<StyleId | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => {
    setOpenId(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <section id="styles" aria-labelledby="styles-title" className="bg-mist py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">{styles.eyebrow}</p>
            <h2
              id="styles-title"
              className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
            >
              {styles.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-navy/70">{styles.description}</p>
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {styles.items.map((style) => (
            <StaggerItem
              as="li"
              key={style.id}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-line transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-lift"
            >
              {/* Photo */}
              <div className="relative isolate aspect-[4/3.3] overflow-hidden bg-navy">
                <Image
                  src={images[STYLE_PHOTOS[style.id as StyleId].key].src}
                  alt={images[STYLE_PHOTOS[style.id as StyleId].key].alt}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 92vw"
                  className="-z-10 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105"
                  style={{ objectPosition: STYLE_PHOTOS[style.id as StyleId].position }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 font-display text-xs font-bold tracking-wide text-white ring-1 ring-white/30 backdrop-blur-md">
                  {style.shortName}
                </span>
              </div>

              {/* Content */}
              <div className="relative isolate flex flex-1 flex-col p-6 sm:p-7">
                {/* Where it sits: faint ear illustration in the bottom-right corner */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-6 bottom-14 -z-10 size-44 opacity-[0.13] transition-opacity duration-500 group-hover:opacity-25"
                >
                  <EarIllustration id={style.id as StyleId} tone="light" />
                </div>
                <h3 className="text-2xl leading-snug font-bold text-navy">{style.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy/70">{style.description}</p>
                <ul className="mt-5 grid flex-1 content-start gap-2.5 text-sm font-medium text-navy/80">
                  {style.benefits.map((benefit) => {
                    const Icon = BENEFIT_ICONS[benefit] ?? Check;
                    return (
                      <li key={benefit} className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="grid size-8 shrink-0 place-items-center rounded-lg bg-mist text-clinic ring-1 ring-line"
                        >
                          <Icon className="size-4" />
                        </span>
                        {benefit}
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setOpenId(style.id as StyleId);
                  }}
                  className="btn-fx btn-sheen btn-sheen-blue mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-clinic/40 text-sm font-semibold text-clinic hover:border-clinic hover:bg-clinic hover:text-white"
                >
                  {styles.cta}
                  <span className="sr-only"> for {style.name}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>{openId && <GuideDialog key={openId} id={openId} onClose={close} />}</AnimatePresence>
    </section>
  );
}
