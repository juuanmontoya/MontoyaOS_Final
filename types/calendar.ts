export type EventSource =
  | "calendar"
  | "tasks"
  | "family"
  | "bible"
  | "marketing"
  | "ai";

export type CalendarView =
  | "month"
  | "week"
  | "day"
  | "agenda";

export type ReminderUnit =
  | "minutes"
  | "hours"
  | "days";

export interface Reminder {
  value: number;
  unit: ReminderUnit;
}

export type RecurrenceFrequency =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export interface Recurrence {
  frequency: RecurrenceFrequency;
  interval: number;
}

export interface CalendarEvent {
  id: string;

  title: string;
  description: string | null;

  start: string;
  end: string;

  all_day: boolean;

  location: string | null;

  color: string;

  source: EventSource;
  source_id: string | null;

  reminder: Reminder | null;

  recurrence: Recurrence | null;

  created_at: string;
  updated_at: string;
}

export interface CreateCalendarEvent {
  title: string;

  description?: string | null;

  start: string;
  end: string;

  all_day: boolean;

  location?: string | null;

  color: string;

  source?: EventSource;

  source_id?: string | null;

  reminder?: Reminder | null;

  recurrence?: Recurrence | null;
}