"use client";

import { useState } from "react";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border-ink/10 bg-paper rounded-2xl border p-8 text-center shadow-sm">
        <p className="text-ink font-medium">Check your inbox</p>
        <p className="text-ink-muted mt-2 text-sm">
          If an account exists for that email, you will receive reset
          instructions shortly.
        </p>
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
          Work email
        </label>
        <input
          type="email"
          required
          className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4"
          placeholder="partner@firm.com"
        />
      </div>
      <button
        type="submit"
        className="bg-ink text-paper-bright w-full rounded-xl py-3 font-semibold tracking-wide transition-opacity hover:opacity-92"
      >
        Send reset link
      </button>
    </form>
  );
}
