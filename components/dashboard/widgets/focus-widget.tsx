import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icons/icon-chip";
import {
  Target,
  Clock3,
  CheckCircle2,
  Flame,
} from "lucide-react";

export function FocusWidget() {
  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-sky-700 via-blue-600 to-cyan-500">
      <CardContent className="p-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr] items-center">

          {/* Lado izquierdo */}

          <div className="space-y-6">

            <div>

              <Badge className="bg-white/20 hover:bg-white/20 text-white border-white/20">
                Focus del día
              </Badge>

              <h2 className="mt-4 text-4xl font-bold text-white leading-tight">
                Finalizar campaña de Enfermera Segura
              </h2>

              <p className="mt-4 text-blue-100 text-lg leading-relaxed">
                Si completas esta tarea antes de las 3:00 PM,
                habrás terminado el objetivo más importante del día.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 backdrop-blur-md border border-white/10">
                <IconChip color="blue">
  <Clock3 size={18} />
</IconChip>
                <span className="text-sm font-semibold text-white">
                  3:00 PM
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 backdrop-blur-md border border-white/10">
                <IconChip color="green">
  <CheckCircle2 size={18} />
</IconChip>
                <span className="text-sm font-semibold text-white">
                  2 tareas
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3 backdrop-blur-md border border-white/10">
                <IconChip color="amber">
  <Flame size={18} />
</IconChip>
                <span className="text-sm font-semibold text-white">
                  Prioridad Alta
                </span>
              </div>

            </div>

            <div>

              <div className="mb-2 flex justify-between text-sm text-blue-100">
                <span>Progreso</span>
                <span>70%</span>
              </div>

              <div className="h-3 rounded-full bg-white/20">
                <div className="h-3 w-[70%] rounded-full bg-white"></div>
              </div>

            </div>

          </div>

          {/* Lado derecho */}

          <div className="hidden lg:flex justify-center">

            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/10 backdrop-blur">

              <Target
                size={90}
                className="text-white"
              />

            </div>

          </div>

        </div>
      </CardContent>
    </Card>
  );
}