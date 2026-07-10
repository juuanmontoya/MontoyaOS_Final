import { supabase } from "@/core/services/supabase";
import type { CalendarEvent } from "@/types/calendar";

const TABLE = "calendar_events";

export async function getCalendarEvents() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("start", { ascending: true });

  if (error) {
    console.group("❌ SUPABASE ERROR - GET");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return (data ?? []) as CalendarEvent[];
}

export async function addCalendarEvent(
  event: Omit<CalendarEvent, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(event)
    .select()
    .single();

  if (error) {
    console.group("❌ SUPABASE ERROR - INSERT");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data as CalendarEvent;
}

export async function updateCalendarEvent(
  id: string,
  event: Omit<CalendarEvent, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(event)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.group("❌ SUPABASE ERROR - UPDATE");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data as CalendarEvent;
}

export async function deleteCalendarEvent(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.group("❌ SUPABASE ERROR - DELETE");
    console.log(error);
    console.groupEnd();

    throw error;
  }
}