import type { Meta, StoryObj } from "@storybook/react";
import Text from "./text.tsx";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Default text (Body MD)",
    variant: "body-md",
  },
};

export const Title1: Story = {
  args: {
    children: "Title 1",
    variant: "title-1",
    as: "h1",
  },
};

export const Title2: Story = {
  args: {
    children: "Title 2",
    variant: "title-2",
    as: "h2",
  },
};

export const Title3: Story = {
  args: {
    children: "Title 3",
    variant: "title-3",
    as: "h3",
  },
};

export const BodySmBold: Story = {
  args: {
    children: "Small Bold Body",
    variant: "body-sm-bold",
  },
};

export const BodyMdBold: Story = {
  args: {
    children: "Medium Bold Body",
    variant: "body-md-bold",
  },
};
