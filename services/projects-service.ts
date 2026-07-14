import { supabase } from "@/core/services/supabase";

import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "@/types/project";

const TABLE = "projects";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.group("❌ PROJECTS - GET");
    console.error(error);
    console.groupEnd();

    return [];
  }

  return (data ?? []) as Project[];
}

export async function createProject(
  project: CreateProjectInput
): Promise<Project | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(project)
    .select()
    .single();

  if (error) {
    console.group("❌ PROJECTS - CREATE");
    console.error(error);
    console.groupEnd();

    return null;
  }

  return data as Project;
}

export async function updateProject(
  id: string,
  updates: UpdateProjectInput
): Promise<Project | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.group("❌ PROJECTS - UPDATE");
    console.error(error);
    console.groupEnd();

    return null;
  }

  return data as Project;
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.group("❌ PROJECTS - DELETE");
    console.error(error);
    console.groupEnd();

    return false;
  }

  return true;
}