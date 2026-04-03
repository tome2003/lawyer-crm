"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ChevronRight,
  Crosshair,
  LayoutDashboard,
  LineChart,
  MapPin,
  Search,
  Star,
  UserSearch,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { pathnameWithLocale } from "@/i18n/pathname";
import { nearestHubLocation } from "@/lib/directory-hubs";
import { MOCK_LAWYERS } from "@/lib/lawyers";
import { getLocationOptions, getSpecialtyOptions } from "@/lib/search-lawyers";

const whyIcons = [UserSearch, LayoutDashboard, LineChart] as const;

export function MarketplaceView() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const tFilters = useTranslations("findExpert");
  const locale = useLocale();
  const findExpertAction = pathnameWithLocale("/find-your-expert", locale);

  const specialties = useMemo(
    () => getSpecialtyOptions(MOCK_LAWYERS),
    [],
  );
  const locations = useMemo(() => getLocationOptions(MOCK_LAWYERS), []);

  const [featuredArea, setFeaturedArea] = useState<string>("all");
  const [geoNote, setGeoNote] = useState<"idle" | "loading" | "denied" | "err">(
    "idle",
  );

  const featuredLawyers = useMemo(
    () =>
      MOCK_LAWYERS.filter(
        (l) => featuredArea === "all" || l.location === featuredArea,
      ),
    [featuredArea],
  );

  const useNearMe = useCallback(() => {
    setGeoNote("idle");
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGeoNote("err");
      return;
    }
    setGeoNote("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const hub = nearestHubLocation(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        setFeaturedArea(hub);
        setGeoNote("idle");
      },
      (err) => {
        setGeoNote(err.code === 1 ? "denied" : "err");
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 300_000 },
    );
  }, []);

  const whyItems = [
    { titleKey: "why1Title" as const, bodyKey: "why1Body" as const },
    { titleKey: "why2Title" as const, bodyKey: "why2Body" as const },
    { titleKey: "why3Title" as const, bodyKey: "why3Body" as const },
  ];

  return (
    <div className="bg-paper-bright min-h-screen pt-16">
      <div className="from-navy-deep via-[#121c2e] to-navy-deep relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b py-24 sm:py-40">
        <div className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/25 to-violet-600/20 blur-[88px] md:h-[560px] md:w-[560px] md:blur-[120px]" />
        <div className="absolute top-[42%] left-[38%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brass-light/20 via-amber-500/10 to-transparent blur-[72px] md:h-[360px] md:w-[360px] md:blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-brass mb-5 text-[0.65rem] font-semibold tracking-[0.25em] text-balance uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-paper-bright mb-6 text-[2.65rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {t("headline")}{" "}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
              {t("headlineAccent")}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-normal tracking-tight text-paper-bright/78 sm:text-lg">
            {t("sub")}
          </p>

          <form
            action={findExpertAction}
            method="get"
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/12 bg-white/8 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-xl sm:mt-12 sm:p-5"
          >
            <p className="text-paper-bright/55 mb-4 text-left text-xs font-medium tracking-wide sm:text-sm">
              {t("filtersHint")}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="border-paper-bright/12 bg-paper-bright/6 flex min-h-[3rem] flex-1 items-center rounded-xl border px-4 py-2.5">
                  <Search className="text-paper-bright/45 h-5 w-5 shrink-0" />
                  <input
                    name="q"
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    className="text-paper placeholder:text-paper-bright/40 ml-3 w-full bg-transparent text-base outline-none sm:text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="text-ink shrink-0 rounded-xl bg-white px-8 py-3 text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(255,255,255,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(147,197,253,0.35)] sm:min-w-[9.5rem]"
                >
                  {t("search")}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="text-left">
                  <label className="text-paper-bright/50 mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {tFilters("practiceArea")}
                  </label>
                  <select
                    name="specialty"
                    defaultValue="all"
                    className="border-paper-bright/15 bg-paper-bright/8 text-paper-bright placeholder:text-paper-bright/40 w-full cursor-pointer rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    <option value="all">{tFilters("allAreas")}</option>
                    {specialties.map((s) => (
                      <option key={s} value={s} className="text-ink">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <label className="text-paper-bright/50 mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {tFilters("location")}
                  </label>
                  <select
                    name="location"
                    defaultValue="all"
                    className="border-paper-bright/15 bg-paper-bright/8 text-paper-bright w-full cursor-pointer rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    <option value="all">{tFilters("allLocations")}</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="text-ink">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <label className="text-paper-bright/50 mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {tFilters("sortBy")}
                  </label>
                  <select
                    name="sort"
                    defaultValue="rating"
                    className="border-paper-bright/15 bg-paper-bright/8 text-paper-bright w-full cursor-pointer rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-400/40"
                  >
                    <option value="rating" className="text-ink">
                      {tFilters("sortRating")}
                    </option>
                    <option value="reviews" className="text-ink">
                      {tFilters("sortReviews")}
                    </option>
                    <option value="name" className="text-ink">
                      {tFilters("sortName")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <section
        className="border-ink/8 from-paper-bright border-b bg-gradient-to-b to-paper py-20 sm:py-24"
        aria-labelledby="why-lex-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2
              id="why-lex-heading"
              className="font-serif text-ink text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("whyTitle")}
            </h2>
            <p className="text-ink-muted mt-4 text-lg font-normal leading-relaxed">
              {t("whySub")}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {whyItems.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <li
                  key={item.titleKey}
                  className="border-ink/8 bg-paper-bright flex flex-col rounded-2xl border p-8 shadow-[0_2px_24px_rgba(26,39,68,0.06)]"
                >
                  <div className="bg-ink/6 text-navy mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-ink mb-3 text-xl font-semibold tracking-tight">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {t(item.bodyKey)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="border-ink/8 bg-paper border-t py-16 sm:py-20"
        aria-labelledby="for-counsel-heading"
      >
        <div className="mx-auto max-w-5xl px-4 text-left sm:px-6 lg:px-8">
          <h2
            id="for-counsel-heading"
            className="text-brass mb-5 text-center text-[0.65rem] font-semibold tracking-[0.22em] uppercase"
          >
            {t("heroForLawyersEyebrow")}
          </h2>
          <p className="text-ink-muted mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
            {t("heroLawyersPitch")}
          </p>
          <div
            className="border-ink/8 bg-paper-bright grid grid-cols-2 gap-3 rounded-2xl border p-4 shadow-[0_2px_24px_rgba(26,39,68,0.06)] sm:gap-4 sm:p-5 lg:grid-cols-4"
            aria-label={t("heroStatsAria")}
          >
            {(
              [
                {
                  valueKey: "stat1Value" as const,
                  labelKey: "stat1Label" as const,
                  subKey: "stat1Sub" as const,
                },
                {
                  valueKey: "stat2Value" as const,
                  labelKey: "stat2Label" as const,
                  subKey: "stat2Sub" as const,
                },
                {
                  valueKey: "stat3Value" as const,
                  labelKey: "stat3Label" as const,
                  subKey: "stat3Sub" as const,
                },
                {
                  valueKey: "stat4Value" as const,
                  labelKey: "stat4Label" as const,
                  subKey: "stat4Sub" as const,
                },
              ] as const
            ).map((stat) => (
              <div
                key={stat.valueKey}
                className="border-ink/8 rounded-xl border bg-white px-3 py-4 sm:px-4 sm:py-5"
              >
                <div className="font-serif text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t(stat.valueKey)}
                </div>
                <p className="text-ink mt-2 text-xs font-semibold leading-snug sm:text-sm">
                  {t(stat.labelKey)}
                </p>
                <p className="text-ink-muted mt-1.5 text-[0.7rem] leading-relaxed sm:text-xs">
                  {t(stat.subKey)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-ink-muted/80 mx-auto mt-4 max-w-3xl text-center text-[0.68rem] leading-relaxed sm:text-xs">
            {t("statDisclaimer")}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/join"
              className="bg-brass text-ink hover:bg-brass-light inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold tracking-wide shadow-[0_4px_24px_rgba(139,115,85,0.2)] transition-all hover:scale-[1.02]"
            >
              {tNav("joinLawyer")}
            </Link>
          </div>
        </div>
      </section>

      <div
        className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        id="featured"
      >
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("featuredTitle")}
          </h2>
          <p className="text-ink-muted mt-3 max-w-xl mx-auto text-base font-normal">
            {t("featuredSub")}
          </p>
        </div>

        <div className="border-ink/8 bg-paper-bright/80 mx-auto mb-10 max-w-xl rounded-2xl border p-5 shadow-[0_2px_20px_rgba(26,39,68,0.05)] sm:p-6">
          <label
            htmlFor="featured-area"
            className="text-ink flex items-center gap-2 text-sm font-semibold"
          >
            <MapPin className="text-brass h-4 w-4 shrink-0" strokeWidth={1.75} />
            {t("featuredAreaLabel")}
          </label>
          <p className="text-ink-muted mt-1 text-xs leading-relaxed">
            {t("featuredAreaHint")}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <select
              id="featured-area"
              value={featuredArea}
              onChange={(e) => {
                setFeaturedArea(e.target.value);
                setGeoNote("idle");
              }}
              className="border-ink/12 bg-white text-ink focus:border-brass/40 flex-1 cursor-pointer rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brass/20"
            >
              <option value="all">{t("featuredAllAreas")}</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={useNearMe}
              disabled={geoNote === "loading"}
              className="border-ink/12 bg-ink text-paper-bright hover:bg-ink/90 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              <Crosshair className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {geoNote === "loading"
                ? t("featuredLocating")
                : t("featuredNearMe")}
            </button>
          </div>
          {geoNote === "denied" ? (
            <p className="text-ink-muted mt-3 text-xs">{t("featuredLocDenied")}</p>
          ) : null}
          {geoNote === "err" ? (
            <p className="text-ink-muted mt-3 text-xs">
              {t("featuredLocUnavailable")}
            </p>
          ) : null}
          <p className="text-ink mt-4 text-center text-sm font-medium">
            {featuredArea === "all"
              ? t("featuredShowingAll")
              : t("featuredShowingIn", { area: featuredArea })}
          </p>
        </div>

        <p className="mb-8 text-center">
          <Link
            href="/find-your-expert"
            className="text-brass hover:text-brass-light inline-flex items-center text-sm font-semibold tracking-wide underline decoration-brass/40 underline-offset-4 transition-colors"
          >
            {t("browseDirectory")}
            <ChevronRight className="ml-0.5 h-4 w-4" />
          </Link>
        </p>

        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5 sm:gap-6">
          {featuredLawyers.map((lawyer) => (
            <Link
              key={lawyer.id}
              href={`/lawyers/${lawyer.id}`}
              className="border-ink/10 bg-paper-bright group flex w-full max-w-[260px] flex-col overflow-hidden rounded-xl border shadow-[0_2px_12px_rgba(26,39,68,0.05)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-brass/28 hover:shadow-[0_16px_36px_rgba(26,39,68,0.09),0_0_0_1px_rgba(139,115,85,0.08)] sm:w-[calc(50%-12px)] lg:w-[260px]"
            >
              <div className="relative h-36 w-full shrink-0 overflow-hidden sm:h-40">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  sizes="260px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
                  <p className="text-brass-light/95 line-clamp-1 text-[0.6rem] font-semibold tracking-[0.14em] uppercase">
                    {lawyer.specialty}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-xs font-semibold tabular-nums">
                      <Star className="text-brass-light h-3 w-3 fill-current" />
                      {lawyer.rating}
                    </span>
                    <span className="text-paper-bright/65 text-[0.65rem] font-medium leading-none">
                      {t("partnerReviews", { count: lawyer.reviews })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
                <p className="text-brass line-clamp-1 text-[0.62rem] font-semibold tracking-[0.12em] uppercase">
                  {lawyer.title}
                </p>
                <h3 className="font-serif text-ink mt-1 line-clamp-2 text-lg leading-tight font-semibold tracking-tight">
                  {lawyer.name}
                </h3>
                <p className="text-ink-muted mt-0.5 line-clamp-2 text-xs font-medium leading-snug">
                  {lawyer.firm}
                </p>

                <div className="text-ink-muted mt-3 space-y-1.5 text-xs">
                  <p className="flex items-start gap-1.5">
                    <MapPin
                      className="text-brass mt-0.5 h-3 w-3 shrink-0 opacity-85"
                      strokeWidth={2}
                    />
                    <span className="leading-snug">{lawyer.location}</span>
                  </p>
                  <div className="border-ink/8 flex items-baseline justify-between gap-2 border-t border-dashed pt-2">
                    <span className="text-ink-muted/90 text-[0.65rem] font-medium">
                      {t("partnerListedRate")}
                    </span>
                    <span className="text-ink text-sm font-semibold tabular-nums">
                      {lawyer.rate}
                    </span>
                  </div>
                </div>

                <span className="border-ink/10 text-ink bg-paper group-hover:bg-ink group-hover:text-paper-bright mt-3 flex w-full items-center justify-center gap-0.5 rounded-lg border py-2 text-xs font-semibold tracking-wide transition-colors duration-300">
                  {t("viewProfile")}
                  <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
