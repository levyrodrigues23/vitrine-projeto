import { AxiosError } from "axios";
import { api } from "./api";
import type { Edital } from "../types/edital.types";

export type CreateEditalPayload = Omit<Edital, "id">;

export async function listEditais(): Promise<Edital[]> {
  const response = await api.get<Edital[]>("/notices");
  return response.data;
}

export async function getEditalById(id: string): Promise<Edital | null> {
  try {
    const response = await api.get<Edital>(`/notices/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadEditalImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/uploads/edital-image",
    formData,
  );

  return response.data.url;
}

export async function createEdital(
  payload: CreateEditalPayload,
): Promise<Edital> {
  const response = await api.post<Edital>("/notices", payload);
  return response.data;
}

export async function updateEdital(
  id: string,
  payload: Partial<Edital>,
): Promise<Edital> {
  const response = await api.put<Edital>(`/notices/${id}`, payload);
  return response.data;
}

export async function deleteEdital(id: string): Promise<void> {
  await api.delete(`/notices/${id}`);
}