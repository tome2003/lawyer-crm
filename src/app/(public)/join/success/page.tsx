import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function JoinSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;

  return (
    <div className="bg-paper-bright flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="border-ink/10 bg-paper max-w-md rounded-2xl border p-10 text-center shadow-sm">
        <div className="bg-navy/8 text-navy mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <h1 className="font-serif text-ink text-2xl font-semibold tracking-tight">
          You are in
        </h1>
        <p className="text-ink-muted mt-3 text-sm leading-relaxed">
          Your subscription is processing. Stripe will email a receipt. You can
          open LexOS now—billing details sync automatically.
        </p>
        <Link
          href="/dashboard"
          className="bg-ink text-paper-bright mt-8 inline-flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-opacity hover:opacity-92"
        >
          Go to LexOS workspace
        </Link>
        <Link
          href="/"
          className="text-brass hover:text-brass-light mt-4 block text-sm font-medium"
        >
          Back to Lex
        </Link>
      </div>
    </div>
  );
}
