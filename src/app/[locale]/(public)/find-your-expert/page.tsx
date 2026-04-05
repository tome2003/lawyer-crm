import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import {
  getLocationOptions,
  getSpecialtyOptions,
  searchLawyers,
} from "@/lib/search-lawyers";
import { pathnameWithLocale } from "@/i18n/pathname";
import { MOCK_LAWYERS } from "@/lib/lawyers";

export default async function FindYourExpertPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    specialty?: string;
    location?: string;
    sort?: string;
  }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("findExpert");
  const formAction = pathnameWithLocale("/find-your-expert", locale);

  const paramsSp = await searchParams;
  const q = paramsSp.q ?? "";
  const specialty = paramsSp.specialty ?? "all";
  const location = paramsSp.location ?? "all";
  const sort = paramsSp.sort ?? "rating";

  const specialties = getSpecialtyOptions(MOCK_LAWYERS);
  const locations = getLocationOptions(MOCK_LAWYERS);
  const results = searchLawyers(MOCK_LAWYERS, {
    q,
    specialty,
    location,
    sort,
  });

  const resultsLine = t("resultsCount", { count: results.length });
  const matchingSuffix = q ? ` ${t("matching", { q })}` : "";

  return (
    <div className="bg-paper min-h-screen pt-16 pb-20">
      <div className="border-ink/8 from-paper-bright relative overflow-hidden border-b bg-gradient-to-b to-paper">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-bl from-indigo-400/12 via-transparent to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-tr from-brass/10 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-brass text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-[2.75rem] sm:leading-tight">
            {t("title")}
          </h1>
          <p className="text-ink-muted mt-4 max-w-2xl text-lg leading-relaxed font-normal">
            {t("sub")}
          </p>

          <form
            method="get"
            action={formAction}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="border-ink/10 bg-paper-bright flex flex-1 items-center rounded-xl border px-4 py-3.5 shadow-sm">
              <Search className="text-ink-muted h-5 w-5 shrink-0" />
              <input
                name="q"
                defaultValue={q}
                placeholder={t("searchPlaceholder")}
                className="text-ink placeholder:text-ink-muted/70 ml-3 w-full bg-transparent text-base outline-none"
              />
            </div>
            {specialty !== "all" ? (
              <input type="hidden" name="specialty" value={specialty} />
            ) : null}
            {location !== "all" ? (
              <input type="hidden" name="location" value={location} />
            ) : null}
            {sort !== "rating" ? (
              <input type="hidden" name="sort" value={sort} />
            ) : null}
            <button
              type="submit"
              className="bg-ink text-paper-bright rounded-xl px-8 py-3.5 text-sm font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(59,130,246,0.18),0_0_40px_rgba(139,115,85,0.06)]"
            >
              {t("search")}
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <div className="border-ink/10 bg-paper-bright sticky top-24 rounded-xl border p-6 shadow-[0_2px_20px_rgba(26,39,68,0.06)]">
              <div className="text-ink mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide">
                <SlidersHorizontal className="h-4 w-4 opacity-70" />
                {t("refineTitle")}
              </div>

              <form method="get" action={formAction} className="space-y-5">
                {q ? <input type="hidden" name="q" value={q} /> : null}

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("practiceArea")}
                  </label>
                  <select
                    name="specialty"
                    defaultValue={specialty}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="all">{t("allAreas")}</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("location")}
                  </label>
                  <select
                    name="location"
                    defaultValue={location}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="all">{t("allLocations")}</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("sortBy")}
                  </label>
                  <select
                    name="sort"
                    defaultValue={sort}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="rating">{t("sortRating")}</option>
                    <option value="reviews">{t("sortReviews")}</option>
                    <option value="name">{t("sortName")}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-ink text-paper-bright w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-92"
                >
                  {t("applyFilters")}
                </button>
              </form>

              <Link
                href="/find-your-expert"
                className="text-ink-muted hover:text-brass mt-4 block text-center text-sm font-medium transition-colors"
              >
                {t("clearAll")}
              </Link>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-ink-muted text-sm">
                <span className="text-ink font-semibold">{resultsLine}</span>
                {matchingSuffix}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="border-ink/12 bg-paper-bright rounded-xl border border-dashed px-8 py-16 text-center shadow-sm">
                <p className="font-serif text-ink text-lg font-semibold">
                  {t("emptyTitle")}
                </p>
                <p className="text-ink-muted mt-2 text-sm">{t("emptySub")}</p>
                <Link
                  href="/find-your-expert"
                  className="text-brass hover:text-brass-light mt-6 inline-block text-sm font-semibold transition-colors"
                >
                  {t("resetDirectory")}
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {results.map((lawyer) => (
                  <li key={lawyer.id}>
                    <Link
                      href={`/lawyers/${lawyer.id}`}
                      className="group bg-paper-bright flex items-center gap-3 overflow-hidden rounded-xl border border-black/[0.06] p-3 pr-3.5 shadow-[0_1px_2px_rgba(15,23,41,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-black/[0.1] hover:shadow-[0_6px_20px_rgba(15,23,41,0.06)] sm:gap-4 sm:p-3.5"
                    >
                      <div className="relative h-[4.5rem] w-[3.4rem] shrink-0 overflow-hidden rounded-lg sm:h-[4.75rem] sm:w-[3.5rem]">
                        <Image
                          src={lawyer.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-ink-muted line-clamp-1 text-[0.6rem] font-medium tracking-[0.12em] uppercase">
                          {lawyer.specialty}
                        </p>
                        <h2 className="font-serif text-ink group-hover:text-navy mt-0.5 truncate text-base font-semibold tracking-tight transition-colors sm:text-[1.05rem]">
                          {lawyer.name}
                        </h2>
                        <p className="text-ink-muted/85 mt-0.5 truncate text-xs">
                          {lawyer.location}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="text-ink text-sm font-semibold tabular-nums tracking-tight">
                          {lawyer.rate}
                        </span>
                        <ChevronRight className="text-ink-muted h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
