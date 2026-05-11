import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const containerVariants = cva("mx-auto", {
  variants: {
    size: {
      md: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ContainerProps
  extends VariantProps<typeof containerVariants>, React.ComponentProps<"div"> {
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Container({
  as = "div",
  size,
  className,
  children,
  ...props
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: containerVariants({ size, className }),
      ...props,
    },
    children,
  );
}
