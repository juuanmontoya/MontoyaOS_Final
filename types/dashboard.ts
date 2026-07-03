export interface DashboardStats {
  events: number;
  reminders: number;
  highPriority: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  period: "AM" | "PM";
  color: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  due: string;
  color: string;
}