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
export function getMonthDays(
  year: number,
  month: number
) {
  const firstDay = new Date(
    year,
    month,
    1
  );

  const lastDay = new Date(
    year,
    month + 1,
    0
  );


  const days = [];


  for (
    let i = 1;
    i <= lastDay.getDate();
    i++
  ) {
    days.push(
      new Date(
        year,
        month,
        i
      )
    );
  }


  return {
    firstDay: firstDay.getDay(),
    days,
  };
}



export function isSameCalendarDay(
  date: Date,
  value: string
) {
  const eventDate = new Date(value);


  return (
    date.getFullYear() ===
      eventDate.getFullYear() &&
    date.getMonth() ===
      eventDate.getMonth() &&
    date.getDate() ===
      eventDate.getDate()
  );
}