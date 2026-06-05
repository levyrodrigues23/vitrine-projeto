import { api } from "./api";
import type { Startup } from "../types/startup.types";
import { AxiosError } from "axios";

export type CreateStartupPayload = Omit<Startup, "id">;


export async function listStartups(): Promise<Startup[]> {
    const response = await api.get<Startup[]>("/Startups");
    return response.data;
  }
  

  export async function uploadStartupImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await api.post<{ url: string }>(
      "/uploads/projects-image",
      formData,
    );
  
    return response.data.url;
  }
  
  export async function getStartupById(id: string): Promise<Startup | null> {
    try {
      const response = await api.get<Startup>(`/Startups/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
  
  export async function createStartup(payload: CreateStartupPayload) : Promise<Startup>{
    const response = await api.post<Startup>("/startup", payload);
    return response.data;
  }
  
  export async function updateStartup(id: string, payload: Partial<Startup>) : Promise<Startup> {
    const response = await api.put<Startup>(`/Startups/${id}`, payload);
    return response.data;
  }
  
  
  export async function deleteStartup(id: string): Promise<void> {
    await api.delete(`/Startups/${id}`);
  }
