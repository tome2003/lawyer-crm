import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  // Unprefixed URLs stay Portuguese; English only via /en/... or language switcher.
  localeDetection: false,
  // Avoid duplicate/conflicting Link headers; hreflang lives in Next.js metadata.
  alternateLinks: false,
});
