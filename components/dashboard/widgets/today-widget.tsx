import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock3 } from "lucide-react";

const events = [
  {
    time: "2:00 PM",
    title: "Cita médica de Ana",
    location: "Clínica Colsubsidio",
    color: "bg-green-500",
  },
  {
    time: "3:00 PM",
    title: "Revisar campaña American Express",
    location: "Marketing",
    color: "bg-cyan-500",
  },
  {
    time: "8:00 PM",
    title: "Reunión de líderes",
    location: "Iglesia",
    color: "bg-violet-500",
  },
];

export function TodayWidget() {
  return (
    <Card className="rounded-3xl shadow-lg border-0">
      <CardHeader className="pb-2">

        <div className="flex items-center justify-between">

          <CardTitle className="flex items-center gap-2">

            <CalendarDays className="text-blue-600" size={22} />

            Agenda de Hoy

          </CardTitle>

          <Badge variant="secondary">
            {events.length} eventos
          </Badge>

        </div>

      </CardHeader>

      <CardContent>

        <div className="space-y-6">

          {events.map((event, index) => (

            <div
              key={index}
              className="flex gap-4"
            >

              {/* Timeline */}

              <div className="flex flex-col items-center">

                <div
                  className={`h-3 w-3 rounded-full ${event.color}`}
                />

                {index !== events.length - 1 && (
                  <div className="mt-1 h-full w-px bg-zinc-200" />
                )}

              </div>

              {/* Evento */}

              <div className="flex-1 pb-6">

                <div className="flex items-center gap-2 text-sm text-muted-foreground">

                  <Clock3 size={14} />

                  {event.time}

                </div>

                <h3 className="mt-1 font-semibold">

                  {event.title}

                </h3>

                <p className="text-sm text-muted-foreground">

                  {event.location}

                </p>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}