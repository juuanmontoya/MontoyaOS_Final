"use client";

import { useEffect } from "react";

import { PageHeader } from "@/components/ui/page-header";

import { EventForm } from "@/components/calendar/event-form";
import { AgendaList } from "@/components/calendar/agenda-list";
import { EventDetails } from "@/components/calendar/event-details";

import { useCalendarStore } from "@/store/calendar-store";
import { CalendarGrid } from "@/components/calendar/calendar-grid";

export function CalendarDashboard() {
  const events = useCalendarStore(
    (state) => state.events
  );

  const loadEvents = useCalendarStore(
    (state) => state.loadEvents
  );

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Calendario"
        description="Administra tus eventos, reuniones y recordatorios."
      />

<CalendarGrid events={events} />
      <section className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <EventForm />

        <div className="space-y-8">
          <AgendaList events={events} />

          <EventDetails />
        </div>
      </section>
    </div>
  );
}