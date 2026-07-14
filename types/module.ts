import type { LucideIcon } from "lucide-react";

export interface Module {
  title: string;
  description: string;

  href: string;

  icon: LucideIcon;

  available: boolean;

  showInSidebar: boolean;
  showOnDashboard: boolean;
}