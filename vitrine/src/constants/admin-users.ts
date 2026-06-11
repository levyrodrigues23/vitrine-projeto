import type { User } from "../store/useAuthStore";

export const ADMIN_EMAILS = ["admin@ufc.br"];

export const MANAGER_USERS: User[] = [
  {
    id: "2",
    name: "Gerenciador de Projetos",
    email: "gerenciador@ufc.br",
    role: "gerenciador",
  },
  {
    id: "3",
    name: "Coordenação de Extensão",
    email: "extensao@ufc.br",
    role: "gerenciador",
  },
  {
    id: "4",
    name: "Coordenação de Pesquisa",
    email: "pesquisa@ufc.br",
    role: "gerenciador",
  },
];
