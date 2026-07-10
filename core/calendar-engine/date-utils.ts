export function localDateTimeToISOString(
  value: string
) {
  if (!value) {
    return value;
  }

  const [date, time] =
    value.split("T");

  const [year, month, day] =
    date.split("-").map(Number);

  const [hour, minute] =
    time.split(":").map(Number);

  const localDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute
  );

  return localDate.toISOString();
}


export function formatCalendarDate(
  value: string
) {
  return new Date(value).toLocaleString(
    "es-CO",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}