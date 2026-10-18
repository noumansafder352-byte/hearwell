import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { clinicJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime requests to Google.
const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Hearing Care in Rawalpindi`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F2C57",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Scroll-reveal content starts hidden until JavaScript animates it in; show it when scripts can't run. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
        <script
          type="application/ld+json"
          // Escape "<" so a value can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
