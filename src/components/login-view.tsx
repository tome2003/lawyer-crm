"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

export function LoginView() {
  const t = useTranslations("login");
  const router = useRouter();

  return (
    <div className="bg-paper-bright flex min-h-screen flex-col items-center pt-32 pb-12">
      <div className="w-full max-w-md px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="text-ink-muted mt-2 font-normal">{t("sub")}</p>
        </div>

        <div className="border-ink/10 bg-paper rounded-2xl border p-8 shadow-[0_2px_24px_rgba(26,39,68,0.06)]">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            <div>
              <label className="text-ink mb-2 block text-sm font-semibold">
                {t("email")}
              </label>
              <input
                type="email"
                className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4"
                placeholder={t("emailPh")}
              />
            </div>
            <div>
              <label className="text-ink mb-2 block text-sm font-semibold">
                {t("password")}
              </label>
              <input
                type="password"
                className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 transition-all outline-none focus:ring-4"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="border-ink/25 text-ink focus:ring-navy h-4 w-4 rounded"
                />
                <span className="text-ink-muted ml-2 text-sm font-medium">
                  {t("remember")}
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-navy text-sm font-semibold hover:text-navy/80"
              >
                {t("forgot")}
              </Link>
            </div>

            <div className="pt-2">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-600/35 via-indigo-500/35 to-violet-600/30 opacity-70 blur transition duration-500 group-hover:opacity-100" />
                <button
                  type="submit"
                  className="bg-ink text-paper-bright relative flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold tracking-wide transition-transform hover:scale-[1.02]"
                >
                  {t("submit")}
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="text-ink-muted mt-8 text-center text-sm font-medium">
          {t("noAccount")}{" "}
          <Link
            href="/join"
            className="text-brass hover:text-brass-light font-semibold underline decoration-brass/35 underline-offset-2"
          >
            {t("apply")}
          </Link>
        </p>
      </div>
    </div>
  );
}
