"use client";

import type { CalendarEvent } from "@/types/calendar";

import { AppCard } from "@/components/ui/app-card";
import { useCalendarStore } from "@/store/calendar-store";

interface AgendaItemProps {
  event: CalendarEvent;
}

export function AgendaItem({
  event,
}: AgendaItemProps) {
  const setSelectedEvent =
    useCalendarStore(
      (state) => state.setSelectedEvent
    );

  return (
    <button
      type="button"
      onClick={() =>
        setSelectedEvent(event)
      }
      className="w-full text-left"
    >
      <AppCard className="relative overflow-hidden transition hover:-translate-y-1">
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{
            backgroundColor: event.color,
          }}
        />

        <div className="pl-3">
          <h3 className="text-lg font-semibold">
            {event.title}
          </h3>

          {event.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {event.description}
            </p>
          )}

          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>
              📅{" "}
              {new Date(
                event.start
              ).toLocaleString()}
            </p>

            {!event.all_day && (
              <p>
                ⏰ Finaliza:{" "}
                {new Date(
                  event.end
                ).toLocaleString()}
              </p>
            )}

            {event.location && (
              <p>
                📍 {event.location}
              </p>
            )}
          </div>
        </div>
      </AppCard>
    </button>
  );
}