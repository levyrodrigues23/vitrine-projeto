import { AxiosError } from "axios";
import { api } from "./api";
import type { Project } from "../types/project.types";

export async function listProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/projects");
  return response.data;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
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
  return response.data;
}

export async function updateProject(
  id: string,
  payload: Partial<Project>,
): Promise<Project> {
  const response = await api.put<Project>(`/projects/${id}`, payload);
  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}
