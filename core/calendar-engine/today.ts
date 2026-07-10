import type { CalendarEvent } from "@/types/calendar";

export function getTodayEvents(
  events: CalendarEvent[]
): CalendarEvent[] {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return events.filter((event) => {
    const start = new Date(event.start);

    return start >= startOfDay && start <= endOfDay;
  });
}