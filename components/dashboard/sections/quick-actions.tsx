import {
  CalendarPlus,
  Bot,
  CirclePlus,
  SquareCheckBig,
} from "lucide-react";

const actions = [
  {
    title: "Nueva transacción",
    icon: CirclePlus,
  },
  {
    title: "Nueva tarea",
    icon: SquareCheckBig,
  },
  {
    title: "Nuevo evento",
    icon: CalendarPlus,
  },
  {
    title: "Chat IA",
    icon: Bot,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Acciones rápidas
        </h2>

        <p className="text-sm text-muted-foreground">
          Accede rápidamente a las funciones más utilizadas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex items-center gap-3 rounded-xl border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <span className="font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}