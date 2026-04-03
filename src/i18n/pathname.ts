import { routing } from "./routing";

/**
 * Path for native forms and absolute redirects: no prefix when `locale` is the default
 * (site deployed with Portuguese as primary — English lives under `/en`).
 */
export function pathnameWithLocale(pathname: string, locale: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) return path;
  return `/${locale}${path}`;
}
