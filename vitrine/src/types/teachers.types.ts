export const Grau = {
  Graduacao: "graduacao",
  PosGraduacao: "posGraduacao",
  Mestrado: "mestrado",
  Doutorado: "doutorado",
} as const;

export type Grau = typeof Grau[keyof typeof Grau];

export interface Teacher {
  id: string;
  name: string;
  description: string;
  email: string;
  lattes: string; 
  area: string;
  grau: Grau;
  imageUrl?: string;
}