import type { UpdateTaskInput, Task } from "@/types/task";

import { groupTasks } from "@/core/tasks-engine/group-tasks";

import { TaskCard } from "./task-card";
import { TaskSection } from "./task-section";

interface TaskListProps {
  tasks: Task[];

  onToggleComplete: (id: string) => void;

  onUpdate: (
    id: string,
    updates: UpdateTaskInput
  ) => Promise<void>;

  onDelete: (id: string) => Promise<void>;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-12 text-center">
        <h3 className="text-lg font-semibold">
          No tienes tareas
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Crea tu primera tarea para comenzar.
        </p>
      </div>
    );
  }

  const groups = groupTasks(tasks);

  function renderTasks(list: Task[]) {
    return list.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onToggleComplete={onToggleComplete}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ));
  }

  return (
    <div className="space-y-8">
      {groups.overdue.length > 0 && (
        <TaskSection title="🔴 Vencidas">
          {renderTasks(groups.overdue)}
        </TaskSection>
      )}

      {groups.today.length > 0 && (
        <TaskSection title="🟠 Hoy">
          {renderTasks(groups.today)}
        </TaskSection>
      )}

      {groups.upcoming.length > 0 && (
        <TaskSection title="🔵 Próximamente">
          {renderTasks(groups.upcoming)}
        </TaskSection>
      )}

      {groups.noDate.length > 0 && (
        <TaskSection title="⚪ Sin fecha">
          {renderTasks(groups.noDate)}
        </TaskSection>
      )}

      {groups.completed.length > 0 && (
        <TaskSection title="✅ Completadas">
          {renderTasks(groups.completed)}
        </TaskSection>
      )}
    </div>
  );
}