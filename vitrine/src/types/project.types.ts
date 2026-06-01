export interface WorkDone {
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
  keywords?: string[];
}

export const ProjectCategory = {
  Inovacao: "Inovação",
  Extensao: "Extensão",
  Cientifico: "Científico",
  Tecnico: "Técnico",
  Tcc: "TCC",
  Ensino: "Ensino",
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
  link?: string;
  keywords?: string[];
  area?: string;
  responsible?: string;
  year?: number;
  status?: string;
  worksDone?: WorkDone[];
}
