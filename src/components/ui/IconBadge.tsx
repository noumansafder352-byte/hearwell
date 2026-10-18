import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Rounded square holding a feature icon; lifts slightly when its `group` card is hovered. */
export function IconBadge({
  children,
  tone = "mist",
  className,
}: {
  children: ReactNode;
  tone?: "mist" | "blue" | "glass";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:rotate-[-4deg] [&_svg]:size-[22px]",
        tone === "mist" && "bg-mist text-clinic ring-1 ring-line",
        tone === "blue" && "bg-brand-gradient text-white shadow-[0_10px_22px_-12px_rgb(10_99_168/0.9)]",
        tone === "glass" && "bg-white/10 text-white ring-1 ring-white/15",
        className,
      )}
    >
      {children}
    </span>
  );
}
