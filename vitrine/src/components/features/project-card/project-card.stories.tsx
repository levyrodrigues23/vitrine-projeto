import type { Meta, StoryObj } from "@storybook/react-vite";
import { Monitor, Flask, Palette, Code, BookOpen, Cpu } from "@phosphor-icons/react";
import { ProjectCard } from "./project-card.tsx";


const meta: Meta<typeof ProjectCard> = {
  title: "Features/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

// ── COM IMAGEM ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Plataforma de Monitoramento de Cultivos",
    description:
      "Um sistema IoT para monitoramento em tempo real de umidade do solo e temperatura para pequenos agricultores.",
    category: "Engenharia de Software",
    imageUrl:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop",
  },
};

export const WithImageAndArea: Story = {
  name: "Com imagem + área",
  args: {
    title: "Plataforma de Monitoramento de Cultivos",
    description:
      "Um sistema IoT para monitoramento em tempo real de umidade do solo e temperatura para pequenos agricultores.",
    category: "Engenharia de Software",
    imageUrl:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop",
    area: "Engenharia de Computação",
  },
};

export const LongDescription: Story = {
  name: "Descrição longa (truncamento)",
  args: {
    title: "Projeto com Descrição Longa",
    description:
      "Este projeto tem uma descrição propositalmente longa para testar o truncamento de texto no card. A ideia é garantir que o layout permaneça consistente mesmo quando o conteúdo excede o espaço esperado inicialmente no design do componente.",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
};

// ── SEM IMAGEM ──────────────────────────────────────────────────

export const WithoutImage: Story = {
  name: "Sem imagem (sem ícone)",
  args: {
    title: "Algoritmo de Compressão Sem Perdas",
    description:
      "Pesquisa sobre novos métodos de compressão de dados para sistemas de baixa latência.",
    category: "Ciência da Computação",
    area: "Engenharia de Computação",
  },
};

export const WithIcon: Story = {
  name: "Sem imagem + ícone",
  args: {
    icon: <Monitor size={20} />,
    title: "Sistema de Monitoramento",
    description:
      "Ferramenta criada em projeto integrador para acompanhamento de indicadores.",
    category: "Software",
    area: "Engenharia de Computação",
  },
};

export const WithIconResearch: Story = {
  name: "Sem imagem + ícone (pesquisa)",
  args: {
    icon: <Flask size={20} />,
    title: "Análise de Vulnerabilidades em Sistemas Embarcados",
    description:
      "Revisão multivocal de ferramentas de detecção de vulnerabilidades aplicadas a dispositivos IoT.",
    category: "Pesquisa",
    area: "Ciência da Computação",
  },
};

// ── CLICÁVEL ────────────────────────────────────────────────────

export const Linkable: Story = {
  name: "Com link (clicável)",
  args: {
    icon: <Code size={20} />,
    title: "DevTutor Extension",
    description:
      "Extensão para VS Code que auxilia estudantes com sugestões contextuais durante a codificação.",
    category: "Ferramenta",
    area: "Engenharia de Software",
    to: "/projetos/devtutor",
  },
};

// ── EDGE CASES ──────────────────────────────────────────────────

export const TitleOnly: Story = {
  name: "Edge: só título e categoria",
  args: {
    title: "Projeto Minimalista",
    description: "",
    category: "TCC",
  },
};

export const LongTitleNoImage: Story = {
  name: "Edge: título longo sem imagem",
  args: {
    icon: <BookOpen size={20} />,
    title: "Sistema Distribuído de Gerenciamento de Tarefas Acadêmicas Colaborativas",
    description: "Plataforma web para coordenação de projetos entre grupos de pesquisa.",
    category: "Software",
    area: "Sistemas de Informação",
  },
};

// ── GRADE DE COMPARAÇÃO ─────────────────────────────────────────

export const GridComparison: Story = {
  name: "Grade: com vs sem imagem",
  decorators: [
    () => (
      <div className="grid w-[680px] grid-cols-2 gap-4">
        <ProjectCard
          icon={<Cpu size={20} />}
          title="Sistema de Monitoramento"
          description="Ferramenta criada em projeto integrador para acompanhamento de indicadores."
          category="Software"
          area="Engenharia de Computação"
        />
        <ProjectCard
          title="Plataforma IoT Agrícola"
          description="Monitoramento em tempo real de umidade do solo e temperatura."
          category="Engenharia de Software"
          imageUrl="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1000&auto=format&fit=crop"
          area="Engenharia de Computação"
        />
        <ProjectCard
          icon={<Palette size={20} />}
          title="LifeEnglish App"
          description="App Flutter de aprendizado de inglês com sistema de missões e gamificação para usuários brasileiros."
          category="Mobile"
          area="Sistemas de Informação"
          to="/projetos/lifeenglish"
        />
        <ProjectCard
          title="Neon Punk 2087"
          description="Jogo top-down cyberpunk desenvolvido em C com SDL2."
          category="Game Dev"
          imageUrl="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
        />
      </div>
    ),
  ],
  args: {} as never,
};