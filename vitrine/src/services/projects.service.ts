import { AxiosError } from "axios";
import { api } from "./api";
import { normalizeKey } from "../lib/normalize";
import { ProjectCategory, type Project } from "../types/project.types";

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  pesquisa: ProjectCategory.Pesquisa,
  extensao: ProjectCategory.Extensao,
  inovacao: ProjectCategory.Inovacao,
  
};

const normalizeProject = (project: Project): Project => {
  const key = normalizeKey(project.category);
  const mapped = CATEGORY_MAP[key];
  if (!mapped || mapped === project.category) return project;
  return { ...project, category: mapped };
};

export async function listProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects");
  return response.data.map(normalizeProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await api.get<Project>(`/projects/${id}`);
    return normalizeProject(response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadProjectImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/uploads/projects-image",
    formData,
  );

  return response.data.url;
}

export async function createProject(payload: Project): Promise<Project> {
  const response = await api.post<Project>("/projects", payload);
  return normalizeProject(response.data);
}

export async function updateProject(
  id: string,
  payload: Partial<Project>,
): Promise<Project> {
  const response = await api.put<Project>(`/projects/${id}`, payload);
  return normalizeProject(response.data);
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
