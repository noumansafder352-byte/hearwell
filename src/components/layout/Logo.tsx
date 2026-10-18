import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Official HearWell logo with a transparent background (generated from the original
 * by scripts/make-logo-transparent.mjs) so it sits cleanly on the glass header.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="HearWell Audiology Clinic — home" className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/images/hearwell-logo-header.webp"
        alt="HearWell Audiology Clinic"
        width={720}
        height={190}
        priority={priority}
        className="h-full w-auto"
      />
    </Link>
  );
}
