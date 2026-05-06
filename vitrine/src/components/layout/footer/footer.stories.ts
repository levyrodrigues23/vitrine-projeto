import type { Meta, StoryObj } from "@storybook/react";
import { createElement } from "react";
import { MemoryRouter } from "react-router";
import { Footer } from "./footer.tsx";

const meta: Meta<typeof Footer> = {
    title: "Layout/Footer",
    component: Footer,
    tags: ["autodocs"],
    decorators: [
        (Story) =>
            createElement(MemoryRouter, null, createElement(Story)),
    ],
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    args: {},
};
