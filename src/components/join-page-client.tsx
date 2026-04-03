"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { PLAN_IDS, planHighlighted, type PlanId } from "@/lib/subscription-plans";

const whyIcons = [Users, Shield, Sparkles] as const;

export function JoinPageClient({ checkoutReady }: { checkoutReady: boolean }) {
  const t = useTranslations("join");
  const locale = useLocale();
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const whyItems = [
    { titleKey: "why1Title" as const, bodyKey: "why1Body" as const },
    { titleKey: "why2Title" as const, bodyKey: "why2Body" as const },
    { titleKey: "why3Title" as const, bodyKey: "why3Body" as const },
  ];

  const steps = [
    { titleKey: "step1Title" as const, bodyKey: "step1Body" as const },
    { titleKey: "step2Title" as const, bodyKey: "step2Body" as const },
    { titleKey: "step3Title" as const, bodyKey: "step3Body" as const },
  ];

  async function startCheckout(planId: PlanId) {
    setError(null);
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, locale }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not start checkout.");
        return;
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError("No redirect URL returned.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="bg-paper-bright relative min-h-screen overflow-hidden pt-20 pb-24">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] -translate-y-1/4 translate-x-1/4 rounded-full bg-gradient-to-bl from-indigo-400/14 via-sky-300/10 to-brass/12 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] -translate-x-1/3 translate-y-1/4 rounded-full bg-gradient-to-tr from-navy/8 to-transparent blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-ink-muted hover:text-brass mb-10 inline-flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Link>

        <div className="max-w-3xl">
          <p className="text-brass text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-ink-muted mt-4 text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {whyItems.map((item, i) => {
            const Icon = whyIcons[i];
            return (
              <div
                key={item.titleKey}
                className="border-ink/10 bg-paper rounded-2xl border p-6 shadow-sm"
              >
                <div className="bg-navy/8 mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon className="text-navy h-5 w-5 opacity-90" strokeWidth={1.75} />
                </div>
                <h2 className="text-ink font-semibold tracking-tight">
                  {t(item.titleKey)}
                </h2>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {t(item.bodyKey)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 border-ink/10 bg-paper rounded-2xl border p-8 sm:p-10">
          <h2 className="font-serif text-ink text-2xl font-semibold tracking-tight">
            {t("processTitle")}
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.titleKey} className="relative flex gap-4">
                <span className="border-brass/40 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-paper-bright text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-ink font-semibold">{t(s.titleKey)}</p>
                  <p className="text-ink-muted mt-1 text-sm leading-relaxed">
                    {t(s.bodyKey)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {!checkoutReady && (
          <div
            className="border-brass/30 bg-brass/8 text-ink mt-12 rounded-2xl border px-5 py-4 text-sm leading-relaxed"
            role="status"
          >
            <strong className="font-semibold">{t("setupWarn")}</strong>{" "}
            {t("setupBody")}
          </div>
        )}

        {error && (
          <div
            className="border-red-200 bg-red-50 text-red-900 mt-6 rounded-xl border px-4 py-3 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="mt-16" id="plans">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight">
                {t("membershipTitle")}
              </h2>
              <p className="text-ink-muted mt-2 max-w-xl text-sm">
                {t("membershipSub")}
              </p>
            </div>
            <div className="text-ink-muted flex items-center gap-2 text-xs font-medium">
              <CreditCard className="h-4 w-4 opacity-70" />
              {t("stripeBadge")}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PLAN_IDS.map((planId) => {
              const features = t.raw(
                `plans.${planId}.features`,
              ) as string[];
              const highlighted = planHighlighted(planId);
              return (
                <div
                  key={planId}
                  className={`relative flex flex-col rounded-2xl border p-7 ${
                    highlighted
                      ? "border-navy/25 from-paper-bright to-paper bg-gradient-to-b shadow-[0_12px_40px_rgba(26,39,68,0.1)] ring-1 ring-navy/10"
                      : "border-ink/10 bg-paper-bright shadow-sm"
                  }`}
                >
                  {highlighted ? (
                    <span className="bg-navy text-paper-bright absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase">
                      {t("popular")}
                    </span>
                  ) : null}
                  <h3 className="font-serif text-ink text-xl font-semibold">
                    {t(`plans.${planId}.name`)}
                  </h3>
                  <p className="text-ink-muted text-sm">
                    {t(`plans.${planId}.tagline`)}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-ink text-4xl font-semibold tracking-tight">
                      {t(`plans.${planId}.priceDisplay`)}
                    </span>
                    <span className="text-ink-muted text-sm">
                      {t(`plans.${planId}.priceDetail`)}
                    </span>
                  </div>
                  <ul className="text-ink-muted mt-6 flex flex-1 flex-col gap-3 text-sm">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <CheckCircle2 className="text-navy mt-0.5 h-4 w-4 shrink-0 opacity-85" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    disabled={!checkoutReady || loadingPlan !== null}
                    onClick={() => startCheckout(planId)}
                    className="group bg-ink text-paper-bright relative mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {loadingPlan === planId ? (
                      t("redirecting")
                    ) : (
                      <>
                        {t("continuePay")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  {!checkoutReady ? (
                    <p className="text-ink-muted mt-2 text-center text-xs">
                      {t("configureStripe")}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
