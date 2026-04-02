"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export function LoginView() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-32 pb-12">
      <div className="w-full max-w-md px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Welcome back
          </h2>
          <p className="mt-2 font-medium text-gray-500">
            Log in to your LexOS workspace.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-gray-50/80 p-8 shadow-sm backdrop-blur-xl">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="partner@firm.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 blur transition duration-500 group-hover:opacity-100" />
                <button
                  type="submit"
                  className="relative flex w-full items-center justify-center rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Access Workspace
                </button>
              </div>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Not a partner yet?{" "}
          <Link href="/join" className="font-semibold text-black hover:underline">
            Apply to join
          </Link>
        </p>
      </div>
    </div>
  );
}
