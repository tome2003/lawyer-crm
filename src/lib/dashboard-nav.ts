import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  FileText,
  Inbox,
  MessageSquare,
  Users,
} from "lucide-react";

export type DashboardNavLabelKey =
  | "dashboard"
  | "clients"
  | "messages"
  | "calendar"
  | "documents"
  | "requests";

export interface DashboardNavItem {
  href: string;
  labelKey: DashboardNavLabelKey;
  icon: LucideIcon;
  badge?: string;
}

export const dashboardOverviewNav: DashboardNavItem[] = [
  { href: "/dashboard", labelKey: "dashboard", icon: BarChart3 },
  { href: "/dashboard/clients", labelKey: "clients", icon: Users },
  {
    href: "/dashboard/messages",
    labelKey: "messages",
    icon: MessageSquare,
    badge: "3",
  },
];

export const dashboardWorkspaceNav: DashboardNavItem[] = [
  { href: "/dashboard/calendar", labelKey: "calendar", icon: Calendar },
  { href: "/dashboard/documents", labelKey: "documents", icon: FileText },
  { href: "/dashboard/requests", labelKey: "requests", icon: Inbox },
];

export type DashboardTitleKey =
  | DashboardNavLabelKey
  | "notifications"
  | "dashboard";

export function dashboardTitleKey(pathname: string): DashboardTitleKey {
  if (pathname.startsWith("/dashboard/notifications")) {
    return "notifications";
  }
  const all = [...dashboardOverviewNav, ...dashboardWorkspaceNav];
  const match = all.find((item) =>
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href),
  );
  return match?.labelKey ?? "dashboard";
}
