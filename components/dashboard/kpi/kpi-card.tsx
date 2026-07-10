import { LucideIcon } from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

type KpiCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
};

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: KpiCardProps) {
  return (
    <AppCard className="hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>

        <div className="rounded-xl bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold tracking-tight">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </AppCard>
  );
}