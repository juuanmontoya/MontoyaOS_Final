import type { CalendarEvent } from "@/types/calendar";
import type { Task } from "@/types/task";
import type { FinancialCommitment } from "@/types/financial-plan";

export type AttentionItem =
  | {
      type: "commitment";
      title: string;
      subtitle: string;
      amount: number;
      actionLabel: string;
    }
  | {
      type: "event";
      title: string;
      subtitle: string;
      actionLabel: string;
    }
  | {
      type: "task";
      title: string;
      subtitle: string;
      actionLabel: string;
    }
  | null;

interface Params {
  commitments: FinancialCommitment[];
  events: CalendarEvent[];
  tasks: Task[];
}

export function getAttentionItem({
  commitments,
  events,
  tasks,
}: Params): AttentionItem {
  const today = new Date();

  // 1. Próximo compromiso financiero
  const nextCommitment = [...commitments]
    .sort((a, b) => a.day - b.day)[0];

  if (nextCommitment) {
    const dueDate = new Date(
      nextCommitment.year,
      nextCommitment.month - 1,
      nextCommitment.day
    );

    const diff = Math.ceil(
      (dueDate.getTime() -
        today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let subtitle = "";

    if (diff <= 0) {
      subtitle = "Vence hoy";
    } else if (diff === 1) {
      subtitle = "Vence mañana";
    } else {
      subtitle = `Vence en ${diff} días`;
    }

    return {
      type: "commitment",
      title: nextCommitment.name,
      subtitle,
      amount:
        nextCommitment.monthly_amount,
      actionLabel:
        "Registrar pago",
    };
  }

  // 2. Próximo evento
  if (events.length > 0) {
    const nextEvent = [...events].sort(
      (a, b) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
    )[0];

    return {
      type: "event",
      title: nextEvent.title,
      subtitle: new Date(
        nextEvent.start
      ).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
      }),
      actionLabel:
        "Ver evento",
    };
  }

  // 3. Tarea prioritaria
  const priorityTask =
    tasks.find(
      (task) =>
        !task.completed_at
    );

  if (priorityTask) {
    return {
      type: "task",
      title:
        priorityTask.title,
      subtitle:
        "Pendiente",
      actionLabel:
        "Abrir tarea",
    };
  }

  return null;
}