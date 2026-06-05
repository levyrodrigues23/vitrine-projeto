import { Atom, Handshake, Lightbulb, type LucideIcon } from "lucide-react";
import { ProjectCategory } from "../types/project.types";

export type ProjectCategoryMeta = {
  category: ProjectCategory;
  label: string;
  icon: LucideIcon;
  slug: string;
  path: string;
  description: string;
};

export const PROJECT_CATEGORIES: ProjectCategoryMeta[] = [
  {
    category: ProjectCategory.Pesquisa,
    label: "Pesquisa",
    icon: Atom,
    slug: "pesquisa",
    path: "/projetos/pesquisa",
    description:
      "Projetos que produzem conhecimento científico e tecnológico aplicável às necessidades da região.",
  },
  {
    category: ProjectCategory.Extensao,
    label: "Extensão",
    icon: Handshake,
    slug: "extensao",
    path: "/projetos/extensao",
    description:
      "Ações que conectam o conhecimento acadêmico com a comunidade, gerando impacto social e cultural.",
  },
  {
    category: ProjectCategory.Inovacao,
    label: "Inovação",
    icon: Lightbulb,
    slug: "inovacao",
    path: "/projetos/inovacao",
    description:
      "Soluções criativas e tecnológicas para problemas reais, fomentando empreendedorismo e parcerias.",
  },
];

export const CATEGORY_EXPLANATION: Record<ProjectCategory, string> = {
  [ProjectCategory.Pesquisa]:
    "A pesquisa no campus é focada em produzir conhecimento científico e tecnológico aplicável às necessidades da região, promovendo inovação e a formação de pesquisadores de excelência.",
  [ProjectCategory.Extensao]:
    "Nossos projetos de extensão conectam o conhecimento acadêmico com a comunidade, promovendo ações que geram impacto social, cultural e econômico direto na vida das pessoas.",
  [ProjectCategory.Inovacao]:
    "O pilar de inovação busca criar soluções criativas e tecnológicas para problemas reais, fomentando o empreendedorismo e parcerias com o setor produtivo local.",
};
