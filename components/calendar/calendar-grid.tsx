"use client";

import { useMemo, useState } from "react";

import type { CalendarEvent } from "@/types/calendar";

import {
  getMonthDays,
  isSameCalendarDay,
} from "@/core/calendar-engine";

import { SectionCard } from "@/components/ui/section-card";


interface CalendarGridProps {
  events: CalendarEvent[];
}


export function CalendarGrid({
  events,
}: CalendarGridProps) {

  const today = new Date();

  const [currentDate, setCurrentDate] =
    useState(today);


  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();


  const {
    firstDay,
    days,
  } = useMemo(
    () =>
      getMonthDays(
        year,
        month
      ),
    [
      year,
      month,
    ]
  );


  const monthName =
    currentDate.toLocaleDateString(
      "es-CO",
      {
        month: "long",
        year: "numeric",
      }
    );


  function previousMonth() {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  }


  function nextMonth() {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  }


  return (
    <SectionCard>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <button
            onClick={previousMonth}
            className="rounded-xl border px-3 py-2"
          >
            ←
          </button>


          <h2 className="text-xl font-bold capitalize">
            {monthName}
          </h2>


          <button
            onClick={nextMonth}
            className="rounded-xl border px-3 py-2"
          >
            →
          </button>

        </div>


        <div className="grid grid-cols-7 text-center text-sm font-semibold text-muted-foreground">

          {[
            "Dom",
            "Lun",
            "Mar",
            "Mié",
            "Jue",
            "Vie",
            "Sáb",
          ].map(
            (day) => (
              <div key={day}>
                {day}
              </div>
            )
          )}

        </div>


        <div className="grid grid-cols-7 gap-2">

          {Array.from({
            length: firstDay,
          }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="h-20"
              />
            )
          )}


          {days.map(
            (day) => {

              const dayEvents =
                events.filter(
                  (event) =>
                    isSameCalendarDay(
                      day,
                      event.start
                    )
                );


              return (
                <div
                  key={day.toISOString()}
                  className="relative flex h-20 flex-col rounded-xl border p-2"
                >

                  <span className="text-sm font-semibold">
                    {day.getDate()}
                  </span>


                  {dayEvents.length > 0 && (

                    <div className="mt-2 flex gap-1">

                      <span className="h-2 w-2 rounded-full bg-blue-600" />

                      <span className="text-xs text-muted-foreground">
                        {dayEvents.length}
                      </span>

                    </div>

                  )}

                </div>
              );
            }
          )}

        </div>

      </div>

    </SectionCard>
  );
}