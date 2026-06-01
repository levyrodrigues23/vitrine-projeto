import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("font-sans", {
  variants: {
    variant: {
      "body-sm": "text-sm leading-5 font-normal text-gray-base",
      "body-sm-bold": "text-sm leading-5 font-semibold",
      "body-md": "text-base leading-6 font-normal text-gray-base",
      "body-md-bold": "text-base leading-6 font-semibold",
      "body-lg": "text-lg leading-7 font-normal text-gray-base",
      "body-lg-bold": "text-lg leading-7 font-semibold",
      "title-1": "text-7xl leading-[1.06] font-semibold",
      "title-1-normal": "text-7xl leading-[1.06] font-normal",
      "title-2": "text-5xl leading-[1.15] font-semibold",
      "title-2-normal": "text-5xl leading-[1.15] font-normal",
      "title-3": "text-4xl leading-[1.2] font-semibold",
      "title-3-normal": "text-4xl leading-[1.2] font-normal",
    },
  },
  defaultVariants: {
    variant: "body-md",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  const variantClass = textVariants({ variant });

  const mergedClassName = className
    ? `${variantClass} ${className}`
    : variantClass;

  return React.createElement(
    as,
    {
      className: mergedClassName,
      ...props,
    },
    children
  );
}
