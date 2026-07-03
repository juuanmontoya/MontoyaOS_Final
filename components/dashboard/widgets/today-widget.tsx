import { Clock3 } from "lucide-react";

const events = [
  {
    time: "2:00",
    period: "PM",
    title: "Cita médica de Ana",
    subtitle: "Clínica Colsubsidio",
    color: "bg-green-500",
  },
  {
    time: "3:00",
    period: "PM",
    title: "American Express",
    subtitle: "Revisar campañas",
    color: "bg-cyan-500",
  },
  {
    time: "8:00",
    period: "PM",
    title: "Reunión de líderes",
    subtitle: "Iglesia",
    color: "bg-violet-500",
  },
];

export function TodayWidget() {
  return (
    <section>

      <div className="mb-10">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
          Hoy
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Agenda
        </h2>

      </div>

      <div className="space-y-10">

        {events.map((event, index) => (

          <div
            key={index}
            className="grid grid-cols-[70px_24px_1fr] gap-5"
          >

            {/* Hora */}

            <div className="text-right">

              <h3 className="text-2xl font-bold leading-none">
                {event.time}
              </h3>

              <p className="mt-1 text-xs font-semibold tracking-widest text-muted-foreground">
                {event.period}
              </p>

            </div>

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div
                className={`h-4 w-4 rounded-full ${event.color} ring-4 ring-white shadow`}
              />

              {index !== events.length - 1 && (
                <div className="mt-2 h-full w-[2px] rounded-full bg-zinc-200" />
              )}

            </div>

            {/* Evento */}

            <div className="pb-10">

              <div className="flex items-center gap-2">

                <Clock3
                  size={14}
                  className="text-zinc-400"
                />

                <span className="text-sm text-muted-foreground">
                  {event.time} {event.period}
                </span>

              </div>

              <h3 className="mt-2 text-xl font-semibold">
                {event.title}
              </h3>

              <p className="mt-1 text-muted-foreground">
                {event.subtitle}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}