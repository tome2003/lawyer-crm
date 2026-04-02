import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, Star } from "lucide-react";
import { MOCK_LAWYERS } from "@/lib/lawyers";

export function MarketplaceView() {
  return (
    <div className="bg-paper-bright min-h-screen pt-16">
      <div className="from-navy-deep via-[#121c2e] to-navy-deep relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b py-24 sm:py-40">
        {/* Cool glow */}
        <div className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/25 to-violet-600/20 blur-[88px] md:h-[560px] md:w-[560px] md:blur-[120px]" />
        {/* Warm brass accent glow — discreet, “firm” */}
        <div className="absolute top-[42%] left-[38%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brass-light/20 via-amber-500/10 to-transparent blur-[72px] md:h-[360px] md:w-[360px] md:blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-brass mb-5 text-[0.65rem] font-semibold tracking-[0.25em] text-balance uppercase">
            Independent legal directory
          </p>
          <h1 className="font-serif text-paper-bright mb-6 text-[2.65rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Counsel,{" "}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
              elevated.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-normal tracking-tight text-paper-bright/78 sm:text-lg">
            Discreet access to experienced practitioners. Judgment, clarity, and
            uncompromising standards.
          </p>

          <form
            action="/find-your-expert"
            method="get"
            className="mx-auto mt-12 flex max-w-2xl flex-col rounded-2xl border border-white/12 bg-white/8 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-xl sm:flex-row sm:rounded-full"
          >
            <div className="flex flex-1 items-center px-4 py-2.5">
              <Search className="text-paper/50 h-5 w-5 shrink-0" />
              <input
                name="q"
                type="search"
                placeholder="Practice area, jurisdiction, or name…"
                className="text-paper placeholder:text-paper/45 ml-3 w-full bg-transparent text-lg outline-none"
              />
            </div>
            <button
              type="submit"
              className="text-ink mt-2 flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(255,255,255,0.12)] transition-all hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(147,197,253,0.35)] sm:mt-0"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        id="featured"
      >
        <div className="mb-16 text-center">
          <h2 className="font-serif text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
            Featured partners
          </h2>
          <p className="text-ink-muted mt-3 text-lg font-normal">
            Peer-respected practitioners across core commercial disciplines.
          </p>
          <Link
            href="/find-your-expert"
            className="text-brass hover:text-brass-light mt-5 inline-flex items-center text-sm font-semibold tracking-wide underline decoration-brass/40 underline-offset-4 transition-colors"
          >
            Browse full directory
            <ChevronRight className="ml-0.5 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_LAWYERS.map((lawyer) => (
            <Link
              key={lawyer.id}
              href={`/lawyers/${lawyer.id}`}
              className="border-ink/8 group relative cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_20px_50px_rgba(26,39,68,0.08)]"
            >
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-navy-deep/10 to-transparent opacity-90" />
                <div className="absolute right-4 bottom-4 left-4 text-white">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-white/18 px-2 py-1 text-xs font-medium backdrop-blur-md">
                      {lawyer.specialty}
                    </span>
                    <span className="flex items-center rounded-sm bg-black/35 px-2 py-1 text-xs font-medium backdrop-blur-md">
                      <Star className="text-brass-light mr-1 h-3 w-3 fill-current" />
                      {lawyer.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-1">
                <h3 className="font-serif text-ink mb-1 text-2xl font-semibold tracking-tight">
                  {lawyer.name}
                </h3>
                <p className="text-ink-muted mb-6 text-sm font-medium">
                  {lawyer.firm}
                </p>

                <span className="border-ink/8 text-ink flex w-full items-center justify-center rounded-xl border bg-paper py-4 text-sm font-semibold tracking-wide transition-colors duration-300 group-hover:border-transparent group-hover:bg-ink group-hover:text-paper-bright">
                  View profile{" "}
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
