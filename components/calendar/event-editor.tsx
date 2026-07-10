"use client";

import { useEffect, useState } from "react";

import {
  localDateTimeToISOString,
} from "@/core/calendar-engine";
import { toast } from "sonner";

interface Props {
  initialValues?: {
    title: string;
    description?: string;
    start: string;
    end: string;
    all_day: boolean;
    location?: string;
    color?: string;
  };

  submitLabel: string;

  resetAfterSubmit?: boolean;

  onSubmit: (data: {
    title: string;
    description?: string;
    start: string;
    end: string;
    all_day: boolean;
    location?: string;
    color: string;
  }) => Promise<void>;

  onSuccess?: () => void;
}

export function EventEditor({
  initialValues,
  submitLabel,
  resetAfterSubmit = false,
  onSubmit,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState(
    initialValues?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [start, setStart] = useState(
    initialValues?.start ?? ""
  );

  const [end, setEnd] = useState(
    initialValues?.end ?? ""
  );

  const [allDay, setAllDay] = useState(
    initialValues?.all_day ?? false
  );

  const [location, setLocation] = useState(
    initialValues?.location ?? ""
  );

  const [color, setColor] = useState(
    initialValues?.color ?? "#3B82F6"
  );

  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title || !start || !end) {
      toast.warning(
        "Completa los campos obligatorios."
      );

      return;
    }

    try {
      setIsSaving(true);

      await onSubmit({
  title,
  description,
  start: localDateTimeToISOString(start),
  end: localDateTimeToISOString(end),
  all_day: allDay,
  location,
  color,
});

      toast.success(
        "Evento guardado correctamente."
      );

      if (resetAfterSubmit) {
        setTitle("");
        setDescription("");
        setStart("");
        setEnd("");
        setAllDay(false);
        setLocation("");
        setColor("#3B82F6");
      }

      onSuccess?.();

    } catch {
      toast.error(
        "No fue posible guardar el evento."
      );
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
  if (!initialValues) return;

  setTitle(initialValues.title ?? "");
  setDescription(initialValues.description ?? "");
  setStart(initialValues.start ?? "");
  setEnd(initialValues.end ?? "");
  setAllDay(initialValues.all_day ?? false);
  setLocation(initialValues.location ?? "");
  setColor(initialValues.color ?? "#3B82F6");

}, [initialValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        className="w-full rounded-xl border p-3"
        placeholder="Título del evento"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full rounded-xl border p-3"
        placeholder="Descripción"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Inicio
          </label>

          <input
            type="datetime-local"
            className="w-full rounded-xl border p-3"
            value={start}
            onChange={(e) =>
              setStart(e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Fin
          </label>

          <input
            type="datetime-local"
            className="w-full rounded-xl border p-3"
            value={end}
            onChange={(e) =>
              setEnd(e.target.value)
            }
          />
        </div>
      </div>

      <input
        className="w-full rounded-xl border p-3"
        placeholder="Ubicación"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={allDay}
          onChange={(e) =>
            setAllDay(e.target.checked)
          }
        />

        <span>
          Todo el día
        </span>
      </label>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Color
        </label>

        <input
          type="color"
          value={color}
          onChange={(e) =>
            setColor(e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
      >
        {isSaving
          ? "Guardando..."
          : submitLabel}
      </button>
    </form>
  );
}