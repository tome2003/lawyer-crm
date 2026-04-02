"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { MOCK_LAWYERS } from "@/lib/lawyers";

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

export function CrmDashboard() {
  const lawyer = MOCK_LAWYERS[0];

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#000000] font-sans text-gray-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#111111] md:flex">
        <div className="flex h-16 items-center px-6 pt-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-white">
            <Sparkles className="h-3 w-3 text-black" />
          </div>
          <span className="ml-3 font-semibold tracking-tight text-white">
            LexOS
          </span>
        </div>

        <div className="flex-1 space-y-0.5 px-3 py-6">
          <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Overview
          </div>
          <div className="flex w-full items-center rounded-lg bg-blue-600/10 px-3 py-2 font-medium text-blue-500">
            <BarChart3 className="mr-3 h-4 w-4" /> Dashboard
          </div>
          <button
            type="button"
            className="flex w-full items-center rounded-lg px-3 py-2 font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Users className="mr-3 h-4 w-4" /> Clients
          </button>
          <button
            type="button"
            className="flex w-full items-center rounded-lg px-3 py-2 font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <MessageSquare className="mr-3 h-4 w-4" /> Messages
            <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
              3
            </span>
          </button>

          <div className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Workspace
          </div>
          <button
            type="button"
            className="flex w-full items-center rounded-lg px-3 py-2 font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Calendar className="mr-3 h-4 w-4" /> Calendar
          </button>
          <button
            type="button"
            className="flex w-full items-center rounded-lg px-3 py-2 font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FileText className="mr-3 h-4 w-4" /> Documents
          </button>
        </div>

        <div className="mx-3 mb-3 flex cursor-pointer items-center rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10">
          <Image
            src={lawyer.image}
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="ml-3 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {lawyer.name}
            </p>
            <p className="truncate text-xs text-gray-500">Partner</p>
          </div>
        </div>
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col">
        <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#000000]/80 px-4 backdrop-blur-md sm:px-8">
          <h1 className="text-lg font-medium text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 text-gray-400 transition-colors hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <Link
              href="/"
              className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Exit Workspace
            </Link>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-600 opacity-20 blur-[80px]" />
              <h2 className="relative z-10 mb-2 text-3xl font-semibold tracking-tight text-white">
                Good morning, Eleanor.
              </h2>
              <p className="relative z-10 text-gray-400">
                You have 3 new consultation requests today.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  New Leads
                </div>
                <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
                  12
                </div>
                <div className="text-sm font-medium text-blue-400">
                  +15% this week
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  Active Cases
                </div>
                <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
                  8
                </div>
                <div className="text-sm font-medium text-gray-400">
                  2 pending signatures
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
                <div className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  Meetings
                </div>
                <div className="mb-2 text-4xl font-semibold tracking-tighter text-white">
                  4
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Next: 2:00 PM
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <h3 className="font-semibold text-white">Recent Requests</h3>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-500 hover:text-blue-400"
                  >
                    See All
                  </button>
                </div>
                <div className="divide-y divide-white/5">
                  {recentRequests.map((lead, i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer items-center px-6 py-4 transition-colors hover:bg-white/5"
                    >
                      <div
                        className={`mr-4 h-2 w-2 rounded-full ${lead.dot}`}
                      />
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

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
                <div className="border-b border-white/10 px-6 py-5">
                  <h3 className="font-semibold text-white">Upcoming</h3>
                </div>
                <div className="space-y-6 p-6">
                  <div className="flex">
                    <div className="w-20 pt-0.5 text-sm text-gray-500">
                      10:00 AM
                    </div>
                    <div className="relative flex-1 border-l border-white/10 pl-4">
                      <div className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-gray-500" />
                      <div className="font-medium text-white">
                        Strategy Alignment
                      </div>
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
      </div>
    </div>
  );
}
