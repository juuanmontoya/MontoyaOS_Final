import { AppCard } from "@/components/ui/app-card";

const activities = [
  {
    title: "Dashboard inicializado",
    description: "MontoyaOS se encuentra funcionando correctamente.",
    time: "Ahora mismo",
  },
  {
    title: "Módulo Finanzas",
    description: "Información financiera sincronizada correctamente.",
    time: "Hace unos segundos",
  },
  {
    title: "Dashboard Engine",
    description: "Resumen general generado exitosamente.",
    time: "Hace 1 minuto",
  },
];

export function ActivityFeed() {
  return (
    <AppCard>
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Actividad reciente
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Últimos eventos registrados por MontoyaOS.
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />

            <div className="flex-1">
              <p className="font-medium">
                {activity.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </AppCard>
  );
}