import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { whoWeHelp } from "@/data/home";
import { images, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** Photo for each group, in the same order as whoWeHelp.groups. */
const GROUP_IMAGES: { key: ImageKey; position: string }[] = [
  { key: "childHeadphones", position: "50% 30%" },
  { key: "adultCuppingEar", position: "50% 40%" },
  { key: "hearingAidInEar", position: "45% 50%" },
  { key: "tinnitusCoverEar", position: "68% 40%" },
];

/**
 * Section 8 — "Hearing Care for Every Stage of Life".
 * Gallery of portrait photo tiles, each with a frosted caption card overlapping
 * its lower edge; alternate tiles are offset for rhythm on desktop.
 */
export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(45%_50%_at_100%_0%,rgb(43_143_216/0.14),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(10_99_168/0.08),transparent_70%)]"
      />
      <div className="container-site relative">
        {/* ---------- Header ---------- */}
        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">{whoWeHelp.eyebrow}</p>
            <h2 id="who-title" className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]">
              {whoWeHelp.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-navy/70">{whoWeHelp.description}</p>
        </Reveal>

        {/* ---------- Gallery ---------- */}
        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5 xl:pb-12">
          {whoWeHelp.groups.map(({ title, description, icon: Icon }, i) => {
            const { key, position } = GROUP_IMAGES[i % GROUP_IMAGES.length];
            const photo = images[key];
            return (
              <StaggerItem as="li" key={title} className={cn("group", i % 2 === 1 && "xl:translate-y-12")}>
                <article className="relative flex h-full flex-col transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
                  {/* Photo */}
                  <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.75rem] shadow-[0_24px_48px_-28px_rgb(15_44_87/0.6)]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                      style={{ objectPosition: position }}
                    />
                    {/* Brand tone wash so all photos share the palette */}
                    <div className="absolute inset-0 bg-clinic/25 mix-blend-color" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
                    <span
                      aria-hidden
                      className="absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 font-display text-xs font-bold tracking-wider text-white ring-1 ring-white/30 backdrop-blur-md"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Overlapping caption card */}
                  <div className="glass glass-strong relative -mt-20 mx-3 flex flex-1 flex-col rounded-3xl p-5 sm:mx-4 sm:p-6">
                    <span
                      aria-hidden
                      className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[0_10px_22px_-10px_rgb(10_99_168/0.9)] transition-transform duration-500 group-hover:-rotate-6"
                    >
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-5 text-lg leading-snug font-bold text-navy">{title}</h3>
                    <p className="mt-2 leading-relaxed text-navy/70">{description}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ---------- Help line ---------- */}
        <Reveal className="mt-14 flex justify-center">
          <p className="glass-chip inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full px-5 py-3 text-center text-navy/75">
            <MessageCircle className="size-4 text-clinic" aria-hidden />
            Unsure which service you need?
            <a
              href={whatsappUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-clinic underline decoration-sky decoration-2 underline-offset-4 hover:text-navy"
            >
              Ask us on WhatsApp
            </a>
            or call {siteConfig.contact.phoneDisplay}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
