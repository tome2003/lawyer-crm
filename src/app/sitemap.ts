import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const ptUrl = absoluteUrl("/");
  const enUrl = absoluteUrl("/en/");

  return [
    {
      url: ptUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          pt: ptUrl,
          en: enUrl,
        },
      },
    },
    {
      url: enUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          pt: ptUrl,
          en: enUrl,
        },
      },
    },
  ];
}

