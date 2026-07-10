import type { CalendarEvent } from "@/types/calendar";

export function getNextEvent(
  events: CalendarEvent[]
) {
  const now = new Date();

  return (
    events
      .filter(
        (event) =>
          new Date(event.start) > now
      )
      .sort(
        (a, b) =>
          new Date(a.start).getTime() -
          new Date(b.start).getTime()
      )[0] ?? null
  );
}