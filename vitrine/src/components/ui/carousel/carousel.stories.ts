import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./carousel";

const meta: Meta<typeof Carousel> = {
    title: "UI/Carousel",
    component: Carousel,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Carousel>;


export const Default: Story = {
    args: {
        images: [
            "https://picsum.photos/seed/vitrine-a/960/540",
            "https://picsum.photos/seed/vitrine-b/960/540",
            "https://picsum.photos/seed/vitrine-c/960/540",
        ],
    },
};

export const UmaImagem: Story = {
    args: {
        images: ["https://picsum.photos/seed/single/960/540"],
    },
};
