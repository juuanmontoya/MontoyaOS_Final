import type { DashboardBriefItem } from "@/core/dashboard-engine/brief";
import type { CalendarEvent } from "@/types/calendar";

interface HeroWidgetProps {
  brief: DashboardBriefItem[];
  nextEvent: CalendarEvent | null;
}


export function HeroWidget({
  brief,
  nextEvent,
}: HeroWidgetProps) {

  const today = new Date().toLocaleDateString(
    "es-CO",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );


  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-xl">

      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />


      <div className="relative">

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-100">
          MONTOYA OS
        </p>


        <h1 className="mt-4 text-4xl font-extrabold leading-tight">
          Buenos días, Juan 👋
        </h1>


        <p className="mt-2 text-lg capitalize text-blue-100">
          {today}
        </p>


        {nextEvent ? (
          <div className="mt-8 rounded-2xl bg-white/15 p-6 backdrop-blur">

            <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
              Próximo evento
            </p>


            <h2 className="mt-3 text-2xl font-bold">
              {nextEvent.title}
            </h2>


            <p className="mt-2 text-sm text-blue-100">
              {new Date(
                nextEvent.start
              ).toLocaleString(
                "es-CO",
                {
                  dateStyle: "medium",
                  timeStyle: "short",
                }
              )}
            </p>

          </div>

        ) : (

          <div className="mt-8 rounded-2xl bg-white/15 p-6 backdrop-blur">

            <p className="text-xl font-bold">
              Día despejado ✨
            </p>

            <p className="mt-2 text-sm text-blue-100">
              No tienes próximos eventos programados.
            </p>

          </div>
        )}


        {brief.length > 0 && (

          <div className="mt-6 flex flex-wrap gap-3">

            {brief
              .filter(
                (item) =>
                  !item.id.startsWith("calendar")
              )
              .slice(0, 2)
              .map((item) => (

                <span
                  key={item.id}
                  className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur"
                >
                  {item.title}
                </span>

              ))}

          </div>
        )}

      </div>

    </section>
  );
}