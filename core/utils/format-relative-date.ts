export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Hoy";
  }

  if (diffDays === 1) {
    return "Ayer";
  }

  if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  }

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year:
      date.getFullYear() === now.getFullYear()
        ? undefined
        : "numeric",
  });
}