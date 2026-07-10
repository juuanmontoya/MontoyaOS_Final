import type { CalendarEvent } from "@/types/calendar";

import { AgendaItem } from "./agenda-item";
import { EmptyState } from "./empty-state";

interface AgendaListProps {
  events: CalendarEvent[];
}

export function AgendaList({
  events,
}: AgendaListProps) {
  if (events.length === 0) {
    return (
      <EmptyState
        title="No hay eventos"
        description="Cuando agregues tu primer evento aparecerá aquí."
      />
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <AgendaItem
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}