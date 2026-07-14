import type { FinanceSummary } from "@/core/finance-engine";

export interface DashboardBriefItem {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}


interface DashboardBriefInput {
  finance: FinanceSummary;

  tasks: {
    pending: number;
    overdue: number;
    today: number;
  };
}


export function generateDashboardBrief({
  finance,
  tasks,
}: DashboardBriefInput): DashboardBriefItem[] {

  const brief: DashboardBriefItem[] = [];


  if (finance.health.score >= 90) {

    brief.push({
      id: "finance-excellent",
      type: "success",
      title: "💰 Finanzas saludables",
      description:
        "Tus finanzas presentan un excelente estado este mes.",
    });

  } else if (finance.health.score >= 70) {

    brief.push({
      id: "finance-good",
      type: "info",
      title: "💰 Buen desempeño financiero",
      description:
        "Tus finanzas van por buen camino, continúa registrando tus movimientos.",
    });

  } else {

    brief.push({
      id: "finance-warning",
      type: "warning",
      title: "⚠️ Revisa tus gastos",
      description:
        "Tus indicadores financieros muestran oportunidades de mejora.",
    });

  }


  if (finance.insights.length > 0) {

    const insight = finance.insights[0];

    brief.push({
      id: `finance-insight-${insight.id}`,
      type: insight.type,
      title: insight.title,
      description: insight.description,
    });

  }


  if (tasks.overdue > 0) {

    brief.push({
      id: "tasks-overdue",
      type: "warning",
      title: "🔴 Tienes tareas atrasadas",
      description:
        `${tasks.overdue} tareas requieren atención.`,
    });


  } else if (tasks.today > 0) {

    brief.push({
      id: "tasks-today",
      type: "info",
      title: "📋 Prioridades para hoy",
      description:
        `${tasks.today} tareas están programadas para hoy.`,
    });


  } else if (tasks.pending > 0) {

    brief.push({
      id: "tasks-pending",
      type: "info",
      title: "📋 Revisa tus tareas pendientes",
      description:
        `${tasks.pending} tareas esperan tu atención.`,
    });

  }


  return brief;
}