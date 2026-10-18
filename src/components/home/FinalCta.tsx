import Link from "next/link";
import {
  CalendarCheck,
  Ear,
  HeartHandshake,
  MessageCircle,
  Phone,
  ScanEye,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SoundRings } from "@/components/ui/SoundWave";
import { styles as hearingAidStyles } from "@/data/hearing-aids";
import { homeFinalCta } from "@/data/home";
import { microsuction } from "@/data/ear-wax";
import { tinnitusIntro } from "@/data/tinnitus";
import { services } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Hearing-aid style chips: spread to four corners so the longer labels don't collide. */
const HA_ORBIT = [
  "top-[2%] left-[-2%]",
  "top-[24%] right-[-4%]",
  "bottom-[24%] left-[-4%]",
  "bottom-[2%] right-[-2%]",
];

/** Where each service chip sits around the central ear (desktop orbit). */
const ORBIT = [
  "top-[6%] left-[4%]",
  "top-[14%] right-[0%]",
  "bottom-[14%] left-[0%]",
  "bottom-[4%] right-[6%]",
];

/** 24 bars arranged in a circle around the centre, like sound arriving from every side. */
function RadialBars({
  radius = 54,
  bars = 24,
}: {
  radius?: number;
  bars?: number;
}) {
  return (
    <div aria-hidden className="absolute inset-0">
      {Array.from({ length: bars }, (_, i) => {
        const h = [10, 16, 22, 13, 19, 9][i % 6];
        return (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 block w-[3px] origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${(360 / bars) * i}deg) translateY(-${radius}px)`,
            }}
          >
            <span
              className="hw-bar block w-full rounded-full bg-gradient-to-t from-sky/30 to-sky"
              style={{
                height: `${h}px`,
                animationDelay: `${(i * 0.13) % 1.8}s`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

/** Receiver-in-canal hearing aid: body, wire and dome. Illustrative only. */
function HearingAidDevice() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cta-device" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe6f8" />
        </linearGradient>
      </defs>
      {/* wire */}
      <path
        d="M60 20 C 40 10, 24 28, 28 50 C 30 62, 33 70, 34 76"
        fill="none"
        stroke="#7cc4f4"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* body */}
      <path
        d="M62 12 C 80 12, 88 30, 84 50 C 81 66, 70 72, 64 65 C 58 58, 61 44, 58 31 C 56 21, 54 12, 62 12 Z"
        fill="url(#cta-device)"
      />
      <rect
        x="69"
        y="26"
        width="5"
        height="12"
        rx="2.5"
        fill="#2B8FD8"
        opacity={0.7}
      />
      {/* receiver + dome */}
      <rect
        x="29.5"
        y="73"
        width="9"
        height="11"
        rx="3"
        fill="url(#cta-device)"
      />
      <path
        d="M26 88 C 26 82, 42 82, 42 88 C 42 92, 26 92, 26 88 Z"
        fill="#7cc4f4"
        opacity={0.85}
      />
    </svg>
  );
}

/** Right-hand visual for the Hearing Aids page: a device at the centre, styles orbiting it. */
function HearingAidsVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[20rem]">
      <SoundRings animated className="inset-[8%] text-sky/50" />
      <div
        aria-hidden
        className="absolute inset-[20%] rounded-full border border-white/10"
      />
      <RadialBars radius={66} bars={28} />

      {/* Central device */}
      <div className="absolute top-1/2 left-1/2 grid size-[6.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient shadow-[0_0_70px_rgb(43_143_216/0.6),0_20px_40px_-14px_rgb(0_0_0/0.6)] ring-4 ring-white/15">
        <div className="float-slow size-[4.75rem]">
          <HearingAidDevice />
        </div>
      </div>

      {/* Orbiting hearing-aid styles */}
      <ul aria-label="Hearing aid styles">
        {hearingAidStyles.items.map((style, i) => (
          <li
            key={style.id}
            className={cn("absolute", HA_ORBIT[i % HA_ORBIT.length])}
          >
            <a
              href="#styles"
              className={cn(
                "flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 text-[0.7rem] font-semibold whitespace-nowrap text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-navy sm:text-xs",
                i % 2 ? "float-slower" : "float-slow",
              )}
            >
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-brand-gradient px-1.5 text-[0.6rem] font-bold tracking-wide text-white">
                {style.shortName.split(" ")[0]}
              </span>
              {style.id === "cic-iic" ? "Completely-In-Canal" : style.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tinnitus options shown around the ear (short chip labels for the approved option names). */
const TINNITUS_CHIPS: { label: string; icon: LucideIcon }[] = [
  { label: "Retraining Therapy", icon: tinnitusIntro.options[0].icon },
  { label: "Sound Masking", icon: tinnitusIntro.options[2].icon },
  { label: "Tinnitus Hearing Aids", icon: tinnitusIntro.options[1].icon },
  { label: "Counselling", icon: tinnitusIntro.options[5].icon },
];

/** Ear wax points shown around the centre (from the approved Microsuction and Journey copy). */
const EAR_WAX_CHIPS: { label: string; icon: LucideIcon }[] = [
  ...microsuction.points.map(({ title, icon }) => ({ label: title, icon })),
  { label: "Guidance and Follow-Up", icon: HeartHandshake },
];

type Chip = { label: string; icon: LucideIcon };

/** Right-hand visual for a single service: a pulsing centre icon with that service's options around it. */
function ServiceOrbitVisual({ chips, label, center: Center }: { chips: Chip[]; label: string; center: LucideIcon }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[20rem]">
      <SoundRings animated className="inset-[8%] text-sky/50" />
      <div aria-hidden className="absolute inset-[20%] rounded-full border border-white/10" />
      <RadialBars radius={60} bars={28} />

      {/* Central ear with a soft ripple */}
      <div className="absolute top-1/2 left-1/2 grid size-[5.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient shadow-[0_0_70px_rgb(43_143_216/0.6),0_20px_40px_-14px_rgb(0_0_0/0.6)] ring-4 ring-white/15">
        <span aria-hidden className="hw-ripple absolute inset-0 rounded-full border-2 border-sky/70" />
        <Center className="size-10" aria-hidden />
      </div>

      <ul aria-label={label}>
        {chips.map(({ label, icon: Icon }, i) => (
          <li key={label} className={cn("absolute", HA_ORBIT[i % HA_ORBIT.length])}>
            <span
              className={cn(
                "flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 text-[0.7rem] font-semibold whitespace-nowrap text-white ring-1 ring-white/20 backdrop-blur-md sm:text-xs",
                i % 2 ? "float-slower" : "float-slow",
              )}
            >
              <span className="grid size-6 place-items-center rounded-full bg-brand-gradient text-white">
                <Icon className="size-3" aria-hidden />
              </span>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FinalCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Primary (light) button. Defaults to the Home "Book an Appointment" WhatsApp link. */
  primary?: { label: string; href: string };
  /** Secondary (outline) button. Defaults to the Home "Contact Us on WhatsApp" link. */
  secondary?: {
    label: string;
    href: string;
    icon?: "whatsapp" | "phone" | "none";
  };
  /** Optional key figure shown beside the description, e.g. { value: "60-Day", label: "Free Trial Period" }. */
  highlight?: { value: string; label: string };
  /** Right-hand visual: all services (default), or one service's own options. */
  visual?: "services" | "hearing-aids" | "tinnitus" | "ear-wax";
}

/**
 * Closing call-to-action used across pages: copy + actions on the left, animated
 * listening visual on the right. Defaults to the Home page copy; pages pass their own.
 */
export function FinalCta({
  eyebrow = homeFinalCta.eyebrow,
  title = homeFinalCta.title,
  description = homeFinalCta.description,
  primary = {
    label: homeFinalCta.primaryCta,
    href: whatsappUrl(whatsappMessages.appointment),
  },
  secondary = {
    label: homeFinalCta.secondaryCta,
    href: whatsappUrl(whatsappMessages.general),
    icon: "whatsapp",
  },
  highlight,
  visual = "services",
}: FinalCtaProps = {}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <Reveal y={30}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-gradient text-white shadow-[0_40px_80px_-40px_rgb(15_44_87/0.75)] sm:rounded-[2.5rem]">
            {/* Decoration */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_80%_50%,rgb(43_143_216/0.35),transparent_70%),radial-gradient(35%_60%_at_0%_100%,rgb(10_99_168/0.4),transparent_70%)]"
            />
            <span
              aria-hidden
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent"
            />
            <span
              aria-hidden
              className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="grid items-center gap-10 px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8 lg:px-14 lg:py-12">
              {/* ---------- Copy ---------- */}
              <div>
                {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
                <h2 className="mt-4 text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-[2.6rem]">
                  {title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
                  {description}
                </p>

                {highlight && (
                  <div className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-white/[0.07] py-3 pr-6 pl-3 ring-1 ring-white/15 backdrop-blur-md">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-gradient shadow-[0_10px_24px_-10px_rgb(43_143_216/0.9)]">
                      <ShieldCheck className="size-6" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display text-2xl leading-none font-extrabold tracking-tight">
                        {highlight.value}
                      </span>
                      <span className="mt-1 block text-xs font-semibold tracking-[0.14em] text-sky uppercase">
                        {highlight.label}
                      </span>
                    </span>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    href={primary.href}
                    variant="light"
                    size="lg"
                    icon={
                      <CalendarCheck
                        className="size-5 text-clinic"
                        aria-hidden
                      />
                    }
                  >
                    {primary.label}
                  </Button>
                  <Button
                    href={secondary.href}
                    variant="outline-light"
                    size="lg"
                    icon={
                      secondary.icon === "none" ? undefined : secondary.icon ===
                        "phone" ? (
                        <Phone className="size-4" aria-hidden />
                      ) : (
                        <MessageCircle className="size-5" aria-hidden />
                      )
                    }
                  >
                    {secondary.label}
                  </Button>
                </div>
              </div>

              {/* ---------- Listening visual ---------- */}
              {visual === "hearing-aids" ? (
                <HearingAidsVisual />
              ) : visual === "tinnitus" ? (
                <ServiceOrbitVisual chips={TINNITUS_CHIPS} label="Tinnitus management options" center={Ear} />
              ) : visual === "ear-wax" ? (
                <ServiceOrbitVisual chips={EAR_WAX_CHIPS} label="Ear wax removal care" center={ScanEye} />
              ) : (
                <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[19rem]">
                  <SoundRings animated className="inset-[12%] text-sky/50" />
                  <div
                    aria-hidden
                    className="absolute inset-[22%] rounded-full border border-white/10"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-[30%] rounded-full bg-white/[0.04] ring-1 ring-white/10"
                  />

                  <RadialBars />

                  {/* Central ear */}
                  <div className="absolute top-1/2 left-1/2 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-gradient shadow-[0_0_60px_rgb(43_143_216/0.55),0_20px_40px_-14px_rgb(0_0_0/0.6)] ring-4 ring-white/15">
                    <Ear className="size-8" aria-hidden />
                  </div>

                  {/* Orbiting service chips */}
                  <ul aria-label="Our services">
                    {services.map((service, i) => (
                      <li
                        key={service.href}
                        className={cn("absolute", ORBIT[i % ORBIT.length])}
                      >
                        <Link
                          href={service.href}
                          className={cn(
                            "flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 text-[0.7rem] font-semibold whitespace-nowrap text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-navy sm:text-xs",
                            i % 2 ? "float-slower" : "float-slow",
                          )}
                        >
                          <span className="grid size-6 place-items-center rounded-full bg-brand-gradient text-white">
                            <ServiceIcon
                              name={service.icon}
                              className="size-3"
                            />
                          </span>
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
