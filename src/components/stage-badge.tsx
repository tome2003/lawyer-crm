import type { LeadStage } from "@/lib/types";
import { stageLabels } from "@/lib/stage-labels";

const styles: Record<LeadStage, string> = {
  new: "bg-navy/10 text-navy ring-navy/15",
  contacted: "bg-gold/15 text-gold-dark ring-gold/25",
  consultation: "bg-accent-muted text-ink ring-accent/20",
  retained: "bg-emerald-500/12 text-emerald-800 ring-emerald-500/20 dark:text-emerald-200",
  lost: "bg-ink/8 text-muted ring-ink/10",
};

export function StageBadge({ stage }: { stage: LeadStage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[stage]}`}
    >
      {stageLabels[stage]}
    </span>
  );
}
