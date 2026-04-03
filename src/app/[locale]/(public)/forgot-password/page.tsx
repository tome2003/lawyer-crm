import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default async function ForgotPasswordPage() {
  const t = await getTranslations("forgot");

  return (
    <div className="bg-paper-bright flex min-h-screen flex-col items-center pt-32 pb-16">
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-ink text-2xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-ink-muted mt-2 text-sm">{t("sub")}</p>
        </div>

        <ForgotPasswordForm />

        <p className="text-ink-muted mt-8 text-center text-sm">
          <Link
            href="/login"
            className="text-brass hover:text-brass-light font-semibold underline decoration-brass/35 underline-offset-2"
          >
            {t("backLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
