import type { MetadataRoute } from "next";

const siteUrl = "https://bdf-auhi.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/download", "/lore", "/personagens", "/studio", "/devlog", "/galeria", "/login", "/feedback"],
        disallow: ["/dashboard"]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
