import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Equalizer, SoundRings } from "@/components/ui/SoundWave";
import { commitment } from "@/data/home";

/**
 * Section 2 — "Our Commitment to Better Hearing".
 * A floating navy showcase panel that bridges the mist hero and the white section
 * below it: heading + description on top, the four commitments in a single row
 * separated by hairline dividers.
 */
export function CommitmentPanel() {
  return (
    <section
      aria-labelledby="commitment-title"
      className="relative bg-[linear-gradient(to_bottom,var(--color-mist)_0%,#ffffff_100%)] pt-4 pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="container-site">
        <Reveal y={30}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-gradient px-6 py-12 text-white shadow-[0_40px_80px_-40px_rgb(15_44_87/0.7)] sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* ---------- Decoration ---------- */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_100%_0%,rgb(43_143_216/0.35),transparent_70%),radial-gradient(40%_60%_at_0%_100%,rgb(10_99_168/0.35),transparent_70%)]"
            />
            <SoundRings animated className="-right-40 -bottom-40 -z-10 size-[30rem] text-sky/20" />
            {/* Top hairline highlight */}
            <span
              aria-hidden
              className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent"
            />

            {/* ---------- Heading ---------- */}
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
              <div>
                <p className="eyebrow eyebrow-light">{commitment.eyebrow}</p>
                <h2
                  id="commitment-title"
                  className="mt-4 text-[1.9rem] leading-[1.12] font-bold sm:text-4xl lg:text-[2.7rem]"
                >
                  {commitment.title}
                </h2>
              </div>
              <div>
                <Equalizer className="mb-5 hidden h-10 text-sky/70 lg:flex" bars={15} />
                <p className="text-base leading-relaxed text-white/75">{commitment.description}</p>
              </div>
            </div>

            {/* Gradient divider */}
            <div aria-hidden className="mt-12 h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5 lg:mt-14" />

            {/* ---------- Four commitments ---------- */}
            <Stagger
              as="ul"
              className="mt-10 grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-white/10"
            >
              {commitment.indicators.map(({ title, description, icon: Icon }, i) => (
                <StaggerItem
                  as="li"
                  key={title}
                  className="group flex items-start gap-5 sm:block lg:px-8 lg:first:pl-0 lg:last:pr-0"
                >
                  <div className="flex shrink-0 items-center justify-between">
                    {/* Gradient-bordered icon tile */}
                    <span
                      aria-hidden
                      className="rounded-2xl bg-gradient-to-br from-sky/80 via-white/20 to-clinic/60 p-px transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1"
                    >
                      <span className="grid size-14 place-items-center rounded-[calc(1rem-1px)] bg-navy text-sky transition-[background-color,color,box-shadow] duration-500 group-hover:bg-clinic group-hover:text-white group-hover:shadow-[0_0_28px_rgb(43_143_216/0.55)]">
                        <Icon className="size-6" />
                      </span>
                    </span>
                    <span aria-hidden className="hidden font-display text-sm font-bold text-white/30 tabular-nums sm:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-sky sm:mt-6">
                      {title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-white/65 sm:mt-2">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
