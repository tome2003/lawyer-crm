import Link from "next/link";

const threads = [
  {
    from: "Marcus Chen",
    preview: "Following up on the term sheet review…",
    time: "2h ago",
    unread: true,
  },
  {
    from: "Sarah Jenkins",
    preview: "Can we move Thursday’s call to Friday?",
    time: "Yesterday",
    unread: true,
  },
  {
    from: "Billing",
    preview: "Invoice #1042 was paid.",
    time: "Mon",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-gray-400">
          Secure messages with clients and prospects (placeholder inbox).
        </p>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-white">Inbox</h2>
          </div>
          <ul className="divide-y divide-white/5">
            {threads.map((t) => (
              <li
                key={t.from + t.time}
                className="cursor-pointer px-6 py-4 transition-colors hover:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{t.from}</span>
                      {t.unread ? (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{t.preview}</p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-500">{t.time}</span>
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
