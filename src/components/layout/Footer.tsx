import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { quickLinks, services } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { SocialIcons } from "@/components/ui/SocialIcons";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-sm font-bold tracking-[0.14em] text-white uppercase">
      {children}
      <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-gradient-to-r from-clinic to-sky" />
    </h2>
  );
}

const linkClass =
  "group inline-flex items-center gap-1.5 rounded text-sm text-white/65 transition-colors duration-300 hover:text-white";

/** Link label with a small chevron that slides in on hover. */
function LinkLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <ChevronRight
        aria-hidden
        className="-ml-5 size-3.5 text-sky opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
      />
      <span className="transition-transform duration-300">{children}</span>
    </>
  );
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3.5">
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-sky ring-1 ring-white/10 [&_svg]:size-[18px]"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] tracking-[0.12em] text-white/45 uppercase">{label}</span>
        <span className="mt-0.5 block text-sm text-white/80">{children}</span>
      </span>
    </li>
  );
}

export function Footer() {
  const { contact, address, hours } = siteConfig;

  return (
    <footer className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background glow + top hairline */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_100%_0%,rgb(43_143_216/0.16),transparent_70%),radial-gradient(35%_50%_at_0%_100%,rgb(10_99_168/0.18),transparent_70%)]"
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />

      <div className="container-site pt-16 pb-7 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 xl:grid-cols-[1.25fr_0.75fr_0.9fr_1.4fr] xl:gap-x-14">
          {/* Column 1 — About HearWell */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              aria-label="HearWell Audiology Clinic — home"
              className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_-16px_rgb(0_0_0/0.6)]"
            >
              <Image
                src="/images/hearwell-logo-header.webp"
                alt="HearWell Audiology Clinic"
                width={720}
                height={190}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Providing professional hearing care in Rawalpindi, with services including hearing tests, hearing aids,
              tinnitus management, and ear wax removal.
            </p>
            <SocialIcons
              className="mt-7 gap-2"
              itemClassName="size-10! border-white/10! bg-white/[0.06]! text-white! shadow-none! backdrop-blur-none! [&_svg]:size-4!"
            />
          </div>

          {/* Column 2 — Quick Links */}
          <nav aria-label="Quick links">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="grid gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("whatsapp:") ? (
                    <a
                      href={whatsappUrl(whatsappMessages.appointment)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <LinkLabel>{link.label}</LinkLabel>
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      <LinkLabel>{link.label}</LinkLabel>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Our Services */}
          <nav aria-label="Our services">
            <FooterHeading>Our Services</FooterHeading>
            <ul className="grid gap-3.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={linkClass}>
                    <LinkLabel>{service.label}</LinkLabel>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Contact Information */}
          <div className="col-span-2 sm:col-span-1">
            <FooterHeading>Contact Information</FooterHeading>
            <ul className="grid gap-5">
              <ContactItem icon={<MapPin />} label="Address">
                <a
                  href={siteConfig.map.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {address.full}
                </a>
              </ContactItem>
              <ContactItem icon={<Phone />} label="Phone & WhatsApp">
                <a href={contact.phoneHref} className="whitespace-nowrap text-white transition-colors hover:text-sky">
                  {contact.phoneDisplay}
                </a>
              </ContactItem>
              <ContactItem icon={<Mail />} label="Email">
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white sm:break-normal">
                  {contact.email}
                </a>
              </ContactItem>
              <ContactItem icon={<Clock />} label="Clinic Hours">
                {hours.long}
              </ContactItem>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HearWell Audiology Clinic. All rights reserved.</p>
          <a
            href="#main"
            className="group inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-4 text-white/70 ring-1 ring-white/15 transition-colors hover:text-white hover:ring-white/30"
          >
            Back to top
            <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-brand-gradient">
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
