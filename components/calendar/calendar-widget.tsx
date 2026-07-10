"use client";

import type { CalendarEvent } from "@/types/calendar";

import {
  getUpcomingEvents,
  formatCalendarDate,
} from "@/core/calendar-engine";

import { SectionCard } from "@/components/ui/section-card";

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

export function CalendarWidget({
  events,
}: CalendarWidgetProps) {
  const upcoming =
    getUpcomingEvents(events, 3);

  return (
    <SectionCard>
      <div className="space-y-5">

        <div>
          <h2 className="text-xl font-bold">
            📅 Próximos eventos
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tus próximas actividades.
          </p>
        </div>


        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tienes eventos próximos.
          </p>
        ) : (
          <div className="space-y-3">

            {upcoming.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border p-4"
              >
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCalendarDate(
                    event.start
                  )}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </SectionCard>
  );
}