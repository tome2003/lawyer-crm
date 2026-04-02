import type { Lawyer } from "./lawyers";

export function getSpecialtyOptions(lawyers: Lawyer[]): string[] {
  return [...new Set(lawyers.map((l) => l.specialty))].sort();
}

export function getLocationOptions(lawyers: Lawyer[]): string[] {
  return [...new Set(lawyers.map((l) => l.location))].sort();
}

export type LawyerSort = "rating" | "reviews" | "name";

export function searchLawyers(
  lawyers: Lawyer[],
  filters: {
    q?: string;
    specialty?: string;
    location?: string;
    sort?: string;
  },
): Lawyer[] {
  let list = [...lawyers];

  const q = filters.q?.trim().toLowerCase() ?? "";
  if (q) {
    list = list.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.firm.toLowerCase().includes(q) ||
        l.specialty.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q),
    );
  }

  const specialty = filters.specialty?.trim();
  if (specialty && specialty !== "all") {
    list = list.filter((l) => l.specialty === specialty);
  }

  const location = filters.location?.trim();
  if (location && location !== "all") {
    list = list.filter((l) => l.location === location);
  }

  const sort = filters.sort as LawyerSort | undefined;
  switch (sort) {
    case "reviews":
      list.sort((a, b) => b.reviews - a.reviews);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating":
    default:
      list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}
