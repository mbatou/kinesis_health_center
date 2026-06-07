import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/le-centre",
    "/specialites",
    "/equipe",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
