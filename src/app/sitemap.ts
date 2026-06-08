import type { MetadataRoute } from "next";
import { devlogPosts } from "@/data/devlog";

const siteUrl = "https://bdf-auhi.vercel.app";

const publicRoutes = [
  "",
  "/download",
  "/lore",
  "/personagens",
  "/studio",
  "/devlog",
  "/roadmap",
  "/galeria",
  "/login",
  "/feedback"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/download" ? 0.9 : 0.7
  }));

  const devlogPages = devlogPosts.map((post) => ({
    url: `${siteUrl}/devlog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticPages, ...devlogPages];
}
