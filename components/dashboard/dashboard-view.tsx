"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FocusWidget } from "@/components/ui/dashboard/focus-widget";
import { TodayWidget } from "@/components/ui/dashboard/today-widget";
import { reminders } from "@/data/dashboard";
import { PageHeader } from "@/components/ui/page-header";
import { moduleTheme } from "@/lib/theme";
import { useFinanceStore } from "@/store/finance-store";
import { DailyBrief } from "@/components/ui/dashboard/daily-brief";
import { useFinanceSummary } from "@/core/hooks/use-finance-summary";

export function DashboardView() {
    const { balance } = useFinanceSummary();

  const formatCurrency = (value: number) =>
    `$${value.toLocaleString("es-CO")}`;
  return (
    <div className="space-y-8">

<DailyBrief />

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
  💰 Balance General
</h3>

<h2 className="mt-4 text-4xl font-bold">
  {formatCurrency(balance)}
</h2>

<p className="mt-3 text-sm text-muted-foreground">
  Sincronizado automáticamente con el módulo de Finanzas.
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