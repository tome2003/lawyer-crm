"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const marketplaceActive =
    pathname === "/" ||
    pathname.startsWith("/lawyers") ||
    pathname.startsWith("/find-your-expert");
  const loginActive = pathname === "/login";

  return (
    <nav className="border-ink/8 bg-paper-bright/85 fixed top-0 z-50 w-full border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-3 sm:min-h-[5rem]">
          <Link
            href="/"
            className="flex shrink-0 cursor-pointer items-center"
            onClick={() => setOpen(false)}
          >
            <span className="font-serif text-ink text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Vogado
            </span>
          </Link>

          <div className="hidden items-center gap-4 md:flex md:gap-5">
            <Link
              href="/find-your-expert"
              className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold tracking-wide shadow-sm transition-all ${
                marketplaceActive
                  ? "border-navy bg-navy text-paper-bright shadow-[0_0_20px_rgba(26,39,68,0.15)]"
                  : "border-navy/35 bg-paper-bright text-navy hover:border-navy hover:bg-navy hover:text-paper-bright hover:shadow-[0_4px_24px_rgba(26,39,68,0.12)]"
              }`}
            >
              <Search className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} />
              {t("findExpert")}
            </Link>
            <div className="bg-ink/10 hidden h-6 w-px sm:block" aria-hidden />
            <Link
              href="/login"
              className={`text-sm font-medium tracking-wide transition-colors ${
                loginActive ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {t("login")}
            </Link>
            <Link
              href="/join"
              className="bg-ink text-paper-bright rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.14)] transition-all hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(59,130,246,0.2),0_0_50px_rgba(139,115,85,0.07)]"
            >
              {t("joinLawyer")}
            </Link>
            <div className="bg-ink/10 h-4 w-px" />
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

          <button
            type="button"
            className="text-ink flex items-center justify-center rounded-md p-2 md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-ink/8 flex flex-col gap-3 border-t py-4 md:hidden">
            <Link
              href="/find-your-expert"
              className="bg-navy text-paper-bright flex items-center justify-center gap-2 rounded-xl py-3.5 text-center text-sm font-semibold tracking-wide shadow-[0_4px_20px_rgba(26,39,68,0.2)]"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
              {t("findExpert")}
            </Link>
            <Link
              href="/login"
              className="text-ink-muted text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {t("login")}
            </Link>
            <Link
              href="/join"
              className="bg-ink text-paper-bright rounded-full py-3 text-center text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              {t("joinLawyer")}
            </Link>
            <div className="text-ink-muted flex justify-center gap-2 pt-2 text-sm">
              <Link
                href={pathname}
                locale="en"
                onClick={() => setOpen(false)}
                className={locale === "en" ? "font-bold text-ink" : ""}
              >
                English
              </Link>
              <span aria-hidden>·</span>
              <Link
                href={pathname}
                locale="pt"
                onClick={() => setOpen(false)}
                className={locale === "pt" ? "font-bold text-ink" : ""}
              >
                Português
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
