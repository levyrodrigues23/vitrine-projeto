import { create } from "zustand";

export type ProjectStoreItem = {
  id: string;
  title: string;
  description: string;
  category: "inovação" | "extensão" | "pesquisa";
  area: "sistemas" | "software" | "redes" | "outro";
  keywords: string[];
  responsible: string;
  year: number;
  status: "andamento" | "concluido" | "validacao";
  imageUrl?: string;
  createdAt: string;
};

type AddProjectInput = Omit<ProjectStoreItem, "id" | "createdAt">;

type ProjectStore = {
  projects: ProjectStoreItem[];
  addProject: (input: AddProjectInput) => void;
  removeProject: (id: string) => void;
  clearProjects: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (input) =>
    set((state) => ({
      projects: [
        {
          ...input,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...state.projects,
      ],
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
  clearProjects: () => set({ projects: [] }),
}));
