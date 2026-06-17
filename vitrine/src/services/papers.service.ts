import { api } from "./api";
import { AxiosError } from "axios";
import type {
  Artigo,
  CreateArtigoPayload,
  UpdateArtigoPayload,
} from "../types/papers.types";


export async function listArtigos(): Promise<Artigo[]> {
  const response = await api.get<Artigo[]>("/papers");
  return response.data;
}


export async function createArtigo(
  payload: CreateArtigoPayload
): Promise<Artigo> {
  const response = await api.post<Artigo>("/papers", payload);
  return response.data;
}

export async function updateArtigo(
  id: string,
  payload: UpdateArtigoPayload
): Promise<Artigo> {
  const response = await api.put<Artigo>(`/papers/${id}`, payload);
  return response.data;
}


export async function deleteArtigo(id: string): Promise<void> {
  await api.delete(`/papers/${id}`);
}

export async function getArtigoById(
  id: string
): Promise<Artigo | null> {
  try {
    const response = await api.get<Artigo>(`/papers/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}