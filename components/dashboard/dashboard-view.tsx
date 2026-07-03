import { Card, CardContent } from "@/components/ui/card";
import { FocusWidget } from "./widgets/focus-widget";
import { TodayWidget } from "./widgets/today-widget";

export function DashboardView() {
  return (
    <div className="space-y-8">

      {/* Bienvenida */}
      <section className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            ¡Buenos días, Juan! 👋
          </h1>

          <p className="mt-2 text-lg text-muted-foreground">
            Hoy tienes un día productivo. Aquí está lo más importante.
          </p>
        </div>

        <FocusWidget />

      </section>

      {/* Agenda + Recordatorios */}
      <section className="grid gap-6 xl:grid-cols-2">

        <TodayWidget />

        <Card className="rounded-3xl border-2 border-dashed border-zinc-200 shadow-lg">
          <CardContent className="flex min-h-[420px] items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                🔔 Recordatorios
              </h3>

              <p className="mt-2 text-muted-foreground">
                Próximamente...
              </p>
            </div>
          </CardContent>
        </Card>

      </section>

      {/* Resumen */}
      <section className="grid gap-6 md:grid-cols-3">

        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">
              Balance General
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              $0
            </h2>

          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">
              Tareas Pendientes
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-6">

            <p className="text-sm text-muted-foreground">
              Devocional
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Sin leer
            </h2>

          </CardContent>
        </Card>

      </section>

      {/* Actividad */}
      <Card className="rounded-3xl shadow-lg">
        <CardContent className="p-6">

          <h3 className="text-xl font-semibold">
            Actividad reciente
          </h3>

          <p className="mt-4 text-muted-foreground">
            Aún no hay actividad registrada.
          </p>

        </CardContent>
      </Card>

    </div>
  );
}