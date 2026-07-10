import type { FinanceSummary } from "@/core/finance-engine";
import type { CalendarEvent } from "@/types/calendar";

export interface DashboardBriefItem {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}


interface DashboardBriefInput {
  finance: FinanceSummary;

  calendar: {
    nextEvent: CalendarEvent | null;
  };
}


export function generateDashboardBrief({
  finance,
  calendar,
}: DashboardBriefInput): DashboardBriefItem[] {

  const brief: DashboardBriefItem[] = [];


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


  if (calendar.nextEvent) {

    const eventDate =
      new Date(
        calendar.nextEvent.start
      ).toLocaleString(
        "es-CO",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );


    brief.push({
      id: "calendar-next-event",
      type: "info",
      title: "Próximo evento",
      description:
        `${calendar.nextEvent.title} · ${eventDate}`,
    });

  } else {

    brief.push({
      id: "calendar-empty",
      type: "info",
      title: "Agenda libre",
      description:
        "No tienes próximos eventos programados.",
    });
  }


  return brief;
}