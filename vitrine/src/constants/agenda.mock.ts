import type { AgendaEvent, AgendaEventCategoryId } from "../types/agenda.types";

export const AGENDA_CATEGORY_FILTERS: {
  id: AgendaEventCategoryId;
  label: string;
}[] = [
  { id: "all", label: "Todos" },
  { id: "academic", label: "Evento acadêmico" },
  { id: "workshop", label: "Workshop" },
  { id: "lecture", label: "Palestra" },
  { id: "defense", label: "Defesa" },
  { id: "competition", label: "Competição" },
];

export const MOCK_AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "1",
    title: "Semana de Ciência e Tecnologia",
    description:
      "Programação com mostras de projetos, oficinas e integração entre estudantes, docentes e comunidade.",
    categoryId: "academic",
    dateLabel: "20–24 de maio de 2026",
    timeLabel: "08:00 – 18:00",
    location: "Auditório principal",
  },
  {
    id: "2",
    title: "Workshop de prototipagem rápida",
    description:
      "Sessão prática para equipes validarem ideias com materiais simples e feedback de mentores.",
    categoryId: "workshop",
    dateLabel: "28 de maio de 2026",
    timeLabel: "14:00 – 17:30",
    location: "Laboratório de inovação",
  },
  {
    id: "3",
    title: "Palestra: carreiras em dados na região",
    description:
      "Profissionais convidados compartilham trajetórias e oportunidades no mercado de análise de dados.",
    categoryId: "lecture",
    dateLabel: "5 de junho de 2026",
    timeLabel: "19:00 – 20:30",
    location: "Auditório principal",
  },
  {
    id: "4",
    title: "Defesa de TCC — Engenharia de Software",
    description:
      "Banca pública de trabalhos de conclusão de curso com transmissão para familiares e comunidade.",
    categoryId: "defense",
    dateLabel: "12 de junho de 2026",
    timeLabel: "08:30 – 12:00",
    location: "Sala de defesas — bloco B",
  },
  {
    id: "5",
    title: "Hackathon Campus Aberto",
    description:
      "Maratona de 24 horas com desafios reais propostos por parceiros do ecossistema local.",
    categoryId: "competition",
    dateLabel: "21–22 de junho de 2026",
    timeLabel: "09:00 (sáb.) – 18:00 (dom.)",
    location: "Centro de convivência",
  },
];
