export type TaskStatus =
  | "todo"
  | "in_progress"
  | "completed"
  | "cancelled";

export type TaskPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

export interface Task {
  id: string;

  title: string;
  description: string | null;

  status: TaskStatus;
  priority: TaskPriority;

  due_date: string | null;

  category: string | null;

  tags: string[];

  reminder_at: string | null;

  completed_at: string | null;

  project_id: string | null;

  parent_task_id: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  title: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;

  status?: TaskStatus;
  priority?: TaskPriority;

  due_date?: string | null;

  category?: string | null;

  tags?: string[];

  reminder_at?: string | null;

  completed_at?: string | null;

  project_id?: string | null;

  parent_task_id?: string | null;
}