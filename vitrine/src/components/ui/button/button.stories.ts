import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.tsx";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "primary",
    size: "sm",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary",
    variant: "tertiary",
  },
};

export const Quaternary: Story = {
  args: {
    children: "Quaternary",
    variant: "quaternary",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
