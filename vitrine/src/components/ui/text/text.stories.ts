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
    children: "Esse aqui é o titulo 1",
    variant: "title-1",
    as: "h1",
  },
};

export const Title2: Story = {
  args: {
    children: "Esse aqui é o titulo 2",
    variant: "title-2",
    as: "h2",
  },
};

export const Title3: Story = {
  args: {
    children: "Esse aqui é o titulo 3",
    variant: "title-3",
    as: "h3",
  },
};

export const BodySmBold: Story = {
  args: {
    children: "Esse aqui é o corpo sm bold",
    variant: "body-sm-bold",
  },
};

export const BodyMdBold: Story = {
  args: {
    children: "Esse aqui é o corpo md bold",
    variant: "body-md-bold",
  },
};

export const bodyLg: Story = {
  args:{
    children: "Esse aqui é o corpo lg",
    variant: "body-lg"
  }
}

export const bodyLgBold: Story = {
  args:{
    children: "Esse aqui é o corpo lg bold",
    variant: "body-lg-bold"
  }
}
