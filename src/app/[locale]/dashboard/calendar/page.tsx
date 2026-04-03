import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const blocks = [
  {
    day: "Today",
    time: "10:00 AM",
    title: "Strategy alignment",
    note: "Internal",
  },
  {
    day: "Today",
    time: "2:00 PM",
    title: "Consult: Marcus Chen",
    note: "Video",
  },
  {
    day: "Tomorrow",
    time: "9:30 AM",
    title: "Deposition prep",
    note: "Associate sync",
  },
  {
    day: "Fri",
    time: "11:00 AM",
    title: "Client intake — Jenkins",
    note: "Phone",
  },
];

export default async function CalendarPage() {
  const t = await getTranslations("dashboard.calendar");

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-gray-400">{t("sub")}</p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-white">{t("upcomingTitle")}</h2>
          </div>
          <ul className="divide-y divide-white/5">
            {blocks.map((b, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="w-28 text-sm text-gray-500">{b.day}</div>
                <div className="w-24 text-sm font-medium text-blue-400">
                  {b.time}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{b.title}</div>
                  <div className="text-sm text-gray-400">{b.note}</div>
                </div>
              </li>
            ))}
          </ul>
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
