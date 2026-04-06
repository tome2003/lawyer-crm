"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Award,
  BadgeCheck,
  ChevronRight,
  Coins,
  Crosshair,
  Inbox,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Scale,
  Search,
  Star,
  UserSearch,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { pathnameWithLocale } from "@/i18n/pathname";
import { nearestHubLocation } from "@/lib/directory-hubs";
import { MOCK_LAWYERS } from "@/lib/lawyers";
import { getLocationOptions, getSpecialtyOptions } from "@/lib/search-lawyers";

const whyIcons = [
  UserSearch,
  MapPin,
  Coins,
  Scale,
  BadgeCheck,
  MessageCircle,
] as const;

const lawyerBenefitIcons = [Inbox, Award, LayoutDashboard] as const;
const lawyerBenefits = [
  { titleKey: "lawyersBen1Title" as const, bodyKey: "lawyersBen1Body" as const },
  { titleKey: "lawyersBen2Title" as const, bodyKey: "lawyersBen2Body" as const },
  { titleKey: "lawyersBen3Title" as const, bodyKey: "lawyersBen3Body" as const },
] as const;

type PartnerStatFigureKind = "multiply" | "percent" | "rating";

function MetricMultiplyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7.5 7.5l9 9M16.5 7.5l-9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricMinusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 5"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M1.75 2.5h16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MetricPercentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle
        cx="9"
        cy="8.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.65"
      />
      <circle
        cx="19"
        cy="15.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.65"
      />
      <path
        d="M19.5 6L8.5 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PartnerStatFigure({
  kind,
  value,
}: {
  kind: PartnerStatFigureKind;
  value: string;
}) {
  const row = "inline-flex items-center gap-3 min-[380px]:gap-3.5";
  const iconTint = "shrink-0 text-brass-light/78";

  if (kind === "multiply") {
    return (
      <span className={row}>
        <span className="tabular-nums tracking-tight">{value}</span>
        <MetricMultiplyIcon
          className={`${iconTint} h-[0.52em] w-[0.52em] sm:h-[0.5em] sm:w-[0.5em]`}
        />
      </span>
    );
  }

  if (kind === "percent") {
    const trimmed = value.trim();
    const first = trimmed[0];
    const isNegative = first === "\u2212" || first === "-";
    const digits = isNegative ? trimmed.slice(1).trim() : trimmed;

    return (
      <span className={row}>
        <span className="inline-flex items-center gap-1.5 sm:gap-2">
          {isNegative ? (
            <span className="sr-only">−</span>
          ) : null}
          {isNegative ? (
            <MetricMinusIcon
              className={`${iconTint} h-[0.2em] w-[0.46em] shrink-0 sm:h-[0.19em] sm:w-[0.44em]`}
            />
          ) : null}
          <span className="tabular-nums tracking-tight">{digits}</span>
        </span>
        <MetricPercentIcon
          className={`${iconTint} h-[0.56em] w-[0.66em] sm:h-[0.54em] sm:w-[0.63em]`}
        />
      </span>
    );
  }

  return (
    <span className={row}>
      <span className="tabular-nums tracking-tight">{value}</span>
      <Star
        className={`${iconTint} h-[0.72em] w-[0.72em] fill-none stroke-1 stroke-linejoin-round sm:h-[0.68em] sm:w-[0.68em]`}
        aria-hidden
      />
    </span>
  );
}

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
    { titleKey: "why4Title" as const, bodyKey: "why4Body" as const },
    { titleKey: "why5Title" as const, bodyKey: "why5Body" as const },
    { titleKey: "why6Title" as const, bodyKey: "why6Body" as const },
  ] as const;

  return (
    <div className="bg-paper-bright min-h-screen pt-20">
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
        className="border-ink/8 from-paper-bright border-b bg-gradient-to-b to-paper py-16 sm:py-20"
        aria-labelledby="why-vogado-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-xl text-center sm:mb-12 sm:max-w-2xl">
            <p className="text-brass mb-3 text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
              {t("whyEyebrow")}
            </p>
            <h2
              id="why-vogado-heading"
              className="font-serif text-ink text-pretty text-[1.65rem] leading-snug font-semibold tracking-tight sm:text-4xl sm:leading-tight"
            >
              {t("whyTitle")}
            </h2>
            <p className="text-ink-muted mt-4 text-sm font-normal leading-relaxed sm:text-base">
              {t("whySub")}
            </p>
          </div>
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {whyItems.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <li
                  key={item.titleKey}
                  className="border-ink/6 bg-paper-bright flex flex-col rounded-xl border p-4 shadow-[0_1px_2px_rgba(26,39,68,0.04)] transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(26,39,68,0.07)] sm:p-5"
                >
                  <div className="bg-brass/12 text-brass mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-3.5 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={1.65} />
                  </div>
                  <h3 className="font-serif text-ink mb-1.5 text-[0.95rem] font-semibold leading-snug tracking-tight sm:text-base">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-ink-muted text-xs leading-snug sm:text-[0.8125rem]">
                    {t(item.bodyKey)}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-t border-white/10 bg-navy-deep py-16 text-paper-bright sm:py-24"
        aria-labelledby="for-counsel-heading"
      >
        <div
          className="pointer-events-none absolute top-0 right-0 h-[min(520px,80vw)] w-[min(520px,80vw)] translate-x-1/4 -translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,165,116,0.14)_0%,_transparent_65%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[min(400px,70vw)] w-[min(400px,70vw)] -translate-x-1/3 translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,140,255,0.08)_0%,_transparent_70%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-brass-light mb-4 text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
              {t("heroForLawyersEyebrow")}
            </p>
            <h2
              id="for-counsel-heading"
              className="font-serif text-pretty text-3xl leading-tight font-semibold tracking-tight sm:text-4xl sm:leading-tight"
            >
              {t("lawyersTitle")}
            </h2>
            <p className="text-paper-bright/72 mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              {t("lawyersSub")}
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
            {lawyerBenefits.map((item, i) => {
              const Icon = lawyerBenefitIcons[i];
              return (
                <li
                  key={item.titleKey}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm"
                >
                  <div className="bg-brass-light/15 text-brass-light flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3 className="text-paper-bright font-semibold tracking-tight">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-paper-bright/65 mt-1.5 text-sm leading-relaxed">
                      {t(item.bodyKey)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:mt-14 sm:p-8"
            aria-label={t("heroStatsAria")}
          >
            <p className="text-paper-bright/50 mb-6 text-center text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
              {t("lawyersStatsHeading")}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {(
                [
                  {
                    valueKey: "stat1Value" as const,
                    figureKind: "multiply" as const,
                    labelKey: "stat1Label" as const,
                    subKey: "stat1Sub" as const,
                  },
                  {
                    valueKey: "stat2Value" as const,
                    figureKind: "percent" as const,
                    labelKey: "stat2Label" as const,
                    subKey: "stat2Sub" as const,
                  },
                  {
                    valueKey: "stat3Value" as const,
                    figureKind: "percent" as const,
                    labelKey: "stat3Label" as const,
                    subKey: "stat3Sub" as const,
                  },
                  {
                    valueKey: "stat4Value" as const,
                    figureKind: "rating" as const,
                    labelKey: "stat4Label" as const,
                    subKey: "stat4Sub" as const,
                  },
                ] as const
              ).map((stat) => (
                <div
                  key={stat.valueKey}
                  className="rounded-xl border border-white/10 bg-navy-deep/80 px-4 py-4 sm:px-5 sm:py-5"
                >
                  <div className="font-sans text-brass-light text-3xl font-semibold sm:text-4xl sm:leading-none md:text-[2.75rem]">
                    <PartnerStatFigure
                      kind={stat.figureKind}
                      value={t(stat.valueKey)}
                    />
                  </div>
                  <p className="text-paper-bright mt-2 text-xs font-semibold leading-snug sm:text-sm">
                    {t(stat.labelKey)}
                  </p>
                  <p className="text-paper-bright/50 mt-1.5 text-[0.7rem] leading-relaxed sm:text-xs">
                    {t(stat.subKey)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-paper-bright/45 mx-auto mt-5 max-w-2xl text-center text-[0.68rem] leading-relaxed">
              {t("statDisclaimer")}
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <Link
              href="/join"
              className="bg-paper-bright text-navy-deep hover:bg-brass-light inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02] hover:text-ink"
            >
              {tNav("joinLawyer")}
            </Link>
            <p className="text-paper-bright/50 max-w-md text-center text-xs leading-relaxed">
              {t("lawyersCtaSub")}
            </p>
          </div>
        </div>
      </section>

      <div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
        id="featured"
      >
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("featuredTitle")}
          </h2>
          <p className="text-ink-muted mx-auto mt-3 max-w-2xl text-base font-normal">
            {t("featuredSub")}
          </p>
        </div>

        <div className="border-ink/8 bg-paper-bright/80 mx-auto mb-10 max-w-3xl rounded-2xl border p-5 shadow-[0_2px_20px_rgba(26,39,68,0.05)] sm:p-6">
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

        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 sm:gap-6">
          {featuredLawyers.map((lawyer) => (
            <Link
              key={lawyer.id}
              href={`/lawyers/${lawyer.id}`}
              className="group bg-paper-bright flex w-full max-w-[260px] flex-col overflow-hidden rounded-xl border border-black/[0.06] shadow-[0_1px_2px_rgba(15,23,41,0.04)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-px hover:border-black/[0.1] hover:shadow-[0_8px_24px_rgba(15,23,41,0.07)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] lg:max-w-[260px]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                  className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
                <p className="text-ink-muted line-clamp-1 text-[0.6rem] font-medium tracking-[0.14em] uppercase">
                  {lawyer.specialty}
                </p>
                <h3 className="font-serif text-ink mt-1.5 line-clamp-2 text-[1.05rem] leading-snug font-semibold tracking-tight sm:text-lg">
                  {lawyer.name}
                </h3>
                <p className="text-ink-muted/80 mt-2 text-[0.7rem] leading-snug">
                  {lawyer.location}
                  <span className="text-ink-muted/30 mx-1.5">·</span>
                  <span className="text-ink font-semibold tabular-nums">
                    {lawyer.rate}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
