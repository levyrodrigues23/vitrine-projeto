import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./icon.tsx";
import Spinner from "../../../assets/icons/spinner.svg?react"


const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args:{
    svg: Spinner,
    animate: true,
    className:"bg-red-500"
  }
}