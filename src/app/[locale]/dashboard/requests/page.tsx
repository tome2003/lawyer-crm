import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const allRequests = [
  {
    name: "Marcus Chen",
    intent: "M&A Advisory",
    status: "New",
    dot: "bg-blue-500",
  },
  {
    name: "Sarah Jenkins",
    intent: "Corporate Structuring",
    status: "Review",
    dot: "bg-purple-500",
  },
  {
    name: "David Alby",
    intent: "Tax Optimization",
    status: "Scheduled",
    dot: "bg-green-500",
  },
  {
    name: "Priya Nair",
    intent: "Employment counsel",
    status: "New",
    dot: "bg-blue-500",
  },
  {
    name: "Alex Ortiz",
    intent: "IP licensing",
    status: "Review",
    dot: "bg-purple-500",
  },
];

export default async function RequestsPage() {
  const t = await getTranslations("dashboard.requests");

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-gray-400">{t("sub")}</p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-white">{t("allTitle")}</h2>
          </div>
          <div className="divide-y divide-white/5">
            {allRequests.map((lead, i) => (
              <div
                key={i}
                className="flex items-center px-6 py-4 transition-colors hover:bg-white/5"
              >
                <div className={`mr-4 h-2 w-2 rounded-full ${lead.dot}`} />
                <div className="flex-1">
                  <div className="font-medium text-white">{lead.name}</div>
                  <div className="text-sm text-gray-400">{lead.intent}</div>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {lead.status}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-blue-500 hover:text-blue-400"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
