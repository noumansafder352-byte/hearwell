import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

interface SplitMediaProps {
  image: SiteImage;
  children: ReactNode;
  /** Put the image on the right on large screens. */
  reverse?: boolean;
  /** Small overlay card on the photo. */
  badge?: ReactNode;
  aspect?: string;
  objectPosition?: string;
}

/** Photo + content two-column layout with an offset brand panel behind the photo. */
export function SplitMedia({
  image,
  children,
  reverse = false,
  badge,
  aspect = "aspect-[4/3.4]",
  objectPosition = "center",
}: SplitMediaProps) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className={cn("relative", reverse && "lg:order-2")}>
        <div
          aria-hidden
          className={cn(
            "absolute -bottom-3 h-3/4 w-3/4 rounded-[2rem] bg-brand-gradient opacity-90 sm:-bottom-5",
            reverse ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5",
          )}
        />
        <div className={cn("relative overflow-hidden rounded-[2rem] shadow-lift", aspect)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] hover:scale-[1.03]"
            style={{ objectPosition }}
          />
        </div>
        {badge && (
          <div className={cn("absolute -bottom-6 z-10", reverse ? "left-4 sm:-left-6" : "right-4 sm:-right-6")}>
            {badge}
          </div>
        )}
      </Reveal>
      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        {children}
      </Reveal>
    </div>
  );
}
