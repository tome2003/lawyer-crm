import { notFound } from "next/navigation";
import { ConsultationForm } from "@/components/consultation-form";
import { getLawyerById } from "@/lib/lawyers";

export default async function ConsultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();
  const lawyer = getLawyerById(numericId);
  if (!lawyer) notFound();
  return <ConsultationForm lawyer={lawyer} />;
}
