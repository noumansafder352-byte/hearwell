import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageSeo {
  title: string;
  description: string;
  /** Route path, e.g. "/about". */
  path: string;
}

/** Per-page metadata with Open Graph, plus a canonical URL once the production domain is confirmed. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const url = path === "/" ? "/" : `${path}/`;
  return {
    title,
    description,
    ...(siteConfig.hasConfirmedDomain ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_PK",
      type: "website",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}

/**
 * schema.org structured data. Contains only details confirmed in the approved
 * content — no ratings, reviews, coordinates or credentials.
 */
export function clinicJsonLd() {
  const { name, url, contact, address, hours, hasConfirmedDomain } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name,
    // Absolute URLs only once the production domain is known (never the placeholder).
    ...(hasConfirmedDomain
      ? { url, logo: `${url}/images/hearwell-logo.webp`, image: `${url}/images/og-image.jpg` }
      : {}),
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    openingHours: hours.schema,
    description: siteConfig.description,
  };
}
