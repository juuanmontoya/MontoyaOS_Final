import type { DashboardBriefItem } from "@/core/dashboard-engine/brief";
import type { CalendarEvent } from "@/types/calendar";

interface HeroWidgetProps {
  brief: DashboardBriefItem[];

  nextEvent: CalendarEvent | null;

  tasks: {
    total: number;
    pending: number;
    completed: number;
    overdue: number;
  };
}


export function HeroWidget({
  brief,
  nextEvent,
  tasks,
}: HeroWidgetProps) {

  const today =
    new Date().toLocaleDateString(
      "es-CO",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
    );


  const priorityBrief =
    [
      ...brief.filter(
        (item) =>
          item.id.startsWith("tasks")
      ),

      ...brief.filter(
        (item) =>
          !item.id.startsWith("tasks")
      ),
    ].slice(0, 2);


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


        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Pendientes
            </p>

            <p className="mt-1 text-3xl font-bold">
              {tasks.pending}
            </p>
          </div>


          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs uppercase text-blue-100">
              Vencidas
            </p>

            <p className="mt-1 text-3xl font-bold">
              {tasks.overdue}
            </p>
          </div>

        </div>


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


        {priorityBrief.length > 0 && (

          <div className="mt-6 flex flex-wrap gap-3">

            {priorityBrief.map((item) => (

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