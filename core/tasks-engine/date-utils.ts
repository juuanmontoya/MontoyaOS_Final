export function parseLocalDate(
  date: string
): Date {
  const cleanDate = date.split("T")[0];

  const [year, month, day] =
    cleanDate.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

export function startOfToday() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

export function diffInDays(
  from: Date,
  to: Date
) {
  return Math.round(
    (to.getTime() - from.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}