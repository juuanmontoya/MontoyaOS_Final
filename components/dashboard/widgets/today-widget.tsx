import { Clock3 } from "lucide-react";
import { todayEvents } from "@/data/dashboard";

export function TodayWidget() {
  return (
    <section>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
          AGENDA
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Hoy
        </h2>
      </div>

      <div className="space-y-10">
        {todayEvents.map((event, index) => (
          <div
            key={event.id}
            className="grid grid-cols-[70px_24px_1fr] gap-5"
          >
            <div className="text-right">
              <h3 className="text-2xl font-bold leading-none">
                {event.time}
              </h3>

              <p className="mt-1 text-xs font-semibold tracking-widest text-muted-foreground">
                {event.period}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div
                className={`h-4 w-4 rounded-full ${event.color} ring-4 ring-white shadow`}
              />

              {index !== todayEvents.length - 1 && (
                <div className="mt-2 h-full w-[2px] rounded-full bg-zinc-200" />
              )}
            </div>

            <div className="pb-10 transition-all duration-200 hover:translate-x-1">
              <div className="flex items-center gap-2">
                <Clock3
                  size={14}
                  className="text-zinc-400"
                />

                <span className="text-sm text-muted-foreground">
                  {event.subtitle}
                </span>
              </div>

              <h3 className="mt-2 text-xl font-semibold">
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}