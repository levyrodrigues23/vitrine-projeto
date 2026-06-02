export interface WorkDone {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
}

export const ProjectCategory = {
  Inovacao: "Inovação",
  Extensao: "Extensão",
  Pesquisa: "Pesquisa",
} as const;

export type ProjectCategory =
  (typeof ProjectCategory)[keyof typeof ProjectCategory];

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
  responsible: string;
  worksDone?: WorkDone[];
}
