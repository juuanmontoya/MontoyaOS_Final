import type { DashboardSummary } from "./summary";

export interface DashboardBriefItem {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

export function generateDashboardBrief(
  summary: DashboardSummary
): DashboardBriefItem[] {
  const brief: DashboardBriefItem[] = [];

  const finance = summary.finance;

  if (finance.health.score >= 90) {
    brief.push({
      id: "finance-excellent",
      type: "success",
      title: "Finanzas saludables",
      description:
        "Tus finanzas presentan un excelente estado este mes.",
    });
  } else if (finance.health.score >= 70) {
    brief.push({
      id: "finance-good",
      type: "info",
      title: "Buen desempeño",
      description:
        "Tus finanzas van por buen camino, continúa registrando tus movimientos.",
    });
  } else {
    brief.push({
      id: "finance-warning",
      type: "warning",
      title: "Revisa tus gastos",
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

  return brief;
}