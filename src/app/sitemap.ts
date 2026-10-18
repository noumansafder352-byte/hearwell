import type { MetadataRoute } from "next";
import { services } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

// The blog is excluded until it has real content.
const routes = ["/", "/about", ...services.map((s) => s.href), "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemap URLs must be absolute; without a confirmed domain, publish an empty sitemap
  // rather than one full of placeholder URLs.
  if (!siteConfig.hasConfirmedDomain) return [];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "/" : `${route}/`}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.8 : 0.6,
  }));
}
