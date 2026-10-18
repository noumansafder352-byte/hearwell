import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { images } from "@/data/images";
import { services } from "@/data/navigation";

/**
 * Four image-led service cards: full-bleed photo under a navy gradient, number and
 * icon in frosted chips on top, title + approved summary + "Learn More" at the bottom.
 * The whole card is one link.
 */
export function ServicesGrid() {
  return (
    <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => {
        const photo = images[service.image];
        return (
          <StaggerItem as="li" key={service.href}>
            <Link
              href={service.href}
              className="group relative isolate flex h-full min-h-[23rem] flex-col sm:min-h-[26rem] justify-between overflow-hidden rounded-[1.75rem] bg-navy p-5 text-white shadow-[0_24px_50px_-28px_rgb(15_44_87/0.75)] ring-1 ring-navy/10 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-26px_rgb(10_99_168/0.75)] sm:p-6 lg:min-h-[28rem]"
            >
              {/* Photo */}
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                className="-z-20 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
              />
              {/* Readability gradient */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_31_62/0.97)_0%,rgb(15_44_87/0.9)_42%,rgb(15_44_87/0.35)_70%,rgb(15_44_87/0.15)_100%)] transition-opacity duration-500"
              />
              {/* Sky glow on hover */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_100%,rgb(43_143_216/0.35),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              {/* Inner hairline */}
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-white/10 ring-inset" />

              {/* Top row: number + icon */}
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 font-display text-xs font-bold tracking-wider text-white ring-1 ring-white/25 backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-500 group-hover:bg-brand-gradient group-hover:ring-sky/60">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
              </div>

              {/* Bottom content */}
              <div>
                <h3 className="text-[1.6rem] leading-tight font-bold">{service.label}</h3>
                {/*
                  Summary: collapsed on hover-capable devices and revealed on hover / keyboard focus
                  (the heading rises as it opens because the block is bottom-anchored).
                  Always visible on touch screens, which can't hover.
                */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-3 text-[0.95rem] leading-relaxed text-white/75 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:delay-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
                      {service.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="text-sm font-semibold">
                    Explore More
                    <span className="sr-only"> about {service.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-full ring-1 ring-white/30 transition-all duration-500 group-hover:bg-white group-hover:text-clinic group-hover:ring-white"
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
