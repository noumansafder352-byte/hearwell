import { cn } from "@/lib/cn";

/** Heights (0–1) shaped like a soft speech envelope. */
const PROFILE = [0.25, 0.4, 0.6, 0.45, 0.8, 1, 0.7, 0.9, 0.55, 0.75, 0.4, 0.6, 0.3, 0.5, 0.22];

interface EqualizerProps {
  className?: string;
  barClassName?: string;
  bars?: number;
  animated?: boolean;
}

/** Equaliser-style bars — the site's recurring "sound" motif. Purely decorative. */
export function Equalizer({ className, barClassName, bars = PROFILE.length, animated = true }: EqualizerProps) {
  return (
    // A <span> (not <div>) so it's valid inside paragraphs, links and buttons.
    <span
      aria-hidden
      className={cn(
        "flex items-center",
        // Defaults only apply when the caller doesn't set its own height / gap.
        !/(^|\s)(\w+:)?h-/.test(className ?? "") && "h-10",
        !/(^|\s)(\w+:)?gap-/.test(className ?? "") && "gap-[3px]",
        className,
      )}
    >
      {Array.from({ length: bars }, (_, i) => {
        const h = PROFILE[i % PROFILE.length];
        return (
          <span
            key={i}
            className={cn("w-[3px] rounded-full bg-current", animated && "hw-bar", barClassName)}
            style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${(i * 0.11) % 1.8}s` }}
          />
        );
      })}
    </span>
  );
}

/** Concentric arcs radiating from a point, like sound leaving a source. */
export function SoundRings({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("absolute inset-0 rounded-full border border-current", animated && "hw-ripple")}
          style={
            animated
              ? // Negative delays start each ring mid-cycle, so none sits static at full size before its turn.
                { animationDelay: `-${i * 0.9}s` }
              : { transform: `scale(${0.4 + i * 0.2})`, opacity: 0.55 - i * 0.12 }
          }
        />
      ))}
    </div>
  );
}

/** Flowing wave lines for section backgrounds. */
export function WaveLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      viewBox="0 0 1200 240"
      fill="none"
      preserveAspectRatio="none"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 6} C 200 ${40 - i * 8}, 400 ${200 + i * 8}, 600 ${120 + i * 4} S 1000 ${30 - i * 6}, 1200 ${120 + i * 6}`}
          stroke="currentColor"
          strokeWidth={1.2}
          opacity={0.5 - i * 0.08}
        />
      ))}
    </svg>
  );
}
