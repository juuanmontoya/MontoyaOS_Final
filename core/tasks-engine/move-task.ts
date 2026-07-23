import type {
  Task,
  TaskStatus,
} from "@/types/task";

export interface MoveTaskInput {
  tasks: Task[];
  task: Task;
  destinationStatus: TaskStatus;
  targetTask: Task | null;
}

export function moveTask({
  tasks,
  task,
  destinationStatus,
  targetTask,
}: MoveTaskInput): Task[] {
  const working = [...tasks];

  const sourceIndex = working.findIndex(
    (item) => item.id === task.id
  );

  if (sourceIndex === -1) {
    return tasks;
  }

  const movingTask = {
    ...working[sourceIndex],
    status: destinationStatus,
  };

  working.splice(sourceIndex, 1);

  let destinationIndex = working.length;

  if (targetTask) {
    const index = working.findIndex(
      (item) =>
        item.id === targetTask.id
    );

    if (index >= 0) {
      destinationIndex = index;
    }
  }

  working.splice(
    destinationIndex,
    0,
    movingTask
  );

  return working.map(
    (task, index) => ({
      ...task,
      position: index,
    })
  );
}