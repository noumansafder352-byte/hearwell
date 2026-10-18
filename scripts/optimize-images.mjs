// Resizes and converts source photos to WebP for /public/images/photos.
// Usage: node scripts/optimize-images.mjs <source-dir> [out-dir]
// Every .jpg/.jpeg/.png/.webp in <source-dir> is written as <name>.webp (max 1400px wide).
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [src, out = "public/images/photos"] = process.argv.slice(2);
if (!src) {
  console.error("Usage: node scripts/optimize-images.mjs <source-dir> [out-dir]");
  process.exit(1);
}

for (const file of await readdir(src)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const info = await sharp(path.join(src, file))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(path.join(out, `${name}.webp`));
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
