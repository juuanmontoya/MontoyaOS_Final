function parseLocalDate(date: string) {
  const cleanDate = date.split("T")[0];

  const [year, month, day] =
    cleanDate.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

export function getTaskDateLabel(
  dueDate: string | null
): string | null {
  if (!dueDate) return null;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const date = parseLocalDate(dueDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  const diff =
    (date.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

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