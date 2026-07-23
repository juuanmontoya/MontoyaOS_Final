import type {
  DragEndEvent,
} from "@dnd-kit/core";

import type {
  Task,
  TaskStatus,
} from "@/types/task";

export interface KanbanMoveResult {
  task: Task;

  status: TaskStatus;

  targetTask: Task | null;
}

export function resolveKanbanMove(
  event: DragEndEvent
): KanbanMoveResult | null {
  const {
    active,
    over,
  } = event;

  if (!over) {
    return null;
  }

  const activeTask =
    active.data.current?.task as
      | Task
      | undefined;

  if (!activeTask) {
    return null;
  }

  const overData =
    over.data.current;

  let status:
    | TaskStatus
    | null = null;

  let targetTask:
    | Task
    | null = null;

  if (
    overData?.type ===
    "column"
  ) {
    status =
      overData.status;
  }

  if (
    overData?.type ===
    "task"
  ) {
    status =
      overData.task.status;

    targetTask =
      overData.task;
  }

  if (!status) {
    return null;
  }

  return {
    task: activeTask,
    status,
    targetTask,
  };
}