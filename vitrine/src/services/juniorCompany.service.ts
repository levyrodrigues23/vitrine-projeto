import { api } from "./api";
import { AxiosError } from "axios";
import type { ProjetoEmpresaJr } from "../types/projetoEmpresaJr.types";

export type CreateJuniorCompanyPayload = Omit<ProjetoEmpresaJr, "id">;

export async function listJuniorCompanies(): Promise<ProjetoEmpresaJr[]> {
  const response = await api.get<ProjetoEmpresaJr[]>("/junior-companies");
  return response.data;
}

export async function getJuniorCompanyById(
  id: string,
): Promise<ProjetoEmpresaJr | null> {
  try {
    const response = await api.get<ProjetoEmpresaJr>(`/junior-companies/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function uploadJuniorCompanyImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<{ url: string }>(
    "/uploads/junior-company-image",
    formData,
  );

  return response.data.url;
}

export async function createJuniorCompany(
  payload: CreateJuniorCompanyPayload,
): Promise<ProjetoEmpresaJr> {
  const response = await api.post<ProjetoEmpresaJr>("/junior-companies", payload);
  return response.data;
}

export async function updateJuniorCompany(
  id: string,
  payload: Partial<ProjetoEmpresaJr>,
): Promise<ProjetoEmpresaJr> {
  const response = await api.put<ProjetoEmpresaJr>(
    `/junior-companies/${id}`,
    payload,
  );
  return response.data;
}

export async function deleteJuniorCompany(id: string): Promise<void> {
  await api.delete(`/junior-companies/${id}`);
}
