import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { cn, riseStep } from "@/lib/cn";
import { Equalizer, SoundRings, WaveLines } from "./SoundWave";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  /** Breadcrumb trail after "Home". The last entry is the current page. */
  crumbs: { label: string; href?: string }[];
  image?: SiteImage;
  imagePosition?: string;
  actions?: ReactNode;
  /** "compact": centred text, no side visual, shorter band. */
  variant?: "split" | "compact" | "background";
}

/** Inner-page hero: navy band with breadcrumb, H1 and an optional framed photo. */
export function PageHero({
  title,
  description,
  eyebrow,
  crumbs,
  image,
  imagePosition,
  actions,
  variant = "split",
}: PageHeroProps) {
  const background = variant === "background" && !!image;
  // "background" uses the compact (text-only) layout with `image` filling the hero.
  const compact = variant === "compact" || background;
  return (
    <section className="header-offset relative isolate overflow-hidden bg-navy-gradient text-white">
      {background && image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_31_62/0.96)_0%,rgb(15_44_87/0.88)_40%,rgb(15_44_87/0.55)_70%,rgb(15_44_87/0.35)_100%)]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/60 to-transparent" />
        </>
      )}
      {!background && <WaveLines className="inset-x-0 bottom-0 h-40 w-full text-sky/40" />}
      <SoundRings className="-top-40 -right-40 size-[34rem] text-white/10" />
      {compact && !background && <SoundRings className="-bottom-48 -left-40 size-[30rem] text-white/[0.07]" />}

      <div
        className={cn(
          "container-site relative grid items-center gap-12",
          background ? "py-20 sm:py-24 lg:py-32" : compact ? "py-16 sm:py-20 lg:py-24" : "py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24",
        )}
      >
        <div className={cn(compact && "max-w-3xl")}>
          <nav aria-label="Breadcrumb" className="rise mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              <li>
                <Link href="/" className="rounded transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" aria-hidden />
                  {crumb.href && i < crumbs.length - 1 ? (
                    <Link href={crumb.href} className="rounded transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={i === crumbs.length - 1 ? "page" : undefined} className="text-white/90">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && (
            <p className="eyebrow eyebrow-light rise mb-4" style={riseStep(1)}>
              {eyebrow}
            </p>
          )}
          <h1
            className="rise text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-[3.6rem]"
            style={riseStep(1)}
          >
            {title}
          </h1>
          <p
            className={cn("rise mt-5 text-base leading-relaxed text-white/75", compact ? "max-w-2xl" : "max-w-xl")}
            style={riseStep(2)}
          >
            {description}
          </p>
          {actions && (
            <div className="rise mt-9 flex flex-wrap gap-3" style={riseStep(3)}>
              {actions}
            </div>
          )}
        </div>

        {image && !background ? (
          <div className="zoom-in relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-navy shadow-lift sm:left-8">
              <Equalizer className="h-7 text-sky" bars={9} />
              <span className="text-sm font-semibold">HearWell Audiology Clinic</span>
            </div>
          </div>
        ) : compact ? null : (
          <div aria-hidden className="relative hidden h-64 lg:block">
            <Equalizer className="absolute inset-0 m-auto h-40 w-fit gap-2 text-sky/70" barClassName="w-2" />
          </div>
        )}
      </div>
    </section>
  );
}
