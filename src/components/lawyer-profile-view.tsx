import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Shield,
} from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";

export function LawyerProfileView({ lawyer }: { lawyer: Lawyer }) {
  return (
    <div className="min-h-screen bg-white pb-32 pt-16">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-12 flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Partners
        </Link>

        <div className="mb-16 flex flex-col items-center gap-12 md:flex-row md:items-start">
          <div className="relative h-48 w-48 shrink-0 md:h-64 md:w-64">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 blur-2xl" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl">
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
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-gray-100 px-3 py-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">
                {lawyer.specialty}
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-semibold tracking-tighter text-black md:text-6xl">
              {lawyer.name}
            </h1>
            <p className="mb-8 text-xl font-medium text-gray-500">
              {lawyer.title} at{" "}
              <span className="text-black">{lawyer.firm}</span>
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 blur transition duration-500 group-hover:opacity-100 group-hover:duration-200" />
                <button
                  type="button"
                  className="relative flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  Request Consultation
                  <ChevronRight className="ml-2 h-5 w-5 text-white/70" />
                </button>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-gray-50 px-8 py-4 text-lg font-semibold text-black transition-colors hover:bg-gray-100 sm:w-auto"
              >
                View Credentials
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <div className="rounded-3xl bg-gray-50/50 p-8 md:p-10">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-black">
                Overview
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {lawyer.bio}
              </p>
            </div>

            <div className="rounded-3xl bg-gray-50/50 p-8 md:p-10">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-black">
                Notable Matters
              </h2>
              <div className="space-y-4">
                {lawyer.cases.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-black">
                        {c.title}
                      </h4>
                      <p className="mt-1 flex items-center text-sm font-medium text-blue-600">
                        <CheckCircle2 className="mr-1.5 h-4 w-4" />{" "}
                        {c.outcome}
                      </p>
                    </div>
                    <span className="mt-2 rounded-full bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-400 sm:mt-0">
                      {c.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-gray-50/50 p-8">
              <h3 className="mb-6 text-xl font-semibold tracking-tight text-black">
                Details
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Location
                  </div>
                  <div className="flex items-center font-medium text-black">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    {lawyer.location}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Rate
                  </div>
                  <div className="font-medium text-black">{lawyer.rate}</div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Education
                  </div>
                  <div className="text-sm font-medium text-black">
                    {lawyer.education}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Admissions
                  </div>
                  <div className="space-y-1 text-sm font-medium text-black">
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
