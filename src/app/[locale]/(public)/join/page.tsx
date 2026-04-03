import { JoinPageClient } from "@/components/join-page-client";
import { stripeConfiguredForPlans } from "@/lib/subscription-plans";

export const dynamic = "force-dynamic";

export default function JoinPage() {
  const checkoutReady =
    Boolean(process.env.STRIPE_SECRET_KEY?.trim()) &&
    stripeConfiguredForPlans();

  return <JoinPageClient checkoutReady={checkoutReady} />;
}
