import type { Meta, StoryObj } from "@storybook/react";
import Hero from "./hero.tsx";

const meta: Meta<typeof Hero> = {
  title: "Layout/Hero",
  component: Hero,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: "Descubra o Futuro da Tecnologia",
    subtitle: "Conheça os projetos inovadores desenvolvidos pelos alunos do Campus Itapajé da UFC.",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    ],
  },
};
