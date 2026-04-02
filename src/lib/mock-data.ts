import type { Client, Lead } from "./types";

export const leads: Lead[] = [
  {
    id: "1",
    name: "Jordan Ellis",
    email: "j.ellis@email.com",
    phone: "(415) 555-0142",
    matter: "Employment — wrongful termination",
    stage: "consultation",
    source: "Website intake",
    valueEstimate: 18500,
    lastTouch: "2026-03-31",
    notes: "Requested callback after hours.",
  },
  {
    id: "2",
    name: "Morgan Chen",
    email: "mchen@email.com",
    phone: "(510) 555-0198",
    matter: "Real estate — earnest money dispute",
    stage: "new",
    source: "Referral",
    valueEstimate: 9200,
    lastTouch: "2026-04-01",
  },
  {
    id: "3",
    name: "Patricia Okonkwo",
    email: "p.okonkwo@email.com",
    phone: "(408) 555-0167",
    matter: "Business — contract review",
    stage: "contacted",
    source: "Google LSA",
    valueEstimate: 4500,
    lastTouch: "2026-03-29",
  },
  {
    id: "4",
    name: "James & Riya Shah",
    email: "shah.family@email.com",
    phone: "(650) 555-0120",
    matter: "Estate planning — family trust",
    stage: "retained",
    source: "Seminar",
    valueEstimate: 12000,
    lastTouch: "2026-03-25",
  },
  {
    id: "5",
    name: "Alex Rivera",
    email: "arivera@email.com",
    phone: "(925) 555-0144",
    matter: "PI — motor vehicle",
    stage: "lost",
    source: "Website intake",
    valueEstimate: null,
    lastTouch: "2026-03-18",
  },
];

export const clients: Client[] = [
  {
    id: "c1",
    name: "James & Riya Shah",
    matter: "Estate planning — family trust",
    opened: "2026-03-20",
    status: "active",
  },
  {
    id: "c2",
    name: "Northwind LLC",
    matter: "Ongoing outside counsel",
    opened: "2025-11-02",
    status: "active",
  },
  {
    id: "c3",
    name: "Elena Vasquez",
    matter: "Divorce — custody",
    opened: "2025-08-14",
    status: "closed",
  },
];

export function leadStats(leadsList: Lead[]) {
  const byStage = leadsList.reduce(
    (acc, l) => {
      acc[l.stage] = (acc[l.stage] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const pipelineValue = leadsList
    .filter((l) => l.stage !== "lost" && l.valueEstimate != null)
    .reduce((s, l) => s + (l.valueEstimate ?? 0), 0);
  return { byStage, pipelineValue, total: leadsList.length };
}
