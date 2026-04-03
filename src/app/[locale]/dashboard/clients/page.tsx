import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const rows = [
  { name: "Northwind LLC", matter: "Outside counsel", status: "Active" },
  { name: "James & Riya Shah", matter: "Estate planning", status: "Active" },
  { name: "Elena Vasquez", matter: "Family law", status: "Closed" },
];

export default async function ClientsPage() {
  const t = await getTranslations("dashboard.clients");

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-gray-400">{t("sub")}</p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-white">{t("allTitle")}</h2>
          </div>
          <ul className="divide-y divide-white/5">
            {rows.map((r) => (
              <li
                key={r.name}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-medium text-white">{r.name}</div>
                  <div className="text-sm text-gray-400">{r.matter}</div>
                </div>
                <span className="text-sm text-gray-500">{r.status}</span>
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
