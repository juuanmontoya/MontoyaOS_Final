import type { CalendarEvent } from "@/types/calendar";

interface AgendaItemProps {
  event: CalendarEvent;
}

export function AgendaItem({
  event,
}: AgendaItemProps) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-semibold">
        {event.title}
      </h3>

      {event.description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {event.description}
        </p>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        {new Date(event.start).toLocaleString()}
      </p>
    </div>
  );
}