"use client";

import { useEffect } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { AgendaList } from "@/components/calendar/agenda-list";

import { useCalendarStore } from "@/store/calendar-store";

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
    <div className="space-y-6">
      <PageHeader
        title="Calendario"
        description="Administra tus eventos, reuniones y recordatorios."
      />

      <AgendaList events={events} />
    </div>
  );
}