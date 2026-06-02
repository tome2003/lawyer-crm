"use client";

import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const sectionTitle =
  "font-serif text-ink text-pretty text-3xl font-semibold tracking-tight sm:text-4xl";

const eyebrowClass =
  "text-brass font-semibold tracking-[0.22em] uppercase text-xs sm:text-sm";

const contactLabelClass =
  "text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase";

const contactValueClass =
  "text-ink text-base font-semibold tracking-tight leading-snug";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const valueNode = href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`${contactValueClass} hover:text-brass block transition-colors`}
    >
      {value}
    </a>
  ) : (
    <p className={contactValueClass}>{value}</p>
  );

  return (
    <div className="grid grid-cols-[2.75rem_1fr] items-start gap-x-4 py-5 sm:grid-cols-[3rem_1fr] sm:gap-x-5 sm:py-6">
      <dt className="flex justify-center pt-0.5">
        <div className="bg-navy/8 text-navy flex h-11 w-11 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
      </dt>
      <dd className="min-w-0 space-y-1.5">
        <p className={contactLabelClass}>{label}</p>
        {valueNode}
      </dd>
    </div>
  );
}

export function LawyerLanding() {
  const t = useTranslations("landing");

  return (
    <main className="bg-paper-bright min-h-screen pt-20 sm:pt-24">
      <section className="from-navy-deep via-[#111a2c] to-navy-deep relative overflow-hidden bg-gradient-to-b py-12 sm:py-20">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(99,140,255,0.28)_0%,_transparent_65%)] blur-[90px] sm:h-[520px] sm:w-[520px] sm:blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-[35%] left-[35%] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,165,116,0.22)_0%,_transparent_70%)] blur-[90px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className={`${eyebrowClass} mb-4 tracking-[0.25em]`}>
                {t("eyebrow")}
              </p>
              <h1 className="font-serif text-paper-bright text-balance text-[2.35rem] leading-[1.06] font-semibold tracking-tight sm:text-6xl">
                {t("heroName")}
              </h1>
              <h2 className="text-paper-bright/80 mt-3 max-w-2xl text-balance text-base font-medium leading-relaxed sm:mt-4 sm:text-2xl">
                {t("heroDescription")}
              </h2>

              <div className="mt-8 flex flex-col items-start gap-3">
                <div className="text-paper-bright/70 inline-flex items-center gap-2 text-base">
                  <Scale className="h-4 w-4" strokeWidth={1.75} />
                  {t("heroSmallLine")}
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${t("contactEmail")}`}
                    className="border-paper-bright/14 bg-paper-bright/8 hover:bg-paper-bright/12 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-base font-semibold tracking-wide text-paper-bright transition-colors sm:px-6 sm:py-4"
                  >
                    <Mail className="h-4 w-4 opacity-90" strokeWidth={1.75} />
                    {t("contactEmail")}
                  </a>
                  <a
                    href={`tel:${t("contactPhoneTel")}`}
                    className="border-paper-bright/14 bg-paper-bright/8 hover:bg-paper-bright/12 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-base font-semibold tracking-wide text-paper-bright transition-colors sm:px-6 sm:py-4"
                  >
                    <Phone className="h-4 w-4 opacity-90" strokeWidth={1.75} />
                    {t("contactPhone")}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-paper-bright/12 bg-paper-bright/6 relative mx-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-none border shadow-[0_16px_60px_rgba(0,0,0,0.35)] sm:max-w-sm">
                <Image
                  src={t("heroImageUrl")}
                  alt={t("heroName")}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="rounded-none object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper border-ink/8 border-b py-14 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className={`${eyebrowClass} mb-3`}>
                {t("heroHighlightsTitle")}
              </p>
              <ul className="text-ink-muted mt-4 grid gap-4 text-base leading-relaxed sm:mt-5 sm:grid-cols-2 sm:text-lg">
                {(
                  [
                    "heroHighlight1",
                    "heroHighlight2",
                    "heroHighlight3",
                    "heroHighlight4",
                    "heroHighlight5",
                  ] as const
                ).map((key) => (
                  <li key={key} className="flex min-w-0 items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass/80"
                      aria-hidden
                    />
                    <span className="min-w-0">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <p className={`${eyebrowClass} mb-3`}>
                {t("heroEducationTitle")}
              </p>
              <p className="text-ink-muted text-base leading-relaxed sm:text-lg">
                {t("heroEducationBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-paper py-16 sm:py-20"
        aria-labelledby="services-heading"
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <p className={`${eyebrowClass} mb-3 text-center`}>
            {t("servicesEyebrow")}
          </p>
          <h2 id="services-heading" className={`${sectionTitle} text-center`}>
            {t("servicesTitle")}
          </h2>
          <p className="text-ink-muted mt-4 text-center text-base leading-relaxed sm:text-lg">
            {t("servicesSub")}
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { title: t("service1Title"), body: t("service1Body") },
                { title: t("service2Title"), body: t("service2Body") },
                { title: t("service3Title"), body: t("service3Body") },
                { title: t("service4Title"), body: t("service4Body") },
                { title: t("service5Title"), body: t("service5Body") },
                { title: t("service6Title"), body: t("service6Body") },
              ] as const
            ).map((item) => (
              <li
                key={item.title}
                className="py-2"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-brass mt-0.5 h-5 w-5 shrink-0"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <h3 className="text-ink text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-ink-muted mt-1 text-base leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="contact"
        className="border-ink/8 bg-paper-bright border-t py-16 sm:py-20"
        aria-labelledby="contact-heading"
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className={`${eyebrowClass} mb-3`}>
              {t("contactEyebrow")}
            </p>
            <h2 id="contact-heading" className={sectionTitle}>
              {t("contactTitle")}
            </h2>
            <p className="text-ink-muted mt-4 text-base leading-relaxed sm:text-lg">
              {t("contactSub")}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl sm:mt-12">
            <dl className="border-ink/10 divide-ink/10 divide-y border-y">
              <ContactRow
                icon={Mail}
                label={t("contactEmailLabel")}
                value={t("contactEmail")}
                href={`mailto:${t("contactEmail")}`}
              />
              <ContactRow
                icon={Phone}
                label={t("contactPhoneLabel")}
                value={t("contactPhone")}
                href={`tel:${t("contactPhoneTel")}`}
              />
              <ContactRow
                icon={MapPin}
                label={t("contactAddressLabel")}
                value={t("contactAddress")}
              />
              <ContactRow
                icon={MessageCircle}
                label={t("contactWhatsappCta")}
                value={t("contactPhone")}
                href={t("contactWhatsappUrl")}
                external
              />
            </dl>
          </div>

          <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${t("contactPhoneTel")}`}
              className="bg-ink text-paper-bright rounded-full px-8 py-3.5 text-base font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(59,130,246,0.18),0_0_40px_rgba(139,115,85,0.06)]"
            >
              {t("contactCallCta")}
            </a>
            <a
              href={t("contactWhatsappUrl")}
              target="_blank"
              rel="noreferrer"
              className="border-ink/12 text-ink hover:border-ink/22 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold tracking-wide transition-colors"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              {t("contactWhatsappCta")}
            </a>
          </div>
          <p className="text-ink-muted mt-6 text-center text-sm leading-relaxed sm:text-base">
            {t("contactNote")}
          </p>
        </div>
      </section>
    </main>
  );
}

