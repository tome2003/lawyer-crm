import Link from "next/link";
import { Scale } from "lucide-react";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-paper-bright flex min-h-screen flex-col items-center pt-32 pb-16">
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <div className="from-navy-deep ring-brass/30 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br to-navy shadow-md ring-1">
            <Scale className="text-paper-bright h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="font-serif text-ink text-2xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="text-ink-muted mt-2 text-sm">
            We will email you a link to choose a new password.
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="text-ink-muted mt-8 text-center text-sm">
          <Link
            href="/login"
            className="text-brass hover:text-brass-light font-semibold underline decoration-brass/35 underline-offset-2"
          >
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}
