export interface LawyerCase {
  title: string;
  outcome: string;
  year: string;
}

export interface Lawyer {
  id: number;
  name: string;
  title: string;
  firm: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  rate: string;
  image: string;
  bio: string;
  education: string;
  admissions: string[];
  cases: LawyerCase[];
}

export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: 1,
    name: "Eleanor Sterling",
    title: "Senior Partner",
    firm: "Sterling & Vance Partners",
    specialty: "Corporate M&A",
    rating: 4.9,
    reviews: 142,
    location: "New York, NY",
    rate: "$650/hr",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "With over two decades of experience navigating complex cross-border mergers and acquisitions, Eleanor Sterling provides unparalleled strategic counsel to Fortune 500 companies and elite private equity firms.",
    education: "Harvard Law School, J.D., magna cum laude",
    admissions: ["New York", "District of Columbia", "U.S. Supreme Court"],
    cases: [
      {
        title: "Acquisition of TechCorp",
        outcome: "Successful $4.2B Merger",
        year: "2024",
      },
      {
        title: "Global Restructuring for RetailGiant",
        outcome: "Saved $800M in liabilities",
        year: "2023",
      },
    ],
  },
  {
    id: 2,
    name: "Julian Vance",
    title: "Managing Director",
    firm: "Vance Intellectual Property",
    specialty: "Intellectual Property",
    rating: 4.8,
    reviews: 98,
    location: "San Francisco, CA",
    rate: "$550/hr",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Julian Vance is a premier patent litigator specializing in high-stakes technology and pharmaceutical disputes. He has successfully defended core patents for leading global innovators.",
    education: "Stanford Law School, J.D.",
    admissions: ["California", "U.S. Patent and Trademark Office"],
    cases: [
      {
        title: "BioPharm v. Generics Inc",
        outcome: "Injunction granted, patent upheld",
        year: "2025",
      },
      {
        title: "Silicon Valley IP Defense",
        outcome: "$120M settlement achieved",
        year: "2024",
      },
    ],
  },
  {
    id: 3,
    name: "Sophia Castellanos",
    title: "Founding Partner",
    firm: "Castellanos Wealth Protection",
    specialty: "Private Wealth & Estate",
    rating: 5.0,
    reviews: 67,
    location: "Miami, FL",
    rate: "$450/hr",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Sophia Castellanos advises ultra-high-net-worth individuals and families on complex estate planning, wealth preservation, and tax optimization strategies across multiple jurisdictions.",
    education: "Yale Law School, J.D.",
    admissions: ["Florida", "New York", "Texas"],
    cases: [
      {
        title: "Multinational Family Trust Restructuring",
        outcome: "Optimized tax exposure by 35%",
        year: "2024",
      },
      {
        title: "Legacy Foundation Establishment",
        outcome: "Created $500M charitable trust",
        year: "2022",
      },
    ],
  },
];

export function getLawyerById(id: number): Lawyer | undefined {
  return MOCK_LAWYERS.find((l) => l.id === id);
}
