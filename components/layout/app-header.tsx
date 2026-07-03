"use client";

import { Bell, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-gray-100 transition">
          <Search size={20} />
        </button>

        <button className="rounded-lg p-2 hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-semibold">
          JM
        </div>
      </div>
    </header>
  );
}
