import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon.tsx";
import { Search, Home, User, Settings } from "lucide-react";

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Search,
    size: 24,
  },
};

export const Large: Story = {
  args: {
    icon: Home,
    size: 48,
    className: "text-blue",
  },
};

export const CustomColor: Story = {
  args: {
    icon: Settings,
    size: 32,
    className: "text-red",
  },
};
