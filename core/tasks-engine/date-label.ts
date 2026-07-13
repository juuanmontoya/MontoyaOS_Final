import {
  diffInDays,
  parseLocalDate,
  startOfToday,
} from "./date-utils";

export function getTaskDateLabel(
  dueDate: string | null
): string | null {
  if (!dueDate) return null;

  const today = startOfToday();

  const date = parseLocalDate(dueDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  const diff = diffInDays(
    today,
    date
  );

  if (diff < 0) {
    return "🔴 Vencida";
  }

  if (diff === 0) {
    return "🟠 Hoy";
  }

  if (diff === 1) {
    return "🟢 Mañana";
  }

  if (diff <= 7) {
    return `🔵 En ${diff} días`;
  }

  return `📅 ${date.toLocaleDateString(
    "es-CO",
    {
      day: "numeric",
      month: "short",
    }
  )}`;
}