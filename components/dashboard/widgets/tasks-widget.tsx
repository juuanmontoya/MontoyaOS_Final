import { CheckSquare } from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

import {
  getDashboardTasks,
  getTaskDateLabel,
} from "@/core/tasks-engine";

import type { Task } from "@/types/task";


interface TasksWidgetProps {
  tasks: Task[];
}


export function TasksWidget({
  tasks,
}: TasksWidgetProps) {

  const priorityTasks =
    getDashboardTasks(
      tasks,
      5
    );


  return (
    <AppCard>

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-blue-100 p-3">
          <CheckSquare className="h-6 w-6 text-blue-700" />
        </div>


        <div>
          <h3 className="font-semibold">
            Tareas
          </h3>

          <p className="text-sm text-muted-foreground">
            Prioridades pendientes
          </p>
        </div>

      </div>


      <div className="space-y-3">

        {priorityTasks.length === 0 ? (

          <p className="text-sm text-muted-foreground">
            No tienes tareas pendientes.
          </p>

        ) : (

          priorityTasks.map((task) => (

            <div
              key={task.id}
              className="rounded-xl bg-muted p-3"
            >

              <p className="font-medium">
                {task.title}
              </p>


              {getTaskDateLabel(
                task.due_date
              ) && (

                <p className="mt-1 text-sm text-muted-foreground">
                  {getTaskDateLabel(
                    task.due_date
                  )}
                </p>

              )}

            </div>

          ))

        )}

      </div>

    </AppCard>
  );
}