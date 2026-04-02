import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, Scale } from "lucide-react";
import { getLawyerById } from "@/lib/lawyers";

export default async function CredentialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (Number.isNaN(numericId)) notFound();
  const lawyer = getLawyerById(numericId);
  if (!lawyer) notFound();

  return (
    <div className="bg-paper-bright min-h-screen pb-24 pt-16">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href={`/lawyers/${lawyer.id}`}
          className="text-ink-muted hover:text-brass mb-10 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profile
        </Link>

        <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            width={96}
            height={96}
            className="border-paper-bright ring-ink/10 rounded-full border-4 object-cover shadow-xl ring-2"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-serif text-ink text-3xl font-semibold tracking-tight">
              Credentials & admissions
            </h1>
            <p className="text-ink-muted mt-2">{lawyer.name}</p>
            <p className="text-ink-muted/80 text-sm">{lawyer.firm}</p>
          </div>
        </div>

        <div className="space-y-8">
          <section className="border-ink/10 bg-paper rounded-2xl border p-8">
            <div className="text-ink mb-4 flex items-center gap-2">
              <Award className="text-navy h-5 w-5" />
              <h2 className="text-lg font-semibold tracking-tight">Education</h2>
            </div>
            <p className="text-ink-muted leading-relaxed">{lawyer.education}</p>
            <p className="text-ink-muted mt-3 text-sm">
              Additional CLE and executive programs available upon request
              during intake.
            </p>
          </section>

          <section className="border-ink/10 bg-paper rounded-2xl border p-8">
            <div className="text-ink mb-4 flex items-center gap-2">
              <Scale className="text-navy h-5 w-5" strokeWidth={1.75} />
              <h2 className="text-lg font-semibold tracking-tight">
                Bar admissions
              </h2>
            </div>
            <ul className="space-y-2">
              {lawyer.admissions.map((a, i) => (
                <li key={i} className="text-ink flex items-center">
                  <span className="bg-navy mr-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-85" />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-ink/10 bg-paper rounded-2xl border p-8">
            <h2 className="text-ink mb-4 text-lg font-semibold tracking-tight">
              Representative matters
            </h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Detailed matter lists and references are shared under engagement
              and confidentiality agreements. Public indicators appear on the
              main profile.
            </p>
          </section>

          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-600/30 via-indigo-500/28 to-violet-600/25 opacity-70 blur transition group-hover:opacity-100" />
            <Link
              href={`/lawyers/${lawyer.id}/consult`}
              className="bg-ink text-paper-bright relative flex w-full items-center justify-center rounded-full py-4 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.01] sm:w-auto sm:px-10"
            >
              Request consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
