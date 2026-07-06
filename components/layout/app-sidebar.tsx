"use client";

import Link from "next/link";
import { navigationItems } from "@/data/navigation";

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-64 border-r bg-white flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-bold">🚀 MontoyaOS</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
