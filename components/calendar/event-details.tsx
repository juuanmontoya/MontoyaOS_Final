"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useCalendarStore } from "@/store/calendar-store";

import { SectionCard } from "@/components/ui/section-card";
import { EventEditor } from "@/components/calendar/event-editor";

export function EventDetails() {
  const selectedEvent = useCalendarStore(
    (state) => state.selectedEvent
  );

  const editEvent = useCalendarStore(
    (state) => state.editEvent
  );

  const removeEvent = useCalendarStore(
    (state) => state.removeEvent
  );

  const setSelectedEvent = useCalendarStore(
    (state) => state.setSelectedEvent
  );

  const [isEditing, setIsEditing] =
    useState(false);

  if (!selectedEvent) {
    return (
      <SectionCard>
        <div className="text-center text-sm text-muted-foreground">
          Selecciona un evento para ver sus detalles.
        </div>
      </SectionCard>
    );
  }

  async function handleDelete() {
  if (!selectedEvent) {
    return;
  }

  const eventId = selectedEvent.id;

  const confirmed = window.confirm(
    "¿Seguro que quieres eliminar este evento?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await removeEvent(eventId);

    setSelectedEvent(null);

    toast.success(
      "Evento eliminado correctamente."
    );

  } catch {
    toast.error(
      "No fue posible eliminar el evento."
    );
  }
}

  if (isEditing) {
    return (
      <SectionCard>
        <EventEditor
          initialValues={{
            title: selectedEvent.title,
            description:
              selectedEvent.description ?? "",
            start: selectedEvent.start,
            end: selectedEvent.end,
            all_day:
              selectedEvent.all_day,
            location:
              selectedEvent.location ?? "",
            color:
              selectedEvent.color,
          }}
          submitLabel="Actualizar evento"
          onSubmit={async (data) => {
            await editEvent(
              selectedEvent.id,
              data
            );

            setIsEditing(false);
          }}
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <div className="space-y-5">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold">
              {selectedEvent.title}
            </h2>

            {selectedEvent.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedEvent.description}
              </p>
            )}
          </div>

        </div>


        <div className="space-y-2 text-sm">

          <p>
            📅 Inicio:{" "}
            {new Date(
              selectedEvent.start
            ).toLocaleString()}
          </p>

          <p>
            ⏰ Fin:{" "}
            {new Date(
              selectedEvent.end
            ).toLocaleString()}
          </p>

          {selectedEvent.location && (
            <p>
              📍 {selectedEvent.location}
            </p>
          )}

        </div>


        <div className="flex gap-3">

          <button
            type="button"
            onClick={() =>
              setIsEditing(true)
            }
            className="flex-1 rounded-xl bg-blue-600 p-3 font-semibold text-white"
          >
            Editar
          </button>


          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 p-3 font-semibold text-white"
          >
            Eliminar
          </button>

        </div>

      </div>
    </SectionCard>
  );
}