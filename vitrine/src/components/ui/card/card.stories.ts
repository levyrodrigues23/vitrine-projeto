import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card.tsx";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "Card Content",
    className: "p-6",
  },
};

export const Interactive: Story = {
  args: {
    variant: "interactive",
    children: "Interactive Card",
    className: "p-6",
  },
  
};
