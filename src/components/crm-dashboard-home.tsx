"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const recentRequests = [
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
];

export function CrmDashboardHome() {
  const t = useTranslations("dashboard.home");

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-600 opacity-20 blur-[80px]" />
          <h2 className="relative z-10 mb-2 text-3xl font-semibold tracking-tight text-white">
            {t("greeting")}
          </h2>
          <p className="relative z-10 text-gray-400">{t("greetingSub")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              {t("newLeads")}
            </div>
            <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
              12
            </div>
            <div className="text-sm font-medium text-blue-400">
              {t("newLeadsTrend")}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              {t("activeCases")}
            </div>
            <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
              8
            </div>
            <div className="text-sm font-medium text-gray-400">
              {t("activeCasesSub")}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
            <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              {t("meetings")}
            </div>
            <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
              4
            </div>
            <div className="text-sm font-medium text-gray-400">
              {t("meetingsSub")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h3 className="font-semibold text-white">{t("recentRequests")}</h3>
              <Link
                href="/dashboard/requests"
                className="text-sm font-medium text-blue-500 hover:text-blue-400"
              >
                {t("seeAll")}
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentRequests.map((lead, i) => (
                <Link
                  key={i}
                  href="/dashboard/requests"
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
                </Link>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h3 className="font-semibold text-white">{t("upcoming")}</h3>
              <Link
                href="/dashboard/calendar"
                className="text-sm font-medium text-blue-500 hover:text-blue-400"
              >
                {t("fullCalendar")}
              </Link>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex">
                <div className="w-20 pt-0.5 text-sm text-gray-500">
                  10:00 AM
                </div>
                <div className="relative flex-1 border-l border-white/10 pl-4">
                  <div className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-gray-500" />
                  <div className="font-medium text-white">Strategy Alignment</div>
                  <div className="text-sm text-gray-400">Internal</div>
                </div>
              </div>
              <div className="flex">
                <div className="w-20 pt-0.5 text-sm font-medium text-blue-400">
                  2:00 PM
                </div>
                <div className="relative flex-1 border-l border-blue-500/50 pl-4">
                  <div className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <div className="font-medium text-white">
                    Consult: Marcus Chen
                  </div>
                  <div className="text-sm text-gray-400">Video Call</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
