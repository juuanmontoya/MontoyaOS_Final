import type { Task } from "@/types/task";

export interface TaskMoveResult {
  movedTask: Task;
  updatedTasks: Task[];
}

export function getNextPosition(
  tasks: Task[],
  projectId: string | null
): number {
  const projectTasks = tasks.filter(
    (task) =>
      task.project_id === projectId
  );

  if (projectTasks.length === 0) {
    return 0;
  }

  return (
    Math.max(
      ...projectTasks.map(
        (task) => task.position
      )
    ) + 1
  );
}

export function normalizePositions(
  tasks: Task[]
): Task[] {
  return tasks.map(
    (task, index) => ({
      ...task,
      position: index,
    })
  );
}

export function reorderTasks(
  tasks: Task[]
): Task[] {
  return [...tasks].sort(
    (a, b) =>
      a.position - b.position
  );
}

export function moveTaskBetweenColumns(
  tasks: Task[],
  taskId: string,
  destinationStatus: Task["status"]
): TaskMoveResult {
  const ordered =
    reorderTasks(tasks);

  const movedIndex =
    ordered.findIndex(
      (task) =>
        task.id === taskId
    );

  if (movedIndex === -1) {
    throw new Error(
      "Task not found."
    );
  }

  const movedTask = {
    ...ordered[movedIndex],
    status:
      destinationStatus,
  };

  ordered[movedIndex] =
    movedTask;

  const normalized =
    normalizePositions(
      ordered
    );

  return {
    movedTask:
      normalized.find(
        (task) =>
          task.id === taskId
      )!,
    updatedTasks:
      normalized,
  };
}