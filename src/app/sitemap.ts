import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/home";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/events/`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
