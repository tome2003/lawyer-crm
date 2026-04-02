import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, Star } from "lucide-react";
import { MOCK_LAWYERS } from "@/lib/lawyers";

export function MarketplaceView() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-black py-24 sm:py-40">
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-40 blur-[80px] md:h-[600px] md:w-[600px] md:blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 font-sans text-5xl font-semibold tracking-tighter text-white sm:text-7xl lg:text-8xl">
            Counsel,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              elevated.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium tracking-tight text-gray-400 sm:text-xl">
            Discover elite legal representation. Simple, discreet, and
            uncompromising.
          </p>

          <div className="mx-auto mt-12 flex max-w-2xl flex-col rounded-3xl border border-white/20 bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:flex-row sm:rounded-full">
            <div className="flex flex-1 items-center px-4 py-2">
              <Search className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Search practice or partner..."
                className="ml-3 w-full bg-transparent text-lg text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="mt-2 flex items-center justify-center rounded-full bg-white px-8 py-3 font-semibold text-black transition-transform hover:scale-105 sm:mt-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" id="featured">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tighter text-black sm:text-4xl">
            Featured Partners
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-500">
            The brightest minds in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_LAWYERS.map((lawyer) => (
            <Link
              key={lawyer.id}
              href={`/lawyers/${lawyer.id}`}
              className="group relative cursor-pointer rounded-3xl border border-gray-100 bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-white/20 px-2 py-1 text-xs font-medium backdrop-blur-md">
                      {lawyer.specialty}
                    </span>
                    <span className="flex items-center rounded-md bg-black/40 px-2 py-1 text-xs font-medium backdrop-blur-md">
                      <Star className="mr-1 h-3 w-3 fill-current text-yellow-400" />
                      {lawyer.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-2">
                <h3 className="mb-1 text-2xl font-semibold tracking-tight text-black">
                  {lawyer.name}
                </h3>
                <p className="mb-6 text-sm font-medium text-gray-500">
                  {lawyer.firm}
                </p>

                <span className="flex w-full items-center justify-center rounded-xl bg-gray-50 py-4 font-semibold text-black transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                  View Profile{" "}
                  <ChevronRight className="ml-1 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
