"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";

export function ConsultationForm({ lawyer }: { lawyer: Lawyer }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-paper-bright min-h-screen pb-24 pt-24">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <h1 className="font-serif text-ink text-3xl font-semibold tracking-tight">
            Request received
          </h1>
          <p className="text-ink-muted mt-4">
            Thank you. {lawyer.name} or their office will respond shortly to
            coordinate a confidential consultation.
          </p>
          <Link
            href="/"
            className="text-brass hover:text-brass-light mt-8 inline-flex items-center font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper-bright min-h-screen pb-24 pt-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <Link
          href={`/lawyers/${lawyer.id}`}
          className="text-ink-muted hover:text-brass mb-8 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profile
        </Link>

        <div className="mb-10 flex items-center gap-4">
          <Image
            src={lawyer.image}
            alt=""
            width={56}
            height={56}
            className="ring-ink/8 rounded-full object-cover ring-2"
          />
          <div>
            <h1 className="font-serif text-ink text-2xl font-semibold tracking-tight">
              Request a consultation
            </h1>
            <p className="text-ink-muted text-sm">
              With {lawyer.name} — {lawyer.specialty}
            </p>
          </div>
        </div>

        <form
          className="border-ink/10 bg-paper space-y-6 rounded-2xl border p-8 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-ink mb-2 block text-sm font-semibold">
                Full name
              </label>
              <input
                required
                className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4"
              />
            </div>
            <div>
              <label className="text-ink mb-2 block text-sm font-semibold">
                Phone
              </label>
              <input
                type="tel"
                className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4"
              />
            </div>
          </div>
          <div>
            <label className="text-ink mb-2 block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4"
            />
          </div>
          <div>
            <label className="text-ink mb-2 block text-sm font-semibold">
              Brief description of your matter
            </label>
            <textarea
              required
              rows={4}
              className="border-ink/12 bg-paper-bright text-ink focus:border-navy focus:ring-navy/12 w-full resize-none rounded-xl border px-4 py-3 outline-none focus:ring-4"
              placeholder="Do not include confidential details you are uncomfortable sharing online."
            />
          </div>
          <div>
            <label className="text-ink mb-2 block text-sm font-semibold">
              Preferred contact window
            </label>
            <select className="border-ink/12 bg-paper-bright text-ink focus:border-navy w-full rounded-xl border px-4 py-3 outline-none">
              <option>Business hours (ET)</option>
              <option>Evenings</option>
              <option>Either</option>
            </select>
          </div>

          <div className="relative pt-2 group">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-600/35 via-indigo-500/35 to-violet-600/28 opacity-70 blur transition duration-500 group-hover:opacity-100" />
            <button
              type="submit"
              className="bg-ink text-paper-bright relative flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold tracking-wide transition-transform hover:scale-[1.02]"
            >
              Submit request
              <ChevronRight className="ml-2 h-5 w-5 opacity-75" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
