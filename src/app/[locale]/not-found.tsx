import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="bg-paper-bright flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="border-ink/10 bg-paper max-w-xl rounded-3xl border p-10 text-center shadow-sm">
        <p className="text-brass text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm">
          {t("eyebrow")}
        </p>
        <h1 className="font-serif text-ink mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-ink-muted mt-4 text-base leading-relaxed sm:text-lg">
          {t("body")}
        </p>
        <Link
          href="/"
          className="bg-ink text-paper-bright mt-8 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-base font-semibold tracking-wide transition-opacity hover:opacity-92 sm:w-auto sm:px-10"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}

