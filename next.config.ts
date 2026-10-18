import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to /out.
  output: "export",
  // Emit /about/index.html etc. so routes work on any static host without rewrites.
  trailingSlash: true,
  images: {
    // The default image optimiser needs a server. Photos are pre-optimised to
    // WebP by scripts/optimize-images.mjs instead.
    unoptimized: true,
  },
};

export default nextConfig;
