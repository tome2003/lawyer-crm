"use client";

import Link from "next/link";
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
import { SUBSCRIPTION_PLANS, type PlanId } from "@/lib/subscription-plans";

const whyJoin = [
  {
    title: "Qualified inquiries",
    body: "Prospects arrive with context—practice area, jurisdiction, and matter type—so you respond faster.",
    icon: Users,
  },
  {
    title: "Professional presence",
    body: "A structured profile, credentials view, and discreet consultation flow build trust before the first call.",
    icon: Shield,
  },
  {
    title: "Tools in one place",
    body: "Pipeline, messages, calendar, and documents live in LexOS so nothing falls through the cracks.",
    icon: Sparkles,
  },
];

const steps = [
  { step: "1", title: "Choose a plan", body: "Select the monthly tier that fits your practice." },
  { step: "2", title: "Pay with Stripe", body: "Secure checkout—cards, wallets, and invoicing where enabled." },
  { step: "3", title: "Start in minutes", body: "Return here and open your workspace as soon as payment succeeds." },
];

export function JoinPageClient({ checkoutReady }: { checkoutReady: boolean }) {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(planId: PlanId) {
    setError(null);
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
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
          Back to Lex
        </Link>

        <div className="max-w-3xl">
          <p className="text-brass text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            For Counsel
          </p>
          <h1 className="font-serif text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Why join—and how you get started
          </h1>
          <p className="text-ink-muted mt-4 text-lg leading-relaxed">
            Lex connects you with clients who are actively seeking representation.
            Pick a subscription, complete checkout in under a minute with{" "}
            <span className="text-ink font-medium">Stripe</span>, then access your
            LexOS workspace.
          </p>
        </div>

        {/* Why join */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {whyJoin.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="border-ink/10 bg-paper rounded-2xl border p-6 shadow-sm"
              >
                <div className="bg-navy/8 mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon className="text-navy h-5 w-5 opacity-90" strokeWidth={1.75} />
                </div>
                <h2 className="text-ink font-semibold tracking-tight">{item.title}</h2>
                <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process */}
        <div className="mt-20 border-ink/10 bg-paper rounded-2xl border p-8 sm:p-10">
          <h2 className="font-serif text-ink text-2xl font-semibold tracking-tight">
            Straightforward process
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.step} className="relative flex gap-4">
                <span className="border-brass/40 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-paper-bright text-sm font-bold">
                  {s.step}
                </span>
                <div>
                  <p className="text-ink font-semibold">{s.title}</p>
                  <p className="text-ink-muted mt-1 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Stripe notice */}
        {!checkoutReady && (
          <div
            className="border-brass/30 bg-brass/8 text-ink mt-12 rounded-2xl border px-5 py-4 text-sm leading-relaxed"
            role="status"
          >
            <strong className="font-semibold">Setup required:</strong> Add{" "}
            <code className="bg-paper-bright/80 rounded px-1 py-0.5 text-xs">
              STRIPE_SECRET_KEY
            </code>{" "}
            and three recurring Price IDs (
            <code className="text-xs">STRIPE_PRICE_SOLO</code>,{" "}
            <code className="text-xs">GROWTH</code>,{" "}
            <code className="text-xs">FIRM</code>) to enable live checkout. See{" "}
            <code className="text-xs">.env.example</code> in the repo.
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

        {/* Pricing */}
        <div className="mt-16" id="plans">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight">
                Monthly membership
              </h2>
              <p className="text-ink-muted mt-2 max-w-xl text-sm">
                All plans bill monthly through Stripe. Cancel anytime from your
                billing portal (link emailed after signup).
              </p>
            </div>
            <div className="text-ink-muted flex items-center gap-2 text-xs font-medium">
              <CreditCard className="h-4 w-4 opacity-70" />
              Powered by Stripe Checkout
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? "border-navy/25 from-paper-bright to-paper bg-gradient-to-b shadow-[0_12px_40px_rgba(26,39,68,0.1)] ring-1 ring-navy/10"
                    : "border-ink/10 bg-paper-bright shadow-sm"
                }`}
              >
                {plan.highlighted ? (
                  <span className="bg-navy text-paper-bright absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase">
                    Most popular
                  </span>
                ) : null}
                <h3 className="font-serif text-ink text-xl font-semibold">{plan.name}</h3>
                <p className="text-ink-muted text-sm">{plan.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-ink text-4xl font-semibold tracking-tight">
                    {plan.priceDisplay}
                  </span>
                  <span className="text-ink-muted text-sm">{plan.priceDetail}</span>
                </div>
                <ul className="text-ink-muted mt-6 flex flex-1 flex-col gap-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <CheckCircle2 className="text-navy mt-0.5 h-4 w-4 shrink-0 opacity-85" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={!checkoutReady || loadingPlan !== null}
                  onClick={() => startCheckout(plan.id)}
                  className="group bg-ink text-paper-bright relative mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {loadingPlan === plan.id ? (
                    "Redirecting to Stripe…"
                  ) : (
                    <>
                      Continue & pay
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                {!checkoutReady ? (
                  <p className="text-ink-muted mt-2 text-center text-xs">
                    Configure Stripe to enable this button
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
