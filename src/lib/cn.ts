import type { CSSProperties } from "react";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Step index for the CSS `.rise` entrance animation (staggers by 90ms per step). */
export function riseStep(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
