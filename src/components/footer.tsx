"use client";

import { useTranslations } from "next-intl";
import { Camera, Link2, MessageCircle, Users } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("lawyerFooter");

  return (
    <footer
      className="border-ink/8 bg-paper mt-auto border-t"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="font-serif text-ink text-xl font-semibold tracking-tight">
            {t("name")}
          </p>
          <p className="text-ink-muted mt-1 text-sm tracking-wide">
            {t("rights", { year })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={t("linkedinUrl")}
            target="_blank"
            rel="noreferrer"
            className="border-ink/10 text-ink-muted hover:text-ink hover:border-ink/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-medium transition-colors"
            aria-label={t("linkedin")}
          >
            <Link2 className="h-4 w-4" strokeWidth={1.75} />
            {t("linkedin")}
          </a>
          <a
            href={t("instagramUrl")}
            target="_blank"
            rel="noreferrer"
            className="border-ink/10 text-ink-muted hover:text-ink hover:border-ink/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-medium transition-colors"
            aria-label={t("instagram")}
          >
            <Camera className="h-4 w-4" strokeWidth={1.75} />
            {t("instagram")}
          </a>
          <a
            href={t("facebookUrl")}
            target="_blank"
            rel="noreferrer"
            className="border-ink/10 text-ink-muted hover:text-ink hover:border-ink/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-medium transition-colors"
            aria-label={t("facebook")}
          >
            <Users className="h-4 w-4" strokeWidth={1.75} />
            {t("facebook")}
          </a>
          <a
            href={t("whatsappUrl")}
            target="_blank"
            rel="noreferrer"
            className="border-ink/10 text-ink-muted hover:text-ink hover:border-ink/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-base font-medium transition-colors"
            aria-label={t("whatsapp")}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </footer>
  );
}
