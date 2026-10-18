"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarCheck, ChevronDown, Clock, Phone } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, services } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", bounce: 0.18, duration: 0.45 } as const;

function normalise(path: string) {
  return path !== "/" ? path.replace(/\/$/, "") : path;
}

function useIsActive() {
  const pathname = normalise(usePathname() ?? "/");
  return (href: string, isGroup = false) =>
    isGroup ? pathname.startsWith("/services") : href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Floating frosted-glass header. It is sticky and pulls the following content up
 * underneath itself (negative margin = --header-h), so heroes show through the glass.
 * It pulls the page up by its own height plus the top bar's, so the first section runs behind both;
 * heroes add the `header-offset` class to keep their content clear of them.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Viewport position of the bar's bottom edge, so the mobile panel fits the remaining screen.
  const [menuOffset, setMenuOffset] = useState(80);
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigation.
  useEffect(() => setMobileOpen(false), [pathname]);

  // Lock page scroll while the mobile menu is open; Escape closes it.
  useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const toggleMobile = () => {
    if (!mobileOpen && barRef.current) setMenuOffset(barRef.current.getBoundingClientRect().bottom);
    setMobileOpen((v) => !v);
  };

  return (
    <header className="pointer-events-none sticky top-0 z-50 mb-[calc(-1*(var(--header-h)+var(--topbar-h)))]">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            aria-hidden
            className="pointer-events-auto fixed inset-0 -z-10 bg-navy/30 backdrop-blur-[3px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="container-site pt-3 lg:pt-4">
        <div
          ref={barRef}
          className={cn(
            "glass pointer-events-auto relative flex h-[4.25rem] items-center justify-between gap-3 rounded-full pr-2 pl-4 transition-[background-color,box-shadow] duration-500 sm:pl-5 lg:h-[4.75rem] lg:pr-2.5 lg:pl-6",
            (scrolled || mobileOpen) && "glass-strong",
          )}
        >

          <Logo priority className="h-9 lg:h-10" />

          <DesktopNav />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={whatsappUrl(whatsappMessages.appointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fx btn-sheen inline-flex h-11 items-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_10px_24px_-10px_rgb(10_99_168/0.8)] hover:shadow-[0_14px_30px_-10px_rgb(10_99_168/0.9)] max-sm:hidden lg:h-12 lg:px-6"
            >
              <CalendarCheck className="size-4" aria-hidden />
              Book Appointment
            </a>

            <button
              type="button"
              className="relative grid size-11 place-items-center rounded-full bg-navy text-white shadow-[0_8px_18px_-8px_rgb(15_44_87/0.8)] transition-colors hover:bg-clinic lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobile}
            >
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 h-0.5 rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "w-0 opacity-0" : "w-3.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && <MobileMenu offset={menuOffset} onNavigate={() => setMobileOpen(false)} />}
        </AnimatePresence>
      </div>
    </header>
  );
}

/** Centre navigation with a hover highlight that glides between items and an active-page dot. */
function DesktopNav() {
  const [hovered, setHovered] = useState<string | null>(null);
  const isActive = useIsActive();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {mainNav.map((item) => {
          const key = item.label;
          const active = item.children ? isActive("/services", true) : isActive(item.href);
          return (
            <li key={key} className="relative" onMouseEnter={() => setHovered(key)}>
              {active && <ActiveUnderline />}
              {hovered === key && !active && (
                <motion.span
                  layoutId="nav-hover"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-navy/[0.06]"
                  transition={spring}
                />
              )}
              {item.children ? (
                <ServicesDropdown active={active} onFocus={() => setHovered(key)} />
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onFocus={() => setHovered(key)}
                  className={cn(
                    "relative inline-flex h-11 items-center rounded-full px-4 text-[0.92rem] font-semibold transition-colors xl:px-5",
                    active ? "text-clinic" : "text-navy/85 hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Slim gradient underline beneath the current page's label; glides to the new item on navigation. */
function ActiveUnderline() {
  return (
    <motion.span
      layoutId="nav-active"
      aria-hidden
      className="absolute inset-x-4 bottom-1.5 h-[2px] rounded-full bg-gradient-to-r from-clinic to-sky xl:inset-x-5"
      transition={spring}
    />
  );
}

function ServicesDropdown({ active, onFocus }: { active: boolean; onFocus: () => void }) {
  const [open, setOpen] = useState(false);
  const isActive = useIsActive();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Set when hover opened the menu, so the click that usually follows doesn't immediately close it.
  const openedByHover = useRef(false);
  const pathname = usePathname();

  const cancelClose = () => closeTimer.current && clearTimeout(closeTimer.current);
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        openedByHover.current = false;
        scheduleClose();
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onFocus={onFocus}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
        className={cn(
          "relative inline-flex h-11 items-center gap-1 rounded-full px-4 text-[0.92rem] font-semibold transition-colors xl:px-5",
          active || open ? "text-clinic" : "text-navy/85 hover:text-navy",
        )}
      >
        Services
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            initial={{ opacity: 0, y: 12, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease }}
            className="absolute top-full left-1/2 z-50 w-[42rem] -translate-x-1/2 pt-5"
          >
            <div className="glass-panel grid grid-cols-[1fr_14rem] gap-2 rounded-[1.75rem] p-2">
              <ul className="grid gap-1 p-1">
                {services.map((service) => {
                  const current = isActive(service.href);
                  return (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "group flex items-start gap-3.5 rounded-2xl p-3 transition-colors hover:bg-mist",
                          current && "bg-mist",
                        )}
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mist text-clinic ring-1 ring-line transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:ring-transparent">
                          <ServiceIcon name={service.icon} className="size-5" />
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center gap-1.5 font-semibold text-navy">
                            {service.label}
                            <ArrowRight
                              className="size-3.5 -translate-x-1 text-clinic opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-0.5 block text-sm text-silver">{service.blurb}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[1.35rem] bg-navy-gradient p-5 text-white">
                <span
                  aria-hidden
                  className="absolute -right-16 -bottom-16 -z-10 size-48 rounded-full border border-white/10"
                />
                <span
                  aria-hidden
                  className="absolute -right-8 -bottom-8 -z-10 size-32 rounded-full border border-white/10"
                />
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-sky uppercase">Not sure where to start?</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Tell us about your hearing concerns and we&apos;ll guide you to the right service.
                  </p>
                </div>
                <div className="mt-5 grid gap-2.5">
                  <p className="flex items-center gap-2 text-xs text-white/60">
                    <Clock className="size-3.5 text-sky" aria-hidden />
                    {siteConfig.hours.short}
                  </p>
                  <a
                    href={whatsappUrl(whatsappMessages.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-fx btn-sheen btn-sheen-blue group inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy hover:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]"
                  >
                    Ask on WhatsApp
                    <ArrowRight className="size-4 text-clinic transition-transform group-hover:translate-x-1" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ offset, onNavigate }: { offset: number; onNavigate: () => void }) {
  const isActive = useIsActive();
  const [servicesOpen, setServicesOpen] = useState(isActive("/services", true));

  const linkClass = (active: boolean) =>
    cn(
      "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors",
      active ? "bg-white text-clinic shadow-soft" : "text-navy hover:bg-white/70",
    );

  return (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, ease }}
      style={{ maxHeight: `calc(100dvh - ${Math.round(offset)}px - 1.25rem)` }}
      className="glass glass-strong pointer-events-auto mt-2 origin-top overflow-y-auto rounded-[1.75rem] lg:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col p-3">
        <ul className="grid gap-1">
          {mainNav.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.04 + i * 0.04 }}
            >
              {item.children ? (
                <>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setServicesOpen((v) => !v)}
                    className={linkClass(isActive("/services", true))}
                  >
                    Services
                    <ChevronDown
                      className={cn("size-5 transition-transform duration-300", servicesOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                  <div
                    id="mobile-services"
                    inert={!servicesOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <ul className="grid gap-1 overflow-hidden px-1 pt-1">
                      {item.children.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={onNavigate}
                            aria-current={isActive(service.href) ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors",
                              isActive(service.href) ? "bg-white/80 text-clinic" : "text-navy/80 hover:bg-white/60",
                            )}
                          >
                            <span className="grid size-9 place-items-center rounded-lg bg-mist text-clinic ring-1 ring-line">
                              <ServiceIcon name={service.icon} className="size-[18px]" />
                            </span>
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={linkClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>

        <div className="mt-3 grid gap-2.5 border-t border-navy/10 px-1 pt-4 pb-1">
          <a
            href={whatsappUrl(whatsappMessages.appointment)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fx btn-sheen inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand-gradient font-semibold text-white shadow-[0_10px_24px_-10px_rgb(10_99_168/0.8)] hover:shadow-[0_14px_30px_-10px_rgb(10_99_168/0.9)]"
          >
            <CalendarCheck className="size-5" aria-hidden />
            Book Appointment
          </a>
          <a
            href={siteConfig.contact.phoneHref}
            className="btn-fx btn-sheen btn-sheen-blue inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white font-semibold text-navy ring-1 ring-line hover:shadow-lift"
          >
            <Phone className="size-4 text-clinic" aria-hidden />
            Call {siteConfig.contact.phoneDisplay}
          </a>
          <p className="pt-1 text-center text-sm text-silver">{siteConfig.hours.long}</p>
        </div>
      </nav>
    </motion.div>
  );
}
