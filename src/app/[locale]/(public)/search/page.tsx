import { redirect } from "@/i18n/navigation";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const q = typeof sp.q === "string" && sp.q ? sp.q : undefined;
  redirect({
    href: q
      ? { pathname: "/find-your-expert", query: { q } }
      : "/find-your-expert",
    locale,
  });
}
