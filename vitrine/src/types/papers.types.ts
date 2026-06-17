import type { Congress } from "./congress.types";
import type { Teacher } from "./teachers.types";


export interface Artigo {
  id: string;
  titulo: string;
  ano_de_publicacao: number;
  descricao: string;
  keywords?: string;
  autores: string;
  base: string;
  professor: Teacher;
  congresso: Congress;
}


export type CreateArtigoPayload = {
  titulo: string;
  ano_de_publicacao: number;
  descricao: string;
  keywords?: string;
  autores: string;
  base: string;
  professorId: string;
  congressoId: string;
};

export type UpdateArtigoPayload = Partial<CreateArtigoPayload>;