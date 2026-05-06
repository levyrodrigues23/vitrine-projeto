import type { Meta, StoryObj } from "@storybook/react";
import Container from "./container.tsx";

const meta: Meta<typeof Container> = {
  title: "UI/Container",
  component: Container,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris malesuada mauris a libero efficitur consequat. In posuere, purus ut pharetra lobortis, ipsum lacus ornare lacus, eget finibus diam nulla non augue. Donec eu ultricies diam, nec auctor nibh. Donec bibendum, dui vel laoreet efficitur, ex nulla maximus augue, eu varius erat odio ac nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ipsum dui, vestibulum in ligula nec, consectetur luctus odio. Quisque justo lacus, sodales vitae porta vel, lacinia sit amet nisl. Vivamus blandit facilisis justo, vel imperdiet nulla placerat bibendum. Fusce tempor, ex in placerat auctor, felis est blandit turpis, in malesuada leo lacus non augue. Cras a mauris et justo suscipit ornare a nec mi. Fusce dictum molestie ipsum. Curabitur vestibulum venenatis enim, vel vestibulum tortor mattis euismod. Vivamus nec mauris a orci congue rhoncus viverra sit amet erat. Vestibulum auctor, eros dictum laoreet scelerisque, lectus ligula feugiat nulla, vel blandit lacus quam non nisi.",
    className: "bg-gray-100 p-4",
  },
};
