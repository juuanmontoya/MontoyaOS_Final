import { Card, CardContent } from "@/components/ui/card";
import { FocusWidget } from "./widgets/focus-widget";
import { TodayWidget } from "./widgets/today-widget";
import { reminders } from "@/data/dashboard";

export function DashboardView() {
  return (
    <div className="space-y-8">

<section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

  <div className="max-w-2xl">

    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
      MIÉRCOLES · 2 JULIO
    </p>

    <h1 className="mt-3 text-5xl font-extrabold tracking-tight">
      Buenos días, Juan 👋
    </h1>

    <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
      Todo lo importante.
      <br />
      En un solo lugar.
    </p>

    <div className="mt-6 flex flex-wrap gap-3">

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        3 eventos
      </span>

      <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
        2 recordatorios
      </span>

      <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
        Alta prioridad
      </span>

    </div>

  </div>

</section>

<FocusWidget />

      {/* Agenda + Recordatorios */}

      <section className="grid gap-10 xl:grid-cols-[2fr_1fr] items-start">

        <TodayWidget />

        <section>

  <div className="mb-10">

    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
      RECORDATORIOS
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Importantes
    </h2>

  </div>

  <div className="space-y-8">
  {reminders.map((reminder) => (
    <div
      key={reminder.id}
      className={`border-l-4 ${reminder.color} pl-5 transition-all duration-200 hover:translate-x-1`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {reminder.due}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {reminder.title}
      </h3>

      <p className="text-muted-foreground">
        {reminder.description}
      </p>
    </div>
  ))}
</div>

    

</section>

      </section>

      {/* Próximos módulos */}

      <section className="grid gap-8 xl:grid-cols-[2fr_1fr] items-start">

        <Card className="rounded-3xl border-0 shadow-sm hover:shadow-md transition-all duration-300">

          <CardContent className="p-8">

            <h3 className="text-xl font-bold">
              💰 Finanzas
            </h3>

            <p className="mt-3 text-muted-foreground">
              Próximamente...
            </p>

          </CardContent>

        </Card>

        <Card className="rounded-3xl border-0 shadow-sm hover:shadow-md transition-all duration-300">

          <CardContent className="p-8">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
  VERSÍCULO DEL DÍA
</p>

<h3 className="mt-3 text-2xl font-bold leading-relaxed">
  "Esfuérzate y sé valiente; no temas ni desmayes."
</h3>

<p className="mt-4 text-base font-medium text-muted-foreground">
  Josué 1:9
</p>

          </CardContent>

        </Card>

      </section>

    </div>
  );
}