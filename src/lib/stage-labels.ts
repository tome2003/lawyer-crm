import type { LeadStage } from "./types";

export const stageLabels: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  consultation: "Consultation",
  retained: "Retained",
  lost: "Closed — lost",
};

export const stageOrder: LeadStage[] = [
  "new",
  "contacted",
  "consultation",
  "retained",
  "lost",
];
