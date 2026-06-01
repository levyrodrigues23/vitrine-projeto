import { create } from "zustand";
import type { ProjectCategory } from "../types/project.types";

export type ProjectFilterCategory = "all" | ProjectCategory;

type ProjectStore = {
  activeCategory: ProjectFilterCategory;
  searchQuery: string;
  setActiveCategory: (category: ProjectFilterCategory) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  activeCategory: "all",
  searchQuery: "",
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () => set({ activeCategory: "all", searchQuery: "" }),
}));
