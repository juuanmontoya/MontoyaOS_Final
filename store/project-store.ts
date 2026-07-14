import { create } from "zustand";

import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "@/types/project";

import {
  getProjects,
  createProject as createProjectService,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
} from "@/services/projects-service";

interface ProjectsStore {
  projects: Project[];
  loading: boolean;

  loadProjects: () => Promise<void>;

  createProject: (
    input: CreateProjectInput
  ) => Promise<void>;

  updateProject: (
    id: string,
    updates: UpdateProjectInput
  ) => Promise<void>;

  deleteProject: (
    id: string
  ) => Promise<void>;
}

export const useProjectsStore =
  create<ProjectsStore>((set) => ({
    projects: [],
    loading: false,

    loadProjects: async () => {
      set({ loading: true });

      try {
        const projects =
          await getProjects();

        set({ projects });
      } finally {
        set({ loading: false });
      }
    },

    createProject: async (
      input
    ) => {
      const project =
        await createProjectService(
          input
        );

      if (!project) return;

      set((state) => ({
        projects: [
          project,
          ...state.projects,
        ],
      }));
    },

    updateProject: async (
      id,
      updates
    ) => {
      const project =
        await updateProjectService(
          id,
          updates
        );

      if (!project) return;

      set((state) => ({
        projects:
          state.projects.map((p) =>
            p.id === id
              ? project
              : p
          ),
      }));
    },

    deleteProject: async (
      id
    ) => {
      const deleted =
        await deleteProjectService(
          id
        );

      if (!deleted) return;

      set((state) => ({
        projects:
          state.projects.filter(
            (project) =>
              project.id !== id
          ),
      }));
    },
  }));