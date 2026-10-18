// Turns brand logos on flat backgrounds into transparent, trimmed WebP files.
// Usage: node scripts/process-logos.mjs <source-file>=<name> [...more] [--out public/images/brands]
// For each logo two files are written: <name>.webp (original colours) and
// <name>-mono.webp (navy silhouette, used for the resting state).
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const out = outIdx >= 0 ? args.splice(outIdx, 2)[1] : "public/images/brands";
const NAVY = [15, 44, 87];

for (const pair of args) {
  const [src, name] = pair.split("=");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // Background = the top-left pixel (all supplied logos sit on a flat colour).
  const bg = [data[0], data[1], data[2]];
  const color = Buffer.alloc(width * height * 4);
  const mono = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    const px = [data[o], data[o + 1], data[o + 2]];
    const dist = Math.max(...px.map((v, c) => Math.abs(v - bg[c])));
    const a = Math.min(1, Math.max(0, (dist - 12) / 110));
    for (let c = 0; c < 3; c++) {
      // Un-blend the background so anti-aliased edges keep their true colour.
      color[o + c] = a > 0 ? Math.min(255, Math.max(0, Math.round((px[c] - bg[c] * (1 - a)) / a))) : 0;
      mono[o + c] = NAVY[c];
    }
    color[o + 3] = mono[o + 3] = Math.round(a * 255);
  }

  for (const [buf, suffix] of [[color, ""], [mono, "-mono"]]) {
    const file = path.join(out, `${name}${suffix}.webp`);
    const trimmed = await sharp(buf, { raw: { width, height, channels: 4 } })
      .trim()
      .png()
      .toBuffer();
    const meta = await sharp(trimmed)
      .resize({ height: 120, withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 90 })
      .toFile(file);
    console.log(`${file}  ${meta.width}x${meta.height}`);
  }
}
