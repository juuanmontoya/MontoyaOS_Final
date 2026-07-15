export type ProjectStatus =
  | "active"
  | "archived";

export interface Project {
  id: string;
  user_id: string;

  name: string;
  description: string | null;

  color: string;
  icon: string;

  status: ProjectStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;

  description: string | null;

  color: string;
  icon: string;
}

export interface UpdateProjectInput
  extends Partial<
    CreateProjectInput
  > {
  status?: ProjectStatus;
}