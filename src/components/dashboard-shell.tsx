"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sparkles } from "lucide-react";
import { MOCK_LAWYERS } from "@/lib/lawyers";
import {
  dashboardOverviewNav,
  dashboardTitle,
  dashboardWorkspaceNav,
} from "@/lib/dashboard-nav";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = dashboardTitle(pathname);
  const lawyer = MOCK_LAWYERS[0];

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#000000] font-sans text-gray-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#111111] md:flex">
        <Link
          href="/dashboard"
          className="flex h-16 items-center px-6 pt-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-white">
            <Sparkles className="h-3 w-3 text-black" />
          </div>
          <span className="ml-3 font-semibold tracking-tight text-white">
            LexOS
          </span>
        </Link>

        <div className="flex-1 space-y-0.5 px-3 py-6">
          <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Overview
          </div>
          {dashboardOverviewNav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center rounded-lg px-3 py-2 font-medium transition-colors ${
                  active
                    ? "bg-blue-600/10 text-blue-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.badge ? (
                  <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}

          <div className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Workspace
          </div>
          {dashboardWorkspaceNav.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center rounded-lg px-3 py-2 font-medium transition-colors ${
                  active
                    ? "bg-blue-600/10 text-blue-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
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
          <h1 className="text-lg font-medium text-white">{title}</h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/notifications"
              className="p-2 text-gray-400 transition-colors hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Exit Workspace
            </Link>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
