import {
  Calendar,
  Plus,
  Wallet,
  CheckSquare,
} from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

const actions = [
  {
    title: "Nueva transacción",
    description: "Registrar ingreso o gasto",
    icon: Wallet,
  },
  {
    title: "Nueva tarea",
    description: "Agregar pendiente",
    icon: CheckSquare,
  },
  {
    title: "Nuevo evento",
    description: "Crear evento en calendario",
    icon: Calendar,
  },
];

export function QuickActions() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">
          Acciones rápidas
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Accede rápidamente a las funciones más utilizadas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <AppCard
              key={action.title}
              className="group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <Plus className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:rotate-90" />
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {action.description}
              </p>
            </AppCard>
          );
        })}
      </div>
    </section>
  );
}