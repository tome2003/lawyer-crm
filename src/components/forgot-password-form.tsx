"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function ForgotPasswordForm() {
  const t = useTranslations("forgot");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border-ink/10 bg-paper rounded-2xl border p-8 text-center shadow-sm">
        <p className="text-ink font-medium">{t("sentTitle")}</p>
        <p className="text-ink-muted mt-2 text-sm">{t("sentBody")}</p>
      </div>
    );
  }

  return (
    <form
      className="border-ink/10 bg-paper space-y-5 rounded-2xl border p-8 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label className="text-ink mb-2 block text-sm font-semibold">
          {t("email")}
        </label>
        <input
          type="email"
          required
          className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4"
          placeholder={t("emailPh")}
        />
      </div>
      <button
        type="submit"
        className="bg-ink text-paper-bright w-full rounded-xl py-3 font-semibold tracking-wide transition-opacity hover:opacity-92"
      >
        {t("submit")}
      </button>
    </form>
  );
}
