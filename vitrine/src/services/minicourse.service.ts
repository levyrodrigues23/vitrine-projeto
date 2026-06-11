import { AxiosError } from "axios";
import { api } from "./api";
import type { Minicourse } from "../types/minicourse.types";

export type CreateMinicoursePayload = Omit<Minicourse, "id">;

export async function listMinicourses(): Promise<Minicourse[]> {
  const response = await api.get<Minicourse[]>("/minicourses");
  return response.data;
}

export async function getMinicourseById(id: string): Promise<Minicourse | null> {
  try {
    const response = await api.get<Minicourse>(`/minicourses/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadMinicourseImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/uploads/minicourses-image",
    formData,
  );

  return response.data.url;
}

export async function createMinicourse(
  payload: CreateMinicoursePayload,
): Promise<Minicourse> {
  const response = await api.post<Minicourse>("/minicourses", payload);
  return response.data;
}

export async function updateMinicourse(
  id: string,
  payload: Partial<Minicourse>,
): Promise<Minicourse> {
  const response = await api.put<Minicourse>(`/minicourses/${id}`, payload);
  return response.data;
}

export async function deleteMinicourse(id: string): Promise<void> {
  await api.delete(`/minicourses/${id}`);
}
