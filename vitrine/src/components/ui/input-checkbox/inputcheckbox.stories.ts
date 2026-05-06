import { type Meta, type StoryObj } from "@storybook/react"
import { InputCheckbox } from "./input-checkbox"


const meta: Meta<typeof InputCheckbox> = {
    title: "ui/inputcheckbox",
    component: InputCheckbox,
    tags: ["autodocs"]
}


export default meta;

type Story = StoryObj<typeof InputCheckbox>;

export const Default: Story = {
    args: {

    }
}