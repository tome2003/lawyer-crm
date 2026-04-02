import { redirect } from "next/navigation";

/** Legacy /search URLs forward to the full find-your-expert directory. */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const next = new URLSearchParams();
  if (typeof sp.q === "string" && sp.q) next.set("q", sp.q);
  const qs = next.toString();
  redirect(qs ? `/find-your-expert?${qs}` : "/find-your-expert");
}
