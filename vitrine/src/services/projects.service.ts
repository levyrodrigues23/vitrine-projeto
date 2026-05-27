import { supabase } from "./supabase";
import { ProjectCategory, type Project } from "../types/project.types";

export type ProjectRow = {
  id: string;
  title: string;
  summary: string | null;
  description: string | null;
  category: "inovacao" | "extensao" | "pesquisa";
  image_urls: string[] | null;
  keywords: string[] | null;
};

const CATEGORY_MAP = {
  pesquisa: ProjectCategory.Pesquisa,
  extensao: ProjectCategory.Extensao,
  inovacao: ProjectCategory.Inovacao,
} as const;

export function mapRowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.summary ?? row.description ?? "",
    category: CATEGORY_MAP[row.category],
    imageUrl: row.image_urls?.[0],
    keywords: row.keywords ?? [],
  };
}

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,summary,description,category,image_urls,keywords")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToProject);
}
