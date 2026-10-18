/**
 * Image manifest. All photos are free under the Unsplash License
 * (https://unsplash.com/license) and stored locally in /public/images/photos.
 * They are illustrative stock photography — none of the people shown are
 * HearWell staff or patients. Replace with real clinic photography when available
 * (see README → "Replacing images"); keep the same keys so pages update automatically.
 */
export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  source: string;
}

export const images = {
  consultationClinic: {
    src: "/images/photos/consultation-clinic.webp",
    alt: "A clinician listening to a patient during a consultation in a bright clinic room",
    width: 1400,
    height: 788,
    credit: "Vitaly Gariev",
    source: "https://unsplash.com/photos/MJmsLpeHPfg",
  },
  consultationSpecialist: {
    src: "/images/photos/consultation-specialist.webp",
    alt: "A senior clinician explaining assessment findings to a patient across a desk",
    width: 1400,
    height: 788,
    credit: "Vitaly Gariev",
    source: "https://unsplash.com/photos/IDM3n0LfNCY",
  },
  earExamination: {
    src: "/images/photos/ear-examination-otoscope.webp",
    alt: "A clinician gently examining a patient's ear canal with an otoscope",
    width: 1400,
    height: 1050,
    credit: "Anthony Camerlo",
    source: "https://unsplash.com/photos/lvQanA8y9B0",
  },
  hearingTest: {
    src: "/images/photos/hearing-test-headphones.webp",
    alt: "A person wearing audiometry headphones raising a hand to signal they heard a test tone",
    width: 1400,
    height: 939,
    credit: "Mark Paton",
    source: "https://unsplash.com/photos/uyT0lsfimjI",
  },
  hearingAidInEar: {
    src: "/images/photos/hearing-aid-in-ear.webp",
    alt: "Close-up of a custom in-the-ear hearing aid being placed into the ear",
    width: 1400,
    height: 934,
    credit: "Mark Paton",
    source: "https://unsplash.com/photos/RNue9Vxx2sc",
  },
  hearingAidWearer: {
    src: "/images/photos/hearing-aid-wearer.webp",
    alt: "An older man adjusting a discreet hearing aid behind his ear",
    width: 1400,
    height: 1050,
    credit: "Anthony Camerlo",
    source: "https://unsplash.com/photos/zvv_ofsPvnY",
  },
  hearingAidOpenFit: {
    src: "/images/photos/hearing-aid-open-fit.webp",
    alt: "Side view of a man wearing an open-fit receiver-in-canal hearing aid",
    width: 1400,
    height: 933,
    credit: "Mark Paton",
    source: "https://unsplash.com/photos/dn6KOZXmISw",
  },
  childHeadphones: {
    src: "/images/photos/child-headphones.webp",
    alt: "A young boy wearing headphones and looking at the camera",
    width: 1400,
    height: 930,
    credit: "Matteo Discardi",
    source: "https://unsplash.com/photos/wSvK-ubpDXM",
  },
  adultCuppingEar: {
    src: "/images/photos/adult-cupping-ear.webp",
    alt: "Close-up of a hand cupped behind an ear, straining to hear",
    width: 1400,
    height: 2241,
    credit: "Aurora K",
    source: "https://unsplash.com/photos/O-FoUsmqzbY",
  },
  tinnitusCoverEar: {
    src: "/images/photos/tinnitus-cover-ear.webp",
    alt: "A man holding his head with his hands over his ears",
    width: 1400,
    height: 933,
    credit: "chairulfajar_",
    source: "https://unsplash.com/photos/wR5u40w3GMw",
  },
  tinnitusFingersInEars: {
    src: "/images/photos/tinnitus-fingers-in-ears.webp",
    alt: "A woman with her eyes closed pressing her fingers to her ears, troubled by ringing in her ears",
    width: 1267,
    height: 698,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  earPainMan: {
    src: "/images/photos/ear-pain-man.webp",
    alt: "A man wincing and holding his hand to his ear, with the ear highlighted in red",
    width: 1000,
    height: 666,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogNoise: {
    src: "/images/photos/blog-noise.webp",
    alt: "A man wearing a hearing aid at a busy restaurant table, with speech and background sound waves around him",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogNotHearingClearly: {
    src: "/images/photos/blog-not-hearing-clearly.webp",
    alt: "A hearing aid wearer in a restaurant surrounded by common causes of poor clarity: a blocked wax guard, battery, moisture and ear discomfort",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogHearingAidFitting: {
    src: "/images/photos/blog-hearing-aid-fitting.webp",
    alt: "An audiologist fitting a behind-the-ear hearing aid on a patient in a clinic overlooking Islamabad",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogHearingAidTypes: {
    src: "/images/photos/blog-hearing-aid-types.webp",
    alt: "Behind-the-ear, receiver-in-canal and in-the-ear hearing aids displayed on lit stands, with an audiologist in the background",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogOriginalHearingAids: {
    src: "/images/photos/blog-original-hearing-aids.webp",
    alt: "An audiologist showing a patient a hearing aid in front of a display of devices, with Faisal Mosque visible through the window",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogInvisibleVsRechargeable: {
    src: "/images/photos/blog-invisible-vs-rechargeable.webp",
    alt: "Split image: an in-canal hearing aid being placed in an ear beside rechargeable hearing aids in a charging case",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogHearingTest: {
    src: "/images/photos/blog-hearing-test.webp",
    alt: "A patient wearing audiometry headphones while an audiologist points to the audiogram on screen",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogDnnHearingAids: {
    src: "/images/photos/blog-dnn-hearing-aids.webp",
    alt: "Illustration of a hearing aid's AI chip separating speech from background noise, with a neural network brain above",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogSevenSigns: {
    src: "/images/photos/blog-seven-signs.webp",
    alt: "An older man cupping his ear, struggling to follow a family conversation in the living room",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogHearingAidPrices: {
    src: "/images/photos/blog-hearing-aid-prices.webp",
    alt: "An audiologist explaining a hearing aid to a patient, with a range of hearing aid styles on the desk",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogTopHearingAids: {
    src: "/images/photos/blog-top-hearing-aids.webp",
    alt: "An audiologist presenting a receiver-in-canal hearing aid to a patient, with a row of hearing aid models on the desk",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  blogTopAudiologists: {
    src: "/images/photos/blog-top-audiologists.webp",
    alt: "An audiologist examining a patient's ear with an otoscope in a modern clinic overlooking Islamabad",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  serviceHearingTest: {
    src: "/images/photos/service-hearing-test.webp",
    alt: "A patient wearing audiometry headphones and holding a response button while the audiologist points to the audiogram",
    width: 1024,
    height: 1536,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  serviceHearingAids: {
    src: "/images/photos/service-hearing-aids.webp",
    alt: "An audiologist showing a hearing aid to a patient, with a row of hearing aid styles on the desk",
    width: 1024,
    height: 1536,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  serviceTinnitus: {
    src: "/images/photos/service-tinnitus.webp",
    alt: "An audiologist explaining tinnitus sounds on screen to a patient, beside an ear model",
    width: 1024,
    height: 1536,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  serviceEarWax: {
    src: "/images/photos/service-ear-wax.webp",
    alt: "An audiologist examining a patient's ear canal with a video otoscope, the ear wax shown on the monitor",
    width: 1024,
    height: 1536,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  homeAboutConsultation: {
    src: "/images/photos/home-about-consultation.webp",
    alt: "A HearWell audiologist explaining a patient's audiogram on screen while holding a hearing aid, with hearing aids displayed on the desk",
    width: 1254,
    height: 1254,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
  homeHeroGrandson: {
    src: "/images/photos/home-hero-grandson.webp",
    alt: "A boy whispering into his smiling grandfather's ear, with hearing aids on the clinic desk in front of them",
    width: 1024,
    height: 1536,
    // Supplied by the clinic (not from Unsplash).
    credit: "HearWell Audiology Clinic",
    source: "",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
