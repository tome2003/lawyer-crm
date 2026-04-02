import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  FileText,
  Inbox,
  MessageSquare,
  Users,
} from "lucide-react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const dashboardOverviewNav: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
    badge: "3",
  },
];

export const dashboardWorkspaceNav: DashboardNavItem[] = [
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/requests", label: "All requests", icon: Inbox },
];

export function dashboardTitle(pathname: string): string {
  const item = [...dashboardOverviewNav, ...dashboardWorkspaceNav].find(
    (n) => n.href === pathname,
  );
  if (item) return item.label;
  if (pathname.startsWith("/dashboard/notifications")) return "Notifications";
  return "Dashboard";
}
