import type { Task } from "@/types/task";

export type ReminderStatus =
  | "none"
  | "scheduled"
  | "today"
  | "overdue";

export function hasReminder(task: Task): boolean {
  return Boolean(task.reminder_at);
}

export function getReminderDate(
  task: Task
): Date | null {
  if (!task.reminder_at) {
    return null;
  }

  const date = new Date(task.reminder_at);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

export function isReminderToday(
  task: Task
): boolean {
  const reminder =
    getReminderDate(task);

  if (!reminder) {
    return false;
  }

  const today = new Date();

  return (
    reminder.getFullYear() ===
      today.getFullYear() &&
    reminder.getMonth() ===
      today.getMonth() &&
    reminder.getDate() ===
      today.getDate()
  );
}

export function isReminderOverdue(
  task: Task
): boolean {
  const reminder =
    getReminderDate(task);

  if (!reminder) {
    return false;
  }

  return (
    reminder.getTime() < Date.now()
  );
}

export function getReminderStatus(
  task: Task
): ReminderStatus {
  if (!hasReminder(task)) {
    return "none";
  }

  if (
    isReminderOverdue(task)
  ) {
    return "overdue";
  }

  if (
    isReminderToday(task)
  ) {
    return "today";
  }

  return "scheduled";
}

export function formatReminder(
  task: Task
): string | null {
  const reminder =
    getReminderDate(task);

  if (!reminder) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "es-CO",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(reminder);
}

/**
 * Convierte un valor ISO (Supabase)
 * a datetime-local.
 */
export function isoToLocalDateTime(
  value: string | null
): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "";
  }

  date.setMinutes(
    date.getMinutes() -
      date.getTimezoneOffset()
  );

  return date
    .toISOString()
    .slice(0, 16);
}

/**
 * Convierte datetime-local
 * a ISO UTC para almacenar
 * en Supabase.
 */
export function localDateTimeToISO(
  value: string
): string | null {
  if (!value) {
    return null;
  }

  return new Date(value).toISOString();
}