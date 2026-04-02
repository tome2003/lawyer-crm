import Link from "next/link";
import { FileText } from "lucide-react";

const docs = [
  { name: "Engagement Letter — Chen.pdf", updated: "Apr 1, 2026" },
  { name: "NDA — Jenkins Redline.docx", updated: "Mar 30, 2026" },
  { name: "Trust Summary — Shah.pdf", updated: "Mar 22, 2026" },
];

export default function DocumentsPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-gray-400">
          Matter folders and e-signatures (placeholder).
        </p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-white">Recent files</h2>
          </div>
          <ul className="divide-y divide-white/5">
            {docs.map((d) => (
              <li
                key={d.name}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/5"
              >
                <FileText className="h-5 w-5 shrink-0 text-gray-500" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-white">{d.name}</div>
                  <div className="text-xs text-gray-500">Updated {d.updated}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-blue-500 hover:text-blue-400"
        >
          ← Back to overview
        </Link>
      </div>
    </main>
  );
}
