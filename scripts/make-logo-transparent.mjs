// Creates public/images/hearwell-logo-transparent.webp (full-size master) from the white-background logo,
// plus hearwell-logo-header.webp (720px wide) that the header and footer display.
// Only near-white pixels connected to the image border are removed (flood fill), so
// white highlights inside the emblem are preserved. Edge pixels get partial alpha
// for smooth anti-aliasing.
// Usage: node scripts/make-logo-transparent.mjs
import sharp from "sharp";

const SRC = "public/images/hearwell-logo.webp";
const OUT = "public/images/hearwell-logo-transparent.webp";
const HARD = 238; // >= this on all channels → background
const SOFT = 200; // between SOFT and HARD → partially transparent edge

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const px = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);

const visited = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);

while (stack.length) {
  const i = stack.pop();
  if (visited[i]) continue;
  const v = px(i);
  if (v < SOFT) continue;
  visited[i] = 1;
  // Fade: pure white → fully transparent; light edge pixels → partial alpha.
  const a = v >= HARD ? 0 : Math.round(255 * (1 - (v - SOFT) / (HARD - SOFT)));
  data[i * 4 + 3] = Math.min(data[i * 4 + 3], a);
  if (v < HARD) continue; // don't spread through edge pixels
  const x = i % w;
  if (x > 0) stack.push(i - 1);
  if (x < w - 1) stack.push(i + 1);
  if (i >= w) stack.push(i - w);
  if (i < w * (h - 1)) stack.push(i + w);
}

// The wordmark (right of the circular emblem) has no intentional white, so letter
// counters (A, R, D, O, G…) are cleared too, even though they're enclosed.
const WORDMARK_X = Math.round(w * 0.28);
for (let y = 0; y < h; y++) {
  for (let x = WORDMARK_X; x < w; x++) {
    const i = y * w + x;
    const v = px(i);
    if (v < SOFT) continue;
    const a = v >= HARD ? 0 : Math.round(255 * (1 - (v - SOFT) / (HARD - SOFT)));
    data[i * 4 + 3] = Math.min(data[i * 4 + 3], a);
  }
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .trim({ threshold: 1 })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}×${meta.height})`);

// Display copy: the logo shows at most ~180px wide, so 720px covers 4× screens.
const HEADER = "public/images/hearwell-logo-header.webp";
const header = await sharp(OUT).resize({ width: 720 }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(HEADER);
console.log(`Wrote ${HEADER} (${header.width}×${header.height})`);
