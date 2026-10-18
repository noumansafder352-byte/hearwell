import { Clock, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

function Divider({ className }: { className?: string }) {
  return <span aria-hidden className={cn("h-4 w-px shrink-0 bg-navy/15", className)} />;
}

function ItemIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white transition-transform duration-300 group-hover:-translate-y-px [&_svg]:size-3.5"
    >
      {children}
    </span>
  );
}

/**
 * Transparent strip above the glass header. It overlays the page's first section
 * (see --topbar-h), so the hero runs behind it. Location, timings and phone share
 * one frosted pill on the left; social icons sit on the right.
 *
 * Visible items in the pill: phone only on small screens, + timings from md, + location from lg.
 */
export function TopBar() {
  const { address, contact, hours, map } = siteConfig;
  return (
    <div className="relative z-40 text-[0.8rem]">
      <div className="container-site">
        <div className="flex h-11 items-end justify-between gap-3 lg:px-2">
          <div className="glass-chip flex min-w-0 items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 font-medium text-navy">
            <a
              href={map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden min-w-0 items-center gap-2 transition-colors hover:text-clinic lg:flex"
            >
              <ItemIcon>
                <MapPin />
              </ItemIcon>
              <span className="truncate">
                <span className="sr-only">Clinic location (opens map): </span>
                {address.short}
              </span>
            </a>
            <Divider className="hidden lg:block" />

            <p className="hidden shrink-0 items-center gap-2 md:flex">
              <ItemIcon>
                <Clock />
              </ItemIcon>
              <span className="whitespace-nowrap">
                <span className="sr-only">Clinic hours: </span>
                {hours.short}
              </span>
            </p>
            <Divider className="hidden md:block" />

            <a
              href={contact.phoneHref}
              className="group flex shrink-0 items-center gap-2 font-semibold transition-colors hover:text-clinic"
            >
              <ItemIcon>
                <Phone />
              </ItemIcon>
              <span className="whitespace-nowrap">
                <span className="sr-only">Call </span>
                {contact.phoneDisplay}
              </span>
            </a>
          </div>

          <SocialIcons className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
