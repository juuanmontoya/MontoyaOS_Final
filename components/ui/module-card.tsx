import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

import { AppCard } from "./app-card";

type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  available?: boolean;
};

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  available = true,
}: ModuleCardProps) {
  return (
    <Link href={href}>
      <AppCard className="group h-full cursor-pointer hover:-translate-y-1">
        <div className="flex h-full flex-col">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>

          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {available ? "Abrir módulo" : "Próximamente"}
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </AppCard>
    </Link>
  );
}