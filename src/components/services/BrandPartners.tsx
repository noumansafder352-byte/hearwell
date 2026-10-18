import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/hearing-aids";
import { cn } from "@/lib/cn";

type Brand = (typeof brands.items)[number];

/** One logo card: navy at rest, the brand's own colours on hover. */
function LogoTile({ brand }: { brand: Brand }) {
  return (
    <div
      className={cn(
        "group relative grid h-24 w-36 place-items-center rounded-2xl bg-white shadow-[0_12px_30px_-22px_rgb(15_44_87/0.45)] ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgb(15_44_87/0.55)] sm:h-32 sm:w-56",
        // Logos that need a dark ground (e.g. yellow wordmarks) get one on hover.
        brand.dark && "hover:bg-[#111] hover:ring-[#111]",
      )}
    >
      <div className={cn("relative", brand.display)}>
        <Image
          src={`/images/brands/${brand.slug}-mono.webp`}
          alt=""
          width={brand.width}
          height={brand.height}
          className="h-full w-auto opacity-75 transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={`/images/brands/${brand.slug}.webp`}
          alt=""
          width={brand.width}
          height={brand.height}
          className="absolute inset-0 h-full w-auto opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <span
        aria-hidden
        className="absolute bottom-3.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-gradient transition-all duration-500 group-hover:w-10"
      />
    </div>
  );
}

/**
 * Hearing Aids — "Our Technology Partners": an endless, auto-scrolling strip of
 * individual brand-logo cards. Pauses on hover; static with reduced motion.
 */
export function BrandPartners() {
  // Each half of the track repeats the logos so it is always wider than the panel.
  const strip = [...brands.items, ...brands.items];

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading align="center" eyebrow={brands.eyebrow} title={brands.title} description={brands.description} />

        <Reveal y={30} className="mt-12">
          {/* Screen readers get the brand names once; the moving strip is decorative. */}
          <ul className="sr-only">
            {brands.items.map((brand) => (
              <li key={brand.slug}>{brand.name}</li>
            ))}
          </ul>

          {/* Vertical padding leaves room for the hover lift and shadow. */}
          <div aria-hidden className="marquee overflow-hidden py-6">
            <div className="marquee-track flex w-max" style={{ "--marquee-duration": "40s" } as CSSProperties}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {strip.map((brand, i) => (
                    <div key={`${brand.slug}-${i}`} className="mx-2.5 sm:mx-3">
                      <LogoTile brand={brand} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
