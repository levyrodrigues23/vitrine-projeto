import type { Meta, StoryObj } from "@storybook/react";
import Section from "./section.tsx";

const meta: Meta<typeof Section> = {
  title: "UI/Section",
  component: Section,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: "Professores",
    description: "essa seção trata a respeito dos professores",
    children: "Section content goes here.",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Only Title",
    children: "Content without description.",
  },
};
