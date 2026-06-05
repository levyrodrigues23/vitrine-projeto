import type { Congress } from "./congress.types";
import type { Teacher } from "./teachers.types";

export interface Artigo {
  id: string;
  titulo: string;
  ano_de_publicacao: Date;
  descricao: string;
  keywords?: string;
  autores: string;
  base: string;
  professor: Teacher;
  id_congresso: Congress;
}

