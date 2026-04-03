import { NextResponse } from "next/server";
import Stripe from "stripe";
import { routing } from "@/i18n/routing";
import { getStripePriceIdForPlan } from "@/lib/subscription-plans";

function getBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export async function GET() {
  const hasSecret = !!process.env.STRIPE_SECRET_KEY?.trim();
  const priceId = getStripePriceIdForPlan("solo");
  const hasPrices = !!priceId && !!getStripePriceIdForPlan("growth") && !!getStripePriceIdForPlan("firm");
  return NextResponse.json({ ready: hasSecret && hasPrices });
}

export async function POST(request: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    if (!secret) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY and Stripe Price IDs to your environment.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const planId = typeof body.planId === "string" ? body.planId : "";
    const rawLocale =
      typeof body.locale === "string" ? body.locale : routing.defaultLocale;
    const locale = routing.locales.includes(
      rawLocale as (typeof routing.locales)[number],
    )
      ? rawLocale
      : routing.defaultLocale;
    const pathPrefix =
      locale === routing.defaultLocale ? "" : `/${locale}`;
    const priceId = getStripePriceIdForPlan(planId);
    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "Invalid plan or missing Price ID. Create recurring prices in Stripe and set STRIPE_PRICE_SOLO, STRIPE_PRICE_GROWTH, STRIPE_PRICE_FIRM.",
        },
        { status: 400 },
      );
    }

    const stripe = new Stripe(secret);
    const base = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}${pathPrefix}/join/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}${pathPrefix}/join`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: {
        metadata: { planId },
      },
      metadata: { planId },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not create a Checkout session." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
