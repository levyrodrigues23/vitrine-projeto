import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "./project-card.tsx";

const meta: Meta<typeof ProjectCard> = {
  title: "Features/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    title: "Plataforma de Monitoramento de Cultivos",
    description: "Um sistema IoT para monitoramento em tempo real de umidade do solo e temperatura para pequenos agricultores.",
    category: "Engenharia de Software",
    imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "Algoritmo de Compressão Sem Perdas",
    description: "Pesquisa sobre novos métodos de compressão de dados para sistemas de baixa latência.",
    category: "Ciência da Computação",
  },
};

export const LongDescription: Story = {
  args: {
    title: "Projeto com Descrição Longa",
    description: "Este projeto tem uma descrição propositalmente longa para testar o truncamento de texto no card. A ideia é garantir que o layout permaneça consistente mesmo quando o conteúdo excede o espaço esperado inicialmente no design do componente.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
};
