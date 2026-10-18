import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Equalizer } from "@/components/ui/SoundWave";
import { whyChoose } from "@/data/home";
import { images } from "@/data/images";

/**
 * Section 5 — "The HearWell Difference".
 * Bento layout: a tall photo-backed feature card for the first point, the other
 * four in a 2×2 grid of light cards.
 */
export function WhyChoose() {
  const [featured, ...rest] = whyChoose.items;
  const FeaturedIcon = featured.icon;
  const photo = images.consultationSpecialist;

  return (
    <section aria-labelledby="why-title" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        {/* ---------- Header ---------- */}
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">{whyChoose.eyebrow}</p>
            <h2 id="why-title" className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]">
              {whyChoose.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-navy/70">{whyChoose.description}</p>
        </Reveal>

        {/* ---------- Bento ---------- */}
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Featured card */}
          <StaggerItem
            as="article"
            className="group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-navy p-7 text-white shadow-[0_30px_60px_-34px_rgb(15_44_87/0.8)] sm:p-9 lg:min-h-full"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="-z-20 object-cover object-[60%_center] transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_31_62/0.97)_0%,rgb(15_44_87/0.88)_45%,rgb(15_44_87/0.35)_100%)]"
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-white/10 ring-inset" />

            <div className="flex items-start justify-between">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-colors duration-500 group-hover:bg-brand-gradient">
                <FeaturedIcon className="size-6" aria-hidden />
              </span>
              <span
                aria-hidden
                className="font-display text-6xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.45)]"
              >
                01
              </span>
            </div>

            <div>
              <Equalizer className="mb-5 h-8 text-sky" bars={13} />
              <h3 className="text-2xl font-bold sm:text-[1.75rem]">{featured.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">{featured.description}</p>
            </div>
          </StaggerItem>

          {/* Remaining four */}
          <ul className="grid gap-5 sm:grid-cols-2">
            {rest.map(({ title, description, icon: Icon }, i) => (
              <StaggerItem
                as="li"
                key={title}
                className="group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-mist/70 p-7 ring-1 ring-line transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-white hover:shadow-lift hover:ring-sky/30"
              >
                {/* Gradient top border that draws in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-clinic to-sky transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                />
                {/* Faint sound-wave watermark */}
                <Equalizer
                  className="pointer-events-none absolute -right-2 -bottom-2 -z-10 h-24 gap-1.5 text-clinic/[0.07]"
                  barClassName="w-1.5"
                  bars={9}
                  animated={false}
                />

                <div className="flex items-start justify-between">
                  <span
                    aria-hidden
                    className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[0_10px_22px_-12px_rgb(10_99_168/0.9)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-6"
                  >
                    <Icon className="size-[22px]" />
                  </span>
                  <span aria-hidden className="font-display text-sm font-bold text-navy/70 tabular-nums">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-lg leading-snug font-bold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-navy/70">{description}</p>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}
