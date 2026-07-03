"use client";

import Link from "next/link";
import {
  Menu,
  Home,
  Wallet,
  Calendar,
  CheckSquare,
  BookOpen,
  Megaphone,
  Settings,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Finanzas",
    href: "/finances",
    icon: Wallet,
  },
  {
    title: "Calendario",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Tareas",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Biblia",
    href: "/bible",
    icon: BookOpen,
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: Megaphone,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];

export function MobileSidebar() {
  return (
    <div className="md:hidden">

      <Sheet>

        <SheetTrigger asChild>

          <button className="rounded-xl p-2 hover:bg-gray-100 transition">
            <Menu size={24} />
          </button>

        </SheetTrigger>

        <SheetContent side="left" className="w-72">

          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              🚀 MontoyaOS
            </h2>
          </div>

          <nav className="space-y-2">

            {items.map((item) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 transition"
                >
                  <Icon size={20} />

                  <span>{item.title}</span>

                </Link>
              );
            })}

          </nav>

        </SheetContent>

      </Sheet>

    </div>
  );
}