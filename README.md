# HearWell Audiology Clinic — Website

Static marketing website for **HearWell Audiology Clinic**, Nelson Medical Complex, Saddar, Rawalpindi.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion for React and Lucide icons.
It exports to plain HTML/CSS/JS. There is no backend, database or server runtime. Appointment and enquiry
buttons open WhatsApp with a pre-filled message.

---

## Prerequisites

- Node.js 20 or newer (tested with Node 24) and npm 10+
- Internet access during `npm run build`: `next/font` downloads the Google fonts once and self-hosts them in the output

## Install and run

```bash
npm install          # install dependencies
npm run dev          # development server at http://localhost:3000
npm run build        # production build + static export → ./out
npm run preview      # serve ./out locally to check the exported site
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run verify:export  # checks ./out: routes, internal links/assets, WhatsApp/phone/email links, titles, h1s, ids
npm run check        # typecheck + lint + build + verify:export in one go
```

## Static export

`next.config.ts` sets `output: "export"`, `trailingSlash: true` and `images.unoptimized: true`.
`npm run build` writes the whole site to **`out/`**:

```
out/
├── index.html
├── about/index.html
├── services/hearing-tests/index.html   (+ hearing-aids, tinnitus-management, ear-wax-removal)
├── contact/index.html
├── blog/index.html, blog/<slug>/index.html   (12 articles, one folder per post)
├── 404.html, sitemap.xml, robots.txt
├── images/…  and  _next/static/…        (hashed JS/CSS/fonts)
```

## Deployment

Upload the **contents** of `out/` to any static host. Examples:

- **Netlify / Cloudflare Pages / Vercel:** build command `npm run build`, output directory `out`.
- **cPanel / shared hosting / S3 / any web server:** run `npm run build` locally, then upload everything inside `out/` to the web root (e.g. `public_html`).
- Configure the host's custom 404 page as `404.html` if it asks.

The live domain is **https://hearwell.pk** (`url` in `src/lib/site-config.ts`). It is used for canonical URLs,
`sitemap.xml`, `robots.txt`, Open Graph tags and structured data, so a plain `npm run build` is release-ready.
For a staging build on another address, override it:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.example.net npm run build
```

(On Windows PowerShell: `$env:NEXT_PUBLIC_SITE_URL="https://staging.example.net"; npm run build`.)
On the host, redirect `www.hearwell.pk` and `http://` to `https://hearwell.pk` so there is one address.

### Security headers (configure on the host)

A static export cannot set HTTP headers itself. Serve the site over **HTTPS** and, if the host supports custom headers
(Netlify `_headers`, Cloudflare Pages `_headers`, Apache `.htaccess`, nginx), add:

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://abacus.jasoncameron.dev; frame-src https://www.google.com; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

The CSP allows only what the site uses: Next's inline bootstrap scripts, the Google Maps embed on the Contact page and
the blog view counter (`abacus.jasoncameron.dev`). Test it on a staging URL first. Cache `/_next/static/*` for a
long time (`Cache-Control: public, max-age=31536000, immutable`), since those files are content-hashed; keep HTML short-lived.

---

## Project structure

```
src/
├── app/                      # routes (one folder per page) + layout, sitemap, robots, 404
├── components/
│   ├── layout/               # TopBar, Header (nav, dropdown, mobile menu), Footer, FloatingWhatsApp, Logo
│   ├── ui/                   # Button, Section, SectionHeading, PageHero, FaqAccordion, Reveal, SoundWave…
│   ├── sections/             # reusable page sections: SplitMedia, FaqSection, SpecialistSection
│   ├── home/                 # Home-only pieces (hero, audiogram visual, services grid)
│   └── contact/              # ContactForm (WhatsApp)
├── data/                     # ALL page copy, one file per page + navigation, images, specialist
└── lib/
    ├── site-config.ts        # phone, WhatsApp, email, address, hours, map, social links, domain
    ├── whatsapp.ts           # WhatsApp URL builder + every pre-filled message
    └── seo.ts                # per-page metadata + clinic structured data
scripts/                      # image optimisation, logo processing, Open Graph image, export verification
```

Page copy lives in `src/data/*.ts`, taken verbatim from the approved content document. To change wording, edit
the data file; the components don't need to change.

## Updating contact information

Edit **`src/lib/site-config.ts`**. The header, footer, Contact page, structured data and WhatsApp links all read from it.

| Field | Used for |
|---|---|
| `contact.phoneDisplay` / `phoneHref` | Visible number and `tel:` links |
| `contact.whatsappNumber` | WhatsApp: country code + number, digits only (`923450992968`) |
| `contact.email` | `mailto:` links |
| `address.*`, `hours.*` | Top bar, footer, Contact page, structured data |
| `url` | Live domain (`https://hearwell.pk`) for SEO tags, sitemap and robots.txt |
| `map.directionsUrl` / `map.embedUrl` | "Get Directions" and the Contact page map |
| `social.facebook / instagram / linkedin` | Footer social links (hidden while empty) |

> **WhatsApp number format:** wa.me links need the international number without `+`, spaces or the local leading
> `0`. 0345 0992968 becomes `923450992968`. A link built as `wa.me/03450992968` would not open a chat.

## Updating WhatsApp messages and CTA destinations

All pre-filled messages are in **`src/lib/whatsapp.ts`**:

- `whatsappMessages.appointment | hearingTest | consultation | general | specialist`: shared messages
- `serviceMessage("Hearing Aids", "consultation")`: service-specific messages
- `contactFormMessage()`: the layout of the contact-form message

Buttons use `whatsappUrl(message)`, which URL-encodes the text. To point a button somewhere else, change the `href`
passed to `<Button>` in the page file (internal paths like `/contact`, `tel:` and `https://` links all work).

The contact form never sends anything itself. It validates the fields, then opens WhatsApp with the details filled
in, and tells the visitor to press **Send** in WhatsApp.

## Replacing images

Photos are either supplied by the clinic or free Unsplash-licensed stock; the credit for each is in
`src/data/images.ts`. To replace a photo:

1. Put the original JPG/PNG files in a folder, e.g. `raw-photos/`. Use the same file names as the ones you are replacing (`consultation-clinic.jpg`, …).
2. Run `npm run images:optimize -- raw-photos`. This writes resized WebP files to `public/images/photos/`.
3. Update `alt`, `width`, `height` and `credit` for that image in `src/data/images.ts`.
4. If you replaced `consultation-clinic`, regenerate the social preview with `npm run images:og`.

The logo master is `public/images/hearwell-logo.webp`. `node scripts/make-logo-transparent.mjs` derives the
transparent version and the 720px `hearwell-logo-header.webp` that the header and footer display.

## Blog

The index is `src/app/blog/page.tsx`; card data is in `src/data/blog.ts` and article content in `src/data/articles.ts`
(keyed by the same slug). `src/app/blog/[slug]/page.tsx` statically generates one page per article
(`generateStaticParams`, `dynamicParams = false`), so a card without an article returns the 404 page rather than breaking.

The blog is **not yet indexed** while the article claims are reviewed: both blog pages set `robots: { index: false }`,
`robots.txt` disallows `/blog/`, and the sitemap leaves blog URLs out. To publish it, remove those three things
(the TODOs mark them) and add the article URLs to `src/app/sitemap.ts`.

Each article shows a view count from the free Abacus counter service (`src/components/blog/ViewCount.tsx`): the
page sends only the article slug, counts once per browser session, and only reads (never counts) on localhost.

## Accessibility and motion

- Skip link, semantic landmarks, one `h1` per page, labelled navigation, and a keyboard-operable Services dropdown (Enter/Escape, focus returns to the button)
- Accordion answers stay in the HTML (collapsed panels are `inert`)
- Form errors are announced, linked with `aria-describedby`, and focus moves to the first invalid field
- `prefers-reduced-motion` turns off reveal motion and the looping sound-wave/ripple animations
- Hero text uses CSS-only entrance animation, so it never waits on JavaScript to appear
- Scroll-reveal content (`data-reveal`) is shown by a `<noscript>` rule when JavaScript is unavailable
- Small text meets WCAG AA contrast: sky blue is used for accents and large text, clinic blue for small labels

---

## ⚠️ Items to confirm before going live

These are kept configurable and flagged instead of being guessed:

1. **Specialist profile:** the site shows "Dr. Suleman Bukhari, Clinical Audiologist" with hedged wording
   ("is presented on the existing website as…") while `verified: false` in `src/data/specialist.ts`. The clinic's
   blog articles name him "Syed Suleman Bukhari, AuD, Consultant Audiologist & Founder". Confirm the name, title and
   qualification, then set `verified: true` and align the wording (also used in the WhatsApp message in `whatsapp.ts`).
2. **Offers and terms:** "free" consultation/assessment (Hearing Aids, Tinnitus), the 60-day free trial and lifetime
   support (`src/data/hearing-aids.ts`, `src/data/tinnitus.ts`, marked TODO).
3. **Hearing aid brands:** the partner logos are ReSound, Rexton, Signia, Starkey and Oticon. Some articles also name
   Phonak. Confirm which brands the clinic supplies.
4. **Blog claims:** prices, product specifications, "recognized/leading" statements and descriptions of other clinics
   and hospitals in `src/data/articles.ts`; hearing-test prices differ between two articles. Then publish (see Blog).
5. **Map location:** the map uses an address search. Replace `map.embedUrl` / `map.directionsUrl` with the clinic's
   own Google Maps place link if one exists.
6. **Social media URLs:** not provided; the icons stay unlinked until added in `site-config.ts`.
