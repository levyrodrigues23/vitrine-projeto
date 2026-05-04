import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./layout.tsx";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Layout> = {
  title: "Layout/MainLayout",
  component: Layout,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {},
};
