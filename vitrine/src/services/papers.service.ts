import { api } from "./api";
import { AxiosError } from "axios";
import type { Artigo } from "../types/papers.types";


export async function listArtigos(): Promise<Artigo[]> {
    try {
        const response = await api.get<Artigo[]>("/papers");
        return response.data;
    } catch (error) {
        console.log(error)
    }

}

export async function createArtigo(payload: Artigo): Promise<Artigo> {

    const response = await api.post<Artigo>("/papers", payload)
    return response.data;
}
export async function updateArtigo(id: string, payload: Partial<Artigo>): Promise<Artigo> {
    const response = await api.put<Artigo>(`/papers/${id}`, payload)
    return response.data;
}

export async function deleteArtigo(id: string) {
    await api.delete<Artigo>(`/papers/${id}`);
}
export async function getIdArtigo(id: string): Promise<Artigo> {
    try {
        const response = await api.get<Artigo>(`/papers/${id}`)
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}




