import { api } from "./api";
import type { Teacher } from "../types/teachers.types";
import { AxiosError } from "axios";

export async function listTeachers(): Promise<Teacher[]> {
  const response = await api.get<Teacher[]>("/teachers");
  return response.data;
}


export async function getTeacherById(id: string): Promise<Teacher | null> {
  try {
    const response = await api.get<Teacher>(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createTeacher(payload: Teacher) : Promise<Teacher>{
  const response = await api.post<Teacher>("/teachers", payload);
  return response.data;
}

export async function updateTeacher(id: string, payload: Partial<Teacher>) : Promise<Teacher> {
  const response = await api.put<Teacher>(`/teachers/${id}`, payload);
  return response.data;
}


export async function deleteTeacher(id: string): Promise<void> {
  await api.delete(`/teachers/${id}`);
}