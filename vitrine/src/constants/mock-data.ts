import { ProjectCategory, type Project } from "../types/project.types";
import type { Teacher } from "../types/teachers.types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestão Acadêmica",
    description: "Plataforma web para gerenciamento de cursos, alunos e notas",
    category: ProjectCategory.Pesquisa,
    imageUrl:
      "https://images.unsplash.com/photo-1516534775068-bb57e39f0bca?w=500&h=300&fit=crop",
    keywords: ["Sistema", "Gestão", "Acadêmica"],
  },
  {
    id: "2",
    title: "App Mobile de Eventos",
    description: "Aplicativo para descobrir e participar de eventos na universidade",
    category: ProjectCategory.Inovacao,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    keywords: ["App", "Mobile", "Eventos"],
  },
  {
    id: "3",
    title: "Dashboard de Analytics",
    description: "Dashboard interativo para análise de dados em tempo real",
    category: ProjectCategory.Cientifico,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Chatbot IA",
    description: "Assistente virtual com inteligência artificial para atendimento",
    category: ProjectCategory.Cientifico,
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Plataforma E-learning",
    description: "Ambiente virtual para cursos online e educação a distância",
    category: ProjectCategory.Ensino,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
  },
  {
    id: "6",
    title: "API REST de Biblioteca",
    description: "Serviço de backend para gerenciamento de acervo bibliográfico",
    category: ProjectCategory.Tecnico,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
  },
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
   
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Prof. Carlos Oliveira",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Profa. Ana Costa",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
];
