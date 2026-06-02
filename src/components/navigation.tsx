"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

export function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <nav className="border-ink/8 bg-paper-bright/85 fixed top-0 z-50 w-full border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.25rem] items-center justify-between gap-3 sm:min-h-[5rem]">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 cursor-pointer items-center"
          >
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-serif text-ink truncate text-lg font-semibold tracking-tight sm:text-2xl">
                {t("brandName")}
              </span>
              <span className="text-ink-muted mt-0.5 hidden truncate text-[0.7rem] font-medium tracking-wide sm:block sm:text-xs">
                {t("brandSub")}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/#contact"
              className="bg-ink text-paper-bright rounded-full px-4 py-2 text-sm font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.14)] transition-all hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(59,130,246,0.2),0_0_50px_rgba(139,115,85,0.07)] sm:px-5 sm:py-2.5"
            >
              {t("contactMe")}
            </Link>
            <div className="text-ink-muted flex items-center gap-1 text-xs font-medium">
              <span className="sr-only">{t("language")}</span>
              <Link
                href={pathname}
                locale="en"
                className={`rounded-md px-2 py-1 transition-colors ${
                  locale === "en"
                    ? "bg-ink text-paper-bright"
                    : "hover:text-ink"
                }`}
                aria-label={t("en")}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="pt"
                className={`rounded-md px-2 py-1 transition-colors ${
                  locale === "pt"
                    ? "bg-ink text-paper-bright"
                    : "hover:text-ink"
                }`}
                aria-label={t("pt")}
              >
                PT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
