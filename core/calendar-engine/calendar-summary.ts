import type { CalendarEvent } from "@/types/calendar";

import { getTodayEvents } from "./today";

export function getUpcomingEvents(
  events: CalendarEvent[],
  limit = 5
) {
  const now = new Date();

  return events
    .filter(
      (event) =>
        new Date(event.start) > now
    )
    .sort(
      (a, b) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
    )
    .slice(0, limit);
}


export function getCalendarSummary(
  events: CalendarEvent[]
) {
  return {
    total: events.length,
    today: getTodayEvents(events).length,
    upcoming: getUpcomingEvents(events).length,
  };
}