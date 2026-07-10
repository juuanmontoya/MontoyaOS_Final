import { ModuleCard } from "@/components/ui/module-card";
import { SectionTitle } from "@/components/ui/section-title";

import { dashboardModules } from "@/data/dashboard-modules";

export function OverviewGrid() {
  const modules = dashboardModules.filter(
    (module) => module.showOnDashboard
  );

  return (
    <section>
      <SectionTitle
        title="Próximos módulos"
        description="Estas funcionalidades estarán disponibles en las siguientes versiones de MontoyaOS."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.href}
            title={module.title}
            description={module.description}
            href={module.href}
            icon={module.icon}
            available={module.available}
          />
        ))}
      </div>
    </section>
  );
}