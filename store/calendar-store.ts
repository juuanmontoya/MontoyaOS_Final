import { create } from "zustand";

import type {
  CalendarEvent,
  CalendarView,
} from "@/types/calendar";

import {
  getCalendarEvents,
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "@/services/calendar-service";

interface CalendarStore {
  events: CalendarEvent[];

  selectedEvent: CalendarEvent | null;

  selectedDate: string;

  currentView: CalendarView;

  isLoading: boolean;

  loadEvents: () => Promise<void>;

  createEvent: (
    event: Omit<
      CalendarEvent,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  editEvent: (
    id: string,
    event: Omit<
      CalendarEvent,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;

  removeEvent: (id: string) => Promise<void>;

  setSelectedEvent: (
    event: CalendarEvent | null
  ) => void;

  setSelectedDate: (
    date: string
  ) => void;

  setCurrentView: (
    view: CalendarView
  ) => void;
}

export const useCalendarStore =
  create<CalendarStore>((set) => ({
    events: [],

    selectedEvent: null,

    selectedDate: new Date().toISOString(),

    currentView: "month",

    isLoading: false,

    loadEvents: async () => {
      set({
        isLoading: true,
      });

      try {
        const events =
          await getCalendarEvents();

        set({
          events,
          isLoading: false,
        });
      } catch (error) {
        console.error(error);

        set({
          isLoading: false,
        });

        throw error;
      }
    },

    createEvent: async (event) => {
      set({
        isLoading: true,
      });

      try {
        const newEvent =
          await addCalendarEvent(event);

        set((state) => ({
          events: [...state.events, newEvent],
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);

        set({
          isLoading: false,
        });

        throw error;
      }
    },

    editEvent: async (id, event) => {
      set({
        isLoading: true,
      });

      try {
        const updatedEvent =
          await updateCalendarEvent(
            id,
            event
          );

        set((state) => ({
          events: state.events.map((item) =>
            item.id === id
              ? updatedEvent
              : item
          ),
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);

        set({
          isLoading: false,
        });

        throw error;
      }
    },

    removeEvent: async (id) => {
      set({
        isLoading: true,
      });

      try {
        await deleteCalendarEvent(id);

        set((state) => ({
          events: state.events.filter(
            (item) => item.id !== id
          ),
          selectedEvent:
            state.selectedEvent?.id === id
              ? null
              : state.selectedEvent,
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);

        set({
          isLoading: false,
        });

        throw error;
      }
    },

    setSelectedEvent: (event) =>
      set({
        selectedEvent: event,
      }),

    setSelectedDate: (date) =>
      set({
        selectedDate: date,
      }),

    setCurrentView: (view) =>
      set({
        currentView: view,
      }),
  }));