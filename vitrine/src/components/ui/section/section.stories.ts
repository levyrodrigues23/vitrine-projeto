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
    title: "Section Title",
    description: "This is a description for the section.",
    children: "Section content goes here.",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Only Title",
    children: "Content without description.",
  },
};
