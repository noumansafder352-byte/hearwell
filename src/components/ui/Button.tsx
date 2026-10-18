import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "link";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "disabled:pointer-events-none disabled:opacity-60";

/** Every button variant shares the hero/header hover: light sweep + lift + stronger shadow (see .btn-fx). */
const fx = "btn-fx btn-sheen";

const variants: Record<Variant, string> = {
  primary: `${fx} bg-brand-gradient text-white shadow-[0_14px_30px_-14px_rgb(10_99_168/0.85)] hover:shadow-[0_20px_38px_-14px_rgb(10_99_168/0.95)]`,
  secondary: `${fx} btn-sheen-blue border border-line bg-white text-navy shadow-soft hover:border-sky/60 hover:text-clinic hover:shadow-lift`,
  light: `${fx} btn-sheen-blue bg-white text-navy shadow-[0_12px_26px_-14px_rgb(0_0_0/0.5)] hover:shadow-[0_18px_34px_-14px_rgb(0_0_0/0.6)]`,
  "outline-light": `${fx} border border-white/35 text-white hover:border-white/70 hover:bg-white/10 hover:shadow-[0_16px_32px_-16px_rgb(0_0_0/0.6)]`,
  link: "px-0! py-0! text-clinic hover:text-navy rounded-md transition-colors",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

interface ButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  /** Shows a sliding arrow-like icon after the label. */
  trailingIcon?: ReactNode;
  children: ReactNode;
}

/**
 * Link styled as a button. Internal paths use next/link; external, tel:, mailto:
 * and wa.me links render a plain anchor (wa.me opens in a new tab).
 */
export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailingIcon && (
        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">{trailingIcon}</span>
      )}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
