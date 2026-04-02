export type PlanId = "solo" | "growth" | "firm";

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceDisplay: string;
  priceDetail: string;
  highlighted?: boolean;
  features: string[];
}

/** Display catalog — amounts shown in UI. Link real Stripe Price IDs via env. */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "solo",
    name: "Solo",
    tagline: "Individual practitioner",
    priceDisplay: "$79",
    priceDetail: "per month",
    features: [
      "Directory profile & intake inbox",
      "Up to 25 active inquiries / mo",
      "Secure messaging (basic)",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Small firm, more volume",
    priceDisplay: "$149",
    priceDetail: "per month",
    highlighted: true,
    features: [
      "Everything in Solo",
      "Unlimited inquiries",
      "Calendar sync & reminders",
      "Document templates vault",
      "Priority support",
    ],
  },
  {
    id: "firm",
    name: "Firm",
    tagline: "Partners & teams",
    priceDisplay: "$299",
    priceDetail: "per month",
    features: [
      "Everything in Growth",
      "Up to 8 seat licenses",
      "Shared pipeline & roles",
      "Custom intake forms",
      "Dedicated onboarding",
    ],
  },
];

const PRICE_ENV_KEYS: Record<PlanId, string> = {
  solo: "STRIPE_PRICE_SOLO",
  growth: "STRIPE_PRICE_GROWTH",
  firm: "STRIPE_PRICE_FIRM",
};

export function getStripePriceIdForPlan(planId: string): string | null {
  if (planId !== "solo" && planId !== "growth" && planId !== "firm") {
    return null;
  }
  const key = PRICE_ENV_KEYS[planId];
  const id = process.env[key]?.trim();
  return id || null;
}

export function stripeConfiguredForPlans(): boolean {
  return SUBSCRIPTION_PLANS.every(
    (p) => !!process.env[PRICE_ENV_KEYS[p.id]]?.trim(),
  );
}
