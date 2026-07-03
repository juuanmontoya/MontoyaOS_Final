import { Card, CardContent } from "@/components/ui/card";
import { FocusWidget } from "./widgets/focus-widget";
import { TodayWidget } from "./widgets/today-widget";

export function DashboardView() {
  return (
    <div className="space-y-8">

      {/* Bienvenida */}
      <section className="space-y-6">

        <div className="space-y-2">

  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
    MIÉRCOLES · 2 JULIO
  </p>

  <h1 className="text-5xl font-extrabold tracking-tight">
    Buenos días, Juan
    <span className="ml-2">👋</span>
  </h1>

  <div className="flex flex-wrap gap-3 pt-2">

    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
      3 eventos
    </span>

    <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
      2 recordatorios
    </span>

    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700">
      Prioridad alta
    </span>

  </div>

</div>

        <FocusWidget />

      </section>

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

    <div className="border-l-4 border-amber-400 pl-5">

      <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
        MAÑANA
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        Pagar energía
      </h3>

      <p className="text-muted-foreground">
        Último día para evitar recargo.
      </p>

    </div>

    <div className="border-l-4 border-red-500 pl-5">

      <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
        EN 3 DÍAS
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        Tarjeta de crédito
      </h3>

      <p className="text-muted-foreground">
        Fecha límite de pago.
      </p>

    </div>

    <div className="border-l-4 border-blue-500 pl-5">

      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        DOMINGO
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        Clase Conquistadores
      </h3>

      <p className="text-muted-foreground">
        Preparar enseñanza.
      </p>

    </div>

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