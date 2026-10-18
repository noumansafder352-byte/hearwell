import type { ImageKey } from "./images";

export const blogHero = {
  title: "Our Blog",
  description: "Hearing care guidance and insights from HearWell Audiology Clinic.",
};

export const blogCategories = ["Hearing Aids", "Hearing Health", "News"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
  /** URL segment: the article lives at /blog/<slug>/. */
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  image: ImageKey;
  /** Optional focal point for the card photo. */
  imagePosition?: string;
  /** Publication date, ISO format (YYYY-MM-DD). */
  date?: string;
  author?: string;
}

/**
 * Article cards for the blog index, newest first (card copy and photos supplied by the clinic).
 * Each card's article content lives in ./articles.ts under the same slug.
 */
export const blogPosts: BlogPost[] = [
  {
    // Supplied by the clinic.
    slug: "why-your-hearing-aid-is-not-helping-in-noise",
    title: "Why Your Hearing Aid Is Not Helping You Hear Clearly in Noise: 9 Reasons",
    excerpt:
      "Still struggling to understand speech in noisy places despite wearing hearing aids? Discover 9 common reasons including …",
    category: "Hearing Aids",
    image: "blogNoise",
    date: "2026-10-06",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "why-are-my-hearing-aids-not-helping-me-hear-clearly",
    title: "Why Are My Hearing Aids Not Helping Me Hear Clearly? 05 Common Problems & Solutions",
    excerpt:
      "Hearing aids can improve access to sound, but unclear speech, excessive loudness, background noise, discomfort, or sudde…",
    category: "Hearing Aids",
    image: "blogNotHearingClearly",
    imagePosition: "center 20%",
    date: "2026-09-29",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "hearing-aid-fitting-rawalpindi-islamabad",
    title: "Hearing Aid Fitting in Rawalpindi & Islamabad: How to Get the Best Results From Your Hearing Aids",
    excerpt:
      "Discover how professional hearing aid fitting, programming, REM verification, and fine-tuning can help you get better re…",
    category: "Hearing Aids",
    image: "blogHearingAidFitting",
    date: "2026-09-12",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "types-of-hearing-aids-explained",
    title: "Types of Hearing Aids Explained: Styles, Technology Levels & How to Choose the Right One",
    excerpt:
      "Confused about hearing aid options? This guide explains different hearing aid styles, technology levels, and prices in P…",
    category: "Hearing Health",
    image: "blogHearingAidTypes",
    date: "2026-05-06",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "where-to-buy-original-hearing-aids-rawalpindi-islamabad",
    title: "Where to Buy Original Hearing Aids in Rawalpindi & Islamabad (Avoid Fake Devices)",
    excerpt:
      "Buying hearing aids in Rawalpindi or Islamabad can be confusing due to fake devices and misleading prices. This clinical…",
    category: "Hearing Health",
    image: "blogOriginalHearingAids",
    date: "2026-05-02",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "invisible-vs-rechargeable-hearing-aids",
    title: "Invisible vs Rechargeable Hearing Aids - Which is Better for You? (2026 Guide)",
    excerpt:
      "Confused between invisible and rechargeable hearing aids? This 2026 guide explains key differences, benefits, costs, and…",
    category: "Hearing Health",
    image: "blogInvisibleVsRechargeable",
    date: "2026-04-23",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "hearing-test-rawalpindi-islamabad-guide",
    title: "Hearing Test in Rawalpindi & Islamabad: What to Expect, Cost & Complete Process Explained (2026 Guide)",
    excerpt:
      "Hearing test in Rawalpindi & Islamabad - learn the process, costs, and where to get accurate diagnosis with expert audio…",
    category: "Hearing Health",
    image: "blogHearingTest",
    date: "2026-04-17",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "deep-neural-networks-in-hearing-aids",
    title: "Deep Neural Networks (DNNs) in Hearing Aids: A Revolution in Speech Clarity & Signal-to-Noise Ratio",
    excerpt:
      "Discover how Deep Neural Networks (DNNs) and AI-powered hearing aids are transforming speech clarity in noise by signifi…",
    category: "Hearing Aids",
    image: "blogDnnHearingAids",
    date: "2026-04-15",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "do-you-really-need-a-hearing-aid-7-signs",
    title: "Do You Really Need a Hearing Aid? 7 Signs You Should Not Ignore",
    excerpt:
      "Struggling to hear clearly or constantly asking others to repeat themselves? Discover the 7 key signs of hearing loss yo…",
    category: "Hearing Health",
    image: "blogSevenSigns",
    date: "2026-04-15",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "hearing-aid-prices-in-pakistan",
    title: "Hearing Aid Prices in Pakistan (2026): Complete Guide for Islamabad & Rawalpindi Patients",
    excerpt:
      "If you are considering a hearing aid in 2026, the first question is usually price. In Pakistan, particularly in Islamaba…",
    category: "Hearing Aids",
    image: "blogHearingAidPrices",
    date: "2026-04-13",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "top-5-hearing-aids-of-2026",
    title: "Top 5 Hearing Aids of 2026 - Expert Audiologist Guide (2026)",
    excerpt:
      "Hearing aid technology in 2026 emphasizes AI-driven sound processing, real-time environmental adaptation, and deep neura…",
    category: "Hearing Aids",
    image: "blogTopHearingAids",
    date: "2026-04-04",
    author: "HearWell Team",
  },
  {
    // Supplied by the clinic.
    slug: "top-5-audiologists-rawalpindi-islamabad",
    title: "Top 5 Audiologists in Rawalpindi & Islamabad (2026) – Expert Guide",
    excerpt:
      "This blog highlights the top audiology centers in Rawalpindi, with HearWell Audiology Clinic ranked as the top recommend…",
    category: "News",
    image: "blogTopAudiologists",
    date: "2026-04-03",
    author: "HearWell Team",
  },
];
