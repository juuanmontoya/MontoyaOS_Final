export type ModuleKey =
  | "dashboard"
  | "finances"
  | "calendar"
  | "tasks"
  | "bible"
  | "marketing"
  | "settings";

export const moduleTheme = {
  dashboard: {
    name: "Dashboard",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    icon: "bg-blue-100",
    iconColor: "text-blue-600",
    gradient: "from-blue-600 via-sky-500 to-cyan-400",
  },

  finances: {
    name: "Finanzas",
    accent: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "bg-emerald-100",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },

  calendar: {
    name: "Calendario",
    accent: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    icon: "bg-violet-100",
    iconColor: "text-violet-600",
    gradient: "from-violet-600 via-fuchsia-500 to-purple-400",
  },

  tasks: {
    name: "Tareas",
    accent: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    icon: "bg-orange-100",
    iconColor: "text-orange-600",
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
  },

  bible: {
    name: "Biblia",
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    icon: "bg-amber-100",
    iconColor: "text-amber-700",
    gradient: "from-amber-600 via-yellow-500 to-orange-400",
  },

  marketing: {
    name: "Marketing",
    accent: "text-cyan-600",
    badge: "bg-cyan-100 text-cyan-700",
    icon: "bg-cyan-100",
    iconColor: "text-cyan-600",
    gradient: "from-cyan-600 via-sky-500 to-blue-400",
  },

  settings: {
    name: "Configuración",
    accent: "text-zinc-600",
    badge: "bg-zinc-100 text-zinc-700",
    icon: "bg-zinc-100",
    iconColor: "text-zinc-600",
    gradient: "from-zinc-700 via-zinc-500 to-slate-400",
  },
} as const;