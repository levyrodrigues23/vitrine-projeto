export interface WorkDone {
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
  keywords?: string[];
}

export enum ProjectCategory {
  Inovacao = "Inovacao",
  Extensao = "Extensao",
  Cientifico = "Cientifico",
  Tecnico = "Tecnico",
  Tcc = "Tcc",
  Ensino = "Ensino",
  Pesquisa = "Pesquisa",
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl?: string;
  link?: string;
  keywords?: string[];
  worksDone?: WorkDone[];
}
