import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy-gradient text-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
}

/** Standard vertical rhythm + container for a page section. */
export function Section({ children, tone = "white", id, className, containerClassName, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-28", tones[tone], className)} {...rest}>
      <div className={cn("container-site relative", containerClassName)}>{children}</div>
    </section>
  );
}
