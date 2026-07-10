import {
  Brain,
  Calendar,
  CircleCheckBig,
  Wallet,
} from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

export function HeroSection() {
  const now = new Date();

  const greeting =
    now.getHours() < 12
      ? "Buenos días"
      : now.getHours() < 18
      ? "Buenas tardes"
      : "Buenas noches";

  const formattedDate = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <AppCard className="overflow-hidden p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            🚀 MontoyaOS
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            {greeting}, Juan 👋
          </h1>

          <p className="mt-3 text-lg text-muted-foreground capitalize">
            {formattedDate}
          </p>

          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">
            Todo está listo para comenzar el día. Desde aquí podrás controlar
            tus finanzas, tareas, calendario y los próximos módulos de
            MontoyaOS desde un único lugar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-background p-4">
            <Wallet className="mb-3 h-6 w-6 text-emerald-600" />
            <p className="font-semibold">Balance positivo</p>
            <p className="text-sm text-muted-foreground">
              Tus finanzas están saludables.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <CircleCheckBig className="mb-3 h-6 w-6 text-green-600" />
            <p className="font-semibold">Sistema estable</p>
            <p className="text-sm text-muted-foreground">
              Todos los módulos están funcionando.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <Calendar className="mb-3 h-6 w-6 text-blue-600" />
            <p className="font-semibold">Agenda</p>
            <p className="text-sm text-muted-foreground">
              Sin eventos para hoy.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <Brain className="mb-3 h-6 w-6 text-violet-600" />
            <p className="font-semibold">Daily Brief IA</p>
            <p className="text-sm text-muted-foreground">
              Próximamente disponible.
            </p>
          </div>
        </div>
      </div>
    </AppCard>
  );
}