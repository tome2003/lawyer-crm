import { routing } from "@/i18n/routing";

const CANONICAL_HOST = "www.vogado.co";

function normalizeBaseUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  const url = new URL(withProtocol);
  if (url.hostname === "vogado.co") {
    url.hostname = CANONICAL_HOST;
  }
  return url.origin;
}

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.trim()) return normalizeBaseUrl(explicit);

  const prod =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (prod && prod.trim()) return normalizeBaseUrl(prod);

  return `https://${CANONICAL_HOST}`;
}

/** Locale home paths (always trailing slash except site root `/`). */
export function localeHomePath(locale: (typeof routing.locales)[number]) {
  return locale === routing.defaultLocale ? "/" : `/${locale}/`;
}

export function absoluteUrl(pathname: string) {
  const base = getSiteUrl();
  let path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (path === "/en") {
    path = "/en/";
  } else if (
    path !== "/" &&
    !path.endsWith("/") &&
    !path.includes(".")
  ) {
    path = `${path}/`;
  }

  return `${base}${path}`;
}

export function canonicalUrlForLocale(
  locale: (typeof routing.locales)[number],
) {
  return absoluteUrl(localeHomePath(locale));
}

/** Shared hreflang set for metadata, sitemap, and JSON-LD. */
export function localeAlternateLanguages() {
  const pt = canonicalUrlForLocale("pt");
  const en = canonicalUrlForLocale("en");

  return {
    pt,
    en,
    "x-default": pt,
  } as const;
}
