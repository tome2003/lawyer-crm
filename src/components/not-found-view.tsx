import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Mail } from "lucide-react";

const eyebrowClass =
  "text-brass font-semibold tracking-[0.22em] uppercase text-sm sm:text-base";

export async function NotFoundView() {
  const t = await getTranslations("notFound");
  const tNav = await getTranslations("nav");

  return (
    <main className="bg-paper-bright flex min-h-0 flex-1 flex-col pt-20 sm:pt-24">
      <section className="from-navy-deep via-[#111a2c] to-navy-deep relative overflow-hidden bg-gradient-to-b py-14 sm:py-20">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,140,255,0.22)_0%,_transparent_65%)] blur-[80px] sm:h-[400px] sm:w-[400px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className={`${eyebrowClass} text-brass-light mb-4`}>{t("eyebrow")}</p>
          <p
            className="font-serif text-paper-bright/25 text-[5.5rem] leading-none font-semibold tracking-tight sm:text-[7rem]"
            aria-hidden
          >
            404
          </p>
          <h1 className="font-serif text-paper-bright mt-2 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-paper-bright/75 mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-lg">
            {t("body")}
          </p>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
        <div className="border-ink/10 bg-paper w-full max-w-md rounded-3xl border p-8 text-center shadow-sm sm:p-10">
          <p className="text-ink-muted text-lg leading-relaxed">{t("hint")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="bg-ink text-paper-bright inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-lg font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.12)] transition-all hover:scale-[1.02]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              {t("cta")}
            </Link>
            <Link
              href="/#contact"
              className="border-ink/12 text-ink hover:border-ink/22 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-lg font-semibold tracking-wide transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              {tNav("contactMe")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
