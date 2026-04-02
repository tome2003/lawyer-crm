import Link from "next/link";
import { Bell } from "lucide-react";

const items = [
  { title: "New consultation request", detail: "Marcus Chen — M&A Advisory", time: "25 min ago" },
  { title: "Message unread", detail: "Sarah Jenkins sent a follow-up", time: "1 hr ago" },
  { title: "Calendar reminder", detail: "Consult at 2:00 PM today", time: "3 hr ago" },
];

export default function NotificationsPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Bell className="h-5 w-5" />
          <p className="text-sm">Alerts across leads, messages, and calendar.</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <ul className="divide-y divide-white/5">
            {items.map((n, i) => (
              <li key={i} className="px-6 py-4">
                <div className="font-medium text-white">{n.title}</div>
                <div className="text-sm text-gray-400">{n.detail}</div>
                <div className="mt-1 text-xs text-gray-500">{n.time}</div>
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
