export type LeadStage =
  | "new"
  | "contacted"
  | "consultation"
  | "retained"
  | "lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  matter: string;
  stage: LeadStage;
  source: string;
  valueEstimate: number | null;
  lastTouch: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  matter: string;
  opened: string;
  status: "active" | "closed";
}
