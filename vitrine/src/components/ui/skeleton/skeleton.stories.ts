import { type Meta, type StoryObj } from "@storybook/react";
import Skeleton from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "ui/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},                     
};

export const Circle: Story = {
  args: { size: "circle", rounded: "full" },
};

export const Large: Story = {
  args: { size: "lg" },
};