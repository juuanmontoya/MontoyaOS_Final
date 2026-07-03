"use client";

import { Bell, Menu, Search } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";

const items = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Finanzas", href: "/finances" },
  { title: "Calendario", href: "/calendar" },
  { title: "Tareas", href: "/tasks" },
  { title: "Biblia", href: "/bible" },
  { title: "marketing", href: "/marketing" },
  { title: "Configuración", href: "/settings" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md">

      {/* MOBILE */}

      <div className="flex items-center gap-3 md:hidden">

        <Sheet>

          <SheetTrigger asChild>

            <button className="rounded-xl p-2 hover:bg-gray-100 transition">
              <Menu size={22} />
            </button>

          </SheetTrigger>

          <SheetContent side="left" className="w-72">

            <div className="mb-8 text-xl font-bold">
              🚀 MontoyaOS
            </div>

            <nav className="space-y-2">

              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 hover:bg-gray-100 transition"
                >
                  {item.title}
                </Link>
              ))}

            </nav>

          </SheetContent>

        </Sheet>

        <span className="font-bold">
          MontoyaOS
        </span>

      </div>

      {/* DESKTOP */}

      <div className="relative hidden w-full max-w-md md:block">

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

      <div className="ml-auto flex items-center gap-3">

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