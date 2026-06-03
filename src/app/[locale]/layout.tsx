import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  canonicalUrlForLocale,
  getSiteUrl,
  localeAlternateLanguages,
} from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const languages = localeAlternateLanguages();
  const canonical =
    locale === "pt" || locale === "en"
      ? canonicalUrlForLocale(locale)
      : canonicalUrlForLocale(routing.defaultLocale);

  const pageTitle = t("title");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { absolute: pageTitle },
    description: t("description"),
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      ],
      apple: [{ url: "/web-app-manifest-192x192.png", sizes: "192x192" }],
    },
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: pageTitle,
      description: t("description"),
      url: canonical,
      siteName: "Manuel GG",
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      alternateLocale: locale === "pt" ? ["en_GB"] : ["pt_PT"],
      images: [
        {
          url: "/manuel-gg.png",
          width: 908,
          height: 1024,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: t("description"),
      images: ["/manuel-gg.png"],
    },
    appleWebApp: {
      capable: true,
      title: pageTitle,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="text-ink flex min-h-full flex-col font-sans selection:bg-navy/15 selection:text-navy">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
