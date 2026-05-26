import type { MetadataRoute } from "next";

const siteUrl = "https://bdf-auhi.vercel.app";

const routes = [
  "",
  "/download",
  "/lore",
  "/personagens",
  "/studio",
  "/devlog",
  "/galeria",
  "/login",
  "/feedback"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/download" ? 0.9 : 0.7
  }));
}
