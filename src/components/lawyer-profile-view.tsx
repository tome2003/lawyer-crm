import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Shield,
} from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";

export async function LawyerProfileView({ lawyer }: { lawyer: Lawyer }) {
  const t = await getTranslations("profile");

  return (
    <div className="bg-paper-bright min-h-screen pb-32 pt-20">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/find-your-expert"
          className="text-ink-muted hover:text-brass mb-12 flex items-center text-sm font-medium tracking-wide transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("backDirectory")}
        </Link>

        <div className="mb-16 flex flex-col items-center gap-12 md:flex-row md:items-start">
          <div className="relative h-48 w-48 shrink-0 md:h-64 md:w-64">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-navy/30 via-indigo-400/25 to-brass/20 blur-2xl" />
            <div className="border-paper-bright relative z-10 h-full w-full overflow-hidden rounded-full border-4 shadow-xl ring-1 ring-navy/10">
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                width={256}
                height={256}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="border-brass/20 bg-paper mb-4 inline-flex items-center space-x-2 rounded-full border px-3 py-1">
              <Shield className="text-navy h-4 w-4" />
              <span className="text-ink text-sm font-semibold">
                {lawyer.specialty}
              </span>
            </div>
            <h1 className="font-serif text-ink mb-4 text-5xl font-semibold tracking-tight md:text-6xl">
              {lawyer.name}
            </h1>
            <p className="text-ink-muted mb-8 text-xl font-normal">
              {lawyer.title} ·{" "}
              <span className="text-ink font-medium">{lawyer.firm}</span>
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-600/45 via-indigo-500/40 to-violet-600/35 opacity-70 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200" />
                <Link
                  href={`/lawyers/${lawyer.id}/consult`}
                  className="bg-ink text-paper-bright relative flex w-full items-center justify-center rounded-full px-8 py-4 text-lg font-semibold tracking-wide transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  {t("requestConsultation")}
                  <ChevronRight className="ml-2 h-5 w-5 opacity-75" />
                </Link>
              </div>
              <Link
                href={`/lawyers/${lawyer.id}/credentials`}
                className="border-ink/15 text-ink hover:border-brass/35 bg-paper-bright flex w-full items-center justify-center rounded-full border px-8 py-4 text-lg font-semibold tracking-wide transition-colors hover:bg-paper sm:w-auto"
              >
                {t("viewCredentials")}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <div className="border-ink/8 bg-paper rounded-2xl border p-8 md:p-10">
              <h2 className="font-serif text-ink mb-6 text-2xl font-semibold tracking-tight">
                {t("overview")}
              </h2>
              <p className="text-ink-muted text-lg leading-relaxed">
                {lawyer.bio}
              </p>
            </div>

            <div className="border-ink/8 bg-paper rounded-2xl border p-8 md:p-10">
              <h2 className="font-serif text-ink mb-6 text-2xl font-semibold tracking-tight">
                {t("notableMatters")}
              </h2>
              <div className="space-y-4">
                {lawyer.cases.map((c, i) => (
                  <div
                    key={i}
                    className="border-ink/8 bg-paper-bright flex flex-col justify-between rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div>
                      <h4 className="text-ink text-lg font-semibold">
                        {c.title}
                      </h4>
                      <p className="text-navy mt-1 flex items-center text-sm font-medium">
                        <CheckCircle2 className="mr-1.5 h-4 w-4 opacity-80" />
                        {c.outcome}
                      </p>
                    </div>
                    <span className="text-ink-muted mt-2 rounded-full bg-paper px-3 py-1 text-sm font-semibold sm:mt-0">
                      {c.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-ink/8 bg-paper rounded-2xl border p-8">
              <h3 className="font-serif text-ink mb-6 text-xl font-semibold tracking-tight">
                {t("details")}
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="text-ink-muted mb-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("location")}
                  </div>
                  <div className="text-ink flex items-center font-medium">
                    <MapPin className="text-ink/40 mr-2 h-4 w-4" />
                    {lawyer.location}
                  </div>
                </div>
                <div>
                  <div className="text-ink-muted mb-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("rate")}
                  </div>
                  <div className="text-ink font-medium">{lawyer.rate}</div>
                </div>
                <div>
                  <div className="text-ink-muted mb-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("education")}
                  </div>
                  <div className="text-ink text-sm font-medium">
                    {lawyer.education}
                  </div>
                </div>
                <div>
                  <div className="text-ink-muted mb-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    {t("admissions")}
                  </div>
                  <div className="text-ink space-y-1 text-sm font-medium">
                    {lawyer.admissions.map((ad, i) => (
                      <div key={i}>{ad}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
