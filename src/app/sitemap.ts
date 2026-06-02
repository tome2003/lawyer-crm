import type { MetadataRoute } from "next";
import { canonicalUrlForLocale, localeAlternateLanguages } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = localeAlternateLanguages();
  const ptUrl = canonicalUrlForLocale("pt");
  const enUrl = canonicalUrlForLocale("en");

  return [
    {
      url: ptUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: enUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
