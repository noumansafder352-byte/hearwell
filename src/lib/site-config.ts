/**
 * Central business details. Every page, the header, footer, structured data
 * and WhatsApp links read from here — update a value once and it changes site-wide.
 */
export const siteConfig = {
  name: "HearWell Audiology Clinic",
  shortName: "HearWell",
  description:
    "Professional hearing care in Rawalpindi — hearing tests, hearing aids, tinnitus management and ear wax removal at Nelson Medical Complex, Saddar.",

  /**
   * Production URL, used for the sitemap, robots.txt, Open Graph, structured data and
   * canonical URLs. NEXT_PUBLIC_SITE_URL overrides it, e.g. for a staging build.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://hearwell.pk").replace(/\/$/, ""),
  hasConfirmedDomain: true,

  contact: {
    /** Display format. */
    phoneDisplay: "0345 0992968",
    /** tel: link in international format. */
    phoneHref: "tel:+923450992968",
    /**
     * WhatsApp click-to-chat number: country code + number, digits only.
     * wa.me does not accept the local leading 0 (03450992968), so Pakistan's
     * +92 replaces it: 0345 0992968 → 923450992968.
     */
    whatsappNumber: "923450992968",
    email: "hearwell902@gmail.com",
  },

  address: {
    short: "Nelson Medical Complex, Saddar, Rawalpindi",
    full: "1st Floor, Nelson Medical Complex, Abid Majeed Road, opposite MH Gate 6, Saddar, Rawalpindi.",
    contactPage: "1st Floor, Nelson Medical Complex, Abid Majeed Road, Saddar, Rawalpindi.",
    streetAddress: "1st Floor, Nelson Medical Complex, Abid Majeed Road, opposite MH Gate 6, Saddar",
    locality: "Rawalpindi",
    region: "Punjab",
    country: "PK",
  },

  hours: {
    short: "Mon–Sat: 10:00 AM–8:00 PM",
    long: "Monday–Saturday: 10:00 AM–8:00 PM",
    /** schema.org openingHours format. */
    schema: "Mo-Sa 10:00-20:00",
  },

  map: {
    /**
     * TODO(owner): replace with the clinic's verified Google Maps place link and
     * embed URL ("Share → Embed a map" in Google Maps). Until then both use an
     * address search, which never points at invented coordinates.
     */
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Nelson+Medical+Complex%2C+Abid+Majeed+Road%2C+Saddar%2C+Rawalpindi",
    embedUrl:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sNelson+Medical+Complex,+Abid+Majeed+Road,+Saddar,+Rawalpindi!6i16",
  },

  /**
   * Social profiles. The top bar always shows Facebook, Instagram and TikTok; an
   * icon only becomes a link once its URL is filled in. The footer shows only the
   * profiles that have a URL.
   * TODO(owner): add the real profile URLs.
   */
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
