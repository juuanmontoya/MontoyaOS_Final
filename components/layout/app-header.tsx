"use client";

import { Bell, Search } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur-md md:px-6">

      {/* Lado izquierdo */}

      <div className="flex items-center gap-3">

        <MobileSidebar />

        <div>

          <h1 className="text-lg font-bold md:hidden">
            MontoyaOS
          </h1>

          <h2 className="hidden text-xl font-semibold md:block">
            Dashboard
          </h2>

        </div>

      </div>

      {/* Lado derecho */}

      <div className="flex items-center gap-2 md:gap-4">

        <button className="rounded-xl p-2 transition hover:bg-gray-100">
          <Search size={20} />
        </button>

        <button className="rounded-xl p-2 transition hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-semibold text-white shadow-md">
          JM
        </div>

      </div>

    </header>
  );
}
