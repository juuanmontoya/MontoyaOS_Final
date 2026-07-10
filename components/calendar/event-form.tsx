"use client";

import { useCalendarStore } from "@/store/calendar-store";

import { SectionCard } from "@/components/ui/section-card";
import { EventEditor } from "@/components/calendar/event-editor";

export function EventForm() {
  const createEvent = useCalendarStore(
    (state) => state.createEvent
  );

  return (
    <SectionCard>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Crear evento
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Agrega un nuevo evento a tu calendario personal.
        </p>
      </div>

      <EventEditor
        submitLabel="Guardar evento"
        resetAfterSubmit
        onSubmit={createEvent}
      />
    </SectionCard>
  );
}