"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const benefits = [
  "Curated marketplace exposure",
  "Secure client communication portal",
  "Advanced scheduling and billing tools",
  "Zero upfront platform fees",
];

export function JoinView() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white pt-24 pb-20">
      <div className="absolute top-0 right-0 -mt-40 -mr-40 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-400 to-purple-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 pt-12 lg:grid-cols-2">
          <div>
            <Link
              href="/"
              className="mb-8 flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
            <h1 className="mb-6 text-5xl font-semibold tracking-tighter text-black md:text-6xl">
              Elevate your practice.
            </h1>
            <p className="mb-10 max-w-lg text-xl leading-relaxed font-medium text-gray-500">
              Join an exclusive network of elite legal professionals. Manage
              leads, consult securely, and scale your reputation with our
              premium workspace.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-lg font-medium text-black">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] md:p-10">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-black">
              Partner Application
            </h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-black">
                  Professional Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-black">
                  Law Firm / Practice Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-black">
                  Primary Practice Area
                </label>
                <select className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-blue-500 focus:bg-white">
                  <option>Corporate M&A</option>
                  <option>Intellectual Property</option>
                  <option>Private Wealth</option>
                  <option>Litigation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="pt-4">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 blur transition duration-500 group-hover:opacity-100" />
                  <button
                    type="submit"
                    className="relative flex w-full items-center justify-center rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
