import type { SVGProps } from "react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

type IconProps = SVGProps<SVGSVGElement>;

/* Simple brand glyphs (lucide v1 no longer ships brand icons). */
export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21.5v-8h2.7l.45-3.2H13.5V8.3c0-.92.27-1.55 1.6-1.55h1.7V3.9a22 22 0 0 0-2.48-.13c-2.46 0-4.12 1.5-4.12 4.24v2.29H7.4v3.2h2.8v8h3.3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.6 3c.32 2.35 1.86 4.05 4.15 4.32v3.06a7.26 7.26 0 0 1-4.1-1.3v6.08A5.84 5.84 0 1 1 10.8 9.4v3.17a2.73 2.73 0 1 0 2.68 2.73V3h3.12Z" />
    </svg>
  );
}

const NETWORKS = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

/**
 * Facebook / Instagram / TikTok icon row. Icons with a URL in site-config link out;
 * icons without one are shown but not clickable until the URL is added.
 */
export function SocialIcons({ className, itemClassName }: { className?: string; itemClassName?: string }) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)} aria-label="HearWell on social media">
      {NETWORKS.map(({ key, label, Icon }) => {
        const url = siteConfig.social[key];
        const cls = cn(
          "glass-chip grid size-[2.125rem] place-items-center rounded-full text-navy transition-all duration-300 [&_svg]:size-3.5",
          url && "hover:-translate-y-0.5 hover:border-clinic hover:bg-clinic hover:text-white",
          itemClassName,
        );
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`HearWell on ${label}`} className={cls}>
                <Icon />
              </a>
            ) : (
              <span className={cls} title={label}>
                <Icon />
                <span className="sr-only">{label}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
