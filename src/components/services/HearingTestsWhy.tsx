import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { hearingTestsWhy } from "@/data/hearing-tests";

/** Decorative audiogram-style result graphic; draws its lines in when visible. */
function AudiogramGraphic() {
  const freqs = ["250", "500", "1k", "2k", "4k", "8k"];
  const W = 320;
  const H = 170;
  const x = (i: number) => 34 + (i * (W - 50)) / (freqs.length - 1);
  const y = (db: number) => 14 + (db / 80) * (H - 40);
  const right = [10, 15, 15, 25, 40, 45];
  const left = [15, 20, 20, 30, 45, 55];
  const path = (v: number[]) => v.map((d, i) => `${i ? "L" : "M"}${x(i)} ${y(d)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      {[0, 20, 40, 60, 80].map((db) => (
        <g key={db}>
          <line x1={34} x2={W - 16} y1={y(db)} y2={y(db)} stroke="#DBE5F0" />
          <text x={26} y={y(db) + 3} textAnchor="end" fontSize="8" fill="#6F7378">
            {db}
          </text>
        </g>
      ))}
      {freqs.map((f, i) => (
        <text key={f} x={x(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="#6F7378">
          {f}
        </text>
      ))}
      <path d={path(right)} pathLength={1} className="draw" fill="none" stroke="#0A63A8" strokeWidth={2.4} strokeLinejoin="round" />
      <path
        d={path(left)}
        pathLength={1}
        className="draw"
        style={{ ["--draw-delay" as string]: "0.9s" }}
        fill="none"
        stroke="#2B8FD8"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      {right.map((d, i) => (
        <circle key={`r${i}`} cx={x(i)} cy={y(d)} r={3.8} fill="#fff" stroke="#0A63A8" strokeWidth={2} />
      ))}
      {left.map((d, i) => (
        <g key={`l${i}`} stroke="#2B8FD8" strokeWidth={2} strokeLinecap="round">
          <line x1={x(i) - 3.2} y1={y(d) - 3.2} x2={x(i) + 3.2} y2={y(d) + 3.2} />
          <line x1={x(i) + 3.2} y1={y(d) - 3.2} x2={x(i) - 3.2} y2={y(d) + 3.2} />
        </g>
      ))}
    </svg>
  );
}

/**
 * Hearing Tests — "The HearWell Difference". Editorial split: heading, description
 * and an audiogram graphic on the left; three points as open rows on the right.
 */
export function HearingTestsWhy() {
  return (
    <section aria-labelledby="ht-why-title" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{hearingTestsWhy.eyebrow}</p>
          <h2
            id="ht-why-title"
            className="mt-4 text-[1.9rem] leading-[1.12] font-bold text-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {hearingTestsWhy.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-navy/70">{hearingTestsWhy.description}</p>

          <div className="mt-10 max-w-md">
            <div className="mb-2 flex items-center justify-end gap-4 text-xs font-semibold text-silver">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2.5 rounded-full border-2 border-clinic" /> Right
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="text-sky">✕</span> Left
              </span>
            </div>
            <AudiogramGraphic />
          </div>
        </Reveal>

        <Stagger as="ul" className="divide-y divide-line border-y border-line">
          {hearingTestsWhy.items.map(({ title, description, icon: Icon }) => (
            <StaggerItem as="li" key={title} className="group flex gap-6 py-8">
              <span
                aria-hidden
                className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mist text-clinic ring-1 ring-line transition-all duration-500 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent"
              >
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-navy/70">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
