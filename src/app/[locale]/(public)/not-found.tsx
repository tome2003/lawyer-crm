import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundView } from "@/components/not-found-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: t("title"),
    robots: { index: false, follow: true },
  };
}

export default function PublicNotFound() {
  return <NotFoundView />;
}
