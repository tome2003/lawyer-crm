import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

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
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonicalPath = `${localePrefix}/`;
  return {
    title: t("title"),
    description: t("description"),
    manifest: "/site.webmanifest",
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        en: absoluteUrl("/en/"),
        pt: absoluteUrl("/"),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: absoluteUrl(canonicalPath),
      siteName: "Manuel GG",
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      alternateLocale: locale === "pt" ? ["en_GB"] : ["pt_PT"],
      images: [
        {
          url: absoluteUrl("/manuel-gg.png"),
          width: 908,
          height: 1024,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [absoluteUrl("/manuel-gg.png")],
    },
    appleWebApp: {
      capable: true,
      title: t("title"),
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
