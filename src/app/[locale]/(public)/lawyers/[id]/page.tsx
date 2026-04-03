import { notFound } from "next/navigation";
import { LawyerProfileView } from "@/components/lawyer-profile-view";
import { getLawyerById } from "@/lib/lawyers";

export default async function LawyerPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();

  const lawyer = getLawyerById(numericId);
  if (!lawyer) notFound();

  return <LawyerProfileView lawyer={lawyer} />;
}
