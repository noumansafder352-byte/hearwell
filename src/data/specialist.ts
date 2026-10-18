import type { SiteImage } from "./images";

/**
 * Specialist profile, shared by the Home and About pages.
 *
 * The approved content asks for his association with HearWell, qualifications
 * and expertise to be confirmed before publication. While `verified` is false the
 * approved wording ("is presented on the existing website as…") is shown verbatim.
 * After the clinic confirms the details, set `verified: true` to use the direct
 * wording, and optionally add a real, consented `photo`.
 */
export const specialist = {
  verified: false,
  name: "Dr. Suleman Bukhari",
  shortName: "Dr. Bukhari",
  initials: "SB",
  designation: "Clinical Audiologist",
  photo: null as SiteImage | null,
  expertise: [
    "Diagnostic hearing evaluations",
    "Hearing aid fittings",
    "Tinnitus management",
    "Vestibular assessments",
  ],
  home: {
    eyebrow: "Our Specialist",
    intro: {
      pending:
        "Dr. Suleman Bukhari is presented on the existing website as an experienced clinical audiologist dedicated to helping people experiencing hearing and balance difficulties.",
      verified:
        "Dr. Suleman Bukhari is an experienced clinical audiologist dedicated to helping people experiencing hearing and balance difficulties.",
    },
    body: "His stated areas of expertise include diagnostic hearing evaluations, hearing aid fittings, tinnitus management, and vestibular assessments. His approach focuses on understanding each patient's concerns and providing appropriate, individualized care.",
  },
  about: {
    eyebrow: "Our Specialist",
    intro: {
      pending:
        "Dr. Suleman Bukhari is described on the existing website as an experienced clinical audiologist dedicated to helping individuals experiencing hearing and balance difficulties.",
      verified:
        "Dr. Suleman Bukhari is an experienced clinical audiologist dedicated to helping individuals experiencing hearing and balance difficulties.",
    },
    body: "His stated areas of expertise include diagnostic hearing evaluations, hearing aid fittings, tinnitus management, and vestibular assessments. He focuses on understanding patients' concerns and providing professional guidance tailored to their needs.",
  },
  cta: "Book a Consultation",
};
