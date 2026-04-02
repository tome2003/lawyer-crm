import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import {
  getLocationOptions,
  getSpecialtyOptions,
  searchLawyers,
} from "@/lib/search-lawyers";
import { MOCK_LAWYERS } from "@/lib/lawyers";

export default async function FindYourExpertPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    specialty?: string;
    location?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const specialty = params.specialty ?? "all";
  const location = params.location ?? "all";
  const sort = params.sort ?? "rating";

  const specialties = getSpecialtyOptions(MOCK_LAWYERS);
  const locations = getLocationOptions(MOCK_LAWYERS);
  const results = searchLawyers(MOCK_LAWYERS, {
    q,
    specialty,
    location,
    sort,
  });

  return (
    <div className="bg-paper min-h-screen pt-16 pb-20">
      <div className="border-ink/8 from-paper-bright relative overflow-hidden border-b bg-gradient-to-b to-paper">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-bl from-indigo-400/12 via-transparent to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-tr from-brass/10 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-brass text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
            Counsel directory
          </p>
          <h1 className="font-serif text-ink mt-3 text-4xl font-semibold tracking-tight sm:text-[2.75rem] sm:leading-tight">
            Find your expert
          </h1>
          <p className="text-ink-muted mt-4 max-w-2xl text-lg leading-relaxed font-normal">
            Search by keyword, refine by practice and jurisdiction, and review
            counsel credentials before you inquire.
          </p>

          <form
            method="get"
            action="/find-your-expert"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="border-ink/10 bg-paper-bright flex flex-1 items-center rounded-xl border px-4 py-3.5 shadow-sm">
              <Search className="text-ink-muted h-5 w-5 shrink-0" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Name, firm, practice, city…"
                className="text-ink placeholder:text-ink-muted/70 ml-3 w-full bg-transparent text-base outline-none"
              />
            </div>
            {specialty !== "all" ? (
              <input type="hidden" name="specialty" value={specialty} />
            ) : null}
            {location !== "all" ? (
              <input type="hidden" name="location" value={location} />
            ) : null}
            {sort !== "rating" ? (
              <input type="hidden" name="sort" value={sort} />
            ) : null}
            <button
              type="submit"
              className="bg-ink text-paper-bright rounded-xl px-8 py-3.5 text-sm font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(59,130,246,0.18),0_0_40px_rgba(139,115,85,0.06)]"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <div className="border-ink/10 bg-paper-bright sticky top-24 rounded-xl border p-6 shadow-[0_2px_20px_rgba(26,39,68,0.06)]">
              <div className="text-ink mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide">
                <SlidersHorizontal className="h-4 w-4 opacity-70" />
                Refine results
              </div>

              <form method="get" action="/find-your-expert" className="space-y-5">
                {q ? <input type="hidden" name="q" value={q} /> : null}

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    Practice area
                  </label>
                  <select
                    name="specialty"
                    defaultValue={specialty}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="all">All areas</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    Location
                  </label>
                  <select
                    name="location"
                    defaultValue={location}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="all">All locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-ink-muted mb-1.5 block text-[0.65rem] font-semibold tracking-[0.12em] uppercase">
                    Sort by
                  </label>
                  <select
                    name="sort"
                    defaultValue={sort}
                    className="border-ink/12 bg-paper text-ink w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                  >
                    <option value="rating">Highest rated</option>
                    <option value="reviews">Most reviews</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-ink text-paper-bright w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-92"
                >
                  Apply filters
                </button>
              </form>

              <Link
                href="/find-your-expert"
                className="text-ink-muted hover:text-brass mt-4 block text-center text-sm font-medium transition-colors"
              >
                Clear all
              </Link>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-ink-muted text-sm">
                <span className="text-ink font-semibold">{results.length}</span>{" "}
                expert{results.length === 1 ? "" : "s"}
                {q ? (
                  <>
                    {" "}
                    matching “<span className="text-ink">{q}</span>”
                  </>
                ) : null}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="border-ink/12 bg-paper-bright rounded-xl border border-dashed px-8 py-16 text-center shadow-sm">
                <p className="font-serif text-ink text-lg font-semibold">
                  No experts match
                </p>
                <p className="text-ink-muted mt-2 text-sm">
                  Loosen filters or try a shorter keyword.
                </p>
                <Link
                  href="/find-your-expert"
                  className="text-brass hover:text-brass-light mt-6 inline-block text-sm font-semibold transition-colors"
                >
                  Reset directory
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {results.map((lawyer) => (
                  <li key={lawyer.id}>
                    <Link
                      href={`/lawyers/${lawyer.id}`}
                      className="border-ink/10 bg-paper-bright group flex flex-col gap-4 rounded-xl border p-4 shadow-sm transition-all hover:border-navy/18 hover:shadow-[0_8px_30px_rgba(26,39,68,0.08)] sm:flex-row sm:items-center sm:gap-6 sm:p-5"
                    >
                      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                        <Image
                          src={lawyer.image}
                          alt=""
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-serif text-ink group-hover:text-navy text-xl font-semibold tracking-tight transition-colors">
                            {lawyer.name}
                          </h2>
                          <span className="border-brass/25 bg-brass/8 text-brass flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            <Star className="text-brass-light mr-0.5 h-3 w-3 fill-current opacity-90" />
                            {lawyer.rating}{" "}
                            <span className="text-brass ml-1 font-normal opacity-90">
                              ({lawyer.reviews})
                            </span>
                          </span>
                        </div>
                        <p className="text-ink-muted mt-0.5 text-sm">
                          {lawyer.title} · {lawyer.firm}
                        </p>
                        <div className="text-ink-muted mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="text-ink/35 h-4 w-4 shrink-0" />
                            {lawyer.specialty}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="text-ink/35 h-4 w-4 shrink-0" />
                            {lawyer.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                        <p className="text-ink text-sm font-semibold">
                          {lawyer.rate}
                        </p>
                        <span className="border-brass/20 bg-ink text-paper-bright inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-all group-hover:shadow-[0_0_18px_rgba(59,130,246,0.2)] sm:justify-end">
                          View profile
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
