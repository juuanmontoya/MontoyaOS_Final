import {
  CalendarEvent,
  DashboardStats,
  Reminder,
} from "@/types/dashboard";

export const dashboardStats: DashboardStats = {
  events: 3,
  reminders: 2,
  highPriority: 1,
};

export const todayEvents: CalendarEvent[] = [
  {
    id: "1",
    time: "2:00",
    period: "PM",
    title: "Cita médica de Ana",
    subtitle: "Clínica Colsubsidio",
    color: "bg-green-500",
  },
  {
    id: "2",
    time: "3:00",
    period: "PM",
    title: "American Express",
    subtitle: "Revisar campañas",
    color: "bg-cyan-500",
  },
  {
    id: "3",
    time: "8:00",
    period: "PM",
    title: "Reunión de líderes",
    subtitle: "Iglesia",
    color: "bg-violet-500",
  },
];

export const reminders: Reminder[] = [
  {
    id: "1",
    title: "Pagar energía",
    description: "Último día para evitar recargo.",
    due: "Mañana",
    color: "border-amber-400",
  },
  {
    id: "2",
    title: "Tarjeta de crédito",
    description: "Fecha límite de pago.",
    due: "En 3 días",
    color: "border-red-500",
  },
  {
    id: "3",
    title: "Clase Conquistadores",
    description: "Preparar enseñanza.",
    due: "Domingo",
    color: "border-blue-500",
  },
];