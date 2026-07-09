"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";

import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
      {/* MOBILE */}

      <div className="flex items-center gap-3 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-lg p-2 transition-colors hover:bg-muted">
              <Menu size={22} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <div className="border-b p-6">
              <h2 className="text-xl font-bold tracking-tight">
                🚀 MontoyaOS
              </h2>
            </div>

            <nav className="space-y-1 p-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <span className="font-bold tracking-tight">
          MontoyaOS
        </span>
      </div>

      {/* DESKTOP */}

      <div className="relative hidden w-full max-w-md md:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Buscar en MontoyaOS..."
          className="h-11 w-full rounded-lg border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* ACTIONS */}

      <div className="ml-auto flex items-center gap-2">
        <button className="rounded-lg p-2 transition-colors hover:bg-muted">
          <Bell size={20} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
          JM
        </button>
      </div>
    </header>
  );
}