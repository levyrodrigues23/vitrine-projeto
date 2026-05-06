import type { Meta, StoryObj } from "@storybook/react";
import { createElement } from "react";
import Separator from "./separator.tsx";

const meta: Meta<typeof Separator> = {
    title: "Layout/Separator",
    component: Separator,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Separator>;


export const Default: Story = {
    args: {
        variant: "horizontal",
    },
    render: (args) =>
        createElement("div", { className: "w-80" }, createElement(Separator, args)),
};


export const Vertical: Story = {
    args: {
        variant: "vertical",
    },
    render: (args) =>
        createElement(
            "div",
            { className: "flex h-40 items-stretch justify-center" },
            createElement(Separator, args)
        ),
};
