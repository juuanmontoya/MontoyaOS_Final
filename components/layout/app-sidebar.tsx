"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const sidebarModules = modules.filter(
    (module) => module.showInSidebar
  );

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold tracking-tight">
          🚀 MontoyaOS
        </h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarModules.map((module) => {
          const Icon = module.icon;

          const isActive =
            pathname === module.href ||
            (module.href !== "/" &&
              pathname.startsWith(module.href));

          return (
            <Link
              key={module.href}
              href={module.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={20} />

              <span>{module.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            Juan Montoya
          </p>

          <p className="text-xs text-muted-foreground">
            Sistema Operativo Personal
          </p>
        </div>
      </div>
    </aside>
  );
}