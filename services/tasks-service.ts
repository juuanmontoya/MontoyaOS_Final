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
    .order("created_at", { ascending: false });

  if (error) {
    console.group("❌ TASKS - GET");
    console.error(error);
    console.groupEnd();

    return [];
  }

  return (data ?? []) as Task[];
}

export async function createTask(
  task: CreateTaskInput & Omit<Task, "id" | "created_at" | "updated_at" | "title">
): Promise<Task | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(task)
    .select()
    .single();

  if (error) {
    console.group("❌ TASKS - CREATE");
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
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.group("❌ TASKS - UPDATE");
    console.error(error);
    console.groupEnd();

    return null;
  }

  return data as Task;
}

export async function deleteTask(id: string): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.group("❌ TASKS - DELETE");
    console.error(error);
    console.groupEnd();

    return false;
  }

  return true;
}