export type PlanId = "solo" | "growth" | "firm";

export const PLAN_IDS: PlanId[] = ["solo", "growth", "firm"];

export function planHighlighted(id: PlanId): boolean {
  return id === "growth";
}

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
  return PLAN_IDS.every((id) => !!process.env[PRICE_ENV_KEYS[id]]?.trim());
}
