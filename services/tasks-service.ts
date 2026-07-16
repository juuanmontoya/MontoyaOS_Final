import { supabase } from "@/core/services/supabase";

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

const TABLE = "tasks";

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("status", {
      ascending: true,
    })
    .order("position", {
      ascending: true,
    });

  if (error) {
    console.group("❌ TASKS - GET");
    console.error(error);
    console.groupEnd();

    return [];
  }

  return (data ?? []) as Task[];
}

export async function createTask(
  task: CreateTaskInput &
    Omit<
      Task,
      | "id"
      | "created_at"
      | "updated_at"
      | "title"
      | "position"
    >
): Promise<Task | null> {
  let nextPosition = 0;

  const { data: lastTask } =
    await supabase
      .from(TABLE)
      .select("position")
      .eq(
        "project_id",
        task.project_id
      )
      .eq(
        "status",
        task.status
      )
      .order("position", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (lastTask) {
    nextPosition =
      lastTask.position + 1;
  }

  const { data, error } =
    await supabase
      .from(TABLE)
      .insert({
        ...task,
        position: nextPosition,
      })
      .select()
      .single();

  if (error) {
    console.group(
      "❌ TASKS - CREATE"
    );
    console.error(error);
    console.groupEnd();

    return null;
  }

  return data as Task;
}

export async function updateTask(
  id: string,
  updates: UpdateTaskInput
): Promise<Task | null> {
  const { data, error } =
    await supabase
      .from(TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

  if (error) {
    console.group(
      "❌ TASKS - UPDATE"
    );
    console.error(error);
    console.groupEnd();

    return null;
  }

  return data as Task;
}

export async function updateTasks(
  tasks: Pick<
    Task,
    "id" | "status" | "position"
  >[]
): Promise<boolean> {
  if (tasks.length === 0) {
    return true;
  }

  const updates = tasks.map(
    (task) =>
      supabase
        .from(TABLE)
        .update({
          status: task.status,
          position:
            task.position,
        })
        .eq("id", task.id)
  );

  const results =
    await Promise.all(updates);

  const hasErrors =
    results.some(
      ({ error }) => error
    );

  if (hasErrors) {
    console.group(
      "❌ TASKS - BATCH UPDATE"
    );

    results.forEach(
      ({ error }) => {
        if (error) {
          console.error(error);
        }
      }
    );

    console.groupEnd();

    return false;
  }

  return true;
}

export async function deleteTask(
  id: string
): Promise<boolean> {
  const { error } =
    await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

  if (error) {
    console.group(
      "❌ TASKS - DELETE"
    );
    console.error(error);
    console.groupEnd();

    return false;
  }

  return true;
}