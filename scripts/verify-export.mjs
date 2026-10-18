// Checks the static export in /out after `npm run build`. No dependencies.
// Usage: npm run verify:export   (exits 1 if any error is found)
//
// Verifies: expected routes exist, every internal link and asset resolves to a file,
// WhatsApp / phone / email links use the clinic's configured details, each page has
// a unique <title>, a meta description and exactly one <h1>, and no duplicate ids.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const WHATSAPP = "923450992968";
const TEL = "tel:+923450992968";
const EMAIL = "mailto:hearwell902@gmail.com";
const EXPECTED_ROUTES = [
  "/",
  "/about/",
  "/services/hearing-tests/",
  "/services/hearing-aids/",
  "/services/tinnitus-management/",
  "/services/ear-wax-removal/",
  "/contact/",
  "/blog/",
];

const errors = [];
const warnings = [];

if (!existsSync(OUT)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));
const routeOf = (file) => {
  const rel = "/" + path.relative(OUT, file).split(path.sep).join("/");
  return rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
};

for (const route of EXPECTED_ROUTES) {
  const file = path.join(OUT, route, "index.html");
  if (!existsSync(file)) errors.push(`Missing route: ${route}`);
}
if (!existsSync(path.join(OUT, "404.html"))) errors.push("Missing 404.html");

/** Resolves a root-relative URL to a file in out/, the way a static host would. */
function resolves(url) {
  const clean = decodeURIComponent(url.split(/[?#]/)[0]);
  if (clean === "" || clean === "/") return existsSync(path.join(OUT, "index.html"));
  const target = path.join(OUT, clean);
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(path.join(target, "index.html")) || existsSync(`${target}.html`);
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const titles = new Map();
let linkCount = 0;
let waCount = 0;

for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  // Next exports the 404 page twice (/404.html and /404/); check it once.
  const isPage = (!route.endsWith(".html") || route === "/404.html") && route !== "/404/";

  // Links and assets
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const url = decode(raw);
    linkCount++;
    if (/^(https?:)?\/\/(localhost|127\.0\.0\.1)/.test(url)) errors.push(`${route}: development URL ${url}`);
    if (url.startsWith("/") && !url.startsWith("//")) {
      if (!resolves(url)) errors.push(`${route}: broken ${attr} ${url}`);
    } else if (url.startsWith("https://wa.me/")) {
      waCount++;
      const u = new URL(url);
      if (u.pathname !== `/${WHATSAPP}`) errors.push(`${route}: WhatsApp link to wrong number ${u.pathname}`);
      const text = u.searchParams.get("text");
      if (text !== null && (!text.trim() || text.includes("undefined") || text.includes("%"))) {
        errors.push(`${route}: malformed WhatsApp message ${JSON.stringify(text.slice(0, 60))}`);
      }
    } else if (url.startsWith("tel:") && url !== TEL) {
      errors.push(`${route}: unexpected phone link ${url}`);
    } else if (url.startsWith("mailto:") && url !== EMAIL) {
      errors.push(`${route}: unexpected email link ${url}`);
    } else if (url === "#" || url === "") {
      errors.push(`${route}: empty link (${attr}="${raw}")`);
    }
  }

  if (!isPage) continue;

  // Head and structure
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) errors.push(`${route}: missing <title>`);
  else titles.set(title, [...(titles.get(title) ?? []), route]);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${route}: missing meta description`);
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) errors.push(`${route}: ${h1s} <h1> elements (expected 1)`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dupes.length) errors.push(`${route}: duplicate ids ${dupes.join(", ")}`);
  if (html.includes("https://example.com")) warnings.push(`${route}: uses the placeholder domain example.com (set NEXT_PUBLIC_SITE_URL)`);
}

for (const [title, routes] of titles) {
  if (routes.length > 1) errors.push(`Duplicate <title> "${title}" on ${routes.join(", ")}`);
}

for (const extra of ["robots.txt", "sitemap.xml", "favicon.ico"]) {
  if (!existsSync(path.join(OUT, extra))) errors.push(`Missing ${extra}`);
}

const uniqueWarnings = [...new Set(warnings.map((w) => w.replace(/^[^:]+: /, "")))];
console.log(`Checked ${htmlFiles.length} HTML files, ${linkCount} links/assets, ${waCount} WhatsApp links.`);
for (const w of uniqueWarnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(errors.length ? `\n${errors.length} error(s).` : "\nNo errors.");
process.exit(errors.length ? 1 : 0);
