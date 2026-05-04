import type { Meta, StoryObj } from "@storybook/react";
import Container from "./container.tsx";

const meta: Meta<typeof Container> = {
  title: "UI/Container",
  component: Container,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: "Container content will be centered and have max-width.",
    className: "bg-gray-100 p-4",
  },
};
