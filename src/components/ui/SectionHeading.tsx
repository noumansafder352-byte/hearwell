import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  /** Heading level; pages keep a single h1 in their hero. */
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center [&_.eyebrow]:justify-center",
        className,
      )}
    >
      {eyebrow && <p className={cn("eyebrow mb-4", light && "eyebrow-light")}>{eyebrow}</p>}
      <Heading
        className={cn(
          "text-[1.9rem] leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed", light ? "text-white/75" : "text-navy/70")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
