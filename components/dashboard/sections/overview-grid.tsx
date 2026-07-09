import { ComingSoonCard } from "../cards/coming-soon-card";
import { FinanceWidget } from "../widgets/finance-widget";

export function OverviewGrid() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <FinanceWidget />

      <div className="grid gap-6 sm:grid-cols-2">
        <ComingSoonCard
          emoji="📅"
          title="Calendario"
          description="Organiza eventos, reuniones y recordatorios importantes."
        />

        <ComingSoonCard
          emoji="✅"
          title="Tareas"
          description="Gestiona tus pendientes y haz seguimiento a tus objetivos."
        />

        <ComingSoonCard
          emoji="🤖"
          title="IA"
          description="Accede a asistentes inteligentes y automatizaciones personalizadas."
        />

        <ComingSoonCard
          emoji="👨‍👩‍👧"
          title="Familia"
          description="Administra información y actividades familiares."
        />
      </div>
    </section>
  );
}