"use client";

import { Bell, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md">

      {/* Barra de búsqueda */}

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Buscar..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>

      {/* Acciones */}

      <div className="ml-6 flex items-center gap-3">

        <button className="rounded-xl p-2 hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-semibold text-white shadow">
          JM
        </button>

      </div>

    </header>
  );
}