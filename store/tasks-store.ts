import { create } from "zustand";

import type { Task, TaskPriority } from "@/types/task";

import {
  getTasks,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "@/services/tasks-service";

import {
  getTasksByFilter,
  type TaskFilter,
} from "@/core/tasks-engine/filters";

interface CreateTaskInput {
  title: string;
  priority: TaskPriority;
  due_date: string | null;
  category: string | null;
  reminder_at: string | null;
  project_id: string | null;
}

interface TasksStore {
  tasks: Task[];
  loading: boolean;

  activeFilter: TaskFilter;

  loadTasks: () => Promise<void>;

  createTask: (
    input: CreateTaskInput
  ) => Promise<void>;

  updateTask: (
    id: string,
    updates: Partial<Task>
  ) => Promise<void>;

  deleteTask: (
    id: string
  ) => Promise<void>;

  toggleTaskComplete: (
    id: string
  ) => Promise<void>;

  setFilter: (
    filter: TaskFilter
  ) => void;

  getFilteredTasks: () => Task[];
}

export const useTasksStore = create<TasksStore>(
  (set, get) => ({
    tasks: [],
    loading: false,

    activeFilter: "all",

    loadTasks: async () => {
      set({ loading: true });

      try {
        const tasks = await getTasks();

        set({ tasks });
      } finally {
        set({ loading: false });
      }
    },

    createTask: async ({
  title,
  priority,
  due_date,
  category,
  reminder_at,
  project_id,
}) => {
      const newTask =
        await createTaskService({
          title,
          description: null,

          status: "todo",
          priority,

          due_date,
          category,

          tags: [],

          reminder_at,
          completed_at: null,

          project_id,
          parent_task_id: null,
        });

      if (!newTask) return;

      set((state) => ({
        tasks: [
          newTask,
          ...state.tasks,
        ],
      }));
    },

    updateTask: async (
      id,
      updates
    ) => {
      const updatedTask =
        await updateTaskService(
          id,
          updates
        );

      if (!updatedTask) return;

      set((state) => ({
        tasks: state.tasks.map(
          (task) =>
            task.id === id
              ? updatedTask
              : task
        ),
      }));
    },

    deleteTask: async (
      id
    ) => {
      const deleted =
        await deleteTaskService(id);

      if (!deleted) return;

      set((state) => ({
        tasks: state.tasks.filter(
          (task) =>
            task.id !== id
        ),
      }));
    },

    toggleTaskComplete: async (
      id
    ) => {
      const task =
        get().tasks.find(
          (task) =>
            task.id === id
        );

      if (!task) return;

      const completed =
        task.status !== "completed";

      const updatedTask =
        await updateTaskService(
          id,
          {
            status: completed
              ? "completed"
              : "todo",

            completed_at: completed
              ? new Date().toISOString()
              : null,
          }
        );

      if (!updatedTask) return;

      set((state) => ({
        tasks: state.tasks.map(
          (task) =>
            task.id === id
              ? updatedTask
              : task
        ),
      }));
    },

    setFilter: (
      filter
    ) => {
      set({
        activeFilter: filter,
      });
    },

    getFilteredTasks: () => {
      const {
        tasks,
        activeFilter,
      } = get();

      return getTasksByFilter(
        tasks,
        activeFilter
      );
    },
  })
);