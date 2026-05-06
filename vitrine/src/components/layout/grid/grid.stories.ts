import type { Meta, StoryObj } from "@storybook/react";
import { createElement, Fragment } from "react";
import { Grid } from "./grid.tsx";

const cell = (label: string) =>
    createElement(
        "div",
        { className: "rounded-lg border border-gray-300 bg-white p-4 text-black" },
        label
    );

const meta: Meta<typeof Grid> = {
    title: "Layout/Grid",
    component: Grid,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
    args: {
        columns: "three",
        children: createElement(Fragment, null, cell("Célula 1"), cell("Célula 2"), cell("Célula 3")),
    },
};
