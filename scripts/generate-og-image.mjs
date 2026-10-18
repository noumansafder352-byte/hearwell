// Builds public/images/og-image.jpg (1200×630) for social sharing previews.
// Usage: node scripts/generate-og-image.mjs
import sharp from "sharp";

const W = 1200;
const H = 630;

const photo = await sharp("public/images/photos/consultation-clinic.webp")
  .resize(W, H, { fit: "cover", position: "right" })
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0F2C57" stop-opacity="0.97"/>
      <stop offset="0.55" stop-color="#0F2C57" stop-opacity="0.86"/>
      <stop offset="1" stop-color="#0A63A8" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="72" y="72" width="360" height="104" rx="22" fill="#ffffff"/>
  <text x="72" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#ffffff">Hear Better.</text>
  <text x="72" y="412" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="800" fill="#2B8FD8">Live Better.</text>
  <text x="72" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#EEF4FA" fill-opacity="0.85">Hearing tests · Hearing aids · Tinnitus · Ear wax removal</text>
  <text x="72" y="545" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#EEF4FA" fill-opacity="0.7">Nelson Medical Complex, Saddar, Rawalpindi</text>
</svg>`);

const logo = await sharp("public/images/hearwell-logo.webp").resize({ width: 320 }).toBuffer();

await sharp(photo)
  .composite([
    { input: overlay, top: 0, left: 0 },
    { input: logo, top: 72 + Math.round((104 - 84) / 2), left: 92 },
  ])
  .jpeg({ quality: 82 })
  .toFile("public/images/og-image.jpg");

console.log("Wrote public/images/og-image.jpg");
